<template>
  <div>
    <kuanjiaClick
      titles="打印物流单"
      @closeBtn="closeBtn"
      :isLookerShow="false"
      print="打印"
      width="590"
      min-height="670"
      @clickSubmit="printWarehouseReceipt"
    >
      <template>
        <div id="printCenter" class="p20" style="width: 800px">
          <div style="width: 551px; position: relative; z-index: 100">
            <div style="border-bottom: none; border: 1px solid #888888">
              <h1
                style="
                  margin: 26px 10px;
                  color: #333333;
                  line-height: 26px;
                  font-size: 48px;
                "
              >
                {{ logisticsListJson.exprName }}
              </h1>

              <img
                style="position: absolute; right: -53px; top: 5px; z-index: -3"
                :src="
                  baseUrl +
                  '/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg?code=' +
                  logisticsListJson.exprNo
                "
              />
              <p
                style="
                  clear: both;
                  width: 100%;
                  height: 4px;
                  background: #454545;
                "
              ></p>
              <pre style="color: #454545; margin: 10px">
收件方地址：{{ logisticsListJson.orderProName +logisticsListJson.orderCityName+logisticsListJson.orderAddr }}

<span>{{logisticsListJson.orderContact}}</span>  <span
                                    style="color:#333;">{{logisticsListJson.orderContactPhone}}</span>
</pre>
              <p style="width: 100%; height: 1px; background: #888888"></p>
              <pre style="color: #454545; margin: 10px">
寄件方地址：陕西省西安市雁塔区锦业路69号创业研发园

{{logisticsListJson.orderSourceName}}公司        15894542101
<div style=" position: relative">
<span style="">托寄信息：化妆品</span>
<div style="position:absolute; right:-63px;bottom:-10px;
    overflow: hidden;
    z-index:-1;
height:90px;">
     <img :src="
                  baseUrl+'/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg?code=' +
                  logisticsListJson.exprNo
                ">
     </div>
</div></pre>
            </div>
            <p style="width: 551px; height: 4px; background: #454545"></p>
            <div
              style="width: 551px; border-top: none; border: 1px solid #888888"
            >
              <pre style="color: #454545; margin: 10px">
收件方地址：{{ logisticsListJson.orderProName +logisticsListJson.orderCityName+logisticsListJson.orderAddr }}

<span>{{logisticsListJson.orderContact}}</span>  <span
                    style="color:#333;">{{logisticsListJson.orderContactPhone}}</span>
</pre>
              <p style="width: 100%; height: 1px; background: #888888"></p>
              <pre style="color: #454545; margin: 10px">
寄件方地址：陕西省西安市雁塔区锦业路69号创业研发园

{{logisticsListJson.orderSourceName}}公司        15894542101
<div style=" position: relative">
<span style="">托寄信息：化妆品</span>
<div style="position:absolute; right:-63px;bottom:-10px;
z-index:-1;
    overflow: hidden;
height:90px;">
     <img :src="
                  baseUrl+'/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg?code=' +
                  logisticsListJson.exprNo
                ">
     </div>
</div></pre>
            </div>
          </div>
          <!-- 打印内容 -->
        </div>
      </template>
    </kuanjiaClick>
  </div>
</template>

<script>
/*
     eslint-disable
     */
import kuanjiaClick from "../../components/commin/kuanjiaClick";

export default {
  props: {
    logisticsListJson: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    kuanjiaClick,
  },
  data() {
    return {
      tableDatas: [],
      Newtime: "",
      parintBatchNumberArrs: [],
      baseUrl: sessionStorage.getItem("baseUrl"),
    };
  },
  created() {
    console.log(this.logisticsListJson);
    this._changeTime();
    let parintBatchNumberArrs = eval(
      sessionStorage.getItem("parintBatchNumberArrs")
    );
    if (parintBatchNumberArrs) {
      this.parintBatchNumberArrs = parintBatchNumberArrs;
    }
  },

  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex);
      if (row["abes"]) {
        if (columnIndex === 0) {
          return [1, 8];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    closeBtn() {
      this.$emit("getiswuliudanOne", false);
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
    width: 574px;
    height: 733px;
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