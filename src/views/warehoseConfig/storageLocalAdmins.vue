<template>
  <div id="storageLocalAdmin">
    <!-- 这里库位管理的页面 -->
    <div class="roleName-choose">
      <div class="name_type">
        <div class="someInputs">
          <div class="nameBox">
            <div class="roleName-text">子仓名称：</div>
            <div class="roleName-checkBox" style="width: 160px">
              <el-select
                v-model="nameValue"
                placeholder="请选择子仓名称"
                @change="nameValues"
                @visible-change="chooseItem"
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
            <div class="roleName-text">区域名称：</div>
            <div class="roleName-checkBox" style="width: 150px">
              <el-select
                v-model="areaNameValue"
                placeholder="请选择区域名称"
                @change="areaNameValues"
              >
                <el-option
                  v-for="item in areaNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="areaType">
            <div class="roleName-text">区域类型：</div>
            <div class="roleName-checkBox" style="width: 150px">
              <el-select
                v-model="areaTypeValue"
                placeholder="请选择区域类型"
                @change="areaTypeValues"
              >
                <el-option
                  v-for="item in areaTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="shelfName">
            <div class="roleName-text">货架名称：</div>
            <div class="roleName-checkBox" style="width: 150px">
              <el-select
                v-model="shelfNameValue"
                placeholder="请选择货架名称"
                @change="shelfNameValues"
              >
                <el-option
                  v-for="item in shelfNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="tierChoose">
            <div class="roleName-text">层：</div>
            <div class="roleName-checkBox" style="width: 120px">
              <el-select
                v-model="tierChooseValue"
                placeholder="请选择层数"
                @change="tierChooseValues"
              >
                <el-option
                  v-for="item in tierChooseData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="storageLocalChoose">
            <div class="roleName-text">库位：</div>
            <div class="roleName-checkBox" style="width: 160px">
              <el-select
                v-model="storageLocalChooseValue"
                placeholder="请选择库位"
                @change="storageLocalChooseValues"
                filterable
              >
                <el-option
                  v-for="item in storageLocalChooseData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="roleName-botton">
          <div class="queryBtn" @click="clickQuery">查询</div>
          <div class="clearBtn" @click="clearInput">清空</div>
        </div>
      </div>
    </div>

    <!-- --------------------------------------------------------------------------------------------------------------------------------------- -->
    <div class="childWarehouseForm">
      <div class="formHeader">
        <div class="icon-title">
          <div class="icon-title-icon">
            <img src="../../assets/img/systemTitlemesa.png" />
          </div>
          <div class="icon-title-title">查询结果</div>
        </div>
        <div class="someBtn">
          <div class="setUser" @click="printSLCode">打印库位号</div>
          <div class="bianjiUser" @click="SLmap">库位映射</div>
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
        >
          <el-table-column
            type="selection"
            width="82"
            align="center"
            fixed="left"
          >
          </el-table-column>
          <el-table-column label="序号" align="center" type="index" width="71">
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
            label="区域名称"
            align="center"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="wareAreaType"
            label="区域类型"
            align="center"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="areaNumber"
            label="区域编号"
            align="center"
            min-width="80"
          >
          </el-table-column>
          <el-table-column
            prop="shelfName"
            label="货架"
            align="center"
            min-width="80"
          >
          </el-table-column>
          <el-table-column
            prop="tierChoose"
            label="层"
            align="center"
            width="60"
            min-width="60"
          >
          </el-table-column>
          <el-table-column
            prop="wareSeatCode"
            label="库位"
            align="center"
            min-width="130"
          ></el-table-column>
          <el-table-column
            prop="seatProdId"
            label="是否已使用"
            align="center"
            width="100"
            min-width="100"
          >
            <template slot-scope="scope">
              <div class="lookDeatil" @click="lookDetail(scope.row)">
                {{ scope.row.seatProdId }}
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
    <div
      v-show="showTizoxinma"
      id="tiaoxingmaquyu"
      :style="{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }"
    >
      <div style="width: 800px">
        <div>
          <div
            style="display: inline-block; margin-bottom: 10px"
            v-for="(item, idx) in ImgsrcArr"
            :key="idx"
          >
            <img
              width="265"
              height="75"
              style="margin-left: -10px"
              :src="tiaoxinmaSrc + item"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  querySLInfor,
  querySLInforCon,
  queryAreaOfWS,
  areaShelfQuery,
  TJquery_WH_Request,
} from "../../api/api";
import pagecomponent from "../../components/commin/pageComponent";
import { clearTimeInput, getCookie, reduceFun } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      showTizoxinma: false,
      tiaoxinmaSrc:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg?code=",
      childWarehouseName: [],
      areaNameData: [],
      areaTypeData: [
        {
          value: "1",
          label: "存储区",
        },
        {
          value: "2",
          label: "拣货区",
        },
      ],
      shelfNameData: [],
      tierChooseData: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
      ],
      storageLocalChooseData: [],
      nameValue: "",
      areaNameValue: "",
      areaTypeValue: "",
      shelfNameValue: "",
      tierChooseValue: "",
      storageLocalChooseValue: "",
      tableData: [],
      multipleSelection: [],
      queryData: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          childWareId: "",
          wareAreaId: "",
          wareAreaType: "",
          wareShelfId: "",
          shelfLevelNum: "",
          wareSeatCode: "",
          id: "",
        },
      },
      SLInforData: {
        childWareId: "", //子仓ID
        wareAreaId: "", //区域ID
        wareAreaType: "", //区域类型
        wareShelfId: "", //货架
        shelfLevelNum: "", //货架层数
        wareSeatCode: "", //库位编号
        id: "", //货架ID
      },
      pageComponentsData: {
        pageNums: 0,
      },
      //此数组用来存储子仓的各种信息
      childStoreData: [],
      //此数组用来存储子仓里面库位的各种信息
      CSkuweiData: [],
      //条件查询的data
      areaData: {
        childWareId: "",
        id: "",
      },
      CSandareaData: [],
      codeData: {
        code: "",
      },
      captchaPath: "",
      ImgsrcArr: [],
      shelfResList: [],
    };
  },
  computed: {
    shelfLevelNumInt() {
      return this.shelfLevelNum;
    },
  },
  mounted() {
    //查询子仓名称的请求
    TJquery_WH_Request({ wareId: getCookie("X-Auth-wareId"), id: "" }).then(
      (ok) => {
        if (ok.data.code === "10000") {
          ok.data.result.forEach((v) => {
            this.childWarehouseName.push({
              value: v.id,
              label: v.childWareName,
            });
          });
          this.childWarehouseName = reduceFun(this.childWarehouseName);
        }
      }
    );
    queryAreaOfWS(this.areaData).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        this.CSandareaData = ok.data.result;
      }
    });
    this.queryFun();
  },
  methods: {
    queryFun() {
      querySLInfor(this.queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData.forEach((v) => {
            v.wareAreaType = v.wareAreaType === 1 ? "存储区" : "拣货区";
            v.areaNumber = v.wareSeatCode.split("-")[1];
            v.shelfName = v.wareSeatCode.split("-")[2];
            v.tierChoose = v.wareSeatCode.split("-")[3];
            v.seatProdId = v.seatProdId === "" ? "否" : "是";
          });
        }
      });
    },
    clickQuery() {
      //点击查询
      this.queryData.pageNumber = 1;
      this.queryFun();
    },
    clearInput() {
      //点击清空
      clearTimeInput();
      this.nameValue = "";
      this.areaNameValue = "";
      this.areaTypeValue = "";
      this.shelfNameValue = "";
      this.tierChooseValue = "";
      this.storageLocalChooseValue = "";
      Object.keys(this.queryData.paras).forEach((v) => {
        this.queryData.paras[v] = "";
      });
      this.areaNameData = [];
      this.shelfNameData = [];
      this.storageLocalChooseData = [];
      this.queryFun();
    },
    nameValues(value) {
      this.queryData.paras.childWareId = value;
      this.CSandareaData.forEach((v) => {
        if (value === v.childWareId) {
          this.areaNameData.push({
            value: v.id,
            label: v.wareAreaName,
          });
        }
      });
    },
    areaNameValues(value) {
      this.queryData.paras.wareAreaId = value;
      areaShelfQuery({ wareAreaId: value, id: "" }).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.shelfResList = ok.data.result;
          this.shelfResList.forEach((v) => {
            this.shelfNameData.push({
              value: v.id,
              label: v.shelfName,
            });
          });
          this.shelfNameData = reduceFun(this.shelfNameData);
        }
      });
      this.areaTypeValue = "";
      this.CSandareaData.forEach((v) => {
        if (value === v.id) {
          this.areaTypeValue =
            v.wareAreaType === 1
              ? "存储区"
              : v.wareAreaType === 2
              ? "拣货区"
              : "";
        }
      });
    },
    chooseItem(event) {
      if (event) {
        this.areaNameData = [];
      }
    },
    areaTypeValues(value) {
      this.queryData.paras.wareAreaType = value;
    },
    shelfNameValues(value) {
      this.queryData.paras.id = value;
      querySLInforCon({
        childWareId: this.queryData.paras.childWareId,
        wareAreaId: this.queryData.paras.wareAreaId,
        wareAreaType: this.queryData.paras.wareAreaType,
        wareShelfId: this.queryData.paras.id,
        shelfLevelNum: this.queryData.paras.shelfLevelNum,
      }).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          ok.data.result.forEach((v) => {
            this.storageLocalChooseData.push({
              value: v.id,
              label: v.wareSeatCode,
            });
          });
        }
      });
    },
    tierChooseValues(value) {
      this.queryData.paras.shelfLevelNum = value;
    },
    storageLocalChooseValues(value) {
      this.queryData.paras.id = value;
    },
    SLmap() {
      //库位映射
      this.$router.push("/storageLocalMap/storeLocalBindProduct");
    },
    lookDetail(data) {
      if (data.seatProdId === "否") {
        this.$router.push({
          path: "/storageLocalMap/storeLocalBindProduct",
        });
      } else {
        this.$router.push({
          path: "/storageLocalMap/storeLocalBindProduct",
          query: { isUsed: data, type: "look" },
        });
      }
    },
    printSLCode() {
      //打印条形码图片
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要打印条形码的库位",
          type: "warning",
        });
      // storageLocalChoose
      let codeArr = [];
      this.multipleSelection.forEach((item) => {
        if (!codeArr.includes(item.wareSeatCode)) {
          codeArr.push(item.wareSeatCode);
        }
      });
      this._barCodeImg(codeArr);
    },
    //打印条形码
    dayintiaoxinma() {
      // console.log(document.getElementById("tiaoxingmaquyu"));
      setTimeout(() => {
        this.LODOP = this.$getLodop();
        this.LODOP.ADD_PRINT_HTM(
          20,
          0,
          2970,
          2100,
          document.getElementById("tiaoxingmaquyu").innerHTML
        );
        // this.LODOP.PRINTA(); //不需要进入查看页面 直接打印
        this.LODOP.PREVIEW(); //需要进入页面查看
      }, 200);
    },
    async _barCodeImg(data) {
      //获取条形码
      this.ImgsrcArr = [];
      data.forEach((item) => {
        this.ImgsrcArr.push(item);
      });
      this.dayintiaoxinma();
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
      this.queryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";
#storageLocalAdmin {
  padding: 20px 10px;
  background: #eef1f8;
}
.publicStyle {
  margin: 0 20px 16px 0;
  display: flex;
  align-items: center;
  .roleName-text {
    font-size: 14px;
    white-space: nowrap;
  }
  .roleName {
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d1d6e2;
    .roleName-choose {
      width: 360px;
      display: flex;
      align-items: center;
      .roleName-text {
        margin: 0 10px 0 30px;
        font-size: 16px;
      }
    }
  }
}
.roleName-choose {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  flex-wrap: wrap;
  .name_type {
    width: 100%;
    justify-content: space-between;
    display: flex;
    .someInputs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
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
    .roleName-botton {
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
  }
}

.childWarehouseForm {
  margin: 4px 0 0 0;
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
        @include BtnFunction("success");
      }
    }
  }
  .resultForm {
    padding: 16px 20px;
  }
}
</style>