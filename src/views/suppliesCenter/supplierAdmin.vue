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
              <img src="../../assets/img/home_page-icon-default@2x.png" />
            </div>
            <div class="icon-title-title">供应商信息</div>
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
            <el-table-column prop="companyAddress" label="公司地址" align="center">
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

    <!-- 弹框 -->
    <el-dialog title="供应商信息" :visible.sync="dialogFormVisible">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="okBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { Message } from "element-ui";
import {
  createSupplier,
  querySupplier,
  delSupplier,
  querySupplierCon,
} from "../../api/api";
import { isMobile } from "../../utils/validate";
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
      querySupplierFun: "",
      supId: "",
    };
  },
  mounted() {
    this.querySupplierFun = () => {
      let pagingQueryData = this.pagingQueryData;
      querySupplier(pagingQueryData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
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
          Message({
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
      this.dialogFormVisible = false;

      let createData = {
        id: this.supId,
        wareId: "3B31612A55EE4EB09363A6E3805A3F6D",
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
      console.log(createData)
      createSupplier(createData).then((ok) => {
        if (ok.data.code === "10000") {
          Message({
            message: "创建成功",
            type: "success",
          });
          this.querySupplierFun();
          this.xiangxiAddrName = "";
          this.remarkInfor = "";
          this.supplierName = "";
          this.telPeople = "";
          this.telPeoplePhone = "";
        } else {
          Message({
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
      querySupplierCon(idQueryData).then((ok) => {
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
      this.nameValue = "";
      this.querySupplierFun();
    },
    createChildWarehouse() {
      //创建
      this.dialogFormVisible = true;
    },
    editChildWarehouse() {
      //编辑
      if (!this.multipleSelection.length)
        return Message("请选择要查看的供应商");
      if (this.multipleSelection.length !== 1)
        return Message({
          message: "每次只能编辑一个供应商信息，请重新选择",
          type: "warning",
        });
      this.dialogFormVisible = true;

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
      if (!arr.length) return Message("请选择要删除的供应商");
      this.$confirm("确定要删除该供应商？", "提示", {
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
      delSupplier(data).then((ok) => {
        if (ok.data.code === "10000") {
          Message({
            type: "success",
            message: "删除成功",
          });
          this.querySupplierFun();
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
        return Message({
          type: "error",
          message: "请输入正确的手机号",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";
#supplierAdmin {
  background: #e6e7ea;
  padding: 16px;
}
.roleName-choose {
  display: flex;
  justify-content: space-between;
  .name_type {
    display: flex;
    .nameBox {
      display: flex;
      align-items: center;
      margin: 0 50px 0 0;
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

<style lang="scss">
#supplierAdmin {
  .el-dialog__wrapper {
    background: #eef1f8;
  }
  .el-dialog {
    width: 900px;
    height: 466px;
    box-shadow: 0 0 5px 3px #e1e2e5;
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
            .name_con_two {
              border: 1px solid #d1d6e2;
              margin-right: 20px;
              border-radius: 3px;
              .telPeople {
                width: 94px;
                background: #ecf1f7;
                border-right: 1px solid #d1d6e2;
                line-height: 36px;
                color: #000;
                text-align: center;
              }
              .el-input {
                width: 94px;
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
                line-height: 36px;
                color: #000;
                text-align: center;
              }
              .el-input {
                width: 134px;
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
            }
          }
        }
      }
    }
    .el-dialog__footer {
      width: 100%;
      height: 76px;
      padding: 0 20px;
      margin: 19px 0 0 0;
    }
  }
}
</style>