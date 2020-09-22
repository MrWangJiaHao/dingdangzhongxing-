<template>
  <div>
    <!-- 这是首页的页面 -->
    <Breadcrumd></Breadcrumd>
    <div class="indexContainer">
      <div class="numberInfor1"></div>
      <div class="numberInfor2">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="warehouseStatistics">
        <div></div>
        <div></div>
      </div>
      <div class="echartsInfor">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumd from "../components/breadcrumd";
export default {
  components: {
    Breadcrumd,
  },
};
</script>

<style scoped lang="scss">
.indexContainer {
  // padding: 20px;
  .numberInfor1 {
    width: 1888px;
    height: 80px;
    border-radius: 4px;
    margin: 16px;
    background: violet;
  }
  .numberInfor2 {
    width: 1888px;
    height: 239px;
    display: flex;
    margin: 0 0 16px 16px;
    div {
      width: 301px;
      height: 239px;
      border-radius: 4px;
      margin-right: 16px;
      background: hotpink;
    }
  }
  .warehouseStatistics {
    width: 1888px;
    height: 480px;
    display: flex;
    margin: 0 0 16px 16px;
    div:nth-of-type(1) {
      width: 383px;
      height: 480px;
      border-radius: 4px;
      background: chartreuse;
      margin: 0 16px 0 0;
    }
    div:nth-of-type(2) {
      width: 1488px;
      height: 480px;
      border-radius: 4px;
      background: sandybrown;
      margin: 0 16px 0 0;
    }
  }
  .echartsInfor {
    width: 1888px;
    height: 560px;
    display: flex;
    margin: 0 0 16px 16px;
    div:nth-of-type(1) {
      width: 936px;
      height: 560px;
      border-radius: 4px;
      background: teal;
      margin: 0 16px 0 0;
    }
    div:nth-of-type(2) {
      width: 936px;
      height: 560px;
      border-radius: 4px;
      background: yellowgreen;
      margin: 0 16px 0 0;
    }
  }
}
</style>