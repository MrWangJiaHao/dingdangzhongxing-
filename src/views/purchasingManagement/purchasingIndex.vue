<template>
  <div id="purchasingIndex">
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
            <div class="goOn" @click="isCreatePurchasing = !isCreatePurchasing">
              创建
            </div>
            <div class="lodopFunClear" @click="editBtn">编辑</div>
            <div class="remove" @click="clearBtn">删除</div>
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
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <div
                    v-show="detailArr.length"
                    @click="changeDetail(scope.row)"
                  >
                    <el-table
                      ref="femlei"
                      :data="detailsData"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="detailArr"
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
                  </div>
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
                width="119"
                property="putWareNo"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                width="119"
                label="采购状态"
                prop="orderNo"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="采购类型"
                prop="expectedSendTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="申请采购数量"
                width="119"
                prop="putstatus"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="期望到货时间"
                width="119"
                prop="putUser"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="实际到货数量"
                prop="putStartTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="实际到货时间"
                prop="putEndTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="创建人"
                width="119"
                prop="batchNo"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="创建日期"
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
    <!-- 创建 && 编辑 start -->
    <div v-show="isCreatePurchasing" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-show="isCreatePurchasing">
          <createPurchasing />
        </div>
      </transition>
    </div>
    <!-- 创建 && 编辑 end -->
  </div>
</template>
<style>
.cell {
  text-align: center;
}
#purchasingIndex .el-icon.el-icon-arrow-right::before {
  content: "+";
}
#purchasingIndex .el-table__expand-icon--expanded {
  transform: rotate(0deg);
  transition: all 0.3s;
}
#purchasingIndex
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
import {
  getppPurchaseOrderFindRecord,
  delRecordByIdArrs,
  getpPurchaseOrderFindRecordPageByOrgAndPurcNo,
} from "../../api/api";
import { Message } from "element-ui";
import { _getArrTarget } from "../../utils/validate";

export default {
  components: {
    manualHeader,
    pagecomponent,
    WarehouseReceipt,
    createPurchasing,
  },
  watch: {
    isCreatePurchasing(n) {
      console.log(n, "创建弹框");
      if (n) {
        this.getTableData();
      }
    },
  },
  data() {
    return {
      isCreatePurchasing: false, //显示创建弹框
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
      detailArr: [], //点击的那个详情
      multipleSelection: [], //点击了那个
      thisOneShow: true,
      listArrs: {},
      WarehousingTypeArr: [],
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
  computed: {
    //审核状态
    dindanzhuantai(data) {
      switch (data) {
        case "0":
          return "待审核";
          break;
        case "1":
          return "审核通过";
          break;

        case "2":
          return "拒绝";
          break;

        case "3":
          return "待到货确认";
          break;

        case "4":
          return "已完成";
          break;
      }
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
    changeDetail(data) {
      console.log(data, "发送ajax获取详情");
    },
    //提交
    ExportArr() {
      if (!this.multipleSelection.length)
        return Message("请选择要提交的采购单");
      if (this.multipleSelection.length != 1)
        return Message("一次只能选择一个采购单");
    },
    //编辑
    editBtn() {
      if (!this.multipleSelection.length)
        return Message("请选择要编辑的采购单");
      if (this.multipleSelection.length != 1)
        return Message("一次只能编辑一个采购单");
      sessionStorage.setItem(
        "manualManageMentEdit",
        JSON.stringify(this.multipleSelection[0])
      );
      this.$router.push({
        path: "/warehousingManagement/createManagement",
        query: {
          orderSource: this.sendOutDataJson.paras.orderSource,
          id: this.multipleSelection[0].id,
        },
      });
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
