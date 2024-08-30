import _, { add } from "lodash";
import { defineStore } from "pinia";
import { Position, useVueFlow } from '@vue-flow/core'

import { getWhiteBoardById, updateWhiteBoard, getNewFormNodes, getNewSearchNodes, getNewAINodes } from "../api";

const parserData = (data) => {
    const nodes = _.get(data, "data.graph.nodes", []).map((node) => {
        return {
            id: node.id,
            type: node.type,
            updated_at: node.updated_at,
            created_at: node.created_at,
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
            nodes: [
            ],
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
                ui_attributes: {
                    avatar: this.avatar,
                },
                data: {
                    graph: {
                        nodes: this.nodes.map((node) => {
                            return {
                                id: node.id,
                                type: node.type,
                                content: node.data.content,
                                status: node.data.status,
                                created_by: node.data.created_by,
                                updated_at: node.updated_at||'',
                                created_at: node.created_at||'',
                                extra_metadata: node.extra_metadata,
                                ui_attributes: _.pick(node, ["data",
                                    'position',
                                    'class'
                                ],)
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
        addNode(node) {
            console.log(this.nodes);
            this.nodes.push(node)
        },

        addEdge(edge) {
            this.edges.push(edge)
        },

        async fetchNewNodes() {
            await this.saveFlow()
            const promises = [getNewFormNodes(this.id), getNewSearchNodes(this.id), getNewAINodes(this.id)]
            const [formNodes, searchNodes, aiNodes] = await Promise.all(promises)
            console.log(formNodes, searchNodes, aiNodes)
            this.recommendNodes = [
                ...formNodes,
                ...searchNodes,
                ...aiNodes
            ]
        }
    }
})