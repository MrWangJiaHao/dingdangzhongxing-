<template>
  <div id="fahuoguanli">
    <div class="manualBox">
      <div>
        <goodsShiftingHeader
          @jobTaskHeader="jobTaskHeader"
          @jobTaskClearBtn="jobTaskClearBtn"
        />
      </div>

      <div class="btnArr">
        <div style="background-color: #fff">
          <div class="meiyiyetitle">补货作业</div>
          <div class="btnClick">
            <div class="setUser">待补货产品</div>
            <div class="setUser">补货确认</div>
            <div class="setUser" @click="isReplenishmentNoteClick">
              打印补货单
            </div>
            <div class="setUser" @click="isOrderNote = true">创建</div>
            <div class="setUser">编辑</div>
            <div class="remove">删除</div>
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
                type="orgName"
                show-overflow-tooltip
              />
              <el-table-column
                label="补货单号"
                prop="replenishOrderNo"
                show-overflow-tooltip
              >
                <span slot-scope="scoped">
                  <div @click="goToDetailOut(scoped.row)" class="lookDeatil">
                    {{ scoped.row.replenishOrderNo }}
                  </div>
                </span>
              </el-table-column>
              <el-table-column
                label="补货状态"
                type="disposeStatus"
                show-overflow-tooltip
              >
                <div slot-scope="scoped">
                  {{
                    scoped.row.disposeStatus == 1
                      ? "待补货"
                      : scoped.row.disposeStatus == 2
                      ? "补货中"
                      : scoped.row.disposeStatus == 3
                      ? "已补货"
                      : "未定义"
                  }}
                </div>
              </el-table-column>
              <el-table-column
                label="补货类型"
                prop="orderSource"
                show-overflow-tooltip
              >
                <div slot-scope="scoped">
                  {{
                    scoped.row.orderSource == 1
                      ? "手工创建"
                      : scoped.row.orderSource == 2
                      ? "缺货"
                      : "未定义"
                  }}
                </div>
              </el-table-column>
              <el-table-column
                label="创建人"
                prop="createUser"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="创建时间"
                prop="createTime"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="补货人"
                prop="replenishUser"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="补货开始时间"
                prop="replenishStartTime"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="补货完成时间"
                prop="replenishEndTime"
                show-overflow-tooltip
              >
              </el-table-column>
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
    <!-- 补货单 start -->
    <div v-show="isReplenishmentNote" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isReplenishmentNote">
          <div>
            <delivetyNote
              :tabledatasArr="tabledatasArr"
              :ReplenishmentNote="replenishmentNoteJson"
              @getiswuliudanOne="getiswuliudanOne"
            />
          </div>
        </div>
      </transition>
    </div>
    <!-- 补货单 end -->
    <!-- 创建补货单 start -->
    <div v-show="isOrderNote" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isOrderNote">
          <div>
            <createOrderReplen @closeFn="isOrderNoteFun" />
          </div>
        </div>
      </transition>
    </div>
    <!-- 创建补货单 end -->
  </div>
</template>

<script>
/*eslint-disable */
import goodsShiftingHeader from "../../components/goodsShiftingCommin/goodsShiftingHeader";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import delivetyNote from "../../components/commin/componentList"; //补货单
import createOrderReplen from "../../components/goodsShiftingCommin/createOrderReplen"; //创建补货单

import { getCookie, _getArrTarget } from "../../utils/validate";
export default {
  components: {
    goodsShiftingHeader,
    delivetyNote,
    createOrderReplen,
    pagecomponent,
  },
  data() {
    return {
      isReplenishmentNote: false, //补货单
      isOrderNote: false, //创建补货单
      tableData: [],
      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10
      },
      replenishmentNoteJson: {
        title: "",
        replenishOrderNo: "",
        queryArr: [],
        basicJson: [
          {
            titles: "基础信息",
            basicJsonArr: [
              {
                types: "prodCode",
                centerStr: "产品编码",
              },
              {
                types: "prodName",
                centerStr: "产品名称",
              },
              {
                types: "specName",
                centerStr: "产品规格",
              },
              {
                types: "prodNum",
                centerStr: "申请补货数量",
              },
              {
                types: "prodNum",
                centerStr: "实际补货数量",
              },
              { types: "seatNo", centerStr: "存储区库位" },
              { types: "seatNo", centerStr: "补货库位" },
            ],
          },
        ],
      },
      tabledatasArr: [{ seatNo: "sadsa", prodNum: 1 }], //data
      sendOutDataJson: {
        paras: {
          wareId: getCookie("X-Auth-wareId"),
        },
        pageNumber: 1, //当前页数
        pageSize: 10, //每页记录数
      },
      pickOrderNo: "",
      multipleSelection: [], //选择了那个
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    isOrderNoteFun() {
      console.log(1);
      this.isOrderNote = false;
    },
    isReplenishmentNoteClick() {
      if (!this.multipleSelection.length || this.multipleSelection.length != -1)
        return this.$messageSelf.message(
          "请选择要打印的补货单,以及补货单只能打印一张"
        );
      let json = [
        {
          queryTitle: "委托公司",
          queryCenter: ` this.multipleSelection[0].orgName
            ? this.multipleSelection[0].orgName
            : ""`,
        },
        {
          queryTitle: "补货单号",
          queryCenter: `this.multipleSelection[0].replenishOrderNo
            ? this.multipleSelection[0].replenishOrderNo
            : ""`,
        },
        {
          queryTitle: "补货人（签字）",
          queryCenter: "",
          queryLine: true, //是否有横线
        },
        {
          queryTitle: "补货时间",
          queryCenter: "",
          queryLine: true,
        },
      ];
      this.replenishmentNoteJson.queryArr = json;
      this.isReplenishmentNote = true;
    },
    jobTaskHeader(e) {
      this.sendOutDataJson.paras = e;
      this.getTableData();
    },
    jobTaskClearBtn(e) {
      if (e) {
        this.getTableData();
      }
    },
    getiswuliudanOne(e) {
      this.isReplenishmentNote = e;
    },
    goToDetailOut(e) {
      sessionStorage.setItem("warehouseDetails", JSON.stringify(e));
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
    //表格发生了变化以及点击了查询按钮
    getParasJson(data) {
      this.sendOutDataJson.paras = { ...data };
      this.getTableData();
    },
    //获取table表格内容
    async getTableData(fn) {
      let datas = await this.$pOrgProductsApp.pReplenishOrderfindRecordPage(
        this.sendOutDataJson
      );
      if (datas.code == "10000") {
        this._changeDatas(datas.result);
      } else {
        this.$messageSelf.message(datas.msg);
      }
      fn && fn(datas);
      return datas;
    },
    _changeDatas(datas) {
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
