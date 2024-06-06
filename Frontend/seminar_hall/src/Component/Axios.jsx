import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:8000/";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
