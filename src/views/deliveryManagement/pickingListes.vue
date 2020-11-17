<template>
  <div id="fahuoguanli">
    <div class="manualBox">
      <div>
        <manualHeader @getParasJson="getParasJson" :tableData="tableData" />
      </div>
      <div class="btnArr">
        <div style="background-color: #fff">
          <div class="meiyiyetitle">拣货单管理</div>
          <div class="btnClick">
            <div class="setUser" @click="warehousingConfirmation">作废</div>
            <div class="setUser" @click="warehousingConfirmation">
              打印拣货单
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
                label="拣货单号"
                width="119"
                prop="orgName"
                show-overflow-tooltip
              />
              <el-table-column
                width="119"
                label="拣货单状态"
                prop="channelName"
                show-overflow-tooltip
              >
                <div slot-scope="scoped">
                  {{ scoped.row.printExprStatus ? "已打印" : "未打印" }}
                </div>
              </el-table-column>
              <el-table-column
                width="119"
                label="打印次数"
                prop="orderSourceName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="订单数量"
                prop="channelOrderNo"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="产品种类"
                prop="subOrderNo"
                show-overflow-tooltip
              >
                <span slot-scope="scoped">
                  <div @click="goToDetailOut(scoped.row)" class="lookDeatil">
                    {{ scoped.row.subOrderNo }}
                  </div>
                </span></el-table-column
              >
              <el-table-column
                width="119"
                label="产品数量"
                prop="exprName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="创建时间"
                width="110"
                prop="exprNo"
              ></el-table-column>
              <el-table-column
                label="打印时间"
                width="160"
                prop="commendBox"
              ></el-table-column>
              <el-table-column
                label="打印人"
                width="250"
                prop="pushStartTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="拣货开始时间"
                prop="payTime"
                width="250"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="拣货完成时间"
                prop="payTime"
                width="250"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="拣货人员"
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
            <pickingList @getiscaigoudanDetail="getiscaigoudanDetail" />
          </div>
        </div>
      </transition>
    </div>
    <!-- 拣货单 end -->
  </div>
</template>

<script>
/*eslint-disable */
import manualHeader from "../../components/deliveryManagement/pickingListesHead";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import pickingList from "../../components/deliveryManagement/pickingList"; //拣货单
import {
  pDeliverGoodsFindNormalRecordPage,
  pOrgSubOrderMegerOrder,
} from "../../api/api";
import { _getArrTarget } from "../../utils/validate";
export default {
  components: {
    manualHeader,
    pickingList,
    pagecomponent,
  },
  data() {
    return {
      isJianHuoDanShow: false,
      tableData: [],
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
  mounted() {},
  methods: {
    getiscaigoudanDetail(e) {
      this.isJianHuoDanShow = e;
    },
    iSJianHuoDan() {
      //打印拣货单
      this.$nextTick(() => {
        if (document.getElementById("checkbox").checked) {
          console.log(1);
          this.isJianHuoDanShow = true;
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
            this.$messageSelf.message(res.msg);
          } else {
            this.$messageSelf.message(res.msg);
          }
        })
        .catch((err) => this.$messageSelf.message("出错拉~~"));
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
    //集计
    warehousingConfirmation() {
      // if(!this.multipleSelection.length ) return this.$messageSelf.message("请选择要集计的拣货单单")
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
