<template>
  <div>
    <div class="manualBox">
      <div>
        <manualHeader @getParasJson="getParasJson" :tableData="tableData" />
      </div>
      <div class="btnArr">
        <div class="backFF">
          <div class="meiyiyetitle">入库管理</div>
          <div class="btnClick">
            <div class="setUser" @click="warehousingConfirmation">出库确认</div>
            <div class="bianjiUser" @click="printstockinlist">打印出库单</div>
            <a
              class="daochuMes disinb"
              :href="
                baseUrl + '/wbs-warehouse-manage/v1/pOutWarehouse/exprotExcel'
              "
              >导出</a
            >
            <span v-if="$route.params.type == 0" class="mr10"></span>
            <div
              class="goOn"
              v-if="$route.params.type == 0"
              @click="CreateStockInOrder"
            >
              创建
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
        <div class="tableBoxCol">
          <div class="center tableInInput">
            <el-table
              ref="multipleTable"
              :data="tableData"
              :stripe="true"
              :border="true"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                align="center"
                width="82"
                fixed="left"
              >
              </el-table-column>
              <el-table-column
                label="序号"
                align="center"
                type="index"
                width="71"
                show-overflow-tooltip
              />
              <el-table-column
                label="委托公司"
                width="250"
                prop="orgName"
                show-overflow-tooltip
              />
              <el-table-column
                label="出库单号"
                width="250"
                show-overflow-tooltip
              >
                <span slot-scope="scoped">
                  <div @click="goToDetailOut(scoped.row)" class="lookDeatil">
                    {{ scoped.row.outWareNo }}
                  </div>
                </span>
              </el-table-column>
              <el-table-column
                width="119"
                label="关联单号"
                prop="orderNo"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                width="119"
                label="出库状态"
                prop="outWareStatus"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                width="119"
                label="物流公司"
                prop="exprName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                width="119"
                label="物流单号"
                prop="exprNo"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                width="150"
                label="出库人"
                prop="outWareUser"
              ></el-table-column>
              <el-table-column
                label="出库时间"
                width="160"
                prop="outWareTime"
              ></el-table-column>
              <el-table-column
                label="拣货人"
                width="119"
                prop="pickUser"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="拣货完成时间"
                prop="pickTime"
                width="200"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="复核人"
                width="119"
                prop="checkUser"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="复核完成时间"
                width="119"
                prop="checkTime"
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
    <div v-show="WarehouseReceipts" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="WarehouseReceipts">
          <WarehouseReceipt
            :WarehousingType="
              WarehousingTypeArr[$route.params.type].title
                ? WarehousingTypeArr[$route.params.type].title
                : '手工创建出库'
            "
          />
        </div>
      </transition>
    </div>
    <!-- 出库单 -->
    <!-- 创建 && 编辑 start  -->
    <div v-show="isCreateWarehouse" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isCreateWarehouse">
          <div>
            <createWarehouse
              :outWareType="sendOutDataJson.paras.outWareType"
              @closeBtns="closeBtns"
              :editCreateWarehouse="editCreateWarehouse"
            />
          </div>
        </div>
      </transition>
    </div>
    <!-- 创建 && 编辑 end  -->
    <!-- 出库确认 && 出库详情 start  -->
    <div v-show="isWarehouseSure" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isWarehouseSure">
          <div>
            <warehouseSure
              :isWarehouseSureDetails="isWarehouseSureDetails"
              @closeDetails="closeDetails"
            />
          </div>
        </div>
      </transition>
    </div>
    <!-- 出库确认 && 出库详情 end  -->
  </div>
</template>

<script>
/*eslint-disable */
import manualHeader from "../../components/manual/manualHeader";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import WarehouseReceipt from "../../components/warehouse/warehouseStocklist"; //出库单
import createWarehouse from "./createWarehouse"; //创建 && 编辑
import warehouseSure from "./warehouseSure"; //出库确认 && 出库详情
import {
  getpOutWarehousefindOutWareDetailById,
  getPOutWarehouse,
  getpOutWarehouseDelRecord,
} from "../../api/api";

export default {
  components: {
    manualHeader,
    pagecomponent,
    WarehouseReceipt,
    createWarehouse,
    warehouseSure,
  },
  data() {
    return {
      editCreateWarehouse: false, // 编辑
      isCreateWarehouse: false, //创建
      isWarehouseSure: false, //出库确认
      isWarehouseSureDetails: false, //出库详情
      WarehouseReceipts: false,
      WarehouseReceiptIds: "",
      Receipt: false,
      ReceiptIds: "",
      BatchNumber: false,
      BatchNumberIds: "",
      tableData: [],
      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10条
      },
      baseUrl: sessionStorage.getItem("baseUrl"),
      sendOutDataJson: {
        paras: {
          orgName: "",
          orgId: "",
          orderNo: "",
          outWareType: (() => this.$route.params.type)(),
          prodId: "",
          specId: "",
          childWareId: "",
          childWareName: "",
          specName: "",
          outWareTimeStart: "",
          pickTimeStart: "",
          checkTimeStart: "",
          outWareTimeEnd: "",
          pickTimeEnd: "",
          checkTimeEnd: "",
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
          title: "手工创建出库",
          name: "/warehouseManagement/warehouseIndex/0",
        },
        {
          title: "调拨出库",
          name: "/warehouseManagement/warehouseIndex/3",
        },
        {
          title: "加工出库",
          name: "/warehouseManagement/warehouseIndex/4",
        },
        {
          title: "拆解出库",
          name: "/warehouseManagement/warehouseIndex/5",
        },
        {
          title: "自提出库",
          name: "/warehouseManagement/warehouseIndex/2",
        },
        {
          title: "销售出库",
          name: "/warehouseManagement/warehouseIndex/1",
        },
        {
          title: "报损出库",
          name: "/warehouseManagement/warehouseIndex/6",
        },
        {
          title: "盘亏出库",
          name: "/warehouseManagement/warehouseIndex/7",
        },
        {
          title: "其他出库",
          name: "/warehouseManagement/warehouseIndex/8",
        },
      ],
    };
  },
  created() {
    if (this.thisOneShow) {
      let type = this.$route.params.type;
      this.sendOutDataJson.paras.outWareType = type;
      this.thisOneShow = false;
    }
    this.noraisingFn();
    this.getTableData();
  },
  watch: {
    $route(to, from) {
      this.sendOutDataJson.paras.outWareType = to.params.type
        ? to.params.type
        : from.params.type;
      this.tableData = [];
      this.getTableData();
      this.noraisingFn();
    },
  },
  methods: {
    closeDetails(e) {
      this.isWarehouseSure = e;
    },
    closeBtns(e) {
      this.isCreateWarehouse = e;
    },
    noraisingFn() {
      if (this.$route.params.type == "0") {
        return (this.noraising = true);
      } else {
        return (this.noraising = false);
      }
    },
    goToDetailOut(e) {
      sessionStorage.setItem("warehouseDetails", JSON.stringify(e));
      this.isWarehouseSure = true;
      this.isWarehouseSureDetails = true;
    },
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
    //出库确认
    warehousingConfirmation() {
      if (!this.multipleSelection.length) {
        return this.$messageSelf.message("请选择出库确认的单号");
      } else if (this.multipleSelection.length > 1) {
        return this.$messageSelf.message("只能选择一个出库单号");
      } else {
        this._getpOutWarehousefindOutWareDetailById(
          this.multipleSelection[0].id
        ).then((res) => {
          if (res.code == "10000") {
            sessionStorage.setItem(
              "sarehouseChuKuSure",
              JSON.stringify(res.result)
            );
            this.isWarehouseSure = true;
            this.isWarehouseSureDetails = false;
          } else {
            this.$messageSelf.message("获取出库确认失败，请与管理员联系");
          }
        });
      }
    },
    //打印出库单:
    printstockinlist() {
      if (!this.multipleSelection.length) {
        return this.$messageSelf.message("请选择要打印的出库单");
      } else if (this.multipleSelection.length > 1) {
        return this.$messageSelf.message("只能选择打印一个出库单");
      } else {
        this.WarehouseReceiptIds = this.multipleSelection[0].id;
        this._getpOutWarehousefindOutWareDetailById(
          this.multipleSelection[0].id,
          (datas) => {
            if (datas.code == "10000") {
              sessionStorage.setItem("listArrs", JSON.stringify(datas.result));
              this.WarehouseReceipts = !this.WarehouseReceipts;
            } else {
              this.$messageSelf.message(datas.msg);
            }
          }
        );
      }
    },
    async _getpOutWarehousefindOutWareDetailById(ids, fn) {
      let datas = await getpOutWarehousefindOutWareDetailById(ids);
      this.listArrs = datas.result[0];
      sessionStorage.setItem("listArrs", JSON.stringify(datas.result[0]));
      fn && fn(datas);
      return datas;
    },
    //创建出库单
    CreateStockInOrder() {
      this.isCreateWarehouse = true;
      this.editCreateWarehouse = false;
    },
    //编辑
    editBtn() {
      if (!this.multipleSelection.length || this.multipleSelection.length != 1)
        return this.$messageSelf.message(
          "请选择要编辑的出库单，只能选择一个编辑出库单"
        );
      sessionStorage.setItem(
        "warehouseEdit",
        JSON.stringify(this.multipleSelection[0])
      );
      this.isCreateWarehouse = true;
      this.editCreateWarehouse = true;
    },
    //删除
    clearBtn() {
      if (!this.multipleSelection.length || this.multipleSelection.length != 1)
        return this.$messageSelf.message(
          "请选择要删除的出库单，只能选择一个删除出库单"
        );
      // getpOutWarehouseDelRecord
      this.$messageSelf
        .confirms("确定要删除该出库单号？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          getpOutWarehouseDelRecord({ id: this.multipleSelection[0].id }).then(
            (res) => {
              if (res.data.code == "10000") {
                this.$messageSelf.message(res.data.msg);
                this.getTableData();
              } else {
                this.$messageSelf.message(res.data.msg);
              }
            }
          );
        })
        .catch(() => {
          this.$messageSelf.message("已经取消删除");
        });
    },
    //表格发生了变化以及点击了查询按钮
    getParasJson(data) {
      this.sendOutDataJson.paras = { ...data };
      this.getTableData();
    },
    //获取table表格内容
    async getTableData(fn) {
      let datas = await getPOutWarehouse(this.sendOutDataJson);
      if (datas.code == "10000") {
        this.tableData = [];
        this.changeDatas(datas.result);
      } else {
        this.$messageSelf.message(datas.msg);
      }
      fn && fn();
      return datas;
    },
    changeDatas(datas) {
      if (datas.list) {
        datas.list.forEach((item) => {
          item.outWareStatus = item.outWareStatus ? "已出库" : "未出库";
        });
      }
      this.tableData = datas.list;
      this.pageComponentsData.pageNums = datas.totalRow;
      this.$forceUpdate();
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
    // margin: 180px 10px 0 0;
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

.daochuMes {
  @include BtnFunction("success");
}
</style>
