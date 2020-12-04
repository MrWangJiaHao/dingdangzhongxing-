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
          <div class="meiyiyetitle">库内移动</div>
          <div class="btnClick">
            <div class="setUser" @click="shenchengbuhuodan">移库确认</div>
            <div class="setUser" @click="isReplenishmentNote = true">
              打印移库单
            </div>
            <div class="setUser" @click="createOrderNoteFun">创建</div>
            <div class="setUser" @click="editOrderNote">编辑</div>
            <div class="remove" @click="removeIsOrderNode">删除</div>
          </div>
        </div>
        <!-- but按钮 -->
      </div>
      <div class="tableBox">
        <div style="background-color: #fff; padding: 20px 20px 20px 20px">
          <tableCommin :tableDataJson="tableDataJson" />
          <!-- 待补货产品 -->
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
    <!-- 创建移库单 & 编辑 start -->
    <div v-show="isOrderNote" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isOrderNote">
          <div>
            <createOrderReplen
              @closeFn="isOrderNoteFun"
              :editDataJson="editDataJson"
            />
          </div>
        </div>
      </transition>
    </div>
    <!-- 创建移库单 & 编辑 end -->
    <!-- 补货确认 start -->
    <div v-show="isBuHuoSures" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isBuHuoSures">
          <div>
            <createOrderSure
              @closeBtnSure="closeBtnSure"
              :BuHuoSureJson="BuHuoSureJson"
              :tabledatasArr="tabledatasArr"
              :isLooker="isLooker"
            />
          </div>
        </div>
      </transition>
    </div>
    <!-- 补货确认 end -->
  </div>
</template>

<script>
/*eslint-disable */
import goodsShiftingHeader from "../../components/goodsShiftingCommin/moveInLibrayHeader.vue";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import delivetyNote from "../../components/commin/componentList"; //补货单
import createOrderReplen from "../../components/goodsShiftingCommin/createOrderReplen"; //创建补货单
import createOrderSure from "../../components/goodsShiftingCommin/createOrderSure"; //创建补货单
import { getCookie, _getArrTarget } from "../../utils/validate";
import tableCommin from "../../components/commin/tableCommin";
export default {
  components: {
    goodsShiftingHeader,
    delivetyNote,
    createOrderReplen,
    pagecomponent,
    tableCommin,
    createOrderSure,
  },
  data() {
    return {
      isLooker: false, //点击查看
      isBuHuoSures: false, // 补货确认
      daibuhuochanping: false, //点击了待补货产品
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
            titles: "产品明细",
            basicJsonArr: [
              {
                types: "prodCode",
                centerStr: "委托公司",
              },
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
                centerStr: "申请移库数量",
              },
              {
                types: "prodNum",
                centerStr: "当前库位",
              },
              {
                types: "prodNum",
                centerStr: "实际移库数量",
              },
              {
                types: "prodNum",
                centerStr: "移入库位",
              },
            ],
          },
        ],
      },
      tabledatasArr: [], //data
      sendOutDataJson: {
        paras: {
          wareId: getCookie("X-Auth-wareId"),
        },
        pageNumber: 1, //当前页数
        pageSize: 10, //每页记录数
      },
      pickOrderNo: "",
      multipleSelection: [], //选择了那个
      tableDataJson: {
        tabledata: [],
        typeData: [
          {
            types: "selection",
          },
          {
            types: "index",
            label: "序号",
            width: 71,
          },
          {
            types: "orgName",
            label: "移库单号",
          },
          {
            types: "oldName",
            label: "移库单状态",
          },
          {
            types: "oldName",
            label: "创建人",
          },
          {
            types: "oldName",
            label: "创建时间",
          },
          {
            types: "oldName",
            label: "移库人",
          },
          {
            types: "oldName",
            label: "移库开始时间",
          },
          {
            types: "oldName",
            label: "移库结束时间",
          },
        ],
      },
      editDataJson: {}, //编辑
      BuHuoSureJson: {}, //补货确认
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //创建
    createOrderNoteFun() {
      this.editDataJson = {};
      this.isOrderNote = true;
    },
    //编辑
    editOrderNote() {
      if (!this.multipleSelection.length || this.multipleSelection.length != 1)
        return this.$messageSelf.message(
          "请选择要编辑的补货单,并且只能选择一个编辑"
        );
      this.editDataJson = this.multipleSelection[0];
      this.isOrderNote = true;
    },
    //删除
    removeIsOrderNode() {
      if (!this.multipleSelection.length)
        return this.$messageSelf.message("请选择要删除的补货单");
      this.$pOrgProductsApp
        .pReplenishOrderDelRecord({
          ids: _getArrTarget(this.multipleSelection, "id"),
        })
        .then((res) => {
          if (res.code == "10000") {
            this.$messageSelf.message(res.msg);
            this.getTableData();
          } else {
            this.$messageSelf.message(res.msg);
          }
        });
    },
    isBuHuoSureJson() {
      if (!this.multipleSelection.length || this.multipleSelection.length != 1)
        return this.$messageSelf.message(
          "请选择要确认的补货单,并且只能选择一个确认"
        );
      this.BuHuoSureJson = this.multipleSelection[0];
      this._getdetailsChanPin(this.multipleSelection[0]);

      this.isLooker = false;
      this.isBuHuoSures = true;
    },
    shenchengbuhuodan() {
      this.isOrderNote = true;
    },
    closeBtnSure() {
      this.isBuHuoSures = false;
      this.getTableData();
    },
    isOrderNoteFun() {
      this.isOrderNote = false;
      this.getTableData();
    },
    isReplenishmentNoteClick() {
      if (!this.multipleSelection.length || this.multipleSelection.length != 1)
        return this.$messageSelf.message(
          "请选择要打印的补货单,以及补货单只能打印一张"
        );
      let json = [
        {
          queryTitle: "移库单号",
          queryCenter: this.multipleSelection[0].replenishOrderNo
            ? this.multipleSelection[0].replenishOrderNo
            : "",
        },
        {
          queryTitle: "移库人（签字）",
          queryCenter: "",
          queryLine: true, //是否有横线
        },
        {
          queryTitle: "移库时间",
          queryCenter: "",
          queryLine: true,
        },
      ];
      this.replenishmentNoteJson.queryArr = json;
      this.replenishmentNoteJson.title =
        "移库单" + this.multipleSelection[0].replenishOrderNo;
      this.replenishmentNoteJson.replenishOrderNo = this.multipleSelection[0].replenishOrderNo;
      this._getdetailsChanPin(this.multipleSelection[0]);
      this.isReplenishmentNote = true;
    },

    async _getdetailsChanPin(e) {
      let data = await this.$pOrgProductsApp.pReplenishOrderFindRecord({
        id: e.id,
      });
      this.tabledatasArr = data.result[0].detailList;
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
      this.BuHuoSureJson = e;
      this._getdetailsChanPin(e);
      this.isLooker = true;
      this.isBuHuoSures = true;
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
      //点击生产补货单
      this.tableDataJson.tabledata = datas.list;
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
</style>
