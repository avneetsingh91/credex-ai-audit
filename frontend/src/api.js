import axios from "axios";

const API = axios.create({
  baseURL: "https://credex-ai-audit-o47a.onrender.com/api",
});

export default API;
