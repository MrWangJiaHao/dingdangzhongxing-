<template>
  <div id="addBreakProduct">
    <div class="main">
      <div class="headerBox">
        <div class="headerBox-title">选择产品</div>
        <div class="header-content">
          <div class="headerBox-input">
            <div class="el-inputBox">
              <div class="el-inputBox-text">子仓名称：</div>
              <div class="el-inputBox-checkBox" style="width: 160px">
                <el-select
                  v-model="childStoreName"
                  placeholder="请选择子仓名称"
                  @change="childStoreNames"
                  clearable
                >
                  <el-option
                    v-for="item in childStoreNameData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="el-inputBox">
              <div class="el-inputBox-text">区域名称：</div>
              <div class="el-inputBox-checkBox" style="width: 150px">
                <el-select
                  v-model="areaName"
                  placeholder="请选择区域名称"
                  @change="areaNames"
                  clearable
                >
                  <el-option
                    v-for="item in areaNameData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="el-inputBox">
              <div class="el-inputBox-text">区域类型：</div>
              <div class="el-inputBox-checkBox" style="width: 150px">
                <el-select
                  v-model="areaType"
                  placeholder="请选择区域类型"
                  @change="areatypes"
                  clearable
                >
                  <el-option
                    v-for="item in areaTypeData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="el-inputBox">
              <div class="el-inputBox-text">产品规格：</div>
              <div class="el-inputBox-checkBox" style="width: 160px">
                <el-select
                  v-model="prodSpec"
                  placeholder="请选择产品规格"
                  @change="prodSpecs"
                  clearable
                >
                  <el-option
                    v-for="item in prodSpecData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="el-inputBox">
              <div class="el-inputBox-text">产品编码：</div>
              <div class="el-inputBox-checkBox" style="width: 160px">
                <el-input v-model="prodCode" placeholder="请输入产品编码"> </el-input>
              </div>
            </div>
            <div class="el-inputBox">
              <div class="el-inputBox-text">产品名称：</div>
              <div class="el-inputBox-checkBox" style="width: 400px">
                <el-input v-model="prodName" placeholder="请输入产品名称"> </el-input>
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
          <div class="icon-title">
            <div class="icon-title-icon">
              <img src="../../assets/img/systemTitlemesa.png" />
            </div>
            <div class="icon-title-title">查询结果</div>
          </div>
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
            :row-key="getRowKeys"
          >
            <el-table-column
              type="selection"
              width="82"
              align="center"
              fixed="left"
              :reserve-selection="true"
            ></el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="71"
            >
            </el-table-column>
            <el-table-column
              prop="childWareName"
              label="子仓名称"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="seatType" label="区域类型" align="center">
            </el-table-column>
            <el-table-column
              prop="wareAreaName"
              label="区域名称"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="prodCode" label="产品编码" align="center">
            </el-table-column>
            <el-table-column prop="prodName" label="产品名称" align="center">
            </el-table-column>
            <el-table-column prop="specName" label="产品规格" align="center">
            </el-table-column>
            <el-table-column prop="braName" label="品牌" align="center">
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
        <div class="footerBtn">
          <div class="backBtn" @click="back">返回</div>
          <div class="submitBtn" @click="submit">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { storeMapRelation } from "../../api/api";
import { reduceFun } from "../../utils/validate";

export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      getRowKeys(row){
        return row.id
      },
      areaName: "",
      areaType: "",
      childStoreName: "",
      prodCode: "",
      prodName: "",
      prodSpec: "",
      multipleSelection: [],
      tableData: [],
      childStoreNameData: [],
      areaNameData: [],
      areaTypeData: [
        {
          value: "1",
          label: "存储区",
        },
        {
          value: "2",
          label: "拣货区",
        },
      ],
      prodSpecData: [],

      pageComponentsData: {
        pageNums: 0,
      },
      queryData: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          orgId: "", //委托公司id
          prodName: "", //产品名称
          prodCode: "", //产品编码
          childWareId: "", //子仓id
          wareAreaId: "", //区域id
        },
      },
      queryData1: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 999999,
        paras: {
          orgId: "", //委托公司id
          prodName: "", //产品名称
          prodCode: "", //产品编码
          childWareId: "", //子仓id
          wareAreaId: "", //区域id
        },
      },
    };
  },
  mounted() {
    // let requestData = {
    //   paras: {
    //     orgId: "",
    //   },
    //   pageNumber: 1,
    //   pageSize: 10,
    // };
    // findDamageProductPage(requestData).then((ok)=>{
    //   console.log(ok)
    // });
    storeMapRelation(this.queryData1).then((ok) => {
      if (ok.data.code === "10000") {
        ok.data.result.list.forEach((v) => {
          if (v.childWareName !== "") {
            this.childStoreNameData.push({
              value: v.childWareId,
              label: v.childWareName,
            });
          }
          this.childStoreNameData = reduceFun(this.childStoreNameData);
          this.areaNameData.push({
            value: v.wareAreaId,
            label: v.wareAreaName,
          });
          this.areaNameData = reduceFun(this.areaNameData);
          if (v.specName !== "") {
            this.prodSpecData.push({
              value: v.specName,
              label: v.specName,
            });
          }
          this.prodSpecData = reduceFun(this.prodSpecData);
        });
      }
    });
    this.queryFun();
  },
  methods: {
    queryFun() {
      storeMapRelation(this.queryData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
      this.tableData = [];
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData.forEach((v) => {
            v.seatType = v.seatType === 2 ? "拣货区" : "存储区";
          });
        }
      });
    },
    clickQuery() {
      this.queryData.paras.prodCode = this.prodCode;
      this.queryData.paras.prodName = this.prodName;
      this.queryData.paras.specName = this.prodSpec;
      this.queryFun();
    },
    clearInput() {
      this.areaName = "";
      this.areaType = "";
      this.childStoreName = "";
      this.prodCode = "";
      this.prodName = "";
      this.prodSpec = "";
      Object.keys(this.queryData.paras).forEach((v) => {
        this.queryData.paras[v] = "";
      });
      this.queryFun();
    },
    childStoreNames(val) {
      //   this.childStoreName = val;
      this.queryData.paras.childWareId = val;
    },
    areaNames(val) {
      //   this.areaName = val;
      this.queryData.paras.wareAreaId = val;
    },
    areatypes(val) {
      //   this.areaType = val;
      this.queryData.paras.seatType = val;
    },
    prodSpecs(val) {
      //   this.prodSpec = val;
      this.queryData.paras.specName = val;
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    add() {},
    del() {
      this.$messageSelf.message({ message: "该功能待定", type: "warning" });
    },
    back() {
      this.$router.push({ path: "/breakageManagement/createBreakageOrder" });
    },
    submit() {
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择报损的产品",
          type: "warning",
        });
      this.$router.push({
        path: "/breakageManagement/createBreakageOrder",
        query: { val: this.multipleSelection, type: "addProd" },
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

#addBreakProduct {
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
        display: flex;
        align-items: flex-end;
        font-size: 14px;
        margin-bottom: 16px;
        .queryBtn {
          @include BtnFunction("success");
        }
        .clearBtn {
          @include BtnFunction();
          background: #fff;
          margin: 0 16px 0 10px;
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
        .icon-title {
          display: flex;
          .icon-title-icon {
            width: 14px;
            height: 14px;
            margin: 1px 0 0 20px;
          }
          .icon-title-title {
            margin: 0 0 0 8px;
          }
        }
        .del {
          @include BtnFunction("error");
          margin-right: 20px;
        }
      }
      .tableBox-table {
        padding: 16px 20px;
      }
    }
  }
}
</style>
