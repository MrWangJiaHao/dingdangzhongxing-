<template>
  <div class="mian">
    <div class="orderDetaiPage">
      <div class="orderDetailBox">
        <div class="orderDetail-title">取货信息</div>
        <div class="orderDetail-input">
          <div class="nameBox">
            <div class="roleName-text">取货人：</div>
            <div class="roleName-checkBox">
              <el-input v-model="takeGoodsPeople" placeholder="请输入取货人">
              </el-input>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">取货时间：</div>
            <div class="roleName-checkBox">
              <dateTime
                :dateTimeData="datetimeDates"
                @getDateTime="getStartTime"
                ref="startTime"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="orderDetailBox userInfor">
        <div class="orderDetail-title">订单详情</div>
      </div>
      <div class="orderDetailBox">
        <div class="orderDetail-title">收货信息</div>
      </div>
      <div class="orderDetailBox">
        <div class="orderDetail-title">商品明细</div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :stripe="true"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" align="center" type="index" width="60">
          </el-table-column>
          <el-table-column prop="" label="渠道商品编码" align="center">
          </el-table-column>
          <el-table-column prop="" label="渠道商品名称" align="center">
          </el-table-column>
          <el-table-column prop="prodCode" label="产品编码" align="center">
          </el-table-column>
          <el-table-column prop="prodFullName" label="产品名称" align="center">
          </el-table-column>
          <el-table-column prop="specName" label="产品规格" align="center">
          </el-table-column>
          <el-table-column prop="braName" label="品牌" align="center">
          </el-table-column>
          <el-table-column prop="prodNum" label="购买数量" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="backBtnBox">
        <div class="backBtn" @click="back">返回</div>
        <div class="submitBtn" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Message } from "element-ui";
import dateTime from "../../components/commin/dateTime.vue"; //时间
export default {
  components: {
    dateTime,
  },
  data() {
    return {
      datetimeDates: {
        placeholder: "请选择时间",
      },
      tableData: [],
      takeGoodsPeople: "",
    };
  },
  methods: {
    getStartTime(e) {
      console.log(e);
    },
    back(){},
    submit(){},
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";
.mian {
  background: #e3e4e8;
  padding: 10px;
  .orderDetaiPage {
    background: #fff;
    padding: 20px;
    .orderDetailBox {
      margin-bottom: 20px;
      .orderDetail-title {
        font-size: 16px;
        position: relative;
        margin: 0 0 20px 25px;
      }
      .orderDetail-title::before {
        content: "";
        width: 15px;
        height: 15px;
        background: url("../../assets/img/systemTitlemesa.png");
        position: absolute;
        left: -25px;
        top: 3px;
      }
      .orderDetail-input {
        display: flex;
        font-size: 16px;
        .nameBox {
          display: flex;
          align-items: center;
          margin-right: 20px;
        }
      }
    }
    .backBtnBox {
      width: 100%;
      display: flex;
      .backBtn {
        @include BtnFunction("success");
      }
      .submitBtn {
        @include BtnFunction("success");
      }
    }
  }
  table {
    width: 100%;
    border: 1px solid #d1d6e2;
    border-collapse: collapse;
  }
  tr,
  td {
    border: 1px solid #d1d6e2;
  }
  td {
    padding: 10px 20px;
  }
  td:nth-of-type(odd) {
    text-align: right;
    background: #ecf1f7;
  }
  td:nth-of-type(even) {
    text-align: left;
    width: 25%;
    padding: 10px 20px;
  }
  .userInfor {
    td:nth-of-type(even) {
      width: 37%;
      padding: 10px 20px;
    }
  }
}
</style>