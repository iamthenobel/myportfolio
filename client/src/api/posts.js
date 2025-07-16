import axios from "axios";

const API_URL = "http://localhost:3000";

export const getPosts = async () => {
  const res = await axios.get(`${API_URL}/posts`);
  return res.data;
};

export const createPost = async (title, content) => {
  const res = await axios.post(`${API_URL}/posts`, { title, content });
  return res.data;
};
