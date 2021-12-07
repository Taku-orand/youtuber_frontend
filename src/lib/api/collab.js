import client from "./client";

export const getCollabList = (id) => {
  return client.get(`/collaborations/${id}`);
}

export const countup = (id) => {
  return client.get(`/collaborations/countup/${id}`);
}