<template>
  <div>
    <div class="fuzzyQueryBox">
      <div class="biaogeBox">
        <div class="displayalign mb20 zujianBox">
          <div class="noneIconTitle mr11">委托公司:</div>
          <div class="mr20">
            <el-select
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
        <!-- 委托公司 -->

        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">关联单号:</div>
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
        <!-- 关联单号 -->

        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">入库单号:</div>
            <div class="mr20">
              <el-autocomplete
                v-model="stockInNo.stockInNoCenter"
                :fetch-suggestions="stockInNoArr"
                :placeholder="stockInNo.placeholder"
                @select="stockInNoSelect"
              ></el-autocomplete>
            </div>
          </div>
        </div>
        <!-- 入库单号 -->

        <div class="displayalign mb20 zujianBox">
          <div class="noneIconTitle mr11">入库状态:</div>
          <div class="mr20">
            <el-select
              v-model="paras.putstatus"
              slot="prepend"
              :placeholder="putstatusJson.placeholder"
              @input="getPutstatus"
            >
              <el-option
                v-for="(item, idx) in putstatusJson.putstatusArr"
                :key="idx"
                :label="item.putstatusCenter"
                :value="idx"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- 入库状态 -->

        <div class="displayalign mb20 zujianBox">
          <div class="noneIconTitle mr11">入库类型:</div>
          <div class="mr20">
            <el-select
              v-model="WarehousingType.WarehousingTypeCenter"
              disabled
              slot="prepend"
            >
              <el-option
                v-for="(item, idx) in WarehousingType.putstatusArr"
                :key="idx"
                :label="item.putstatusCenter"
                :value="idx"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- 入库类型 在路径上获取 -->

        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">产品编码:</div>
            <div class="mr20">
              <el-autocomplete
                v-model="paras.prodCode"
                :fetch-suggestions="ProductCodeArr"
                :placeholder="ProductCodeJson.placeholder"
                @select="ProductCode"
              ></el-autocomplete>
            </div>
          </div>
        </div>
        <!-- 产品编码 -->

        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">产品名称:</div>
            <div class="mr20">
              <el-autocomplete
                v-model="paras.prodName"
                :fetch-suggestions="ProductNameArr"
                :placeholder="ProductNameJson.placeholder"
                @select="ProductName"
              ></el-autocomplete>
            </div>
          </div>
        </div>
        <!-- 产品名称 -->

        <!-- <div class="zujianBox mb20">
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

        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">期望入库时间:</div>
            <div class="mr20 displayalign">
              <div style="margin-right: 10px">
                <dateTime
                  :dateTimeData="expectedSendStartTimeData"
                  @getDateTime="getexpectedSendStartTime"
                  ref="expectedStart"
                />
              </div>
              <!-- 开始时间 -->
              <div class="line"></div>
              <div>
                <dateTime
                  :dateTimeData="expectedSendEndTimeData"
                  @getDateTime="getexpectedSendEndTime"
                  ref="expectedEnd"
                />
              </div>
              <!-- 结束时间 -->
            </div>
          </div>
        </div>
        <!-- 期望入库时间 -->

        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">期望入库时间:</div>
            <div class="mr20 displayalign">
              <div style="margin-right: 10px">
                <dateTime
                  :dateTimeData="putStartTimeData"
                  @getDateTime="getputStartTime"
                  ref="putStart"
                />
              </div>
              <!-- 开始时间 -->
              <div class="line"></div>
              <div>
                <dateTime
                  :dateTimeData="putEndTimeData"
                  @getDateTime="getputEndTime"
                  ref="putEnd"
                />
              </div>
              <!-- 结束时间 -->
            </div>
          </div>
        </div>
        <!-- 入库开始时间 -->
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
      //关联单号 模糊搜索
      associatedOrderNo: {
        placeholder: "请输入关联单号",
        associatedOrderNoCenter: "",
      },
      //入库单号
      stockInNo: {
        placeholder: "请输入入库单号",
        stockInNoCenter: "",
      },
      ProductNameJson: {
        placeholder: "请选择产品名称",
      },
      putstatusJson: {
        placeholder: "请选择用户状态",
        putstatus: "",
        putstatusArr: [
          {
            putstatus: 0,
            putstatusCenter: "未入库",
          },
          {
            putstatus: 1,
            putstatusCenter: "已入库",
          },
        ],
      },
      //入库类型 路径获取第几个
      WarehousingType: {
        WarehousingTypeCenter: "",
        WarehousingTypeArr: [
          {
            WarehousingType: 0,
            WarehousingTypeCenter: "手工创建入库",
          },
          {
            WarehousingType: 1,
            WarehousingTypeCenter: "采购调拨入库",
          },
          {
            WarehousingType: 2,
            WarehousingTypeCenter: "预入库",
          },
          {
            WarehousingType: 3,
            WarehousingTypeCenter: "采购预入库",
          },
          {
            WarehousingType: 4,
            WarehousingTypeCenter: "调拨入库",
          },
          {
            WarehousingType: 5,
            WarehousingTypeCenter: "加工入库",
          },
          {
            WarehousingType: 6,
            WarehousingTypeCenter: "拆解入库",
          },
          {
            WarehousingType: 7,
            WarehousingTypeCenter: "退货入库",
          },
          {
            WarehousingType: 8,
            WarehousingTypeCenter: "盘盈入库",
          },
          {
            WarehousingType: 9,
            WarehousingTypeCenter: "其他入库",
          },
        ],
      },
      transeArr: [
        {
          title: "手工创建出库",
          name: "/warehouseManagement/warehouseIndex/0",
        },
        {
          title: "销售出库",
          name: "/warehouseManagement/warehouseIndex/1",
        },
        {
          title: "自提出库",
          name: "/warehouseManagement/warehouseIndex/2",
        },
        {
          title: "调拨出库",
          name: "/warehouseManagement/warehouseIndex/3",
        },
        {
          title: "加工出库",
          name: "/warehouseManagement/warehouseIndex/4",
        },
        {
          title: "拆解出库",
          name: "/warehouseManagement/warehouseIndex/5",
        },
        {
          title: "报损出库",
          name: "/warehouseManagement/warehouseIndex/6",
        },
        {
          title: "盘亏出库",
          name: "/warehouseManagement/warehouseIndex/7",
        },
        {
          title: "其他出库",
          name: "/warehouseManagement/warehouseIndex/8",
        },
      ],
      //产品编码
      ProductCodeJson: {
        placeholder: "请输入产品编码",
        ProductCodeCenter: "",
      },
      //产品规格
      ProductSpecificationsJson: {
        ProductSpecificationsArr: [],
        placeholder: "请选择产品规格",
      },
      expectedSendStartTimeData: {
        placeholder: "请选择期望入库时间",
      },
      expectedSendEndTimeData: {
        placeholder: "请选择期望入库结束时间",
      },
      putStartTimeData: {
        placeholder: "请选择入库开始时间",
      },
      putEndTimeData: {
        placeholder: "请选择入库时间结束时间 ",
      },
      paras: {
        orgName: "", //委托公司
        orgId: "", //委托id
        orderNo: "", //原定单号（关联单号）
        putWareNo: "", //入库单号
        putstatus: "", //入库状态
        orderSource: "", //订单类型(0-手工创建；1-渠道创建 2-预入库 3-采购 4-库建调拨 5-加工作业 6-分解作业 7-退货 8-盘盈 9-其他）
        outWareType: "",
        prodCode: "", //产品编码
        prodName: "", //产品名称
        specName: "", //规格名称
        putStartTime: "", //入库时间开始时间
        putEndTime: "", //入库时间结束时间
        expectedSendStartTime: "", //期望入库开始时间
        expectedSendEndTime: "", //期望入库时间结束时间
      },
      isOneShou: true,
    };
  },
  watch: {
    $route(to) {
      let path = this._isRuku();
      if (path) {
        this.WarehousingType.WarehousingTypeCenter = this.WarehousingType.WarehousingTypeArr[
          +to.params.type
        ].WarehousingTypeCenter;
        this.paras.orderSource = to.params.type;
      } else {
        this.WarehousingType.WarehousingTypeCenter = this.transeArr[
          +to.params.type
        ].title;
        this.paras.outWareType = this.$route.params.type;
      }
    },
  },
  props: {
    tableData: {
      type: Array,
      default: [],
    },
  },
  created() {
    let path = this._isRuku();
    console.log(path);
    if (path) {
      if (this.isOneShou) {
        this.WarehousingType.WarehousingTypeCenter = this.WarehousingType.WarehousingTypeArr[
          +this.$route.params.type
        ].WarehousingTypeCenter;
        this.paras.orderSource = this.$route.params.type;
        this.isOneShou = false;
      }
    } else {
      this.WarehousingType.WarehousingTypeCenter = this.transeArr[
        +this.$route.params.type
      ].title;
      this.paras.outWareType = this.$route.params.type;
      this.isOneShou = false;
    }
  },
  methods: {
    _isRuku() {
      let path = this.$route.path.includes("ing");
      return path;
    },
    //发送ajax
    async getOrderArr() {
      let datas = await getEntrustedcompany();
      return (this.EntrustedCompany.entrustedCompanyArr = datas.result);
    },
    //委托公司
    getOrdName() {},
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
    //入库单号
    stockInNoArr(queryString, cb) {
      this.paras.putWareNo = queryString;
      this.$emit("getParasJson", this.paras);
      cb(this.tableData);
    },
    //入库单号 选中的item
    stockInNoSelect(item) {},
    //产品名称
    ProductName() {},
    ProductNameArr(queryString, cb) {
      this.paras.prodName = queryString;
      this.$emit("getParasJson", this.paras);
      // 调用 callback 返回建议列表的数据
      cb(this.tableData);
    },
    getPutstatus(e) {}, //获取入库状态
    //产品编码
    ProductCodeArr(queryString, cb) {
      this.paras.prodCode = queryString;
      this.$emit("getParasJson", this.paras);
      // 调用 callback 返回建议列表的数据
      cb(this.tableData);
    },
    ProductCode(item) {}, //产品编码选中的item
    getProductSpecificationsArr(e) {}, //产品规格
    getexpectedSendStartTime(e) {
      this.paras.expectedSendStartTime = e;
      this.$emit("getParasJson", this.paras);
    }, //请选择期望入库开始时间
    getexpectedSendEndTime(e) {
      this.paras.expectedSendEndTime = e;
      this.$emit("getParasJson", this.paras);
    }, //请选择期望入库时间结束时间
    getputStartTime(e) {
      this.paras.putStartTime = e;
      this.$emit("getParasJson", this.paras);
    }, //请选择入库开始时间
    getputEndTime(e) {
      this.paras.putEndTime = e;
      this.$emit("getParasJson", this.paras);
    }, //请选择入库时间结束时间
    //点击了查询
    clickQueryUser() {
      this.$emit("getParasJson", this.paras);
    },
    //点击了清空
    clearInputAll() {
      this.paras.orgName = "";
      this.associatedOrderNo.associatedOrderNoCenter = "";
      this.stockInNo.stockInNoCenter = "";
      this.WarehousingType.WarehousingTypeCenter = "";
      this.paras.prodCode = "";
      this.paras.prodName = "";
      //清空时间
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