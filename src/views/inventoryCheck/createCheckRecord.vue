<template>
  <div id="createCheckRecord">
    <div class="_mainPage">
      <div class="chooseInput">
        <div class="header-title">创建盘点记录</div>
        <div class="condition specaddStar checkOrderNo">
          <div>盘点单号：</div>
          <el-input v-model="checkOrderNo" disabled> </el-input>
        </div>
        <div class="condition specaddStar">
          <div>委托公司：</div>
          <div class="checkBoxDiv">
            {{ sendData.orgName }}
          </div>
        </div>
        <div class="condition specaddStar">
          <div>盘点分类：</div>
          <div class="radioBoxDiv ml10 mt5">
            <el-radio v-model="typeradio" label="1" disabled>按产品</el-radio>
            <el-radio v-model="typeradio" label="2" disabled>按库位</el-radio>
          </div>
        </div>
      </div>
      <div class="information">
        <div class="header-title">盘点记录列表</div>
        <div class="inputAndTable">
          <div class="headerInput">
            <div class="el-inputBox">
              <div class="el-inputBox-text">产品编号：</div>
              <div class="el-inputBox-checkBox" style="width: 140px">
                <el-input v-model="productCode" placeholder="请输入产品编号">
                </el-input>
              </div>
            </div>
            <div class="el-inputBox">
              <div class="el-inputBox-text">产品名称：</div>
              <div class="el-inputBox-checkBox" style="width: 140px">
                <el-input v-model="productName" placeholder="请输入产品名称">
                </el-input>
              </div>
            </div>
            <div class="el-inputBox">
              <div class="el-inputBox-text">产品规格：</div>
              <div class="el-inputBox-checkBox" style="width: 180px">
                <el-select
                  v-model="productSpec"
                  placeholder="请选择产品规格"
                  @change="productSpecs"
                  clearable
                >
                  <el-option
                    v-for="item in productSpecData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="el-inputBox">
              <div class="el-inputBox-text">品牌：</div>
              <div class="el-inputBox-checkBox" style="width: 140px">
                <el-select
                  v-model="productBrand"
                  placeholder="请选择品牌"
                  @change="productBrands"
                  clearable
                >
                  <el-option
                    v-for="item in productBrandData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="header-botton">
            <div class="queryBtn" @click="clickQuery">查询</div>
            <div class="quxiaoBox" @click="clearInput">清空</div>
          </div>
        </div>
      </div>
      <div class="formContent">
        <div class="formHeader">
          <div class="icon-title">
            <div class="icon-title-icon">
              <img src="../../assets/img/systemTitlemesa.png" />
            </div>
            <div class="icon-title-title">查询结果</div>
          </div>
          <div class="someBtn">
            <div class="successBtn" @click="save">保存</div>
            <div class="successBtn" @click="setnol">批量设置正常</div>
          </div>
        </div>
        <div class="formBox tableInInput">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :stripe="true"
            tooltip-effect="dark"
          >
            <el-table-column
              type="selection"
              width="82"
              align="center"
              fixed="left"
            >
            </el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="71"
            >
            </el-table-column>
            <el-table-column prop="prodCode" label="产品编号">
            </el-table-column>
            <el-table-column prop="prodName" label="产品名称">
            </el-table-column>
            <el-table-column prop="specName" label="产品规格">
            </el-table-column>
            <el-table-column prop="braName" label="品牌"> </el-table-column>
            <el-table-column prop="num" label="系统库存"> </el-table-column>
            <el-table-column prop="realInventory" label="实盘库存">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.realInventory"
                  placeholder="请输入实盘库存"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="diff" align="center" label="差异">
              <template slot-scope="scope">
                <div :style="iscolor">{{ scope.row.diff }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="inventoryStatus" label="盘点结果">
            </el-table-column>

            <el-table-column prop="reason" label="原因" width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.reason" placeholder="请输入原因">
                </el-input>
              </template>
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
    <div class="footerBtn">
      <div class="backBtn" @click="back">返回</div>
      <div class="submitBtn" @click="submit">提交</div>
    </div>
  </div>
</template>
<style lang="scss">
#createCheckRecord {
  .radioBoxDiv {
    .el-radio__input.is-disabled .el-radio__inner,
    .el-radio__input.is-disabled.is-checked .el-radio__inner {
      background: #409eff;
      border-color: #409eff;
    }
    .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
      background: #409eff;
    }
    .el-radio__input.is-disabled + span.el-radio__label {
      color: #606266;
    }
  }
  .checkOrderNo {
    .el-input {
      width: 300px !important;
      color: #666 !important;
    }
  }
}
</style>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import {
  queryCheckOrderDetails,
  checkOrderEntering,
  checkOrderSubmit,
} from "../../api/api";
import { clearTimeInput } from "../../utils/validate";

export default {
  components: {
    pagecomponent,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "/inventoryCheck/checkOrderManagement") {
      next((vm) => {
        if (vm.$route.query.type === "create") {
          vm.sendData = vm.$route.query.data;
          console.log(vm.sendData);
          if (vm.sendData.stockType === "按产品") {
            vm.typeradio = "1";
          } else {
            vm.typeradio = "2";
          }
          vm.checkOrderNo = vm.sendData.stockNo;
          vm.queryFun();
        }
      });
    } else {
      next((vm) => {
        vm.$router.go(-1);
      });
    }
  },
  data() {
    return {
      sendData: {},
      iscolor: "color:#333",
      checkOrderNo: "",
      typeradio: "1",
      Surechecked: false,
      entrustCompany: "",
      productBrand: "",
      entrustCompanyData: [],
      productBrandData: [],
      productCode: "",
      productName: "",
      productSpecData: [],
      productSpec: "",
      pageComponentsData: {
        pageNums: 0,
      },
      tableData: [
        // {
        //   realInventory: 5,
        //   num: 7,
        // },
        // {
        //   realInventory: 7,
        //   num: 5,
        // },
      ],
      multipleSelection: [],
    };
  },
  watch: {},
  mounted() {
    // this.queryFun();
  },
  methods: {
    queryFun() {
      queryCheckOrderDetails({ id: this.sendData.id }).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result;
          this.diffFun();
        }
      });
    },
    diffFun() {
      this.tableData.forEach((v) => {
        v.diff = v.realInventory - v.num;
        if (v.diff > 0) {
          this.iscolor = "color:#DF1515";
        } else if (v.diff < 0) {
          this.iscolor = "color:#5DBB2E";
        }
      });
    },
    clickQuery() {},
    clearInput() {
      clearTimeInput();
      this.queryprodData.prodCode = "";
      this.queryprodData.prodName = "";
      this.queryprodData.specName = "";
      this.queryProdFun();
    },
    save() {
      let data = {
        details: [],
        stockId: this.sendData.id,
      };

      this.tableData.forEach((v) => {
        if (v.realInventory === 0) {
          this.$messageSelf.message({
            message: "请输入实盘库存",
            type: "warning",
          });
          return;
        } else {
          data.details.push({
            realInventory: v.realInventory,
            reason: v.reason,
            stockDetailId: v.stockPlanId,
          });
          this.saveRequest(data);
        }
      });
    },
    saveRequest(data) {
      checkOrderEntering(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({ message: "保存成功", type: "success" });
        } else {
          this.$messageSelf.message({ message: "保存失败", type: "error" });
        }
      });
    },
    setnol() {
      this.tableData.forEach((v) => {
        v.realInventory = v.num;
      });
      this.diffFun();
    },
    handleCheckAllChange(val) {
      this.checkedOrgName = val ? this.orgArr : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.orgArr.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.orgArr.length;
    },
    stockTypeFun(data) {
      let states = "";
      switch (data) {
        case "按产品":
          states = "1";
          break;
        case "按库位":
          states = "2";
          break;
        default:
          break;
      }
      return states;
    },
    entrustCompanys(val) {
      this.entrustCompany = val;
    },
    productSpecs(val) {
      this.queryprodData.specName = val;
    },
    productBrands(val) {
      console.log(val);
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    back() {
      this.$router.push({ path: "/inventoryCheck/checkOrderManagement" });
    },
    submit() {
      checkOrderSubmit({ id: this.sendData.id }).then((ok) => {
        console.log(ok)
        if (ok.data.code === "10000") {
          this.$messageSelf.message({ message: "提交成功", type: "success" });
        } else {
          this.$messageSelf.message({ message: "提交失败", type: "error" });
        }
      });
    },
    submitRequest() {},
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
      this.queryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

#createCheckRecord {
  background: #eef1f8;
  padding: 10px;
  ._mainPage {
    background: white;
    padding: 20px;
    .header-title {
      position: relative;
      margin: 0 0 20px 25px;
    }
    .header-title::before {
      content: "";
      width: 15px;
      height: 15px;
      background: url("../../assets/img/systemTitlemesa.png");
      position: absolute;
      left: -25px;
      top: 2px;
    }
    .chooseInput {
      margin-bottom: 30px;
      .condition {
        margin: 0 0 0 15px;
        display: flex;
        align-items: center;
        height: 38px;
        .el-input {
          width: 240px;
        }
        .checkBoxDiv {
          margin-top: 3px;
          display: flex;
          align-items: center;
        }
      }
    }
    .inputAndTable {
      display: flex;
      justify-content: space-between;
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
        display: flex;
        .queryBtn {
          @include BtnFunction("success");
        }
        .quxiaoBox {
          @include BtnFunction();
          margin: 0 0 0 10px;
        }
      }
    }
    .formContent {
      margin: 4px 0 0 0;
      background: white;
      border: 1px solid #d1d6e2;
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
          .successBtn {
            @include BtnFunction("success");
            margin-left: 10px;
          }
          .errorBtn {
            @include BtnFunction("error");
            margin-left: 10px;
          }
        }
      }
      .formBox {
        padding: 16px 20px;
      }
    }
    .checkProd {
      margin-top: 16px;
    }

    .specaddStar {
      position: relative;
    }
    .specaddStar::before {
      content: "*";
      position: absolute;
      font-size: 20px;
      color: red;
      font-weight: bold;
      left: -15px;
      top: 30%;
    }
  }
  .footerBtn {
    height: 76px;
    background: white;
    border-top: 1px solid #d1d6e2;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .backBtn {
      margin: 0 10px 0 0;
      @include BtnFunction("");
      background: white;
      border: 1px solid #d1d6e2;
    }
    .submitBtn {
      margin: 0 20px 0 0;
      @include BtnFunction("success");
    }
  }
}
</style>
<style lang="scss">
.checkBoxDiv {
  .el-checkbox {
    margin-right: 20px;
    .el-checkbox__input {
      margin-top: -3px;
      .el-checkbox__inner {
        width: 11px !important;
        height: 11px !important;
        border-radius: 2px;
        // border: 1px solid #888 !important;
      }
      .el-checkbox__inner::after {
        height: 5px !important;
        left: 2px !important;
        top: 1px !important;
      }
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      top: 4px !important;
    }
    .el-checkbox__label {
      margin-top: 1px;
    }
  }
}
.radioBoxDiv {
  .el-radio__inner {
    background: white !important;
  }
  .el-radio__inner::after {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #409eff;
  }
  .el-radio__label {
    margin-top: 2px;
  }
}
.oneKeySure {
  .el-radio__label {
    font-size: 12px;
  }
}
.entrustCompany {
  .el-select {
    width: 100%;
  }
}
</style>