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
              @change="nameValue"
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
              @change="areaNameValue"
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
              @change="areaTypeValue"
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
              @change="shelfNameValue"
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
              @change="tierChooseValue"
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
              @change="storageLocalChooseValue"
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
      <div class="pageComponent" v-if="this.tableData.length >= 10">
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
import { getBarCodeImg, querySLInfor, query_WH_Request } from "../../api/api";
import { Message } from "element-ui";
export default {
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
      nameValue: "全部",
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
    };
  },
  mounted() {
    //查询的请求
    let queryData = this.pagingQueryData;
    querySLInfor(queryData).then((ok) => {
      console.log(ok);
    });
    //查询子仓名称的请求
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
    clickQuery() {
      //点击查询
      let SLInforData = {
        childWareId: "", //子仓id
        wareAreaId: "", //仓库区域id
        wareAreaType: 1, //区域类型（1-存储区；2-拣货区）
        wareShelfId: "", //仓库货架id
        shelfLevelNum: "", //货架层数(仅查询本层库位)
      };
      querySLInfor(SLInforData).then((ok) => {
        console.log(ok);
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
      //后台没有返回数据
      let codeData = {
        code: "B2-C02-007-1-3",
      };
      getBarCodeImg(codeData).then((ok) => {
        console.log(ok);
      });
    },
    SLmap() {
      //库位映射
      this.$router.push('/storageLocalMap/SLmapInfor')
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
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