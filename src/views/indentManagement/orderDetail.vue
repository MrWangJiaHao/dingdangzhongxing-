<template>
  <div class="orderDetailMain">
    <div class="orderDetaiPage">
      <div class="orderDetailBox">
        <div class="orderDetail-title">订单详情</div>
        <table>
          <tr>
            <td>订单号</td>
            <td>{{ orderNo }}</td>
            <td>订单状态</td>
            <td>{{ subOrderStatus }}</td>
            <td>支付时间</td>
            <td>{{ payTime }}</td>
          </tr>
          <tr>
            <td>委托公司</td>
            <td>{{ orgName }}</td>
            <td>渠道</td>
            <td>{{ channelName }}</td>
            <td>订单来源</td>
            <td>{{ orderSourceName }}</td>
          </tr>
          <tr>
            <td>发货时间</td>
            <td>{{ pushTime }}</td>
            <td>物流公司</td>
            <td>{{ exprName }}</td>
            <td>备注</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="orderDetailBox userInfor">
        <div class="orderDetail-title">收货信息</div>
        <table>
          <tr>
            <td>用户昵称</td>
            <td></td>
            <td>联系电话</td>
            <td></td>
          </tr>
          <tr>
            <td>收货人</td>
            <td></td>
            <td>收货地址</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="orderDetailBox">
        <div class="orderDetail-title">商品明细</div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :stripe="true"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" align="center" type="index" width="71">
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
          <el-table-column prop="prodNum" label="购买数量" align="center">
          </el-table-column>
        </el-table>
      </div>
     
    </div>
     <div class="footerBtn">
      <div class="backBtn" @click="back">返回</div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import { childOrderInfor, sellOrderInfor } from "../../api/api";

export default {
  beforeRouteEnter(to, from, next) {
    if (
      from.name === "/indentManagement/sellIndentManage" ||
      from.name === "/indentManagement/zitiIndentManage" ||
      from.name === "/indentManagement/notLogisticsIndentManage" ||
      from.name === "/indentManagement/stockoutIndentManage" ||
      from.name === "/indentManagement/resalesIndentManage" ||
      from.name === "/deliveryManagement/normalDelivery" ||
      from.name === "/deliveryManagement/quetyNormal" ||
      from.name === "/deliveryManagement/delivetyNotePrint" || 
	  from.name==='/reviewConfig/reviewManagement'
    ) {
      next((vm) => {
        if (vm.$route.query.type === "orderNo") {
          let data = vm.$route.query.orderNo; 
          // console.log(data)
          vm.subOrderNo = data.subOrderNo;
          vm.id = data.id;
          vm.orderNo = data.orderNo;
          vm.subOrderStatus = data.subOrderStatus; //订单状态
          // vm.payTime = data.orderNo;//支付时间
          vm.orgName = data.orgName;
          vm.channelName = data.channelName;
          vm.orderSourceName = data.orderSourceName;
          vm.pushTime = data.pushTime;
          vm.exprName = data.exprName;
          vm.queryFun();
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
      queryFun: () => {},
    };
  },
  mounted() {
    this.queryFun = () => {
      let sellOrderQuery = {
        id: this.id,
      };
      sellOrderInfor(sellOrderQuery).then((ok) => {
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result;
        }
      });
    };
    this.queryFun();
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
.orderDetailMain {
  background: #eef1f8;
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
    background: #e1eaf5;
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

