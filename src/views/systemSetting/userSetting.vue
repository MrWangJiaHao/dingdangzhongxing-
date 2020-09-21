<template>
  <div class="userSettingBox">
    <div class="fuzzyQueryBox">
      <div class="biaogeBox">
        <div class="zujianBox">
          <searchBox
            :searchCenter="searchCenter"
            @getChangeInput="getChangeInput"
            @getSearchCenterShuJu="getSearchCenterShuJu"
          ></searchBox>
        </div>
        <!-- 用户账户 -->
        <div class="zujianBox">
          <dropDowbox :dropDowBox="dropDowBox" @getDropDownData="getDropDownData"></dropDowbox>
        </div>
        <!-- 用户角色 -->
        <div class="timeBox zujianBox">
          <div style="margin-right: 10px;">
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
      </div>

      <div class="btns">
        <div class="queryBtn zujianBox">查询</div>
        <div class="clearBtn">清空</div>
      </div>
    </div>
    <!-- 头部 -->
    <div class="btnArr">
      <div style="background-color:#fff;">
        <div class="meiyiyetitle">系统管理</div>
        <div class="btnClick">
          <div class="setUser" @click="gotoRouterSetUserIng">创建</div>
          <div class="bianjiUser">编辑</div>
          <div class="goOn">查看</div>
          <div class="lodopFunClear">打印二维码</div>
          <div class="remove">删除</div>
        </div>
      </div>
    </div>
    <!-- but按钮 -->
    <div class="tableBox">
      <div style="background-color:#fff; padding:20px 20px 0 20px;">
        <div class="center">
          <el-table
            ref="multipleTable"
            :data="tableData"
            :stripe="true"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
          </el-table>
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
    </div>
    <!-- table表格 -->
    <div class="lineBox">
      <div class="line"></div>
    </div>
    <Footers></Footers>
  </div>
</template>

<script>
import searchBox from "../../components/commin/searchBox"; //搜索框
import dropDowbox from "../../components/commin/dropDownBox"; //下拉框
import dateTime from "../../components/commin/dateTime.vue"; //时间
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import Footers from "../../components/footer"; //尾部

export default {
  components: {
    dropDowbox,
    searchBox,
    dateTime,
    pagecomponent,
    Footers,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
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
        placeholder: "请选择用户角色",
        disabled: false,
      },
      searchCenter: {
        //搜索框需要的json
        title: "用户账号",
        searchWrite: "",
        placeholder: "请输入要查询的用户账号",
      },
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 25, //一共多少条 //默认一页10条
      },
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "创建时间",
        placeholder: "请选择开始时间",
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
    getChangeInput(e) {
      //搜索框改变后的数据
      console.log(e);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style>
.searchBox .titleBox::before {
  content: "";
}
</style>
<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";

.userSettingBox {
  position: relative;
  top: 192px;
  border-top: 1px solid #d1d6e2;
  background-color: rgb(232, 233, 236);
  .fuzzyQueryBox {
    padding: 17px 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .biaogeBox {
      align-items: center;
      display: flex;
    }
    .timeBox {
      display: flex;
      align-items: center;
    }
    .line {
      width: 20px;
      height: 2px;
      background: #fff;
      margin-right: 10px;
    }
    .btns {
      display: flex;
      .queryBtn {
        @include BtnFunction("success");
      }
      .clearBtn {
        @include BtnFunction();
        background: #fff;
      }
    }
  }
  .btnArr {
    padding: 0 10px;
    > div {
      border-bottom: 1px solid #d1d6e2;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: inline-block;
      }
    }
    .meiyiyetitle {
      display: flex;
      align-items: center;
      &::before {
        background: url(../../assets/img/home_page-icon-default@2x.png) center
          center;
        background-size: cover;
      }
    }
    .setUser {
      margin-right: 10px;
      @include BtnFunction("success");
    }
    .bianjiUser {
      margin-right: 10px;
      @include BtnFunction("success");
    }
    .remove {
      @include BtnFunction("error");
    }
    .goOn {
      margin-right: 10px;
      @include BtnFunction("success");
    }
    .lodopFunClear {
      margin-right: 10px;
      @include BtnFunction("success");
    }
  }
  .tableBox {
    padding: 0 10px 0px 10px;
    .pageComponent {
      margin: 180px 10px 0 0;
      text-align: right;
      height: 36px;
      background: #ffffff;
      border: 1px solid #d1d6e2;
    }
  }
  .center {
    border: 1px solid #d1d6e2;
  }
  .lineBox {
    height: 25px;
    padding: 0 10px;
    > div {
      height: 100%;
      background: #fff;
    }
  }
}
</style>