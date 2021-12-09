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
export const updateYoutuber = (id, {youtuber}) => {
  return client.patch(`/youtubers/`+id, {
    youtuber: {
        channelTitle: youtuber.channelTitle,
        channelId: youtuber.channelId,
        channelThumbnail: youtuber.channelThumbnail,
        lastEditor: youtuber.lastEditor,
        content: youtuber.content,
    },
  });
};

// 削除
export const deleteYoutuber = (id) => {
  return client.delete(`/youtubers/${id}`);
};
