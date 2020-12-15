<template>
  <div id="fahuoguanli">
    <div class="manualBox">
      <div>
        <manualHeader @getParasJson="getParasJson" :tableData="tableData" />
      </div>
      <div class="btnArr">
        <div style="background-color: #fff">
          <div class="meiyiyetitle">正常发货</div>
          <div class="btnClick">
            <div class="setUser" @click="warehousingConfirmation">集计</div>
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
              ></el-table-column>
              <el-table-column
                label="序号"
                type="index"
                width="71"
                align="center"
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
                label="订单号"
                width="250"
                prop="orderNo"
                show-overflow-tooltip
              >
                <span slot-scope="scoped">
                  <div @click="goToDetailOut(scoped.row)" class="lookDeatil">
                    {{ scoped.row.orderNo }}
                  </div>
                </span>
              </el-table-column>
              <el-table-column
                label="子订单号"
                prop="subOrderNo"
                width="250"
                show-overflow-tooltip
              >
                <span slot-scope="scoped">
                  <div @click="goToSubOrderNo(scoped.row)" class="lookDeatil">
                    {{ scoped.row.subOrderNo }}
                  </div>
                </span>
              </el-table-column>
              <el-table-column
                width="119"
                label="物流公司"
                prop="exprName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="物流单号"
                width="250"
                sortable
                prop="exprNo"
              ></el-table-column>
              <el-table-column
                label="推荐用箱"
                width="160"
                prop="commendBox"
              ></el-table-column>
              <el-table-column
                label="下发时间"
                width="250"
                sortable
                prop="pushStartTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="支付时间"
                prop="payTime"
                width="250"
                sortable
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
              :detailsJianHuoDan="detailsJianHuoDan"
              :pickOrderNo="pickOrderNo"
              @getiscaigoudanDetail="getiscaigoudanDetail"
            />
          </div>
        </div>
      </transition>
    </div>
    <!-- 拣货单 end -->
  </div>
</template>

<script>
/*eslint-disable */
import manualHeader from "../../components/deliveryManagement/deliveryManagementhHeader";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import pickingList from "../../components/deliveryManagement/pickingList"; //拣货单
import {
  pDeliverGoodsFindNormalRecordPage,
  pOrgSubOrderMegerOrder,
  pOrgPickOrderprintPick,
} from "../../api/api";
import { getCookie, _getArrTarget } from "../../utils/validate";

export default {
  components: {
    manualHeader,
    pickingList,
    pagecomponent,
  },
  data() {
    return {
      isJianHuoDanShow: false,
      pickOrderNo: "",
      tableData: [],
      detailsJianHuoDan: {},
      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10
      },
      sendOutDataJson: {
        paras: {
          orgName: "",
          orgId: "",
          orderNo: "",
          prodId: "",
          specId: "",
          wareId: getCookie("X-Auth-wareId"),
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
        pageNumber: 1, //当前页数
        pageSize: 10, //每页记录数
      },
      multipleSelection: [], //选择了那个
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getiscaigoudanDetail(e) {
      this.isJianHuoDanShow = e;
    },
    iSJianHuoDan() {
      //打印拣货单
      this.$nextTick(() => {
        if (document.getElementById("checkbox").checked) {
          pOrgPickOrderprintPick([
            {
              ids: this.multipleSelection[0].id,
            },
          ]).then((res) => {
            if (res.code == "10000") {
              this.detailsJianHuoDan = this.multipleSelection[0];
              this.$router.push({
                path: "/deliveryManagement/pickingList",
              });
            }
          });
        }
      });
    },
    //订单集计==
    _jijiJianhuodan() {
      pOrgSubOrderMegerOrder({
        ids: this.multipleSelection[0].id,
      })
        .then((res) => {
          if (res.code == "10000") {
            this.$messageSelf.message(res.msg);
          } else {
            this.$messageSelf.message(res.msg);
          }
        })
        .catch((err) => this.$messageSelf.message("出错拉~~"));
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
    //集计
    warehousingConfirmation() {
      if (!this.multipleSelection.length)
        return this.$messageSelf.message("请选择要集计的拣货单单");
      this.$messageSelf
        .confirms(
          ` 共集计${this.multipleSelection.length}个订单，可生成${this.multipleSelection.length}张拣货单，确认集计吗？<div id='checkboxID'> <input checked  id='checkbox' type='checkbox' /> 打印集计单</div>`,
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
          this.iSJianHuoDan();
          this._jijiJianhuodan();
        })
        .catch(() => {
          this.$messageSelf.message("已经取消集计");
        });
    },
    //表格发生了变化以及点击了查询按钮
    getParasJson(data) {
      this.sendOutDataJson.paras = { ...data };
      this.getTableData();
    },
    //获取table表格内容
    async getTableData(fn) {
      let datas = await pDeliverGoodsFindNormalRecordPage(this.sendOutDataJson);
      if (datas.code == "10000") {
        this._changeDatas(datas.result);
      } else {
        this.$messageSelf.message(datas.msg);
      }
      fn && fn(datas);
      return datas;
    },
    _changeDatas(datas) {
      console.log(datas);
      this.tableData = datas.list;
      this.pageComponentsData.pageNums = datas.totalRow;
    },
  },
};
</script>

<style>
</style>
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
  @include BtnFunction("success");
}
</style>
