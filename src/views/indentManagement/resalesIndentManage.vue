<template>
  <div id="resalesMianPage">
    <!-- 这是退货订单管理页面 -->
    <div class="roleName">
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
            <div class="el-inputBox-text">渠道：</div>
            <div class="el-inputBox-checkBox" style="width: 120px">
              <el-select
                v-model="channelValue"
                placeholder="请选择渠道"
                @change="channelValues"
                clearable
              >
                <el-option
                  v-for="item in channelValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">订单来源：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="indentSourceValue"
                placeholder="请选择订单来源"
                @change="indentSourceValues"
                clearable
              >
                <el-option
                  v-for="item in indentSourceValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">订单号：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="orderNumberValue" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">子单号：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="ChildOrderNumberValue" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">产品名称：</div>
            <div class="el-inputBox-checkBox" style="width: 400px">
              <el-input v-model="prodNameValue" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">产品编码：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="prodCodeValue" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">产品规格：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="prodSpecValue"
                placeholder="请选择产品规格"
                @change="prodSpecValues"
                clearable
              >
                <el-option
                  v-for="item in prodSpecValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox childrenIndent">
            <div class="el-inputBox-text">退单号：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="returnOrderValue" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox childrenIndent setMargin">
            <div class="el-inputBox-text">退单状态：</div>
            <div class="el-inputBox-checkBox" style="width: 110px">
              <el-select
                v-model="resalesOrderStateValue"
                placeholder="请选择退单状态"
                @change="resalesOrderStateValues"
                clearable
              >
                <el-option
                  v-for="item in resalesOrderStateData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox childrenIndent">
            <div class="el-inputBox-text">退货类型：</div>
            <div class="el-inputBox-checkBox" style="width: 120px">
              <el-select
                v-model="resalesTypeValue"
                placeholder="请选择退货类型"
                @change="resalesTypeValues"
                clearable
              >
                <el-option
                  v-for="item in resalesTypeValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="timeChoose el-inputBox" style="width: 500px">
            <div class="el-inputBox-text titleBox">退货时间：</div>
            <div class="timeBox zujianBox">
              <div>
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
          <div class="header-botton">
            <div class="queryBtn" @click="clickQuery">查询</div>
            <div class="clearBtn" @click="clearInput">清空</div>
          </div>
        </div>
      </div>
      <div class="formBox">
        <div class="formTabs">
          <el-tabs type="card" @tab-click="prodAndOrder">
            <el-tab-pane label="已出库">
              <div class="formHeader">
                <div class="icon-title">
                  <div class="icon-title-icon">
                    <img src="../../assets/img/systemTitlemesa.png" />
                  </div>
                  <div class="icon-title-title">{{ title }}</div>
                </div>
                <div class="someBtn">
                  <div class="takeOrdersDiv" @click="yichukuSure">完成</div>
                  <div class="takeOrdersDiv" @click="affirmResales">
                    确认退货
                  </div>
                  <a
                    class="setUser outEduce"
                    @click="chukuEduce"
                    target="_blank"
                    >导出</a
                  >
                </div>
              </div>
              <div class="formTable">
                <el-table
                  :data="storeOutData"
                  border
                  style="width: 100%"
                  @selection-change="outHandleSelectionChange"
                  :stripe="true"
                  tooltip-effect="dark"
                  @cell-click="outLookDetailEvent"
                >
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="60"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orgName"
                    label="委托公司"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orderSourceName"
                    label="订单来源"
                    align="center"
                    min-width="120"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="backOrderNo"
                    label="退单号"
                    align="center"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <div class="lookDetail">
                        {{ scope.row.backOrderNo }}
                      </div>
                    </template> </el-table-column
                  ><el-table-column
                    prop="orderNo"
                    label="订单号"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div class="lookDetail">
                        {{ scope.row.orderNo }}
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="subOrderNos"
                    label="子单号"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div class="subOrderNosList">
                        <div
                          class="lookDetail subOrderNosStyle"
                          v-for="(v, i) in scope.row.subOrderNos"
                          :key="i"
                        >
                          {{ v }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="disposeStatus"
                    label="退单状态"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="returnType"
                    label="退货类型"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="exprName"
                    label="退货物流公司"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="exprNo"
                    label="退货物流单号"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="nickName"
                    label="用户昵称"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="sendContact"
                    label="发货人"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="sendContactPhone"
                    label="发货人电话"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="sendAddr"
                    label="发货地址"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orderContact"
                    label="收货人"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orderContactPhone"
                    label="收货人电话"
                    align="center"
                    min-width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orderAddr"
                    label="收货地址"
                    align="center"
                    min-width="300"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="returnMoneyTime"
                    label="退货时间"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="" label="确认时间" align="center">
                  </el-table-column>
                  <el-table-column prop="" label="入库时间" align="center">
                  </el-table-column>
                </el-table>
              </div>

              <div class="pageComponent">
                <pagecomponent
                  :pageComponentsData="pageComponentsData"
                  @getPageNum="getPageNum"
                  @sureSuccssBtn="sureSuccssBtn"
                ></pagecomponent>
              </div>
            </el-tab-pane>
            <el-tab-pane label="未出库">
              <div class="formHeader">
                <div class="icon-title">
                  <div class="icon-title-icon">
                    <img src="../../assets/img/systemTitlemesa.png" />
                  </div>
                  <div class="icon-title-title">{{ title }}</div>
                </div>
                <div class="someBtn">
                  <div class="takeOrdersDiv" @click="weichukuSure">完成</div>
                  <a
                    class="setUser unOutEduce"
                    @click="weichuEduce"
                    target="_blank"
                    >导出</a
                  >
                </div>
              </div>
              <div class="formTable">
                <el-table
                  :data="unStoreOutData"
                  border
                  style="width: 100%"
                  @selection-change="unOutHandleSelectionChange"
                  :stripe="true"
                  tooltip-effect="dark"
                  @cell-click="unOutLookDetailEvent"
                >
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="60"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orgName"
                    label="委托公司"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orderSourceName"
                    label="订单来源"
                    align="center"
                    min-width="120"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="backOrderNo"
                    label="退单号"
                    align="center"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <div class="lookDetail">
                        {{ scope.row.backOrderNo }}
                      </div>
                    </template> </el-table-column
                  ><el-table-column
                    prop="orderNo"
                    label="订单号"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div class="lookDetail">
                        {{ scope.row.orderNo }}
                      </div>
                    </template> </el-table-column
                  ><el-table-column
                    prop="subOrderNos"
                    label="子单号"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div class="subOrderNosList">
                        <div
                          class="lookDetail subOrderNosStyle"
                          v-for="(v, i) in scope.row.subOrderNos"
                          :key="i"
                        >
                          {{ v }}
                        </div>
                      </div>
                    </template> </el-table-column
                  ><el-table-column
                    prop="disposeStatus"
                    label="退单状态"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="returnType"
                    label="退货类型"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="exprName"
                    label="物流公司"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="exprNo"
                    label="物流单号"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="nickName"
                    label="用户昵称"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orderContact"
                    label="收货人"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orderContactPhone"
                    label="联系电话"
                    align="center"
                    min-width="120"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orderAddr"
                    label="收货地址"
                    align="center"
                    min-width="300"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="returnMoneyTime"
                    label="退货时间"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="" label="确认时间" align="center">
                  </el-table-column>
                  <el-table-column prop="" label="入库时间" align="center">
                  </el-table-column>
                </el-table>
              </div>

              <div class="pageComponent">
                <pagecomponent
                  :pageComponentsData="pageComponentsData1"
                  @getPageNum="getPageNum1"
                  @sureSuccssBtn="sureSuccssBtn1"
                ></pagecomponent>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { Message } from "element-ui";
import dateTime from "../../components/commin/dateTime.vue"; //时间
import { findBackOrderPage, findReturnOrderPage } from "../../api/api";
import { getCookie } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      index: 0,
      title: "已出库信息",
      lotNo: "",
      outGetExcelUrl:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pOrgSubBackOrder/getReturnOrderExcel",
      unOutGetExcelUrl:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pOrgSubBackOrder/getBackOrderExcel",
      storeOutData: [
        // {
        //   backOrderNo: "TH20200305092516647298284",
        //   channelBackOrderNo: "",
        //   disposeStatus: 1,
        //   exprName: "",
        //   exprNo: "",
        //   id: "da148d24db0043c2b5325e72e0b6fcf5",
        //   orderAddr: "硅谷街道硅谷大街益田枫露小区1期3栋",
        //   orderCityName: "长春市",
        //   orderContact: "周秋影",
        //   orderContactPhone: "18686456695",
        //   orderCountyName: "",
        //   orderId: "37E6E46AAECF440883DC10C66A7D31DA",
        //   orderNo: "XS_20200303142834448_769705",
        //   orderProName: "吉林省",
        //   orderSourceId: "7CBF78FF05034EDC855CF4A9C877B477",
        //   orderSourceName: "创客淘宝订单来源",
        //   orgId: "2B82213FE3764E9E96691B70BE5281CD",
        //   orgName: "xxxxxckc委托公司",
        //   returnMoneyTime: null,
        //   returnType: 4,
        //   subOrder: [],
        //   subOrderNos: ["871195073869320914-1", "771696073865320114-1"],
        // },
      ],
      unStoreOutData: [],
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
        placeholder: "请选择开始时间",
      },
      ChildOrderNumberValue: "",
      channelValue: "",
      mateNumValue: "",
      entrustCompany: "",
      indentSourceValue: "",
      orderNumberValue: "",
      ChildOrderState: "",
      prodNameValue: "",
      prodCodeValue: "",
      prodSpecValue: "",
      returnOrderValue: "",
      resalesOrderStateValue: "",
      resalesTypeValue: "",
      resalesOrderStateData: [
        {
          value: "0",
          label: "初始",
        },
        {
          value: "1",
          label: "已取消",
        },
        {
          value: "2",
          label: "待确认",
        },
        {
          value: "3",
          label: "已完成",
        },
      ],
      resalesTypeValueData: [
        {
          value: "1",
          label: "部分退货",
        },
        {
          value: "2",
          label: "全部退货",
        },
        {
          value: "3",
          label: "取消订单",
        },
        {
          value: "4",
          label: "部分退货中",
        },
        {
          value: "5",
          label: "全部退货中",
        },
      ],
      channelValueData: [],
      mateNumValueData: [],
      entrustCompanyData: [],
      indentSourceValueData: [],
      ChildOrderNumberData: [],
      prodSpecValueData: [],
      consigneeValue: "",
      telPhoneValue: "",
      addressValue: "",
      outMultipleSelection: [],
      unOutMultipleSelection: [],
      QueryData: {
        pageNumber: 1,
        pageSize: 10,
        paras: {
          wareId: getCookie("X-Auth-wareId"),
        },
      },
      pageComponentsData: {
        pageNums: 0,
      },
      pageComponentsData1: {
        pageNums: 0,
      },
      startTime: "",
      endTime: "",
    };
  },
  mounted() {
    this.outPageQueryFun();
    this.unOutPageQueryFun();
  },
  watch: {},
  methods: {
    outPageQueryFun() {
      //已出库查询
      let QueryData = this.QueryData;
      findReturnOrderPage(QueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.storeOutData = ok.data.result.list;
          let oDiv = document.querySelectorAll(".subOrderNosStyle");
          let oList = document.querySelector(".subOrderNosList");
          oDiv.forEach((v) => {
            v.style.borderBottom = "1px solid #d2d6e2";
            v.style.padding = "10px";
            v.parentNode.parentNode.style.padding = "0";
            v.parentNode.parentNode.parentNode.style.padding = "0";
          });
          if (oDiv.length > 0) {
            oList.lastChild.style.borderBottom = "0";
          }
          this.changeData(ok.data.result);
          this.storeOutData.forEach((v) => {
            this.entrustCompanyData.push({
              value: v.orgId,
              label: v.orgName,
            });
            this.entrustCompanyData = this.reduceFun(this.entrustCompanyData);
            this.channelValueData.push({
              value: v.channelId,
              label: v.channelName,
            });
            this.channelValueData = this.reduceFun(this.channelValueData);
            this.indentSourceValueData.push({
              value: v.orderSourceId,
              label: v.orderSourceName,
            });
            this.indentSourceValueData = this.reduceFun(
              this.indentSourceValueData
            );
            v.disposeStatus = this.disposeStatus(v.disposeStatus);
            v.returnType = this.returnType(v.returnType);
          });
        } else {
          Message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    },
    unOutPageQueryFun() {
      //未出库查询
      let QueryData = this.QueryData;
      findBackOrderPage(QueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.unStoreOutData = ok.data.result.list;
          this.changeData1(ok.data.result);
          this.unStoreOutData.forEach((v) => {
            v.disposeStatus = this.disposeStatus(v.disposeStatus);
            v.returnType = this.returnType(v.returnType);
          });
        } else {
          Message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    },
    disposeStatus(state) {
      //退单状态
      let data = state;
      switch (state) {
        case 0:
          data = "初始";
          break;
        case 1:
          data = "已取消";
          break;
        case 2:
          data = "待确认";
          break;
        case 3:
          data = "已完成";
          break;
        default:
          data = "未知";
          break;
      }
      return data;
    },
    returnType(state) {
      //退货类型
      let data = state;
      switch (data) {
        case 1:
          data = "部分退货";
          break;
        case 2:
          data = "全部退货";
          break;
        case 3:
          data = "取消订单";
          break;
        case 4:
          data = "部分退货中";
          break;
        case 5:
          data = "全部退货中";
          break;
        default:
          data = "未知";
          break;
      }
      return data;
    },
    reduceFun(arr) {
      let testObj = {};
      let res = arr.reduce((item, next) => {
        testObj[next.value]
          ? ""
          : (testObj[next.value] = true && item.push(next));
        return item;
      }, []);
      return res;
    },
    channelValues(val) {
      this.channelValue = val;
    },
    entrustCompanys(val) {
      this.entrustCompany = val;
    },
    indentSourceValues(val) {
      this.indentSourceValue = val;
    },
    stateChooseValues(val) {
      this.stateChooseValue = val;
    },
    prodSpecValues(val) {
      this.prodSpecValue = val;
    },
    resalesOrderStateValues(val) {
      this.resalesOrderStateValue = val;
    },
    resalesTypeValues(val) {
      this.resalesTypeValue = val;
    },
    clickQuery() {
      //点击查询
      let queryData = {
        pageNumber: 1,
        pageSize: 10,
        paras: {
          wareId: getCookie("X-Auth-wareId"),
          orgId: this.entrustCompany,
          channelId: this.channelValue,
          orderSourceId: this.indentSourceValue,
          orderNo: this.orderNumberValue,
          subOrderNo: this.ChildOrderNumberValue,
          backOrderNo: this.returnOrderValue,
          disposeStatus: this.resalesOrderStateValue,
          returnType: this.resalesTypeValue,
        },
      };
      if (this.title === "已出库信息") {
        findReturnOrderPage(queryData).then((ok) => {
          // console.log(ok);
          if (ok.data.code === "10000") {
            this.storeOutData = ok.data.result.list;
            this.changeData(ok.data.result);
            this.storeOutData.forEach((v) => {
              v.disposeStatus = this.disposeStatus(v.disposeStatus);
              v.returnType = this.returnType(v.returnType);
            });
          } else {
            Message({
              message: "查询失败",
              type: "error",
            });
          }
        });
      } else {
        findBackOrderPage(queryData).then((ok) => {
          // console.log(ok);
          if (ok.data.code === "10000") {
            this.unStoreOutData = ok.data.result.list;
            this.changeData1(ok.data.result);
            this.unStoreOutData.forEach((v) => {
              v.disposeStatus = this.disposeStatus(v.disposeStatus);
              v.returnType = this.returnType(v.returnType);
            });
          } else {
            Message({
              message: "查询失败",
              type: "error",
            });
          }
        });
      }
    },
    clearInput() {
      //点击清空输入框
      this.clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      this.storeOutData = [];
      this.unStoreOutData = [];
      this.outPageQueryFun();
      this.unOutPageQueryFun();
    },
    outHandleSelectionChange(value) {
      this.outMultipleSelection = value;
    },
    unOutHandleSelectionChange(value) {
      this.unOutMultipleSelection = value;
    },
    chukuEduce() {
      //已出库导出表格
      // if (!this.outMultipleSelection.length)
      //   return Message("请选择要导出的订单");
      // if (this.outMultipleSelection.length !== 1)
      //   return Message("一次只能选择一个订单");
      let oA = document.querySelector(".outEduce");
      oA.setAttribute(
        "href",
        `${this.outGetExcelUrl}?wareId=${getCookie("X-Auth-wareId")}`
      );
    },
    weichuEduce() {
      //未出库导出按钮
      // if (!this.unOutMultipleSelection.length)
      //   return Message("请选择要导出的订单");
      // if (this.unOutMultipleSelection.length !== 1)
      //   return Message("一次只能选择一个订单");
      let oA = document.querySelector(".unOutEduce");
      oA.setAttribute(
        "href",
        `${this.unOutGetExcelUrl}?wareId=${getCookie("X-Auth-wareId")}`
      );
    },
    yichukuSure() {
      //已出库完成按钮
      if (!this.outMultipleSelection.length)
        return Message("请选择要强制完成的订单");
      this.$messageSelf
        .confirms(
          `共选择${this.outMultipleSelection.length}个退货订单，确认强制完成吗？`,
          "提示",
          { type: "warning" }
        )
        .then(() => {
          Message("该功能暂时没有");
        })
        .catch(() => {
          Message("已取消");
        });
    },
    weichukuSure() {
      //未出库完成按钮
      if (!this.unOutMultipleSelection.length)
        return Message("请选择要强制完成的订单");
      this.$messageSelf
        .confirms(
          `共选择${this.unOutMultipleSelection.length}个退货订单，确认强制完成吗？`,
          "提示",
          { type: "warning" }
        )
        .then(() => {
          Message("该功能暂时没有");
        })
        .catch(() => {
          Message("已取消");
        });
    },
    affirmResales() {
      //确认退货
      if (!this.outMultipleSelection.length)
        return Message("请选择要确认退货的订单");
      if (this.outMultipleSelection.length !== 1)
        return Message("一次只能选择一个订单");
      this.$router.push({
        path: "/indentManagement/resalesOrderInfor",
        query: {
          sureBtn: this.outMultipleSelection[0],
          type: "sureBtn",
        },
      });
    },
    outLookDetailEvent(row, column, cell) {
      if (column.property === "backOrderNo") {
        if (cell.childNodes[0].childNodes[0].innerHTML !== "") {
          this.$router.push({
            path: "/indentManagement/resalesOrderInfor",
            query: {
              backOrderNo: row,
              type: "backOrderNo",
            },
          });
        }
      }
      if (column.property === "orderNo") {
        if (cell.childNodes[0].childNodes[0].innerHTML !== "") {
          this.$router.push({
            path: "/indentManagement/orderDetail",
            query: {
              orderNo: row,
              type: "orderNo",
            },
          });
        }
      }
      if (column.property === "subOrderNos") {
        if (cell.childNodes[0].childNodes[0].innerHTML !== "") {
          this.$router.push({
            path: "/indentManagement/childOrderDetail",
            query: {
              subOrderNos: row,
              type: "subOrderNos",
            },
          });
        }
      }
    },
    unOutLookDetailEvent(row, column, cell) {
      if (column.property === "backOrderNo") {
        if (cell.childNodes[0].childNodes[0].innerHTML !== "") {
          this.$router.push({
            path: "/indentManagement/resalesOrderInfor",
            query: {
              backOrderNo: row,
              type: "backOrderNo",
            },
          });
        }
      }
      if (column.property === "orderNo") {
        if (cell.childNodes[0].childNodes[0].innerHTML !== "") {
          this.$router.push({
            path: "/indentManagement/orderDetail",
            query: {
              orderNo: row,
              type: "orderNo",
            },
          });
        }
      }
      if (column.property === "subOrderNos") {
        if (cell.childNodes[0].childNodes[0].innerHTML !== "") {
          this.$router.push({
            path: "/indentManagement/childOrderDetail",
            query: {
              subOrderNos: row,
              type: "subOrderNos",
            },
          });
        }
      }
    },
    prodAndOrder(item) {
      this.title = item.label + "信息";
      if (item.label === "未出库") {
        this.resalesOrderStateData = [
          {
            value: "退货中",
            label: "退货中",
          },
          {
            value: "退货成功",
            label: "退货成功",
          },
        ];
      } else {
        this.resalesOrderStateData = [
          {
            value: "0",
            label: "初始",
          },
          {
            value: "1",
            label: "已取消",
          },
          {
            value: "2",
            label: "待确认",
          },
          {
            value: "3",
            label: "已完成",
          },
        ];
      }
    },
    getPageNum(e) {
      this.QueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.storeOutData = [];
      this.outPageQueryFun();
      this.QueryData.pageNumber = e;
    },
    getPageNum1(e) {
      this.QueryData.pageNumber = e;
    },
    sureSuccssBtn1(e) {
      this.unStoreOutData = [];
      this.unOutPageQueryFun();
      this.QueryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    changeData1(data) {
      this.changePageData1(data);
    },
    changePageData1(data) {
      let { totalRow } = data;
      this.pageComponentsData1.pageNums = totalRow;
    },
    getStartTime(e) {
      this.startTime = e;
    },
    getEndTime(e) {
      this.endTime = e;
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

#resalesMianPage {
  background: #eef1f8;
  padding: 20px 10px;
}
.headerHtml {
  position: relative;
  padding: 0 16px;
  .headerInput {
    display: flex;
    flex-wrap: wrap;
    .el-inputBox {
      display: flex;
      align-items: center;
      margin: 0 20px 16px 0;
      .el-inputBox-text {
        white-space: nowrap;
      }
    }
  }
   .header-botton {
    width: 186px;
    height: 36px;
    position: absolute;
    right: 0;
    bottom: 16px;
    display: flex;
    align-items: center;
    .queryBtn {
      @include BtnFunction("success");
    }
    .clearBtn {
      @include BtnFunction();
      background: #fff;
      margin: 0 16px 0 10px;
    }
  }
  .timeChoose {
    display: flex;
    height: 34px;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
    .timeBox {
      height: 34px;
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
.formBox {
  margin: 4px 0;
  .formHeader {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d1d6e2;
    background: white;
    margin-top: 10px;
    .icon-title {
      display: flex;
      margin: 24px 0 0 0;
      .icon-title-icon {
        width: 14px;
        height: 14px;
        margin: 0 0 0 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .icon-title-title {
        margin: -1px 0 0 8px;
        font-size: 16px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 16px 16px 0;
      .setUser {
        @include BtnFunction("success");
      }
      .takeOrdersDiv {
        margin-right: 10px;
        @include BtnFunction("success");
      }
    }
  }
  .formTable {
    background: white;
    padding: 16px;
  }
  .lookDetail {
    color: #599af3;
    text-decoration: underline;
    cursor: pointer;
  }
  .failCause {
    color: red;
  }
}
.pageComponent {
  text-align: right;
  background: #ffffff;
}
</style>
<style lang="scss">
@import "../../assets/scss/btn.scss";
#resalesMianPage {
  .el-tabs__item.is-active {
    @include BtnFunction("success");
  }
  .el-tabs__item {
    @include BtnFunction("");
    background: white;
    margin-right: 10px;
  }
  .el-tabs--card > .el-tabs__header {
    border: none;
  }
  .el-tabs__header {
    margin: 0;
  }
  .entrustCompany {
    .el-select {
      width: 100%;
    }
  }
}
</style>
