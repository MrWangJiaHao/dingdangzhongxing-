<template>
  <div>
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
              <img src="../../assets/img/home_page-icon-default@2x.png" />
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
            <el-table-column type="selection" width="55"> </el-table-column>
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
        <div class="pageComponent" v-if="this.tableData.length !== 0">
          <pagecomponent
            :pageComponentsData="pageComponentsData"
            @getPageNum="getPageNum"
            @sureSuccssBtn="sureSuccssBtn"
          ></pagecomponent>
        </div>
      </div>
    </div>

    <!-- 创建角色的弹窗 -->
    <el-dialog
      title="创建角色"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :append-to-body="true"
      class="feedback_dialog"
    >
      <div class="createRolePage">
        <div class="roleName-input">
          <span>角色名称：</span>
          <input type="text" v-model="inputContent" />
        </div>
        <div class="accreditMenu">
          <span>授权菜单：</span>
          <span
            ><router-link to="/systemSetting/userControl/setAuthority"
              >设置权限</router-link
            ></span
          >
        </div>
        <div class="remarks">
          <div>备注：</div>
          <textarea v-model="textareaContent"></textarea>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="pupopBox">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色的弹窗 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="centerDialogVisibleB"
      width="30%"
      center
      :append-to-body="true"
      class="feedback_dialog"
    >
      <div class="createRolePage">
        <div class="roleName-input">
          <span>角色名称：</span>
          <input type="text" v-model="inputContentB" />
        </div>
        <div class="accreditMenu">
          <span>授权菜单：</span>
          <span
            ><router-link to="/systemSetting/userControl/setAuthority"
              >设置权限</router-link
            ></span
          >
        </div>
        <div class="remarks">
          <div>备注：</div>
          <textarea v-model="textareaContentB"></textarea>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleB = false">取 消</el-button>
        <el-button type="primary" @click="pupopBoxB">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { post } from "../../api/api";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { ajaxPost } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      inputContent: "",
      inputContentB: "",
      textareaContent: "",
      textareaContentB: "",
      centerDialogVisible: false,
      centerDialogVisibleB: false,
      options: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "仓库管理员",
          label: "仓库管理员",
        },
        {
          value: "兼职拣货人员",
          label: "兼职拣货人员",
        },
        {
          value: "兼职复核人员",
          label: "兼职复核人员",
        },
        {
          value: "拣货人员",
          label: "拣货人员",
        },
        {
          value: "复核人员",
          label: "复核人员",
        },
      ],
      value: "全部",
      tableData: [
        {
          roleName: "",
          remark: "",
          createName: "",
          createTime: "",
        },
      ],
      pagingQueryData: {
        //分页查询
        pageNumber: 1,
        pageSize: 10,
        paras: {
          // orgId: this.$store.state.loginRequest.loginData.orgId,
          // id: this.$store.state.loginRequest.loginData.id,
          userType: "",
          // createStartTime: this.$store.state.loginRequest.loginData
          //   .createStartTime,
          // createEndTime: this.$store.state.loginRequest.loginData.createEndTime,
          // loginName: this.$store.state.loginRequest.loginData.loginName,
          // roleId: this.$store.state.loginRequest.loginData.roleId,
          // wareId: this.$store.state.loginRequest.loginData.wareId,

          roleName: "",
        },
      },
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 0, //一共多少条 //默认一页10条
      },
      multipleSelection: [],
    };
  },
  created() {
    this.queryList();
  },
  mounted() {
    this.pagingQueryData.paras.userType = this.$store.state.loginRequest.loginData.user.userType;
  },
  methods: {
    selectSome(event) {
      //拉下菜单选中的值
      this.pagingQueryData.paras.roleName = event; //把选中的值赋给请求头里
    },
    async queryList() {
      let datas = await post({
        url: "http://139.196.176.227:8801/am/v1/pRole/findRecordPage",
        data: this.pagingQueryData,
      });
      console.log(datas)
      if (datas.code === "10000") {
        this.changeData(datas.result);
      } else {
        Message(datas.msg);
      }
    },
    changeData(data) {
      this.changeTableData(data); //用来改变表格
      this.changePageData(data); //用来改变分页器的条数
    },
    //用来改变表格
    changeTableData(data) {
      let { list } = data;
      // console.log(list);
      this.tableData = list;
      list.forEach((item, idx) => {
        this.tableData[idx].address =
          item.provinceName + item.cityName + item.areaName + item.userAddr;
      });
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
    clickQueryUser() {
      //点击查询
      this.queryList();
    },
    clearInputAll() {},
    //创建角色
    createRole() {
      this.centerDialogVisible = true;
    },
    editBtn() {
      if (!this.multipleSelection.length) return Message("请选择要编辑的账号");
      if (this.multipleSelection.length !== 1)
        return Message({
          message: "每次只能编辑一条账号，请重新选择",
          type: "warning",
        });

      this.centerDialogVisibleB = true;

      this.inputContentB = this.multipleSelection[0].roleName
      this.textareaContentB = this.multipleSelection[0].remark
      
    },
    goOn() {
      if (!this.multipleSelection.length) return Message("请选择要查看的账号");
      if (this.multipleSelection.length !== 1)
        return Message({
          message: "每次只能查看一条账号，请重新选择",
          type: "warning",
        });
    },

    //点击删除角色
    clearUser() {
      let arr = this._getIDArr();
      if (!arr.length) return Message("请选择要删除的用户");
      this.$confirm("确定要删除改用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this._clearAjax(arr);
        })
        .catch((err) => {
          Message("已取消删除");
          console.log(err);
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
    async _clearAjax(data) {
      ajaxPost(
        "http://139.196.176.227:8801/am/v1/pUser/delRecord",
        data,
        (data) => {
          if (data.code === "10000") {
            Message({
              type: "success",
              message: data.msg,
            });
          } else {
            Message({
              type: "error",
              message: data.msg ? data.msg : "删除失败",
            });
          }
        }
      );
    },
    //创建角色
    async pupopBox() {
      let pupopBoxInfor = {
        roleName: this.textareaContent,
        roleDesc: this.inputContent,
        userId: this.$store.state.loginRequest.loginData.id,
        //权限还没写
      };
      let createRoleData = await post({
        url: "http://139.196.176.227:8801/am/v1/pUserRole/insertRecord",
        data: pupopBoxInfor,
      });
      if (createRoleData.code === "10000") {
        Message("创建成功");
      } else {
        Message(createRoleData.msg);
      }

      this.centerDialogVisible = false;
      this.textareaContent = "";
      this.inputContent = "";
    },
    //编辑角色
    async pupopBoxB() {
      console.log(123);
      let pupopBoxInfor = {
        roleName: this.textareaContentB,
        roleDesc: this.inputContentB,
        userId: this.$store.state.loginRequest.loginData.id,
        //权限还没写
      };
      let createRoleData = await post({
        url: "http://139.196.176.227:8801/am/v1/pRole/saveRecord",
        data: pupopBoxInfor,
      });
      if (createRoleData.code === "10000") {
        Message("编辑成功");
      } else {
        Message(createRoleData.msg);
      }

      this.centerDialogVisibleB = false;
      this.textareaContentB = "";
      this.inputContentB = "";
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
        font-size: 16px;
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
    padding: 20px;
  }
  .pageComponent {
    margin: 20px 10px 0 0;
    text-align: right;
    height: 36px;
    background: #ffffff;
    border: 1px solid #d1d6e2;
  }
}
</style>
<style >
.feedback_dialog .el-dialog__body .roleName-input {
  margin: 20px 0;
}
.feedback_dialog .el-dialog__body .roleName-input span {
  font-size: 16px;
}
.feedback_dialog .el-dialog__body .roleName-input input {
  border: 1px solid #999;
  width: 200px;
  height: 30px;
  border-radius: 5px;
  text-indent: 1em;
}
.feedback_dialog .el-dialog__body .accreditMenu {
  margin: 0 0 20px 0;
}
.feedback_dialog .el-dialog__body .accreditMenu span:nth-of-type(1) {
  font-size: 16px;
}
.feedback_dialog .el-dialog__body .accreditMenu span:nth-of-type(2) a {
  border: 1px solid #999;
  padding: 5px;
  border-radius: 5px;
}
.feedback_dialog .el-dialog__body .remarks {
  display: flex;
}
.feedback_dialog .el-dialog__body .remarks textarea {
  border: 1px solid #999;
  width: 200px;
  height: 50px;
}
.feedback_dialog .el-dialog__body .remarks div {
  font-size: 16px;
}
</style>