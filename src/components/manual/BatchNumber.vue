<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox mb10">
        <div class="closeTitle">打印批次号</div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>
      <div style="border-bottom: 1px solid #d2d6e2; padding: 0 0 10px 0">
        <div id="printCenter" style="padding: 20px">
          <div class="ptb20" style="width: 1060px">
            <div
              v-for="(item, idx) in parintBatchNumberArrs"
              :key="idx"
              style="
                padding: 20px;
                display: inline-block;
                margin-left: 20px;
                margin-bottom: 20px;
                width: 460px;
                height: 240px;
                color: #333333;
                font-size: 16px;
                font-weight: normal;
                border: 1px solid #d1d6e2;
              "
            >
              <div style="margin-bottom: 15px">
                产品名称：{{ item.prodName }}
              </div>
              <div style="margin-bottom: 15px">规 格：{{ item.specName }}</div>
              <div style="margin-bottom: 15px">
                委托公司：{{ item.supName }}
              </div>
              <div style="margin-bottom: 15px">批次号：{{ item.batchNo }}</div>
              <div style="width: 440px; height: 50px; overflow: hidden">
                <img
                  width="440"
                  style="margin-left: -40px"
                  :src="
                    'http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg?code=' +
                    item.batchNo
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 打印的内容 -->

        <div class="tr" style="padding: 20px 20px 20px 0">
          <div class="tijiaoBox mt20 disinb" @click="printWarehouseReceipt">
            打印
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableDatas: [],
      Newtime: "",
      parintBatchNumberArrs: [],
    };
  },
  created() {
    this._changeTime();
    let parintBatchNumberArrs = eval(
      sessionStorage.getItem("parintBatchNumberArrs")
    );
    if (parintBatchNumberArrs) {
      this.parintBatchNumberArrs = parintBatchNumberArrs;
    }
  },
  mounted() {
    this.$nextTick(() => {
      let cells = document
        .getElementById("printCenter")
        .getElementsByClassName("cell");
      let array = Array.from(cells);
      array.forEach((item) => {
        item.style = "text-align:center;";
      });
    });
  },
  methods: {
    closeBtn() {
      this.$parent._data.BatchNumber = false;
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
<style >
.has-gutter .el-table td,
.el-table th.is-leaf {
  background: #e1eaf5;
}
.el-table td,
.el-table th.is-leaf {
  border: 1px solid #d2d6e2;
}
.cell {
  text-align: center;
}
</style>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

.setUserIngBox {
  background: rgb(232, 233, 236);
  padding: 0 10px;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  left: 0;
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
    top: 144px;
    transform: translateX(-50%);
    background: #fff;
    width: 1140px;
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