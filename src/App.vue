<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getusertype");

    if (localStorage.getItem("data")) {
      //replaceState替换数据 Object.assign合并对象
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem("data"))
        )
      );
    } //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("data", JSON.stringify(this.$store.state));
    });
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
