<template>
  <div class="mian">
    <div class="titleStyle">
      <div class="titleText"> {{ title }}</div>
      <div class="closeIcon" @click="closeDialog"></div>
    </div>
    <div class="orderDetaiPage">
      <div class="orderDetailBox">
        <div class="orderDetail-title">借调单详情</div>
        <table>
          <tr>
            <td>借调单号：</td>
            <td>{{ dataJson.loanNo }}</td>
            <td>借出方：</td>
            <td>{{ dataJson.wareName }}</td>
            <td>借调状态：</td>
            <td>{{ dataJson.loanStatus }}</td>
          </tr>
          <tr>
            <td>创建人：</td>
            <td>{{ dataJson.createUser }}</td>
            <td>创建时间：</td>
            <td>{{ dataJson.createTime }}</td>
            <td>审核人：</td>
            <td>{{ dataJson.verifyUserName }}</td>
          </tr>
          <tr>
            <td>审核时间：</td>
            <td>{{ dataJson.verifyTime }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="orderDetailBox userInfor">
        <div class="orderDetail-title">物料明细</div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :stripe="true"
          tooltip-effect="dark"
          max-height="200px"
        >
          <el-table-column label="序号" align="center" type="index" width="71">
          </el-table-column>
          <el-table-column prop="materielType" label="物料类型" align="center">
          </el-table-column>
          <el-table-column prop="materielCode" label="物料编号" align="center">
          </el-table-column>
          <el-table-column prop="materielName" label="物料名称" align="center">
          </el-table-column>
          <el-table-column prop="specName" label="物料规格" align="center" width="180">
          </el-table-column>
          <el-table-column
            prop="actualInventory"
            label="实际库存"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="materielNum"
            label="申请借调数量"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="orderDetailBox">
        <div class="orderDetail-title">备注</div>
        <div class="remarkBox">
          {{ dataJson.remark ? "无备注" : dataJson.remark }}
        </div>
      </div>
    </div>
     <div class="footerBtn">
      <div class="backBtn" @click="back">关闭</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    dataJson: Object,
    title: String,
  },
  data() {
    return {
      id: "",
    };
  },
  mounted() {
  },
  methods: {
    back() {
      this.$emit("BorrowOrderDetailIsShow", false);
    },
    closeDialog(){
      this.$emit("BorrowOrderDetailIsShow", false);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
.mian {
  width: 960px;
  height: 580px;
  .titleStyle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background: #ecf1f7;
    padding: 0 20px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #d1d6e2;
  }
  .orderDetaiPage::-webkit-scrollbar {
    width: 0 !important;
  }
  .orderDetaiPage {
    overflow-y: auto;
    background: #fff;
    padding: 20px 20px 0 20px;
    overflow: scroll;
    height: 500px;
    .orderDetailBox {
      margin-bottom: 20px;
      .orderDetail-title {
        font-size: 16px;
        color: #52a8fd;
        position: relative;
        margin: 0 0 20px 10px;
      }
      .orderDetail-title::before {
        content: "";
        width: 3px;
        height: 15px;
        background: linear-gradient(#52a8fd, #73cfff);
        position: absolute;
        left: -10px;
        top: 4px;
      }
    }
  }

  table {
    width: 100%;
  }

  td {
    padding: 10px 0;
  }
  td:nth-of-type(odd) {
    text-align: right;
  }
  td:nth-of-type(even) {
    text-align: left;
    width: 25%;
    padding: 10px 0;
  }
}
</style>