import axios from "axios";

const API = axios.create({
  baseURL: "https://esg-dashboard-7ke6.onrender.com/api/",
});

export default API;