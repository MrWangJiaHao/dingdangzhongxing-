<template>
  <div id="mainPage">
    <!-- 这是补货统计页面 -->
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
            <div class="el-inputBox-text">产品名称：</div>
            <div class="el-inputBox-checkBox" style="width: 400px">
              <el-input v-model="prodName" placeholder="模糊检索"> </el-input>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">产品编码：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="prodCode" placeholder="模糊检索"> </el-input>
            </div>
          </div>

          <div class="el-inputBox">
            <div class="el-inputBox-text">补货库位编号：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="buhuoCode" placeholder="请输入补货库位编号">
              </el-input>
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
            <el-table-column prop="orgName" label="委托公司" align="center">
            </el-table-column>
            <el-table-column
              prop="prodFullName"
              label="产品名称"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="prodCode" label="产品编码" align="center">
            </el-table-column>
            <el-table-column prop="specName" label="产品规格" align="center">
            </el-table-column>
            <el-table-column
              prop="wareSeatNo"
              label="补货库位编号"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="prodNum" label="补货数量" align="center">
            </el-table-column>
            <el-table-column prop="repNum" label="补货频次" align="center">
            </el-table-column>
            <el-table-column prop="sendNum" label="销售出库数量" align="center">
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
import { findRepStatistics, getFindWareOrg } from "../../api/api";
import { reduceFun, clearTimeInput } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      getExcelUrl:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/repStatistics/exportRepStatistics",
      tableData: [],
      entrustCompanyData: [],
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
        placeholder: "请选择开始时间",
      },
      prodCode: "",
      entrustCompany: "",
      prodName: "",
      ChildOrderState: "",

      buhuoCode: "",
      multipleSelection: [],
      queryData: {
        pageNumber: "1",
        pageSize: "10",
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
    this.pageQueryFun();
  },
  watch: {},
  methods: {
    pageQueryFun() {
      findRepStatistics(this.queryData).then((ok) => {
        // console.log(ok)
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this, this.changeData(ok.data.result);
        }
      });
    },
    entrustCompanys(val) {
      this.entrustCompany = val;
    },
    clickQuery() {
      //点击查询
      this.queryData.paras.orgName = this.entrustCompany;
      this.queryData.paras.prodFullName = this.prodName;
      this.queryData.paras.prodCode = this.prodCode;
      this.queryData.paras.wareSeatNo = this.buhuoCode;
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
