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
      <div class="orderDetailBox">
        <div class="orderDetail-title">订单详情</div>
        <table>
          <tr>
            <td>订单号</td>
            <td>{{ orderNo }}</td>
            <td>订单状态</td>
            <td>{{ subOrderStatus }}</td>
            <td>支付时间</td>
            <td>{{ payTime }}</td>
          </tr>
          <tr>
            <td>委托公司</td>
            <td>{{ orgName }}</td>
            <td>渠道</td>
            <td>{{ channelName }}</td>
            <td>订单来源</td>
            <td>{{ orderSourceName }}</td>
          </tr>
          <tr>
            <td>备注</td>
            <td>{{ remark }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="orderDetailBox userInfor">
        <div class="orderDetail-title">收货信息</div>
        <table>
          <tr>
            <td>收货人</td>
            <td></td>
            <td>联系电话</td>
            <td></td>
          </tr>
        </table>
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
import { Message } from "element-ui";
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
      orderNo: "", //订单号
      subOrderStatus: "", //订单状态
      payTime: "", //支付时间
      orgName: "",
      channelName: "", //渠道
      orderSourceName: "", //订单来源名称
      remark: "",
    };
  },
  mounted() {
    Message({
      message: "该模块功能暂未开发",
      type: "error",
    });
    
  },
  methods: {
    getStartTime(e) {
      console.log(e);
    },
    back() {
      this.$router.go(-1);
    },
    submit() {},
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";
.mian {
  background: #eef1f8;
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
      width: 180px;
      margin: 0 auto;
      display: flex;
      .backBtn {
        @include BtnFunction("success");
        margin-right: 16px;
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