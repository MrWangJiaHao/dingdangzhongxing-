<template>
  <div id="mapInfor">
    <!-- 这是库位映射详情页面 -->
    <div class="productInfor">
      <div class="productInfor_title">产品信息</div>
      <div class="productInfor_div">
        <div class="selectDiv">
          <div class="text_select">
            <div>委托公司：</div>
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

          <div class="text_select">
            <div>产品名称：</div>
            <el-select
              v-model="productNameValue"
              placeholder="请选择产品名称"
              @change="productNameValues"
            >
              <el-option
                v-for="item in productNameData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="text_select">
            <div>产品编号：</div>
            <el-select
              v-model="productCodeValue"
              placeholder="请选择产品编号"
              @change="productCodeValues"
            >
              <el-option
                v-for="item in productCodeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="text_select">
            <div>规格：</div>
            <el-select
              v-model="specificationValue"
              placeholder="请选择规格"
              @change="specificationValues"
            >
              <el-option
                v-for="item in specificationData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="inputDiv">
          <div class="text_box">
            <div>品牌：</div>
            <div>{{ ProdBrandName }}</div>
          </div>
          <div class="text_box">
            <div>长：</div>
            <div>{{ ProdLength }}</div>
          </div>
          <div class="text_box">
            <div>宽：</div>
            <div>{{ ProdWidth }}</div>
          </div>
          <div class="text_box">
            <div>高：</div>
            <div>{{ ProdHeight }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------------------绑定存储区库位------------------------------------------------------------------------------------- -->
    <div class="productInfor bindStoreKuwei">
      <div class="productInfor_title">绑定存储区库位</div>
      <div class="productInfor_div">
        <div class="selectDiv2">
          <section>
            <div class="text_select">
              <div>子仓：</div>
              <el-select
                v-model="childStoreValue"
                placeholder="请选择子仓"
                @change="childStoreValues"
                @visible-change="chooseItem"
              >
                <el-option
                  v-for="item in childStoreData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="text_select">
              <div>区域：</div>
              <el-select
                v-model="storeAreaValue"
                placeholder="请选择区域"
                @change="storeAreaValues"
              >
                <el-option
                  v-for="item in storeAreaData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="lookArea">
              <span @mouseenter="mouseEnterEvent" @mouseout="mouseOutEvent"
                >查看该区域委托公司</span
              >
              <div class="comForm">
                <el-table :data="comData1" style="width: 100%">
                  <el-table-column
                    prop="companyName"
                    label="委托公司"
                    width="180"
                    max-height="150px"
                  >
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </section>
          <section>
            <div class="text_select">
              <div>货架：</div>
              <el-select
                v-model="storeShelfValue"
                placeholder="请选择货架"
                @change="storeShelfValues"
              >
                <el-option
                  v-for="item in storeShelfData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="text_select">
              <div>库位：</div>
              <el-input
                placeholder="模糊搜索"
                v-model="storageLocation1"
                clearable
              >
              </el-input>
            </div>
            <div class="queryBtnDiv">
              <div class="queryBtn" @click="storeClickQuery">查询</div>
            </div>
          </section>
        </div>
      </div>
      <div class="productForm">
        <prodFromStore :inforData="inforData"></prodFromStore>
      </div>
      <div class="selectedForm">
        <div class="selectedForm-title">已选库位：</div>
        <div class="selectedForm-form">
          <ProductFormStoreUsed></ProductFormStoreUsed>
        </div>
      </div>
    </div>

    <!-- -----------------------------------------------------------绑定拣货区库位----------------------------------------------------------------------------------- -->

    <div class="productInfor bindStoreKuwei bindPickKuwei">
      <div class="productInfor_title">绑定拣货区库位</div>
      <div class="productInfor_div">
        <div class="selectDiv2">
          <section>
            <div class="text_select">
              <div>子仓：</div>
              <el-select
                v-model="pickStoreValue"
                placeholder="请选择子仓"
                @change="pickStoreValues"
                @visible-change="chooseItem"
              >
                <el-option
                  v-for="item in pickStoreData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="text_select">
              <div>区域：</div>
              <el-select
                v-model="pickAreaValue"
                placeholder="请选择区域"
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
            <div class="lookArea">
              <span @mouseenter="mouseEnterEvent1" @mouseout="mouseOutEvent1"
                >查看该区域委托公司</span
              >
              <div class="comForm1">
                <el-table
                  :data="comData1"
                  style="width: 100%"
                  max-height="150px"
                >
                  <el-table-column
                    prop="companyName"
                    label="委托公司"
                    width="180"
                  >
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </section>
          <section>
            <div class="text_select">
              <div>货架：</div>
              <el-select
                v-model="pickShelfValue"
                placeholder="请选择货架"
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
            <div class="text_select">
              <div>库位：</div>
              <el-input
                placeholder="模糊搜索"
                v-model="storageLocation2"
                clearable
              >
              </el-input>
            </div>
            <div class="queryBtnDiv">
              <div class="queryBtn" @click="pickClickQuery">查询</div>
            </div>
          </section>
        </div>
      </div>
      <div class="productForm">
        <ProductFormPick :inforData="inforData1"></ProductFormPick>
      </div>
      <div class="selectedForm">
        <div class="selectedForm-title">已选库位：</div>
        <div class="selectedForm-form">
          <ProductFormPickUsed></ProductFormPickUsed>
        </div>
      </div>
    </div>
    <div class="submitBtn">
      <div class="submitBtnBox">
        <el-button @click="goBack">取 消</el-button>
        <el-button type="primary" @click="submitData">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductFormStoreUsed from "../../components/productForm/productFormStoreUsed.vue";
import ProductFormPick from "../../components/productForm/productFormPick.vue";
import ProductFormPickUsed from "../../components/productForm/productFormPickUsed.vue";
import prodFromStore from "../../components/productForm/prodFromStore.vue";
import {
  queryProductInfor,
  query_WH_Request,
  querySLInforCon,
  prodStoreMap,
  queryAreaOfWS,
  areaShelfQuery,
  storeMapRelation,
} from "../../api/api";
import { Message } from "element-ui";
import { getCookie } from "../../utils/validate";
export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/warehoseconfig/storageLocalAdmins") {
      next((vm) => {
        if (vm.$route.query.type === "look") {
          // console.log(vm.$route.query.isUsed);
          let wareSeatCodeQuery = {
            //分页查询
            pageNumber: 1,
            pageSize: 10,
            paras: {
              wareSeatCode: vm.$route.query.isUsed.wareSeatCode,
            },
          };
          storeMapRelation(wareSeatCodeQuery).then((ok) => {
            // console.log(ok)
            if (ok.data.code === "10000") {
              let res = ok.data.result.list[0];
              vm.delegaCompanyValue = res.orgName;
              vm.productNameValue = res.prodFullName;
              vm.productCodeValue = res.prodCode;
              vm.specificationValue = res.specName + "ml";
              vm.ProdBrandName = res.braName;
            }
          });
        }
      });
    } else {
      next();
    }
    if (from.name === "/warehoseconfig/storageLocalMap") {
      next((vm) => {
        if (vm.$route.query.type === "edit") {
          vm.recepData = vm.$route.query.datas;
          // console.log(vm.recepData)
          vm.delegaCompanyValue = vm.recepData[0].orgName;
          vm.productNameValue = vm.recepData[0].prodName;
          vm.productCodeValue = vm.recepData[0].prodCode;
          vm.specificationValue = vm.recepData[0].specName;
          vm.ProdBrandName = vm.recepData[0].braName;
          vm.ProdLength = vm.recepData[0].ProdLength;
          vm.ProdWidth = vm.recepData[0].ProdWidth;
          vm.ProdHeight = vm.recepData[0].ProdHeight;
        }
      });
    } else {
      next();
    }
  },
  components: {
    prodFromStore,
    ProductFormStoreUsed,
    ProductFormPick,
    ProductFormPickUsed,
  },
  data() {
    return {
      recepData: [],
      delegaCompanyValue: "", //委托公司
      productCodeValue: "", //产品编号
      productNameValue: "", //产品名称
      specificationValue: "", //规格
      delegaCompanyData: [],
      productCodeData: [],
      productNameData: [],
      specificationData: [],
      childStoreValue: "", //存储区子仓选择
      childStoreData: [],
      storeAreaValue: "", //存储区区域选择
      storeAreaData: [],
      storeShelfValue: "", //存储区货架选择
      storeShelfData: [],
      storageLocation1: "", //存储区库位
      pickAreaValue: "", //拣货区区域选择
      pickStoreData: [], //拣货区子仓选择
      pickStoreValue: "",
      pickAreaData: [], //拣货区区域选择
      pickShelfValue: "",
      pickShelfData: [],
      storageLocation2: "", //拣货区库位
      ProdBrandName: "", //产品品牌
      ProdLength: "", //产品长度
      ProdWidth: "", //产品宽度
      ProdHeight: "", //产品高度
      prodInforData: [], //产品信息集合
      prodId: "", //存储当前选择产品的id
      pagingQueryData: {
        pageNumber: 1,
        pageSize: 10,
        paras: {},
      },

      queryCSinfor: [],
      SLInforData: {
        childWareId: "", //子仓id
        wareAreaId: "", //仓库区域id
        wareShelfId: "", //仓库货架id
      },
      inforData: [],
      inforData1: [],
      areaData: {
        childWareId: "",
        id: "",
      },
      CSandareaData: [],
      choosedKuWeiData: [],
      areaShelfQueryData: {
        id: "",
        wareAreaId: "",
      },
      shelfResList: [],
      requestData: {
        prodId: "",
        seatDatas: [],
      },
      comData1: [
        {
          companyName: "巨子生物",
        },
      ],
      comData2: [
        {
          companyName: "巨子生物",
        },
      ],
    };
  },

  destroyed() {
    this.inputEmpty();
  },
  mounted() {
    this.setintervalFun();
    let data = {
      wareId: getCookie("X-Auth-wareId"),
      orgId: "4C2F466B16E94451B942EBBD07BE0F8B",
    };
    queryProductInfor(data).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        this.prodInforData = ok.data.result;
        this.prodInforData.forEach((v) => {
          this.delegaCompanyData.push({
            value: v.orgName,
            label: v.orgName,
          });

          let testObj = {};
          this.delegaCompanyData = this.delegaCompanyData.reduce(
            (item, next) => {
              testObj[next.value]
                ? ""
                : (testObj[next.value] = true && item.push(next));
              return item;
            },
            []
          );
          this.productNameData.push({
            value: v.prodName,
            label: v.prodName,
          });
          if (this.productNameValue === v.prodFullName) {
            this.requestData.prodId = v.id;
          }
        });
      }
    });

    //查询子仓名称的请求
    let queryData = this.pagingQueryData;
    query_WH_Request(queryData).then((ok) => {
      if (ok.data.code === "10000") {
        // console.log(ok);
        this.queryCSinfor = ok.data.result.list;
        this.queryCSinfor.forEach((v) => {
          this.childStoreData.push({
            value: v.childWareName,
            label: v.childWareName,
          });
          this.pickStoreData.push({
            value: v.childWareName,
            label: v.childWareName,
          });
        });
      } else {
        Message({
          type: "error",
          message: "未知错误",
        });
      }
    });
    //根据子仓id查询区域
    let data1 = this.areaData;
    queryAreaOfWS(data1).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        this.CSandareaData = ok.data.result;
      }
    });
  },
  methods: {
    inputEmpty() {
      this.delegaCompanyValue = "";
      this.productNameValue = "";
      this.productCodeValue = "";
      this.specificationValue = "";
      this.ProdBrandName = "";
    },
    getTableData() {
      this.choosedKuWeiData = this.$store.state.PFSRequest.PFSqueryData;
      // console.log(this.choosedKuWeiData);
    },
    getTableData1() {
      this.choosedKuWeiData1 = this.$store.state.PFSRequest1.PFSqueryData1;
      // console.log(this.choosedKuWeiData1);
    },
    setintervalFun() {
      setInterval(() => {
        this.getTableData();
        this.getTableData1();
      }, 100);
    },
    delegaCompanyValues(value) {
      this.delegaCompanyValue = value;
    },
    productCodeValues(v) {
      this.productCodeValue = v;
    },
    productNameValues(value) {
      this.productNameValue = value;
      this.prodInforData.forEach((v) => {
        if (v.prodName === value) {
          this.productCodeValue = v.prodCode;
          this.specificationValue = v.specName + "ml";
          this.ProdBrandName = v.braName;
          this.ProdLength = v.ProdLength ? v.ProdLength : "0";
          this.ProdWidth = v.ProdWidth ? v.ProdWidth : "0";
          this.ProdHeight = v.ProdHeight ? v.ProdHeight : "0";
          this.prodId = v.id;
          this.requestData.prodId = v.id;
        }
      });
    },
    specificationValues(v) {
      this.specificationValue = v;
    },
    childStoreValues(value) {
      this.childStoreValue = value;
      this.queryCSinfor.forEach((v) => {
        if (value === v.childWareName) {
          this.SLInforData.childWareId = v.id;
        }
      });
      this.CSandareaData.forEach((v) => {
        if (value === v.childWareName) {
          if (v.wareAreaType === 1) {
            this.storeAreaData.push({
              value: v.wareAreaName,
              label: v.wareAreaName,
            });
          }
        }
      });
    },
    storeAreaValues(value) {
      this.storeAreaValue = value;
      this.CSandareaData.forEach((v) => {
        if (value === v.wareAreaName) {
          this.SLInforData.wareAreaId = v.id;
          this.areaShelfQueryData.wareAreaId = v.id;
        }
      });
      let areaShelfQueryData = this.areaShelfQueryData;
      areaShelfQuery(areaShelfQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.shelfResList = ok.data.result;
          this.shelfResList.forEach((v) => {
            this.storeShelfData.push({
              value: v.shelfName,
              label: v.shelfName,
            });
          });
        }
      });
    },
    chooseItem(event) {
      if (event) {
        this.storeAreaData = [];
      }
    },
    storeShelfValues(value) {
      this.storeShelfValue = value;
      this.shelfResList.forEach((v) => {
        if (value === v.shelfName) {
          this.SLInforData.wareShelfId = v.id;
        }
      });
    },
    pickAreaValues(value) {
      this.pickAreaValue = value;
      this.CSandareaData.forEach((v) => {
        if (value === v.wareAreaName) {
          this.SLInforData.wareAreaId = v.id;
          this.areaShelfQueryData.wareAreaId = v.id;
        }
      });
      let areaShelfQueryData = this.areaShelfQueryData;
      areaShelfQuery(areaShelfQueryData).then((ok) => {
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
      this.shelfResList.forEach((v) => {
        if (value === v.shelfName) {
          this.SLInforData.wareShelfId = v.id;
        }
      });
    },
    pickStoreValues(value) {
      this.pickStoreValue = value;
      this.queryCSinfor.forEach((v) => {
        if (value === v.childWareName) {
          this.SLInforData.childWareId = v.id;
        }
      });
      this.CSandareaData.forEach((v) => {
        if (value === v.childWareName) {
          if (v.wareAreaType === 2) {
            this.pickAreaData.push({
              value: v.wareAreaName,
              label: v.wareAreaName,
            });
          }
        }
      });
    },

    storeClickQuery() {
      //存储区查询
      this.inforData = [];
      let SLInforData = this.SLInforData;
      querySLInforCon(SLInforData).then((ok) => {
        if (ok.data.code === "10000") {
          // console.log(ok);
          let res = ok.data.result;
          res.forEach((v) => {
            this.inforData.push({
              CWName: v.childWareName,
              areaName: v.wareAreaName,
              shelfName: v.wareShelfName,
              tierChoose: v.wareSeatCode.split("-")[3],
              storageLocalChoose: v.wareSeatCode,
              prodUnit: "",
              MaxNumberInput: "",
              seatId: v.id,
            });
          });
        } else {
          Message({
            type: "error",
            message: "未知错误",
          });
        }
      });
    },
    pickClickQuery() {
      //拣货区查询
      this.inforData1 = [];
      let SLInforData = this.SLInforData;
      querySLInforCon(SLInforData).then((ok) => {
        if (ok.data.code === "10000") {
          // console.log(ok);
          let res = ok.data.result;
          res.forEach((v) => {
            this.inforData1.push({
              CWName: v.childWareName,
              areaName: v.wareAreaName,
              shelfName: v.wareShelfName,
              tierChoose: v.wareSeatCode.split("-")[3],
              storageLocalChoose: v.wareSeatCode,
              prodUnit: "",
              MaxNumberInput: "",
              seatId: v.id,
            });
          });
        } else {
          Message({
            type: "error",
            message: "未知错误",
          });
        }
      });
    },
    goBack() {
      //返回按钮
      this.$router.go(-1);
    },
    bindingProd(data) {
      prodStoreMap(data).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          Message({
            type: "success",
            message: "绑定成功",
          });
          this.$router.push("/warehoseconfig/storageLocalMap");
        } else {
          Message({
            type: "error",
            message: "绑定失败",
          });
        }
      });
    },
    submitData() {
      //提交按钮
      if (this.choosedKuWeiData.length > 0) {
        this.choosedKuWeiData.forEach((v) => {
          this.requestData.seatDatas.push({
            maxNum: v.MaxNumberInput,
            prodUnit: v.prodUnit,
            seatId: v.seatId,
            seatType: "0",
          });
          if (v.prodUnit === "" || v.MaxNumberInput === "") {
            return Message({
              type: "error",
              message: "请选择存放单位或输入存放数量",
            });
          }
        });
        let requestData = this.requestData;
        // console.log(requestData);
        this.bindingProd(requestData);
      } else {
        this.choosedKuWeiData1.forEach((v) => {
          this.requestData.seatDatas.push({
            maxNum: v.MaxNumberInput,
            minNum: v.repleNum,
            prodUnit: v.prodUnit,
            seatId: v.seatId,
            seatType: "1",
          });
          // console.log(this.requestData.seatDatas);
          if (v.prodUnit === "" || v.MaxNumberInput === "") {
            return Message({
              type: "error",
              message: "请选择存放单位或输入最大存放数",
            });
          }
        });
        let requestData = this.requestData;
        this.bindingProd(requestData);
      }
    },
    mouseEnterEvent() {
      // let comFormDiv = document.querySelector(".comForm");
      // comFormDiv.style.display = "block";
    },
    mouseOutEvent() {
      // let comFormDiv = document.querySelector(".comForm");
      // comFormDiv.style.display = "none";
    },
    mouseEnterEvent1() {
      // let comFormDiv1 = document.querySelector(".comForm1");
      // comFormDiv1.style.display = "block";
    },
    mouseOutEvent1() {
      // let comFormDiv1 = document.querySelector(".comForm1");
      // comFormDiv1.style.display = "none";
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";

#mapInfor {
  background: #e3e4e8;
  height: 100%;
  padding: 10px;
  .productInfor {
    padding: 16px;
    background: white;
    .productInfor_title {
      position: relative;
      font-size: 16px;
      margin-left: 25px;
    }
    .productInfor_title:after {
      content: "";
      width: 15px;
      height: 15px;
      position: absolute;
      background: url("../../assets/img/systemTitlemesa.png") no-repeat;
      left: -25px;
      top: 3px;
    }
  }
  .productInfor_div {
    margin-top: 16px;
    .selectDiv {
      display: flex;
      align-items: center;
      .text_select {
        div {
          white-space: nowrap;
        }
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-right: 16px;
      }
    }
    .inputDiv {
      margin-top: 16px;
      display: flex;
      .text_box {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-right: 16px;
        white-space: nowrap;
        div:nth-of-type(2) {
          display: inline-block;
          width: 190px;
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          padding: 0 30px 0 15px;
          color: rgb(96, 98, 102);
          border: 1px solid #dcdfe6;
          background: #eeeeee;
        }
      }
    }
  }
  .bindStoreKuwei {
    .selectDiv2 {
      section {
        display: flex;
        align-items: center;
        .lookArea {
          position: relative;
          span {
            color: #599af4;
            cursor: pointer;
            text-decoration: underline;
          }
          .comForm,
          .comForm1 {
            position: absolute;
            right: -200px;
            top: -70px;
            display: none;
          }
        }
      }
      section:nth-of-type(2) {
        margin-top: 16px;
      }
      .text_select {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-right: 16px;
        div {
          white-space: nowrap;
        }
      }
    }
    .productForm {
      margin: 16px 0 0 47px;
    }
    .selectedForm {
      .selectedForm-title {
        font-size: 16px;
        line-height: 46px;
      }
      .selectedForm-form {
        margin: 0 0 0 47px;
      }
    }
  }
  .bindPickKuwei {
    border-bottom: 1px solid #d1d6e2;
  }
  .submitBtn {
    width: 100%;
    height: 76px;
    background: white;
    display: flex;
    align-items: center;
    position: relative;
    .submitBtnBox {
      position: absolute;
      right: 30px;
      bottom: 20px;
    }
  }
}

.queryBtn {
  @include BtnFunction("success");
}
</style>
<style lang="scss">
.submitBtnBox {
  .el-button:nth-of-type(1) {
    border: 1px solid #d1d6e2;
  }
}
</style>