<template>
  <div id="specificationAdmin">
    <!-- 这是规格管理页面 -->
    <div class="roleName">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="nameBox">
            <div class="roleName-text">规格单位：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="specUnitValue"
                placeholder="请选择规格单位"
                @change="specUnitValues"
              >
                <el-option
                  v-for="item in specUnitData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">规格值：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="specValue"
                placeholder="请选择规格值"
                @change="specValues"
              >
                <el-option
                  v-for="item in specValueData"
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
            <div class="setUser" @click="create">创建</div>
            <div class="bianjiUser" @click="edit">编辑</div>
            <div class="remove" @click="del">删除</div>
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
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="71"
            >
            </el-table-column>
            <el-table-column prop="specValue" label="规格值" align="center">
            </el-table-column>
            <el-table-column prop="specUnit" label="规格单位">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              align="center"
              show-overflow-tooltip
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

    <!-- 弹框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      custom-class="animate__animated animate__zoomIn"
    >
      <div class="dialogBox">
        <div class="boxTitle"><span>基础信息</span></div>
        <div class="boxContent">
          <div class="content_one">
            <div class="name_con name_con_one">
              <div class="setSupplierName">
                <span class="addStar">规格单位</span>
              </div>
              <el-input
                v-model="specUnitInput"
                placeholder="请输入规格单位 mm/cm/m"
                @blur="specUnitInputEvent"
              ></el-input>
            </div>
            <div class="name_con name_con_one">
              <div class="setSupplierName">
                <span class="addStar">规格值</span>
              </div>
              <el-input
                v-model="specValueInput"
                placeholder="请输入规格值 例:20*20*20"
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
import { createSpec, querySpec, delSpec, querySpecCon } from "../../api/api";
import { getCookie, reduceFun } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      title: "",
      specUnitValue: "",
      specValue: "",
      specUnitData: [],
      specValueData: [],
      tableData: [],
      tableData1: [],
      multipleSelection: [],
      queryData: {
        //分页查询
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          id: "",
        },
      },
      pageComponentsData: {
        pageNums: 0,
      },

      dialogFormVisible: false,

      specUnitInput: "",
      remarkInfor: "",
      specValueInput: "",
      querySpecFun: () => {},
      specId: "",
      promptMessage: "create",
    };
  },
  mounted() {
    this.querySpecFun = () => {
      querySpec(this.queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.changeData(ok.data.result);
          this.tableData = [];
          this.tableData = ok.data.result.list;
        } else {
          this.$messageSelf.message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    };
    querySpecCon({
      id: "",
      wareId: "",
      // wareId: getCookie("X-Auth-wareId"),
    }).then((ok) => {
      if (ok.data.code === "10000") {
        ok.data.result.forEach((v) => {
          this.specUnitData.push({
            value: v.specUnit,
            label: v.specUnit,
          });
          this.specValueData.push({
            value: v.id,
            label: v.specValue,
          });
          this.specUnitData = reduceFun(this.specUnitData);
          this.specValueData = reduceFun(this.specValueData);
        });
      }
    });
    this.querySpecFun();
  },
  methods: {
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    specUnitValues(val) {
      this.queryData.paras.specUnit = val;
    },
    specValues(val) {
      this.queryData.paras.id = val;
    },
    okBtn() {
      if (this.specUnitInput === "") {
        return this.$messageSelf.message({
          message: "请输入规格单位",
          type: "warning",
        });
      }
      if (this.specValueInput === "") {
        return this.$messageSelf.message({
          message: "请输入规格",
          type: "warning",
        });
      }
      var pattern = /^\d+\*{1}\d+\*{1}\d+$/;
      if (!pattern.test(this.specValueInput)) {
        return this.$messageSelf.message({
          type: "error",
          message: "请输入正确的规格格式",
        });
      }
      // this.specValueInput =
      //   this.specValueInput.split("*")[0] +
      //   this.specUnitInput +
      //   "*" +
      //   this.specValueInput.split("*")[1] +
      //   this.specUnitInput +
      //   "*" +
      //   this.specValueInput.split("*")[2] +
      //   this.specUnitInput;
      let createData = {
        id: this.specId,
        wareId: getCookie("X-Auth-wareId"),
        specValue: this.specValueInput,
        specUnit: this.specUnitInput,
        remark: this.remarkInfor,
      };
      // console.log(createData)
      createSpec(createData).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            message: this.promptMessage === "create" ? "创建成功" : "编辑成功",
            type: "success",
          });
          this.querySpecFun();
          this.specUnitInput = "";
          this.remarkInfor = "";
          this.specValueInput = "";
          this.dialogFormVisible = false;
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
      this.querySpecFun();
    },
    clearInput() {
      //点击清空输入框
      this.queryData.paras.id = "";
      this.queryData.paras.specUnit = "";
      this.specUnitValue = "";
      this.specValue = "";
      this.querySpecFun();
    },
    create() {
      //创建
      this.dialogFormVisible = true;
      this.title = "添加规格";
      this.promptMessage = "create";
      this.specUnitInput = "";
      this.remarkInfor = "";
      this.specValueInput = "";
    },
    edit() {
      //编辑
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要编辑的规格",
          type: "warning",
        });
      if (this.multipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能编辑一个规格",
          type: "warning",
        });
      this.dialogFormVisible = true;
      this.title = "编辑规格";
      this.promptMessage = "edit";
      let gys = this.multipleSelection[0];
      this.specUnitInput = gys.specUnit;
      this.remarkInfor = gys.remark;
      // this.specValueInput =
      //   parseInt(gys.specValue.split("*")[0]) +
      //   "*" +
      //   parseInt(gys.specValue.split("*")[1]) +
      //   "*" +
      //   parseInt(gys.specValue.split("*")[2]);
      this.specId = gys.id;
    },
    del() {
      //删除
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length)
        return this.$messageSelf.message({
          message: "请选择要删除的规格",
          type: "warning",
        });
      this.$messageSelf
        .confirms(
          `确定要删除这${this.multipleSelection.length}条规格？`,
          "删除确认",
          {
            type: "info",
          }
        )
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {});
    },
    //删除的请求
    delRequest(data) {
      delSpec(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "删除成功",
          });
          this.querySpecFun();
        } else {
          this.$messageSelf.message({
            type: "error",
            message: ok.data.msg ? ok.data.msg : "删除失败",
          });
        }
      });
    },
    //输入框失焦事件
    specUnitInputEvent() {
      if (
        this.specUnitInput === "mm" ||
        this.specUnitInput === "cm" ||
        this.specUnitInput === "m"
      ) {
        return;
      } else {
        if (this.specUnitInput !== "") {
          this.$messageSelf.message({
            type: "error",
            message: "请输入正确的规格单位",
          });
        }
      }
    },
    // specValueInputFocusEvent() {
    //   if (this.specUnitInput === "") {
    //     this.$messageSelf.message({
    //       type: "error",
    //       message: "请先输入规格单位",
    //     });
    //   }
    // },
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
      this.querySpecFun();
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
#specificationAdmin {
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
      margin: 0 20px 0 10px;
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

#specificationAdmin {
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
              width: 420px;
              border-radius: 3px;
              .setSupplierName {
                width: 110px;
                background: #ecf1f7;
                border-right: 1px solid #d1d6e2;
                line-height: 34px;
                color: #000;
                text-align: right;
                padding: 0 16px;
              }
              .el-input {
                width: 308px;
                .el-input__inner {
                  width: 308px;

                  border: none;
                  color: #000;
                }
              }
            }

            .name_con {
              display: flex;
            }
          }
          .remarkInforBox {
            border: 1px solid #d1d6e2;
            border-radius: 3px;
            .remarkInforTitle {
              width: 110px;
              background: #ecf1f7;
              border-right: 1px solid #d1d6e2;
              line-height: 94px;
              padding: 0 16px;
              color: #000;
              text-align: right;
            }
            .el-textarea {
              width: 748px;
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