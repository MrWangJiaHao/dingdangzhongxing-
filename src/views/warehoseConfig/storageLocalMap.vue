<template>
  <div id="storageLocalMap">
    <!-- 这里库位映射的页面 -->
    <div class="inputBoxs">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="delegaCompany">
            <div class="roleName-text">委托公司：</div>
            <div class="roleName-checkBox">
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
            <div class="roleName-checkBox">
              <el-input placeholder="模糊搜索" v-model="productName" clearable>
              </el-input>
            </div>
          </div>
          <div class="productCode">
            <div class="roleName-text">产品编码：</div>
            <div class="roleName-checkBox">
              <el-input placeholder="模糊搜索" v-model="productCode" clearable>
              </el-input>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">子仓名称：</div>
            <div class="roleName-checkBox">
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
            <div class="roleName-checkBox">
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
            <div class="roleName-checkBox">
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
            <div class="roleName-checkBox">
              <el-select
                v-model="placeTierValue"
                placeholder="请选择存放层"
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
            <div class="roleName-checkBox">
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
            <div class="roleName-checkBox">
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
            <div class="roleName-checkBox">
              <el-select
                v-model="pickTierValue"
                placeholder="请选择拣货层"
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
            <div class="roleName-checkBox">
              <el-input placeholder="模糊搜索" v-model="pickSL" clearable>
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="queryBtns">
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
            <MapForm
              :storageArea="storageArea1"
              :storageShelf="storageShelf1"
              :storageTier="storageTier1"
              :storageUnit="storageUnit1"
            ></MapForm>
          </el-tab-pane>
          <el-tab-pane label="拣货区库位">
            <MapForm
              :storageArea="storageArea2"
              :storageShelf="storageShelf2"
              :storageTier="storageTier2"
              :storageUnit="storageUnit2"
            ></MapForm>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="pageComponent">
        <pagecomponent
          :pageComponentsData="pageComponentsData"
          @getPageNum="getPageNum"
          @sureSuccssBtn="sureSuccssBtn"
        ></pagecomponent>
      </div>
    </div>
  </div>
</template>

<script>
import { query_WH_Request, storeMapRelation } from "../../api/api";
import MapForm from "@/components/mapForm";
import { Message } from "element-ui";
import pagecomponent from "../../components/commin/pageComponent";
export default {
  components: { MapForm, pagecomponent },
  data() {
    return {
      storageArea1: "存储区",
      storageShelf1: "存储货架",
      storageTier1: "存储层",
      storageUnit1: "存储库位",
      storageArea2: "拣货区",
      storageShelf2: "拣货货架",
      storageTier2: "拣货层",
      storageUnit2: "拣货库位",
      //----------------------------------------------
      delegaCompanyValue: "全部",
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
      delegaCompanyData: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "巨子生物",
        },
        {
          value: 2,
          label: "创客云商",
        },
      ],
      childWarehouseName: [],
      placeAreaData: [],
      placeShelfData: [],
      placeTierData: [],
      pickAreaData: [],
      pickShelfData: [],
      pickTierfData: [],
      pagingQueryData: {
        //分页查询
        pageNumber: 1,
        pageSize: 10,
        paras: {
          orgId: "", //委托公司id
          prodName: "", //产品名称
          prodCode: "", //产品编码
          childWareId: "", //子仓id
          wareAreaId: "", //区域id
        },
      },
      multipleSelection: [],
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 0, //一共多少条 //默认一页10条
      },
    };
  },
  mounted() {
    //查询库位映射关系
    let pagingQueryData = this.pagingQueryData;
    storeMapRelation(pagingQueryData).then((ok) => {
      console.log(ok);
    });
    //查询子仓名称的请求
    let queryData = this.pagingQueryData;
    query_WH_Request(queryData).then((ok) => {
      if (ok.data.code === "10000") {
        let CWNameList = ok.data.result.list;
        CWNameList.forEach((v, i) => {
          this.childWarehouseName.push({
            value: i,
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
    nameValues(v) {
      this.nameValue = v;
    },
    placeAreaValues(v) {
      this.placeAreaValue = v;
    },
    placeShelfValues(v) {
      this.placeShelfValue = v;
    },
    placeTierValues(v) {
      this.placeTierValue = v;
    },
    pickAreaValues(v) {
      this.pickAreaValue = v;
    },
    pickShelfValues(v) {
      this.pickShelfValue = v;
    },
    pickTierValues(v) {
      this.pickTierValue = v;
    },
    clickQuery() {
      //点击查询
      this.tableData = [];
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
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.tableData = [];
      this.pagingQueryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data); //用来改变分页器的条数
    },
    //用来改变分页器的条数
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";
#storageLocalMap {
  background: #e6e7ea;
  height: 100%;
  .inputBoxs {
    padding: 0 16px 16px 16px;
  }
  .formBox {
    padding: 0 16px 16px 16px;
  }
  .publicStyle {
    margin: 0 30px 0 0;
    display: flex;
    align-items: center;
    margin: 10px 10px 0;
    .roleName-text {
      font-size: 16px;
    }
  }
  .roleName-choose {
    display: flex;
    .name_type {
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
  }
  .queryBtns {
    height: 36px;
    position: relative;
    // margin: 0 0 16px 0;
    .roleName-botton {
      position: absolute;
      right: 16px;
      // bottom: 16px;
      margin: 16px 0 0 0;
      display: flex;
      align-items: center;
      .queryBtn {
        @include BtnFunction("success");
      }
      .clearBtn {
        @include BtnFunction();
        background: #fff;
        margin: 0 30px 0 10px;
      }
    }
  }
  .pageComponent {
    margin: 20px 10px 0 0;
    text-align: right;
    height: 36px;
    background: #ffffff;
  }
}
</style>
<style lang="scss">
#storageLocalMap .el-tabs--card > .el-tabs__header {
  border: none;
}
#storageLocalMap .el-tabs__item.is-active {
  font-size: 16px;
}
#storageLocalMap .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom: 2px solid #409eff;
}
#storageLocalMap .el-tabs__header {
  margin: 0;
}
</style>