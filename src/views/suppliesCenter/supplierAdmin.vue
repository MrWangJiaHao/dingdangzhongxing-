<template>
  <div id="supplierAdmin">
    <!-- 这是供应商管理页面 -->
    <div class="roleName">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="nameBox">
            <div class="roleName-text">供应商：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="nameValue"
                placeholder="请选择供应商"
                @change="selectName"
              >
                <el-option
                  v-for="item in supProNameData"
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
            <el-table-column prop="supFullName" label="供应商" align="center">
            </el-table-column>
            <el-table-column
              prop="supContactPhone"
              label="联系电话"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="supContact" label="联系人" align="center">
            </el-table-column>
            <el-table-column
              prop="companyAddress"
              label="公司地址"
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

    <!-- 弹框 -->
    <el-dialog
      title="供应商信息"
      :visible.sync="dialogFormVisible"
      custom-class="animate__animated animate__zoomIn"
    >
      <div class="dialogBox">
        <div class="boxTitle"><span>基础信息</span></div>
        <div class="boxContent">
          <div class="content_one">
            <div class="name_con name_con_one">
              <div class="setSupplierName">供应商名称</div>
              <el-input
                v-model="supplierName"
                placeholder="请输入供应商名称"
              ></el-input>
            </div>
            <div class="name_con name_con_two">
              <div class="telPeople">联系人</div>
              <el-input
                v-model="telPeople"
                placeholder="请输入联系人"
              ></el-input>
            </div>
            <div class="name_con name_con_three">
              <div class="telPeoplePhone">联系电话</div>
              <el-input
                v-model="telPeoplePhone"
                placeholder="请输入联系电话"
                type="number"
                @blur="testIsMobile"
              ></el-input>
            </div>
          </div>
          <div class="content_one comAddr">
            <div class="comAddrName">公司地址</div>
            <div>
              <el-cascader
                :options="areaSelectData"
                :change-on-select="true"
                @change="handleChange"
                class="full-width"
                size="medium"
                v-model="form.selectedOptions"
                separator="-"
                clearable
              />
            </div>
          </div>
          <div class="content_one xiangxiAddr">
            <div class="XXAddrName">详细地址</div>
            <el-input
              v-model="xiangxiAddrName"
              placeholder="请输入详细地址"
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
        <div @click="okBtn" class="sureBtn">提 交</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import {
  createSupplier,
  querySupplier,
  delSupplier,
  querySupplierCon,
} from "../../api/api";
import { getCookie, isMobile } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      areaSelectData: regionData,
      form: {
        selectedOptions: [],
        province: "",
        city: "",
        area: "",
      },
      nameValue: "",
      supProNameData: [],
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

      xiangxiAddrName: "",
      remarkInfor: "",
      supplierName: "",
      telPeople: "",
      telPeoplePhone: "",
      querySupplierFun: () => {},
      supId: "",

      isPhone: true,
      btnType: "create",
    };
  },
  mounted() {
    this.querySupplierFun = () => {
      let pagingQueryData = this.pagingQueryData;
      querySupplier(pagingQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.changeData(ok.data.result);
          this.tableData = ok.data.result.list;
          this.tableData1 = ok.data.result.list;
          this.tableData.forEach((v) => {
            this.supProNameData.push({
              value: v.supFullName,
              label: v.supFullName,
            });
            let testObj = {};
            this.supProNameData = this.supProNameData.reduce((item, next) => {
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
    this.querySupplierFun();
  },
  methods: {
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    selectName(val) {
      this.nameValue = val;
      this.tableData1.forEach((v) => {
        if (val === v.supFullName) {
          this.pagingQueryData.paras.id = v.id;
        }
      });
    },
    okBtn() {
      // this.testIsMobile()
      if (!this.isPhone)
        return this.$messageSelf.message({
          message: "请输入正确的手机号",
          type: "warning",
        });
      this.dialogFormVisible = false;

      let createData = {
        id: this.supId,
        wareId: getCookie("X-Auth-wareId"),
        supFullName: this.supplierName,
        supContact: this.telPeople,
        supContactPhone: this.telPeoplePhone,
        supProCode: this.form.province,
        supProName: CodeToText[this.form.province],
        supCityCode: this.form.city,
        supCityName: CodeToText[this.form.city],
        supCountyCode: this.form.area,
        supCountyName: CodeToText[this.form.area],
        supAddr: this.xiangxiAddrName,
        remark: this.remarkInfor,
      };
      // console.log(createData)
      createSupplier(createData).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            message:
              this.btnType === "create"
                ? "创建成功"
                : this.btnType === "edit"
                ? "编辑成功"
                : "",
            type: "success",
          });
          this.querySupplierFun();
          this.xiangxiAddrName = "";
          this.remarkInfor = "";
          this.supplierName = "";
          this.telPeople = "";
          this.telPeoplePhone = "";
        } else {
          this.$messageSelf.message({
            message: ok.data.msg,
            type: "error",
          });
        }
      });
      this.querySupplierFun();
    },
    clickQuery() {
      //点击查询
      this.tableData = [];
      let idQueryData = {
        id: this.pagingQueryData.paras.id,
        wareId: "",
      };
      querySupplierCon(idQueryData).then((ok) => {
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
      this.querySupplierFun();
    },
    createChildWarehouse() {
      //创建
      this.dialogFormVisible = true;
      this.btnType = "create";
    },
    editChildWarehouse() {
      //编辑
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要编辑的供应商",
          type: "warning",
        });
      if (this.multipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能编辑一个供应商信息，请重新选择",
          type: "warning",
        });
      this.dialogFormVisible = true;
      this.btnType = "edit";
      let gys = this.multipleSelection[0];
      this.xiangxiAddrName = gys.supAddr;
      this.remarkInfor = gys.remark;
      this.supplierName = gys.supFullName;
      this.telPeople = gys.supContact;
      this.telPeoplePhone = gys.supContactPhone;
      this.supId = gys.id;
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
          message: "请选择要删除的供应商",
          type: "warning",
        });
      this.$messageSelf
        .confirms("确定要删除该供应商？", "删除确认", {
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
      delSupplier(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "删除成功",
          });
          this.querySupplierFun();
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
      this.querySupplierFun();
    },
    changeData(data) {
      this.changePageData(data); //用来改变分页器的条数
    },
    //用来改变分页器的条数
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },

    handleChange(value) {
      this.form.selectedOptions = value;
      this.form.province = value[0];
      this.form.city = value[1];
      this.form.area = value[2];
      console.log(
        CodeToText[this.form.province],
        CodeToText[this.form.city],
        CodeToText[this.form.area]
      );
    },
    testIsMobile() {
      let telPeoplePhone = this.telPeoplePhone;
      if (!isMobile(telPeoplePhone)) {
        this.isPhone = false;
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入正确的手机号",
        });
      }
      this.isPhone = true;
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
      margin: 16px 20px;
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

#supplierAdmin {
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
              border-radius: 3px;
              .setSupplierName {
                width: 104px;
                background: #ecf1f7;
                border-right: 1px solid #d1d6e2;
                line-height: 34px;
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
            .name_con_two {
              border: 1px solid #d1d6e2;
              margin-right: 20px;
              border-radius: 3px;
              .telPeople {
                width: 68px;
                background: #ecf1f7;
                border-right: 1px solid #d1d6e2;
                line-height: 34px;
                color: #000;
                text-align: center;
              }
              .el-input {
                width: 120px;
                .el-input__inner {
                  border: none;
                  color: #000;
                }
              }
            }
            .name_con_three {
              border: 1px solid #d1d6e2;
              border-radius: 3px;
              .telPeoplePhone {
                width: 104px;
                background: #ecf1f7;
                border-right: 1px solid #d1d6e2;
                line-height: 34px;
                color: #000;
                text-align: center;
              }
              .el-input {
                width: 130px;
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
            width: 394px;
            border: 1px solid #d1d6e2;
            border-radius: 3px;
            .comAddrName {
              width: 104px;
              background: #ecf1f7;
              border-right: 1px solid #d1d6e2;
              line-height: 34px;
              padding: 0 16px;
              color: #000;
            }
            .el-cascader {
              width: 288px;
              .el-input__inner {
                width: 288px;
                border: none;
                color: #000;
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
              line-height: 34px;
              padding: 0 16px;
              color: #000;
            }
            .el-input {
              width: 754px;
              .el-input__inner {
                color: #000;
                border: none;
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
              line-height: 94px;
              padding: 0 16px;
              color: #000;
            }
            .el-textarea {
              width: 754px;
              .el-textarea__inner {
                color: #000;
                border: none;
              }
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