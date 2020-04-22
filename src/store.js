import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

export default () => {
  let store = new Vuex.Store({
    state: {
      name: "yxd",
    },
    mutations: {
      changeName(state) {
        state.name = "uxd";
      },
    },
    actions: {
      changeName({ commit }) {
        //模拟数据请求 axios
        return new Promise((r, j) => {
          setTimeout(() => {
            commit("changeName");
            r();
          }, 1000);
        });
      },
    },
  });
  if (typeof window !== "undefined") {
    //这个文件，前后端都会执行，所以要判断window，说明是浏览器执行
    if (window.__INITIAL_STATE__) {
      store.replaceState(window.__INITIAL_STATE__);
    }
  }
  return store;
};
