
import request from '../utils/http/axios'

export async function createWhiteBoard(params) {
    const res = await request.post('/whiteboard/create', params)
    return res
}

export async function updateWhiteBoard(id, data) {
    const res = await request.post(`/whiteboard/${id}/update`, data)
    return res
}

export async function deleteWhiteBoard(id) {
    
    const res = await request.post(`/whiteboard/${id}/delete`)
    return res

}

export async function getWhiteBoardList(params) {
   const res = await request.get('/whiteboard/all', { params })
    return res.whiteboards
}

export async function getWhiteBoardById(id) {
    const res = await request.get(`/whiteboard/${id}`)
    return res
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

