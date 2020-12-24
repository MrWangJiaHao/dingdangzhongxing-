<template>
  <!-- 这是品牌管理页面 -->
  <div id="brandAdmin">
    <div class="roleName">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="nameBox">
            <div class="roleName-text">品牌名称：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="nameValue"
                placeholder="请选择品牌名称"
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
            <el-table-column prop="braFullName" label="品牌名称" align="center">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              align="center"
              width="110"
            >
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

    <!-- 弹框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" custom-class="animate__animated animate__zoomIn">
      <div class="dialogBox">
        <div class="boxTitle"><span>基础信息</span></div>
        <div class="boxContent">
          <div class="content_one">
            <div class="name_con name_con_one">
              <div class="setSupplierName">品牌名称</div>
              <el-input
                v-model="braFullName"
                placeholder="请输入品牌名称"
              ></el-input>
            </div>
          </div>
          <div class="remarkInforBox content_one">
            <div class="remarkInforTitle">备注信息</div>
            <el-input
              type="textarea"
              placeholder="请输入备注信息"
              v-model="remarkInfor"
              maxlength="100"
              show-word-limit
            >
            </el-input>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <div @click="dialogFormVisible = false" class="quxiaoBox">取 消</div>
        <div @click="okBtn" class="sureBtn">提 交</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import {
  createBrand,
  queryBrand,
  delBrand,
  queryBrandCon,
} from "../../api/api";
import { getCookie } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      title: "",
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

      dialogFormVisible: false,
      formLabelWidth: "120px",

      braFullName: "",
      remarkInfor: "",
      queryBrandFun: () => {},
      brandId: "",
      promptMessage: "create",
    };
  },
  mounted() {
    this.queryBrandFun = () => {
      let pagingQueryData = this.pagingQueryData;
      queryBrand(pagingQueryData).then((ok) => {
        if (ok.data.code === "10000") {
          this.changeData(ok.data.result);
          this.tableData = ok.data.result.list;
          this.tableData1 = ok.data.result.list;
          this.tableData.forEach((v) => {
            this.brandNameData.push({
              value: v.braFullName,
              label: v.braFullName,
            });
            let testObj = {};
            this.brandNameData = this.brandNameData.reduce((item, next) => {
              testObj[next.value]
                ? ""
                : (testObj[next.value] = true && item.push(next));
              return item;
            }, []);
          });
        } else {
          this.$messageSelf.message({
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
        if (val === v.braFullName) {
          this.pagingQueryData.paras.id = v.id;
        }
      });
    },
    okBtn() {
      this.dialogFormVisible = false;
      let createData = {
        id: this.brandId,
        wareId: getCookie("X-Auth-wareId"),
        braFullName: this.braFullName,
        remark: this.remarkInfor,
      };
      createBrand(createData).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            message: this.promptMessage === "create" ? "创建成功" : "编辑成功",
            type: "success",
          });
          this.queryBrandFun();
          this.braFullName = "";
          this.remarkInfor = "";
        } else {
          this.$messageSelf.message({
            message: ok.data.msg,
            type: "error",
          });
        }
      });
    },
    clickQuery() {
      //点击查询
      this.tableData = [];
      let idQueryData = {
        id: this.pagingQueryData.paras.id,
        wareId: "",
      };
      queryBrandCon(idQueryData).then((ok) => {
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result;
        } else {
          this.$messageSelf.message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    },
    clearInput() {
      //点击清空输入框
      this.nameValue = "";
      this.queryBrandFun();
    },
    createChildWarehouse() {
      //创建
      this.dialogFormVisible = true;
      this.title = "添加品牌";
      this.promptMessage = "create";
    },
    editChildWarehouse() {
      //编辑
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要查看的品牌",
          type: "warning",
        });
      if (this.multipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能编辑一个品牌信息，请重新选择",
          type: "warning",
        });
      this.dialogFormVisible = true;
      this.title = "编辑品牌";
      this.promptMessage = "edit";
      let gys = this.multipleSelection[0];
      this.braFullName = gys.braFullName;
      this.remarkInfor = gys.remark;
      this.brandId = gys.id;
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
          message: "请选择要删除的品牌",
          type: "warning",
        });
      this.$messageSelf
        .confirms("确定要删除该品牌？", "删除确认", {
          type: "info",
        })
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {
          this.$messageSelf.message("已取消删除");
        });
    },
    //删除的请求
    delRequest(data) {
      delBrand(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "删除成功",
          });
          this.queryBrandFun();
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
      this.tableData = [];
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
#brandAdmin {
  background: #eef1f8;
  padding: 20px 10px;
}
.roleName-choose {
  display: flex;
  justify-content: space-between;
  .name_type {
    display: flex;
    .nameBox {
      display: flex;
      align-items: center;
      margin: 0 0 0 16px;
      .roleName-text {
        font-size: 14px;
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
    width: 190px;
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

<style lang="scss">
@import "../../assets/scss/btn.scss";

#brandAdmin {
  .el-dialog__wrapper {
    // background: #eef1f8;
  }
  .el-dialog {
    width: 900px;
    height: 466px;
    // box-shadow: 0 0 5px 3px #e1e2e5;
    border-radius: 4px;
    .el-dialog__header {
      padding: 0 20px;
      font-weight: 600;
      height: 50px;
      width: 100%;
      line-height: 50px;
      background: #ecf1f7;
      .el-dialog__headerbtn {
        top: 0;
      }
    }
    .el-dialog__body {
      width: 100%;
      height: 336px;
      border-top: 1px solid #d1d6e2;
      border-bottom: 1px solid #d1d6e2;
      padding: 0 20px;
      .dialogBox {
        .boxTitle span {
          line-height: 56px;
          font-size: 16px;
          color: #5bb2fe;
          font-weight: 600;
          margin-left: 10px;
          position: relative;
        }
        .boxTitle span::before {
          content: "";
          width: 3px;
          height: 100%;
          background: #5bb2fe;
          position: absolute;
          left: -10px;
          top: 0px;
        }
        .boxContent {
          .content_one {
            display: flex;
            margin-bottom: 16px;
            .name_con_one {
              border: 1px solid #d1d6e2;
              margin-right: 20px;
              width: 394px;
              .setSupplierName {
                width: 104px;
                background: #ecf1f7;
                border-right: 1px solid #d1d6e2;
                line-height: 36px;
                color: #000;
                text-align: center;
              }
              .el-input {
                width: 288px;
                .el-input__inner {
                  border: none;
                  color: #000;
                }
              }
            }
            .name_con {
              display: flex;
            }
          }
          .comAddr {
            width: 404px;
            border: 1px solid #d1d6e2;
            border-radius: 3px;
            .comAddrName {
              width: 104px;
              background: #ecf1f7;
              border-right: 1px solid #d1d6e2;
              line-height: 36px;
              padding: 0 16px;
              color: #000;
            }
            .el-cascader {
              width: 300px;
              .el-input__inner {
                border: none;
              }
            }
          }
          .xiangxiAddr {
            border: 1px solid #d1d6e2;
            border-radius: 3px;
            .XXAddrName {
              width: 104px;
              background: #ecf1f7;
              border-right: 1px solid #d1d6e2;
              line-height: 36px;
              padding: 0 16px;
              color: #000;
            }
            .el-input__inner {
              border: none;
            }
          }
          .remarkInforBox {
            border: 1px solid #d1d6e2;
            border-radius: 3px;
            .remarkInforTitle {
              width: 104px;
              background: #ecf1f7;
              border-right: 1px solid #d1d6e2;
              line-height: 94px;
              padding: 0 16px;
              color: #000;
            }
            .el-textarea__inner {
              border: none;
              color: #000;
            }
          }
        }
      }
    }
    .el-dialog__footer {
      width: 100%;
      height: 76px;
      padding: 0 20px;
      .dialog-footer {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .quxiaoBox {
          @include BtnFunction();
        }
        .sureBtn {
          @include BtnFunction("success");
          margin-left: 10px;
        }
      }
    }
  }
}
</style>