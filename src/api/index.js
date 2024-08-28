
export async function createWhiteBoard(params) {
    return {
        "name": "whiteboard",
        "id": "1"
    }
}

export async function updateWhiteBoard(id, data) {
}

export async function deleteWhiteBoard(id) {

}

export async function getWhiteBoardList(params) {
    return [
        {
            name: "title1",
            createdAt: "2021-10-10",
            updatedAt: "2021-10-10",
            id:"1"
        }
    ]
}

export async function getWhiteBoardById(id) {
    return {
        "name": "whiteboard",
        "avatar": "avatar",
        "data": {
            "graph": {
                "nodes": [
                    {
                        "id": "uuid_1",
                        "type": "text",
                        "content": "Updated Content",
                        "status": "inactive",
                        "created_by": "user",
                        "extra_metadata": {},
                        "ui_attributes": {
                            "position": { "x": 100, "y": 100 },
                        },
                    }
                ],
                "edges": [{ "extra_metadata": {}, "ui_attributes": {} }],
            }
        },
    }
}

export async function getNewFormNodes(userId) {
    return []
}

export async function getNewSearchNodes(userId) {
    return []
}

export async function getNewAINodes(userId) {
    return []
}

