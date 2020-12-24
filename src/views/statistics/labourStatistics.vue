<template>
  <div id="shipmentStatPage">
    <!-- 这是人工统计页面页面 -->
    <div class="headerHtml">
      <div class="headerInput">
        <div class="el-inputBox oname">
          <div class="el-inputBox-text">姓名：</div>
          <div class="el-inputBox-checkBox" style="width: 140px">
            <el-select
              v-model="oname"
              placeholder="请选择姓名"
              @change="onames"
              clearable
            >
              <el-option
                v-for="item in onameData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">角色：</div>
          <div class="el-inputBox-checkBox" style="width: 140px">
            <el-select
              v-model="orole"
              placeholder="请选择角色"
              @change="oroles"
              clearable
            >
              <el-option
                v-for="item in oroleData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">用户名：</div>
          <div class="el-inputBox-checkBox" style="width: 140px">
            <el-select
              v-model="ouser"
              placeholder="请选择用户名"
              @change="ousers"
              clearable
            >
              <el-option
                v-for="item in ouserData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="timeChoose el-inputBox">
          <div class="el-inputBox-text">{{ type }}开始时间：</div>
          <div class="timeBox">
            <div style="">
              <dateTime
                :dateTimeData="datetimeDates"
                @getDateTime="getStartTime"
                ref="startTime"
              />
            </div>
            <!-- 开始时间 -->
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="datetimeDate"
                @getDateTime="getEndTime"
                ref="endTime"
              />
            </div>
            <!-- 结束时间 -->
          </div>
        </div>
        
      </div>
      <div class="header-botton">
          <div class="queryBtn" @click="clickQuery">查询</div>
          <div class="clearBtn" @click="clearInput">清空</div>
        </div>
    </div>
    <div class="formBox">
      <el-tabs type="card" @tab-click="tabClickFun">
        <el-tab-pane :label="labelTitle + '统计'">
          <div class="formHeader">
            <div class="icon-title">
              <div class="icon-title-icon">
                <img src="../../assets/img/systemTitlemesa.png" />
              </div>
              <div class="icon-title-title">查询结果</div>
            </div>
            <div class="someBtn">
              <a class="setUser pickEduce" @click="pickEduce" target="_blank"
                >导出</a
              >
            </div>
          </div>
          <div class="formTable">
            <el-table
              :data="pickStatData"
              border
              style="width: 100%"
              :stripe="true"
              tooltip-effect="dark"
            >
              <el-table-column
                label="序号"
                align="center"
                type="index"
                width="60"
              >
              </el-table-column>
              <el-table-column prop="loginName" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="roleName" label="角色" align="center">
              </el-table-column
              ><el-table-column prop="userName" label="用户名" align="center">
              </el-table-column
              ><el-table-column
                prop="pickOrderCount"
                label="拣货总单数"
                align="center"
              >
              </el-table-column
              ><el-table-column
                prop="pickTimeCount"
                label="拣货总耗时(min)"
                align="center"
              >
              </el-table-column
              ><el-table-column
                prop="pickEffic"
                label="拣货效率(min/单)"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="mistakePickOrderCount"
                label="拣货错误订单数"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="errorEffic"
                label="出错率(%)"
                align="center"
              >
              </el-table-column>
            </el-table>
            <div class="pageComponent">
              <pagecomponent
                :pageComponentsData="pageComponentsData"
                @getPageNum="getPageNum"
                @sureSuccssBtn="sureSuccssBtn"
              ></pagecomponent>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="labelTitle1 + '统计'">
          <div class="formHeader">
            <div class="icon-title">
              <div class="icon-title-icon">
                <img src="../../assets/img/systemTitlemesa.png" />
              </div>
              <div class="icon-title-title">查询结果</div>
            </div>
            <div class="someBtn">
              <a
                class="setUser reCheckEduce"
                @click="reCheckEduce"
                target="_blank"
                >导出</a
              >
            </div>
          </div>
          <div class="formTable">
            <el-table
              :data="reCheckStatData"
              border
              style="width: 100%"
              :stripe="true"
              tooltip-effect="dark"
            >
              <el-table-column
                label="序号"
                align="center"
                type="index"
                width="60"
              >
              </el-table-column>
              <el-table-column prop="loginName" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="roleName" label="角色" align="center">
              </el-table-column>
              <el-table-column prop="userName" label="用户名" align="center">
              </el-table-column>

              <el-table-column
                prop="reCheckOrderCount"
                label="复核总单数"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="reCheckTimeCount"
                label="复核总耗时(min)"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="reCheckEffic"
                label="复核效率(min/单)"
                align="center"
              >
              </el-table-column>
            </el-table>
            <div class="pageComponent">
              <pagecomponent
                :pageComponentsData="pageComponentsData1"
                @getPageNum="getPageNum1"
                @sureSuccssBtn="sureSuccssBtn1"
              ></pagecomponent>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import dateTime from "../../components/commin/dateTime.vue"; //时间
import {
  findPickOrderStatistics,
  findReCheckOrderStatistics,
} from "../../api/api";
import { clearTimeInput } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      activeLabel: false,
      labelTitle: "拣货",
      labelTitle1: "复核",
      type: "拣货",
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
        placeholder: "请选择开始时间",
      },
      pageComponentsData: {
        pageNums: 0,
      },
      pageComponentsData1: {
        pageNums: 0,
      },
      pickExcelUrl:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/menStatistics/pickOrderExprotExcel",
      reCheckExcelUrl:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/menStatistics/reCheckOrderExprotExcel",
      onameData: [],
      oroleData: [],
      ouserData: [],
      pickStatData: [],
      reCheckStatData: [],
      oname: "",
      orole: "",
      ouser: "",
      pickQueryData: {
        pageNumber: 1,
        pageSize: 10,
        paras: {
          userId: "",
          roleId: "",
          loginName: "",
          pickStartTime: "",
          pickEndTime: "",
        },
      },
      reCheckQueryData: {
        pageNumber: 1,
        pageSize: 10,
        paras: {
          userId: "",
          roleId: "",
          loginName: "",
          reCheckStartTime: "",
          reCheckEndTime: "",
        },
      },
    };
  },
  mounted() {
    this.pickPageQueryFun();
    this.reCheckPageQueryFun();
  },
  watch: {},

  methods: {
    pickPageQueryFun() {
      findPickOrderStatistics(this.pickQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.pickStatData = [];
          this.pickStatData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.pickStatData.forEach((v) => {
            v.pickEffic = v.pickTimeCount / v.pickOrderCount;
            v.errorEffic = v.mistakePickOrderCount / v.pickOrderCount;
          });
        }
      });
    },
    reCheckPageQueryFun() {
      findReCheckOrderStatistics(this.reCheckQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.reCheckStatData = [];
          this.reCheckStatData = ok.data.result.list;
          this.changeData1(ok.data.result);
          this.reCheckStatData.forEach((v) => {
            v.reCheckEffic = v.reCheckTimeCount / v.reCheckOrderCount;
          });
        }
      });
    },
    clickQuery() {
      //点击查询
      if (this.activeLabel) {
        //复核统计
        console.log("复核统计");
        this.reCheckQueryData.paras.userId = this.userId;
        this.reCheckQueryData.paras.roleId = this.orole;
        this.reCheckQueryData.paras.loginName = this.oname;
        this.reCheckPageQueryFun();
      } else {
        //拣货统计
        console.log("拣货统计");
        this.pickQueryData.paras.userId = this.userId;
        this.pickQueryData.paras.roleId = this.orole;
        this.pickQueryData.paras.loginName = this.oname;
        this.pickPageQueryFun();
      }
    },
    clearInput() {
      //点击清空
      clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      Object.keys(this.pickQueryData.paras).forEach((v) => {
        this.pickQueryData.paras[v] = "";
      });
      Object.keys(this.reCheckQueryData.paras).forEach((v) => {
        this.reCheckQueryData.paras[v] = "";
      });
      this.reCheckPageQueryFun();
      this.pickPageQueryFun();
    },
    pickEduce() {
      //发货订单导出
      document
        .querySelector(".pickEduce")
        .setAttribute("href", this.pickExcelUrl);
    },
    reCheckEduce() {
      //发货单品导出
      document
        .querySelector(".reCheckEduce")
        .setAttribute("href", this.reCheckExcelUrl);
    },
    tabClickFun(val) {
      // console.log(val);
      if (val.label === "复核统计") {
        this.activeLabel = true;
        this.type = "复核";
      } else {
        this.activeLabel = false;
        this.type = "拣货";
      }
    },
    onames(val) {
      this.oname = val;
    },
    oroles(val) {
      this.orole = val;
    },
    ousers(val) {
      this.ouser = val;
    },
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
      this.orderPageQueryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getPageNum1(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn1(e) {
      this.queryData.pageNumber = e;
      this.itemPageQueryFun();
    },
    changeData1(data) {
      this.changePageData1(data);
    },
    changePageData1(data) {
      let { totalRow } = data;
      this.pageComponentsData1.pageNums = totalRow;
    },
    getStartTime(e) {
      if (this.activeLabel) {
        this.pickQueryData.paras.reCheckStartTime = e;
      } else {
        this.reCheckQueryData.paras.pickStartTime = e;
      }
    },
    getEndTime(e) {
      if (this.activeLabel) {
        this.pickQueryData.paras.reCheckEndTime = e;
      } else {
        this.reCheckQueryData.paras.pickEndTime = e;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

#shipmentStatPage {
  padding: 20px 10px;
}
.headerHtml {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  transition: 0.3s;
  position: relative;
  .headerInput {
    display: flex;
    flex-wrap: wrap;
    .el-inputBox {
      display: flex;
      align-items: center;
      margin: 0 20px 16px 0;
      .el-inputBox-text {
        white-space: nowrap;
      }
    }
  }
  .prodNameBox {
    display: none;
    align-items: center;
    margin: 0 20px 16px 0;
    .el-inputBox-text {
      white-space: nowrap;
    }
  }
  .prodCodeBox {
    @extend .prodNameBox;
  }
  .header-botton {
    margin-bottom: 16px;
    display: flex;
    align-items: flex-end;
    .queryBtn {
      @include BtnFunction("success");
    }
    .clearBtn {
      @include BtnFunction();
      background: #fff;
      margin: 0 0 0 10px;
    }
  }
  .timeChoose {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    .titleBox {
      font-size: 16px;
    }
    .timeBox {
      height: 34px;
      display: flex;
      align-items: center;
      .line {
        width: 10px;
        height: 2px;
        background: #d1d6e2;
        margin: 0 10px;
      }
    }
  }
}

.formBox {
  position: relative;
  margin: 4px 0;
  .formHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d2d6e2;
    background: white;
    .icon-title {
      display: flex;
      .icon-title-icon {
        width: 14px;
        height: 14px;
        margin: 0 0 0 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .icon-title-title {
        margin: -1px 0 0 8px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 20px 16px 0;
      .setUser {
        @include BtnFunction("success");
      }
      .takeOrdersDiv {
        margin-right: 10px;
        @include BtnFunction("success");
      }
    }
  }
  .formTable {
    background: white;
    padding: 16px 20px;
  }
}
</style>
<style lang="scss">
@import "../../assets/scss/btn.scss";

.oname {
  .el-select {
    width: 100%;
  }
}
#shipmentStatPage {
  .el-tabs__item.is-active {
    @include BtnFunction("success");
    border: 1px solid transparent;
  }
  .el-tabs__item {
    @include BtnFunction("");
    background: white;
    margin-right: 10px;
    border: 1px solid #d1d6e2;
  }
  .el-tabs--card > .el-tabs__header {
    border: none;
    position: absolute;
    left: 126px;
    top: 16px;
  }
}
</style>
