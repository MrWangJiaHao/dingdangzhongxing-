<template>
  <div id="roleAdminPage">
    <div class="userControl">
      <div class="roleName">
        <div class="roleName-choose">
          <div class="roleName-text">角色名称：</div>
          <div class="roleName-checkBox">
            <el-select
              v-model="value"
              placeholder="请选择角色名称"
              @change="selectSome"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="roleName-botton">
          <div class="queryBtn" @click="clickQueryUser">查询</div>
          <div class="clearBtn" @click="clearInputAll">清空</div>
        </div>
      </div>
      <div class="main">
        <div class="queryResult">
          <div class="icon-title">
            <div class="icon-title-icon">
              <img src="../../assets/img/systemTitlemesa.png" />
            </div>
            <div class="icon-title-title">角色管理</div>
          </div>
          <div class="queryResult-btn">
            <div class="setUser" @click="createRole">创建</div>
            <div class="bianjiUser" @click="editBtn">编辑</div>
            <div class="goOn" @click="goOn">查看</div>
            <div class="remove" @click="clearUser">删除</div>
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
              width="180"
              align="center"
              type="index"
            >
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center">
            </el-table-column>
            <el-table-column prop="createName" label="创建人" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
            </el-table-column>
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

    <!-- 创建角色的弹窗 -->
    <div class="createRole">
      <el-dialog
        :title="title"
        :visible.sync="centerDialogVisible"
        custom-class="animate__animated animate__zoomIn"
        width="576px"
      >
        <div class="createRolePage">
          <div class="nameandmeun">
            <div class="roleName-input">
              <span>角色名称：</span>
              <input type="text" v-model="inputContent" />
            </div>
            <div class="accreditMenu">
              <span>授权菜单：</span>
              <span @click="setQuanxian"> 设置权限 </span>
            </div>
          </div>
          <div class="remarks">
            <div>备注：</div>
            <textarea v-model="textareaContent" ></textarea>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <div @click="centerDialogVisible = false" class="quxiaoBox">
            取 消
          </div>
          <div @click="okBtn" class="sureBtn">确 定</div>
        </span>
      </el-dialog>
    </div>

    <!-- 设置权限弹窗 -->
    <div class="setqxDiv">
      <el-dialog
        title="设置权限"
        :visible.sync="centerDialogVisibleC"
        custom-class="animate__animated animate__zoomIn"
      >
        <div class="AuthorityPage">
          <div class="mainBox">
            <div class="authName">
              <el-tree
                :data="Treedata"
                show-checkbox
                node-key="id"
                :props="defaultProps"
                :highlight-current="true"
                @node-click="nodeClick"
              >
              </el-tree>
            </div>
            <div class="authChoose">
              <div v-for="(v, i) in authChooseData" :key="i">
                {{ v.title }}
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                  >全选</el-checkbox
                >
                <div style="margin: 15px 0"></div>
                <el-checkbox-group
                  v-model="checkedCities"
                  @change="handleCheckedCitiesChange1"
                >
                  <el-checkbox
                    v-for="city in cities"
                    :label="city"
                    :key="city"
                    >{{ city }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
              <div class="dialog-footer">
                <div @click="centerDialogVisibleC = false" class="quxiaoBox">
                  取 消
                </div>
                <div @click="pupopBoxC" class="sureBtn">确 定</div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import { post, delRole, jurisdicRequest } from "../../api/api";
import pagecomponent from "../../components/commin/pageComponent"; //分页器

export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      title: "",
      inputContent: "",
      inputContentC: "",
      textareaContent: "",
      textareaContentC: "",
      centerDialogVisible: false,
      centerDialogVisibleC: false,
      options: [],
      value: "",
      tableData: [],
      Treedata: [],
      authChooseData: [],
      cities: [],
      checkedCities: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      isIndeterminate: true,
      checkAll: false,
      pagingQueryData: {
        //分页查询
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {},
      },
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 0, //一共多少条 //默认一页10条
      },
      multipleSelection: [],
      roleQueryRes: [],
      roleQueryData: {
        id: "",
      },
    };
  },
  mounted() {
    this.pagingQueryData.paras.userType = this.$store.state.loginRequest.loginData.user.userType;
    this.queryList();
  },
  methods: {
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    nodeClick(a) {
      let label = a.label;
      switch (label) {
        case "渠道管理":
          this.authChooseData.push({ title: "渠道管理" });
          break;
        case "物流公司管理":
          this.authChooseData.push({ title: "物流公司管理" });
          break;
      }
    },
    setQuanxian() {
      this.centerDialogVisibleC = true;
      let data = {
        appNo: "99125FCFA23B4AD09668DC8F1DC53C18",
        type: "4",
        id: "AA4EBC35E2544E7688E2F4230F3F5E30",
      };
      jurisdicRequest(data).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.pageDataArr = ok.data.result;
          this.pageDataArr.forEach((v, idx) => {
            this.Treedata.push({
              label: v.title,
              children: [],
            });
            v.children.forEach((val) => {
              this.Treedata[idx].children.push({
                label: val.title,
              });
            });
          });
          console.log(this.Treedata, "Treedata");
        }
      });
    },
    selectSome(event) {
      this.roleQueryRes.forEach((v) => {
        if (v.roleName === event) {
          this.roleQueryData.id = v.id;
        }
      });
    },
    async queryList() {
      let datas = await post({
        url: "http://139.196.176.227:8801/am/v1/pRole/findRecordPage",
        data: this.pagingQueryData,
      });
      // console.log(datas);
      if (datas.code === "10000") {
        let res = datas.result.list;
        this.roleQueryRes = datas.result.list;
        res.forEach((v) => {
          this.tableData.push({
            roleName: v.roleName,
            remark: v.roleDesc,
            createName: v.createUser,
            createTime: v.createTime,
            id: v.id,
          });
          this.options.push({
            value: v.roleName,
            label: v.roleName,
          });
        });
      } else {
        this.$messageSelf.message(datas.msg);
      }
    },
    changeData(data) {
      this.changePageData(data); //用来改变分页器的条数
    },
    //用来改变分页器的条数
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.pagingQueryData.pageNumber = e;
    },
    async clickQueryUser() {
      //点击查询
      this.tableData = [];
      let datas = await post({
        url: "http://139.196.176.227:8801/am/v1/pRole/findRecord",
        data: this.roleQueryData,
      });
      console.log(datas);
      if (datas.code === "10000") {
        let res = datas.result;
        res.forEach((v) => {
          this.tableData.push({
            roleName: v.roleName,
            remark: v.roleDesc,
            createName: v.createUser,
            createTime: v.createTime,
            id: v.id,
          });
        });
      } else {
        this.$messageSelf.message(datas.msg);
      }
    },
    clearInputAll() {
      this.value = "";
      this.tableData = [];
      this.queryList();
    },
    //创建角色
    createRole() {
      this.centerDialogVisible = true;
      this.title = "创建角色";
    },
    editBtn() {
      //编辑角色
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要编辑的账号",
          type: "warning",
        });
      if (this.multipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能编辑一条账号，请重新选择",
          type: "warning",
        });
      this.title = "编辑角色";
      this.centerDialogVisible = true;

      this.inputContent = this.multipleSelection[0].roleName;
      this.textareaContent = this.multipleSelection[0].remark;
    },
    goOn() {
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要查看的账号",
          type: "warning",
        });
      if (this.multipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能查看一条账号，请重新选择",
          type: "warning",
        });
    },

    //点击删除角色
    clearUser() {
      let arr = this._getIDArr();
      if (!arr.length)
        return this.$messageSelf.message({
          message: "请选择要删除的用户",
          type: "warning",
        });
      this.$messageSelf
        .confirms("确定要删除改用户？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        })
        .then(() => {
          this._clearAjax({ id: arr[0] });
        });
    },
    _getIDArr() {
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      return arr;
    },
    //发送删除的ajax
    _clearAjax(data) {
      delRole(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "删除成功",
          });
        } else {
          this.$messageSelf.message({
            type: "error",
            message: "删除失败",
          });
        }
      });
    },
    //创建角色
    async okBtn() {
      if (this.inputContent === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "角色名称不能为空",
        });
      }
      let pupopBoxInfor = {
        enableStatus: 0,
        roleName: this.inputContent,
        roleDesc: this.textareaContent,
        userId: this.$store.state.loginRequest.loginData.user.id,
        orgId: "FC4AD500BE8E4B5FB58CCAE7B519FB6F",
        userType: "4",
        pmenuRoles: [
          {
            checkboxPermissions: ["1", "1", "1", "1"],
            menuId: "34955547FA3E45E8A52421BECCC5971A",
          },
        ],
      };
      let createRoleData = await post({
        url: "http://139.196.176.227:8801/am/v1/pUserRole/insertRecord",
        data: pupopBoxInfor,
      });
      if (createRoleData.code === "10000") {
        this.$messageSelf.message({ message: "创建成功", type: "success" });
      } else {
        this.$messageSelf.message(createRoleData.msg);
      }

      this.centerDialogVisible = false;
      this.textareaContent = "";
      this.inputContent = "";
    },
    pupopBoxC() {
      this.centerDialogVisibleC = false;
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

.userControl {
  background: #eef1f8;
  width: 100%;
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
    .roleName-botton {
      display: flex;
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
  .main {
    margin: 10px;
    background: white;
  }
  .queryResult {
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
      }
    }
    .queryResult-btn {
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

#roleAdminPage {
  .createRole {
    .el-dialog__wrapper {
      .el-dialog__header {
        background: #eef1f8;
        border-bottom: 1px solid #d1d6e2;
      }
      .el-dialog__footer {
        border-top: 1px solid #d1d6e2;
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
      .el-dialog__body {
        padding: 20px;
        .nameandmeun{
          display: flex;
          align-items: center;
        }
        .roleName-input{
          margin-right: 20px;
        }
        .roleName-input span {
          font-size: 16px;
        }
        .roleName-input input {
          border: 1px solid #d1d6e2;
          width: 200px;
          height: 30px;
          border-radius: 5px;
          text-indent: 1em;
        }
        .accreditMenu {
          span:nth-of-type(1) {
            font-size: 16px;
          }
          span:nth-of-type(2) {
            display: inline-block;
            border: 1px solid #d1d6e2;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          }
        }
        .remarks {
          display: flex;
          align-items: center;
          textarea {
            border: 1px solid #d1d6e2;
            height: 60px;
            padding: 10px;
          }
          div {
            font-size: 16px;
            white-space: nowrap;
          }
        }
      }
    }
    .roleName-input {
      margin: 20px 0;
    }
  }
  .setqxDiv {
    .el-dialog__wrapper {
      .el-dialog {
        width: 870px;
        height: 457px;
        .el-dialog__header {
          padding: 0 20px;
          font-weight: 600;
          height: 41px;
          width: 100%;
          line-height: 41px;
          background: #ecf1f7;
          border-bottom: 1px #e1e6eb solid;
          .el-dialog__headerbtn {
            top: 0;
          }
        }
        .el-dialog__body {
          padding: 0;
          .mainBox {
            display: flex;
            .authName {
              height: 416px;
              width: 300px;
              overflow-y: auto;
              background: #eef1f8;
              // padding: 26px 0 0 30px;
              .el-tree {
                background: none;
              }
            }
            .authChoose {
              position: relative;
              width: 670px;
              height: 416px;
              border-left: 1px #e1e6eb solid;
            }
          }
          .dialog-footer {
            height: 50px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: absolute;
            bottom: 16px;
            right: 20px;
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
  }
}
</style>
