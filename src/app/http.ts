import axios from "axios";

export const API_URL = `https://anto-mshk.ru`;

export const $api = axios.create({
	//   withCredentials: true,
	baseURL: API_URL,
});
