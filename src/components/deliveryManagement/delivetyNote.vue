<template>
  <kuanjiaClick
    titles="打印发货清单"
    @closeBtn="closeBtn"
    :isLookerShow="false"
    print="打印"
    width="490"
    min-height="552"
    @clickSubmit="printWarehouseReceipt"
  >
    <template slot="centerKuanjia">
      <div id="printCenter" style="width: 490px" class="displayColom mt20">
        <div
          style="
            width: 450px;
            border: 1px solid #d1d6e2;
            padding: 10px;
            position: relative;
          "
        >
          <div>
            <div style="float: left; font-size: 24px; color: #333333">
              {{ parseMes.orderNo }}发货清单
            </div>
            <div
              v-if="parseMes.commendBox && parseMes.check"
              style="float: right; font-size: 24px; color: #333333"
            >
              [{{ parseMes.commendBox }}#{{ parseMes.check }}]
            </div>
            <p style="clear: both"></p>
          </div>
          <!-- 头部 -->
          <div>
            <div>
              <img id="barcode" height="59" width="265" />
            </div>
            <!-- img -->
            <p style="font-size: 16px; color: #333333; font-weight: normal">
              订单号：{{ parseMes.orderNo }}
            </p>
            <p style="font-size: 16px; color: #333333x; font-weight: normal">
              收货人：{{ parseMes.orderContact }}
            </p>
            <p style="font-size: 16px; color: #333333; font-weight: normal">
              收货人电话：{{ parseMes.orderContactPhone }}
            </p>
            <p
              style="
                font-size: 16px;
                color: #333333;
                font-weight: normal;
                width: 338px;
                margin-bottom: 16px;
              "
            >
              收货人详细地址：{{
                $isEmpty(parseMes.orderProName) +
                $isEmpty(parseMes.orderCityName) +
                $isEmpty(parseMes.orderCountyName) +
                $isEmpty(parseMes.orderAddr)
              }}
            </p>
          </div>
          <!-- 条形码 -->
          <div class="tiaoxinmaMess">
            <el-table
              show-summary
              :data="tableData"
              :stripe="true"
              :border="true"
              :summary-method="hejiMethod"
            >
              <el-table-column
                label="产品名称"
                prop="prodName"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="产品规格"
                prop="prodCode"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column label="数量" prop="sum" show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
          <div
            v-if="parseMes.disposeStatus"
            style="
              position: absolute;
              left: 50%;
              top: 50%;
              width: 180px;
              height: 180px;
              margin-left: -90px;
              z-index: -1;
              margin-top: -90px;
            "
          >
            <img src="~@/assets/img/purchase.png" />
          </div>
        </div>
      </div>
    </template>
  </kuanjiaClick>
</template>
<style>
#app
  .tiaoxinmaMess
  .el-table
  .el-table__footer-wrapper
  .has-gutter
  tr
  td:nth-child(3) {
  border-right: none !important;
}
#app .tiaoxinmaMess .el-table .el-table__footer-wrapper {
  border-top: 1px solid #ebeef5;
  background-color: #fff;
}
#app .tiaoxinmaMess .el-table .el-table__footer-wrapper td {
  background-color: #fff;
}
</style>
<script>
/* eslint-disable*/
import JsBarcode from "jsbarcode";
import kuanjiaClick from "../../components/commin/kuanjiaClick";
import { pDeliverGoodsprintDeliverGoods } from "../../api/api";
export default {
  props: {
    parseMes: {
      type: Object,
      default: () => {
        return {
          channelOrderNo: "JD20180927002",
          orderContact: "王五",
          orderContactPhone: "131313131313",
          orderProName: "aadsa",
          orderCityName: "",
          orderCountyName: "dsdsa",
          orderAddr: "sadsa",
          disposeStatus: false,
          orderNo: "950615362747891312",
        };
      },
    },
  },
  data() {
    return {
      Newtime: "",
      tableData: [
        {
          sum: 0,
          prodCode: "JD20180927002",
        },
        {
          prodCode: "JD20180927002",
          sum: 1,
        },
      ],
      parintBatchNumberArrs: [],
      printMess: () => {
        this.$nextTick(() => {
          let Dom = document.getElementById("tiaoxinma"),
            orderNo = this.parseMes.orderNo;
          setTimeout(() => {
            JsBarcode("#barcode")
              .options({
                font: "OCR-B",
                format: "CODE39",
                lineColor: "#000",
                displayValue: false,
              })
              .CODE128(orderNo, { fontSize: 18, textMargin: 0, height: 59 })
              .render();
          }, 10);
        });
      },
    };
  },
  components: {
    kuanjiaClick,
  },
  mounted() {
    this.printMess();
  },
  methods: {
    hejiMethod(e) {
      const { columns, data } = e;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "——";
        }
      });
      return sums;
    },
    closeBtn() {
      this.$emit("getiswuliudanOne", false);
    },
    //打印
    printWarehouseReceipt() {
      pDeliverGoodsprintDeliverGoods([{ id: this.parseMes.id }]);
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
      this.LODOP.ADD_PRINT_HTM(
        40,
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
    left: 50%;
    width: 1140px;
    z-index: 44;
    background: #f8f8f8;
    transform: translate(-50%);
  }

  .setUserIngBoxCenter {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;

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