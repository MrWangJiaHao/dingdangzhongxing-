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
    this.addHenxianTables();
  },
  methods: {
    addHenxianTables() {
      setTimeout(() => {
        this.$nextTick(() => {
          let tablesCenter = document.getElementsByTagName("td");
          tablesCenter = Array.from(tablesCenter);
          tablesCenter.forEach((item) => {
            if (!item.children[0].children.length) {
              item.children[0].innerHTML = item.children[0].innerHTML
                ? item.children[0].innerHTML
                : "———";
            }
          });
        });
      }, 700);
    },
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
#app {
  height: 100%;
}
/*隐藏滚动条 
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
} */
</style>
