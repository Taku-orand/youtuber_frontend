import axios from "axios";

export const youtubeSearch = async (keyword) => {
  try {
    // console.log(keyword);

    const config = {
      url: "https://www.googleapis.com/youtube/v3/search",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      params: {
        part: "snippet",
        q: keyword,
        maxResults: 10,
        type: "channel",
        key: process.env.REACT_APP_YOUTUBE_API_KEY, // 取得したAPIキーを設定
      },
    };
    const res = await axios(config);

    return res.data.items;
  } catch (error) {
    throw error;
  }
};
