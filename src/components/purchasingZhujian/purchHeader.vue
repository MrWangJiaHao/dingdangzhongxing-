<template>
  <div>
    <div class="fuzzyQueryBox">
      <div class="biaogeBox">
        <div class="displayalign mb16 zujianBox">
          <div class="noneIconTitle mr11">委托公司:</div>
          <div class="mr20">
            <el-select
              class="w400"
              v-model="paras.orgName"
              slot="prepend"
              :placeholder="EntrustedCompany.placeholder"
              @input="getOrdName"
              @focus="getOrderArr"
            >
              <el-option
                v-for="(item, idx) in EntrustedCompany.entrustedCompanyArr"
                :key="idx"
                :label="item.orgFullName"
                :value="idx"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- 委托公司 orgId -->

        <div class="zujianBox mb16">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">采购单号:</div>
            <div class="mr20">
              <el-autocomplete
                v-model="associatedOrderNo.associatedOrderNoCenter"
                :fetch-suggestions="associatedArr"
                :placeholder="associatedOrderNo.placeholder"
                @select="associatedSelect"
              ></el-autocomplete>
            </div>
          </div>
        </div>
        <!-- 采购单号 purcNo -->

        <div class="zujianBox mb16">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">采购状态:</div>
            <div class="mr20">
              <el-select
                v-model="paras.disposeStatus"
                slot="prepend"
                :placeholder="disposeStatusJson.placeholder"
                @input="changeDisposeStatus"
                @focus="clickDisposeStatus"
              >
                <el-option
                  v-for="(item, idx) in disposeStatusJson.disposeStatusArr"
                  :key="idx"
                  :label="item.disposeStatus"
                  :value="idx"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 采购状态 disposeStatus -->

        <div class="zujianBox mb16">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">采购类型:</div>
            <div class="mr20">
              <el-select
                v-model="paras.orderSource"
                slot="prepend"
                :placeholder="orderSourceJson.placeholder"
                @input="changeDisposeStatus"
                @focus="clickDisposeStatus"
              >
                <el-option
                  v-for="(item, idx) in orderSourceJson.orderSourceArr"
                  :key="idx"
                  :label="item.orderSource"
                  :value="idx"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 采购类型 orderSource -->

        <div class="displayalign mb16 zujianBox">
          <div class="noneIconTitle mr11">产品名称:</div>
          <div class="mr20">
            <el-autocomplete
              v-model="prodIdNo.prodIdNoCenter"
              :fetch-suggestions="prodIdNoArr"
              :placeholder="prodIdNo.placeholder"
              @select="prodIdNoSelect"
            ></el-autocomplete>
          </div>
        </div>
        <!-- 采购名称 prodId -->

        <div class="displayalign mb16 zujianBox">
          <div class="noneIconTitle mr11">产品编码:</div>
          <div class="mr20">
            <el-autocomplete
              v-model="prodCodeNo.prodCodeNoCenter"
              :fetch-suggestions="prodCodeArr"
              :placeholder="prodCodeNo.placeholder"
              @select="prodCodeNoSelect"
            ></el-autocomplete>
          </div>
        </div>
        <!-- 产品编码 prodCode -->

        <!-- <div class="zujianBox mb16">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">产品规格:</div>
            <div class="mr20">
              <el-select
                v-model="paras.specName"
                slot="prepend"
                :placeholder="ProductSpecificationsJson.placeholder"
                @input="getProductSpecificationsArr"
              >
                <el-option
                  v-for="(item,
                  idx) in ProductSpecificationsJson.ProductSpecificationsArr"
                  :key="idx"
                  :label="item.childWareName"
                  :value="idx"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div> -->
        <!-- 产品规格 ProductSpecificationsJson -->

        <div class="zujianBox mb16">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">期望到货时间:</div>
            <div class="mr20 displayalign">
              <div style="margin-right: 10px">
                <dateTime
                  :dateTimeData="expectedSendStartTimeData"
                  @getDateTime="getexpectedSendStartTime"
                  ref="expectedStart"
                />
              </div>
              <!-- 开始时间 searchStartTime -->
              <div class="line"></div>
              <div>
                <dateTime
                  :dateTimeData="expectedSendEndTimeData"
                  @getDateTime="getexpectedSendEndTime"
                  ref="expectedEnd"
                />
              </div>
              <!-- 结束时间 searchEndTime -->
            </div>
          </div>
        </div>
        <!-- 期望入库时间 -->

        <div class="zujianBox mb16">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">实际到货时间:</div>
            <div class="mr20 displayalign">
              <div style="margin-right: 10px">
                <dateTime
                  :dateTimeData="putStartTimeData"
                  @getDateTime="getputStartTime"
                  ref="putStart"
                />
              </div>
              <!-- 开始时间 arrivalStartTime -->
              <div class="line"></div>
              <div>
                <dateTime
                  :dateTimeData="putEndTimeData"
                  @getDateTime="getputEndTime"
                  ref="putEnd"
                />
              </div>
              <!-- 结束时间 arrivalEndTime -->
            </div>
          </div>
        </div>
        <!-- 入库开始时间 -->
      </div>

      <div class="btns mb16">
        <div class="queryBtn mr11 zujianBox" @click="clickQueryUser">查询</div>
        <div class="clearBtn" @click="clearInputAll">清空</div>
      </div>
    </div>
    <!--btns mb16  -->
  </div>
</template>

<script>
/*eslint-disable */
import { getEntrustedcompany } from "../../api/api";
import dateTime from "../../components/commin/dateTime.vue"; //时间

export default {
  components: {
    dateTime,
  },

  data() {
    return {
      //委托公司
      EntrustedCompany: {
        placeholder: "请选择委托公司",
        entrustedCompanyArr: "",
      },
      //采购单号 模糊搜索
      associatedOrderNo: {
        placeholder: "请输入采购单号",
        associatedOrderNoCenter: "",
      },
      //采购状态
      disposeStatusJson: {
        placeholder: "请选择采购状态",
        disposeStatusArr: [
          {
            disposeStatus: "待审核",
            id: "0",
          },
          {
            disposeStatus: "审核通过",
            id: "1",
          },

          {
            disposeStatus: "拒绝",
            id: "2",
          },
          {
            disposeStatus: "待到货确认",
            id: "3",
          },
          {
            disposeStatus: "已完成",
            id: "4",
          },
        ],
      },
      //采购类型
      orderSourceJson: {
        placeholder: "请选择采购类型",
        orderSourceArr: [
          {
            orderSource: "手工采购",
            id: 0,
          },
          {
            orderSource: "渠道采购",
            id: 1,
          },
          {
            id: 2,
            orderSource: "缺货采购",
          },
        ],
      },
      //采购名称
      prodIdNo: {
        prodIdNoCenter: "",
        placeholder: "请输入产品名称",
      },
      //产品编码
      prodCodeNo: {
        prodCodeNoCenter: "",
        placeholder: "请输入产品编码",
      },
      //产品规格
      ProductSpecificationsJson: {
        ProductSpecificationsArr: [],
        placeholder: "请选择产品规格",
      },
      expectedSendStartTimeData: {
        placeholder: "请选择期望到货时间",
      },
      expectedSendEndTimeData: {
        placeholder: "请选择期望到货结束时间",
      },
      putStartTimeData: {
        placeholder: "请选择实际到货开始时间",
      },
      putEndTimeData: {
        placeholder: "请选择实际到货时间结束时间 ",
      },
      paras: {
        purcNo: "", //采购单号
        orgId: "", //委托公司
        wareId: "", //仓库
        disposeStatus: "", //采购状态(0-待审核 1-审核通过 2-拒绝 3-待到货确认；4-已完成)
        prodCode: "", //产品编码
        specName: "", //产品名称
        prodId: "", //产品id
        searchStartTime: "", //期望到货时间
        searchEndTime: "", //期望结束时间
        expectedSendStartTime: "", //实际到货时间
        expectedSendEndTime: "", //实际到货结束时间
      },
      isOneShou: true,
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  created() {},
  methods: {
    checkTimeEnd(e) {
      this.paras.checkTimeEnd = e;
    },
    pickTimeStartTime(e) {
      this.paras.pickTimeStart = e;
    },
    pickTimeEnd(e) {
      this.paras.pickTimeEnd = e;
    },
    //发送ajax
    async getOrderArr() {
      let datas = await getEntrustedcompany();
      return (this.EntrustedCompany.entrustedCompanyArr = datas.result);
    },
    //委托公司
    getOrdName(e) {
      this.sendOutDataJson.paras.orgId = this.EntrustedCompany.entrustedCompanyArr[
        e
      ].id;
    },
    //关联单号
    associatedArr(queryString, cb) {
      this.paras.orderNo = queryString;
      this.$emit("getParasJson", this.paras);
      let arr = [];
      this.tableData.forEach((item) => {
        if (!arr.includes(item.orderNo)) {
          arr.push(item.orderNo);
        }
      });
      cb(arr);
    },
    //关联单号 模糊搜索
    associatedSelect(item) {}, //选中的item
    //改变采购状态
    changeDisposeStatus(e) {},
    //点击采购类型
    clickDisposeStatus(e) {},
    //采购名称
    prodIdNoArr(queryString) {
      this.paras.specName = queryString;
      this.$emit("getParasJson", this.paras);
    },
    //点击选择采购名称
    prodIdNoSelect() {},

    //产品规格
    getProductSpecificationsArr(e) {},
    //产品编码
    prodCodeArr(queryString) {
      this.paras.specName = queryString;
      this.$emit("getParasJson", this.paras);
    },
    prodCodeNoSelect(e) {},
    //请选择期望入库开始时间
    getexpectedSendStartTime(e) {
      this.paras.searchStartTime = e;
      this.$emit("getParasJson", this.paras);
    },
    getexpectedSendEndTime(e) {
      this.paras.searchEndTime = e;
      this.$emit("getParasJson", this.paras);
    }, //请选择期望入库时间结束时间
    getputStartTime(e) {
      this.paras.expectedSendStartTime = e;
      this.$emit("getParasJson", this.paras);
    }, //请选择入库开始时间
    getputEndTime(e) {
      this.paras.expectedSendEndTime = e;
      this.$emit("getParasJson", this.paras);
    }, //请选择入库时间结束时间
    //点击了查询
    clickQueryUser() {
      this.$emit("getParasJson", this.paras);
    },
    //点击了清空
    clearInputAll() {
      this.paras.orgName = "";
      this.paras.prodCode = "";
      this.prodCodeNo.prodCodeNoCenter = "";
      this.paras.prodName = "";
      this.associatedOrderNo.associatedOrderNoCenter = "";
      this.paras.disposeStatus = "";
      this.paras.orderSource = "";
      this.prodIdNo.prodIdNoCenter = "";
      this.$refs.expectedStart.clear();
      this.$refs.expectedEnd.clear();
      this.$refs.putStart.clear();
      this.$refs.putEnd.clear();
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
  position: relative;
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
    position: absolute;
    right: 30px;
    bottom: 10px;
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