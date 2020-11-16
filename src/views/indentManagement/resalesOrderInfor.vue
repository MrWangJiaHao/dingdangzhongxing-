<template>
  <div class="mian">
    <div class="orderDetaiPage">
      <div class="orderDetailBox">
        <div class="orderDetail-title">退货单详情</div>
        <table>
          <tr>
            <td>退单号</td>
            <td>{{}}</td>
            <td>退单状态</td>
            <td>{{}}</td>
            <td>退货时间</td>
            <td>{{}}</td>
          </tr>
          <tr>
            <td>委托公司</td>
            <td>{{}}</td>
            <td>渠道</td>
            <td>{{}}</td>
            <td>订单来源</td>
            <td>{{}}</td>
          </tr>
          <tr>
            <td>主单号</td>
            <td>{{}}</td>
            <td>子单号</td>
            <td>{{}}</td>
            <td>订单状态</td>
            <td>{{}}</td>
          </tr>
          <tr>
            <td>收件人</td>
            <td>{{}}</td>
            <td>收件人电话</td>
            <td>{{}}</td>
            <td>收件人地址</td>
            <td>{{}}</td>
          </tr>
          <tr>
            <td>退货类型</td>
            <td>{{}}</td>
            <td>退货物流公司</td>
            <td>{{}}</td>
            <td>退货物流单号</td>
            <td>{{}}</td>
          </tr>
        </table>
      </div>
      <div class="orderDetailBox userInfor">
        <div class="orderDetail-title">发货信息</div>
        <table>
          <tr>
            <td>用户昵称</td>
            <td>{{}}</td>
            <td>联系电话</td>
            <td>{{}}</td>
          </tr>
          <tr>
            <td>收货人</td>
            <td>{{}}</td>
            <td>收货地址</td>
            <td>{{}}</td>
          </tr>
        </table>
      </div>
      <div class="orderDetailBox">
        <div class="orderDetail-title">退货商品明细</div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :stripe="true"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" align="center" type="index" width="60">
          </el-table-column>
          <el-table-column prop="" label="渠道商品编码" align="center">
          </el-table-column>
          <el-table-column prop="" label="渠道商品名称" align="center">
          </el-table-column>
          <el-table-column prop="prodCode" label="产品编码" align="center">
          </el-table-column>
          <el-table-column prop="prodFullName" label="产品名称" align="center">
          </el-table-column>
          <el-table-column prop="specName" label="产品规格" align="center">
          </el-table-column>
          <el-table-column prop="braName" label="品牌" align="center">
          </el-table-column>
          <el-table-column prop="prodNum" :label="whatLabel" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="backBtnBox">
        <div class="backBtn" @click="back">返回</div>
        <div class="submitBtn" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
// import {  } from "../../api/api";
// import { Message } from "element-ui";

export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/indentManagement/resalesIndentManage") {
      next((vm) => {
        if (vm.$route.query.type === "backOrderNo") {
          vm.whatLabel = "退货数量";
        }else if(vm.$route.query.type === "sureBtn"){
          vm.whatLabel = "实际退货数量";
        }
      });
    } else {
      next();
    }
  },
  data() {
    return {
      whatLabel: "实际退货数量",
      tableData: [],
      orderNo: "", //订单号
      subOrderStatus: "", //订单状态
      payTime: "", //支付时间
      orgName: "",
      channelName: "", //渠道
      orderSourceName: "", //订单来源名称
      pushTime: "", //下发时间
      exprName: "", //物流公司
      subOrderNo: "", //子订单ID
      id: "", //销售订单id
    };
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    submit() {},
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
        margin: 0 16px 0 0;
        @include BtnFunction("success");
      }
      .submitBtn {
        @include BtnFunction("success");
      }
    }
  }
  table {
    width: 100%;
    border: 1px solid #d1d6e2;
    border-collapse: collapse;
  }
  tr,
  td {
    border: 1px solid #d1d6e2;
  }
  td {
    padding: 10px 20px;
  }
  td:nth-of-type(odd) {
    text-align: right;
    background: #ecf1f7;
  }
  td:nth-of-type(even) {
    text-align: left;
    width: 25%;
    padding: 10px 20px;
  }
  .userInfor {
    td:nth-of-type(even) {
      width: 37%;
      padding: 10px 20px;
    }
  }
}
</style>