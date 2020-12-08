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
            <div class="roleName-checkBox" style="width: 120px">
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
            <div class="roleName-checkBox" style="width: 120px">
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
            <div class="roleName-checkBox" style="width: 120px">
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
          <div class="icon-title-title">库位管理</div>
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
          @cell-click="lookDetail"
        >
          <el-table-column type="selection" width="55" align="center"> </el-table-column>
          <el-table-column label="序号" align="center" type="index" width="55">
          </el-table-column>
          <el-table-column prop="childWareName" label="子仓名称" align="center">
          </el-table-column>
          <el-table-column prop="wareAreaName" label="区域名称" align="center">
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
              <div class="lookDetail">{{ scope.row.seatProdId }}</div>
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
        <transition>
          <Loading v-if="isLoading"></Loading>
        </transition>
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
import Loading from "@/components/loading/loading";
import {
  querySLInfor,
  query_WH_Request,
  querySLInforCon,
  queryAreaOfWS,
  areaShelfQuery,
} from "../../api/api";
import { Message } from "element-ui";
import pagecomponent from "../../components/commin/pageComponent";
export default {
  components: {
    pagecomponent,
    Loading,
  },
  data() {
    return {
      isLoading: true,
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
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
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
      pagingQueryData: {
        //分页查询
        orderBy: "createTime",
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
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 0, //一共多少条 //默认一页10条
      },
      //此数组用来存储子仓的各种信息
      childStoreData: [],
      //此数组用来存储子仓里面库位的各种信息
      CSkuweiData: [],
      //条件查询的data
      SLInforData: {
        childWareId: "", //子仓id
        wareAreaId: "", //仓库区域id
        wareAreaType: "", //区域类型（1-存储区；2-拣货区）
        wareShelfId: "", //仓库货架id
        shelfLevelNum: "", //货架层数(仅查询本层库位)
        id: "",
      },
      updateData: "",
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
      areaShelfQueryData: {
        id: "",
        wareAreaId: "",
      },
      shelfResList: [],
      kuweiData: [],
    };
  },
  computed: {
    shelfLevelNumInt() {
      return this.shelfLevelNum;
    },
  },
  mounted() {
    //查询的请求
    this.updateData = () => {
      let queryData = this.pagingQueryData;
      querySLInfor(queryData).then((ok) => {
        // console.log(ok);
        this.tableData = ok.data.result.list;
        this.changeData(ok.data.result);
        if (this.tableData.length > 0) {
          this.isLoading = false;
        }
        this.tableData.forEach((v) => {
          v.wareAreaType = v.wareAreaType === 1 ? "存储区" : "拣货区";
          v.areaNumber = v.wareSeatCode.split("-")[1];
          v.shelfName = v.wareSeatCode.split("-")[2];
          v.tierChoose = v.wareSeatCode.split("-")[3];
          v.seatProdId = v.seatProdId === "" ? "否" : "是";
        });
      });
      //查询子仓名称的请求
      query_WH_Request(queryData).then((ok) => {
        if (ok.data.code === "10000") {
          // console.log(ok);
          this.childStoreData = ok.data.result.list;
          this.childStoreData.forEach((v) => {
            this.childWarehouseName.push({
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
    };
    this.updateData();
    let data1 = this.areaData;
    queryAreaOfWS(data1).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        this.CSandareaData = ok.data.result;
      }
    });
  },
  methods: {
    clickQuery() {
      //点击查询
      this.tableData = [];
      let SLInforData = this.SLInforData;
      querySLInforCon(SLInforData).then((ok) => {
        if (ok.data.code === "10000") {
          // console.log(ok);
          let res = ok.data.result;
          this.tableData = ok.data.result;
          this.pagingQueryData.pageNumber = res.length;
          this.pageComponentsData.pageNums = res.length;
        } else {
          Message({
            type: "error",
            message: "未知错误",
          });
        }
      });
    },
    clearInput() {
      //点击清空
      this.nameValue = "";
      this.areaNameValue = "";
      this.areaTypeValue = "";
      this.shelfNameValue = "";
      this.tierChooseValue = "";
      this.storageLocalChooseValue = "";
      this.SLInforData.childWareId = "";
      this.SLInforData.wareAreaId = "";
      this.SLInforData.wareAreaType = "";
      this.SLInforData.wareShelfId = "";
      this.SLInforData.shelfLevelNum = "";
      this.SLInforData.id = "";
      this.tableData = [];
      this.updateData();
    },
    printSLCode() {
      //打印条形码图片
      if (!this.multipleSelection.length)
        return Message("请选择要打印条形码的库位");
      // storageLocalChoose
      let codeArr = [];
      this.multipleSelection.forEach((item) => {
        if (!codeArr.includes(item.storageLocalChoose)) {
          codeArr.push(item.storageLocalChoose);
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
      data.forEach((item) => {
        this.ImgsrcArr.push(item);
      });
      this.dayintiaoxinma();
    },

    nameValues(value) {
      this.nameValue = value;
      this.childStoreData.forEach((v) => {
        if (value === v.childWareName) {
          this.SLInforData.childWareId = v.id;
        }
      });
      this.CSandareaData.forEach((v) => {
        if (value === v.childWareName) {
          this.areaNameData.push({
            value: v.wareAreaName,
            label: v.wareAreaName,
          });
        }
      });
    },
    areaNameValues(value) {
      this.areaNameValue = value;
      this.CSandareaData.forEach((v) => {
        if (value === v.wareAreaName) {
          this.SLInforData.wareAreaId = v.id;
          this.areaShelfQueryData.wareAreaId = v.id;
        }
      });
      let areaShelfQueryData = this.areaShelfQueryData;
      areaShelfQuery(areaShelfQueryData).then((ok) => {
        if (ok.data.code === "10000") {
          this.shelfResList = ok.data.result;
          this.shelfResList.forEach((v) => {
            this.shelfNameData.push({
              value: v.shelfName,
              label: v.shelfName,
            });
          });
        }
      });
    },
    chooseItem(event) {
      if (event) {
        this.areaNameData = [];
      }
      // if(event === false){
      //   console.log(this.SLInforData)
      // }
    },
    areaTypeValues(value) {
      this.SLInforData.wareAreaType = value;
    },
    shelfNameValues(value) {
      this.shelfNameValue = value;
      this.shelfResList.forEach((v) => {
        if (value === v.shelfName) {
          this.SLInforData.wareShelfId = v.id;
        }
      });

      let SLInforData = this.SLInforData;
      querySLInforCon(SLInforData).then((ok) => {
        if (ok.data.code === "10000") {
          this.kuweiData = ok.data.result;
          this.kuweiData.forEach((v) => {
            this.storageLocalChooseData.push({
              value: v.wareSeatCode,
              label: v.wareSeatCode,
            });
          });
        }
      });
    },
    tierChooseValues(value) {
      this.tierChooseValue = value;
      this.SLInforData.shelfLevelNum = value;
    },
    storageLocalChooseValues(value) {
      this.storageLocalChooseValue = value;
      this.kuweiData.forEach((v) => {
        if (value === v.wareSeatCode) {
          this.SLInforData.id = v.id;
        }
      });
    },
    SLmap() {
      //库位映射
      this.$router.push("/storageLocalMap/SLmapInfor");
    },
    lookDetail(row, column) {
      if (column.property === "seatProdId") {
        if (row.seatProdId === "否") {
          return Message({
            type: "error",
            message: "该库位还未绑定产品",
          });
        } else {
          this.$router.push({
            path: "/storageLocalMap/SLmapInfor",
            query: { isUsed: row, type: "look" },
          });
        }
      }
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.tableData = [];
      this.updateData();
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
#storageLocalAdmin {
  background: #eef1f8;
  padding: 20px 10px;
  height: 100%;
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
  padding: 0 16px;
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
      height: 36px;
      display: flex;
      align-items: center;
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
        margin: 2px 0 0 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .icon-title-title {
        margin: 0 0 0 8px;
        font-size: 16px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 16px 16px 0;
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
    padding: 16px;
    .lookDetail {
      color: #599af3;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .pageComponent {
    text-align: right;
    height: 36px;
    background: #ffffff;
  }
}
</style>