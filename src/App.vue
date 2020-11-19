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

<style lang="scss">

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
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
/*隐藏滚动条 
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
} */
/*改变滚动条样式*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: #e6e7ea;
  border-radius: 2.5px;
}
::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #333;
}
::-webkit-scrollbar-corner {
  background: #179a16;
}
/*去掉数字输入框的上下箭头*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input[type="number"] {
  -moz-appearance: textfield !important;
}


</style>
