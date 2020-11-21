import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 配置不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({ showSpinner: false });

// axios 二次封装
const request = axios.create({
  baseURL: "http://localhost:3000", //当前生产环境配置
  // baseURL: "/",  工作中开发和生产环境配置
  timeout: 200000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // 显示请求中的水平进度条
  NProgress.start();

  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 隐藏进度条
    NProgress.done();

    return response.data;
  },
  (err) => {
    // 隐藏进度条
    NProgress.done();

    return Promise.reject(err);
  }
);

export default request;
