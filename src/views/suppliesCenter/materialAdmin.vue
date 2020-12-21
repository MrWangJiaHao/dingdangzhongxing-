<template>
  <div id="mateAdmin">
    <!-- 这是物料管理页面 -->
    <div class="roleName">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="nameBox">
            <div class="roleName-text">物料名称：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="mateNameValue"
                placeholder="请选择物料名称"
                @change="mateNameValues"
              >
                <el-option
                  v-for="item in mateNameValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">物料编号：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="mateNumValue"
                placeholder="请选择物料编号"
                @change="mateNumValues"
              >
                <el-option
                  v-for="item in mateNumValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">物料类型：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="mateTypeValue"
                placeholder="请选择物料类型"
                @change="mateTypeValues"
              >
                <el-option
                  v-for="item in mateTypeValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">供应商：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="supNameValue"
                placeholder="请选择供应商"
                @change="supNameValues"
              >
                <el-option
                  v-for="item in supNameValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">品牌：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="brandNameValue"
                placeholder="请选择品牌"
                @change="brandNameValues"
              >
                <el-option
                  v-for="item in brandNameValueData"
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
            <div class="icon-title-title">物料管理信息</div>
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
              prop="materielName"
              label="物料名称"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="specName" label="规格" align="center">
            </el-table-column>
            <el-table-column prop="supName" label="供应商" align="center">
            </el-table-column>
            <el-table-column prop="braName" label="品牌" align="center">
            </el-table-column>
            <el-table-column
              prop="inventoryFloor"
              label="低库存预警值"
              align="center"
            >
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
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      custom-class="animate__animated animate__zoomIn"
    >
      <div class="dialogBox">
        <div class="boxTitle">
          <span>基础信息</span>
        </div>
        <div class="boxContent">
          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title addStar">物料类型</div>
              <el-select
                v-model="dialogMateType"
                clearable
                placeholder="请选择物料类型"
                @change="dialogMateTypes"
              >
                <el-option
                  v-for="item in dialogMateTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="name_con">
              <div class="name_con_title addStar">物料名称</div>
              <el-input
                v-model="dialogMateName"
                placeholder="请输入物料名称"
              ></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title addStar">物料编号</div>
              <el-input
                v-model="dialogMateCode"
                placeholder="请输入物料编号"
              ></el-input>
            </div>
          </div>
          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title">品牌</div>
              <el-select
                v-model="dialogBrandName"
                placeholder="请选择品牌"
                @change="dialogBrandNames"
              >
                <el-option
                  v-for="item in dialogBrandData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="name_con">
              <div class="name_con_title">供应商</div>
              <el-select
                v-model="dialogSupValue"
                clearable
                placeholder="请选择供应商"
                @change="dialogSupValues"
              >
                <el-option
                  v-for="item in dialogSupData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="name_con">
              <div class="name_con_title addStar1">规格</div>
              <el-select
                v-model="dialogSpecValue"
                clearable
                placeholder="请选择规格"
                @change="dialogSpecValues"
              >
                <el-option
                  v-for="item in dialogSpecData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="earlyWarnBox">
            <div class="earlyWarn addStar2">低库存预警值</div>
            <el-input
              v-model="dialogEarlyWarnValue"
              placeholder="请输入低库存预警值"
            ></el-input>
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
        <div @click="okBtn" class="sureBtn">确 定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import {
  createMateAdmin,
  queryMateAdmin,
  delMateAdmin,
  queryMateAdminCon,
  queryBrand,
  querySupplier,
  querySpec,
} from "../../api/api";
import { reduceFun } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      title: "",
      mateNameValue: "",
      mateNumValue: "",
      mateTypeValue: "",
      supNameValue: "",
      brandNameValue: "",
      mateNameValueData: [],
      mateNumValueData: [],
      mateTypeValueData: [
        {
          value: "1",
          label: "纸箱",
        },
        {
          value: "2",
          label: "胶带",
        },
        {
          value: "3",
          label: "打印纸",
        },
      ],
      supNameValueData: [],
      brandNameValueData: [],

      //----------弹窗里面的select选择框和输入框开始---------------
      dialogMateTypeData: [
        {
          value: "1",
          label: "纸箱",
        },
        {
          value: "2",
          label: "胶带",
        },
        {
          value: "3",
          label: "打印纸",
        },
      ],
      dialogMateType: "",
      dialogMateName: "",
      dialogMateCode: "",
      dialogBrandName: "",
      dialogSupValue: "",
      dialogBrandData: [],
      dialogSupData: [],
      dialogSpecData: [],
      dialogEarlyWarnValue: "",
      remarkInfor: "",
      dialogSpecValue: "",
      //----------弹窗里面的select选择框和输入框结束---------------
      tableData: [],
      tableData1: [],
      multipleSelection: [],
      pagingQueryData: {
        //分页查询
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          materielName: "",
          materielCode: "",
          materielType: "",
          supId: "",
          braId: "",
        },
      },
      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10条
      },

      dialogFormVisible: false,
      queryMateAdminFun: () => {},
      mateId: "",
      allBrandData: [],
      allSupData: [],
      allSpecData: [],
      allBrandId: "",
      allSupId: "",
      allSpecId: "",
      queryAnyInfor: () => {},
    };
  },
  mounted() {
    this.queryAnyInfor = () => {
      let QueryData = {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          id: "",
        },
      };
      //查询品牌
      queryBrand(QueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.allBrandData = ok.data.result.list;
          this.allBrandData.forEach((v) => {
            this.dialogBrandData.push({
              value: v.braFullName,
              label: v.braFullName,
            });
            this.brandNameValueData.push({
              value: v.braFullName,
              label: v.braFullName,
            });
            this.dialogBrandData = reduceFun(this.dialogBrandData);
          });
        } else {
          this.$messageSelf.message({
            message: "查询品牌失败",
            type: "error",
          });
        }
      });
      //查询供应商
      querySupplier(QueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.allSupData = ok.data.result.list;
          this.allSupData.forEach((v) => {
            this.dialogSupData.push({
              value: v.supFullName,
              label: v.supFullName,
            });
            this.supNameValueData.push({
              value: v.supFullName,
              label: v.supFullName,
            });
            this.dialogSupData = reduceFun(this.dialogSupData);
          });
        } else {
          this.$messageSelf.message({
            message: "查询供应商失败",
            type: "error",
          });
        }
      });
      //查询规格
      querySpec(QueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.allSpecData = ok.data.result.list;
          this.allSpecData.forEach((v) => {
            this.dialogSpecData.push({
              value: v.specValue,
              label: v.specValue,
            });
            this.dialogSpecData = reduceFun(this.dialogSpecData);
          });
        } else {
          this.$messageSelf.message({
            message: "查询规格失败",
            type: "error",
          });
        }
      });
    };
    this.queryAnyInfor();
    this.queryMateAdminFun = () => {
      this.mateNameValueData = [];
      this.mateNumValueData = [];
      let pagingQueryData = this.pagingQueryData;
      queryMateAdmin(pagingQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.changeData(ok.data.result);
          this.tableData = ok.data.result.list;
          this.tableData1 = ok.data.result.list;
          this.tableData.forEach((v) => {
            this.mateNameValueData.push({
              value: v.materielName,
              label: v.materielName,
            });
            this.mateNumValueData.push({
              value: v.materielCode,
              label: v.materielCode,
            });
          });
        } else {
          this.$messageSelf.message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    };
    this.queryMateAdminFun();
  },
  methods: {
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    mateNameValues(val) {
      this.mateNameValue = val;
      this.tableData1.forEach((v) => {
        if (val === v.materielName) {
          this.mateId = v.id;
        }
      });
    },
    mateNumValues(val) {
      this.mateNumValue = val;
    },
    mateTypeValues(val) {
      this.mateTypeValue = val;
    },
    supNameValues(val) {
      this.supNameValue = val;
      this.allSupData.forEach((v) => {
        if (val === v.supFullName) {
          this.allSupId = v.id;
        }
      });
    },
    brandNameValues(val) {
      this.brandNameValue = val;
      this.allBrandData.forEach((v) => {
        if (val === v.braFullName) {
          this.allBrandId = v.id;
        }
      });
    },
    dialogBrandNames(val) {
      this.dialogBrandName = val;
      this.allBrandData.forEach((v) => {
        if (val === v.braFullName) {
          this.allBrandId = v.id;
        }
      });
    },
    dialogSupValues(val) {
      this.dialogSupValue = val;
      this.allSupData.forEach((v) => {
        if (val === v.supFullName) {
          this.allSupId = v.id;
        }
      });
    },
    dialogSpecValues(val) {
      this.dialogSpecValue = val;
      this.allSpecData.forEach((v) => {
        if (val === v.specValue) {
          this.allSpecId = v.id;
        }
      });
    },
    dialogMateTypes(val) {
      this.dialogMateType = val;
    },
    okBtn() {
      this.dialogFormVisible = false;

      let createData = {
        id: this.mateId,
        wareId: "",
        materielType: this.dialogMateType, //物料类型
        materielName: this.dialogMateName, //物料名称
        materielCode: this.dialogMateCode, //物料编码
        braId: this.allBrandId,
        braName: this.dialogBrandName, //品牌名称
        supId: this.allSupId,
        supName: this.dialogSupValue, //供应商
        specId: this.allSpecId,
        specName: this.dialogSpecValue, //规格名称
        remark: this.remarkInfor, //备注
        inventoryFloor: this.dialogEarlyWarnValue,
      };
      // console.log(createData)
      createMateAdmin(createData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            message: "创建成功",
            type: "success",
          });
          this.queryMateAdminFun();
          this.dialogMateType = "";
          this.dialogMateName = "";
          this.dialogMateCode = "";
          this.dialogBrandName = "";
          this.dialogSupValue = "";
          this.dialogEarlyWarnValue = "";
          this.remarkInfor = "";
          this.dialogSpecValue = "";
        } else {
          this.$messageSelf.message({
            message: ok.data.msg,
            type: "error",
          });
        }
      });
      this.title = "";
    },
    clickQuery() {
      //点击查询
      this.tableData = [];
      let idQueryData = {
        id: this.mateId,
        wareId: "",
        braId: this.allBrandId,
        materielCode: this.mateNumValue,
        materielType: this.mateTypeValue,
        supId: this.allSupId,
      };
      queryMateAdminCon(idQueryData).then((ok) => {
        // console.log(ok);
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
      this.mateNameValue = "";
      this.mateNumValue = "";
      this.mateTypeValue = "";
      this.supNameValue = "";
      this.brandNameValue = "";
      this.tableData = [];
      this.tableData1 = [];
      this.mateNameValueData = [];
      this.mateNumValueData = [];
      this.queryMateAdminFun();
    },
    createChildWarehouse() {
      //创建
      this.title = "添加物料";
      this.dialogFormVisible = true;
    },

    editChildWarehouse() {
      //编辑
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要查看物料",
          type: "warning",
        });
      if (this.multipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能编辑一个物料信息，请重新选择",
          type: "warning",
        });
      this.title = "编辑物料";
      this.dialogFormVisible = true;
      let gys = this.multipleSelection[0];
      this.dialogMateName = gys.materielName;
      this.dialogMateType = gys.materielType;
      this.dialogMateCode = gys.materielCode;
      this.dialogBrandName = gys.braName;
      this.dialogSupValue = gys.supName;
      this.dialogSpecValue = gys.specName;
      this.dialogEarlyWarnValue = gys.seqNum;
      this.remarkInfor = gys.remark;
      this.mateId = gys.id;
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
          message: "请选择要删除的物料信息",
          type: "warning",
        });
      this.$messageSelf
        .confirms("确定要删除该物料信息？", "删除提示", {
          type: "warning",
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
      delMateAdmin(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "删除成功",
          });
          this.queryMateAdminFun();
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
      this.queryMateAdminFun();
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
#mateAdmin {
  background: #eef1f8;
  padding: 20px 10px;
}
.roleName-choose {
  display: flex;
  justify-content: space-between;
  .name_type {
    display: flex;
    padding: 0 0 0 16px;
    .nameBox {
      display: flex;
      align-items: center;
      margin: 0 16px 0 0;
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

#mateAdmin {
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
            .name_con {
              display: flex;
              margin-bottom: 16px;
              border: 1px solid #d1d6e2;
              border-radius: 3px;
              margin-right: 20px;
              .name_con_title {
                width: 104px;
                background: #ecf1f7;
                border-right: 1px solid #d1d6e2;
                line-height: 36px;
                color: #000;
                text-align: center;
              }
              .el-input {
                width: 167px;
                .el-input__inner {
                  border: none;
                  color: #000;
                }
              }
            }
          }
          .earlyWarnBox {
            display: flex;
            border: 1px solid #d1d6e2;
            border-radius: 3px;
            margin-bottom: 16px;
            .earlyWarn {
              width: 118px;
              background: #ecf1f7;
              border-right: 1px solid #d1d6e2;
              color: #000;
              text-align: center;
              line-height: 36px;
            }
            .el-input {
              width: 164px;
              .el-input__inner {
                border: none;
                color: #000;
              }
            }
          }

          .remarkInforBox {
            border: 1px solid #d1d6e2;
            border-radius: 3px;
            .remarkInforTitle {
              width: 104px;
              background: #ecf1f7;
              border-right: 1px solid #d1d6e2;
              line-height: 84px;
              padding: 0 16px;
              color: #000;
            }
            .el-textarea__inner {
              border: none;
            }
          }
          .addStar {
            position: relative;
          }
          .addStar::before {
            content: "*";
            color: red;
            position: absolute;
            left: 15px;
            top: 3px;
          }

          .addStar1 {
            position: relative;
          }
          .addStar1::before {
            content: "*";
            color: red;
            position: absolute;
            left: 30px;
            top: 3px;
          }

          .addStar2 {
            position: relative;
          }
          .addStar2::before {
            content: "*";
            color: red;
            position: absolute;
            left: 10px;
            top: 3px;
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