import request from "../utils/http/axios";

export async function createWhiteBoard(params) {
  const res = await request.post("/whiteboard/create", params);
  return res;
}

export async function updateWhiteBoard(id, data) {
  const res = await request.post(`/whiteboard/${id}/update`, data);
  return res;
}

export async function deleteWhiteBoard(id) {
  const res = await request.post(`/whiteboard/${id}/delete`);
  return res;
}

export async function getWhiteBoardList(params) {
  const res = await request.get("/whiteboard/all", { params });
  return res.whiteboards;
}

export async function getWhiteBoardById(id) {
  const res = await request.get(`/whiteboard/${id}`);
  return res;
}

export async function getNewFormNodes(id) {
  const res = await request.post(`/whiteboard/${id}/questions`);
  return res["related_questions"];
}

export async function getNewSearchNodes(id) {
  return [
    {
      aid: "918100058",
      cid: "1324388717",
      bvid: "BV1Ju4y187Qu",
    },
  ];
}

export async function getAnswer(id) {
  const res = await request.post(`/whiteboard/${id}/answer`);
  return res["answer"];
}

export async function getNewAINodes(id) {
  const res = await request.post(`/whiteboard/${id}/insights`);
  return res["related_insights"];
}

export async function getNewSearchNodesV2(id) {
  const res = await request.post(`/whiteboard/${id}/search`);
  return res["search_results"];
}
