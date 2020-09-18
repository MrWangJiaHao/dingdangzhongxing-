<template>
  <div id="app">
    <Footers></Footers>
    <dropDowbox :dropDowBox="dropDowBox" @getDropDownData="getDropDownData"></dropDowbox>
    <searchBox :searchCenter="searchCenter" @getSearchCenterShuJu="getSearchCenterShuJu"></searchBox>
    <pagecomponent
      :pageComponentsData="pageComponentsData"
      @getPageNum="getPageNum"
      @sureSuccssBtn="sureSuccssBtn"
    />
    <button class="error">错误</button>
    <div class="wenZhiBox ellipsis">title超过8个字鼠标滑过显示出全部的字</div>
    <button class="usual">平常</button>
    <button class="success">成功</button>
  </div>
</template>
<script>
import Footers from "../../components/footer"; //尾部
import dropDowbox from "../../components/commin/dropDownBox"; //下拉框
import searchBox from "../../components/commin/searchBox"; //搜索框
import pagecomponent from "../../components/commin/pageComponent"; //搜索框
export default {
  components: {
    Footers,
    dropDowbox,
    searchBox,
    pagecomponent,
  },
  data() {
    return {
      dropDowBox: {
        //下拉框需要的json
        title: "测试的demo",
        dropDownBoxData: ["1231", "12315", "1205152"], //下拉需要的data
        placeholder: "亲选择",
        disabled: false,
      },
      searchCenter: {
        //搜索框需要的json
        title: "测试的demo",
        searchWrite: "",
        placeholder: "亲选择",
      },
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 100, //一共多少条 //默认一页10条
        // },
        datePickerData: {
          title: "测试的demo",
        },
        dateTimeData: {
          title: "测试的demo",
        },
      },
    };
  },
  methods: {
    getDropDownData(e) {
      console.log("这是下拉框的数据:", e); //返回你选择的那个数据
    },
    getSearchCenterShuJu(e) {
      console.log("这是搜索框的数据:", e); //返回你输入的数据
    },
    getPageNum(e) {
      console.log("这是获取到了第几页的数据", e); //返回当前的页数
    },
    sureSuccssBtn(e) {
      console.log("这是点击了确定之后返回来的第几页", e); //返回当前的页数
    },
  },
};
</script>
<style>
</style>
<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
.wenZhiBox {
  width: 78px;
}
.error {
  @include BtnFunction("error");
}
.usual {
  @include BtnFunction();
}
.success {
  @include BtnFunction("success");
}
</style>
