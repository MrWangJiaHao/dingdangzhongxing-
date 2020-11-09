<template>
  <div class="mian">
    <div class="orderDetaiPage">
      <div class="orderDetailBox">
        <div class="orderDetail-title">订单日志</div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :stripe="true"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" align="center" type="index" width="60">
          </el-table-column>
          <el-table-column prop="operateType" label="操作" align="center">
          </el-table-column>
          <el-table-column prop="operateUser" label="操作人" align="center">
          </el-table-column>
          <el-table-column prop="operateTime" label="操作时间" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="backBtnBox">
        <div class="backBtn" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import { childOrderInfor } from "../../api/api";
import { Message } from "element-ui";

export default {
  beforeRouteEnter(to, from, next) {
    if (
      from.name === "/indentManagement/sellIndentManage" ||
      from.name === "/indentManagement/zitiIndentManage"
    ) {
      next((vm) => {
        if (vm.$route.query.type === "subOrderStatus") {
          let data = vm.$route.query.subOrderStatus;
          vm.subOrderNo = data.subOrderNo;
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
      tableData: [],
      subOrderNo: "",
    };
  },
  mounted() {
    let data = {
      subOrderNo: this.subOrderNo,
    };
    childOrderInfor(data).then((ok) => {
      if (ok.data.code === "10000") {
        // console.log(ok);
        this.tableData = ok.data.result;
        this.tableData.forEach((v) => {
          v.operateType =
            v.operateType === 0
              ? "拉取/手工"
              : v.operateType === 1
              ? "拆分"
              : v.operateType === 2
              ? "下发中"
              : v.operateType === 3
              ? "待审核"
              : v.operateType === 4
              ? "待分配"
              : v.operateType === 5
              ? "待合并"
              : v.operateType === 6
              ? "待打印"
              : v.operateType === 7
              ? "待拣货"
              : v.operateType === 8
              ? "待复核"
              : v.operateType === 9
              ? "重新拣货"
              : v.operateType === 10
              ? "已发货"
              : v.operateType === 11
              ? "已退单"
              : "";
        });
      } else {
        Message({
          message: "网络异常",
          type: "error",
        });
      }
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
.mian {
  background: #e3e4e8;
  padding: 10px;
  .orderDetaiPage {
    background: #fff;
    padding: 20px;
    .orderDetailBox {
      margin-bottom: 20px;
      .orderDetail-title {
        font-size: 16px;
        position: relative;
        margin: 0 0 20px 25px;
      }
      .orderDetail-title::before {
        content: "";
        width: 15px;
        height: 15px;
        background: url("../../assets/img/systemTitlemesa.png");
        position: absolute;
        left: -25px;
        top: 3px;
      }
    }
    .backBtnBox {
      width: 100%;
      .backBtn {
        margin: 0 auto;
        @include BtnFunction("success");
      }
    }
  }
}
</style>