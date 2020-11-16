<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox mb10">
        <div class="closeTitle">手动发货拣货单</div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>
      <div style="border-bottom: 1px solid #d2d6e2; padding: 0 0 10px 0">
        <div style="border-bottom: 1px solid #d2d6e2; padding: 0 0 10px 0">
          <div id="printCenter" style="padding: 20px">
            <div class="ptb20" style="border: 1px solid #d2d6e2; width: 1000px">
              <div
                style="
                  width: 1000px;
                  position: relative;
                  height: 100px;
                  border-bottom: 1px solid #d2d6e2;
                "
              >
                <div
                  style="
                    position: absolute;
                    font-size: 24px;
                    font-weight: bold;
                    left: 50%;
                    top: 30px;
                    transrom: translate(-50%);
                    color: #343434;
                    line-height: 26px;
                  "
                >
                  XXX拣货单
                </div>
                <div style="position: absolute; top: 10px; right: 50px">
                  <img
                    :src="'http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg?code=123123'"
                    width="300"
                    height="90"
                  />
                </div>
              </div>
              <!-- 入库单头部 -->
              <div style="padding: 20px 20px 0 20px; width: 1000px">
                <div style="width: 100%">
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
                      listArrs.orgName
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
                      listArrs.putWareNo
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
                      listArrs.orderNo
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
                      listArrs.batchNo
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
                      WarehousingType
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
                      "
                    >
                      基础信息
                    </div>
                  </div>
                  <div>
                    <el-table
                      style="width: 980px"
                      ref="singleTable"
                      :data="tableDatas"
                      border
                      highlight-current-row
                    >
                      <el-table-column
                        property="prodCode"
                        label="库位"
                        style="text-align: center; width: 80px"
                      >
                      </el-table-column>
                      <el-table-column
                        property="prodCode"
                        label="产品编码"
                        style="text-align: center; width: 80px"
                      >
                      </el-table-column>
                      <el-table-column
                        property="prodName"
                        label="产品名称"
                        width="120"
                      >
                      </el-table-column>
                      <el-table-column property="specName" label="产品规格">
                      </el-table-column>
                      <el-table-column property="prodNum" label="申请入库数量">
                      </el-table-column>
                      <el-table-column property="shijishulian" label="产品规格">
                      </el-table-column>
                      <el-table-column property="recommendSeatNo" label="数量">
                      </el-table-column>
                      <el-table-column property="wareSeatNo" label="指引">
                      </el-table-column>
                    </el-table>
                  </div>
                  <!-- 表格title -->
                </div>
                <!-- 入库单表格 -->
                <div style="padding: 20px 30px 20px 0; text-align: right">
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
                    1/ tableDatas.length / 5
                  </div>
                </div>
                <!-- 入库尾部 -->
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

  methods: {
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