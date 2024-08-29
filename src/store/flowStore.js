import _ from "lodash";
import { defineStore } from "pinia";
import { getWhiteBoardById, updateWhiteBoard, getNewFormNodes, getNewSearchNodes, getNewAINodes } from "../api";

const parserData = (data) => {
    const nodes = _.get(data, "data.graph.nodes", []).map((node) => {
        return {
            id: node.id,
            type: node.type,
            data:{
                content: node.content
            },
            status: node.status,
            created_by: node.created_by,
            extra_metadata: node.extra_metadata,
            ...node.ui_attributes

        }
    })
    const edges = []
    console.log(nodes)
    return {
        nodes,
        edges
    }
}

export const useFlowStore = defineStore("flow", {
    state: () => {
        return {
            id: "",
            nodes: [],
            edges: [],
            recommendNodes: [],
            originalData: {},
            name: "",
            avatar: ""
        }
    },
    actions: {
        setId(id) {
            this.id = id
        },

        async getFlow() {
            const data = await getWhiteBoardById(this.id)
            const { edges, nodes } = parserData(data)
            this.nodes = nodes
            this.edges = edges
            this.originalData = data
            this.name = data.name
            this.avatar = data.avatar
            console.log(edges, nodes, data)
        },

        async saveFlow(avatar) {
            if (avatar) {
                this.avatar = avatar
            }
            const data = {
                name: this.name,
                avatar: this.avatar,
                data: {
                    graph: {
                        nodes: this.nodes.map((node) => {
                            return {
                                id: node.id,
                                type: node.type,
                                content: node.data.content,
                                status: node.status,
                                created_by: node.created_by,
                                extra_metadata: node.extra_metadata,
                                ui_attributes: _.omit(node, ["id", "type", "data", "status", "created_by", "extra_metadata"])
                            }
                        }),
                        edges: []
                    }
                }
            }

            const res = await updateWhiteBoard(this.id, data)
        },

        setProperty(config) {
            for (const key in config) {
                this[key] = config[key]
            }
        },
        async fetchNewNodes() {
            await this.saveFlow()
            const promises = [getNewFormNodes(this.id), getNewSearchNodes(this.id), getNewAINodes(this.id)]
            const [formNodes, searchNodes, aiNodes] = await Promise.all(promises)
            this.recommendNodes = [
                ...formNodes,
                ...searchNodes,
                ...aiNodes
            ]
        }
    }
})