<template>
  <div id="createBreakage">
    <div class="main">
      <div class="headerBox">
        <div class="headerBox-input">
          <div class="el-inputBox">
            <div class="el-inputBox-text">委托公司：</div>
            <div class="el-inputBox-checkBox">
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
            <div class="el-inputBox-text">报损类型：</div>
            <div class="el-inputBox-checkBox">
              <el-select
                v-model="breakageType"
                placeholder="请选择报损类型"
                @change="breakageTypes"
                clearable
              >
                <el-option
                  v-for="item in breakageTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="tableBox">
        <div class="tableBox-title">
          <div class="titleText">查询结果</div>
          <div class="titleBtn">
            <div class="add" @click="add">添加产品</div>
            <div class="del" @click="del">删除</div>
          </div>
        </div>
        <div class="tableBox-table tableInInput">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :stripe="true"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="82"
              align="center"
              fixed="left"
            ></el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="60"
            >
            </el-table-column>
            <el-table-column
              prop="childWareName"
              label="子仓名称"
              align="center"
              width="140"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="seatType" label="区域类型" align="center">
            </el-table-column>
            <el-table-column
              prop="wareAreaName"
              label="区域名称"
              align="center"
              width="140"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="prodCode" label="产品编码" align="center" width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="prodName" label="产品名称" align="center" width="160"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="specName" label="产品规格" align="center">
            </el-table-column>
            <el-table-column prop="braName" label="品牌" align="center">
            </el-table-column>
            <el-table-column
              prop="prodNum"
              label="当前库位产品数量"
              align="center"
              min-width="150"
            >
            </el-table-column>
            <el-table-column
              prop="prodNum"
              label="残次品库位产品数量"
              align="center"
              min-width="170"
            >
            </el-table-column>
            <el-table-column
              prop="prodNum"
              label="残次品库位最大存放数"
              align="center"
              min-width="180"
            >
            </el-table-column>
            <el-table-column prop="breakageNum" label="报损数量" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.breakageNum"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="wareSeatCode"
              label="当前库位"
              align="center"
              width="170"
              min-width="170"
            >
              <el-select
                v-model="scope.row.wareSeatCode"
                @change="currentKuweis"
                slot-scope="scope"
              >
                <el-option
                  v-for="item in currentKuweiData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-table-column>

            <el-table-column
              prop="imperfectKuweiValue"
              label="残次品库位"
              align="center"
              width="170"
              min-width="170"
            >
              <el-select
                slot-scope="scope"
                v-model="scope.row.imperfectKuweiValue"
                @change="imperfectKuweis"
              >
                <el-option
                  v-for="item in imperfectKuwei"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-table-column>
          </el-table>
        </div>
        <div class="remarkBox">
          <div class="remark">备注：</div>
          <div class="textarea">
            <el-input
              type="textarea"
              v-model="textarea"
              maxlength="100"
              show-word-limit
            ></el-input>
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
import {
  queryEntrustCompany,
  saveBreakageOrder,
  querySLInfor,
  printBreakageOrder,
} from "../../api/api";
import { getCookie } from "../../utils/validate";

export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/breakageManagement/addProduct") {
      next((vm) => {
        vm.tableData = [];
        if (vm.$route.query.type === "addProd") {
          vm.tableData = vm.$route.query.val;
          // console.log(vm.tableData);
        }
      });
    }
    if (from.name === "/breakageManagement/breakageMain") {
      next((vm) => {
        if (vm.$route.query.type === "edit") {
          vm.id = vm.$route.query.val.id;
          vm.queryFun();
        }
      });
    } else {
      next();
    }
  },
  data() {
    return {
      breakageType: "",
      entrustCompany: "",
      textarea: "",
      currentKuwei: "",
      breakageNum: "",
      imperfectKuweiValue: "",
      currentKuweiData: [],
      imperfectKuwei: [],
      tableData: [],
      entrustCompanyData: [],
      multipleSelection: [],
      breakageTypeData: [
        {
          value: "1",
          label: "损坏报损",
        },
        {
          value: "2",
          label: "入库报损",
        },
        {
          value: "3",
          label: "丢失报损",
        },
        {
          value: "4",
          label: "其他报损",
        },
      ],
      id: "",
    };
  },
  mounted() {
    //查询残次品库位
    let queryData = {
      orderBy: "createTime",
      pageNumber: 1,
      pageSize: 999999,
      paras: {
        childWareId: "",
        wareAreaId: "",
        wareAreaType: "",
        wareShelfId: "",
        shelfLevelNum: "",
        wareSeatCode: "",
        id: "",
      },
    };
    querySLInfor(queryData).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        ok.data.result.list.forEach((v) => {
          if (v.wareType === 3) {
            this.imperfectKuwei.push({ value: v.wareSeatCode });
          }
        });
      }
    });
    //查询委托公司
    let data = {
      wareId: getCookie("X-Auth-wareId"),
      orgId: "",
    };
    queryEntrustCompany(data).then((ok) => {
      // console.log(ok)
      if (ok.code === "10000") {
        ok.result.forEach((v) => {
          this.entrustCompanyData.push({
            value: v.id,
            label: v.orgName,
          });
        });
      }
    });
  },
  methods: {
    queryFun() {
      printBreakageOrder({ id: this.id }).then((ok) => {
        // console.log(ok)
        if (ok.data.code === "10000") {
          this.tableData = [];
          ok.data.result[0].detailList.forEach((v) => {
            this.tableData.push(v.pOrgProducts);
          });
        }
      });
    },
    entrustCompanys(val) {
      this.entrustCompany = val;
    },
    breakageTypes(val) {
      this.breakageType = val;
    },
    currentKuweis(val) {
      this.currentKuwei = val;
    },
    imperfectKuweis(val) {
      this.imperfectKuweiValue = val;
    },
    add() {
      this.$router.push({
        path: "/breakageManagement/addProduct",
        query: { type: "add" },
      });
    },
    del() {
      if (!this.multipleSelection.length) {
        return this.$messageSelf.message({
          message: "请选择需要删除的产品",
          type: "error",
        });
      } else {
        return this.$messageSelf
          .confirms(
            `共选择了${this.multipleSelection.length}个产品,确定删除吗`,
            "删除确认",
            { type: "warning" }
          )
          .then(() => {
            this.delHandObj(this.tableData, this.multipleSelection);
            return this.$messageSelf.message({
              message: "删除成功",
              type: "success",
            });
          })
          .catch(() => {
            return this.$messageSelf.message({
              message: "取消删除",
              type: "error",
            });
          });
      }
    },
    delHandObj(arr, delArr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < delArr.length; j++) {
          if (arr[i].id === delArr[j].id) {
            arr.splice(i, 1);
            delArr.splice(j, 1);
            i--;
          } else {
            break;
          }
        }
      }
      return arr;
    },
    back() {
      this.$router.push({
        path: "/breakageManagement/breakageMain",
        query: { type: "quxiao" },
      });
    },
    submit() {
      if (this.entrustCompany === "" || this.breakageType === "") {
        return this.$messageSelf.message({
          message: "请选择委托公司或者报损类型",
          type: "warning",
        });
      }
      if (!this.tableData.length)
        return this.$messageSelf.message({
          message: "请添加产品",
          type: "warning",
        });
      let submitData = {
        createTime: "",
        createUser: "",
        damageOrderNo: "",
        damageType: this.breakageType,
        detailList: [],
        disposeStatus: "", //报损状态
        id: "", //报损单id
        lastModifyTime: "",
        lastModifyUser: "",
        orgId: this.entrustCompany,
        orgName: "",
        remark: this.textarea, //备注
        verifyTime: "", //审核时间
        verifyUserId: "", //审核人id
        verifyUserName: "", //审核人
        version: "",
      };
      this.tableData.forEach((v) => {
        submitData.detailList.push({
          actualProdNum: 0,
          batchNo: "",
          createTime: "",
          createUser: "",
          damageId: "", //报损单id
          damagedSeatId: "", //残次品库位id
          damagedSeatNo: v.imperfectKuweiValue, //残次品库位编号
          damagedWareAreaId: "", //残次品仓库区域id
          damagedWareAreaName: "", //残次品仓库区域名称
          id: "",
          lastModifyTime: "",
          lastModifyUser: "",
          manufTime: "",
          orgId: v.orgId,
          orgName: v.orgName,
          prodId: v.prodId,
          prodName: v.prodName,
          prodNum: v.breakageNum,
          remark: "",
          version: "",
          wareAreaId: v.wareAreaId,
          wareAreaName: v.wareAreaName,
          childWareId: v.childWareId,
          childWareName: v.childWareName,
        });
      });
      saveBreakageOrder(submitData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.$router.push({ path: "/breakageManagement/breakageMain" });
          this.$messageSelf.message({
            message: "创建成功",
            type: "success",
          });
        } else {
          this.$messageSelf.message({
            message: "创建失败",
            type: "error",
          });
        }
      });
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
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
      margin-bottom: 20px;

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

      .headerBox-input {
        display: flex;
        font-size: 14px;
        padding: 0 16px;

        .el-inputBox {
          display: flex;
          align-items: center;
          margin-right: 20px;
        }
      }
    }
    .tableBox {
      background: white;
      .tableBox-title {
        border-bottom: 1px solid #d1d6e2;
        height: 69px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .titleText {
          position: relative;
          margin-left: 46px;
        }

        .titleText::before {
          content: "";
          width: 15px;
          height: 15px;
          background: url("../../assets/img/systemTitlemesa.png");
          position: absolute;
          left: -25px;
          top: 3px;
        }
        .titleBtn {
          display: flex;
          .add {
            @include BtnFunction("success");
            margin-right: 10px;
          }
          .del {
            @include BtnFunction("error");
            margin-right: 20px;
          }
        }
      }

      .tableBox-table {
        padding: 16px 20px;
      }
      .remarkBox {
        padding: 0 20px 20px;
        display: flex;
        align-items: center;
        .remark {
          margin-bottom: 10px;
        }
        .textarea {
          width: 700px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
#createBreakage {
  .textarea {
    .el-textarea__inner {
      height: 60px;
    }
  }

  // .el-table td,
  // .el-table th {
  //   padding: 4px 0 !important;
  // }
  // .tableBox {
  //   .el-input__inner {
  //     height: 26px;
  //   }
  //   .el-icon-arrow-up:before {
  //     margin-bottom: 6px;
  //   }
  // }
}
</style>