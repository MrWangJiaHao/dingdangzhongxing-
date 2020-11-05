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
          <el-table-column prop="orderSourceName" label="操作" align="center">
          </el-table-column>
          <el-table-column prop="orderSourceName" label="操作人" align="center">
          </el-table-column>
          <el-table-column
            prop="orderSourceName"
            label="操作时间"
            align="center"
          >
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
export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/indentManagement/sellIndentManage") {
      next((vm) => {
        if (vm.$route.query.type === "subOrderStatus") {
          console.log(vm.$route.query.subOrderStatus);
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
    };
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