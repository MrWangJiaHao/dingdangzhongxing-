<template>
  <div id="storageLocalAdmin">
    <!-- 这里库位管理的页面 -->
    <div class="roleName-choose">
      <div class="name_type">
        <div class="nameBox">
          <div class="roleName-text">子仓名称：</div>
          <div class="roleName-checkBox">
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
          <div class="roleName-checkBox">
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
          <div class="roleName-checkBox">
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
          <div class="roleName-checkBox">
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
          <div class="roleName-checkBox">
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
          <div class="roleName-checkBox">
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
    </div>
    <div class="queryBtns">
      <div class="roleName-botton">
        <div class="queryBtn" @click="clickQuery">查询</div>
        <div class="clearBtn" @click="clearInput">清空</div>
      </div>
    </div>
    <!-- --------------------------------------------------------------------------------------------------------------------------------------- -->
    <div class="childWarehouseForm">
      <div class="formHeader">
        <div class="icon-title">
          <div class="icon-title-icon">
            <img src="../../assets/img/home_page-icon-default@2x.png" />
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
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="序号" align="center" type="index" width="55">
          </el-table-column>
          <el-table-column prop="CWName" label="子仓名称" align="center">
          </el-table-column>
          <el-table-column prop="areaName" label="区域名称" align="center">
          </el-table-column>
          <el-table-column prop="areaType" label="区域类型" align="center">
          </el-table-column>
          <el-table-column prop="areaNumber" label="区域编号" align="center">
          </el-table-column>
          <el-table-column prop="shelfName" label="货架" align="center">
          </el-table-column>
          <el-table-column prop="tierChoose" label="层" align="center">
          </el-table-column>
          <el-table-column
            prop="storageLocalChoose"
            label="库位"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="isUsed"
            label="是否已使用"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createName"
            label="创建人"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
          ></el-table-column>
        </el-table>
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
import {
  getBarCodeImg,
  querySLInfor,
  query_WH_Request,
  querySLInforCon,
  queryAreaOfWS,
} from "../../api/api";
import { Message } from "element-ui";
import pagecomponent from "../../components/commin/pageComponent";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
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
      tierChooseData: [],
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
      },
      updateData: "",
      areaData: {
        childWareId: "",
        id: "",
      },
      CSandareaData: [],

      codeData : {
        code: "B2-C02-007-1-3",
      },
      captchaPath:""
    };
  },
  mounted() {
    //查询的请求
    this.updateData = () => {
      let queryData = this.pagingQueryData;
      querySLInfor(queryData).then((ok) => {
        // console.log(ok);
        this.changeData(ok.data.result);
        let res = ok.data.result.list;
        res.forEach((v) => {
          this.tableData.push({
            CWName: v.childWareName,
            areaName: v.wareAreaName,
            areaType: "",
            areaNumber: v.wareSeatCode.substring(0, 2),
            shelfName: v.wareSeatCode.substring(3, 6),
            tierChoose: v.wareSeatCode.substring(7, 10),
            storageLocalChoose: v.wareSeatCode,
            isUsed: v.seatProdId === "" ? "否" : "是",
            createName: v.createUser,
            createTime: v.createTime,
          });
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

    // let SLInforData = this.SLInforData;
    // querySLInforCon(SLInforData).then((ok) => {
    //   if (ok.data.code === "10000") {
    //     this.CSkuweiData = ok.data.result;
    //     this.CSkuweiData.forEach((v) => {
    //       this.areaNameData.push({
    //         value: v.wareAreaName,
    //         label: v.wareAreaName,
    //       });
    //     });
    //     let testObj = {};
    //     this.areaNameData = this.areaNameData.reduce((item, next) => {
    //       testObj[next.value]
    //         ? ""
    //         : (testObj[next.value] = true && item.push(next));
    //       return item;
    //     }, []);
    //   }
    // });

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
          console.log(ok);
          let res = ok.data.result;
          res.forEach((v) => {
            this.tableData.push({
              CWName: v.childWareName,
              areaName: v.wareAreaName,
              areaType: v.wareAreaType === 0 ? "存储区" : "拣货区",
              areaNumber: v.wareSeatCode.split('-')[0],
              shelfName: v.wareSeatCode.split('-')[1],
              tierChoose: v.wareSeatCode.split('-')[3],
              storageLocalChoose: v.wareSeatCode,
              isUsed: v.enableStatus === 0 ? "否" : "是",
              createName: v.createUser,
              createTime: v.createTime,
            });
            this.pagingQueryData.pageNumber = res.length;
            this.pageComponentsData.pageNums = res.length;
          });
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
    },
    printSLCode() {
      //打印条形码图片
       this.captchaPath =
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg?code=" +
        this.codeData.code;
      let blob = new Blob([this.captchaPath], { type: "image/jpeg" });
     
        console.log(blob)
      
      let codeData = this.codeData
      getBarCodeImg(codeData).then((ok) => {
        console.log(ok);
      });
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
    },
    tierChooseValues(value) {
      this.tierChooseValue = value;
    },
    storageLocalChooseValues(value) {
      this.storageLocalChooseValue = value;
    },
    SLmap() {
      //库位映射
      this.$router.push("/storageLocalMap/SLmapInfor");
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
  background: #e6e7ea;
  padding: 16px;
  height: 100%;
}
.publicStyle {
  margin: 0 30px 0 0;
  display: flex;
  align-items: center;
  .roleName-text {
    font-size: 16px;
    white-space: nowrap;
  }
  .roleName {
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d1d6e2;
    // margin: 16px;
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
  flex-wrap: wrap;
  .name_type {
    display: flex;
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
  }
}
.queryBtns {
  height: 52px;
  position: relative;
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
.childWarehouseForm {
  margin: 16px 0 0 0;
  background: white;
  .formHeader {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d1d6e2;
    .icon-title {
      display: flex;
      margin: 24px 0 0 0;
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
        font-size: 16px;
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
      .goOn {
        margin-right: 10px;
        @include BtnFunction("success");
      }
    }
  }
  .resultForm {
    padding: 20px;
  }
  .pageComponent {
    margin: 20px 10px 0 0;
    text-align: right;
    height: 36px;
    background: #ffffff;
  }
}
</style>