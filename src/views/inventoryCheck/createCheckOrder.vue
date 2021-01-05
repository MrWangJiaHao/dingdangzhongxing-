<template>
  <div id="createCheckPlan">
    <div class="_mainPage">
      <div class="chooseInput">
        <div class="header-title">创建盘点单</div>
        <div class="condition specaddStar">
          <div>委托公司：</div>
          <div class="checkBoxDiv ml10">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全部</el-checkbox
            >
            <el-checkbox-group
              v-model="checkedOrgName"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="(v, i) in orgArr" :label="v" :key="i">{{
                v.label
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="condition specaddStar">
          <div>盘点分类：</div>
          <div class="radioBoxDiv ml10 mt5">
            <el-radio v-model="typeradio" label="1">按产品</el-radio>
            <el-radio v-model="typeradio" label="2">按库位</el-radio>
          </div>
        </div>
      </div>
      <div class="information">
        <div class="header-title">盘点分类详情</div>
        <div class="inputAndTable">
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
        <div class="oneKeySure checkBoxDiv">
          <el-checkbox v-model="Surechecked" @change="checkedChange"
            >按搜索条件盘点</el-checkbox
          >
        </div>
      </div>
      <div class="formBox">
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
          <el-table-column label="序号" align="center" type="index" width="71">
          </el-table-column>
          <el-table-column prop="orgName" label="委托公司"> </el-table-column>
          <el-table-column prop="prodCode" label="产品编号"> </el-table-column>
          <el-table-column prop="prodName" label="产品名称"> </el-table-column>
          <el-table-column prop="specName" label="产品规格"> </el-table-column>
          <el-table-column prop="braName" label="品牌"> </el-table-column>
        </el-table>
        <div class="pageComponent">
          <pagecomponent
            :pageComponentsData="pageComponentsData"
            @getPageNum="getPageNum"
            @sureSuccssBtn="sureSuccssBtn"
          ></pagecomponent>
        </div>
      </div>
      <div class="checkProd">盘点产品</div>
      <div class="formBox">
        <el-table
          :data="checkedTableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :stripe="true"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" align="center" type="index" width="71">
          </el-table-column>
          <el-table-column prop="orgName" label="委托公司"> </el-table-column>
          <el-table-column prop="prodCode" label="产品编号"> </el-table-column>
          <el-table-column prop="prodName" label="产品名称"> </el-table-column>
          <el-table-column prop="specName" label="产品规格"> </el-table-column>
          <el-table-column prop="braName" label="品牌"> </el-table-column>
          <el-table-column prop="operation" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footerBtn" :style="isBlock">
      <div class="backBtn" @click="back">返回</div>
      <div class="submitBtn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import {
  queryProductInfor,
  createCheckOrder,
  querySLInforCon,
} from "../../api/api";
import { clearTimeInput, getCookie, reduceFun } from "../../utils/validate";

export default {
  components: {
    pagecomponent,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "/inventoryCheck/checkOrderManagement") {
      next((vm) => {
        if (vm.$route.query.type === "create") {
          vm.operationType = "创建";
        } else if (vm.$route.query.type === "edit") {
          vm.operationType = "编辑";
          vm.needEditData = [];
          vm.needEditData = vm.$route.query.data;
          // console.log(vm.needEditData);
          vm.id = vm.$route.query.data.id;
          vm.checkPlanName = vm.$route.query.data.stockPlanName;
          vm.typeradio = vm.stockTypeFun(vm.$route.query.data.stockType);
          vm.cycelradio = vm.stockCycleFun(vm.$route.query.data.stockCycle);
        } else if (vm.$route.query.type === "look") {
          vm.isdisabled = true;
          vm.isBlock = "display:none";
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
      needEditData: {},
      operationType: "",
      checkAll: false,
      isIndeterminate: true,
      productBrand: "",
      checkedOrgName: [],
      orgArr: [],
      typeradio: "1",
      cycelradio: "0",
      Surechecked: false,
      entrustCompany: "",
      entrustCompanyData: [],
      productCode: "",
      productName: "",
      productSpecData: [],
      productBrandData: [],
      productSpec: "",
      pageComponentsData: {
        pageNums: 0,
      },
      tableData: [],
      checkedTableData: [],
      multipleSelection: [],
      queryprodData: {
        wareId: getCookie("X-Auth-wareId"),
        orgId: "4C2F466B16E94451B942EBBD07BE0F8B",
      },
      id: "",
      isdisabled: false,
      isBlock: "display:flex",
    };
  },
  watch: {
    multipleSelection: {
      handler(getArr) {
        this.checkedTableData = getArr;
      },
      deep: true, //深度监听
    },
    // multipleSelection(){
    //   this.checkedTableData = this.multipleSelection;
    // },
  },
  mounted() {
    this.$store.state.orgInfor.orgInforData.forEach((v) => {
      this.orgArr.push(v);
    });
    this.entrustCompanyData = this.$store.state.orgInfor.orgInforData;
    this.checkedOrgName.push(this.$store.state.orgInfor.orgInforData[0]);
    this.queryProdFun();
  },
  methods: {
    queryProdFun() {
      queryProductInfor(this.queryprodData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result;
          ok.data.result.forEach((v) => {
            this.productSpecData.push({
              value: v.specName,
              label: v.specName,
            });
          });
          this.productSpecData = reduceFun(this.productSpecData);
        } else {
          this.$messageSelf.message({ message: "查询产品失败", type: "error" });
        }
      });
    },

    clickQuery() {
      this.queryprodData.prodCode = this.productCode;
      this.queryprodData.prodName = this.productName;
      this.queryProdFun();
    },
    clearInput() {
      clearTimeInput();
      this.queryprodData.prodCode = "";
      this.queryprodData.prodName = "";
      this.queryprodData.specName = "";
      this.queryProdFun();
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
    stockCycleFun(data) {
      let states = "";
      switch (data) {
        case "周盘点":
          states = "0";
          break;
        case "月盘点":
          states = "1";
          break;
        case "季盘点":
          states = "2";
          break;
        case "半年盘点":
          states = "3";
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
      this.queryprodData.braId = val;
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    handleDelete(index, row) {
      //表格删除操作
      for (let i = 0; i < this.checkedTableData.length; i++) {
        if (this.checkedTableData[i] === row) {
          this.checkedTableData.splice(index, 1);
        }
      }
    },
    checkedChange(val) {
      if (val) {
        this.checkedTableData = this.tableData;
      } else {
        this.checkedTableData = [];
      }
    },
    back() {
      this.$router.push({ path: "/inventoryCheck/checkPlanManagement" });
    },
    submit() {
      if (this.checkPlanName === "")
        return this.$messageSelf.message({
          message: "请输入盘点计划名称",
          type: "warning",
        });
      let submitData = {
        id: this.id,
        ids: [],
        orgIds: [],
        stockCycle: this.cycelradio,
        stockOrgFlag: "2",
        stockName: "1",
        stockType: this.typeradio,
      };
      this.checkedOrgName.forEach((v) => {
        submitData.orgIds.push(v.value);
      });
      if (this.typeradio === "1") {
        submitData.ids = [];
        this.checkedTableData.forEach((v) => {
          submitData.ids.push(v.id);
        });
        this.submitRequest(submitData);
      } else if (this.typeradio === "2") {
        let data = {
          childWareId: "",
          wareAreaId: "",
          wareAreaType: "",
          wareShelfId: "",
          shelfLevelNum: "",
          id: "",
        };
        querySLInforCon(data).then((ok) => {
          // console.log(ok);
          if (ok.data.code === "10000") {
            submitData.ids = [];
            ok.data.result.forEach((v) => {
              submitData.ids.push(v.id);
            });
            this.submitRequest(submitData);
          } else {
            return this.$messageSelf.message({
              message: "查询库位信息失败",
              type: "error",
            });
          }
        });
      }
    },
    submitRequest(data) {
      createCheckOrder(data).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.$router.push({ path: "/inventoryCheck/checkOrderManagement" });
          this.$messageSelf.message({
            message: this.operationType + "成功",
            type: "success",
          });
        } else {
          this.$messageSelf.message({
            message: this.operationType + "失败",
            type: "error",
          });
        }
      });
    },
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

#createCheckPlan {
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
    .formBox {
      padding: 16px 0 0 43px;
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