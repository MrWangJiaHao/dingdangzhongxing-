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
              <el-input placeholder="模糊搜索" v-model="productName" clearable>
              </el-input>
            </div>
          </div>
          <div class="productCode">
            <div class="roleName-text">产品编码：</div>
            <div class="roleName-checkBox" style="width: 160px">
              <el-input placeholder="模糊搜索" v-model="productCode" clearable>
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
                @change="pickAreaValue"
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
                @change="pickShelfValue"
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
              <el-input placeholder="模糊搜索" v-model="pickSL" clearable>
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
        <el-tabs type="card">
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
                  @cell-click="lookDetail"
                >
                  <el-table-column type="selection" width="55" align="center">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="55"
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
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="wareAreaName"
                    label="存储区"
                    align="center"
                    show-overflow-tooltip
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
                      <div class="lookDetail">{{ scope.row.wareSeatCode }}</div>
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
                    align="center"
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
                  @cell-click="lookDetail"
                >
                  <el-table-column type="selection" width="55" align="center">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="55"
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
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="wareAreaName"
                    label="拣货区"
                    align="center"
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
                      <div class="lookDetail">{{ scope.row.wareSeatCode }}</div>
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
                    align="center"
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
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent";
import {
  query_WH_Request,
  storeMapRelation,
  queryAreaOfWS,
  queryEntrustCompany,
  areaShelfQuery,
  delStoreMapRelation,
} from "../../api/api";
import { getCookie } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
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
        //分页查询
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
      areaData: {
        childWareId: "",
        id: "",
      },
      CSandareaData: [],
      areaShelfQueryData: {
        id: "",
        wareAreaId: "",
      },
      shelfResList: [],
      orgId: "",
      storePageNumber: "1",
      pickPageNumber: "1",
    };
  },
  mounted() {
    //查询库位映射关系
    this.storefenyeQuery();
    this.pickfenyeQuery();
    //查询子仓名称的请求
    let queryData = this.pagingQueryData;
    query_WH_Request(queryData).then((ok) => {
      if (ok.data.code === "10000") {
        this.childStoreData = ok.data.result.list;
        this.childStoreData.forEach((v) => {
          this.childWarehouseName.push({
            value: v.childWareName,
            label: v.childWareName,
          });
        });
      } else {
        this.$messageSelf.message({
          type: "error",
          message: "未知错误",
        });
      }
    });

    let data1 = this.areaData;
    queryAreaOfWS(data1).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        this.CSandareaData = ok.data.result;
      }
    });
    let EntrustCompanyData = {
      wareId: getCookie("X-Auth-wareId"),
    };
    queryEntrustCompany(EntrustCompanyData).then((ok) => {
      // console.log(ok);
      if (ok.code === "10000") {
        let res = ok.result;
        res.forEach((v) => {
          this.delegaCompanyData.push({
            value: v.orgId,
            label: v.orgName,
          });
        });
      }
    });
  },
  methods: {
    storefenyeQuery() {
      this.storeTableData = [];
      let queryData = {
        orderBy: "createTime",
        pageNumber: this.storePageNumber,
        pageSize: 10,
        paras: {
          orgId: "", //委托公司id
          prodName: "", //产品名称
          prodCode: "", //产品编码
          childWareId: "", //子仓id
          wareAreaId: "", //区域id
        },
      };
      storeMapRelation(queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          let res = ok.data.result.list;
          this.changeData(ok.data.result);
          res.forEach((v) => {
            if (v.seatType === 1) {
              this.storeTableData.push(v);
              this.storeTableData.forEach((v) => {
                v.wareSeatCode1 = v.wareSeatCode.split("-")[1];
                v.wareSeatCode2 = v.wareSeatCode.split("-")[3];
              });
            }
          });
        }
      });
    },
    pickfenyeQuery() {
      this.pickTableData = [];
      let queryData = {
        orderBy: "createTime",
        pageNumber: this.pickPageNumber,
        pageSize: 10,
        paras: {
          orgId: "", //委托公司id
          prodName: "", //产品名称
          prodCode: "", //产品编码
          childWareId: "", //子仓id
          wareAreaId: "", //区域id
        },
      };
      storeMapRelation(queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          let res = ok.data.result.list;
          this.changeData1(ok.data.result);
          res.forEach((v) => {
            if (v.seatType === 2) {
              this.pickTableData.push(v);
              this.pickTableData.forEach((v) => {
                v.wareSeatCode1 = v.wareSeatCode.split("-")[1];
                v.wareSeatCode2 = v.wareSeatCode.split("-")[3];
                this.pickAreaData.push({
                  value: v.wareAreaId,
                  label: v.wareAreaName,
                });
                this.pickAreaData = this.reduceFun(this.pickAreaData);
                this.pickShelfData.push({
                  value: v.wareSeatId,
                  label: v.wareSeatName,
                });
                this.pickShelfData = this.reduceFun(this.pickShelfData);
              });
            }
          });
        }
      });
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
    delegaCompanyValues(value) {
      this.orgId = value;
    },
    nameValues(value) {
      this.nameValue = value;
      this.childStoreData.forEach((v) => {
        if (value === v.childWareName) {
          this.pagingQueryData.paras.childWareId = v.id;
        }
      });
      this.CSandareaData.forEach((v) => {
        if (value === v.childWareName) {
          this.placeAreaData.push({
            value: v.wareAreaName,
            label: v.wareAreaName,
          });
        }
      });
    },
    placeAreaValues(value) {
      this.placeAreaValue = value;
      this.pagingQueryData.paras.prodCode = value;
      this.CSandareaData.forEach((v) => {
        if (value === v.wareAreaName) {
          this.pagingQueryData.paras.wareAreaId = v.id;
          this.areaShelfQueryData.wareAreaId = v.id;
        }
      });
      let areaShelfQueryData = this.areaShelfQueryData;
      areaShelfQuery(areaShelfQueryData).then((ok) => {
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
      this.placeShelfValue = value;
    },
    placeTierValues(value) {
      this.placeTierValue = value;
    },
    pickAreaValues(value) {
      this.pickAreaValue = value;
    },
    pickShelfValues(value) {
      this.pickShelfValue = value;
    },
    pickTierValues(value) {
      this.pickTierValue = value;
    },
    clickQuery() {
      //点击查询
      this.storeTableData = [];
      this.pickTableData = [];
      let queryData = {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          orgId: this.orgId, //委托公司id
          prodName: this.productName, //产品名称
          prodCode: this.productCode, //产品编码
          childWareId: this.pagingQueryData.paras.childWareId, //子仓id
          wareAreaId: this.pagingQueryData.paras.wareAreaId, //区域id
          wareSeatCode: this.pickSL,
        },
      };
      storeMapRelation(queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          let res = ok.data.result.list;
          res.forEach((v) => {
            if (v.seatType === 1) {
              this.storeTableData.push(v);
              v.wareSeatCode1 = v.wareSeatCode.split("-")[1];
              v.wareSeatCode2 = v.wareSeatCode.split("-")[3];
            } else if (v.seatType === 2) {
              this.pickTableData.push(v);
              v.wareSeatCode1 = v.wareSeatCode.split("-")[1];
              v.wareSeatCode2 = v.wareSeatCode.split("-")[3];
            }
          });
        } else {
          this.$messageSelf.message({
            type: "error",
            message: "未知错误",
          });
        }
      });
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
        path: "/storageLocalMap/SLmapInfor",
        query: { datas: this.multipleSelection, type: "create" },
      });
    },
    storeEdit() {
      //存储区编辑操作
      if (!this.storeMultipleSelection.length)
        return this.$messageSelf.message("请选择要编辑的库位");
      if (this.storeMultipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能编辑一条库位信息，请重新选择",
          type: "warning",
        });
      this.$router.push({
        path: "/storageLocalMap/SLmapInfor",
        query: { datas: this.storeMultipleSelection, type: "edit" },
      });
    },
    pickEdit() {
      //拣货区编辑操作
      if (!this.pickMultipleSelection.length)
        return this.$messageSelf.message("请选择要编辑的库位");
      if (this.pickMultipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能编辑一条库位信息，请重新选择",
          type: "warning",
        });
      this.$router.push({
        path: "/storageLocalMap/SLmapInfor",
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
      if (!arr.length) return this.$messageSelf.message("请选择要删除的库位");
      this.$messageSelf
        .confirms("确定要删除吗？", "提示", {
          type: "info",
        })
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {
          this.$messageSelf.message("已取消删除");
        });
    },
    pickDel() {
      //拣货区删除操作
      let arr = [];
      this.pickMultipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length) return this.$messageSelf.message("请选择要删除的库位");
      this.$messaheSelf
        .confirms("确定要删除吗？", "提示", {
          type: "warning",
        })
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {
          this.$messageSelf.message("已取消删除");
        });
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
    lookDetail(row, column) {
      if (column.property === "wareSeatCode") {
        this.$router.push({
          path: "/storageLocalMap/storageLocalDetail",
          query: { kuwei: row },
        });
      }
    },

    getPageNum(e) {
      this.storePageNumber = e;
    },
    sureSuccssBtn(e) {
      this.storeTableData = [];
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
      this.pickTableData = [];
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
  height: 100%;
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
        .lookDetail {
          color: #599af3;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
  .publicStyle {
    margin: 0 20px 16px 0;
    display: flex;
    align-items: center;
    .roleName-text {
      font-size: 14px;
    }
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
