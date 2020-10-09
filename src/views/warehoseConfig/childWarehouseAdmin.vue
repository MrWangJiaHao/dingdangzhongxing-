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
            <div class="roleName-checkBox">
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
              <img src="../../assets/img/home_page-icon-default@2x.png" />
            </div>
            <div class="icon-title-title">子仓管理</div>
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
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="60"
            >
            </el-table-column>
            <el-table-column prop="CWName" label="子仓名称" align="center">
            </el-table-column>
            <el-table-column
              prop="CWnumber"
              label="子仓编号"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="CWtype"
              label="子仓类型"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="CWWidth"
              label="子仓长(m)"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="CWHeight"
              label="子仓宽(m)"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="Ndistance"
              label="距北距离(m)"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="Wdistance"
              label="距西距离(m)"
              align="center"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="divideArea"
              label="是否划分区域"
              align="center"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="usedArea"
              label="已使用面积(㎡)"
              align="center"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="unUsedArea"
              label="未使用面积(㎡)"
              align="center"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
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
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { Message } from "element-ui";
import {
  del_WH_Request,
  query_WH_Request,
  TJquery_WH_Request,
} from "../../api/api";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      childWarehouseName: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "销售仓",
          label: "销售仓",
        },
        {
          value: "残次品仓",
          label: "残次品仓",
        },
        {
          value: "售后仓",
          label: "售后仓",
        },
      ],
      childWarehouseType: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "销售",
          label: "销售",
        },
        {
          value: "残次品",
          label: "残次品",
        },
        {
          value: "售后",
          label: "售后",
        },
        {
          value: "备货",
          label: "备货",
        },
        {
          value: "验货",
          label: "验货",
        },
      ],
      nameValue: "全部",
      typeValue: "全部",
      tableData: [],
      multipleSelection: [],
      pagingQueryData: {
        //分页查询
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
      requestMethods: "",
    };
  },
  mounted() {
    this.requestMethods = () => {
      let queryData = this.pagingQueryData;
      let tableData = this.tableData;
      query_WH_Request(queryData).then((ok) => {
        if (ok.data.code === "10000") {
          //将查询结果赋值给一个变量
          this.changeData(ok.data.result);
          // 将查询出来的数组进行循环，分别插入到表格中
          let resultList = ok.data.result.list;
          //将查询出来的数据存储到vuex里面
          this.$store.dispatch("CWAdminRequest", ok.data.result);
          //将查询出来的数据赋值给子仓名称选择框
          // let childWarehouseName =  this.childWarehouseName
          // childWarehouseName.forEach((v,i)=>{

          // })
          resultList.forEach((values, indexs) => {
            let tableDataItem = {
              CWName: resultList[indexs].childWareName, //子仓名称
              CWnumber: resultList[indexs].childWareCode, //子仓编号
              CWtype: resultList[indexs].wareType, //子仓类型
              CWWidth: resultList[indexs].wareLength, //子仓长度
              CWHeight: resultList[indexs].wareWidth, //子仓宽度
              Ndistance: resultList[indexs].northDistance, //距北距离
              Wdistance: resultList[indexs].westDistance, //距西距离
              divideArea: resultList[indexs].enableStatus, //是否划分区域
              usedArea: resultList[indexs].size, //已使用面积
              unUsedArea:
                resultList[indexs].wareLength * resultList[indexs].wareWidth -
                resultList[indexs].size, //未使用面积
              remark: resultList[indexs].remark, //备注
              createName: resultList[indexs].createUser, //创建人
              createTime: resultList[indexs].createTime, //创建时间
              id: resultList[indexs].id,
            };
            tableData.push(tableDataItem); //将请求的数据插入到表格中
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
    },
    selectType(val) {
      this.typeValue = val;
    },
    clickQuery() {
      //点击查询
      TJquery_WH_Request().then((ok) => {
        console.log(ok);
      });
    },
    clearInput() {
      //点击清空输入框
      this.nameValue = "";
      this.typeValue = "";
    },
    createChildWarehouse() {
      //创建
      this.$router.push({ path: "/warehoseConfig/addChildWarehouse" });
    },
    editChildWarehouse() {
      //编辑
      // if (!this.multipleSelection.length) return Message("请选择要查看的账号");
      // if (this.multipleSelection.length !== 1)
      //   return Message({
      //     message: "每次只能查看一条账号，请重新选择",
      //     type: "warning",
      //   });
      this.$router.push({
        path: "editChildWarehouse",
        // query: {editArr:this.multipleSelection},
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
      if (!arr.length) return Message("请选择要删除的用户");
      this.$confirm("确定要删除改用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {
          Message("已取消删除");
        });
    },
    //删除的请求
    delRequest(data) {
      del_WH_Request(data).then((ok) => {
        if (ok.data.code === "10000") {
          Message({
            type: "success",
            message: "删除成功",
          });
          window.location.reload();
        } else {
          Message({
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
  background: #e6e7ea;
  padding: 16px;
}
.roleName-choose {
  display: flex;
  justify-content: space-between;
  .name_type {
    display: flex;
    .nameBox {
      margin: 0 50px 0 0;
    }
    .nameBox,
    .typeBox {
      display: flex;
      align-items: center;
      .roleName-text {
        font-size: 16px;
      }
      .roleName {
        // width: 100%;
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