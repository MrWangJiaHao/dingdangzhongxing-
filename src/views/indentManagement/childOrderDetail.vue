<template>
  <div class="mian">
    <div class="orderDetaiPage">
      <div class="orderDetailBox">
        <div class="orderDetail-title">产品信息</div>
        <table>
          <tr>
            <td>订单号</td>
            <td>{{ orderNo }}</td>
            <td>子单号</td>
            <td>{{ subOrderNo }}</td>
            <td>子单状态</td>
            <td>{{ subOrderStatus }}</td>
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
            <td>下发时间</td>
            <td>{{ pushTime }}</td>
            <td>重量(KG)</td>
            <td>{{ weight }}</td>
            <td>体积(m³)</td>
            <td>{{ volume }}</td>
          </tr>
          <tr>
            <td>仓库运费模板编号</td>
            <td>{{ wareExprFeeCode }}</td>
            <td>仓库运费模板名称</td>
            <td>{{ wareExprFeeName }}</td>
            <td>委托公司运费模板编号</td>
            <td>{{ orgExprFeeCode }}</td>
          </tr>
          <tr>
            <td>委托公司运费模板名称</td>
            <td>{{ orgExprFeeName }}</td>
            <td>物流公司</td>
            <td>{{ exprName }}</td>
            <td>物流单号</td>
            <td>{{ exprNo }}</td>
          </tr>
          <tr>
            <td>运费(元)</td>
            <td>{{ exprFee }}</td>
            <td>推荐用箱</td>
            <td>{{ commendBox }}</td>
            <td>备注</td>
            <td>{{ remark }}</td>
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
          <el-table-column prop="prodNum" label="购买数量" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="orderDetailBox userInfor">
        <div class="orderDetail-title">操作明细</div>
        <div class="timeLineBox">
          <ul>
            <li v-for="(v, i) in timeLineArr" :key="i">
              <div class="leftLine" :style="{ background: v.background }"></div>
              <div class="middle">
                <div class="circle" :style="{ background: v.background }">
                  {{ v.number }}
                </div>
                <div class="text">{{ v.state }}</div>
              </div>
              <div
                class="rightLine"
                :style="{ background: v.background }"
              ></div>
            </li>
          </ul>
        </div>
        <el-table
          :data="tableData1"
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
import { childOrderInfor, sellOrderInfor } from "../../api/api";
import { Message } from "element-ui";

let willBackgroundColor = "#ddd";
let beforBackgroundColor = "#b0cff9";
let nowBackgroundColor = "#62a0f4";
export default {
  beforeRouteEnter(to, from, next) {
    if (
      from.name === "/indentManagement/sellIndentManage" ||
      from.name === "/indentManagement/zitiIndentManage"||
      from.name === "/indentManagement/notLogisticsIndentManage"||
       from.name === "/indentManagement/stockoutIndentManage"
    ) {
      next((vm) => {
        if (vm.$route.query.type === "subOrderNos") {
          let data = vm.$route.query.subOrderNos;
          vm.subOrderNo = data.subOrderNo;
          vm.id = data.id;
          vm.orderNo = data.orderNo;
          vm.subOrderStatus = data.subOrderStatus; //订单状态
          vm.orgName = data.orgName;
          vm.channelName = data.channelName;
          vm.orderSourceName = data.orderSourceName;
          vm.pushTime = data.pushTime;
          vm.exprName = data.exprName;
          vm.volume = data.volume;
          vm.weight = data.weight;
          vm.wareExprFeeCode = data.wareExprFeeCode;
          vm.wareExprFeeName = data.wareExprFeeName;
          vm.orgExprFeeCode = data.orgExprFeeCode;
          vm.orgExprFeeName = data.orgExprFeeName;
          vm.exprNo = data.exprNo;
          vm.exprFee = data.exprFee;
          vm.commendBox = data.commendBox;
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
      orderNo: "", //订单号
      subOrderStatus: "", //订单状态
      subOrderNo: "", //子订单号
      orgName: "",
      channelName: "", //渠道
      orderSourceName: "", //订单来源名称
      pushTime: "", //下发时间
      exprName: "", //物流公司
      volume: "", //体积
      weight: "", //重量
      wareExprFeeCode: "", //仓库运费模板编号
      wareExprFeeName: "", //仓库运费模板名称
      orgExprFeeCode: "", //委托公司运费模板编号
      orgExprFeeName: "", //仓库运费模板名称
      exprNo: "", //物流单号
      exprFee: "", //运费(元)
      commendBox: "", //推荐用箱
      remark: "", //备注
      id: "", //销售订单id
      tableData: [],
      tableData1: [],
      timeLineArr: [
        {
          number: 1,
          state: "待审核",
          background: willBackgroundColor,
        },
        {
          number: 2,
          state: "待集计",
          background: willBackgroundColor,
        },
        {
          number: 3,
          state: "待打印",
          background: willBackgroundColor,
        },
        {
          number: 4,
          state: "待拣货",
          background: willBackgroundColor,
        },
        {
          number: 5,
          state: "待复核",
          background: willBackgroundColor,
        },
        {
          number: 6,
          state: "已出库",
          background: willBackgroundColor,
        },
        {
          number: 7,
          state: "已揽件",
          background: willBackgroundColor,
        },
      ],
      val: 0,
    };
  },
  mounted() {
    let childOrderQuery = {
      subOrderNo: this.subOrderNo,
    };
    childOrderInfor(childOrderQuery).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        this.tableData1 = ok.data.result;
        let type = this.tableData1[this.tableData1.length - 1].operateType;
        if (type <= 3 || type === 4) {
          this.val = 1;
        } else if (type > 4 && type === 8) {
          this.val = type;
        } else if (type === 9) {
          this.val = 4;
        } else if (type === 10) {
          this.val = 6;
        }
        let val = this.val;
        this.timeLineArr.forEach((v) => {
          if (val === v.number) {
            v.background = nowBackgroundColor;
          }
          if (val > v.number) {
            v.background = beforBackgroundColor;
          }
          if (val < v.number) {
            v.background = willBackgroundColor;
          }
        });
        this.tableData1.forEach((v) => {
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
    let sellOrderQuery = {
      id: this.id,
    };
    sellOrderInfor(sellOrderQuery).then((ok) => {
      if (ok.data.code === "10000") {
        this.tableData = ok.data.result;
        this.tableData.forEach((v) => {
          v.specName = v.specName + "ml";
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
    .timeLineBox {
      width: 100%;
      padding: 0 4.3%;
      height: 90px;
      ul {
        width: 100%;
        display: flex;
        align-items: center;
        li {
          width: 14.07%;
          display: flex;
          align-items: center;
          margin-right: 4px;
          .leftLine {
            width: 104px;
            height: 8px;
            // background: #ddd;
          }
          .middle {
            position: relative;
            .circle {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              //   background: #ddd;
              text-align: center;
              line-height: 32px;
              font-size: 20px;
              color: #fff;
            }
            .text {
              width: 40px;
              position: absolute;
              left: -2px;
              margin-top: 8px;
            }
          }
          .rightLine {
            width: 104px;
            height: 8px;
            // background: #ddd;
          }
        }
      }
    }
  }
}
</style>
