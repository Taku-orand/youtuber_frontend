import axios from "axios";

//  Youtube Data APIに検索ワードに関連するチャンネルデータを取得する
export const youtubeSearch = async (keyword) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?type=channel&part=snippet&q=${keyword}&maxResults=1&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    
    const response = await axios.get(url);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};
