<template>
  <div class="checkOrderInfor">
    <div class="orderDetaiPage">
      <div class="orderDetailBox">
        <div class="orderDetail-title">缺货订单</div>
        <div class="titeleInfor">
          <span>委托公司：</span>
          <span>{{ tableData.tails.orgName }}</span>
          <span class="addLeft">盘点单号：</span>
          <span>{{ tableData.stockNo }}</span>
          <span class="addLeft">盘点分类：</span>
          <span>{{ tableData.stockType }}</span>
        </div>
        <div class="productTable" v-show="productTableShow">
          <el-table
            :data="productTableData"
            border
            style="width: 100%"
            :stripe="true"
            tooltip-effect="dark"
          >
            <el-table-column
              type="index"
              label="序号"
              width="71"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="委托公司"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="prodCode"
              label="产品编号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="prodName"
              label="产品名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="prodSpec"
              label="产品规格"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="braName" label="品牌" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="address"
              label="系统库存"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="实际库存"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="" label="差异" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" label="盘点结果" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" label="原因" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop=""
              label="实际盘点时间"
              show-overflow-tooltip
              width="180"
            >
            </el-table-column>
            <el-table-column prop="" label="盘点人" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="" label="订正人" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop=""
              label="订正时间"
              show-overflow-tooltip
              width="180"
            >
            </el-table-column>
            <el-table-column prop="" label="订正结果" show-overflow-tooltip>
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
        <div class="storelocaTable" v-show="storelocaTableShow">
          <el-table
            :data="storelocaTableData"
            border
            style="width: 100%"
            :stripe="true"
            tooltip-effect="dark"
          >
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="71"
            >
            </el-table-column>
            <el-table-column prop="orderNo" label="子仓名称" align="center">
            </el-table-column>
            <el-table-column prop="subOrderNo" label="区域类型" align="center">
            </el-table-column>
            <el-table-column
              prop="orderContact"
              label="区域名称"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="orderContactPhone"
              label="货架名称"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="orderAddr"
              label="库位"
              show-overflow-tooltip
              width="180"
            >
            </el-table-column>
            <el-table-column prop="prodNum" label="产品编码" align="center" width="180">
            </el-table-column>
            <el-table-column prop="prodNum" label="产品名称" align="center">
            </el-table-column>
            <el-table-column prop="prodNum" label="产品规格" align="center">
            </el-table-column>
            <el-table-column prop="prodNum" label="品牌" align="center">
            </el-table-column>
            <el-table-column prop="prodNum" label="系统库存" align="center">
            </el-table-column>
            <el-table-column prop="prodNum" label="实际库存" align="center">
            </el-table-column>
            <el-table-column prop="prodNum" label="差异" align="center">
            </el-table-column>
            <el-table-column prop="prodNum" label="盘点结果" align="center">
            </el-table-column>
            <el-table-column prop="prodNum" label="原因" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="prodNum" label="盘点人" align="center">
            </el-table-column>
            <el-table-column prop="prodNum" label="实际盘点时间" width="180">
            </el-table-column>
            <el-table-column prop="prodNum" label="订正人" align="center">
            </el-table-column>
            <el-table-column prop="prodNum" label="订正时间" width="180">
            </el-table-column>
            <el-table-column prop="prodNum" label="订正结果" align="center" >
            </el-table-column>
          </el-table>
          <div class="pageComponent">
            <pagecomponent
              :pageComponentsData="pageComponentsData"
              @getPageNum="getPageNum1"
              @sureSuccssBtn="sureSuccssBtn1"
            ></pagecomponent>
          </div>
        </div>
      </div>
      <div class="backBtnBox">
        <div class="quxiaoBox" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from "../../api/api";
import pagecomponent from "../../components/commin/pageComponent"; //分页器

export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/inventoryCheck/checkOrderManagement") {
      next((vm) => {
        if (vm.$route.query.type === "lookdetail") {
          vm.tableData = vm.$route.query.data;
          console.log(vm.tableData);
          if (vm.tableData.stockType === "按产品") {
            vm.productTableShow = true;
          } else if (vm.tableData.stockType === "按库位") {
            vm.storelocaTableShow = true;
          }
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
      tableData: {},
      productTableShow: false,
      storelocaTableShow: false,
      productTableData: [],
      storelocaTableData: [],
      pageComponentsData: {
        pageNums: 0,
      },
      orgName: "",
      stockNo: "",
    };
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },

    getPageNum(e) {
      this.prodReleOrderQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.tableData = [];
      this.prodReleOrderQueryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },

    getPageNum1(e) {
      this.prodReleOrderQueryData.pageNumber = e;
    },
    sureSuccssBtn1(e) {
      this.tableData = [];
      this.prodReleOrderQueryData.pageNumber = e;
    },
    changeData1(data) {
      this.changePageData1(data);
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
.checkOrderInfor {
  padding: 10px;
  background: #eef1f8;
  .orderDetaiPage {
    background: #fff;
    height: 100%;
    .orderDetailBox {
      padding: 20px;
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
      border-top: 1px solid #d1d6e2;
      height: 76px;
      align-items: center;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .quxiaoBox {
        @include BtnFunction();
        margin-right: 20px;
      }
    }
  }
}
</style>