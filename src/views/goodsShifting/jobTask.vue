<template>
  <div id="fahuoguanli">
    <div class="manualBox">
      <div class="pd20 mtb20">
        <div class="zujianBox mb20">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">拣货单号:</div>
            <div class="mr20">
              <el-input
                v-model="pickOrderNo"
                placeholder="扫描拣货单号/输入查询"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 拣货单号 -->
      </div>

      <div class="tr pd20" style="width: 100%">
        <div class="btns mb20">
          <div class="bianjiUser disinb zujianBox" @click="queryBtns">查询</div>
          <div class="remove disinb" @click="clearBtns">清空</div>
        </div>
      </div>
      <!-- 查询 && 清空 -->
      <div class="btnArr">
        <div style="background-color: #fff">
          <div class="meiyiyetitle">补货作业</div>
          <div class="btnClick">
            <div class="setUser">待补货产品</div>
            <div class="setUser">补货确认</div>
            <div class="setUser">打印补货单</div>
            <div class="setUser">创建</div>
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
                label="订单号"
                prop="orgName"
                show-overflow-tooltip
              >
                <span slot-scope="scoped">
                  <div @click="goToDetailOut(scoped.row)" class="lookDeatil">
                    {{ scoped.row.channelOrderNo }}
                  </div>
                </span>
              </el-table-column>
              <el-table-column
                label="子单号"
                prop="channelName"
                show-overflow-tooltip
              >
                <span slot-scope="scoped">
                  <div @click="goToDetailOut(scoped.row)" class="lookDeatil">
                    {{ scoped.row.channelOrderNo }}
                  </div>
                </span>
              </el-table-column>
              <el-table-column
                label="推荐用箱"
                prop="orderSourceName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="订单编号"
                prop="channelOrderNo"
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
    <!-- 拣货单 start -->
    <div v-show="isJianHuoDanShow" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isJianHuoDanShow">
          <div>
            <delivetyNote @getiswuliudanOne="getiswuliudanOne" />
          </div>
        </div>
      </transition>
    </div>
    <!-- 拣货单 end -->
  </div>
</template>

<script>
/*eslint-disable */
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import delivetyNote from "../../components/deliveryManagement/delivetyNote"; //发货单
import {
  pOrgPickOrderfindOrderPage,
  pDeliverGoodsprintDeliverGoods,
  pDeliverGoodsfindSubOrderByPickOrderNo,
} from "../../api/api";
import { _getArrTarget } from "../../utils/validate";
export default {
  components: {
    delivetyNote,
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
        paras: {},
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
    queryBtns() {
      pDeliverGoodsfindSubOrderByPickOrderNo({
        pickOrderNo: this.pickOrderNo,
      }).then((res) => {
        if (res.code == "10000") {
          res.list && this._changeDatas(res.list);
        }
      });
    },
    clearBtns() {
      this.pickOrderNo = "";
      this.getTableData();
    },
    getiswuliudanOne(e) {
      this.isJianHuoDanShow = e;
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
      let datas = await pOrgPickOrderfindOrderPage(this.sendOutDataJson);
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
