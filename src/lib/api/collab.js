import client from "./client";

export const getCollabList = (id) => {
  return client.get(`/collaborations/${id}`);
}

export const countup = (id) => {
  return client.get(`/collaborations/countup/${id}`);
}

export const postCreateCollab = (params) => {
  return client.post(`/collaborations`, {
    collaboration: {
      youtuberId: params.youtuberId,
      channelId: params.channelId,
      count: params.count,
      channelTitle: params.channelTitle,
    },
  });
}