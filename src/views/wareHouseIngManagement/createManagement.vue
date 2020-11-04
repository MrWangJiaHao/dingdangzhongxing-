<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox">
        <div class="closeTitle">
          {{ this.$route.query.id ? "编辑入库单" : "创建入库单" }}
        </div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>

      <div class="centerBox">
        <div class="setTitle">
          {{ this.$route.query.id ? "编辑入库单" : "创建入库单" }}
        </div>
        <div class="gerxinxiBox">
          <div class="xinxiBitian">
            <div>
              <div class="displayalign ellipsis">
                <div class="noneIconTitle mr11">委托公司:</div>
                <div class="mr20">
                  <el-select
                    v-model="companyJson.value"
                    @focus="getCompanyJsonAndArr"
                    @change="changeCompany"
                    placeholder="请选择委托公司"
                  >
                    <el-option
                      v-for="(item, idx) in companyJson.companyArr"
                      :key="idx"
                      :label="item.orgName"
                      :value="idx"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <!-- 委托公司 -->
            <div>
              <div class="displayalign ellipsis">
                <div class="noneIconTitle mr11">子仓名称:</div>
                <div class="mr20">
                  <el-select
                    v-model="createUserData.childWareName"
                    @focus="getZiCangJsonAndArr"
                    @change="changeziCang"
                    placeholder="请选择子仓名称"
                  >
                    <el-option
                      v-for="(item, idx) in ziCangJson.ziCangArr"
                      :key="idx"
                      :label="item.childWareName"
                      :value="idx"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <!-- 根据委托公司查询子仓 getFindOrgChildWare -->
            <div>
              <div class="displayalign ellipsis">
                <div class="noneIconTitle mr11">期望入库时间:</div>
                <div class="mr20">
                  <dateTime
                    :valueDataStart="createUserData.expectedSendTime"
                    :dateTimeData="datetimeDate"
                    @getDateTime="getExpectedSendTime"
                  />
                </div>
              </div>
            </div>
            <!-- 期望入库时间 -->
          </div>
        </div>
      </div>
      <!-- 个人信息 -->
      <div class="pd20">
        <div class="setTitle">产品明细</div>
        <div class="mb20 tr">
          <div class="tijiaoBox disinb mr20" @click="addChanpin">添加产品</div>
          <div class="quxiaoBox disinb" @click="goClearRemove">删除</div>
        </div>
        <div class="mb20">
          <el-table
            ref="multipleTable"
            :data="tabledata"
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
              label="产品编码"
              width="119"
              prop="prodCode"
              show-overflow-tooltip
            />
            <el-table-column
              label="产品名称"
              width="119"
              property="prodName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              width="119"
              label="产品规格"
              prop="specName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="品牌"
              width="119"
              prop="braName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="当前库位产品数量"
              width="119"
              prop="currInventory"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="最大存放数"
              width="119"
              prop="maxNum"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="入库数量*"
              width="119"
              prop="prodNum"
              show-overflow-tooltip
            >
              <el-input slot-scope="scope" v-model="scope.row.prodNum">
              </el-input>
            </el-table-column>
            <el-table-column
              label="推荐库位"
              prop="putEndTime"
              show-overflow-tooltip
              width="180"
            >
              <el-select
                slot-scope="scope"
                v-model="scope.row.recommendSeatNo"
                placeholder="请选择库位"
                @focus="getkuweimes(scope.row)"
                @change="kuweiChanges"
              >
                <el-option
                  v-for="(item, idx) in kueirArr"
                  :key="idx"
                  :label="item.recommendSeatNo"
                  :value="idx"
                >
                </el-option>
              </el-select>
            </el-table-column>
            <el-table-column
              label="期望入库时间"
              prop="expectedSendTime"
              width="200"
              show-overflow-tooltip
            >
              <div slot-scope="scope">
                <div @click="getDateTimeIndex(scope.$index)">
                  <dateTime
                    :valueDataStart="scope.row.manuTime"
                    :dateTimeData="datetimeDate"
                    @getDateTime="getDateTimeExpectedSendTime"
                  />
                </div>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <div class="dispalyFlex mb20">
          <div class="noneIconTitle mr11 fosi0">
            <span class="fosi14" style="visibility: hidden">你好</span>
            <span class="fosi14">备注</span>
            <span class="fosi14" style="visibility: hidden">好</span>
            <span class="fosi14">:</span>
          </div>
          <div class="bzTetxArea">
            <textarea
              placeholder="请输入备注"
              v-model="createUserData.remark"
              maxlength="200"
            ></textarea>
          </div>
        </div>
      </div>
      <!-- 备注 -->
      <!-- 账号信息 -->
      <div class="displayCenter mb20">
        <div class="quxiaoBox mr20" @click="closeBtn">取消</div>
        <div class="tijiaoBox" @click="goAJAXCreate">提交</div>
      </div>
      <!-- btn -->
      <!-- 添加产品 start -->
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div
          v-show="addChanpins"
          ref="parentSelect"
          class="addChanpinClass animate__animated"
        >
          <choiceSelect ref="childSelect" />
        </div>
      </transition>
      <!-- 添加产品 end -->
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import searchBox from "../../components/commin/searchBox"; //搜索框
import dropDowbox from "../../components/commin/dropDownBox"; //下拉框
import dropDownUserType from "../../components/commin/dropDownUserType"; //用户管理下拉框
import dateTime from "../../components/commin/dateTime"; //用户管理下拉框
import { mapState } from "vuex";
import { Message } from "element-ui";
import { isMobile, isEmail, getCookie } from "../../utils/validate";
import {
  post,
  getFindWareOrg,
  getFindOrgChildWare,
  getfindOrgProductPage,
  getFindWareHouseDetailByIds,
  getSaveRecord,
} from "../../api/api";
import choiceSelect from "../../components/manual/choiceSelect";
export default {
  name: "createUsering",
  components: {
    dropDowbox,
    searchBox,
    dropDownUserType,
    choiceSelect,
    dateTime,
  },

  data() {
    return {
      companyJson: {
        companyArr: [],
        value: "",
      },
      datetimeDate: {
        placeholder: "请选择预期入库时间",
      },
      multipleSelection: [],
      tabledata: [],
      addChanpins: false,
      ziCangJson: {
        value: "",
        ziCangArr: [],
      },
      createUserData: {
        putstatus: "0",
        disposeStatus: "0", //处理状态
        expectedSendTime: "", //期望入库时间
        operatorType: 1,
        wareid: getCookie("X-Auth-wareId"),
        childWareId: sessionStorage.getItem("createManagementChildWareId"),
        remark: "",
        orgId: sessionStorage.getItem("orgId"),
        orgName: "",
        childWareName: "",
        detailList: [],
        orderSource: (() => this.$route.query.orderSource)(),
        id: (() => {
          return this.$route.query.id ? this.$route.query.id : "";
        })(),
      },
      sendoutDatas: {
        pageNumber: 1,
        pageSize: 10,
        operatorType: 1,
        wareid: getCookie("X-Auth-wareId"),
        childWareId: (() => {
          return sessionStorage.getItem("createManagementChildWareId");
        })(),
        orgId: sessionStorage.getItem("orgId"),
        orderSource: (() => this.$route.query.orderSource)(),
        paras: {
          prodName: "", //产品名称
          prodCode: "", //产品编码
          specName: "", //产品规格
        },
      },
      getProvinceData: {
        parentCode: 0,
      },
      prodUnitData: [],
      tables: [],
      rowTables: null,
      kueirArr: [],
      targetRow: {},
      delistIndex: null,
    };
  },
  async created() {
    if (this.$route.query.id) {
      let EditData = JSON.parse(sessionStorage.getItem("manualManageMentEdit"));
      this.companyJson.value = EditData.orgName;
      this.createUserData.childWareName = EditData.childWareName;
      this.createUserData.childWareId = EditData.childWareId;
      this.createUserData.orgId = EditData.orgId;
      this.createUserData.createUserData = EditData.createUserData;
      this.createUserData.expectedSendTime = EditData.expectedSendTime;
      this._getFindWareHouseDetailByIds();
    }
    this.tables = eval(sessionStorage.getItem("_addTablesData"));
    if (this.tables) {
      this.tabledata = this.tables;
      this.createUserData.detailList = this.tables;
    }
  },
  destroyed() {
    sessionStorage.removeItem("manualManageMentEdit");
    sessionStorage.removeItem("_addTablesData");
  },
  watch: {
    addChanpins(n) {
      if (!n) {
        this.tables = eval(sessionStorage.getItem("_addTablesData"));
        if (this.tables) {
          this.tabledata = this.tables;
          this.createUserData.detailList = this.tables;
        }
      }
    },
  },
  methods: {
    //获取产品明细
    _getFindWareHouseDetailByIds() {
      getFindWareHouseDetailByIds({ ids: this.$route.query.id }, (data) => {
        data = JSON.parse(data);
        this._changeChangPinMinXi(data.result);
      });
    },
    _changeChangPinMinXi(data) {
      this.tabledata = data;
    },
    //期望入库时间
    getExpectedSendTime(e) {
      this.createUserData.expectedSendTime = e;
    },
    getkuweimes(data) {
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      this.targetRow = data;
      this.$nextTick(() => {
        getfindOrgProductPage(this.sendoutDatas).then((res) => {
          this._changeKuweiS(res.result.list, data);
          this.$forceUpdate();
        });
      });
      this.$forceUpdate();
    },
    kuweiChanges(e) {
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      this.targetRow.maxNum = this.kueirArr[e].maxNum;
      this.targetRow.currInventory = this.kueirArr[e].currInventory;
      this.createUserData.detailList[
        this.delistIndex
      ].recommendSeatId = this.kueirArr[e].recommendSeatId;
      this.createUserData.detailList[
        this.delistIndex
      ].recommendSeatNo = this.kueirArr[e].recommendSeatNo;
      this.createUserData.detailList[
        this.delistIndex
      ].recommendAreaId = this.kueirArr[e].recommendAreaId;
      this.createUserData.detailList[
        this.delistIndex
      ].recommendAreaName = this.kueirArr[e].recommendAreaName;
    },
    _changeKuweiS(arr, dataJson) {
      this.$nextTick(() => {
        arr.forEach((item, idx) => {
          if (item.prodCode == dataJson.prodCode) {
            this.kueirArr = item.prodSeatList;
            this.delistIndex = idx;
            this.$forceUpdate();
          }
        });
        this.$forceUpdate();
      });
    },
    //点击选择委托公司
    async getCompanyJsonAndArr() {
      let datas = await getFindWareOrg();
      this.companyJson.companyArr = datas.result;
    },
    getDateTimeExpectedSendTime(e) {
      this.tabledata[+this.rowTables].expectedSendTime = e;
      this.tabledata[+this.rowTables].manuTime = e;
    },
    getDateTimeIndex(e) {
      this.rowTables = e;
    },
    //改变委托公司
    changeCompany(e) {
      this.createUserData.orgId = this.companyJson.companyArr[e].id;
      this.createUserData.orgName = this.companyJson.companyArr[e].orgName;
    },
    //点击了子仓名称
    async getZiCangJsonAndArr() {
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      let datas = await getFindOrgChildWare(this.createUserData.orgId);
      this.ziCangJson.ziCangArr = datas.result;
    },
    goClearRemove() {
      this.multipleSelection.forEach((item) => {
        let idxs = this.tabledata.indexOf(item);
        this.tabledata.splice(idxs, 1);
        sessionStorage.setItem(
          "_addTablesData",
          JSON.stringify(this.tabledata)
        );
      });
    },
    //改变了子仓名称
    changeziCang(e) {
      this.createUserData.childWareId = this.ziCangJson.ziCangArr[e].id;
      sessionStorage.setItem(
        "createManagementChildWareId",
        this.ziCangJson.ziCangArr[e].id
      );
      this.createUserData.wareId = this.ziCangJson.ziCangArr[e].wareId;
      this.createUserData.childWareName = this.ziCangJson.ziCangArr[
        e
      ].childWareName;
    },
    //点击了添加产品
    addChanpin() {
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      if (!sessionStorage.getItem("createManagementChildWareId"))
        return Message("请选择子仓名称");
      this.addChanpins = true;
      sessionStorage.setItem("orgId", this.createUserData.orgId);
    },
    //关闭
    closeBtn() {
      this.$router.go(-1);
    },
    handleSelectionChange(e) {
      this.multipleSelection = e;
    },
    async _goAJAXCreate() {
      let datas = await getSaveRecord(this.createUserData);
      console.log(datas);
    },
    //点击了提交
    async goAJAXCreate() {
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      if (!this.createUserData.childWareId) return Message("请选择子仓名称");
      if (!this.multipleSelection.length)
        return Message("请选择要创建的产品明细");
      this.createUserData.detailList = this.multipleSelection;
      let datas = await getSaveRecord(this.createUserData);
      if (datas.code == "10000") {
        sessionStorage.removeItem("_addTablesData");
        sessionStorage.removeItem("createManagementChildWareId");
        this.closeBtn();
      }
    },
    getUserType(e) {
      //获取创建的用户类型
      this.createUserData.codeValue = e.codeValue;
      this.createUserData.roleId = e.roleId;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";
.setUserIngBox {
  background: rgb(232, 233, 236);
  padding: 0 10px;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  .headerBox {
    height: 50px;
    border-radius: 3px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    background: rgb(236, 241, 247);
    border-bottom: 1px solid #d1d6e2;
  }
  .addChanpinClass {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 980px;
    z-index: 44;
    background: #f8f8f8;
    transform: translate(-50%, -50%);
  }
  .setUserIngBoxCenter {
    position: relative;
    left: 50%;
    top: 144px;
    transform: translateX(-50%);
    background: #fff;
    width: 1000px;
    .centerBox {
      padding: 30px 20px;
    }
    .setTitle {
      margin-bottom: 18px;
    }
    .gerxinxiBox {
      display: flex;
      flex-direction: column;
      > div {
        margin-bottom: 18px;
      }
      .xinxiBitian {
        display: flex;
        align-items: center;
        > div {
          margin-right: 20px;
        }
      }
    }

    .cityBoxCenter {
      display: flex;
      align-items: center;
    }
  }
  .textAreaBox {
    font-size: 14px;
    width: 72%;
    height: 40px;
    margin-left: 80px;
    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
    }
    margin-bottom: 30px;
  }
  .bzTetxArea {
    font-size: 14px;
    width: 72%;
    height: 80px;
    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 30px;
      overflow: hidden;
    }
  }
  .quxiaoBox {
    @include BtnFunction("error");
  }
  .tijiaoBox {
    @include BtnFunction("success");
  }
}
</style>