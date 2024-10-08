import _ from "lodash";
import { defineStore } from "pinia";
import { useVueFlow } from "@vue-flow/core";
import { useScreenshot } from "../components/useScreenShot";
import { nanoid } from "nanoid";

/**
 * @returns {string} - A unique id.
 */
function getId() {
  return nanoid(12);
}

const { capture } = useScreenshot();

import {
  getWhiteBoardById,
  updateWhiteBoard,
  getNewFormNodes,
  getNewSearchNodesV2,
  getNewAINodes,
  // eslint-disable-next-line no-unused-vars
  getAnswer,
  getAnswerStream,
} from "../api";

function filterSearchResultFromBilibili(searchList = [], max = 2) {
  const nodes = []
  _.forEach(searchList, (item) => {
    console.log(item);
    const { url, name, type } = item;
    if (type !== 'search-video') return
    if (url.includes("bilibili")) {
      try {
        const bvid = url.split("/")
          .filter((item) => item.includes("BV"))[0]
          .split("?")[0];
        nodes.push({
          type: "bilibili-video",
          data: {
            id: getId(),
            name,
            bvid,
            created_by: "search",
          },
        });
      } catch (e) {
        console.log(e, url)
      }

    }
  });
  return nodes.slice(0, max);
}

function getDomain(url) {
  const a = document.createElement("a");
  a.href = url;
  return a.hostname;
}

function filterSearchResultFromWeb(searchList = [], max = 2) {
  const nodes = []
  _.forEach(searchList, (item) => {
    const { url, name, type, snippet } = item;
    const domain = getDomain(url);
    if (type !== 'search-webPage') return
    nodes.push({
      type: "search-web",
      data: {
        id: getId(),
        name,
        domain,
        url,
        snippet,
        content: snippet,
        type: "web",
        icon: 'https://www.google.com/s2/favicons?domain=' + domain,
        created_by: "search",
      },
    });
  });
  return nodes.slice(0, max);
}

// eslint-disable-next-line no-unused-vars
function calculateNodesCenter(nodes) {
  let maxX = 0, maxY = 0, minX = 0, minY = 0;
  nodes.forEach((node) => {
    const { x, y } = node.position;
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
  });
  console.log("max", maxX, maxY, minX, minY);
  return {
    x: (maxX + minX) / 2,
    y: (maxY + minY) / 2,
  };
}
// function filterSearchResultFromWeb(searchList, max = 2) {
//   const nodes = []
//   searchList.forEach((item) => {
//     const { url, type } = item;

//   });
//   return nodes.slice(0, max);
// }



const parserData = (data) => {
  const nodes = _.get(data, "data.graph.nodes", []).map((node) => {
    return {
      id: node.id,
      updated_at: node.updated_at,
      created_at: node.created_at,
      ...node.ui_attributes,
    };
  });
  const edges = [];
  return {
    nodes,
    edges,
  };
};

export const useFlowStore = defineStore("flow", {
  state: () => {
    return {
      flowOptions: useVueFlow(),
      id: "",
      nodes: [],
      edges: [],
      answer: "",
      recommendNodes: [
      ],
      tips: [
      ],
      originalData: {},
      name: "",
      avatar: "",
      ref: null

    };
  },
  actions: {
    setId(id) {
      this.id = id;
    },

    async getFlow() {
      const data = await getWhiteBoardById(this.id);
      const { edges, nodes } = parserData(data);
      this.nodes = nodes;
      this.edges = edges;
      this.originalData = data;
      this.name = data.name;
      this.avatar = data.avatar;
      this.flowOptions.onPaneReady((instance) => instance.fitView());
      this.recommendNodes = [];
      if (this.topic && nodes.length === 0) {
        this.addNode({
          type: "sticky",
          data: {
            id: getId(),
            created_by: "user",
            content: this.topic,
            backgroundColor: "#FFEEA9",
          },
          position: {
            x: 150,
            y: 150,
          },
        });
        this.saveFlow();
        this.topic = "";
      }
    },

    async saveFlow() {
      if (this.ref) {
        console.log("capture", this.ref);
        const avatar = await capture(this.ref, { shouldDownload: false });
        this.avatar = avatar;
      }
      const data = {
        name: this.name,
        ui_attributes: {
          avatar: this.avatar,
        },
        data: {
          graph: {
            nodes: this.nodes.map((node) => {
              const data = {
                id: node.id,
                type: node.data.dataType || "text",
                content: node.data.content || "",
                status: node.data.status,
                created_by: node.data.created_by || "ai",
                updated_at: node.updated_at || "",
                created_at: node.created_at || "",
                extra_metadata: node.extra_metadata,
                ui_attributes: _.pick(node, [
                  "data",
                  "position",
                  "class",
                  "type",
                ]),
              };
              if (node.type == "flow-form" || node.type == "flow-select") {
                data.content = {
                  question: node.data.question,
                  options: node.data.options,
                  answer: node.data.answer,
                };
              }
              return data;
            }),
            edges: [],
          },
        },
      };

      await updateWhiteBoard(this.id, data);
    },

    removeRecommendNode(id) {
      console.log("remove recommend node", id);
      this.recommendNodes = this.recommendNodes.filter((node) => {
        const find = node.data.id !== id;
        console.log(find, node.data.id, id);
        return find;
      });
      return true;
    },

    setProperty(config) {
      for (const key in config) {
        this[key] = config[key];
      }
    },
    async addNode(node) {
      if (!node.id) {
        node.id = getId();
      }
      const index = this.nodes.findIndex((n) => n.id === node.id);
      if (index !== -1) {
        this.nodes[index] = node;
      } else {
        this.nodes.push(node);
        const { off } = this.flowOptions.onNodesInitialized(() => {
          this.flowOptions.updateNode(node.id, (node) => ({
            position: {
              x: node.position.x - node.dimensions.width / 2,
              y: node.position.y - node.dimensions.height / 2,
            },
          }));
          off();
        });
        this.flowOptions.addNodes(node);
      }
      await this.saveFlow();

    },

    async removeNode(id) {
      console.log("remove node", id);
      this.nodes = this.nodes.filter((node) => node.id !== id);
      await this.saveFlow();
    },

    async addEdge(edge) {
      this.edges.push(edge);
      this.flowOptions.addEdges(edge);
      await this.saveFlow();
    },

    async fetchNewNodes() {
      this.recommendNodes = []
      await this.saveFlow();
      this.tips = []
      const promises = [
        getNewFormNodes(this.id),
        getNewSearchNodesV2(this.id),
        getNewAINodes(this.id),
      ];
      const [formNodes, [searchNodesV2, summary], tipsNode] = await Promise.all(
        promises
      );
      console.log(formNodes, searchNodesV2, tipsNode);
      this.tips = tipsNode
      this.recommendNodes = _.shuffle([
        ...formNodes.map((node) => {
          return {
            type: node.type == "text" ? "flow-form" : "flow-select",
            data: {
              id: getId(),
              dataType: node.type,
              question: node.question,
              options: node.options,
              created_by: "ai",
              answer: undefined,
            },
          };
        }),
        {
          type: "flow-text",
          data: {
            id: getId(),
            dataType: "text",
            created_by: "ai",
            content: summary,
          },
        },
        ...filterSearchResultFromWeb(searchNodesV2),
        ...filterSearchResultFromBilibili(searchNodesV2),
      ]);
    },

    async getAnswer(handle) {
      await getAnswerStream(this.id, handle);
    },
  },
});
