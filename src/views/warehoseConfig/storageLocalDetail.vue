<template>
  <div>
    <!-- 这是库位详情页面 -->
    <div class="productInfor">
      <div class="productInfor_title">产品信息</div>
      <div class="productInfor_div">
        <div class="inputDiv">
          <div class="text_box">
            <div>委托公司：</div>
            <div>{{ data.orgName }}</div>
          </div>
          <div class="text_box">
            <div>产品编号：</div>
            <div>{{ data.prodCode }}</div>
          </div>
          <div class="text_box">
            <div>产品名称：</div>
            <div>{{ data.prodFullName }}</div>
          </div>
          <div class="text_box">
            <div>规格：</div>
            <div>{{ data.specName }}</div>
          </div>
        </div>
        <div class="inputDiv">
          <div class="text_box">
            <div>品牌：</div>
            <div>{{ data.braName }}</div>
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
            <td class="tdInfor">{{ data.childWareName }}</td>
            <td class="tdName">子仓类型</td>
            <td class="tdInfor">
              
            </td>
            <td class="tdName">区域类型</td>
            <td class="tdInfor">{{ data.wareType === 1 ? "存储区" : "拣货区" }}</td>
          </tr>
          <tr>
            <td class="tdName">区域名称</td>
            <td class="tdInfor">{{ data.wareAreaName }}</td>
            <td class="tdName">区域编号</td>
            <td class="tdInfor">
              {{ (data.wareSeatCode || "").split("-")[0] }}
            </td>
            <td class="tdName">存放单位</td>
            <td class="tdInfor">{{data.prodUnit}}</td>
          </tr>
          <tr>
            <td class="tdName">最大存放数</td>
            <td class="tdInfor">{{ data.maxNum }}</td>
            <td class="tdName">补货预警值</td>
            <td class="tdInfor">{{ data.inventoryFloor }}</td>
            <td class="tdName">货架编码</td>
            <td class="tdInfor">
              {{ (data.wareSeatCode || "").split("-")[2] }}
            </td>
          </tr>
          <tr>
            <td class="tdName">层</td>
            <td class="tdInfor">
              {{ (data.wareSeatCode || "").split("-")[3] }}
            </td>
            <td class="tdName">库位</td>
            <td class="tdInfor">{{ data.wareSeatCode }}</td>
            <td class="tdName"></td>
            <td class="tdInfor"></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="btnBox">
      <div class="backBtn" @click="clickBack">返回</div>
    </div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, form, next) {
    if (form.name === "/warehoseconfig/storageLocalMap") {
      next((vm) => {
        vm.data = vm.$route.query.kuwei;
      });
    } else {
      next((vm) => {
        vm.$router.push("/warehoseconfig/storageLocalMap");
      });
    }
  },
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    console.log(this.data);
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
  padding: 16px;
  background: white;
  .productInfor_title {
    position: relative;
    font-size: 16px;
    margin-left: 25px;
  }
  .productInfor_title:after {
    content: "";
    width: 15px;
    height: 15px;
    position: absolute;
    background: url("../../assets/img/systemTitlemesa.png") no-repeat;
    left: -25px;
    top: 3px;
  }
  .inputDiv {
    margin-top: 16px;
    display: flex;
    .text_box {
      display: flex;
      align-items: center;
      font-size: 16px;
      margin-right: 16px;
      div:nth-of-type(1) {
        white-space: nowrap;
      }
      div:nth-of-type(2) {
        display: inline-block;
        width: 190px;
        height: 40px;
        line-height: 40px;
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
      border: 1px solid #ebeef5;
      text-align: center;
      border-collapse: collapse;
      font-size: 16px;
      tr {
        border: 1px solid rgb(61, 60, 60);
        td {
          border: 1px solid rgb(170, 166, 166);
          padding: 10px 40px;
        }
        td:nth-of-type(even) {
          background: #eeeeee;
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