<template>
  <!-- 这是物料库存页面 -->
  <div id="mateAdmin">
    <div class="roleName">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="nameBox">
            <div class="roleName-text">物料类型：</div>
            <div class="roleName-checkBox" style="width: 150px">
              <el-select
                v-model="mateTypeValue"
                placeholder="请选择物料类型"
                @change="mateTypeValues"
                clearable
              >
                <el-option
                  v-for="item in mateTypeValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">物料名称：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="mateNameValue"
                placeholder="请选择物料名称"
                @change="mateNameValues"
                clearable
              >
                <el-option
                  v-for="item in mateNameValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">规格：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="mateSpecValue"
                placeholder="请选择规格"
                @change="mateSpecValues"
                clearable
              >
                <el-option
                  v-for="item in mateSpecValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">供应商：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="supNameValue"
                placeholder="请选择供应商"
                @change="supNameValues"
                clearable
              >
                <el-option
                  v-for="item in supNameValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">品牌：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="brandNameValue"
                placeholder="请选择品牌"
                @change="brandNameValues"
                clearable
              >
                <el-option
                  v-for="item in brandNameValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">低库存预警：</div>
            <div class="roleName-checkBox" style="width: 120px">
              <el-select
                v-model="inventoryFloorValue"
                @change="inventoryFloors"
                clearable
              >
                <el-option
                  v-for="item in inventoryFloorData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="roleName-botton">
          <div class="queryBtn" @click="clickQuery">查询</div>
          <div class="clearBtn" @click="clearInput">清空</div>
        </div>
      </div>
      <div class="childWarehouseForm">
        <div class="resultForm">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :stripe="true"
            tooltip-effect="dark"
          >
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="71"
            >
            </el-table-column>
            <el-table-column prop="materielName" label="物料名称" align="left">
            </el-table-column>
            <el-table-column
              prop="materielCode"
              label="物料编号"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="specName" label="物料规格" align="center">
            </el-table-column>
            <el-table-column
              prop="materielType"
              label="物料类型"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="braName" label="品牌" align="center">
            </el-table-column>
            <el-table-column
              prop="supName"
              label="供应商"
              align="left"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="inventoryFloor"
              label="低库存预警值"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="actualInventory"
              label="实际库存"
              align="center"
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
import {
  queryMateAdmin,
  queryBrandCon,
  querySupplierCon,
  querySpecCon,
  queryMateAdmintj,
} from "../../api/api";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { reduceFun } from "../../utils/validate";

export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      tableData: [],
      tableData1: [],
      mateTypeValue: "",
      mateNameValue: "",
      mateSpecValue: "",
      supNameValue: "",
      brandNameValue: "",
      inventoryFloorValue: "",
      mateTypeValueData: [
        {
          value: "1",
          label: "纸箱",
        },
        {
          value: "2",
          label: "胶带",
        },
        {
          value: "3",
          label: "打印纸",
        },
      ],
      mateNameValueData: [],
      mateSpecValueData: [],
      supNameValueData: [],
      brandNameValueData: [],
      inventoryFloorData: [
        { value: "0", label: "未达到" },
        { value: "1", label: "达到" },
      ],
      pageComponentsData: {
        pageNums: 0,
      },
      queryData: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          unReach: "",
          materielType: "",
          id: "",
          specId: "",
          supId: "",
          braId: "",
        },
      },
      queryAnyInfor: "",
      allBrandData: [],
      allSupData: [],
      allSpecData: [],
      queryMateAdminFun: () => {},
    };
  },
  mounted() {
    this.queryMateAdminFun = () => {
      queryMateAdmin(this.queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.changeData(ok.data.result);
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.tableData.forEach((v) => {
            this.mateTypeValueData.forEach((vv) => {
              if (v.materielType == +vv.value) {
                v.materielType = vv.label;
              }
            });
          });
        }
      });
    };
    this.queryMateAdminFun();
    this.querySelectData()
    this.queryAnyInfor = () => {
      //查询品牌
      queryBrandCon({ wareId: "", id: "" }).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          ok.data.result.forEach((v) => {
            this.brandNameValueData.push({
              value: v.id,
              label: v.braFullName,
            });
            this.brandNameValueData = reduceFun(this.brandNameValueData);
          });
        }
      });
      //查询供应商
      querySupplierCon({ wareId: "", id: "" }).then((ok) => {
        if (ok.data.code === "10000") {
          ok.data.result.forEach((v) => {
            this.supNameValueData.push({
              value: v.id,
              label: v.supFullName,
            });
            this.supNameValueData = reduceFun(this.supNameValueData);
          });
        }
      });
      //查询规格
      querySpecCon({ wareId: "", id: "" }).then((ok) => {
        if (ok.data.code === "10000") {
          ok.data.result.forEach((v) => {
            this.mateSpecValueData.push({
              value: v.id,
              label: v.specValue,
            });
            this.mateSpecValueData = reduceFun(this.mateSpecValueData);
          });
        }
      });
    };
    this.queryAnyInfor();
  },
  methods: {
    querySelectData() {
      queryMateAdmintj({
        unReach: "",
        materielType: "",
        id: "",
        specId: "",
        supId: "",
        braId: "",
      }).then((ok) => {
        if (ok.data.code === "10000") {
          ok.data.result.forEach((v) => {
            this.mateNameValueData.push({
              value: v.id,
              label: v.materielName,
            });
          });
          this.mateNameValueData = reduceFun(this.mateNameValueData);
        }
      });
    },
    clickQuery() {
      //查询
      this.queryMateAdminFun();
    },

    clearInput() {
      //清空输入框
      this.mateTypeValue = "";
      this.mateNameValue = "";
      this.mateSpecValue = "";
      this.supNameValue = "";
      this.brandNameValue = "";
      this.inventoryFloorValue = "";
      Object.keys(this.queryData.paras).forEach((v) => {
        this.queryData.paras[v] = "";
      });
      this.queryMateAdminFun();
    },
    mateTypeValues(val) {
      this.queryData.paras.materielType = val;
    },
    mateNameValues(val) {
      this.queryData.paras.id = val;
    },
    mateSpecValues(val) {
      this.queryData.paras.specId = val;
    },
    supNameValues(val) {
      this.queryData.paras.supId = val;
    },
    brandNameValues(val) {
      this.queryData.paras.braId = val;
    },
    inventoryFloors(val) {
      this.queryData.paras.unReach = val;
    },
    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.pagingQueryData.pageNumber = e;
      this.queryMateAdminFun();
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
#mateAdmin {
  background: #eef1f8;
  padding: 20px 10px;
}
.roleName-choose {
  display: flex;
  justify-content: space-between;
  .name_type {
    display: flex;
    padding: 0 0 0 16px;
    flex-wrap: wrap;
    .nameBox {
      display: flex;
      align-items: center;
      margin: 0 20px 16px 0;
      .roleName-text {
        font-size: 14px;
        white-space: nowrap;
      }
      .roleName {
        height: 76px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #d1d6e2;
        .roleName-choose {
          width: 360px;
          display: flex;
          align-items: center;
          .roleName-text {
            margin: 0 10px 0 30px;
            font-size: 16px;
          }
        }
      }
    }
  }

  .roleName-botton {
    display: flex;
    align-items: flex-end;
    margin-bottom: 20px;
    .queryBtn {
      @include BtnFunction("success");
    }
    .clearBtn {
      @include BtnFunction();
      background: #fff;
      margin: 0 20px 0 10px;
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
    }
  }
  .resultForm {
    padding: 16px 20px;
  }
}
</style>

<style lang="scss">
</style>