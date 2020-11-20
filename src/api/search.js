import request from "@/utils/request";
export const reqSearchResult = function(params){
  return request({
    url: "/search",
    method: "get",
    params,
  });
}

