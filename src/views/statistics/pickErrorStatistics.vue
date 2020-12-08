<template>
  <div id="mianPage">
    <!-- 这是拣货错误明细页面 -->
    <div class="roleName">
      <div class="headerHtml">
        <div class="headerInput">
          <div class="el-inputBox entrustCompany">
            <div class="el-inputBox-text">姓名：</div>
            <div class="el-inputBox-checkBox" style="width: 120px">
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
            <div class="el-inputBox-checkBox" style="width: 120px">
              <el-select
                v-model="roleName"
                placeholder="请选择姓名"
                @change="roleNames"
                clearable
              >
                <el-option
                  v-for="item in roleNameData"
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
            <div class="el-inputBox-checkBox" style="width: 120px">
              <el-select
                v-model="userName"
                placeholder="请选择姓名"
                @change="userNames"
                clearable
              >
                <el-option
                  v-for="item in userNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="timeChoose el-inputBox">
            <div class="el-inputBox-text">补货时间：</div>
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
          <div class="header-botton">
            <div class="queryBtn" @click="clickQuery">查询</div>
            <div class="clearBtn" @click="clearInput">清空</div>
          </div>
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
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
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
              prop="pickStartTime"
              label="拣货开始时间"
              align="center"
              width="180"
              min-width="180"
            >
            </el-table-column>
            <el-table-column
              prop="pickEndTime"
              label="拣货结束时间"
              align="center"
              width="180"
              min-width="180"
            >
            </el-table-column>
            <el-table-column
              prop="channelOrderNo"
              label="订单号"
              align="center"
              width="190"
              min-width="190"
            >
            </el-table-column>
            <el-table-column
              prop="subOrderNo"
              label="子单号"
              align="center"
              width="190"
              min-width="190"
            >
            </el-table-column>
            <el-table-column prop="reCheckUser" label="复核人" align="center">
            </el-table-column>
            <el-table-column
              prop="reCheckStartTime"
              label="复核开始时间"
              align="center"
              width="180"
              min-width="180"
            >
            </el-table-column>
            <el-table-column
              prop="reCheckEndTime"
              label="复核结束时间"
              align="center"
              width="180"
              min-width="180"
            >
            </el-table-column>
            <el-table-column prop="reason" label="失败原因" align="center">
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
import { findPickOrderMistakeStatistics } from "../../api/api";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      getExcelUrl:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/menStatistics/reCheckOrderExprotExcel",
      tableData: [],
      userNameData: [],
      roleNameData: [],
      onameData: [],
      userName: "",
      roleName: "",
      oname: "",
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
        placeholder: "请选择开始时间",
      },
      prodCode: "",
      prodName: "",
      ChildOrderState: "",

      buhuoCode: "",
      multipleSelection: [],
      queryData: {
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
      pageComponentsData: {
        pageNums: 0,
      },
    };
  },
  mounted() {
    this.pageQueryFun();
  },
  watch: {},
  methods: {
    pageQueryFun() {
      findPickOrderMistakeStatistics(this.queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
        }
      });
    },
    userNames(val) {
      this.userName = val;
    },
    onames(val) {
      this.oname = val;
    },
    roleNames(val) {
      this.roleName = val;
    },
    clickQuery() {
      //点击查询
      this.queryData.paras.userId = this.oname;
      this.queryData.paras.roleId = this.roleName;
      this.queryData.paras.userName = this.userName;
      this.pageQueryFun();
    },
    clearInput() {
      //点击清空输入框
      this.clearTimeInput();
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
      this.pageQueryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getStartTime(e) {
      this.queryData.paras.pickStartTime = e;
    },
    getEndTime(e) {
      this.queryData.paras.pickEndTime = e;
    },
    clearTimeInput() {
      let input = document.getElementsByClassName("ivu-input");
      for (let i = 0; i < input.length; i++) {
        input[i].value = "";
      }
      let elInput = document.querySelectorAll(".el-input__inner");
      for (let i = 0; i < elInput.length; i++) {
        elInput[i].value = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

#mianPage {
  padding: 20px 10px;
}
.headerHtml {
  position: relative;
  padding: 0 16px;
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
    width: 186px;
    height: 36px;
    position: absolute;
    right: 0;
    bottom: 16px;
    display: flex;
    align-items: center;
    .queryBtn {
      @include BtnFunction("success");
    }
    .clearBtn {
      @include BtnFunction();
      background: #fff;
      margin: 0 16px 0 10px;
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
        margin: 2px 0 0 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .icon-title-title {
        margin: 0 0 0 8px;
        font-size: 16px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 16px 16px 0;
      .setUser {
        @include BtnFunction("success");
      }
    }
  }
  .resultForm {
    padding: 16px;
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
