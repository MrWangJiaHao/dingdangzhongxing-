<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox mb10">
        <div class="closeTitle">打印出库单</div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>
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
                出库单
              </div>
              <div style="position: absolute; top: 10px; right: 50px">
                <img
                  :src="
                    'http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg?code=' +
                    listArrs.outWareNo
                  "
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
                    委托公司:
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
                    {{ listArrs.orgName }}
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
                    出库单号:
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
                    {{ listArrs.outWareNo }}
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
                    关联单号:
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
                    {{ listArrs.orderNo }}
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
                    批次号:
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
                    {{ listArrs.batchNo }}
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
                    出库类型:
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
                    {{ WarehousingType }}
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
                      font-weight: 700;
                    "
                  >
                    出库人(签字):
                  </div>
                  <div
                    style="
                      display: inline-block;
                      font-size: 14px;
                      color: #343434;
                      line-height: 26px;
                      margin-right: 50px;
                      width: 130px;
                      border-bottom: 1px solid #000;
                    "
                  ></div>
                </div>
                <div style="display: inline-block">
                  <div
                    style="
                      display: inline-block;
                      font-size: 14px;
                      color: #343434;
                      font-weight: 700;
                      line-height: 26px;
                      margin-right: 10px;
                    "
                  >
                    出库时间:
                  </div>
                  <div
                    style="
                      display: inline-block;
                      font-size: 14px;
                      color: #343434;
                      line-height: 26px;
                      margin-right: 50px;
                      width: 130px;
                      border-bottom: 1px solid #000;
                    "
                  ></div>
                </div>
              </div>
              <!-- 入库单信息 -->
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
                    明细
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
                    <el-table-column type="index" label="序号" width="50">
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
                    <el-table-column property="prodNum" label="申请出库数量">
                    </el-table-column>
                    <el-table-column
                      property="shijishulian"
                      label="实际入库数量"
                    >
                    </el-table-column>
                    <el-table-column property="recommendSeatNo" label="库位">
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
                  打印时间：{{ Newtime }}
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
                  1/{{ tableDatas.length / 5 }}
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
</template>

<script>
export default {
  data() {
    return {
      tableDatas: [],
      Newtime: "",
      listArrs: {},
    };
  },
  props: {
    WarehousingType: String,
  },
  created() {
    this._changeTime();
  },
  mounted() {
    this.$nextTick(() => {
      let listArrs = JSON.parse(sessionStorage.getItem("listArrs"));
      console.log(listArrs, "出库单");
      this.listArrs = listArrs;
      this.tableDatas = listArrs.tails.pOutWarehouseDetail;
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
      this.$parent._data.WarehouseReceipts = false;
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
        20,
        30,
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
    width: 980px;
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
    width: 1034px;
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