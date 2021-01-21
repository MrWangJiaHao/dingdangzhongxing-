<template>
  <div id="createBreakage">
    <div class="main">
      <div class="headerBox">
        <div class="headerBox-input">
          <div class="el-inputBox">
            <div class="el-inputBox-text">借入方：</div>
            <div class="el-inputBox-checkBox">
              <el-input v-model="borrowSide" disabled> </el-input>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">期望入库时间：</div>
            <div class="timeChoose">
              <dateTime
                :dateTimeData="datetimeDates"
                @getDateTime="getStartTime"
                ref="startTime"
                :valueDataStart="saleDate"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="tableBox">
        <div class="tableBox-title">
          <div class="titleText">查询结果</div>
          <div class="titleBtn">
            <div class="add" @click="add">添加物料</div>
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
            max-height="400"
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
              width="71"
            >
            </el-table-column>
            <el-table-column prop="type" label="物料类型" align="center">
            </el-table-column>
            <el-table-column
              prop="materielCode"
              label="物料编号"
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
            <el-table-column
              prop="actualInventory"
              label="实际库存"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="materielNum"
              label="申请借调数量"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.materielNum"
                  class="materielNumInput"
                ></el-input>
              </template>
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
import { saveBorrowOrder, BorrowOrderDetail } from "../../api/api";
import dateTime from "../../components/commin/dateTime.vue"; //时间

import { getCookie, timeFormate } from "../../utils/validate";
export default {
  components: {
    dateTime,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "/borrowManagement/addBorrow") {
      next((vm) => {
        if (vm.$route.query.type === "addProd") {
          vm.requestData.id = "";
          vm.$route.query.val.forEach((v) => {
            vm.tableData.push(v);
          });
          // console.log(vm.tableData);
        }
      });
    }
    if (from.name === "/borrowManagement/borrowMain") {
      next((vm) => {
        vm.tableData = [];
        if (vm.$route.query.type === "edit") {
          vm.editObj = vm.$route.query.val;
          vm.requestData.id = vm.$route.query.val.id;
          vm.queryFun();
        }
      });
    } else {
      next();
    }
  },
  data() {
    return {
      saleDate: timeFormate(),
      borrowSide: this.$store.state.loginRequest.loginData.user.wareFullName,
      textarea: "",
      tableData: [],
      multipleSelection: [],
      datetimeDates: {
        placeholder: "请选择期望时间",
      },
      id: "",
      editObj: {},
      requestData: {
        id: "",
        loanNo: "", //借调单号
        loanStatus: "", //借调状态（1-待提交 2-待审核 3-审核通过 4-拒绝）
        reason: "", //借调原因
        wareId: getCookie("X-Auth-wareId"),
        wareName: this.$store.state.loginRequest.loginData.user.wareFullName,
        expectedSendTime: "", //期望入库时间
        inWareDetailList: [],
      },
    };
  },
  mounted() {},
  methods: {
    queryFun() {
      BorrowOrderDetail({ loanId: this.editObj.id }).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result;
        }
      });
    },
    add() {
      this.$router.push({
        path: "/borrowManagement/addBorrow",
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
          .catch(() => {});
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
        path: "/borrowManagement/borrowMain",
        query: { type: "quxiao" },
      });
    },
    submit() {
      console.log(this.saleDate)
      if (this.requestData.expectedSendTime === "") {
        return this.$messageSelf.message({
          message: "请选择期望入库时间",
          type: "warning",
        });
      }
      if (!this.tableData.length)
        return this.$messageSelf.message({
          message: "请添加产品",
          type: "warning",
        });
      let bool = true;
      document
        .querySelectorAll(".materielNumInput .el-input__inner")
        .forEach((v) => {
          if (v.value === "") {
            bool = false;
          }
        });
      if (!bool) {
        return this.$messageSelf.message({
          message: "请输入申请借调数量",
          type: "warning",
        });
      }
      this.tableData.forEach((v) => {
        this.requestData.inWareDetailList.push({
          materielId: v.materielId,
          materielNum: v.materielNum,
          materielCode: v.materielCode,
        });
      });
      saveBorrowOrder(this.requestData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.$router.push({
            path: "/borrowManagement/borrowMain",
            query: { type: "submit" },
          });
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
    getStartTime(e) {
      this.requestData.expectedSendTime = e;
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
    background: #eef1f8;
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
        padding: 0 20px;
        display: flex;
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
          left: -23px;
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
.textarea {
  .el-textarea__inner {
    height: 80px;
  }
}
.el-inputBox-checkBox .el-input__inner {
  color: #333 !important;
}
</style>