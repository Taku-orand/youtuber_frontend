import axios from "axios";

export const youtubeSearch = async (keyword) => {
  console.log("test",keyword)
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?type=channel&part=snippet&q=${keyword}&maxResults=3&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    const response = await axios.get(url);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};
