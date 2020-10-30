<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox">
        <div class="closeTitle">
          {{ this.$route.query.id ? "编辑出库单" : "创建出库单" }}
        </div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>

      <div class="centerBox">
        <div class="setTitle">
          {{ this.$route.query.id ? "编辑出库单" : "创建出库单" }}
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
                <div class="noneIconTitle mr11">区域名称:</div>
                <div class="mr20">
                  <el-select
                    v-model="createUserData.wareAreaName"
                    @focus="getquyuJsonAndArr"
                    @change="changequyu"
                    placeholder="请选择区域名称"
                  >
                    <el-option
                      v-for="(item, idx) in quyuJson.quyuArr"
                      :key="idx"
                      :label="item.wareAreaName"
                      :value="idx"
                    >
                    </el-option>
                  </el-select>
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
              label="低库存预警值"
              width="119"
              prop="currInventory"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="推荐库位可用库存"
              width="119"
              prop="maxNum"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="申请出库数量*"
              width="119"
              prop="actualProdNum"
              show-overflow-tooltip
            >
              <el-input slot-scope="scope" v-model="scope.row.prodNum">
              </el-input>
            </el-table-column>
            <el-table-column
              label="推荐库位"
              prop="recommendSeatNo"
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
        <div class="tijiaoBox" @click="goAJAXCreate">提交1</div>
      </div>
      <!-- btn -->
      <!-- 添加产品 start -->
      <transition name="fade">
        <div v-if="addChanpins" ref="parentSelect" class="addChanpinClass">
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
import {
  isMobile,
  isEmail,
  getCookie,
  _getArrTarget,
} from "../../utils/validate";
import {
  post,
  getFindWareOrg,
  getFindOrgChildWare,
  getfindOrgProductPage,
  getFindWareHouseDetailByIds,
  getSaveRecord,
  queryAreaOfWS,
  getpOutWarehousefindOutWareDetailById,
  getpOutWarehouseSaveRecord,
  getRecommendSeatByBatchNoAndQualityDate,
} from "../../api/api";
import choiceSelect from "../../components/warehouse/choiceSelectCopy";
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
        pageNumber: 1,
        pageSize: 10,
        putstatus: "0",
        disposeStatus: "0", //处理状态
        expectedSendTime: "", //期望入库时间
        operatorType: 1,
        wareId: getCookie("X-Auth-wareId"),
        childWareId: "",
        remark: "",
        wareAreaId: "",
        wareAreaName: "",
        orgId: "",
        orgName: "",
        childWareName: "",
        pOutWarehouseDetails: [],
        prodIds: [],
        recommendSeatNo: [],
        outWareType: (() => this.$route.query.outWareType)(),
        id: (() => {
          return this.$route.query.id ? this.$route.query.id : "";
        })(),
      },
      getProvinceData: {
        parentCode: 0,
      },
      quyuJson: {
        quyuArr: [],
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
      let EditData = JSON.parse(sessionStorage.getItem("warehouseEdit"));
      this.companyJson.value = EditData.orgName;
      this.createUserData.childWareName = EditData.childWareName;
      this.createUserData.childWareId = EditData.childWareId;
      this.createUserData.orgId = EditData.orgId;
      this.createUserData.createUserData = EditData.createUserData;
      this.createUserData.wareId = EditData.wareId;
      this.createUserData.wareName = EditData.wareName;
      this.createUserData.expectedSendTime = EditData.expectedSendTime;
      this._getpOutWarehousefindOutWareDetailById();
    }
    this.tables = eval(sessionStorage.getItem("_addTablesData"));
    if (this.tables) {
      this.tabledata = this.tables;
      this.createUserData.pOutWarehouseDetails = this.tables;
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
          this.createUserData.pOutWarehouseDetails = this.tables;
        }
      }
    },
  },
  methods: {
    //获取产品明细
    _getpOutWarehousefindOutWareDetailById() {
      getpOutWarehousefindOutWareDetailById(
        {
          ids: this.$route.query.id,
        },
        (data) => {
          data = JSON.parse(data);
          this._changeChangPinMinXi(data.result);
        }
      );
    },
    _changeChangPinMinXi(data) {
      this.tabledata = data;
    },
    //点击区域
    getquyuJsonAndArr() {
      console.log(
        this.createUserData.childWareId,
        "this.createUserData点击区域"
      );
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      if (!this.createUserData.childWareId) return Message("请选择子仓名称");
      // queryAreaOfWS
      queryAreaOfWS(this.createUserData).then((res) => {
        if (res.data.code == "10000") {
          this._changequyuJsonArr(res.data.result);
        } else {
          Message(res.data.data.msg);
        }
      });
    },
    _changequyuJsonArr(arr) {
      this.quyuJson.quyuArr = arr;
    },
    //点击区域select
    changequyu(e) {
      this.createUserData.wareAreaId = this.quyuJson.quyuArr[e].id;
      sessionStorage.setItem(
        "createNabagenentWarehousewareAreaId",
        this.quyuJson.quyuArr[e].id
      );
    },
    getkuweimes(data) {
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      this.targetRow = data;
      let datas = eval(sessionStorage.getItem("_addTablesData"));
      this.createUserData.prodIds = _getArrTarget(datas, "prodId");
      this.$nextTick(() => {
        getRecommendSeatByBatchNoAndQualityDate({
          ...this.createUserData,
        }).then((res) => {
          this._changeKuweiS(res.result, data);
          this.$forceUpdate();
        });
      });
      this.$forceUpdate();
    },
    kuweiChanges(e) {
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      this.targetRow.minNum = this.kueirArr[e].minNum;

      this.targetRow.currInventory = this.kueirArr[e].currInventory;

      this.createUserData.pOutWarehouseDetails[
        this.delistIndex
      ].recommendSeatId = this.kueirArr[e].recommendSeatId;

      this.createUserData.pOutWarehouseDetails[
        this.delistIndex
      ].recommendSeatNo = this.kueirArr[e].recommendSeatNo;

      this.createUserData.pOutWarehouseDetails[
        this.delistIndex
      ].batchNo = this.kueirArr[e].batchNo;

      this.createUserData.pOutWarehouseDetails[
        this.delistIndex
      ].recommendAreaId = this.kueirArr[e].recommendAreaId;

      this.createUserData.pOutWarehouseDetails[
        this.delistIndex
      ].recommendAreaName = this.kueirArr[e].recommendAreaName;

      this.createUserData.pOutWarehouseDetails[
        this.delistIndex
      ].manufTime = this.kueirArr[e].manufTime;
    },
    _changeKuweiS(arr, dataJson) {
      console.log(arr);
      if (!arr.length) return Message("暂时并未有库位，尝试去创建？");
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
      console.log(this.createUserData, "this.createUserData点击委托公司");
      this.createUserData.wareAreaId = "";
      this.createUserData.childWareId = "";
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
      this.createUserData.wareAreaId = ""; //区域id
      this.createUserData.childWareId = ""; //子仓id
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
      sessionStorage.setItem(
        "createManagementChildWareId",
        this.ziCangJson.ziCangArr[e].id
      );
      this.createUserData.wareId = this.ziCangJson.ziCangArr[e].wareId; //仓库id
      this.createUserData.wareName = this.ziCangJson.ziCangArr[e].wareName; //仓库id
      this.createUserData.childWareId = this.ziCangJson.ziCangArr[e].id; //子仓id
      this.createUserData.childWareName = this.ziCangJson.ziCangArr[
        e
      ].childWareName; //子仓姓名
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
    //点击了提交
    async goAJAXCreate() {
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      if (!this.createUserData.childWareId) return Message("请选择子仓名称");
      if (!this.multipleSelection.length)
        return Message("请选择要创建的产品明细");
      this.createUserData.pOutWarehouseDetails = this.multipleSelection;
      let datas = await getpOutWarehouseSaveRecord(this.createUserData);
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

.fade-enter-active,
.fade-leave-active {
  transition: transform 1s;
}

.fade-enter,
	.fade-leave-to

	/* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0);
}

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
