<template>
  <div id="purchasingIndexss">
    <div class="manualBox">
      <div>
        <manualHeader @getParasJson="getParasJson" :tableData="tableData" />
      </div>
      <div class="btnArr">
        <div class="backFF">
          <div class="meiyiyetitle">采购管理</div>
          <div class="btnClick">
            <a class="lodopFunClear disinb" @click="ExportArr">提交</a>
            <div class="goOn" @click="isCreatePurchasingFn">创建</div>
            <div class="lodopFunClear" @click="editBtn">编辑</div>
            <div class="remove" @click="clearBtn">删除</div>
          </div>
        </div>
        <!-- but按钮 -->
      </div>
      <div class="tableBox">
        <div class="tableBoxCol">
          <div id="tableBox" class="center">
            <tableCommin
              @tableSelectArr="handleSelectionChange"
              :tableDataJson="waimiandeData"
              @clickEvents="changeDetail"
            >
              <template>
                <tableCommin :tableDataJson="otherJson"> </tableCommin>
              </template>
            </tableCommin>
            <!-- <el-table
              ref="multipleTable"
              :data="tableData"
              :stripe="true"
              tooltip-effect="dark"
              row-key="id"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                align="center"
                width="82"
                fixed="left"
              ></el-table-column>
              <el-table-column label="展开" width="71" type="expand">
                <template slot-scope="scope">
                  <div id="tableCenters">
                    <el-table
                      border
                      :data="detailsData"
                      tooltip-effect="dark"
                      :load="changeDetail(scope.row, scope.$index)"
                      default-expand-all
                      :tree-props="{
                        children: 'children',
                        hasChildren: 'hasChildren',
                      }"
                    >
                      <el-table-column
                        type="index"
                        label="序号"
                        width="71"
                        align="center"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="产品编码"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="产品名称"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="品牌"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="产品规格"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="销售仓可用库存"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="低库存预警值"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="高库存预警值"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="申请采购数量"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                    </el-table>
                  </div>
                </template>
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
                width="119"
                prop="orgName"
                show-overflow-tooltip
              />
              <el-table-column
                label="采购单号"
                width="250"
                property="purcNo"
                show-overflow-tooltip
              >
                <div
                  slot-scope="scope"
                  class="lookDeatil"
                  @click="showCaigoudanDetail(scope.row)"
                >
                  {{ scope.row.purcNo }}
                </div>
              </el-table-column>
              <el-table-column
                width="119"
                label="采购状态"
                prop=""
                show-overflow-tooltip
              >
                <div slot-scope="scope">
                  {{ dindanzhuantai(scope.row.disposeStatus) }}
                </div>
              </el-table-column>
              <el-table-column
                label="采购类型"
                prop="orderSource"
                show-overflow-tooltip
              >
                <div slot-scope="scope">
                  {{ caigouleixing(scope.row.orderSource) }}
                </div>
              </el-table-column>
              <el-table-column
                label="申请采购数量"
                width="119"
                prop="putstatus"
                align="center"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="期望到货时间"
                width="250"
                prop="expectedArrivalTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="实际到货数量"
                width="250"
                prop="putStartTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="实际到货时间"
                width="250"
                prop="arrivalTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="创建人"
                width="119"
                prop="createUser"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="创建日期"
                width="250"
                prop="createTime"
                show-overflow-tooltip
              ></el-table-column>
            </el-table> -->
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
    <!-- 创建 && 编辑 start -->
    <div v-if="isCreatePurchasing" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isCreatePurchasing">
          <createPurchasing :editDataJson="editDataJson" />
        </div>
      </transition>
    </div>
    <!-- 创建 && 编辑 end -->

    <!-- 采购单详情页 start -->
    <div v-show="iscaigoudanDetail" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="iscaigoudanDetail">
          <caigoudanDetail
            @getiscaigoudanDetail="getiscaigoudanDetail"
            :caigoudanDetailJson="caigoudanDetailJson"
          />
        </div>
      </transition>
    </div>
    <!--  采购单详情页 end -->
  </div>
</template>

<script>
/*eslint-disable */
import manualHeader from "../../components/purchasingZhujian/purchHeader"; //采购管理头部
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import WarehouseReceipt from "../../components/manual/WarehouseReceipt"; //入库单
import createPurchasing from "./createPurchasing"; //创建
import caigoudanDetail from "./caigoudanDetail"; //采购单详情
import tableCommin from "../../components/commin/tableCommin";
import {
  getppPurchaseOrderFindRecord,
  pPurchaseOrderDeleteBatch,
  getpPurchaseOrderFindRecordPageByOrgAndPurcNo,
  pPurchaseOrderSubmitRecord,
  subpPurchaseOrderSubmitRecord,
} from "../../api/api";
import { getCookie, _getArrTarget } from "../../utils/validate";

export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/indentManagement/stockoutIndentManage") {
      next((vm) => {
        if (vm.$route.query.fromPage === "stockoutIndentManage") {
          let allProduct = vm.$route.query.product;
          sessionStorage.setItem("allProduct", JSON.stringify(allProduct));
          sessionStorage.setItem("fromPage", vm.$route.query.fromPage);
          vm.isCreatePurchasing = true;
        }
      });
    } else if (from.name === "/inventoryMangement/productInventory") {
      next((vm) => {
        if (vm.$route.query.fromPage === "productInventory") {
          console.log("库存管理-产品库存页面跳转过来的");
        }
      });
    } else {
      next();
    }
  },
  components: {
    manualHeader,
    pagecomponent,
    WarehouseReceipt,
    createPurchasing,
    caigoudanDetail,
    tableCommin,
  },
  watch: {
    isCreatePurchasing(n) {
      if (n) {
        this.getTableData();
      }
    },
  },
  data() {
    let self = this;
    return {
      isCreatePurchasing: false, //显示创建弹框
      iscaigoudanDetail: false, // 显示采购详情
      WarehouseReceiptIds: "",
      ReceiptIds: "",
      BatchNumberIds: "",
      tableData: [],
      detailsData: [],
      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10条
      },
      sendOutDataJson: {
        paras: {
          purcNo: "", //采购单号
          orgId: "", //委托公司
          wareId: "", //仓库
          disposeStatus: "", //采购状态(0-待审核 1-审核通过 2-拒绝 3-待到货确认；4-已完成)
          prodCode: "", //产品编码
          specName: "", //产品名称
          prodId: "", //产品id
          searchStartTime: "", //期望到货时间
          searchEndTime: "", //期望结束时间
          expectedSendStartTime: "", //实际到货时间
          expectedSendEndTime: "", //实际到货结束时间
        },
        pageNumber: 1, //当前页数
        pageSize: 10, //每页记录数
      },
      waimiandeData: {
        typeData: [
          {
            types: "selection",
          },
          {
            label: "展开",
            width: 82,
            fixed: "left",
            types: "expand",
          },
          {
            label: "序号",
            width: 71,
            types: "index",
          },
          {
            label: "委托公司",
            width: 119,
            types: "orgName",
          },
          {
            label: "采购单号",
            width: 250,
            types: "purcNo",
            flag: "puton",
            OnClicks: (data) => {
              self.showCaigoudanDetail(data);
            },
          },
          {
            label: "采购状态",
            width: 119,
            types: "disposeStatusDats",
          },
          {
            label: "采购类型",
            width: 119,
            types: "orderSourceData",
          },
          {
            label: "申请采购数量",
            width: 119,
            types: "putstatus",
            align: "center",
          },
          {
            label: "期望到货时间",
            width: 250,
            types: "expectedArrivalTime",
          },
          {
            label: "实际到货数量",
            width: 250,
            types: "putStartTime",
          },
          {
            label: "实际到货时间",
            width: 250,
            types: "arrivalTime",
          },
          {
            label: "创建人",
            width: 119,
            types: "createUser",
          },
          {
            label: "创建日期",
            width: 119,
            types: "createTime",
          },
        ],
        tabledata: [],
      },
      otherJson: {
        typeData: [
          {
            types: "selection",
          },
          {
            label: "序号",
            width: 82,
            types: "index",
          },
          {
            label: "产品编码",
            types: "prodCode",
          },
          {
            label: "品牌",
            types: "braName",
          },
          {
            label: "产品规格",
            types: "specName",
          },
          {
            label: "销售仓可用库存",
            types: "outOfProdNum",
          },
          {
            label: "低库存预警值",
            types: "inventoryFloor",
          },
          {
            label: "高库存预警值",
            types: "inventoryUpper",
          },
          {
            label: "申请采购数量",
            types: "invalidStatus",
          },
        ],
        tabledata: [],
      },
      iSLoad: true,
      multipleSelection: [], //点击了那个
      thisOneShow: true,
      sureIdx: null,
      detailsDataJson: {},
      editDataJson: {},
      caigoudanDetailJson: {},
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    isCreatePurchasingFn() {
      if (!getCookie("X-Auth-wareId"))
        return this.$messageSelf.message("该登入员没有创建权限");
      this.editDataJson = {};
      this.isCreatePurchasing = true;
    },
    getiscaigoudanDetail(e) {
      console.log(e);
      this.iscaigoudanDetail = e;
    },
    showCaigoudanDetail(data) {
      this.caigoudanDetailJson = data;
      this.iscaigoudanDetail = true;
    },
    dindanzhuantai(data) {
      switch (data) {
        case 0:
          return "待审核";
          break;
        case 1:
          return "审核通过";
          break;

        case 2:
          return "拒绝";
          break;

        case 3:
          return "待到货确认";
          break;

        case 4:
          return "已完成";
          break;
      }
    },
    caigouleixing(data) {
      switch (data) {
        case 0:
          return "手工采购";
          break;
        case 1:
          return "-渠道采购";
          break;
        case 2:
          return "缺货采购";
          break;
      }
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
    changeDetail(data) {
      //   console.log(data);
      this.getDetailsArrFn(data);
    },
    async getDetailsArrFn(data) {
      let detailData = {
        purcNo: data.purcNo,
        orgId: data.orgId,
        wareId: data.wareId,
      };
      let arr = await getppPurchaseOrderFindRecord(detailData);

      if (arr.code == "10000") {
        arr = arr.result;
        this.otherJson.tabledata = arr;
      }
    },
    //提交
    ExportArr() {
      if (!this.multipleSelection.length && this.multipleSelection.length != 1)
        return this.$messageSelf.message({
          type: "warning",
          message: "请选择要提交的采购单，并且一次只能提交一个采购单",
        });
      subpPurchaseOrderSubmitRecord({
        id: this.multipleSelection[0].id,
        disposeStatus: this.multipleSelection[0].disposeStatus,
      }).then((res) => {
        if (res.code == "10000") {
          this.$messageSelf.message(res.msg);
          this.getTableData();
        } else {
          this.$messageSelf.message(res.msg);
        }
      });
    },
    //编辑
    editBtn() {
      if (!this.multipleSelection.length || this.multipleSelection.length != 1)
        return this.$messageSelf.message({
          type: "warning",
          message: "请选择要编辑的采购单，并且一次只能编辑一个采购单",
        });
      this.editDataJson = this.multipleSelection[0];
      this.isCreatePurchasing = true;
    },
    //删除
    clearBtn() {
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          type: "warning",
          message: "请选择要删除的采购单",
        });
      this.$messageSelf
        .confirms(this.$clearArr(this.multipleSelection), "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          pPurchaseOrderDeleteBatch(
            _getArrTarget(this.multipleSelection, "purcNo"),
            (res) => {
              res = JSON.parse(res);
              if (res.code == "10000") {
                this.$messageSelf.message("删除成功");
                this.getTableData();
              } else {
                return this.$messageSelf.message(res.msg);
              }
            }
          );
        })
        .catch(() => {
          this.$messageSelf.message("已取消删除");
        });
    },
    //表格发生了变化以及点击了查询按钮
    getParasJson(data) {
      this.sendOutDataJson.paras = { ...data };
      this.getTableData();
    },
    //获取table表格内容
    async getTableData(fn) {
      let datas = await getpPurchaseOrderFindRecordPageByOrgAndPurcNo(
        this.sendOutDataJson
      );
      this.changeDatas(datas.result);
      fn && fn();
      return datas;
    },
    changeDatas(datas) {
      this.tableData = datas.list;
      datas.list.forEach((item) => {
        item.disposeStatusDats = this.dindanzhuantai(item.disposeStatus);
        item.orderSourceData = this.caigouleixing(item.orderSource);
      });
      this.waimiandeData.tabledata = datas.list;
      this.pageComponentsData.pageNums = datas.totalRow;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";

.createPurchasing {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
}

.posFixCenter {
  display: flex;
  align-self: center;
  justify-content: center;
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

.bianjiUser {
  @include BtnFunction("success");
}

.el-table__expand-icon--expanded {
  transform: rotate(180deg);
}

.el-table__expand-icon .el-icon.el-icon-arrow-right::before {
  content: "+";
  color: #000;
  font-size: 16px;
  font-weight: bold;
}

.el-table__expand-icon.el-table__expand-icon--expanded
  .el-icon.el-icon-arrow-right::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 2px;
  background: #000;
  line-height: 20px;
  position: absolute;
  top: 10px;
  left: 27px;
}

.remove {
  @include BtnFunction("error");
}

#tableCenters .el-table {
  border: none !important;
}

#purchasingIndexss .el-table__expanded-cell {
  border-right: none !important;
}
</style>
