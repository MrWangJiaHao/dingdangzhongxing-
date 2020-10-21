<template>
  <div>
    <div class="manualBox">
      <div>
        <manualHeader @getParasJson="getParasJson" :tableData="tableData" />
      </div>
      <div class="btnArr">
        <div style="background-color: #fff">
          <div class="meiyiyetitle">入库管理</div>
          <div class="btnClick">
            <div class="setUser" @click="warehousingConfirmation">入库确认</div>
            <div class="bianjiUser" @click="printstockinlist">打印入库单</div>
            <div class="bianjiUser" @click="printReceipt">打印收货单</div>
            <div class="bianjiUser" @click="parintBatchNumber">打印批次号</div>
            <div class="lodopFunClear" @click="ExportArr">导出</div>
            <div
              class="goOn"
              v-if="$route.params.type == 0"
              @click="CreateStockInOrder"
            >
              创建入库单
            </div>
            
            <div
              class="lodopFunClear"
              v-if="$route.params.type == 0"
              @click="editBtn"
            >
              编辑
            </div>
            <div
              class="remove"
              v-if="$route.params.type == 0"
              @click="clearBtn"
            >
              删除
            </div>
          </div>
        </div>
        <!-- but按钮 -->
      </div>
      <div class="tableBox">
        <div style="background-color: #fff; padding: 20px 20px 0 20px">
          <div class="center">
            <el-table
              ref="multipleTable"
              :data="tableData"
              :stripe="true"
              :border="true"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="82"></el-table-column>
              <el-table-column
                label="序号"
                type="index"
                width="71"
                show-overflow-tooltip
              />
              <el-table-column
                label="委托公司"
                width="119"
                prop="orgName"
                show-overflow-tooltip
              />
              <el-table-column
                label="入库单号"
                width="119"
                property="putWareNo"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                width="119"
                label="关联单号"
                prop="orderNo"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="期望入库开始时间"
                prop="expectedSendStartTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="入库状态"
                width="119"
                prop="putstatus"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="入库人"
                width="119"
                prop="putUser"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="入库开始时间"
                prop="putStartTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="入库完成时间"
                prop="putEndTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="入库批次"
                width="119"
                prop="batchNo"
                show-overflow-tooltip
              ></el-table-column>
            </el-table>
          </div>
          <!-- 表格主体 -->
          <div class="pageComponent">
            <pagecomponent
              :pageComponentsData="pageComponentsData"
              @getPageNum="getPageNum"
              @sureSuccssBtn="sureSuccssBtn"
            />
          </div>
        </div>
      </div>
      <!-- table-biaoge -->
    </div>
    <!-- 头部组件 -->
    <div v-if="WarehouseReceipt">
      <div class="posFixCenter">
        <WarehouseReceipt
          :WarehousingType="
            WarehousingTypeArr[$route.params.type].WarehousingTypeCenter
          "
        />
      </div>
    </div>
    <!-- 入库单 -->
    <div v-if="Receipt">
      <div class="posFixCenter">
        <Receipt
          :WarehousingType="
            WarehousingTypeArr[$route.params.type].WarehousingTypeCenter
          "
        />
      </div>
    </div>
    <!-- 收货单 -->
    <div v-if="BatchNumber">
      <div class="posFixCenter">
        <BatchNumber />
      </div>
    </div>
    <!-- 批次号 -->
  </div>
</template>
<style>
.cell {
  text-align: center;
}
</style>
<script>
import manualHeader from "../../components/manual/manualHeader";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import WarehouseReceipt from "../../components/manual/WarehouseReceipt"; //入库单
import Receipt from "../../components/manual/Receipt"; //收货单
import BatchNumber from "../../components/manual/BatchNumber"; //批次号
import { getFindRecord, post } from "../../api/api";
import { Message } from "element-ui";

export default {
  components: {
    manualHeader,
    pagecomponent,
    WarehouseReceipt,
    Receipt,
    BatchNumber,
  },
  data() {
    return {
      WarehouseReceipt: false,
      WarehouseReceiptIds: "",
      Receipt: false,
      ReceiptIds: "",
      BatchNumber: false,
      BatchNumberIds: "",
      tableData: [
        {
          orgName: "", //委托公司
          orgId: "", //委托id
          orderNo: "", //原定单号（关联单号）
          putWareNo: "", //入库单号
          putstatus: "", //入库状态
          prodCode: "", //产品编码
          prodName: "", //产品名称
          specName: "", //规格名称
          putStartTime: "", //入库时间开始时间
          putEndTime: "", //入库时间结束时间
          expectedSendStartTime: "", //期望入库开始时间
          expectedSendEndTime: "", //期望入库时间结束时间
          putUser: "", //入库人
          batchNo: "",
        },
      ],
      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10条
      },
      sendOutDataJson: {
        paras: {
          orgName: "",
          orgId: "",
          orderNo: "",
          putWareNo: "",
          putstatus: "",
          orderSource: "",
          prodCode: "",
          prodName: "",
          specName: "",
          putStartTime: "",
          putEndTime: "",
          expectedSendStartTime: "",
          expectedSendEndTime: "",
          putUser: "",
          batchNo: "",
        },
        orderBy: "createtime",
        pageNumber: 1, //当前页数
        pageSize: 10, //每页记录数
      },
      multipleSelection: [], //选择了那个
      thisOneShow: true,
      listArrs: {},
      WarehousingTypeArr: [
        {
          WarehousingType: 0,
          WarehousingTypeCenter: "手工创建入库",
        },
        {
          WarehousingType: 1,
          WarehousingTypeCenter: "采购调拨入库",
        },
        {
          WarehousingType: 2,
          WarehousingTypeCenter: "预入库",
        },
        {
          WarehousingType: 3,
          WarehousingTypeCenter: "采购预入库",
        },
        {
          WarehousingType: 4,
          WarehousingTypeCenter: "调拨入库",
        },
        {
          WarehousingType: 5,
          WarehousingTypeCenter: "加工入库",
        },
        {
          WarehousingType: 6,
          WarehousingTypeCenter: "拆解入库",
        },
        {
          WarehousingType: 7,
          WarehousingTypeCenter: "退货入库",
        },
        {
          WarehousingType: 8,
          WarehousingTypeCenter: "盘盈入库",
        },
        {
          WarehousingType: 9,
          WarehousingTypeCenter: "其他入库",
        },
      ],
    };
  },
  created() {
    if (this.thisOneShow) {
      let type = this.$route.params.type;
      this.sendOutDataJson.paras.orderSource = type;
      this.thisOneShow = false;
    }
    this.getTableData();
  },
  watch: {
    $route(to, from) {
      this.sendOutDataJson.paras.orderSource = to.params.type
        ? to.params.type
        : from.params.type;
      this.getTableData();
    },
  },
  methods: {
    getPageNum(e) {
      this.sendOutDataJson.pageNumber = e;
      this.getTableData();
    },
    sureSuccssBtn(e) {
      this.sendOutDataJson.pageNumber = e;
      this.getTableData();
    },
    handleSelectionChange(e) {
      this.multipleSelection = e;
    },
    //入库确认
    warehousingConfirmation() {
      if (!this.multipleSelection.length) {
        return Message("请选择入库确认的单号");
      } else if (this.multipleSelection.length > 1) {
        return Message("只能选择一个入库单号");
      } else {
        this._getFindRecord(this.multipleSelection[0].id).then(() => {
          this.$router.push({
            path: "/warehousingManagement/manageMentrukuSure",
            query: {
              id: this.multipleSelection[0].id,
              WarehousingTypeArr: this.WarehousingTypeArr[
                this.$route.params.type
              ].WarehousingTypeCenter,
            },
          });
        });
      }
    },
    //打印入库单:
    printstockinlist() {
      if (!this.multipleSelection.length) {
        return Message("请选择要打印的入库单");
      } else if (this.multipleSelection.length > 1) {
        return Message("只能选择打印一个入库单");
      } else {
        this.WarehouseReceipt = !this.WarehouseReceipt;
        this.WarehouseReceiptIds = this.multipleSelection[0].id;
        this._getFindRecord(this.multipleSelection[0].id);
      }
    },
    //打印收货单
    printReceipt() {
      if (!this.multipleSelection.length) {
        return Message("请选择要打印的收货单");
      } else if (this.multipleSelection.length > 1) {
        return Message("只能选择打印一个收货单");
      } else {
        this.Receipt = !this.Receipt;
        this.ReceiptIds = this.multipleSelection[0].id;
        this._getFindRecord(this.multipleSelection[0].id);
      }
    },
    // 打印批次号
    parintBatchNumber() {
      this.BatchNumber = !this.BatchNumber;
    },
    //
    async _getFindRecord(ids) {
      let datas = await getFindRecord(ids);
      this.listArrs = datas.result[0];
      sessionStorage.setItem("listArrs", JSON.stringify(datas.result[0]));
      return datas;
    },
    //导出
    ExportArr() {},
    //创建入库单
    CreateStockInOrder() {
      this.$router.push("/warehousingManagement/createManagement");
    },
    //编辑
    editBtn() {},
    //删除
    clearBtn() {},
    //表格发生了变化以及点击了查询按钮
    getParasJson(data) {
      this.sendOutDataJson.paras = { ...data };
      this.getTableData();
    },
    //获取table表格内容
    async getTableData() {
      let datas = await post({
        url:
          "http://139.196.176.227:8902/wbs-warehouse-manage/v1/putWarehouse/findRecordPage",
        data: this.sendOutDataJson,
      });
      this.changeDatas(datas.result);
      return datas;
    },
    changeDatas(datas) {
      if (datas.list) {
        datas.list.forEach((item) => {
          item.putstatus = item.putstatus ? "已入库" : "未入库";
        });
      }
      this.tableData = datas.list;
      this.pageComponentsData.pageNums = datas.totalRow;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";
.posFixCenter {
  display: flex;
  align-self: center;
  justify-content: center;
}

.manualBox {
  border-top: 1px solid #d1d6e2;
  background-color: rgb(232, 233, 236);
}
.btnArr {
  padding: 0 10px;
  > div {
    border-bottom: 1px solid #d1d6e2;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: inline-block;
    }
  }
  .meiyiyetitle {
    display: flex;
    align-items: center;
  }
}
.tableBox {
  padding: 0 10px 0px 10px;
  .pageComponent {
    margin: 180px 10px 0 0;
    text-align: right;
    height: 36px;
    background: #ffffff;
    border: 1px solid #d1d6e2;
  }
}

.setUser {
  margin-right: 10px;
  @include BtnFunction("success");
}
.bianjiUser {
  margin-right: 10px;
  @include BtnFunction("success");
}
.remove {
  @include BtnFunction("error");
}
.goOn {
  margin-right: 10px;
  @include BtnFunction("success");
}
.lodopFunClear {
  margin-right: 10px;
  @include BtnFunction("success");
}
</style>