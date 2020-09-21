<template>
  <div class="userSettingBox">
    <div class="fuzzyQueryBox">
      <div>
        <searchBox :searchCenter="searchCenter" @getSearchCenterShuJu="getSearchCenterShuJu"></searchBox>
      </div>
      <!-- 用户账户 -->
      <div>
        <dropDowbox :dropDowBox="dropDowBox" @getDropDownData="getDropDownData"></dropDowbox>
      </div>
      <!-- 用户角色 -->
      <div class="timeBox">
        <div>
          <dateTime :dateTimeData="datetimeDates" />
        </div>
        <!-- 开始时间 -->
        <div class="line"></div>
        <div>
          <dateTime :dateTimeData="datetimeDate" />
        </div>
        <!-- 结束时间 -->
      </div>
      <!-- 创建时间 -->
      <div class="btns">
        <div class="queryBtn">查询</div>
        <div class="clearBtn">清空</div>
      </div>
    </div>
    <!-- 头部 -->
    <div class="btnArr">
      <div class="setUser" @click="gotoRouterSetUserIng">创建</div>
      <div class="bianjiUser">编辑</div>
      <div class="remove">删除</div>
      <div class="goOn">查看</div>
      <div class="lodopFunClear">打印二维码</div>
    </div>
    <!-- but按钮 -->
    <div class="tableBox">
      <div class="center">
        <!-- <el-table :data='tableData' >  </el-table> -->
      </div>
      <!-- 表格主体 -->
      <div class="pageComponent">
        <pagecomponent
          :pageComponentsData="pageComponentsData"
          @getPageNum="getPageNum"
          @sureSuccssBtn="sureSuccssBtn"
        />
      </div>
    </div>
    <!-- table表格 -->
  </div>
</template>

<script>
import searchBox from "../../components/commin/searchBox"; //搜索框
import dropDowbox from "../../components/commin/dropDownBox"; //下拉框
import dateTime from "../../components/commin/dateTime.vue"; //时间
import pagecomponent from "../../components/commin/pageComponent"; //分页器

export default {
  components: {
    dropDowbox,
    searchBox,
    dateTime,
    pagecomponent,
  },
  data() {
    return {
      dropDowBox: {
        //下拉框需要的json
        title: "用户角色",
        dropDownBoxData: [
          "超级管理员",
          "客服",
          "运营",
          "兼职拣货人员",
          "兼职复核人员",
        ], //下拉需要的data
        placeholder: "超级管理员",
        disabled: false,
      },
      searchCenter: {
        //搜索框需要的json
        title: "用户账号",
        searchWrite: "",
        placeholder: "亲选择",
      },
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 25, //一共多少条 //默认一页10条
      },
      datetimeDate: {
        title: "sad",
        placeholder: "",
      },
      datetimeDates: {
        title: "asd",
        placeholder: "",
      },
    };
  },
  methods: {
    getDropDownData() {},
    getSearchCenterShuJu() {},
    getPageNum() {},
    sureSuccssBtn() {},
    gotoRouterSetUserIng() {
      //点击创建按钮
      this.$router.push({
        path: "/systemSetting/setUserIng",
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";

.userSettingBox {
  position: relative;
  .fuzzyQueryBox {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .timeBox {
      display: flex;
      align-items: center;
    }
    .btns {
      display: flex;
      align-items: center;
      .queryBtn {
        @include BtnFunction("success");
      }
      .clearBtn {
        @include BtnFunction();
      }
    }
  }
  .btnArr {
    text-align: right;
    margin-right: 10px;
    div {
      margin-right: 10px;
      display: inline-block;
    }
    .setUser {
      @include BtnFunction("success");
    }
    .bianjiUser {
      @include BtnFunction("success");
    }
    .remove {
      @include BtnFunction("error");
    }
    .goOn {
      @include BtnFunction("success");
    }
    .lodopFunClear {
      @include BtnFunction("success");
    }
  }
  .tableBox {
    .pageComponent {
      text-align: right;
    }
  }
}
</style>