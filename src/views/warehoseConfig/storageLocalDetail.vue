<template>
  <div>
    <!-- 这是库位详情页面 -->
    <div class="productInfor">
      <div class="productInfor_title">产品信息</div>
      <div class="productInfor_div">
        <div class="inputDiv">
          <div class="text_box">
            <div>委托公司：</div>
            <div>{{ seatCodeData.orgName }}</div>
          </div>
          <div class="text_box">
            <div>产品编号：</div>
            <div>{{ seatCodeData.prodCode }}</div>
          </div>
          <div class="text_box">
            <div>产品名称：</div>
            <div>{{ seatCodeData.prodFullName }}</div>
          </div>
          <div class="text_box">
            <div>规格：</div>
            <div>{{ seatCodeData.specName }}</div>
          </div>
          <div class="text_box">
            <div>品牌：</div>
            <div>{{ seatCodeData.braName }}</div>
          </div>
          <div class="text_box">
            <div>长：</div>
            <div></div>
          </div>
          <div class="text_box">
            <div>宽：</div>
            <div></div>
          </div>
          <div class="text_box">
            <div>高：</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="detailTable productInfor">
      <div class="productInfor_title">库位信息</div>
      <div class="tableBox">
        <table>
          <tr>
            <td class="tdName">子仓名称</td>
            <td class="tdInfor">{{ seatCodeData.childWareName }}</td>
            <td class="tdName">子仓类型</td>
            <td class="tdInfor">
              {{
                seatCodeData.wareType === 1
                  ? "销售仓"
                  : seatCodeData.wareType === 2
                  ? "售后仓"
                  : seatCodeData.wareType === 3
                  ? "残次品仓"
                  : "——"
              }}
            </td>
            <td class="tdName">区域类型</td>
            <td class="tdInfor"></td>
          </tr>
          <tr>
            <td class="tdName">区域名称</td>
            <td class="tdInfor">{{ seatCodeData.wareAreaName }}</td>
            <td class="tdName">区域编号</td>
            <td class="tdInfor">
              {{ (seatCodeData.wareSeatCode || "").split("-")[0] }}
            </td>
            <td class="tdName">存放单位</td>
            <td class="tdInfor">{{ seatCodeData.prodUnit }}</td>
          </tr>
          <tr>
            <td class="tdName">最大存放数</td>
            <td class="tdInfor">{{ seatCodeData.maxNum }}</td>
            <td class="tdName">补货预警值</td>
            <td class="tdInfor">{{ seatCodeData.inventoryFloor }}</td>
            <td class="tdName">货架编码</td>
            <td class="tdInfor">
              {{ (seatCodeData.wareSeatCode || "").split("-")[2] }}
            </td>
          </tr>
          <tr>
            <td class="tdName">层</td>
            <td class="tdInfor">
              {{ (seatCodeData.wareSeatCode || "").split("-")[3] }}
            </td>
            <td class="tdName">库位</td>
            <td class="tdInfor">{{ seatCodeData.wareSeatCode }}</td>
            <td class="tdName"></td>
            <td class="tdInfor"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seatCodeData: Object,
  },
  data() {
    return {
      // data: {},
    };
  },
  mounted() {
    console.log(this.seatCodeData);
  },
  methods: {
    clickBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

.productInfor {
  background: white;
  .productInfor_title {
    font-size: 16px;
    color: #5bb2fe;
    font-weight: 600;
    margin-left: 10px;
    position: relative;
  }
  .productInfor_title:after {
    content: "";
    width: 3px;
    height: 100%;
    background: #5bb2fe;
    position: absolute;
    left: -10px;
    top: 0px;
  }
  .inputDiv {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    .text_box {
      display: flex;
      align-items: center;
      margin: 0 20px 16px 0;
      div:nth-of-type(1) {
        white-space: nowrap;
      }
      div:nth-of-type(2) {
        display: inline-block;
        width: 190px;
        height: 34px;
        line-height: 34px;
        border-radius: 4px;
        padding: 0 30px 0 15px;
        color: rgb(96, 98, 102);
        border: 1px solid #dcdfe6;
        background: #eeeeee;
      }
    }
  }
}
.detailTable {
  .tableBox {
    margin-top: 16px;
    table {
      border: 1px solid #d1d6e2;
      text-align: center;
      border-collapse: collapse;
      font-size: 16px;
      tr {
        border: 1px solid #d1d6e2;
        td {
          border: 1px solid #d1d6e2;
          line-height: 34px;
          white-space: nowrap;
        }
        td:nth-of-type(odd) {
          background: #ecf1f7;
          padding: 0 16px;
          text-align: right;
        }
        td:nth-of-type(even) {
          width: 177px;
          text-align: left;
          padding: 0 16px;
        }
      }
    }
  }
}
.btnBox {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  .backBtn {
    @include BtnFunction("success");
  }
}
</style>