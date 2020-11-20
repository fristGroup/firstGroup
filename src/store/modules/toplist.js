// import { getTopList } from "../../api/toplist";
// export default {
//   state: {
//     topList: [],
//   },
//   mutations: {
//     RECEIVE_TOPLIST(state, topList) {
//       state.topList = topList.splice(0, topList.length < 3);
//     },
//   },
//   actions: {
//     async getTopLists({ commit }) {
//       const result = await getTopList();
//       if (result.code === 200) {
//         commit("RECEIVE_TOPLIST", result.data);
//       }
//     },
//   },
//   getters: {},
// };
