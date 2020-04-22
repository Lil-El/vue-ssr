<template>
  <div>
    Bar
    <span>{{$store.state.name}}</span>
  </div>
</template>
<script>
export default {
  asyncData(store) {
    //规定这个方法在后端执行，只能在页面级组件执行
    store.dispatch("changeName");
  }
};
</script>
<style scoped>
div {
  background: greenyellow;
}
</style>