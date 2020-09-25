<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getusertype");
    this.$store.dispatch("getWarehoseConfig");
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
.l {
  float: left;
}
.r {
  float: right;
}
.clear {
  content: "";
  display: block;
  clear: both;
}
</style>
