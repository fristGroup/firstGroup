import axios from "axios";
// 引入Nprogress插件,可以在发送请求或者作出响应的时候有进度条的效果
import Nprogress from "nprogress";
// 引入该插件的样式文件
import "nprogress/nprogress.css";

// axios 二次封装
const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 20000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  Nprogress.start(); // 显示进度条
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    Nprogress.done(); // 隐藏进度条
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default request;
