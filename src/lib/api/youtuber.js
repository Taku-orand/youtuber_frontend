// post.js
import client from "./client";

// 一覧
export const getYoutuberList = () => {
  return client.get("/youtubers");
};

// 詳細
export const getYoutuberDetail = (id) => {
  return client.get(`/youtubers/${id}`);
};

// 新規作成
export const createYoutuber = (params) => {
  return client.post("/youtubers", params);
};

// 更新
export const updateYoutuber = (id, params) => {
  return client.patch(`/youtubers/${id}`, params);
};

// 削除
export const deleteYoutuber = (id) => {
  return client.delete(`/youtubers/${id}`);
};
