<template>
  <div id="storageLocalMap">
    <!-- 这里库位映射的页面 -->
    <div class="inputBoxs">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="delegaCompany entrustCompany">
            <div class="roleName-text">委托公司：</div>
            <div class="roleName-checkBox" style="width: 320px">
              <el-select
                v-model="delegaCompanyValue"
                placeholder="请选择委托公司"
                @change="delegaCompanyValues"
              >
                <el-option
                  v-for="item in delegaCompanyData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="productName">
            <div class="roleName-text">产品名称：</div>
            <div class="roleName-checkBox" style="width: 400px">
              <el-input placeholder="请输入产品名称" v-model="productName" clearable>
              </el-input>
            </div>
          </div>
          <div class="productCode">
            <div class="roleName-text">产品编码：</div>
            <div class="roleName-checkBox" style="width: 160px">
              <el-input placeholder="请输入产品编码" v-model="productCode" clearable>
              </el-input>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">子仓名称：</div>
            <div class="roleName-checkBox" style="width: 160px">
              <el-select
                v-model="nameValue"
                placeholder="请选择子仓名称"
                @change="nameValues"
              >
                <el-option
                  v-for="item in childWarehouseName"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="areaName">
            <div class="roleName-text">存放区域：</div>
            <div class="roleName-checkBox" style="width: 150px">
              <el-select
                v-model="placeAreaValue"
                placeholder="请选择存放区域"
                @change="placeAreaValues"
              >
                <el-option
                  v-for="item in placeAreaData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="areaType">
            <div class="roleName-text">存放货架：</div>
            <div class="roleName-checkBox" style="width: 150px">
              <el-select
                v-model="placeShelfValue"
                placeholder="请选择存放货架"
                @change="placeShelfValues"
              >
                <el-option
                  v-for="item in placeShelfData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="shelfName">
            <div class="roleName-text">存放层：</div>
            <div class="roleName-checkBox" style="width: 120px">
              <el-select
                v-model="placeTierValue"
                placeholder="请选择层数"
                @change="placeTierValues"
              >
                <el-option
                  v-for="item in placeTierData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="tierChoose">
            <div class="roleName-text">拣货区域：</div>
            <div class="roleName-checkBox" style="width: 150px">
              <el-select
                v-model="pickAreaValue"
                placeholder="请选择拣货区域"
                @change="pickAreaValues"
              >
                <el-option
                  v-for="item in pickAreaData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="storageLocalChoose">
            <div class="roleName-text">拣货货架：</div>
            <div class="roleName-checkBox" style="width: 150px">
              <el-select
                v-model="pickShelfValue"
                placeholder="请选择拣货货架"
                @change="pickShelfValues"
              >
                <el-option
                  v-for="item in pickShelfData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="storageLocalChoose">
            <div class="roleName-text">拣货层：</div>
            <div class="roleName-checkBox" style="width: 120px">
              <el-select
                v-model="pickTierValue"
                placeholder="请选择层数"
                @change="pickTierValue"
              >
                <el-option
                  v-for="item in pickTierfData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="pickSL">
            <div class="roleName-text">拣货库位：</div>
            <div class="roleName-checkBox" style="width: 160px">
              <el-input placeholder="请输入拣货库位" v-model="pickSL" clearable>
              </el-input>
            </div>
          </div>
        </div>
        <div class="roleName-botton">
          <div class="queryBtn" @click="clickQuery">查询</div>
          <div class="clearBtn" @click="clearInput">清空</div>
        </div>
      </div>
      <!-- --------------------------------------------------------------------------------------------------------------------------------------- -->
    </div>
    <div class="formBox">
      <div class="formTabs">
        <el-tabs type="card" @tab-click="tabClick">
          <el-tab-pane label="存储区库位">
            <div class="childWarehouseForm">
              <div class="formHeader">
                <div class="icon-title">
                  <div class="icon-title-icon">
                    <img src="../../assets/img/systemTitlemesa.png" />
                  </div>
                  <div class="icon-title-title">查询结果</div>
                </div>
                <div class="someBtn">
                  <div class="setUser" @click="create">创建</div>
                  <div class="bianjiUser" @click="storeEdit">编辑</div>
                  <div class="remove" @click="storeDel">删除</div>
                </div>
              </div>
              <div class="resultForm">
                <el-table
                  :data="storeTableData"
                  border
                  style="width: 100%"
                  @selection-change="storeHandleSelectionChange"
                  :stripe="true"
                  tooltip-effect="dark"
                >
                  <el-table-column
                    type="selection"
                    width="82"
                    align="center"
                    fixed="left"
                  >
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="71"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orgName"
                    label="委托公司"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="prodFullName"
                    label="产品名称"
                    align="center"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="prodCode"
                    label="产品编号"
                    align="center"
                    width="170"
                    min-width="170"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="specName"
                    label="产品规格"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="braName" label="品牌" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="childWareName"
                    label="子仓名称"
                    align="center"
                    width="160"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="wareAreaName"
                    label="存储区"
                    align="center"
                    show-overflow-tooltip
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    prop="wareSeatCode1"
                    label="存储货架"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="wareSeatCode2"
                    label="存储层"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="wareSeatCode"
                    label="存储库位"
                    align="center"
                    min-width="140"
                  >
                    <template slot-scope="scope">
                      <div class="lookDeatil" @click="lookStoreSeat(scope.row)">
                        {{ scope.row.wareSeatCode }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="createUser"
                    label="创建人"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="创建时间"
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
          </el-tab-pane>
          <el-tab-pane label="拣货区库位">
            <div class="childWarehouseForm">
              <div class="formHeader">
                <div class="icon-title">
                  <div class="icon-title-icon">
                    <img src="../../assets/img/systemTitlemesa.png" />
                  </div>
                  <div class="icon-title-title">查询结果</div>
                </div>
                <div class="someBtn">
                  <div class="setUser" @click="create">创建</div>
                  <div class="bianjiUser" @click="pickEdit">编辑</div>
                  <div class="remove" @click="pickDel">删除</div>
                </div>
              </div>
              <div class="resultForm">
                <el-table
                  :data="pickTableData"
                  border
                  style="width: 100%"
                  @selection-change="pickHandleSelectionChange"
                  :stripe="true"
                  tooltip-effect="dark"
                >
                  <el-table-column
                    type="selection"
                    width="82"
                    align="center"
                    fixed="left"
                  >
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="71"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orgName"
                    label="委托公司"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="prodFullName"
                    label="产品名称"
                    align="center"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="prodCode"
                    label="产品编号"
                    align="center"
                    width="170"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="specName"
                    label="产品规格"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="braName" label="品牌" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="childWareName"
                    label="子仓名称"
                    align="center"
                    width="160"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="wareAreaName"
                    label="拣货区"
                    align="center"
                    width="150"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="wareSeatCode1"
                    label="拣货货架"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="wareSeatCode2"
                    label="拣货层"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="wareSeatCode"
                    label="拣货库位"
                    align="center"
                    min-width="140"
                  >
                    <template slot-scope="scope">
                      <div class="lookDeatil" @click="lookPickSeat(scope.row)">
                        {{ scope.row.wareSeatCode }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="createUser"
                    label="创建人"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="创建时间"
                    min-width="180"
                  ></el-table-column>
                </el-table>
                <div class="pageComponent">
                  <pagecomponent
                    :pageComponentsData="pageComponentsData1"
                    @getPageNum="getPageNum1"
                    @sureSuccssBtn="sureSuccssBtn1"
                  ></pagecomponent>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      custom-class="animate__animated animate__zoomIn"
    >
      <div class="dialogBox">
        <storageLocalDetail :seatCodeData="seatCodeData"></storageLocalDetail>
      </div>
      <div slot="footer" class="dialog-footer">
        <div @click="dialogFormVisible = false" class="quxiaoBox">关 闭</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent";
import storageLocalDetail from "./storageLocalDetail";
import {
  TJquery_WH_Request,
  storeMapRelation,
  queryAreaOfWS,
  areaShelfQuery,
  delStoreMapRelation,
} from "../../api/api";
import { getCookie } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    storageLocalDetail,
  },
  data() {
    return {
      tabLabel: "0",
      title: "库位信息",
      seatCodeData: "",
      dialogFormVisible: false,
      storeTableData: [],
      pickTableData: [],
      storageArea1: "存储区",
      storageShelf1: "存储货架",
      storageTier1: "存储层",
      storageUnit1: "存储库位",
      storageArea2: "拣货区",
      storageShelf2: "拣货货架",
      storageTier2: "拣货层",
      storageUnit2: "拣货库位",
      //----------------------------------------------
      delegaCompanyValue: "",
      productName: "",
      productCode: "",
      nameValue: "",
      placeAreaValue: "",
      placeShelfValue: "",
      placeTierValue: "",
      pickAreaValue: "",
      pickShelfValue: "",
      pickTierValue: "",
      pickSL: "",
      //委托公司
      delegaCompanyData: [],
      childWarehouseName: [],
      placeAreaData: [],
      placeShelfData: [],
      placeTierData: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
      ],
      pickAreaData: [],
      pickShelfData: [],
      pickTierfData: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
      ],
      storeMultipleSelection: [],
      pickMultipleSelection: [],
      pageComponentsData: {
        pageNums: 0,
      },
      pageComponentsData1: {
        pageNums: 0,
      },
      childStoreData: [],
      pagingQueryData: {
        pageNumber: 1,
        pageSize: 10,
        paras: {
          childWareId: "", //子仓ID
          wareAreaId: "", //区域ID
          wareAreaType: "", //区域类型
          wareShelfId: "", //货架
          shelfLevelNum: "", //货架层数
          wareSeatCode: "", //库位编号
          id: "", //货架ID
        },
      },
      CSandareaData: [],
      shelfResList: [],
      orgId: "",
      queryData: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          orgId: "",
          prodName: "",
          prodCode: "",
          childWareId: "",
          wareAreaId: "",
        },
      },
    };
  },
  mounted() {
    this.delegaCompanyData = this.$store.state.orgInfor.orgInforData;
    this.storefenyeQuery();
    this.pickfenyeQuery();
    //查询子仓名称的请求
    TJquery_WH_Request({ wareId: getCookie("X-Auth-wareId"), id: "" }).then(
      (ok) => {
        // console.log(ok)
        if (ok.data.code === "10000") {
          this.childStoreData = ok.data.result;
          this.childStoreData.forEach((v) => {
            this.childWarehouseName.push({
              value: v.id,
              label: v.childWareName,
            });
          });
        }
      }
    );
    queryAreaOfWS({ childWareId: "", id: "" }).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        this.CSandareaData = ok.data.result;
      }
    });
  },
  methods: {
    storefenyeQuery() {
      this.queryData.paras.seatType = "1";
      storeMapRelation(this.queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.storeTableData = [];
          this.storeTableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.storeTableData.forEach((v) => {
            v.wareSeatCode1 = v.wareSeatCode.split("-")[1];
            v.wareSeatCode2 = v.wareSeatCode.split("-")[3];
          });
        }
      });
    },
    pickfenyeQuery() {
      this.queryData.paras.seatType = "2";
      storeMapRelation(this.queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.pickTableData = [];
          this.pickTableData = ok.data.result.list;
          this.changeData1(ok.data.result);
          this.pickTableData.forEach((v) => {
            v.wareSeatCode1 = v.wareSeatCode.split("-")[1];
            v.wareSeatCode2 = v.wareSeatCode.split("-")[3];
          });
        }
      });
    },
    delegaCompanyValues(value) {
      this.queryData.paras.orgId = value;
    },
    nameValues(value) {
      this.queryData.paras.childWareId = value;
      this.CSandareaData.forEach((v) => {
        if (value === v.childWareId) {
          if (v.wareAreaType === 1) {
            this.placeAreaData.push({
              value: v.id,
              label: v.wareAreaName,
            });
          }
          if (v.wareAreaType === 2) {
            this.pickAreaData.push({
              value: v.id,
              label: v.wareAreaName,
            });
          }
        }
      });
    },
    placeAreaValues(value) {
      this.queryData.paras.wareAreaId = value;
      areaShelfQuery({ wareAreaId: value, id: "" }).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.shelfResList = ok.data.result;
          this.shelfResList.forEach((v) => {
            this.placeShelfData.push({
              value: v.shelfName,
              label: v.shelfName,
            });
          });
        }
      });
    },
    placeShelfValues(value) {
      this.queryData.paras.shelfName = value;
    },

    clickQuery() {
      //点击查询
      this.queryData.paras.prodName = this.productName;
      this.queryData.paras.prodCode = this.productCode;
      this.queryData.paras.wareSeatCode = this.pickSL;
      console.log(this.queryData);
      if (this.tabLabel === "0") {
        this.storefenyeQuery();
      } else if (this.tabLabel === "1") {
        this.pickfenyeQuery();
      }
    },
    clearInput() {
      //点击清空
      this.delegaCompanyValue = "";
      this.productName = "";
      this.productCode = "";
      this.nameValue = "";
      this.placeAreaValue = "";
      this.placeShelfValue = "";
      this.placeTierValue = "";
      this.pickAreaValue = "";
      this.pickShelfValue = "";
      this.pickTierValue = "";
      this.pickSL = "";
      Object.keys(this.queryData.paras).forEach((v) => {
        this.queryData.paras[v] = "";
      });
      this.pickfenyeQuery();
      this.storefenyeQuery();
    },

    storeHandleSelectionChange(value) {
      this.storeMultipleSelection = value;
    },
    pickHandleSelectionChange(value) {
      this.pickMultipleSelection = value;
    },
    create() {
      //创建库位
      this.$router.push({
        path: "/storageLocalMap/storeLocalBindProduct",
        query: { type: "create" },
      });
    },
    storeEdit() {
      //存储区编辑操作
      if (!this.storeMultipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要编辑的库位",
          type: "warning",
        });
      if (this.storeMultipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能编辑一条库位信息",
          type: "warning",
        });
      this.$router.push({
        path: "/storageLocalMap/storeLocalBindProduct",
        query: { datas: this.storeMultipleSelection, type: "edit" },
      });
    },
    pickEdit() {
      //拣货区编辑操作
      if (!this.pickMultipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要编辑的库位",
          type: "warning",
        });
      if (this.pickMultipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能编辑一条库位信息",
          type: "warning",
        });
      this.$router.push({
        path: "/storageLocalMap/storeLocalBindProduct",
        query: { datas: this.pickMultipleSelection, type: "edit" },
      });
    },
    storeDel() {
      //存储区删除操作
      let arr = [];
      this.storeMultipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length)
        return this.$messageSelf.message({
          message: "请选择要删除的库位",
          type: "warning",
        });
      this.$messageSelf
        .confirms("确定要删除吗？", "删除提示", {
          type: "info",
        })
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {});
    },
    pickDel() {
      //拣货区删除操作
      let arr = [];
      this.pickMultipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length)
        return this.$messageSelf.message({
          message: "请选择要删除的库位",
          type: "warning",
        });
      this.$messaheSelf
        .confirms("确定要删除吗？", "删除提示", {
          type: "info",
        })
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {});
    },
    delRequest(data) {
      //删除的请求
      delStoreMapRelation(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "删除成功",
          });
          this.storefenyeQuery();
          this.pickfenyeQuery();
        } else {
          this.$messageSelf.message({
            type: "error",
            message: "删除失败",
          });
        }
      });
    },
    lookStoreSeat(data) {
      this.seatCodeData = data;
      this.dialogFormVisible = true;
    },
    lookPickSeat(data) {
      this.seatCodeData = data;
      this.dialogFormVisible = true;
    },
    placeTierValues(value) {
      this.placeTierValue = value;
    },
    pickAreaValues(value) {
      this.queryData.paras.wareAreaId = value;
      areaShelfQuery({ wareAreaId: value, id: "" }).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.shelfResList = ok.data.result;
          this.shelfResList.forEach((v) => {
            this.pickShelfData.push({
              value: v.shelfName,
              label: v.shelfName,
            });
          });
        }
      });
    },
    pickShelfValues(value) {
      this.pickShelfValue = value;
    },
    pickTierValues(value) {
      this.pickTierValue = value;
    },
    tabClick(a) {
      if (a.index === "0") {
        this.tabLabel = "0";
      } else {
        this.tabLabel = "1";
      }
    },
    getPageNum(e) {
      this.storePageNumber = e;
    },
    sureSuccssBtn(e) {
      this.storefenyeQuery();
      this.storePageNumber = e;
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },

    getPageNum1(e) {
      this.pickPageNumber = e;
    },
    sureSuccssBtn1(e) {
      this.pickfenyeQuery();
      this.pickPageNumber = e;
    },
    changeData1(data) {
      this.changePageData1(data);
    },
    changePageData1(data) {
      let { totalRow } = data;
      this.pageComponentsData1.pageNums = totalRow;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";
#storageLocalMap {
  padding: 20px 10px;
  background: #eef1f8;
  .formBox {
    position: relative;
    .childWarehouseForm {
      margin: 4px 0;
      background: white;
      .formHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d1d6e2;
        .icon-title {
          display: flex;
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
            margin: 0 0 0 8px;
          }
        }
        .someBtn {
          display: flex;
          margin: 16px 20px 16px 0;
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
        }
      }
      .resultForm {
        padding: 16px 20px;
      }
    }
  }
  .publicStyle {
    margin: 0 20px 16px 0;
    display: flex;
    align-items: center;
  }
  .roleName-choose {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    .name_type {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      .delegaCompany {
        @extend .publicStyle;
      }
      .productCode {
        @extend .publicStyle;
      }
      .productName {
        @extend .publicStyle;
      }
      .nameBox {
        @extend .publicStyle;
      }
      .areaName {
        @extend .publicStyle;
      }
      .areaType {
        @extend .publicStyle;
      }
      .shelfName {
        @extend .publicStyle;
      }
      .tierChoose {
        @extend .publicStyle;
      }
      .storageLocalChoose {
        @extend .publicStyle;
      }
      .storageLocalChoose {
        @extend .publicStyle;
      }
      .pickSL {
        @extend .publicStyle;
      }
    }
    .roleName-botton {
      display: flex;
      align-items: center;
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
  }
}
</style>

<style lang="scss">
@import "../../assets/scss/btn.scss";
#storageLocalMap {
  .el-tabs__item.is-active {
    @include BtnFunction("success");
    border: 1px solid transparent;
  }
  .el-tabs__item {
    @include BtnFunction("");
    background: white;
    margin-right: 10px;
    border: 1px solid #d1d6e2;
  }
  .el-tabs--card > .el-tabs__header {
    border: none;
    position: absolute;
    left: 118px;
    top: 20px;
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
<style lang="scss">
@import "../../assets/scss/btn.scss";

#storageLocalMap {
  .el-dialog {
    width: 900px;
    border-radius: 4px;
    .el-dialog__header {
      padding: 0 20px;
      font-weight: 600;
      height: 50px;
      width: 100%;
      line-height: 50px;
      background: #ecf1f7;
      .el-dialog__headerbtn {
        top: 0;
      }
    }
    .el-dialog__body {
      width: 100%;
      border-top: 1px solid #d1d6e2;
      border-bottom: 1px solid #d1d6e2;
      padding: 20px;
      height: 407px;
      overflow-y: auto;
    }
    .el-dialog__footer {
      width: 100%;
      height: 76px;
      padding: 0 20px;
      .dialog-footer {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .quxiaoBox {
          @include BtnFunction();
        }
      }
    }
  }
}
</style>