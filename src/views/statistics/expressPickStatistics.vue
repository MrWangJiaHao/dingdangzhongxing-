<template>
  <div id="mainPage">
    <!-- 这是快递拣货量统计页面 -->
    <div class="roleName">
      <div class="headerHtml">
        <div class="headerInput">
          <div class="el-inputBox entrustCompany">
            <div class="el-inputBox-text">委托公司：</div>
            <div class="el-inputBox-checkBox" style="width: 320px">
              <el-select
                v-model="entrustCompany"
                placeholder="请选择委托公司"
                @change="entrustCompanys"
                clearable
              >
                <el-option
                  v-for="item in entrustCompanyData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">渠道：</div>
            <div class="el-inputBox-checkBox" style="width: 120px">
              <el-select
                v-model="channelName"
                placeholder="请选择渠道"
                @change="channelNames"
                clearable
              >
                <el-option
                  v-for="item in channelNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">订单来源：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="orderSourceName"
                placeholder="请选择订单来源"
                @change="orderSourceNames"
                clearable
              >
                <el-option
                  v-for="item in orderSourceNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">物流公司：</div>
            <div class="el-inputBox-checkBox" style="width: 150px">
              <el-select
                v-model="expressName"
                placeholder="请选择物流公司"
                @change="expressNames"
                clearable
              >
                <el-option
                  v-for="item in expressNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="timeChoose el-inputBox">
            <div class="el-inputBox-text">发货时间：</div>
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
      <div class="childWarehouseForm">
        <div class="formHeader">
          <div class="icon-title">
            <div class="icon-title-icon">
              <img src="../../assets/img/systemTitlemesa.png" />
            </div>
            <div class="icon-title-title">查询结果</div>
          </div>
          <div class="someBtn">
            <a class="setUser" @click="educe" target="_blank">导出</a>
          </div>
        </div>
        <div class="resultForm">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :stripe="true"
            tooltip-effect="dark"
          >
            <el-table-column type="selection" width="82" align="center" fixed="left"> </el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="71"
            >
            </el-table-column>
            <el-table-column prop="orgName" label="委托公司" align="center">
            </el-table-column>
            <el-table-column prop="channelName" label="渠道" align="center">
            </el-table-column>
            <el-table-column
              prop="orderSourceName"
              label="订单来源"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="exprName" label="物流公司" align="center">
            </el-table-column>
            <el-table-column prop="sendNum" label="发货量" align="center">
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
      </div>
    </div>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import dateTime from "../../components/commin/dateTime.vue"; //时间
import { findExprStatistics, getFindWareOrg } from "../../api/api";
import { clearTimeInput, reduceFun } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      getExcelUrl:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/exprStatistics/exportExprStatistics",
      tableData: [],
      entrustCompany: "",
      channelName: "",
      orderSourceName: "",
      expressName: "",
      entrustCompanyData: [],
      channelNameData: [],
      orderSourceNameData: [],
      expressNameData: [],
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
        placeholder: "请选择开始时间",
      },
      multipleSelection: [],
      queryData: {
        pageNumber: "1",
        pageSize: "10",
        paras: {},
      },
      queryDataAll: {
        pageNumber: "1",
        pageSize: "999999",
        paras: {},
      },
      pageComponentsData: {
        pageNums: 0,
      },
    };
  },
  mounted() {
    getFindWareOrg().then((ok) => {
      // console.log(ok);
      if (ok.code === "10000") {
        ok.result.forEach((v) => {
          this.entrustCompanyData.push({
            value: v.id,
            label: v.orgName,
          });
        });
        this.entrustCompanyData = reduceFun(this.entrustCompanyData);
      }
    });
    findExprStatistics(this.queryDataAll).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        ok.data.result.list.forEach((v) => {
          this.channelNameData.push({
            value: v.channelId,
            label: v.channelName,
          });
          this.orderSourceNameData.push({
            value: v.orderSourceId,
            label: v.orderSourceName,
          });
          this.expressNameData.push({
            value: v.exprId,
            label: v.exprName,
          });
          this.channelNameData = reduceFun(this.channelNameData);
          this.orderSourceNameData = reduceFun(this.orderSourceNameData);
          this.expressNameData = reduceFun(this.expressNameData);
        });
      }
    });
    this.pageQueryFun();
  },
  watch: {},
  methods: {
    pageQueryFun() {
      findExprStatistics(this.queryData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
        }
      });
    },
    entrustCompanys(val) {
      this.entrustCompany = val;
      console.log(val)
    },
    channelNames(val) {
      this.channelName = val;
    },
    orderSourceNames(val) {
      this.orderSourceName = val;
    },
    expressNames(val) {
      this.expressName = val;
    },
    clickQuery() {
      //点击查询
      this.queryData.paras.orgId = this.entrustCompany;
      this.queryData.paras.channelName = this.channelName;
      this.queryData.paras.orderSourceName = this.orderSourceName;
      this.queryData.paras.exprName = this.expressName;
      this.pageQueryFun();
    },
    clearInput() {
      //点击清空输入框
      clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      Object.keys(this.queryData.paras).forEach((v) => {
        this.queryData.paras[v] = "";
      });
      this.pageQueryFun();
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    educe() {
      //导出表格
      document.querySelector(".setUser").setAttribute("href", this.getExcelUrl);
    },
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getStartTime(e) {
      this.queryData.paras.searchStartTime = e;
    },
    getEndTime(e) {
      this.queryData.paras.searchEndTime = e;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

#mainPage {
  background: #eef1f8;
  padding: 20px 10px;
}
.headerHtml {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px;
  transition: 0.3s;
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
.childWarehouseForm {
  margin: 4px 0 0 0;
  background: white;
  .formHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d1d6e2;
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
        margin: 0 0 0 8px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 20px 16px 0;
      .setUser {
        @include BtnFunction("success");
      }
    }
  }
  .resultForm {
    padding: 16px 20px;
  }
}
</style>
<style lang="scss">
.entrustCompany {
  .el-select {
    width: 100%;
  }
}
</style>
