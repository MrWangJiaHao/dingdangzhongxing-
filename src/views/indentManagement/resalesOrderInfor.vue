<template>
  <div class="mian">
    <div class="mainContent">
      <div class="orderDetaiPage">
        <div class="orderDetailBox">
          <div class="orderDetail-title">退货单详情</div>
          <table>
            <tr>
              <td>退单号</td>
              <td>{{ orderObj.backOrderNo }}</td>
              <td>退单状态</td>
              <td>{{ orderObj.disposeStatus }}</td>
              <td>退货时间</td>
              <td>{{ orderObj.returnMoneyTime }}</td>
            </tr>
            <tr>
              <td>委托公司</td>
              <td>{{ orderObj.orgName }}</td>
              <td>渠道</td>
              <td></td>
              <td>订单来源</td>
              <td>{{ orderObj.orderSourceName }}</td>
            </tr>
            <tr>
              <td>主单号</td>
              <td>{{ orderObj.orderNo }}</td>
              <td>子单号</td>
              <td>
                <div
                  class="subOrder"
                  v-for="(v, i) in orderObj.subOrderNos"
                  :key="i"
                >
                  {{ v }}
                </div>
              </td>
              <td>订单状态</td>
              <td></td>
            </tr>
            <tr>
              <td>收件人</td>
              <td>{{ orderObj.orderContact }}</td>
              <td>收件人电话</td>
              <td>{{ orderObj.orderContactPhone }}</td>
              <td>收件人地址</td>
              <td>{{ orderObj.orderAddr }}</td>
            </tr>
            <tr>
              <td>退货类型</td>
              <td>{{ orderObj.returnType }}</td>
              <td>退货物流公司</td>
              <td>{{ orderObj.exprName }}</td>
              <td>退货物流单号</td>
              <td>{{ orderObj.exprNo }}</td>
            </tr>
          </table>
        </div>
        <div class="orderDetailBox userInfor">
          <div class="orderDetail-title">发货信息</div>
          <table>
            <tr>
              <td>用户昵称</td>
              <td>{{ orderObj.nickName }}</td>
              <td>联系电话</td>
              <td>{{ orderObj.orderContactPhone }}</td>
            </tr>
            <tr>
              <td>收货人</td>
              <td>{{ orderObj.orderContact }}</td>
              <td>收货地址</td>
              <td>{{ orderObj.orderAddr }}</td>
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
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="60"
            >
            </el-table-column>
            <el-table-column prop="" label="渠道商品编码" align="center">
            </el-table-column>
            <el-table-column prop="" label="渠道商品名称" align="center">
            </el-table-column>
            <el-table-column prop="prodCode" label="产品编码" align="center">
            </el-table-column>
            <el-table-column
              prop="prodFullName"
              label="产品名称"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="specName" label="产品规格" align="center">
            </el-table-column>
            <el-table-column prop="braName" label="品牌" align="center">
            </el-table-column>
            <el-table-column prop="prodNum" label="退货数量" align="center">
            </el-table-column>
            <el-table-column
              prop="practical"
              label="实际退货数量"
              align="center"
              v-if="colShow"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.practical"></el-input>
              </template>
            </el-table-column>
          </el-table>
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
// import {  } from "../../api/api";
import { finishBackOrder } from "../../api/api";
import { getCookie } from "../../utils/validate";
export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/indentManagement/resalesIndentManage") {
      next((vm) => {
        if (vm.$route.query.type === "backOrderNo") {
          vm.colShow = false;
          vm.btnShow = false;
          vm.orderObj = vm.$route.query.backOrderNo;
        } else if (vm.$route.query.type === "sureBtn") {
          vm.colShow = true;
          vm.btnShow = true;
          vm.orderObj = vm.$route.query.sureBtn;
        }
      });
    } else {
      next();
    }
  },
  data() {
    return {
      colShow: false,
      btnShow: false,
      tableData: [],
      orderObj: {},
      inStoreSure: {
        backOrderDetails: [],
        wareId: getCookie("X-Auth-wareId"),
      },
    };
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    submit() {
      //提交按钮
      this.inStoreSure.backOrderDetails.push({
        backOrderDetailId: "", //退货详情id
        returnNum: this.practical, //实际退货数量
      });
      let sureData = this.inStoreSure;
      finishBackOrder(sureData).then((ok) => {
        console.log(ok);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
.mian {
  background: #eef1f8;
  .mainContent {
    padding: 10px;
  }
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