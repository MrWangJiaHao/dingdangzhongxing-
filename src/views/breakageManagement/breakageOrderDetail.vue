<template>
  <div class="breakageOrderDetail">
    <div class="orderDetaiPage">
      <div class="orderDetailBox">
        <div class="orderDetail-title">报损单详情</div>
        <table>
          <tr>
            <td>报损单号</td>
            <td>{{ BreakageData.damageOrderNo }}</td>
            <td>报损状态</td>
            <td>{{ BreakageData.disposeStatus }}</td>
            <td>委托公司</td>
            <td>{{ BreakageData.orgName }}</td>
          </tr>
          <tr>
            <td>报损类型</td>
            <td>{{ BreakageData.damageType }}</td>
            <td>创建时间</td>
            <td>{{ BreakageData.createTime }}</td>
            <td>创建人</td>
            <td>{{ BreakageData.createUser }}</td>
          </tr>
          <tr>
            <td>审核时间</td>
            <td></td>
            <td>审核人</td>
            <td></td>
            <td>备注</td>
            <td>{{ BreakageData.remark }}</td>
          </tr>
        </table>
      </div>
      <div class="orderDetailBox userInfor">
        <div class="orderDetail-title">产品明细</div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :stripe="true"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" align="center" type="index" width="71">
          </el-table-column>
          <el-table-column prop="prodCode" label="产品编码" align="center">
          </el-table-column>
          <el-table-column prop="prodName" label="产品名称" align="center">
          </el-table-column>
          <el-table-column prop="specName" label="产品规格" align="center">
          </el-table-column>
          <el-table-column prop="braName" label="品牌" align="center">
          </el-table-column>
          <el-table-column prop="prodNum" label="报损数量" align="center">
          </el-table-column>
          <el-table-column prop="wareSeatNo" label="当前库位" align="center">
          </el-table-column>
          <el-table-column
            prop="damagedSeatNo"
            label="残次品库位"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footerBtn">
      <div class="backBtn" @click="back">返回</div>
    </div>
  </div>
</template>

<script>
import { printBreakageOrder } from "../../api/api";

export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/breakageManagement/breakageMain") {
      next((vm) => {
        if (vm.$route.query.type === "damageOrderNo") {
          vm.BreakageData = vm.$route.query.damageOrderNo;
          vm.id = vm.$route.query.damageOrderNo.id;
          vm.queryInfor();
          // console.log(vm.BreakageData);
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
      BreakageData: {},
      id: "",
      tableData: [],
    };
  },
  mounted() {},
  methods: {
    queryInfor() {
      printBreakageOrder({ id: this.id }).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          ok.data.result[0].detailList.forEach((v) => {
            this.tableData.push(v.pOrgProducts);
            this.tableData.forEach((val) => {
              val.damagedSeatNo = v.damagedSeatNo;
              val.wareSeatNo = v.wareSeatNo;
              val.prodNum = v.prodNum;
            });
          });
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
.breakageOrderDetail {
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