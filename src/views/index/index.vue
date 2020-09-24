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
            <span>28410</span>
            <span>&nbsp;单</span>
            <span>&nbsp;[⬆1.42%]</span>
          </div>
          <div class="numberInfor1-num2">
            <span>昨日发货总单数：</span>
            <span>28410</span>
            <span>&nbsp;单</span>
          </div>
          <div class="numberInfor1-num3">
            <span>今日平均发货速率：</span>
            <span>1000</span>
            <span>&nbsp;单/h/人</span>
          </div>
        </div>
        <div class="numberInfor1-upTime">
          <span>更新时间:&nbsp;</span>
          <span>2019-12-17 16:24:10</span>
        </div>
      </div>
      <div class="numberInfor2">
        <div class="numberInfor2-area" v-for="(v, i) in inforArr2" :key="i">
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
            <div class="iconfont icon-ziyuan area1-title-icon"></div>
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
              <span class="iconfont icon-ziyuan area2-title-icon"></span>
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
            <div class="iconfont icon-ziyuan one-title-icon"></div>
          </div>
          <div class="infor-one-echarts">
            <!-- <ShipmentsEcharts></ShipmentsEcharts> -->
            <Shipment></Shipment>
          </div>
        </div>
        <div class="infor-two">
          <div class="infor-two-title">
            <div class="two-title-text">退货订单量统计</div>
            <div class="iconfont icon-ziyuan two-title-icon"></div>
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
        { img: ciexnhoex, number: 257, text: "缺货订单数" },
        { img: disaggregate, number: 3842, text: "待集计订单数" },
        { img: orderPicking, number: 980, text: "待拣货订单数" },
        { img: recheck, number: 1342, text: "待复核订单数" },
        { img: pickingFail, number: 401, text: "拣货错误订单数" },
        { img: pullGoods, number: 37, text: "待揽件订单数" },
      ],
    };
  },
  mounted() {
     //将vuex中存储的用户信息拿出来
    let userInfor=this.$store.state.loginRequest.loginData
    let userData= {
        "Content-Type": "application/json; charset=utf-8",
        "X-Auth-Token": userInfor.userToken,
        "X-Auth-wareId": userInfor.wareId,
        "X-Auth-user": userInfor.id,
      }
    indexRequest(userData).then((ok) => {
      console.log(ok);
    });
  },
};
</script>

<style scoped lang="scss">
#indexMain{
  position: relative;
}
.indexContainer {
  background: #eef1f8;
  width: 100%;
  margin: 0 auto;
  position: relative;
  .numberInfor1 {
    width: 1888px;
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
        margin: 0 0 0 20px;
      }
      .numberInfor1-num1 {
        padding: 0 44px;
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
        padding: 0 44px;
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
        padding: 0 44px;
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
    width: 1888px;
    height: 239px;
    display: flex;
    margin: 0 0 16px 16px;
    overflow: hidden;
    .numberInfor2-area {
      width: 301px;
      height: 239px;
      border-radius: 4px;
      margin-right: 16px;
      background: white;
      .area-img {
        width: 117px;
        height: 89px;
        margin: 26px auto 10px;
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
    .numberInfor2-area:last-of-type{
      margin-right: 0;
    }
  }
  .warehouseStatistics {
    width: 1888px;
    height: 480px;
    display: flex;
    margin: 0 0 16px 16px;
    .ws-area1 {
      width: 383px;
      height: 480px;
      border-radius: 4px;
      background: white;
      margin: 0 16px 0 0;
      padding: 0 30px;
      .area1-title {
        width: 100%;
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
        width: 383px;
        height: 404px;
      }
    }
    .ws-area2 {
      width: 1488px;
      height: 480px;
      border-radius: 4px;
      background: white;
      padding: 0 30px;
      margin: 0 16px 0 0;
      .area2-title {
        width: 100%;
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
    width: 1888px;
    height: 560px;
    display: flex;
    margin: 0 0 16px 16px;
    .infor-one {
      width: 936px;
      height: 560px;
      border-radius: 4px;
      background: white;
      margin: 0 16px 0 0;
      .infor-one-title {
        width: 100%;
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
        width: 936px;
        height: 486px;
      }
    }
    .infor-two {
      width: 936px;
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
      .infor-two-echarts {
        width: 936px;
      }
    }
  }
}
</style>