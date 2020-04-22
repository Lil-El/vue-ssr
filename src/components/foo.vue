<template>
  <div>
    Foo
    <button @click="show()">click</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    show() {
      console.log("show");
    }
  }
};
</script>
<style scoped>
div {
  background: red;
}
</style>