<template>
  <div id="purchasingIndexss">
    <div class="manualBox">
      <div>
        <manualHeader @getParasJson="getParasJson" :tableData="tableData" />
      </div>
      <div class="btnArr">
        <div style="background-color: #fff">
          <div class="meiyiyetitle">采购管理</div>
          <div class="btnClick">
            <a class="lodopFunClear disinb" id="rukudanExcel" @click="ExportArr"
              >提交</a
            >
            <div class="goOn" @click="isCreatePurchasingFn">创建</div>
            <div class="lodopFunClear" @click="editBtn">编辑</div>
            <div class="remove" @click="clearBtn">删除</div>
          </div>
        </div>
        <!-- but按钮 -->
      </div>
      <div class="tableBox">
        <div style="background-color: #fff; padding: 20px 20px 0 20px">
          <div id="tableBox" class="center">
            <el-table
              ref="multipleTable"
              :data="tableData"
              :stripe="true"
              :border="true"
              tooltip-effect="dark"
              row-key="id"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="82"></el-table-column>
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-table
                    border
                    :data="detailsData"
                    tooltip-effect="dark"
                    style="width: 100%"
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
                </template>
              </el-table-column>

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
                label="采购单号"
                width="250"
                property="purcNo"
                show-overflow-tooltip
              >
                <div slot-scope="scope" @click="showCaigoudanDetail(scope.row)">
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
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="期望到货时间"
                width="119"
                prop="expectedArrivalTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="实际到货数量"
                prop="putStartTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="实际到货时间"
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
                width="119"
                prop="createTime"
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
<style>
.cell {
  text-align: center;
}
#purchasingIndexss #tableBox .el-icon.el-icon-arrow-right::before {
  content: "+";
}
#purchasingIndexss #tableBox .el-table__expand-icon--expanded {
  transform: rotate(0deg);
  transition: all 0.3s;
}
#purchasingIndexss
  #tableBox
  .el-table__expand-icon--expanded
  .el-icon.el-icon-arrow-right::before {
  content: "-";
}
</style>
<script>
/*eslint-disable */
import manualHeader from "../../components/purchasingZhujian/purchHeader"; //采购管理头部
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import WarehouseReceipt from "../../components/manual/WarehouseReceipt"; //入库单
import createPurchasing from "./createPurchasing"; //创建
import caigoudanDetail from "./caigoudanDetail"; //采购单详情
import {
  getppPurchaseOrderFindRecord,
  delRecordByIdArrs,
  getpPurchaseOrderFindRecordPageByOrgAndPurcNo,
  subpPurchaseOrderSubmitRecord,
} from "../../api/api";
import { Message } from "element-ui";
import { _getArrTarget } from "../../utils/validate";

export default {
  components: {
    manualHeader,
    pagecomponent,
    WarehouseReceipt,
    createPurchasing,
    caigoudanDetail,
  },
  watch: {
    isCreatePurchasing(n) {
      if (n) {
        this.getTableData();
      }
    },
  },
  data() {
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
      this.editDataJson = {};
      this.isCreatePurchasing = true;
    },
    getiscaigoudanDetail(e) {
      this.iscaigoudanDetail = e;
    },
    showCaigoudanDetail(data) {
      console.log(data, "点击了采购单详情");
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
    changeDetail(data, idx) {
      if (this.sureIdx != idx) this.iSLoad = true;
      if (!this.iSLoad) return;
      this.getDetailsArrFn(data);
      this.sureIdx = idx;
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
        this.detailsData = arr;
        return (this.iSLoad = false);
      }
    },
    //提交
    ExportArr() {
      if (!this.multipleSelection.length && this.multipleSelection.length != 1)
        return Message("请选择要提交的采购单，并且一次只能提交一个采购单");
      console.log(this.multipleSelection[0].disposeStatus);
    },
    //编辑
    editBtn() {
      if (!this.multipleSelection.length && this.multipleSelection.length != 1)
        return Message("请选择要编辑的采购单，并且一次只能编辑一个采购单");
      this.editDataJson = this.multipleSelection[0];
      this.isCreatePurchasing = true;
    },
    //删除
    clearBtn() {
      if (!this.multipleSelection.length)
        return Message("请选择要删除的采购单");
      _getArrTarget(this.multipleSelection, "id");
      delRecordByIdArrs({
        ids: _getArrTarget(this.multipleSelection, "id"),
      }).then((res) => {
        if (res.data.code == "10000") {
          this.getTableData();
          return Message("删除成功");
        } else {
          return Message(res.data.msgdfs);
        }
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
