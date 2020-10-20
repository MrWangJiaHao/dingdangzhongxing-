<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox mb10">
        <div class="closeTitle">打印入库单</div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>
      <div style="border-bottom: 1px solid #d2d6e2; padding: 0 0 10px 0">
        <div class="pd20">
          <div class="ptb20" style="border: 1px solid #d2d6e2">
            <div
              style="
                position: relative;
                height: 90px;
                border-bottom: 1px solid #d2d6e2;
              "
            >
              <div
                style="
                  position: absolute;
                  font-size: 24px;
                  font-weight: bold;
                  left: 50%;
                  top: 20px;
                  transrom: translate(-50%);
                  color: #343434;
                  line-height: 26px;
                "
              >
                入库单
              </div>
              <div style="position: absolute; right: 10px">
                <img
                  src="http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg?code=RK_20200420104302547_044943"
                />
              </div>
            </div>
            <!-- 入库单头部 -->
            <div style="padding: 20px 20px 0 20px">
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
                    委托公司
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
                    入库单号:
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
                    RK_20200420104302547_044943
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
                    入库单号:
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
                    312321dsadsa
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
                    dsadsddasd
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
                    入库类型:
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
                    预入库
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
                    入库人(签字):
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
                      line-height: 26px;
                      margin-right: 10px;
                    "
                  >
                    入库号时间:
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
              <div>入库单表格</div>
              <!-- 入库单表格 -->
              <div>入库尾部</div>
              <!-- 入库尾部 -->
            </div>
          </div>
        </div>
      </div>
      <!-- 打印的内容 -->

      <div class="tr" style="padding: 20px 20px 20px 0">
        <div class="tijiaoBox mt20 disinb">打印</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeBtn() {
      this.$parent._data.WarehouseReceipt = false;
    },
    data() {
      let tables = [{
        prodcode:"0",
        prodFullName:"的撒大的撒旦就殴打啊",
        specName:"500*500",
        prodNum:"10000",
        
      }];
      let json = {
        tables, 
      };
      return json;
    },
  },
};
</script>
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
    width: 1000px;
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