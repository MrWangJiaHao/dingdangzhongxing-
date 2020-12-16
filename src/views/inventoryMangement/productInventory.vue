<template>
  <div id="productInventory">
    <!-- 这是产品库存页面 -->
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
              <el-input v-model="productName" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">产品编码：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="productCode" placeholder="模糊检索">
              </el-input>
            </div>
          </div>

          <div class="el-inputBox">
            <div class="el-inputBox-text">规格：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="specName"
                placeholder="请选择规格"
                @change="specNames"
                clearable
              >
                <el-option
                  v-for="item in specNameData"
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
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="braName"
                placeholder="请选择品牌"
                @change="braNames"
                clearable
              >
                <el-option
                  v-for="item in braNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">低库存预警值：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="warningVal"
                placeholder="请选择"
                @change="warningVals"
                clearable
              >
                <el-option
                  v-for="item in warningValData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
            <div class="setUser" @click="turnToProc">转采购</div>
            <div class="setUser" @click="setWarning">设置高库存预警值</div>
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
            <el-table-column prop="prodCode" label="产品编码" align="left">
            </el-table-column>
            <el-table-column prop="prodName" label="产品名称" align="left">
            </el-table-column>
            <el-table-column
              prop="specName"
              label="产品规格"
              align="center"
              width="150"
              min-width="150"
            >
            </el-table-column>
            <el-table-column
              prop="braName"
              label="品牌"
              align="center"
              width="190"
              min-width="190"
            >
            </el-table-column>
            <el-table-column
              prop="currInventory"
              label="当前总库存"
              align="center"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="practicalInventory"
              label="销售仓实际库存"
              align="center"
              sortable
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="outOfProdNum"
              label="销售仓可用库存"
              align="center"
              sortable
              width="150"
            >
              <template slot-scope="scpoe">
                <div>
                  {{ scpoe.row.outOfProdNum }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="lockInventory"
              label="销售仓锁定库存"
              align="center"
              sortable
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="defectiveGoodsInventory"
              label="残次品仓库存"
              align="center"
              width="150"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="afterSaleInventory"
              label="售后仓库存"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="inventoryFloor"
              label="低库存预警值"
              align="center"
              width="150"
              min-width="150"
            >
            </el-table-column>
            <el-table-column
              prop="inventoryUpper"
              label="高库存预警值"
              align="center"
              width="160"
              min-width="160"
            ></el-table-column>
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
/*eslint-disable */
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { inventoryMangementQuery, bathUpdateRecord } from "../../api/api";
import { clearTimeInput, reduceFun } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      entrustCompany: "",
      productCode: "",
      productName: "",
      specName: "",
      braName: "",
      warningVal: "",
      entrustCompanyData: [],
      specNameData: [],
      braNameData: [],
      warningValData: [
        {
          value: "1",
          label: "达到",
        },
        {
          value: "2",
          label: "未达到",
        },
      ],
      tableData: [],
      multipleSelection: [],
      queryData: {
        pageNumber: "1",
        pageSize: "10",
        paras: {
          orgId: "",
          orgName: "",
          prodCode: "",
          prodName: "",
          specId: "",
          specName: "",
          prodType: "",
        },
      },
      queryDataAll: {
        pageNumber: "1",
        pageSize: "99999999",
        paras: {
          orgId: "",
          orgName: "",
          prodCode: "",
          prodName: "",
          specId: "",
          specName: "",
          prodType: "",
        },
      },
      pageComponentsData: {
        pageNums: 0,
      },
    };
  },
  mounted() {
    this.pageQueryFun();
    this.entrustCompanyData = this.$store.state.orgInfor.orgInforData;
    inventoryMangementQuery(this.queryDataAll).then((ok) => {
      console.log(ok);
      if (ok.data.code === "10000") {
        ok.data.result.list.forEach((v) => {
          this.specNameData.push({ value: v.specName, label: v.specName });
          this.specNameData = reduceFun(this.specNameData);
          // this.braNameData.push({value: v.braId, label: v.braName})
          this.braNameData.push({ value: v.tails.braId, label: v.braName });
          this.braNameData = reduceFun(this.braNameData);
        });
      }
    });
  },
  methods: {
    pageQueryFun() {
      inventoryMangementQuery(this.queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData.forEach((v) => {
            //销售仓实际库存=销售仓当前库存-销售仓锁定库存
            v.practicalInventory = v.currInventory - v.lockInventory;
          });
        }
      });
    },
    entrustCompanys(val) {
      this.queryData.paras.orgId = val;
    },
    warningVals(val) {
      this.warningVal = val;
    },
    specNames(val) {
      this.queryData.paras.specName = val;
    },
    braNames(val) {
      this.queryData.paras.braId = val;
    },
    clickQuery() {
      //点击查询
      this.queryData.paras.prodName = this.productName;
      this.queryData.paras.prodCode = this.productCode;
      this.queryData.paras.inventoryFloor = this.warningVal;
      this.pageQueryFun();
    },
    clearInput() {
      //点击清空输入框
      clearTimeInput();
      Object.keys(this.queryData.paras).forEach((v) => {
        this.queryData.paras[v] = "";
      });
      this.pageQueryFun();
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    turnToProc() {
      //转采购
      this.$router.push({
        path: "/purchasingManagement/purchasingIndex",
        query: { fromPage: "productInventory" },
      });
    },
    setWarning() {
      //设置高库存预警值
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length)
        return this.$messageSelf.message({
          message: "请选择要设置的产品",
          type: "warning",
        });
      this.$messageSelf
        .prompts("最高库存预警值", "批量设置最高库存预警", {
          // inputPattern: "",
          // inputErrorMessage: "请输入预警值",
          inputValidator: (num) => {
            if (num === null) {
              return "请输入预警值";
            }else if(!/^\d+$/.test(num)){
              return "输入数据不合法";
            }
          },
        })
        .then(({ value }) => {
          this.setRequest({ ids: arr, inventoryUpper: value });
        })
        .catch(() => {
          this.$messageSelf.message("已取消");
        });
    },
    setRequest(data) {
      bathUpdateRecord(data).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.$messageSelf.message({ message: "设置成功", type: "success" });
          this.pageQueryFun();
        } else {
          this.$messageSelf.message({ message: "设置失败", type: "error" });
        }
      });
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
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
#productInventory {
  padding: 20px 10px;
}
.headerHtml {
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
    width: 190px;
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
      margin: 0 0 0 10px;
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
        margin-left: 10px;
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
