// client.js
import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  }),
  options
);

export default client;
