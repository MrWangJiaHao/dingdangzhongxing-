<template>
  <div>
    <div class="manualBox">
      <div class="dispalywrap" style="margin: 20px">
        <div class="displayalign">
          <div class="titleBox">委托公司：</div>
          <div class="displayalign mr20">
            <el-select
              v-model="sendOutDataJson.paras.orgName"
              @focus="getAsyncFindWareOrg"
              @change="changeWareOrgName"
              placeholder="请选择委托公司"
            >
              <el-option
                v-for="(item, idx) in orgNameJson"
                :key="idx"
                :label="item.orgFullName"
                :value="idx"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="displayalign">
          <div class="titleBox">发货规则：</div>
          <div class="mr20">
            <el-select
              v-model="sendOutDataJson.paras.orgFullName"
              placeholder="请选择发货规则"
            >
              <el-option
                v-for="(item, idx) in ruleNameJson"
                :key="idx"
                :label="item"
                :value="idx"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div class="tr pd20">
        <div class="inline mb20 bianjiUser mr20" @click="getParasJson">
          查询
        </div>
        <div class="inline remove mb20" @click="clearChaxun">清空</div>
      </div>
      <div class="btnArr">
        <div style="background-color: #fff">
          <div class="meiyiyetitle">发货规则配置</div>
          <div class="btnClick">
            <div class="goOn" @click="CreateStockInOrder">创建</div>
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
              <el-table-column
                label="序号"
                type="index"
                show-overflow-tooltip
              />
              <el-table-column label="发货规则" show-overflow-tooltip>
                <span slot-scope="scoped">
                  <div class="lookDeatil" @click="goToDetailOut(scoped.row)">
                    {{ scoped.row.ruleName }}
                  </div>
                </span>
              </el-table-column>
              <el-table-column
                label="规矩使用者"
                prop="orgName"
                show-overflow-tooltip
              />
              <el-table-column
                label="创建人"
                prop="createUser"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="创建时间"
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
    <!-- 头部组件 -->

    <!-- 创建 && 编辑 start  -->
    <div v-show="isCreateWarehouse" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isCreateWarehouse">
          <div>
            <saveRecord
              :outWareType="sendOutDataJson.paras.outWareType"
              @closeBtns="closeBtns"
              :editSavaRecord="editSavaRecord"
              :lookerRecord="lookerRecord"
              :editAndLookdata="editAndLookdata"
            />
          </div>
        </div>
      </transition>
    </div>
    <!-- 创建 && 编辑 end  -->
  </div>
</template>

<script>
/*eslint-disable */

import pagecomponent from "../../components/commin/pageComponent"; //分页器
import WarehouseReceipt from "../../components/warehouse/warehouseStocklist"; //出库单
import saveRecord from "./saveRecord"; //创建 && 编辑
import {
  pWarehouseRuleFindRecordPage,
  getFindWareOrg,
  pWarehouseRuleDelRecord,
} from "../../api/api";
import { Message } from "element-ui";
import { _getExportExcels } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    WarehouseReceipt,
    saveRecord,
  },
  data() {
    return {
      lookerRecord: false, //查看
      editSavaRecord: false, // 编辑
      isCreateWarehouse: false, //创建
      isWarehouseSure: false, //出库确认
      isWarehouseSureDetails: false, //出库详情
      WarehouseReceipts: false,
      WarehouseReceiptIds: "",
      BatchNumberIds: "",
      editAndLookdata: {},
      tableData: [
        {
          orgName: "阿达",
          ruleName: "哦吼吼吼吼吼",
          createUser: "达瓦",
          createTime: "2020-11-12 10:05",
          id: 1,
        },
        {
          id: 2,
          orgName: "阿达",
          ruleName: "哦吼吼吼吼吼",
          createUser: "达瓦",
          createTime: "2020-11-12 10:05",
        },
      ],
      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10条
      },
      sendOutDataJson: {
        paras: {
          orgid: "", //委托公司
          orgName: "", //委托公司
          ruleName: "", //规则名称
          ruleid: "", //规则名称
        },
        pageNumber: 1, //当前页数
        pageSize: 10, //每页记录数
      },
      orgNameJson: [],
      ruleNameJson: [],
      multipleSelection: [], //选择了那个
      thisOneShow: true,
      listArrs: {},
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    clearChaxun() {
      this.sendOutDataJson = {
        pageNumber: 1, //当前页数
        pageSize: 10, //每页记录数
        paras: {
          orgid: "", //委托公司
          orgName: "", //委托公司
          ruleName: "", //规则名称
          ruleid: "", //规则名称
        },
      };
      this.getTableData();
    },
    changeWareOrgName(e) {
      this.sendOutDataJson.paras.orgId = this.orgNameJson[e].id;
    },
    async getAsyncFindWareOrg() {
      getFindWareOrg().then((res) => {
        if (res.code == "10000") {
          let { result } = res;
          this.orgNameJson = result;
        } else {
          Message(res.msg);
        }
      });
    },
    closeDetails(e) {
      this.isWarehouseSure = e;
    },
    closeBtns(e) {
      this.isCreateWarehouse = e;
    },
    //查看详情
    goToDetailOut(e) {
      sessionStorage.setItem("lookDetail", JSON.stringify(e));
      this.editAndLookdata = e;
      this.isCreateWarehouse = true;
      this.editSavaRecord = false;
      this.lookerRecord = true;
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
    //创建出库单
    CreateStockInOrder() {
      this.editAndLookdata = {};
      this.isCreateWarehouse = true;
      this.editSavaRecord = false;
      this.lookerRecord = false;
    },
    //编辑
    editBtn() {
      if (!this.multipleSelection.length)
        return Message("请选择要编辑的发货规则配置");
      if (this.multipleSelection.length != 1)
        return Message("只能选择一个发货规则配置");
      sessionStorage.setItem(
        "recordPageEdit",
        JSON.stringify(this.multipleSelection[0])
      );
      this.editAndLookdata = this.multipleSelection[0];
      this.isCreateWarehouse = true;
      this.editSavaRecord = true;
      this.lookerRecord = false;
    },
    //删除
    clearBtn() {
      if (!this.multipleSelection.length)
        return Message("请选择要删除的发货规则配置");
      this.$confirm("确定要删除该入库单号？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          pWarehouseRuleDelRecord({
            id: this.multipleSelection[0].id,
          })
            .then((res) => {
              if (res.code == "10000") {
                Message(res.msg);
                this.getTableData();
              } else {
                Message(res.msg);
              }
            })
            .catch((err) => console.log(err + "---出错了"));
        })
        .catch(() => err);
    },
    //表格发生了变化以及点击了查询按钮
    getParasJson(data) {
      this.sendOutDataJson.paras = { ...data };
      this.getTableData();
    },
    //获取table表格内容
    async getTableData(fn) {
      let datas = await pWarehouseRuleFindRecordPage(this.sendOutDataJson);
      if (datas.code == "10000") {
        this.changeDatas(datas.result);
      } else {
        Message(datas.msg);
      }
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
