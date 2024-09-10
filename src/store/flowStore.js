import _ from "lodash";
import { defineStore } from "pinia";
import {
  getWhiteBoardById,
  updateWhiteBoard,
  getNewFormNodes,
  getNewSearchNodes,
  getNewSearchNodesV2,
  getNewAINodes,
  getAnswer,
} from "../api";
import { nanoid } from "nanoid";

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
  console.log(nodes);
  return {
    nodes,
    edges,
  };
};

export const useFlowStore = defineStore("flow", {
  state: () => {
    return {
      id: "",
      nodes: [],
      edges: [],
      recommendNodes: [],
      originalData: {},
      name: "",
      avatar: "",
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
      this.recommendNodes = [];
    },

    async saveFlow(avatar) {
      if (avatar) {
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
      this.nodes.push(node);
      await this.saveFlow();
    },

    async removeNode(id) {
      console.log("remove node", id);
      this.nodes = this.nodes.filter((node) => node.id !== id);
      await this.saveFlow();
    },

    addEdge(edge) {
      this.edges.push(edge);
    },

    async fetchNewNodes() {
      await this.saveFlow();
      const promises = [
        getNewFormNodes(this.id),
        getNewSearchNodes(this.id),
        getNewSearchNodesV2(this.id),
        getNewAINodes(this.id),
      ];
      const [formNodes, searchNodes, searchNodesV2, aiNodes] = await Promise.all(
        promises
      );
      console.log(formNodes, searchNodes, aiNodes);
      this.recommendNodes = [
        ...formNodes.map((node) => {
          return {
            type: node.type == "text" ? "flow-form" : "flow-select",
            data: {
              id: nanoid(),
              dataType: node.type,
              question: node.question,
              options: node.options,
              created_by: "ai",
              answer: "",
            },
          };
        }),
        ...searchNodes.map((node) => {
          return {
            type: "bilibili-video",
            data: {
              id: nanoid(),
              ...node,
              created_by: "ai",
            },
          };
        }),
        ...aiNodes.map((node) => {
          return {
            type: "flow-text",
            data: {
              id: nanoid(),
              dataType: "text",
              created_by: "ai",
              content: node,
            },
          };
        }),
        ..._.map(searchNodesV2, (node) => {
          return {
            type: node.type,
            data: {
              id: nanoid(),
              ...node,
              created_by: "search",
            },
          };
        }),
      ];
      console.log(this.recommendNodes);
    },

    async getAnswer() {
      const answer = await getAnswer(this.id);
      return answer;
    },
  },
});
