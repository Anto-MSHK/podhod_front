import axios from "axios";

export const API_URL = `http://194.67.121.107:5000`;

export const $api = axios.create({
  //   withCredentials: true,
  baseURL: API_URL,
});
