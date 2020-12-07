<template>
  <div id="createBreakage">
    <div class="main">
      <div class="headerBox">
        <div class="headerBox-title">添加物料</div>
        <div class="header-content">
          <div class="headerBox-input">
            <div class="el-inputBox">
              <div class="el-inputBox-text">物料类型：</div>
              <div class="el-inputBox-checkBox" style="width: 120px">
                <el-select
                  v-model="mateType"
                  placeholder="请选择物料类型"
                  @change="mateTypes"
                  clearable
                >
                  <el-option
                    v-for="item in mateTypeData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="el-inputBox">
              <div class="el-inputBox-text">物料编码：</div>
              <div class="el-inputBox-checkBox" style="width: 120px">
                <el-input v-model="mateCode" placeholder="请输入物料编码">
                </el-input>
              </div>
            </div>
            <div class="el-inputBox">
              <div class="el-inputBox-text">物料名称：</div>
              <div class="el-inputBox-checkBox" style="width: 120px">
                <el-input v-model="mateName" placeholder="请输入物料名称">
                </el-input>
              </div>
            </div>
            <div class="el-inputBox">
              <div class="el-inputBox-text">物料规格：</div>
              <div class="el-inputBox-checkBox" style="width: 160px">
                <el-input v-model="mateSpec" placeholder="请输入物料规格">
                </el-input>
              </div>
            </div>
          </div>
          <div class="header-botton">
            <div class="queryBtn" @click="clickQuery">查询</div>
            <div class="clearBtn" @click="clearInput">清空</div>
          </div>
        </div>
      </div>
      <div class="tableBox">
        <div class="titleBtn">
          <div class="add"></div>
          <div class="del" @click="del">删除</div>
        </div>
        <div class="tableBox-table">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :stripe="true"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="60"
            >
            </el-table-column>
            <el-table-column prop="type" label="物料类型" align="center">
            </el-table-column>
            <el-table-column
              prop="materielCode"
              label="物料编码"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="materielName"
              label="物料名称"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="specName" label="物料规格" align="center">
            </el-table-column>
            <el-table-column prop="braName" label="品牌" align="center">
            </el-table-column>
            <el-table-column prop="supName" label="供应商" align="center">
            </el-table-column>
            <el-table-column
              prop="actualInventory"
              label="销售仓可用库存"
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
      </div>
    </div>
    <div class="footerBtnBox">
      <div class="backBtnBox">
        <div class="backBtn" @click="back">返回</div>
        <div class="submitBtn" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/

import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { queryMateRecord } from "../../api/api";
import { reduceFun } from "../../utils/validate";

export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/borrowManagement/createBorrowOrder") {
      next();
    } else {
      next((vm) => {
        vm.$router.go(-1);
      });
    }
  },
  components: {
    pagecomponent,
  },
  inject: ["reload"],
  data() {
    return {
      mateCode: "",
      mateName: "",
      mateType: "",
      prodCode: "",
      prodName: "",
      mateSpec: "",
      multipleSelection: [],
      tableData: [],
      mateTypeData: [
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
      pageComponentsData: {
        pageNums: 0,
      },
      pagingQueryData: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          materielName: "",
          materielType: "",
          supId: "",
          braId: "",
          type: "",
          startTime: "",
          endTime: "",
        },
      },
    };
  },
  mounted() {
    this.queryFun();
  },
  methods: {
    queryFun() {
      queryMateRecord(this.pagingQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData.forEach((v) => {
            v.type =
              v.type === 1
                ? "纸箱"
                : v.type === 2
                ? "胶带"
                : v.type === 3
                ? "打印纸"
                : "未知";
          });
        }
      });
    },
    clickQuery() {
      this.tableData = [];
      this.pagingQueryData.paras.materielCode = this.mateCode;
      this.pagingQueryData.paras.materielName = this.mateName;
      this.pagingQueryData.paras.specName = this.mateSpec;
      this.queryFun();
    },
    clearInput() {
      this.mateCode = "";
      this.mateName = "";
      this.mateType = "";
      this.mateSpec = "";
      this.tableData = [];
      Object.keys(this.pagingQueryData.paras).forEach((v) => {
        this.pagingQueryData.paras[v] = "";
      });
      this.queryFun();
    },
    mateTypes(val) {
      this.pagingQueryData.paras.type = val;
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    add() {},
    del() {
      this.$messageSelf.message("该功能待定");
    },
    back() {
      this.$router.push({ path: "/borrowManagement/createBorrowOrder" });
    },
    submit() {
      if (!this.multipleSelection.length)
        return this.$messageSelf, message("请选择需要借调的产品");
      this.$router.push({
        path: "/borrowManagement/createBorrowOrder",
        query: { val: this.multipleSelection, type: "addProd" },
      });
      this.reload();
    },
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
      this.tableData = [];
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

#createBreakage {
  .main {
    padding: 20px 10px;
    .headerBox {
      .headerBox-title {
        font-size: 16px;
        position: relative;
        margin: 0 0 20px 25px;
      }
      .headerBox-title::before {
        content: "";
        width: 15px;
        height: 15px;
        background: url("../../assets/img/systemTitlemesa.png");
        position: absolute;
        left: -25px;
        top: 3px;
      }
      .header-content {
        display: flex;
        justify-content: space-between;
      }
      .headerBox-input {
        margin: 0 16px;
        display: flex;
        font-size: 14px;
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
        height: 36px;
        display: flex;
        align-items: center;
        font-size: 14px;
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
    .tableBox {
      background: white;
      margin-top: 4px;
      .titleBtn {
        height: 69px;
        border-bottom: 1px solid #d2d6e2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .del {
          @include BtnFunction("error");
          margin-right: 20px;
        }
      }
      .tableBox-table {
        padding: 16px;
      }
    }
  }

  .backBtnBox {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 16px;
    .backBtn {
      margin: 0 16px 0 0;
      @include BtnFunction();
      background: white;
    }
    .submitBtn {
      @include BtnFunction("success");
    }
  }
}
</style>
