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
import prodFromStore from '../../components/productForm/prodFromStore.vue'
import {
  queryProductInfor,
  query_WH_Request,
  querySLInfor,
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

      pagingQueryData: {
        pageNumber: 1,
        pageSize: 10,
        paras: {},
      },

      queryCSinfor: [],
      SLInforData: {
        childWareId: "764F9BB09A884EDDAC1D81E291662A81", //子仓id
        wareAreaId: "5F85E0829ADF4C9493D2D3312B5BA40B", //仓库区域id
        wareAreaType: this.areaTypeValue, //区域类型（1-存储区；2-拣货区）
        wareShelfId: "", //仓库货架id
        shelfLevelNum: "", //货架层数(仅查询本层库位)
      },
      inforData: [],
    };
  },
  mounted() {
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
            // value: i,
            label: v.orgName,
          });
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
        console.log(ok);
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
  },
  methods: {
    delegaCompanyValues(v) {
      this.delegaCompanyValue = v;
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
          this.ProdLength = v.ProdLength;
          this.ProdWidth = v.ProdWidth;
          this.ProdHeight = v.ProdHeight;
        }
      });
    },
    specificationValues(v) {
      this.specificationValue = v;
    },
    childStoreValues(v) {
      this.childStoreValue = v;
    },
    storeAreaValues(v) {
      this.storeAreaValue = v;
    },
    storeShelfValues(v) {
      this.storeShelfValue = v;
    },
    pickAreaValues(v) {
      this.pickAreaValue = v;
    },
    pickShelfValues(v) {
      this.pickShelfValue = v;
    },

    storeClickQuery() {
      //存储区查询
      let SLInforData = this.SLInforData;
      querySLInfor(SLInforData).then((ok) => {
        if (ok.data.code === "10000") {
          // console.log(ok);
          let res = ok.data.result.list;
          res.forEach((v) => {
            this.inforData.push({
              CWName: v.childWareName,
              areaName: v.wareAreaName,
              shelfName: v.wareShelfName,
              tierChoose: v.wareSeatCode,
              storageLocalChoose: v.wareSeatCode,
              storeUnit: "",
              maxNumber: "",
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