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
            <div class="lookArea">查看该区域委托公司</div>
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
            <div class="lookArea">查看该区域委托公司</div>
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
        <ProductFormPick></ProductFormPick>
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
import ProductFormStoreUsed from "../../components/productForm/productFormStoreUsed";
import ProductFormPick from "../../components/productForm/productFormPick";
import ProductFormPickUsed from "../../components/productForm/productFormPickUsed";
import prodFromStore from "../../components/productForm/prodFromStore.vue";
import {
  queryProductInfor,
  query_WH_Request,
  querySLInforCon,
  prodStoreMap,
  queryAreaOfWS,
  areaShelfQuery,
} from "../../api/api";
import { Message } from "element-ui";

export default {
  components: {
    prodFromStore,
    ProductFormStoreUsed,
    ProductFormPick,
    ProductFormPickUsed,
  },
  data() {
    return {
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
      pickAreaValue: "", //存储区区域选择
      pickAreaData: [],
      pickShelfValue: "", //拣货区区域选择
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
    };
  },
  mounted() {
    // this.choosedKuWeiData = this.$store.state.fromDataRequest.fromData
    // this.choosedKuWeiData = this.$route.query.datas
    // this.delegaCompanyValue = this.choosedKuWeiData[0].delegaCompany
    // this.productNameValue = this.choosedKuWeiData[0].productName
    // this.productCodeValue = this.choosedKuWeiData[0].productNumber
    // this.specificationValue = this.choosedKuWeiData[0].producTspecifica
    // this.ProdBrandName = this.choosedKuWeiData[0].brand
    let data = {
      wareId: "2A8B48391F4F4EB5BDEDF9EBA0B6BAE7",
      orgId: "4C2F466B16E94451B942EBBD07BE0F8B",
    };
    queryProductInfor(data).then((ok) => {
      console.log(ok);
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
          this.storeAreaData.push({
            value: v.wareAreaName,
            label: v.wareAreaName,
          });
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
        console.log(ok);
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
    pickAreaValues(v) {
      this.pickAreaValue = v;
    },
    pickShelfValues(v) {
      this.pickShelfValue = v;
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
              tierChoose: v.wareSeatCode,
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
    },
    goBack() {
      //返回按钮
      this.$router.go(-1);
    },
    submitData() {
      //提交按钮
      let requestData = {
        prodId: this.prodId,
        seatDatas: [
          {
            maxNum: 10,
            minNum: "",
            prodUnit: "箱",
            seatId: "310EB10F222645CE96E8ADB0BD9CAF2D",
            seatType: "0",
          },
        ],
      };
      prodStoreMap(requestData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          Message({
            type: "success",
            message: "绑定成功",
          });
          this.$router.push('/warehoseconfig/storageLocalMap')
        } else {
          Message({
            type: "error",
            message: ok.data.msg,
          });
        }
      });
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
          color: blue;
          cursor: pointer;
          text-decoration: underline;
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