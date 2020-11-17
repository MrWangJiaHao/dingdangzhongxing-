<template>
  <div>
    <div class="fuzzyQueryBox">
      <div class="biaogeBox">
        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">拣货单号:</div>
            <div class="mr20">
              <el-autocomplete
                v-model="paras.orderNoCenter"
                :fetch-suggestions="orderNoArr"
                placeholder="请输入拣货单号"
                @select="orderNoSelect"
              ></el-autocomplete>
            </div>
          </div>
        </div>
        <!-- 拣货单号 -->

        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">拣货单状态:</div>
            <div class="mr20">
              <el-select
                v-model="paras.channelName"
                slot="prepend"
                placeholder="请选择渠道"
                @input="getchannelName"
                @focus="changeChannelName"
              >
                <el-option
                  v-for="(item, idx) in channelNameJson.channelNameArr"
                  :key="idx"
                  :label="item.channelName"
                  :value="idx"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 拣货单状态 -->

        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">子单号:</div>
            <div class="mr20">
              <el-autocomplete
                v-model="paras.subOrderNoCenter"
                :fetch-suggestions="subOrderNoArr"
                placeholder="请输入子单号"
                @select="subOrderNoSelect"
              ></el-autocomplete>
            </div>
          </div>
        </div>
        <!-- 子单号 -->

        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">创建时间:</div>
            <div class="mr20 displayalign">
              <div style="margin-right: 10px">
                <dateTime
                  :dateTimeData="PayStartTime"
                  @getDateTime="getPayStartTime"
                  ref="expectedStart"
                />
              </div>
              <!-- 开始时间 -->
              <div class="line"></div>
              <div>
                <dateTime
                  :dateTimeData="payEndTime"
                  @getDateTime="getpayEndTime"
                  ref="expectedEnd"
                />
              </div>
              <!-- 结束时间 -->
            </div>
          </div>
        </div>
        <!-- 支付时间 -->

        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">打印时间:</div>
            <div class="mr20 displayalign">
              <div style="margin-right: 10px">
                <dateTime
                  :dateTimeData="pushStartTime"
                  @getDateTime="getpushStartTime"
                  ref="putStart"
                />
              </div>
              <!-- 开始时间 -->
              <div class="line"></div>
              <div>
                <dateTime
                  :dateTimeData="pushEndTime"
                  @getDateTime="getpushEndTime"
                  ref="putEnd"
                />
              </div>
              <!-- 结束时间 -->
            </div>
          </div>
        </div>
        <!-- 下发时间 -->

        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">拣货开始时间:</div>
            <div class="mr20 displayalign">
              <div style="margin-right: 10px">
                <dateTime
                  :dateTimeData="pushStartTime"
                  @getDateTime="getpushStartTime"
                  ref="putStart"
                />
              </div>
              <!-- 开始时间 -->
              <div class="line"></div>
              <div>
                <dateTime
                  :dateTimeData="pushEndTime"
                  @getDateTime="getpushEndTime"
                  ref="putEnd"
                />
              </div>
              <!-- 结束时间 -->
            </div>
          </div>
        </div>
        <!-- 下发时间 -->
      </div>

      <div class="tr" style="width: 100%">
        <div class="btns mb20">
          <div class="queryBtn zujianBox" @click="clickQueryUser">查询</div>
          <div class="clearBtn" @click="clearInputAll">清空</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import {
  getEntrustedcompany,
  pDeliverGoodsFindNormalRecordPage,
  pDeliverGoodsFindFastRecordPage,
} from "../../api/api";
import dateTime from "../../components/commin/dateTime.vue"; //时间
import { getCookie } from "../../utils/validate";

export default {
  components: {
    dateTime,
  },
  props: {
    fastFahuo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //委托公司
      EntrustedCompany: {
        placeholder: "请选择委托公司",
        entrustedCompanyArr: "",
      },
      //渠道数组
      channelNameJson: {
        channelNameArr: [],
      },
      //订单来源
      orderSourceNameJson: {
        orderSourceName: [],
      },
      exprNameJson: {
        exprNameArr: [],
      },
      orderContactPhone: {
        orderContactPhoneCenter: "",
      },
      orderAddr: {
        orderAddrCenter: "",
      },
      addressJson: {
        orderAddrArr: [],
        addressArr: [],
        addressJsonCenter: "",
      },
      systemProdName: { systemProdNameArr: [] },
      PayStartTime: { placeholder: "请输入支付开始时间" },
      payEndTime: { placeholder: "请输入支付结束时间" },
      pushStartTime: { placeholder: "请选择下发开始时间" },
      pushEndTime: { placeholder: "请选择下发结束时间" },
      paras: {
        wareId: getCookie("X-Auth-wareId"),
        orgId: "",
        orderSourceId: "",
        channelId: "",
        orderNo: "",
        subOrderNo: "",
        exprId: "",
        orderContact: "",
        orderSourceName: "",
        orderContactPhoneCenter: "",
        orderContactPhone: "",
        orderAddr: "",
        orderAddrLike: "",
        systemProdName: "",
        prodNameLike: "",
        payStartTime: "",
        payEndTime: "",
        pushStartTime: "",
        pushEndTime: "",
        specialProd: (() => (this.fastFahuo ? 1 : null))(),
        printExprStatus: null,
      },
      wiliudayarr: [
        {
          id: 0,
          title: "未打印",
        },
        { id: 1, title: "已打印" },
      ],
      sendoutData: {
        pageNumber: 1, //当前页数
        pageSize: 10, //每页记录数
        paras: {},
      },
    };
  },
  created() {
    this._getMes();
  },
  methods: {
    changeorderAddr(e) {
      this.paras.orderAddr = addressJson.orderAddrArr[e].orderAddr;
      this.$emit("getParasJson", this.paras);
    },
    changewiliudayarr(e) {
      this.paras.printExprStatus = e;
      this.$emit("getParasJson", this.paras);
    },
    //获取数组
    async _getMes() {
      let { result } = await this._ajaxMes();
      this._changDianDanLaiYuan(result.list);
    },
    _ajaxMes() {
      return this.fastFahuo
        ? pDeliverGoodsFindFastRecordPage(this.sendoutData)
        : pDeliverGoodsFindNormalRecordPage(this.sendoutData);
    },
    //获取订单来源
    _changDianDanLaiYuan(res) {
      this.channelNameJson.channelNameArr = res;
      this.orderSourceNameJson.orderSourceName = res;
      this.exprNameJson.exprNameArr = res;
      this.addressJson.orderAddrArr = res;
      this.addressJson.addressArr = res;
      this.systemProdName.systemProdNameArr = res;
    },
    //change那个收货地址
    orderAddrSelect() {},
    //点击那个收货地址
    orderAddrArr() {},
    getPayStartTime(e) {
      this.paras.PayStartTime = e;
    },
    getpayEndTime(e) {
      this.paras.payEndTime = e;
    },
    getpushStartTime(e) {
      this.paras.pushStartTime = e;
    },
    getpushEndTime(e) {
      this.paras.pushEndTime = e;
    },
    //获取了那个订单号
    subOrderNoArr() {},
    //选择了那个订单号
    subOrderNoSelect() {},
    //点击产品名称
    addressJsonArr() {},
    //点击拉那个产品名称
    addressJsonSelect() {},
    //点击收货地址
    getaddress() {},
    //改变收货地址
    changeaddress(e) {
      this.paras.orderAddr = this.systemProdName.systemProdNameArr[e].orderAddr;
      this.$emit("getParasJson", this.paras);
    },
    //收货联系电话
    orderContactPhoneArr(e) {
      this.paras.orderContactPhone = e;
      this.$emit("getParasJson", this.paras);
    },
    //选择了那个收货联系电话
    orderContactPhoneSelect() {},
    //点击收货人
    orderContactArr(e) {
      this.paras.orderContact = e;
      this.$emit("getParasJson", this.paras);
    },
    //选择了那个收货人
    orderContactSelect() {},
    //改变物流公司
    changeExprName(e) {
      exprNameJson.exprNameArr = exprNameJson.exprNameArr[e].exprNameArr;
    },
    //点击物流公司
    getexprName() {},
    //订单号数组
    orderNoArr(e) {
      this.paras.orderNo = e;
      this.$emit("getParasJson", this.paras);
    },
    //选择那个订单数组
    orderNoSelect() {},
    //点击订单来源
    getOrderSourceName() {},
    //改变订单来源
    changeOrderSourceName(e) {
      this.paras.orderSourceId =
        channelNameJson.channelNameArr[e].orderSourceId;
      this.$emit("getParasJson", this.paras);
    },
    //改变渠道
    getchannelName(e) {
      this.paras.channelId = channelNameJson.channelNameArr[e].channelId;
      this.$emit("getParasJson", this.paras);
    },
    //点击渠道
    changeChannelName() {},
    //发送ajax
    async getOrderArr() {
      let datas = await getEntrustedcompany();
      return (this.EntrustedCompany.entrustedCompanyArr = datas.result);
    },
    //委托公司
    getOrdName(e) {
      this.paras.orgId = this.EntrustedCompany.entrustedCompanyArr[e].id;
    },
    //点击了查询
    clickQueryUser() {
      this.$emit("getParasJson", this.paras);
    },
    //点击了清空
    clearInputAll() {
      this.paras = {
        orgId: "",
        orderSourceId: "",
        channelId: "",
        orderNo: "",
        subOrderNo: "",
        exprId: "",
        orderContact: "",
        orderSourceName: "",
        orderContactPhoneCenter: "",
        orderContactPhone: "",
        orderAddr: "",
        orderAddrLike: "",
        systemProdName: "",
        prodNameLike: "",
        payStartTime: "",
        payEndTime: "",
        pushStartTime: "",
        pushEndTime: "",
      };
      this.orderContactPhone.orderContactPhoneCenter = "";
      this.orderAddr.orderAddrCenter = "";
      this.addressJson.addressJsonCenter = "";
      this.$refs.expectedStart.clear();
      this.$refs.expectedEnd.clear();
      this.$refs.putStart.clear();
      this.$refs.putEnd.clear();
      this.$emit("getParasJson", this.paras);
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";
.fuzzyQueryBox {
  padding: 17px 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .biaogeBox {
    flex-wrap: wrap;
    align-items: center;
    display: flex;
  }
  .timeBox {
    display: flex;
    align-items: center;
  }
  .line {
    width: 20px;
    height: 2px;
    background: #fff;
    margin-right: 10px;
  }
  .btns {
    display: inline-block;
    .queryBtn {
      display: inline-block;
      @include BtnFunction("success");
    }
    .clearBtn {
      display: inline-block;
      @include BtnFunction();
      background: #fff;
    }
  }
}

.line {
  width: 20px;
  height: 2px;
  background: #fff;
  margin-right: 10px;
}
</style>