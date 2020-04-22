import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default () => {
  return new VueRouter({
    mode: "history",
    routes: [
      {
        path: "/",
        component: () => import("./components/Foo.vue"),
      },
      {
        path: "/bar",
        component: () => import("./components/Bar.vue"),
      },
    ],
  });
};
