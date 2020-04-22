import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router";
import createStore from "./store";

export default function() {
  let router = createRouter();
  let store = createStore();
  let app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });
  return { app, router, store };
}

// 每个客户端访问，返回的是不同的实例
// 导出一个vm实例
