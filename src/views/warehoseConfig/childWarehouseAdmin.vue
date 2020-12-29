<template>
  <div id="childWarehouseAdmin">
    <div class="roleName">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="nameBox">
            <div class="roleName-text">子仓名称：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="nameValue"
                placeholder="请选择子仓名称"
                @change="selectName"
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
          <div class="typeBox">
            <div class="roleName-text">子仓类型：</div>
            <div class="roleName-checkBox" style="width: 150px">
              <el-select
                v-model="typeValue"
                placeholder="请选择子仓类型"
                @change="selectType"
              >
                <el-option
                  v-for="item in childWarehouseType"
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
      <div class="childWarehouseForm">
        <div class="formHeader">
          <div class="icon-title">
            <div class="icon-title-icon">
              <img src="../../assets/img/systemTitlemesa.png" />
            </div>
            <div class="icon-title-title">查询结果</div>
          </div>
          <div class="someBtn">
            <div class="setUser" @click="createChildWarehouse">创建</div>
            <div class="bianjiUser" @click="editChildWarehouse">编辑</div>
            <div class="remove" @click="delChildWarehouse">删除</div>
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
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="60"
            >
            </el-table-column>
            <el-table-column
              prop="childWareName"
              label="子仓名称"
              align="center"
              width="110"
              min-width="110"
            >
            </el-table-column>
            <el-table-column
              prop="childWareCode"
              label="子仓编号"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="wareType"
              label="子仓类型"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="wareLength"
              label="子仓长(m)"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="wareWidth"
              label="子仓宽(m)"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="northDistance"
              label="距北距离(m)"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="westDistance"
              label="距西距离(m)"
              align="center"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="areaNum"
              label="是否划分区域"
              align="center"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="size"
              label="已使用面积(㎡)"
              align="right"
              width="120"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="unUsedArea"
              label="未使用面积(㎡)"
              align="right"
              width="120"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
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
    </div>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import {
  del_WH_Request,
  query_WH_Request,
  TJquery_WH_Request,
} from "../../api/api";
import { getCookie, reduceFun } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      childWarehouseName: [],
      childWarehouseType: [
        {
          value: "1",
          label: "销售",
        },

        {
          value: "2",
          label: "售后",
        },
        {
          value: "3",
          label: "残次品",
        },
      ],
      nameValue: "",
      typeValue: "",
      tableData: [],
      multipleSelection: [],
      pagingQueryData: {
        //分页查询
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          wareType: "",
          id: "",
        },
      },
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 0, //一共多少条 //默认一页10条
      },
      requestMethods: () => {},
      tjQueryData: {
        id: "",
        wareId: getCookie("X-Auth-wareId"),
      },
      queryRes: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.tableData = [];
      vm.requestMethods();
    });
  },
  mounted() {
   
    this.requestMethods = () => {
      let queryData = this.pagingQueryData;
      query_WH_Request(queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          // console.log(ok.data.result);
          this.queryRes = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData = ok.data.result.list;
          //将查询出来的数据存储到vuex里面
          this.$store.dispatch("CWAdminRequest", ok.data.result);
          //将查询出来的数据赋值给子仓名称选择框
          this.tableData.forEach((v) => {
            v.wareType =
              v.wareType === 1
                ? "销售仓"
                : v.wareType === 2
                ? "售后仓"
                : v.wareType === 3
                ? "残次品仓"
                : "——";
            v.areaNum = v.areaNum > 0 ? "是" : "否";
            v.unUsedArea = v.wareLength * v.wareWidth - v.size;
            this.childWarehouseName.push({
              value: v.childWareName,
              label: v.childWareName,
            });
            this.childWarehouseName = reduceFun(this.childWarehouseName);
          });
        }
      });
    };
    this.requestMethods();
  },
  methods: {
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    selectName(val) {
      this.nameValue = val;
      this.queryRes.forEach((v) => {
        if (val === v.childWareName) {
          this.tjQueryData.id = v.id;
        }
      });
    },
    selectType(val) {
      this.typeValue = val;
      this.tjQueryData.wareType = val;
    },
    clickQuery() {
      //点击查询
      let tjQueryData = this.tjQueryData;
      TJquery_WH_Request(tjQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result;
          this.tableData.forEach((v) => {
            v.wareType =
              v.wareType === 1
                ? "销售仓"
                : v.wareType === 2
                ? "售后仓"
                : v.wareType === 3
                ? "残次品仓"
                : "——";
            v.areaNum = v.areaNum > 0 ? "是" : "否";
            v.unUsedArea = v.wareLength * v.wareWidth - v.size;
          });
        }
      });
    },
    clearInput() {
      //点击清空输入框
      this.nameValue = "";
      this.typeValue = "";
      this.tableData = [];
      this.queryRes = [];
      this.tjQueryData.id = "";
      this.tjQueryData.wareType = "";
      this.requestMethods();
    },
    createChildWarehouse() {
      //创建
      this.$router.push({ path: "/warehoseConfig/addChildWarehouse" });
    },
    editChildWarehouse() {
      this.$router.push({
        path: "/warehoseConfig/editChildWarehouse",
      });
    },
    delChildWarehouse() {
      //删除
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length)
        return this.$messageSelf.message({
          message: "请选择要删除的子仓",
          type: "warning",
        });
      this.$messageSelf
        .confirms("确定要删除该子仓？", "提示", {
          type: "info",
        })
        .then(() => {
          this.delRequest({ ids: arr });
        })
    },
    //删除的请求
    delRequest(data) {
      del_WH_Request(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "删除成功",
          });
          this.requestMethods();
        } else {
          this.$messageSelf.message({
            type: "error",
            message: ok.data.msg ? ok.data.msg : "删除失败",
          });
        }
      });
    },

    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.pagingQueryData.pageNumber = e;
      this.requestMethods();
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
#childWarehouseAdmin {
  background: #eef1f8;
  padding: 20px 10px;
}
.roleName-choose {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .name_type {
    display: flex;
    .nameBox {
      margin: 0 20px 0 0;
    }
    .nameBox,
    .typeBox {
      display: flex;
      align-items: center;
      .roleName-text {
        font-size: 14px;
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
  }

  .roleName-botton {
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
.childWarehouseForm {
  margin: 20px 0 0 0;
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
      .goOn {
        margin-right: 10px;
        @include BtnFunction("success");
      }
    }
  }
  .resultForm {
    padding: 16px 20px;
  }
}
</style>