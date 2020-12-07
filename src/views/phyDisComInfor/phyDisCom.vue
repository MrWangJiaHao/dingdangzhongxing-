<template>
  <!-- 这是物流公司页面 -->
  <div id="supplierAdmin">
    <div class="roleName">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="nameBox">
            <div class="roleName-text">物流公司：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="nameValue"
                placeholder="请选择物流公司"
                @change="selectName"
              >
                <el-option
                  v-for="item in brandNameData"
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
            <div class="icon-title-title">物流公司信息</div>
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
              label="序号"
              align="center"
              type="index"
              width="60"
            >
            </el-table-column>
            <el-table-column prop="exprName" label="物流公司" align="center">
            </el-table-column>
            <el-table-column
              prop="exprContact"
              label="联系人"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="exprContactPhone"
              label="联系电话"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="expAddr"
              label="物流公司地址"
              align="center"
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
import { Message } from "element-ui";
import { queryPhyDisCom, queryPhyDisComCon } from "../../api/api";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      nameValue: "",
      brandNameData: [],
      tableData: [],
      tableData1: [],
      multipleSelection: [],
      pagingQueryData: {
        //分页查询
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          id: "",
        },
      },
      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10条
      },
      id: "",
      queryBrandFun: () => {},
    };
  },
  mounted() {
    this.queryBrandFun = () => {
      let pagingQueryData = this.pagingQueryData;
      queryPhyDisCom(pagingQueryData).then((ok) => {
        //   console.log(ok)
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.changeData(ok.data.result);
          this.tableData = ok.data.result.list;
          this.tableData1 = ok.data.result.list;
          this.tableData1.forEach((v) => {
            this.brandNameData.push({
              value: v.exprName,
              label: v.exprName,
            });
          });
        } else {
          Message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    };
    this.queryBrandFun();
  },
  methods: {
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    selectName(val) {
      this.nameValue = val;
      this.tableData1.forEach((v) => {
        if (val === v.exprName) {
          this.id = v.id;
        }
      });
    },

    clickQuery() {
      //点击查询
      this.tableData = [];
      let idQueryData = {
        id: this.id,
      };
      queryPhyDisComCon(idQueryData).then((ok) => {
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result;
        } else {
          Message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    },
    clearInput() {
      //点击清空输入框
      this.id = "";
      this.brandNameData = [];
      this.nameValue = "";
      this.queryBrandFun();
    },
    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.pagingQueryData.pageNumber = e;
      this.queryBrandFun();
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
#supplierAdmin {
  background: #eef1f8;
  padding: 20px 10px;
}
.roleName-choose {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  .name_type {
    display: flex;
    .nameBox {
      display: flex;
      align-items: center;
      margin: 0 50px 0 0;
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
  margin: 16px 0 0 0;
  background: white;
  .formHeader {
    height: 50px;
    border-bottom: 1px solid #d1d6e2;
    .icon-title {
      display: flex;
      align-items: center;
      .icon-title-icon {
        width: 14px;
        height: 14px;
        margin: 0 0 5px 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .icon-title-title {
        margin: 0 0 0 8px;
        line-height: 50px;
      }
    }
  }
  .resultForm {
    padding: 16px;
  }
}
</style>

