import request from "@/utils/request";
//登录
export const getUserInfo = (phone, password) => {
  return request.post(`/login/cellphone?phone=${phone}&password=${password}`);
};
// 退出登陆
// export const reqLogout = () => {
//   return request.get(`/login/status`);
// };
// 退出登录
// reqoutLogin: () => {
//   return request.get(`/login/status`);
// },
