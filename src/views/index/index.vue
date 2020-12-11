<template>
  <div id="indexMain">
    <!-- 这是首页的页面 -->
    <div class="indexContainer">
      <Breadcrumd></Breadcrumd>
      <div class="numberInfor1">
        <div class="numberInfor1-data">
          <div class="numberInfor1-img">
            <img src="@/assets/img/messageInfor.png" />
          </div>
          <div class="numberInfor1-num1">
            <span>今日发货总单数：</span>
            <span>{{ todaySend }}</span>
            <span>&nbsp;单</span>
            <span>&nbsp;[{{ rateData }}]</span>
          </div>
          <div class="numberInfor1-num2">
            <span>昨日发货总单数：</span>
            <span>{{ yesterdaySend }}</span>
            <span>&nbsp;单</span>
          </div>
          <div class="numberInfor1-num3">
            <span>今日平均发货速率：</span>
            <span>{{ todaySendRate }}</span>
            <span>&nbsp;单/h/人</span>
          </div>
        </div>
        <div class="numberInfor1-upTime">
          <span>更新时间:&nbsp;</span>
          <span>{{ timeFormate() }}</span>
        </div>
      </div>
      <div class="numberInfor2">
        <div
          class="numberInfor2-area"
          v-for="(v, i) in inforArr2"
          :key="i"
          @click="detailInfor(i)"
        >
          <div class="area-img">
            <img :src="v.img" />
          </div>
          <div class="area-number">{{ v.number }}</div>
          <div class="area-text">{{ v.text }}</div>
        </div>
      </div>
      <div class="warehouseStatistics">
        <div class="ws-area1">
          <div class="area1-title">
            <div class="area1-title-text">仓库发货人员统计</div>
            <div
              class="iconfont icon-ziyuan area1-title-icon"
              @click="detail1"
            ></div>
          </div>
          <div class="ws-area1-echarts">
            <StaffEcharts></StaffEcharts>
          </div>
        </div>
        <div class="ws-area2">
          <div class="area2-title">
            <div class="area2-title-text">仓库发货人员效率统计</div>
            <div class="area2-title-button">
              <router-link to="/index/indexFormJH">拣货</router-link>
              <router-link to="/index/indexFormFH">复核</router-link>
              <span
                class="iconfont icon-ziyuan area2-title-icon"
                @click="detail2"
              ></span>
            </div>
          </div>
          <div>
            <router-view></router-view>
          </div>
        </div>
      </div>
      <div class="echartsInfor">
        <div class="infor-one">
          <div class="infor-one-title">
            <div class="one-title-text">委托公司发货量统计</div>
            <div
              class="iconfont icon-ziyuan one-title-icon"
              @click="detail3"
            ></div>
          </div>
          <div class="infor-one-echarts">
            <!-- <ShipmentsEcharts></ShipmentsEcharts> -->
            <Shipment></Shipment>
          </div>
        </div>
        <div class="infor-two">
          <div class="infor-two-title">
            <div class="two-title-text">退货订单量统计</div>
            <div
              class="iconfont icon-ziyuan two-title-icon"
              @click="detail4"
            ></div>
          </div>
          <div class="infor-two-echarts">
            <ResalesEcharts></ResalesEcharts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/iconfont/iconfont.css"; //引入字体图标文件
import Breadcrumd from "../../components/breadcrumd"; //引入面包屑组件
import Shipment from "../../components/echarts/shipment"; //引用发货量统计echarts组件
import ResalesEcharts from "../../components/echarts/resalesEcharts.vue"; //引用退货量统计echarts组件
import StaffEcharts from "../../components/echarts/staffEcharts.vue"; //引用发货人员统计echarts组件

import ciexnhoex from "@/assets/img/ciexnhoex.png";
import disaggregate from "@/assets/img/disaggregate.png";
import orderPicking from "@/assets/img/orderPicking.png";
import recheck from "@/assets/img/recheck.png";
import pickingFail from "@/assets/img/pickingFail.png";
import pullGoods from "@/assets/img/pullGoods.png";

import { indexRequest } from "../../api/api";
export default {
  components: {
    Breadcrumd,
    ResalesEcharts,
    StaffEcharts,
    Shipment,
  },
  data() {
    return {
      inforArr2: [
        { img: ciexnhoex, number: "0", text: "缺货订单数" },
        { img: disaggregate, number: "0", text: "待集计订单数" },
        { img: orderPicking, number: "0", text: "待拣货订单数" },
        { img: recheck, number: "0", text: "待复核订单数" },
        { img: pickingFail, number: "0", text: "拣货错误订单数" },
        { img: pullGoods, number: "0", text: "待揽件订单数" },
      ],
      todaySend: 0, //今日发货数量、
      yesterdaySend: 0, //昨日发货数
      todaySendRate: 0, //今日发货速率
      rateData: "0.00%",
    };
  },
  mounted() {
    let indexQueryData = {
      searchEndTime: "",
      searchStartTime: "",
      wareId: "",
    };
    indexRequest(indexQueryData).then((ok) => {
      console.log(ok);
      if (ok.data.code === "10000") {
        this.inforArr2[0].number = ok.data.result.prodOrder;
        this.inforArr2[1].number = ok.data.result.megerOrder;
        this.inforArr2[2].number = ok.data.result.pickOrder;
        this.inforArr2[3].number = ok.data.result.reCheckOrder;
        this.inforArr2[4].number = ok.data.result.reCheckFailOrder;
        this.inforArr2[5].number = ok.data.result.sendOrder;
        this.todaySend = ok.data.result.todaySend;
        this.yesterdaySend = ok.data.result.yesterdaySend;
      } else {
        this.$messageSelf.message({
          type: "error",
          message: ok.data.msg,
        });
      }
    });
    this.timeFormate();
  },
  methods: {
    timeFormate() {
      // 获取当前时间函数
      let year = new Date().getFullYear();
      let month =
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      let date =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      let hh =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      let mm =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      return (
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss
      );
    },
    detail1() {
      this.$router.push({ path: "/statistics/labourStatistics" });
    },
    detail2() {
      this.$router.push({ path: "/statistics/labourStatistics" });
    },
    detail3() {
      this.$router.push({ path: "/statistics/shipmentStatistics" });
    },
    detail4() {
      this.$router.push({ path: "/indentManagement/resalesIndentManage" });
    },
    detailInfor(i) {
      switch (i) {
        case 0:
          this.$router.push({ path: "/indentManagement/stockoutIndentManage" });
          break;
        case 1:
          this.$router.push({ path: "/deliveryManagement/normalDelivery" });
          break;
        case 2:
          this.$router.push({ path: "/deliveryManagement/pickingList" });
          break;
        case 3:
          this.$router.push({ path: "/indentManagement/sellIndentManage" });
          break;
        case 4:
          this.$messageSelf.message({
            message: "该模块还在开发中",
            type: "warning",
          });
          break;
        case 5:
          this.$messageSelf.message({
            message: "该模块还在开发中",
            type: "warning",
          });
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
#indexMain {
  padding: 0 0 16px 0;
  position: relative;
  height: 100%;
  background: #eef1f8;
  .indexContainer {
    width: 100%;
    margin: 0 auto;
    position: relative;
    height: 100%;
    .numberInfor1 {
      height: 80px;
      border-radius: 4px;
      margin: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      .numberInfor1-data {
        display: flex;
        align-items: center;
        background: white;
        .numberInfor1-img {
          width: 54px;
          height: 54px;
          margin: 0 0 0 29px;
        }
        .numberInfor1-num1 {
          padding: 0 44px 0 27px;
          border-right: 1px #f2e9e8 solid;
          span {
            font-size: 16px;
          }
          span:nth-of-type(2) {
            font-size: 20px;
            color: #3998eb;
            font-weight: 500;
          }
          span:nth-of-type(4) {
            color: #fb7572;
          }
        }
        .numberInfor1-num2 {
          padding: 0 50px;
          border-right: 1px #f2e9e8 solid;
          span {
            font-size: 16px;
          }
          span:nth-of-type(2) {
            font-size: 20px;
            color: #3998eb;
            font-weight: 500;
          }
        }
        .numberInfor1-num3 {
          padding: 0 50px;
          span {
            font-size: 16px;
          }
          span:nth-of-type(2) {
            font-size: 20px;
            color: #3998eb;
            font-weight: 500;
          }
        }
      }
      .numberInfor1-upTime {
        margin: 0 18px 0 0;
        span {
          color: #666666;
          font-size: 14px;
        }
      }
    }
    .numberInfor2 {
      height: 239px;
      display: flex;
      margin: 0 0 16px 16px;
      .numberInfor2-area {
        cursor: pointer;
        flex: 1;
        height: 239px;
        border-radius: 4px;
        margin-right: 16px;
        background: white;
        .area-img {
          width: 117px;
          height: 89px;
          margin: 26px auto 10px;
          position: relative;
          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .area-number {
          font-size: 42px;
          color: #2f4646;
          text-align: center;
        }
        .area-text {
          color: #919191;
          font-size: 16px;
          text-align: center;
        }
      }
    }
    .warehouseStatistics {
      height: 480px;
      display: flex;
      margin: 0 16px 16px 16px;
      .ws-area1 {
        width: 20.45%;
        height: 480px;
        border-radius: 4px;
        background: white;
        margin: 0 16px 0 0;
        padding: 0 30px;
        .area1-title {
          height: 76px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          .area1-title-icon {
            cursor: pointer;
            font-weight: bold;
          }
        }
        .ws-area1-echarts {
          height: 404px;
        }
      }
      .ws-area2 {
        width: 79.48%;
        height: 480px;
        border-radius: 4px;
        background: white;
        padding: 0 30px;
        .area2-title {
          height: 76px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          .area2-title-button {
            display: flex;
            align-items: center;
            a {
              display: block;
              width: 72px;
              height: 34px;
              background: #ffffff;
              border: 1px solid #cbcbcb;
              border-radius: 4px;
              margin: 0 16px 0 0;
              cursor: pointer;
              outline: none;
              font-size: 14px;
              text-align: center;
              line-height: 34px;
            }
            .router-link-active {
              border: 1px solid #5a9af2;
              color: #5a9af2;
            }
            .area2-title-icon {
              font-weight: bold;
              cursor: pointer;
            }
          }
        }
      }
    }
    .echartsInfor {
      height: 560px;
      display: flex;
      margin: 0 0 0 16px;
      .infor-one {
        flex: 1;
        height: 560px;
        border-radius: 4px;
        background: white;
        margin: 0 16px 0 0;
        .infor-one-title {
          height: 76px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          padding: 0 30px;
          border-bottom: 1px solid #e5e5e5;
          .one-title-icon {
            font-weight: bold;
            cursor: pointer;
          }
        }
        .infor-one-echarts {
          height: 486px;
        }
      }
      .infor-two {
        flex: 1;
        height: 560px;
        border-radius: 4px;
        background: white;
        margin: 0 16px 0 0;
        .infor-two-title {
          width: 100%;
          height: 76px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          padding: 0 30px;
          border-bottom: 1px solid #e5e5e5;
          .two-title-icon {
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>