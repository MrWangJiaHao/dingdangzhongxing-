<template>
  <div id="breakageMain">
    <!-- 这是报损管理页面 -->
    <div class="headerHtml">
      <div class="headerInput">
        <div class="el-inputBox entrustCompany">
          <div class="el-inputBox-text">委托公司：</div>
          <div class="el-inputBox-checkBox" style="width: 320px">
            <el-select
              v-model="entrustCompany"
              placeholder="请选择委托公司"
              @change="entrustCompanys"
              clearable
            >
              <el-option
                v-for="item in entrustCompanyData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">报损单号：</div>
          <div class="el-inputBox-checkBox" style="width: 160px">
            <el-input v-model="breakageOrder" placeholder="模糊检索">
            </el-input>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">报损类型：</div>
          <div class="el-inputBox-checkBox" style="width: 150px">
            <el-select
              v-model="breakageType"
              placeholder="请选择报损类型"
              @change="breakageTypes"
              clearable
            >
              <el-option
                v-for="item in breakageTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">报损状态：</div>
          <div class="el-inputBox-checkBox" style="width: 150px">
            <el-select
              v-model="breakageState"
              placeholder="请选择报损状态"
              @change="breakageStates"
              clearable
            >
              <el-option
                v-for="item in breakageStateData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="timeChoose el-inputBox">
          <div class="el-inputBox-text titleBox">创建时间：</div>
          <div class="timeBox">
            <div style="">
              <dateTime
                :dateTimeData="datetimeDates"
                @getDateTime="getStartTime"
                ref="startTime"
              />
            </div>
            <!-- 开始时间 -->
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="datetimeDate"
                @getDateTime="getEndTime"
                ref="endTime"
              />
            </div>
            <!-- 结束时间 -->
          </div>
        </div>
        <div class="timeChoose el-inputBox">
          <div class="el-inputBox-text titleBox">审核时间：</div>
          <div class="timeBox">
            <div style="">
              <dateTime
                :dateTimeData="datetimeDates"
                @getDateTime="getStartTime1"
                ref="startTime"
              />
            </div>
            <!-- 开始时间 -->
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="datetimeDate"
                @getDateTime="getEndTime1"
                ref="endTime"
              />
            </div>
            <!-- 结束时间 -->
          </div>
        </div>
      </div>
      <div class="header-botton">
        <div class="queryBtn" @click="clickQuery">查询</div>
        <div class="clearBtn" @click="clearInput">清空</div>
      </div>
    </div>
    <div class="childWarehouseForm">
      <div class="formHeader">
        <div class="icon-title">
          <div class="icon-title-icon">
            <img src="../../assets/img/systemTitlemesa.png" />
          </div>
          <div class="icon-title-title">查询结果</div>
        </div>
        <div class="someBtn">
          <div class="create" @click="create">创建</div>
          <div class="create" @click="edit">编辑</div>
          <div class="del" @click="del">删除</div>
          <div class="create" @click="submit">提交</div>
          <div class="point" @click="point">打印报损单</div>
        </div>
      </div>
      <div class="resultForm">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :stripe="true"
          tooltip-effect="dark"
          @cell-click="lookDetailEvent"
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column label="序号" align="center" type="index" width="60">
          </el-table-column>
          <el-table-column prop="orgName" label="委托公司" align="center">
          </el-table-column>
          <el-table-column
            prop="damageOrderNo"
            label="报损单号"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <div class="lookDeatil">
                {{ scope.row.damageOrderNo }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="disposeStatus" label="报损状态" align="center">
          </el-table-column>
          <el-table-column prop="damageType" label="报损类型" align="center">
          </el-table-column>
          <el-table-column prop="createUser" label="创建人" align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180"
            min-width="180"
          >
          </el-table-column>
          <el-table-column prop="verifyUserName" label="审核人" align="center">
          </el-table-column>
          <el-table-column
            prop="verifyTime"
            label="审核时间"
            width="180"
            min-width="180"
          ></el-table-column>
        </el-table>
        <div class="pageComponent">
          <pagecomponent
            :pageComponentsData="pageComponentsData"
            @getPageNum="getPageNum"
            @sureSuccssBtn="sureSuccssBtn"
          ></pagecomponent>
        </div>
      </div>
    </div>
    <!-- <div class="pointBox" v-show="pointIsShow">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <BreakageOrder
          v-show="pointIsShow"
          :tabledatasArr="tabledatasArr"
          :ReplenishmentNote="replenishmentNoteJson"
          @getiswuliudanOne="getiswuliudanOne"
        ></BreakageOrder>
      </transition>
    </div> -->
    <el-dialog
      :visible.sync="pointIsShow"
      custom-class="animate__animated animate__zoomIn"
    >
      <BreakageOrder
        v-show="pointIsShow"
        :tabledatasArr="tabledatasArr"
        :ReplenishmentNote="replenishmentNoteJson"
        @getiswuliudanOne="getiswuliudanOne"
      ></BreakageOrder>
    </el-dialog>
  </div>
</template>

<script>
/*eslint-disable*/
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import dateTime from "../../components/commin/dateTime.vue"; //时间
import {
  queryBreakageList,
  delBreakageOrder,
  pointBreakageOrder,
  saveBreakageOrder,
} from "../../api/api";
import BreakageOrder from "../../components/commin/componentList";

export default {
  components: {
    pagecomponent,
    dateTime,
    BreakageOrder,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "/breakageManagement/createBreakageOrder") {
      next((vm) => {
        vm.pageQueryFun();
        if (vm.$route.query.type === "quxiao") {
          vm.$messageSelf.message("已取消");
        }
      });
    } else {
      next();
    }
  },
  data() {
    return {
      pointIsShow: false,
      tableData: [],
      tabledatasArr: [],
      replenishmentNoteJson: {
        title: "报损单",
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
                centerStr: "报损数量",
              },
              {
                types: "",
                centerStr: "当前库位",
              },
              { types: "", centerStr: "残次品库位" },
            ],
          },
        ],
      },
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
        placeholder: "请选择开始时间",
      },
      breakageOrder: "",
      entrustCompany: "",
      breakageType: "",
      breakageState: "",
      breakageOrderData: [],
      entrustCompanyData: [],
      breakageTypeData: [
        {
          value: "1",
          label: "损坏",
        },
        {
          value: "2",
          label: "入库",
        },
        {
          value: "3",
          label: "丢失",
        },
        {
          value: "4",
          label: "其他",
        },
      ],
      breakageStateData: [
        {
          value: "1",
          label: "待提交",
        },
        {
          value: "2",
          label: "待审核",
        },
        {
          value: "3",
          label: "审核成功",
        },
        {
          value: "4",
          label: "拒绝",
        },
      ],
      multipleSelection: [],
      queryBreakageListData: {
        paras: {
          damageOrderNo: "",
          orgId: "",
          orgName: "",
          wareId: "",
          wareName: "",
          childWareId: "",
          childWareName: "",
          damageType: "",
          disposeStatus: "",
          createStartTime: "",
          createEndTime: "",
        },
        pageNumber: 1,
        pageSize: 10,
        orderBy: "damageOrderNo",
      },
      pageComponentsData: {
        pageNums: 0,
      },
    };
  },
  mounted() {
    this.pageQueryFun();
  },
  watch: {},
  methods: {
    pageQueryFun() {
      this.tableData = [];
      let queryBreakageListData = this.queryBreakageListData;
      queryBreakageList(queryBreakageListData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData.forEach((v) => {
            v.disposeStatus = this.disposeStatus(v.disposeStatus);
            v.damageType = this.damageType(v.damageType);
          });
        } else {
          this.$messageSelf.message({
            message: "查询失败",
            type: "error",
          });
        }
      });
    },
    disposeStatus(num) {
      let state = num;
      switch (state) {
        case 1:
          state = "待提交";
          break;
        case 2:
          state = "待审核";
          break;
        case 3:
          state = "审核通过";
          break;
        case 4:
          state = "拒绝";
          break;
        default:
          state = "未知";
          break;
      }
      return state;
    },
    damageType(num) {
      let state = num;
      switch (state) {
        case 1:
          state = "损坏";
          break;
        case 2:
          state = "入库";
          break;
        case 3:
          state = "丢失";
          break;
        case 4:
          state = "其他";
          break;
        default:
          state = "未知";
          break;
      }
      return state;
    },
    breakageOrders(val) {
      this.breakageOrder = val;
    },
    entrustCompanys(val) {
      this.entrustCompany = val;
    },
    breakageTypes(val) {
      this.breakageType = val;
    },
    breakageStates(val) {
      this.breakageState = val;
    },
    clickQuery() {
      //点击查询
      // let data = { ...this.queryBreakageListData.paras };
      this.queryBreakageListData.paras.damageOrderNo = this.breakageOrder;
      this.queryBreakageListData.paras.damageType = this.breakageType;
      this.queryBreakageListData.paras.disposeStatus = this.breakageState;
      this.pageQueryFun();
    },
    clearInput() {
      //点击清空输入框
      this.clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      Object.keys(this.queryBreakageListData.paras).forEach((v) => {
        this.queryBreakageListData.paras[v] = "";
      });
      this.pageQueryFun();
    },
    create() {
      //创建报损单
      this.$router.push({
        path: "/breakageManagement/createBreakageOrder",
        query: { type: "create" },
      });
    },
    edit() {
      if (!this.multipleSelection.length) {
        return this.$messageSelf.message({
          message: "请选择需要编辑的报损订单",
          type: "warning",
        });
      } else if (this.multipleSelection.length > 1) {
        return this.$messageSelf.message({
          message: "只能选择一个报损订单进行编辑",
          type: "warning",
        });
      } else {
        // this.$router.push({
        //   path: "/breakageManagement/createBreakageOrder",
        //   query: { val: this.multipleSelection[0], type: "edit" },
        // });
        if (this.multipleSelection[0].disposeStatus !== "待审核") {
          return this.$messageSelf.message({
            message: "只有待审核的订单可编辑",
            type: "warning",
          });
        } else {
          this.$router.push({
            path: "/breakageManagement/createBreakageOrder",
            query: { val: this.multipleSelection[0], type: "edit" },
          });
        }
      }
    },
    del() {
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length)
        return this.$messageSelf.message({
          message: "请选择要删除的报损订单",
          type: "warning",
        });
      this.$messageSelf
        .confirms(
          `确定要删除这${this.multipleSelection.length}条报损单号？`,
          "删除确认",
          {
            type: "info",
          }
        )
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {});
    },
    delRequest(data) {
      delBreakageOrder(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "删除成功",
          });
          this.pageQueryFun();
        } else {
          this.$messageSelf.message({
            type: "error",
            message: "删除失败",
          });
        }
      });
    },
    submit() {
      if (!this.multipleSelection.length) {
        return this.$messageSelf.message({
          message: "请选择需要提交的单号",
          type: "warning",
        });
      } else if (this.multipleSelection.length > 1) {
        return this.$messageSelf.message({
          message: "只能提交一个产品",
          type: "warning",
        });
      } else {
        if (this.multipleSelection[0].disposeStatus !== "待提交") {
          return this.$messageSelf.message({
            message: "只有待提交的订单可编辑",
            type: "warning",
          });
        } else {
          let submitData = {
            createTime: "",
            createUser: "",
            damageOrderNo: "",
            damageType: "",
            detailList: [],
            disposeStatus: 1, //报损状态
            id: "", //报损单id
            lastModifyTime: "",
            lastModifyUser: "",
            orgId: this.entrustCompany,
            orgName: "",
            remark: this.textarea, //备注
            verifyTime: "", //审核时间
            verifyUserId: "", //审核人id
            verifyUserName: "", //审核人
            version: "",
          };
          pointBreakageOrder({ id: this.multipleSelection[0].id }).then(
            (ok) => {
              if (ok.data.code === "10000") {
                submitData.damageType = ok.data.result[0].damageType;
                ok.data.result[0].detailList.forEach((v) => {
                  submitData.detailList.push({
                    actualProdNum: 0,
                    batchNo: "",
                    createTime: "",
                    createUser: "",
                    damageId: "", //报损单id
                    damagedSeatId: "", //残次品库位id
                    damagedSeatNo: v.imperfectKuweiValue, //残次品库位编号
                    damagedWareAreaId: "", //残次品仓库区域id
                    damagedWareAreaName: "", //残次品仓库区域名称
                    id: "",
                    lastModifyTime: "",
                    lastModifyUser: "",
                    manufTime: "",
                    orgId: v.orgId,
                    orgName: v.orgName,
                    prodId: v.prodId,
                    prodName: v.prodName,
                    prodNum: v.breakageNum,
                    remark: "",
                    version: "",
                    wareAreaId: v.wareAreaId,
                    wareAreaName: v.wareAreaName,
                    childWareId: v.childWareId,
                    childWareName: v.childWareName,
                  });
                });
                if (submitData.detailList.length > 0) {
                  saveBreakageOrder(submitData).then((ok) => {
                    // console.log(ok);
                    if (ok.data.code === "10000") {
                      this.$messageSelf.message({
                        message: "提交成功",
                        type: "success",
                      });
                      this.pageQueryFun();
                    } else {
                      this.$messageSelf.message({
                        message: "提交失败",
                        type: "error",
                      });
                    }
                  });
                }
              } else {
                this.$messageSelf.message({
                  message: "提交失败",
                  type: "error",
                });
              }
            }
          );
        }
      }
    },
    point() {
      if (!this.multipleSelection.length) {
        return this.$messageSelf.message({
          message: "请选择需要打印的单号",
          type: "warning",
        });
      } else if (this.multipleSelection.length > 1) {
        return this.$messageSelf.message({
          message: "只能选择一个产品进行打印",
          type: "warning",
        });
      } else {
        this.tabledatasArr = [];
        this.pointIsShow = true;
        pointBreakageOrder({ id: this.multipleSelection[0].id }).then((ok) => {
          // console.log(ok);
          if (ok.data.code === "10000") {
            let json = [
              {
                queryTitle: "报损单号",
                queryCenter: ok.data.result[0].damageOrderNo,
              },
              {
                queryTitle: "委托公司",
                queryCenter: ok.data.result[0].orgName,
              },
              {
                queryTitle: "审核状态",
                queryCenter: this.disposeStatus(
                  ok.data.result[0].disposeStatus
                ),
              },
              {
                queryTitle: "签字",
                queryCenter: "",
                queryLine: true,
              },
            ];
            this.replenishmentNoteJson.queryArr = json;
            this.replenishmentNoteJson.replenishOrderNo =
              ok.data.result[0].damageOrderNo;
            let newArr = [];
            ok.data.result[0].detailList.forEach((v) => {
              newArr.push(v.pOrgProducts);
            });
            this.tabledatasArr.push(newArr);
          }
        });
      }
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    lookDetailEvent(row, column, cell) {
      if (column.property === "damageOrderNo") {
        if (cell.childNodes[0].childNodes[0].innerHTML !== "") {
          this.$router.push({
            path: "/breakageManagement/breakageOrderDetail",
            query: {
              damageOrderNo: row,
              type: "damageOrderNo",
            },
          });
        }
      }
    },
    getiswuliudanOne(e) {
      this.pointIsShow = e;
    },
    getPageNum(e) {
      this.queryBreakageListData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryBreakageListData.pageNumber = e;
      this.pageQueryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getStartTime(e) {
      this.queryBreakageListData.paras.createStartTime = e;
    },
    getEndTime(e) {
      this.queryBreakageListData.paras.createEndTime = e;
    },
    getStartTime1(e) {
      console.log(e);
    },
    getEndTime1(e) {
      console.log(e);
    },
    clearTimeInput() {
      let input = document.getElementsByClassName("ivu-input");
      for (let i = 0; i < input.length; i++) {
        input[i].value = "";
      }
      let elInput = document.querySelectorAll(".el-input__inner");
      for (let i = 0; i < elInput.length; i++) {
        elInput[i].value = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
.pointBox {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.3);
}

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s;
// }
// .fade-enter,
// .fade-leave-active {
//   opacity: 0;
// }

#breakageMain {
  padding: 20px 10px;
}
.headerHtml {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .headerInput {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    .el-inputBox {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin: 0 20px 16px 0;
      .el-inputBox-text {
        white-space: nowrap;
      }
    }
  }
  .header-botton {
    display: flex;
    align-items: flex-end;
    margin-bottom: 16px;
    .queryBtn {
      @include BtnFunction("success");
    }
    .clearBtn {
      @include BtnFunction();
      background: #fff;
      margin: 0 0 0 10px;
    }
  }
  .timeChoose {
    display: flex;
    height: 34px;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
    .titleBox {
      font-size: 14px;
      white-space: nowrap;
    }
    .timeBox {
      width: 100%;
      display: flex;
      align-items: center;
      .line {
        width: 10px;
        height: 2px;
        background: #d1d6e2;
        margin: 0 10px;
      }
    }
  }
}
.childWarehouseForm {
  margin: 4px 0 0 0;
  background: white;
  .formHeader {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d1d6e2;
    .icon-title {
      display: flex;
      margin: 24px 0 0 0;
      .icon-title-icon {
        width: 14px;
        height: 14px;
        margin: 0 0 0 20px;
      }
      .icon-title-title {
        margin: 0 0 0 8px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 20px 16px 0;
      .create {
        @include BtnFunction("success");
        margin-right: 10px;
      }
      .del {
        @include BtnFunction("error");
        margin-right: 10px;
      }
      .point {
        @include BtnFunction("success");
      }
    }
  }

  .resultForm {
    padding: 16px 20px;
    .lookDeatil {
      color: #599af3;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
#breakageMain {
  .entrustCompany {
    .el-select {
      width: 100%;
    }
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>
