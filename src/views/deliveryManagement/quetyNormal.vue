<template>
  <div id="fahuoguanli">
    <div class="manualBox">
      <div>
        <manualHeader
          @getParasJson="getParasJson"
          :fastFahuo="true"
          :tableData="tableData"
        />
      </div>
      <div class="btnArr">
        <div style="background-color: #fff">
          <div style="display: flex; align-item: center">
            <div class="mr20 meiyiyetitle">快速发货</div>
            <div>
              <span
                class="disinb mr20 setUser nowrap"
                :style="
                  !ischanpingOrOne
                    ? {
                        background: 'linear-gradient(117deg, #52A8FD, #73CFFF)',
                        color: '#FFFFFF',
                      }
                    : {
                        background: '#fff',
                        color: '#000',
                        border: '1px solid #d1d6e2',
                      }
                "
                @click="ischanpingOrOne = false"
                >特殊产品</span
              >
              <span
                class="disinb zhengcxhang nowrap"
                :style="
                  ischanpingOrOne
                    ? {
                        background: 'linear-gradient(117deg, #52A8FD, #73CFFF)',
                        color: '#FFFFFF',
                      }
                    : {
                        background: '#fff',
                        color: '#000',
                        border: '1px solid #d1d6e2',
                      }
                "
                @click="ischanpingOrOne = true"
                >只含一种产品</span
              >
            </div>
          </div>

          <div class="btnClick">
            <div class="setUser" @click="warehousingConfirmation">
              {{ ischanpingOrOne ? "集计" : "打印物流单" }}
            </div>
          </div>
        </div>
        <!-- but按钮 -->
      </div>
      <div class="tableBox">
        <div style="background-color: #fff; padding: 16px 20px 16px 20px">
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
              <el-table-column
                type="selection"
                align="center"
                width="82"
                 fixed="left"
              ></el-table-column>
              <el-table-column
                label="序号"
                type="index"
                align="center"
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
                width="119"
                label="渠道"
                prop="channelName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                width="250"
                label="订单来源"
                prop="orderSourceName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                width="250"
                label="产品名称"
                prop="orderSourceName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                width="250"
                label="产品编码"
                prop="orderSourceName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                width="250"
                label="产品规格"
                prop="orderSourceName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                width="250"
                label="产品数量"
                prop="orderSourceName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="订单号"
                width="250"
                prop="channelOrderNo"
                show-overflow-tooltip
              >
                <span slot-scope="scoped">
                  <div @click="goToDetailOut(scoped.row)" class="lookDeatil">
                    {{ scoped.row.channelOrderNo }}
                  </div>
                </span></el-table-column
              >
              <el-table-column
                label="子单号"
                prop="subOrderNo"
                width="250"
                show-overflow-tooltip
              >
                <span slot-scope="scoped">
                  <div @click="goToSubOrderNo(scoped.row)" class="lookDeatil">
                    {{ scoped.row.subOrderNo }}
                  </div>
                </span></el-table-column
              >
              <el-table-column
                width="250"
                label="物流公司"
                prop="exprName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="物流单号"
                width="250"
                prop="exprNo"
              ></el-table-column>
              <el-table-column
                label="物流单打印状态"
                width="160"
                prop="commendBox"
              ></el-table-column>
              <el-table-column
                label="收货人"
                width="160"
                prop="orderContact"
              ></el-table-column>
              <el-table-column
                label="联系电话"
                width="250"
                prop="orderContactPhone"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="收货地址"
                width="250"
                prop="pushStartTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="支付时间"
                prop="payTime"
                width="250"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="下发时间"
                prop="payTime"
                width="250"
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
    <!-- 拣货单 start -->
    <div v-show="isJianHuoDanShow" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isJianHuoDanShow">
          <div>
            <pickingList
              :dataBack="detailsJianHuoDan"
              :OneOrAddMes="true"
              @getiscaigoudanDetail="getiscaigoudanDetail"
            />
          </div>
        </div>
      </transition>
    </div>
    <!-- 拣货单 end -->
    <!-- 物流单 LogisticsList start -->
    <div v-show="iswuliudanOne" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="iswuliudanOne">
          <div>
            <logisticsList
              @getiswuliudanOne="getiswuliudanOne"
              :logisticsListJson="logisticsListJson"
            />
          </div>
        </div>
      </transition>
    </div>
    <!-- 物流单 LogisticsList end -->
  </div>
</template>

<script>
/*eslint-disable */
import manualHeader from "../../components/deliveryManagement/deliveryManagementhHeader";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import pickingList from "../../components/deliveryManagement/pickingList"; //拣货单
import logisticsList from "../../components/deliveryManagement/LogisticsList"; //物流单
import {
  pDeliverGoodsFindFastRecordPage,
  pOrgSubOrderMegerOrder,
} from "../../api/api";
import { _getArrTarget, getCookie } from "../../utils/validate";

export default {
  components: {
    manualHeader,
    pickingList,
    pagecomponent,
    logisticsList,
  },
  watch: {
    ischanpingOrOne(n) {
      // this.multipleSelection = [];
    },
  },
  data() {
    return {
      detailsJianHuoDan: {},
      isJianHuoDanShow: false,
      ischanpingOrOne: false,
      iswuliudanOne: false,
      tableData: [],
      logisticsListJson: {},
      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10
      },
      sendOutDataJson: {
        page: 1,
        pageSize: 10,
        paras: {
          wareId: "",
          orgId: "",
          orderSourceId: "",
          channelId: "",
          orderNo: "",
          subOrderNo: "",
          exprId: "",
          orderContact: "",
          orderContactPhone: "",
          orderAddr: "",
          orderAddrLike: "",
          systemProdName: "",
          prodNameLike: "",
          payStartTime: "",
          wareId: getCookie("X-Auth-wareId"),
          pushStartTime: "",
          pushEndTime: "",
          specialProd: (() => (this.ischanpingOrOne ? 1 : 0))(),
          printExprStatus: "",
        },
      },
      multipleSelection: [], //选择了那个
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getiswuliudanOne(e) {
      this.iswuliudanOne = e;
    },
    getiscaigoudanDetail(e) {
      this.isJianHuoDanShow = e;
    },
    iSJianHuoDan() {
      //打印拣货单
      this.$nextTick(() => {
        if (document.getElementById("checkbox").checked) {
          this.$router.push({
            path: "/deliveryManagement/pickingList",
          });
        }
      });
    },
    //订单集计==
    _jijiJianhuodan() {
      pOrgSubOrderMegerOrder({
        id: _getArrTarget(this.multipleSelection, "id"),
      })
        .then((res) => {
          if (res.code == "10000") {
            this.$messageSelf.message({ message: res.msg, type: "success" });
          } else {
            this.$messageSelf.message({ message: res.msg, type: "error" });
          }
        })
        .catch((err) =>
          this.$messageSelf.message({ message: "出错拉~~", type: "error" })
        );
    },
    goToDetailOut(e) {
      this.$router.push({
        path: "/indentManagement/orderDetail",
        query: {
          orderNo: e,
          type: "orderNo",
        },
      });
    },
    goToSubOrderNo(e) {
      this.$router.push({
        path: "/indentManagement/childOrderDetail",
        query: {
          subOrderNos: e,
          type: "subOrderNos",
        },
      });
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
    warehousingConfirmation() {
      if (this.ischanpingOrOne) {
        this._jijiCenter();
      } else {
        this._printWuLiuDan();
      }
    },
    //打印物流单
    _printWuLiuDan() {
      if (!this.multipleSelection.length || this.multipleSelection.length != 1)
        return this.$messageSelf.message({
          message: "请选择需要打印的物流单，以及只能选择一个物流单",
          type: "warning",
        });
      this.$messageSelf
        .confirms(
          `共选中${this.multipleSelection.length}笔订单，确认打印吗?`,
          "确定打印",
          {
            type: "info",
          }
        )
        .then(() => {
          //确定打印
          this.logisticsListJson = this.multipleSelection[0];
          this.iswuliudanOne = true;
        })
        .catch(() => {
          this.$messageSelf.message("已取消打印");
        });
    },
    //打印集计单
    _jijiCenter() {
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要集计的拣货单单",
          type: "warning",
        });
      this.$messageSelf
        .confirms(
          ` 共集计${this.multipleSelection.length}个订单，可生成${this.multipleSelection.length}张拣货单，确认集计吗？<div id='checkboxID'  > <input id='checkbox' checked type='checkbox' /> 打印集计单</div>`,
          "集计确认",
          {
            showClose: true,
            confirmButtonText: "确定",
            dangerouslyUseHTMLString: true,
            cancelButtonText: "取消",
            type: "info",
          }
        )
        .then(() => {
          this.detailsJianHuoDan = this.multipleSelection[0];
          this.iSJianHuoDan();
          this._jijiJianhuodan();
        })
        .catch(() => {
          this.$messageSelf.message("已经取消集计");
        });
    },
    //表格发生了变化以及点击了查询按钮
    getParasJson(data) {
      this.sendOutDataJson.paras = Object.assign(
        {},
        this.sendOutDataJson.paras,
        data
      );
      this.getTableData();
    },
    //获取table表格内容
    async getTableData(fn) {
      let datas = await pDeliverGoodsFindFastRecordPage(this.sendOutDataJson);
      console.log(datas);
      if (datas.code == "10000") {
        this._changeDatas(datas.result);
      } else {
        this.$messageSelf.message({message:datas.msg,type:"error"});
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
  // border-top: 1px solid #d1d6e2;
  // background-color: rgb(232, 233, 236);
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
  @include BtnFunction("success");
}

.bianjiUser {
  margin-right: 10px;
  @include BtnFunction("success");
}

.zhengcxhang {
  border: 1px solid #d1d6e2;
  @include BtnFunction();
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
