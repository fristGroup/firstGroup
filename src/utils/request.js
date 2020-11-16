import axios from "axios";

// axios 二次封装
const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 20000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default request;
