<template>
  <div id="app">
    <!-- 模板的app没有了，在这里添加app，client.bundle.js才会生效 -->
    <!-- <Foo />
    <Bar />-->
    <router-link to="/">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import Bar from "./components/bar.vue";
import Foo from "./components/foo.vue";
export default {
  components: {
    Bar,
    Foo
  },
  mounted() {
    //ssr 不会触发mounted
    this.$store.dispatch("changeName");
  }
};
</script>
