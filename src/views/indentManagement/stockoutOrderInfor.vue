<template>
  <div class="mian">
    <div class="orderDetaiPage">
      <div class="orderDetailBox">
        <div class="orderDetail-title">缺货订单</div>
        <div class="titeleInfor">
          <span>委托公司：</span>
          <span>{{ orgName }}</span>
          <span class="addLeft">产品名称：</span>
          <span>{{ prodName }}</span>
          <span class="addLeft">规格：</span>
          <span>{{ specName }}</span>
          <span class="addLeft">共计{{ allorderNum }}单</span>
        </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :stripe="true"
          tooltip-effect="dark"
          @summary-method="summaryMethod"
        >
          <el-table-column label="序号" align="center" type="index" width="60">
          </el-table-column>
          <el-table-column prop="orderNo" label="订单号" align="center">
          </el-table-column>
          <el-table-column prop="subOrderNo" label="子单号" align="center">
          </el-table-column>
          <el-table-column prop="orderContact" label="收货人" align="center">
          </el-table-column>
          <el-table-column
            prop="orderContactPhone"
            label="联系电话"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="orderAddr" label="收货地址" align="center">
          </el-table-column>
          <el-table-column prop="prodNum" label="缺货数量" align="center">
          </el-table-column>
        </el-table>
        <div class="pageComponent">
          <pagecomponent
            :pageComponentsData="pageComponentsData"
            @getPageNum="getPageNum"
            @sureSuccssBtn="sureSuccssBtn"
          ></pagecomponent>
        </div>
      </div>
      <div class="backBtnBox">
        <div class="backBtn" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import { findFailProdDetail } from "../../api/api";
import { Message } from "element-ui";
import pagecomponent from "../../components/commin/pageComponent"; //分页器

export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/indentManagement/stockoutIndentManage") {
      next((vm) => {
        if (vm.$route.query.type === "orderNum") {
          vm.prodReleOrderQueryData.paras.prodId =
            vm.$route.query.orderNum.prodId;
          let rowres = vm.$route.query.orderNum;
          vm.orgName = rowres.orgName;
          vm.prodName = rowres.prodName;
          vm.specName = rowres.specName + "ml";
          vm.allorderNum = rowres.orderNum;
        }
      });
    } else {
      next((vm) => {
        vm.$router.go(-1);
      });
    }
  },
  components: {
    pagecomponent,
  },
  data() {
    return {
      tableData: [],
      pageComponentsData: {
        pageNums: 0,
      },
      orgName: "",
      prodName: "",
      specName: "",
      allorderNum: "",
      prodReleOrderQueryData: {
        pageNumber: 1,
        pageSize: 10,
        paras: {
          prodId: "",
        },
      },
      queryFun: "",
    };
  },
  mounted() {
    this.queryFun = () => {
      let prodReleOrderQueryData = this.prodReleOrderQueryData;
      findFailProdDetail(prodReleOrderQueryData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          if (this.tableData.length === 0) {
            Message({
              type: "error",
              message: "未查询到缺货的订单",
            });
          }
          this.changeData(ok.data.result);
        } else {
          Message({
            type: "error",
            message: "查询失败",
          });
        }
      });
    };
    this.queryFun();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    summaryMethod({ columns, data }) {
      //表格合计方法
      console.log(columns, data);
    },
    getPageNum(e) {
      this.prodReleOrderQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.tableData = [];
      this.queryFun();
      this.prodReleOrderQueryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
  },
};
</script>

<style lang="scss" scoped>
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
      .titeleInfor {
        font-size: 16px;
        margin-bottom: 10px;
        .addLeft {
          margin-left: 38px;
        }
      }
    }
    .backBtnBox {
      width: 100%;
      .backBtn {
        margin: 0 auto;
        @include BtnFunction("success");
      }
    }
  }
  .pageComponent {
    text-align: right;
    background: #ffffff;
  }
}
</style>