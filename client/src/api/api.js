import axios from "axios";

const api = axios.create({
  baseURL: "https://bug-tracker-platform-production.up.railway.app/api",
});

export default api;