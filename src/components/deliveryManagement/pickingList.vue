<template>
  <printIndex
    :title="OneOrAddMes ? '订单含一种产品订单' : '手动发货拣货单'"
    :isLookerShow="false"
    @closeFn="closeBtn"
    width="1000"
    min-height="500"
  >
    <template>
      <div style="padding: 0 0 10px 0; width: 1000px">
        <div style="padding: 0 0 10px 0">
          <div id="printCenter" style="padding: 20px">
            <div
              style="
                padding-bottom: 10px;
                border: 1px solid #d2d6e2;
                position: relative;
              "
            >
              <div style="border-bottom: 1px solid #d2d6e2">
                <div
                  style="
                    font-size: 24px;
                    font-weight: bold;
                    transrom: translate(-50%);
                    color: #343434;
                    line-height: 80px;
                    text-align: center;
                  "
                >
                  {{ detailsJianHuoDan.id }}拣货单
                </div>
                <div
                  style="position: absolute; top: 5px; right: 50px; z-index: -1"
                >
                  <img
                    :src="
                      baseUrl +
                      '/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg?code=' +
                      detailsJianHuoDan.id
                    "
                    width="300"
                    height="90"
                  />
                </div>
              </div>
              <!-- 入库单头部 -->
              <div style="padding: 20px 20px 0 20px">
                <div>
                  <div style="display: inline-block">
                    <div
                      style="
                        display: inline-block;
                        font-size: 14px;
                        color: #343434;
                        line-height: 26px;
                        margin-right: 10px;
                      "
                    >
                      订单数量:
                    </div>
                    <div
                      style="
                        display: inline-block;
                        font-size: 14px;
                        color: #343434;
                        line-height: 26px;
                        margin-right: 50px;
                      "
                    >
                      {{ detailsJianHuoDan.orderCount }}
                    </div>
                  </div>
                  <div style="display: inline-block">
                    <div
                      style="
                        display: inline-block;
                        font-size: 14px;
                        color: #343434;
                        line-height: 26px;
                        margin-right: 10px;
                      "
                    >
                      产品种类:
                    </div>
                    <div
                      style="
                        display: inline-block;
                        font-size: 14px;
                        color: #343434;
                        line-height: 26px;
                        margin-right: 50px;
                      "
                    >
                      {{ detailsJianHuoDan.prodTypeCount }}
                    </div>
                  </div>
                  <div style="display: inline-block">
                    <div
                      style="
                        display: inline-block;
                        font-size: 14px;
                        color: #343434;
                        line-height: 26px;
                        margin-right: 10px;
                      "
                    >
                      产品数量:
                    </div>
                    <div
                      style="
                        display: inline-block;
                        font-size: 14px;
                        color: #343434;
                        line-height: 26px;
                        margin-right: 50px;
                      "
                    >
                      {{ detailsJianHuoDan.prodCount }}
                    </div>
                  </div>
                  <div style="display: inline-block">
                    <div
                      style="
                        display: inline-block;
                        font-size: 14px;
                        color: #343434;
                        line-height: 26px;
                        margin-right: 10px;
                      "
                    >
                      箱型汇总:
                    </div>
                    <div
                      style="
                        display: inline-block;
                        font-size: 14px;
                        color: #343434;
                        line-height: 26px;
                        margin-right: 50px;
                      "
                    >
                      {{ detailsJianHuoDan.boxTypeCount }}
                    </div>
                  </div>
                  <div style="display: inline-block">
                    <div
                      style="
                        display: inline-block;
                        font-size: 14px;
                        color: #343434;
                        line-height: 26px;
                        margin-right: 10px;
                      "
                    >
                      拣货车:
                    </div>
                    <div
                      style="
                        display: inline-block;
                        font-size: 14px;
                        color: #343434;
                        line-height: 26px;
                        margin-right: 50px;
                      "
                    >
                      暂无
                    </div>
                  </div>
                </div>
                <!-- 拣货单信息 -->
                <div>
                  <div style="padding: 10px 0">
                    <div
                      style="
                        display: inline-block;
                        background: #4897e4;
                        width: 3px;
                        height: 16px;
                        margin-right: 10px;
                      "
                    ></div>
                    <div
                      style="
                        display: inline-block;
                        color: #4897e4;
                        font-size: 16px;
                        line-height: 16px;
                        padding-top: 20px;
                      "
                    >
                      基础信息
                    </div>
                  </div>
                  <div>
                    <el-table
                      ref="singleTable"
                      :span-method="arraySpanMethod"
                      :data="tableDatas"
                      border
                      highlight-current-row
                    >
                      <el-table-column
                        property="wareSeatCode"
                        label="库位"
                        style="color: #4796e3"
                      >
                      </el-table-column>
                      <el-table-column property="prodCode" label="产品编码">
                      </el-table-column>
                      <el-table-column
                        property="systemProdName"
                        label="产品名称"
                      >
                      </el-table-column>
                      <el-table-column property="specName" label="产品规格">
                      </el-table-column>
                      <el-table-column property="prodNum" label="申请入库数量">
                      </el-table-column>
                      <el-table-column property="abess" label="产品规格">
                      </el-table-column>
                      <el-table-column property="recommendSeatNo" label="数量">
                      </el-table-column>
                      <el-table-column property="wareSeatNo" label="指引">
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <!-- 入库单表格 -->
                <div v-if="OneOrAddMes">
                  <div style="padding: 20px 0">
                    <div
                      style="
                        display: inline-block;
                        background: #4897e4;
                        width: 3px;
                        height: 16px;
                        margin-right: 10px;
                      "
                    ></div>
                    <div
                      style="
                        display: inline-block;
                        color: #4897e4;
                        font-size: 16px;
                        line-height: 16px;
                      "
                    >
                      发货详情
                    </div>
                  </div>
                  <div>
                    <el-table
                      style="width: 980px"
                      ref="singleTable"
                      :data="detailsTable"
                      border
                      highlight-current-row
                    >
                      <el-table-column
                        property="abes"
                        label="订单号"
                        style="color: #4796e3"
                      >
                      </el-table-column>
                      <el-table-column
                        property="ads"
                        label="子单号"
                        style="width: 80px; color: #4796e3"
                      >
                      </el-table-column>
                      <el-table-column
                        property="boxTypeCount"
                        label="推荐用箱 "
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column property="specName" label="订单编号">
                      </el-table-column>
                      <el-table-column property="prodNum" label="发货条码">
                        <div slot-scope="scoped">
                          <img class="barcode" width="150" height="40" />
                          {{ getLodopS(scoped.row, scoped.$index) }}
                        </div>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <div style="text-align: right; padding-top: 10px">
                  <div
                    style="
                      display: inline-block;
                      margin-right: 40px;
                      font-size: 14px;
                      color: #343434;
                      font-weight: normal;
                    "
                  >
                    打印时间： {{ Newtime }}
                  </div>
                  <div
                    v-if="tableDatas.length >= 5"
                    style="
                      display: inline-block;
                      font-size: 14px;
                      color: #000000;
                      font-weight: normal;
                    "
                  >
                    1/ {{ Math.ceil(tableDatas.length / 5) }}
                  </div>
                </div>
                <!-- 入库尾部 -->
              </div>
            </div>
          </div>
        </div>
        <!-- 发货详情 -->
      </div>
    </template>
  </printIndex>
</template>

<script>
/*eslint-disable*/
import JsBarcode from "jsbarcode";
import { pDeliverGoodsfindSubOrderByPickOrderNo } from "../../api/api";
import kuanjiaClick from "../../components/commin/kuanjiaClick";
import componentList from "../commin/componentList";
import printIndex from "../commin/printIndex";
export default {
  data() {
    return {
      tableDatas: [],
      detailsTable: [],
      Newtime: "",
      dataBack: {},
      baseUrl: sessionStorage.getItem("baseUrl"),
    };
  },
  components: {
    kuanjiaClick,
    componentList,
    printIndex,
  },
  created() {
    this._changeTime();
    this._pDeliverGoodsfindSubOrderByPickOrderNo();
  },
  props: {
    OneOrAddMes: {
      type: Boolean,
      default: false,
    },
    detailsJianHuoDan: {
      type: "",
      default: () => {
        return {};
      },
    },
  },
  methods: {
    _pDeliverGoodsfindSubOrderByPickOrderNo() {
      pDeliverGoodsfindSubOrderByPickOrderNo({
        pickOrderNo: this.detailsJianHuoDan.id,
      }).then((res) => {
        if (res.code == "10000") {
          this.dataBack = res.result;
          this.tableDatas = res.result.detailList ? res.result.detailList : [];
        } else {
          this.$messageSelf.message(res.msg);
        }
      });
    },
    getLodopS(datas, idx) {
      this.$nextTick(() => {
        let json = document.getElementsByClassName("barcode")[idx];
        JsBarcode(json, datas.tiaoxianma, {
          format: "CODE39",
          lineColor: "#000",
          background: "#EBEEF5",
          width: 160,
          height: 50,
          displayValue: false,
        });
      });
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row["abes"]) {
        if (columnIndex === 0) {
          return [1, 8];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    closeBtn() {
      this.$emit("getiscaigoudanDetail", false);
    },
    //打印
    printWarehouseReceipt() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.LODOP = this.$getLodop();
          setTimeout(() => {
            this._createEwm(this.multipleSelection);
          }, 100);
        }, 200);
      });
    },
    _createEwm() {
      this.LODOP.ADD_PRINT_BARCODE(
        20,
        20,
        2970,
        2100,
        document.getElementById("printCenter").innerHTML
      );
      // this.LODOP.PRINTA(); //不需要进入查看页面 直接打印
      this.LODOP.PREVIEW(); //需要进入页面查看
    },
    _changeTime() {
      this.Newtime = new Date().toLocaleString("chinese", { hour12: false });
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

.setUserIngBox {
  .headerBox {
    height: 50px;
    border-radius: 3px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    background: rgb(236, 241, 247);
    border-bottom: 1px solid #d1d6e2;
  }

  .addChanpinClass {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1140px;
    z-index: 44;
    background: #f8f8f8;
    transform: translate(-50%, -50%);
  }

  .setUserIngBoxCenter {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    width: 1140px;
    height: 750px;
    overflow: auto;

    .centerBox {
      padding: 30px 20px;
    }

    .setTitle {
      margin-bottom: 18px;
    }

    .gerxinxiBox {
      display: flex;
      flex-direction: column;

      > div {
        margin-bottom: 18px;
      }

      .xinxiBitian {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        > div {
          margin-right: 20px;
        }
      }
    }

    .cityBoxCenter {
      display: flex;
      align-items: center;
    }
  }

  .textAreaBox {
    font-size: 14px;
    width: 72%;
    height: 40px;
    margin-left: 80px;

    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
    }

    margin-bottom: 30px;
  }

  .bzTetxArea {
    font-size: 14px;
    width: 72%;
    height: 80px;

    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 30px;
      overflow: hidden;
    }
  }

  .quxiaoBox {
    @include BtnFunction("error");
  }

  .tijiaoBox {
    @include BtnFunction("success");
  }
}
</style>