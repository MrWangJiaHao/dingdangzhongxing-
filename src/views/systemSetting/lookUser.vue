<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox">
        <div class="closeTitle">创建用户</div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>

      <div class="centerBox">
        <div class="setTitle">个人信息</div>
        <div class="gerxinxiBox">
          <div class="xinxiBitian">
            <div>
              <div class="displayalign">
                <div class="noneIconTitle mr11">
                  用户姓名
                  <span style="color:red;">*</span>:
                </div>
                <div class="mr20">
                  <el-input
                    placeholder="请输入用户姓名"
                    disabled
                    v-model="createUserData.userName"
                    clearable
                  ></el-input>
                </div>
              </div>
            </div>
            <!-- 用户姓名 -->
            <div>
              <div class="displayalign">
                <div class="noneIconTitle mr11">
                  联系电话
                  <span style="color:red;">*</span>:
                </div>
                <div class="mr20">
                  <el-input
                    placeholder="请输入联系电话"
                    disabled
                    v-model="createUserData.userPhone"
                    clearable
                  ></el-input>
                </div>
              </div>
            </div>
            <!-- 联系电话 -->
          </div>
          <div class="cityBoxCenter">
            <div class="mr20">
              <div class="displayalign">
                <div class="noneIconTitle mr11">
                  居住地址
                  <span style="visibility: hidden;">*</span>:
                </div>
                <div>
                  <el-input
                    disabled
                    :placeholder="createUserData.provinceName?createUserData.provinceName:'未录入居住省'"
                    v-model="createUserData.provinceName"
                    clearable
                  ></el-input>
                </div>
              </div>
            </div>
            <!-- 省 -->
            <div class="mr20">
              <el-input
                disabled
                :placeholder="createUserData.cityName?createUserData.cityName:'未录入居住市'"
                v-model="createUserData.cityName"
                clearable
              ></el-input>
            </div>
            <!-- 市 -->
            <div>
              <el-input
                disabled
                :placeholder="createUserData.areaName?createUserData.areaName:'未录入居住区/县'"
                v-model="createUserData.areaName"
                clearable
              ></el-input>
            </div>
            <!-- 区/县 -->
          </div>
          <div class="textAreaBox">
            <textarea
              :placeholder="createUserData.userAddr?createUserData.userAddr:'未录入详细地址'"
              disabled
              v-model="createUserData.userAddr"
              maxlength="200"
            ></textarea>
          </div>
          <!-- 居住地址 -->
        </div>
      </div>
      <!-- 个人信息 -->
      <div class="pd20">
        <div class="setTitle">账号信息</div>
        <div class="displayalign mb20">
          <div class="displayalign">
            <div class="noneIconTitle mr11">
              用户账号
              <span style="color:red;">*</span>:
            </div>
            <div class="mr20">
              <el-input
                disabled
                :placeholder="createUserData.loginName"
                v-model="createUserData.loginName"
                clearable
              ></el-input>
            </div>
          </div>
          <!-- 用户账号 -->
          <div class="displayalign">
            <div class="noneIconTitle mr11">
              <span style="visibility: hidden;">你好</span>密码
              <span style="color:red;">*</span>:
            </div>
            <div>
              <el-input
                placeholder="请输入密码"
                disabled
                v-model="createUserData.loginPwd"
                clearable
                type="text"
              ></el-input>
            </div>
          </div>
          <!-- 密码 -->
        </div>
        <!-- 必须 -->
        <div class="displayalign mb20">
          <div class="displayalign">
            <div class="displayalign">
              <div class="noneIconTitle mr11">
                用户角色
                <span style="color:red;">*</span>:
              </div>
              <div class="mr20">
                <el-input disabled v-model="createUserData.createUser" clearable type="text"></el-input>
              </div>
            </div>
          </div>
          <!-- 用户角色 -->
          <div>
            <div class="displayalign">
              <div class="noneIconTitle mr11">
                用户邮箱
                <span style="color:red;">*</span>:
              </div>
              <div>
                <el-input
                  placeholder="请输入邮箱"
                  v-model="createUserData.userEmail"
                  clearable
                  disabled
                  type="email"
                ></el-input>
              </div>
            </div>
          </div>
          <!-- 邮箱地址 -->
        </div>
        <!-- 账号信息 -->
        <div>
          <div class="dispalyFlex mb20">
            <div class="noneIconTitle mr11 fosi0">
              <span class="fosi14" style="visibility: hidden;">你好</span>
              <span class="fosi14">备注</span>
              <span class="fosi14" style="visibility: hidden;">好</span>
              <span class="fosi14">:</span>
            </div>
            <div class="bzTetxArea">
              <textarea
                :placeholder="createUserData.remark?createUserData.remark:'未录入备注'"
                disabled
                v-model="createUserData.remark"
                maxlength="200"
              ></textarea>
            </div>
          </div>
        </div>
        <!-- 备注 -->
      </div>
      <!-- 账号信息 -->
      <div class="displayCenter mb20">
        <div class="quxiaoBox mr20" @click="closeBtn">返回</div>
      </div>
      <!-- btn -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "createUsering",
  components: {},
  computed: {
    ...mapState(["editUser"]),
  },
  data() {
    return {
      createUserData: {
        userType: null,
        userName: "",
        userPhone: "",
        provinceCode: "",
        provinceName: "",
        cityCode: "",
        cityName: "",
        areaCode: "",
        areaName: "",
        userAddr: "",
        loginName: "",
        loginPwd: "",
        roleId: "",
        userEmail: "",
        remark: "",
        parentId: "",
        orgId: "FC4AD500BE8E4B5FB58CCAE7B519FB6F",
        waerId: "",
      },
      getProvinceData: {
        parentCode: 0,
      },
    };
  },
  created() {
    this.changeDataLookerUser();
  },

  methods: {
    //关闭
    closeBtn() {
      this.$router.go(-1);
    },
    changeDataLookerUser() {
      console.log(this.editUser, "查看");
      let {
        userName,
        userPhone,
        provinceName,
        cityName,
        loginName,
        areaName,
        userAddr,
        userEmail,
        roleId,
        loginPwdOriginal,
        remark,
        createUser
      } = this.editUser;
      this.createUserData.userName = userName;
      this.createUserData.userPhone = userPhone;
      this.createUserData.provinceName = provinceName;
      this.createUserData.cityName = cityName;
      this.createUserData.areaName = areaName;
      this.createUserData.createUser = createUser;
      this.createUserData.userAddr = userAddr;
      this.createUserData.loginName = loginName;
      this.createUserData.loginPwd = loginPwdOriginal;
      this.createUserData.roleId = roleId;
      this.createUserData.userEmail = userEmail;
      this.createUserData.remark = remark;
    },
    //取消编辑
    closeEdit() {},
    getUserName() {},
    isMobilePanduan() {},
    getMobile() {},
    //点击了提交
    async goAJAXCreate() {},
    setProvinceCode() {
      //点击了省
    },
    setCityCode() {},
    setAreaCode() {},
    getProvinceCode(e) {
      //修改省
      let { areaCode, areaName } = e;
      this.createUserData.provinceCode = areaCode;
      this.createUserData.provinceName = areaName;
      this.getProvinceData.parentCode = areaCode;
    },
    getCityCode(e) {
      //修改市
      let { areaCode, areaName } = e;
      this.createUserData.cityCode = areaCode;
      this.createUserData.cityName = areaName;
      this.getProvinceData.parentCode = areaCode;
    },
    getAreaCode(e) {
      console.log(e);
      let { areaCode, areaName } = e;
      this.createUserData.areaCode = areaCode;
      this.createUserData.areaName = areaName;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";
.setUserIngBox {
  background: rgb(232, 233, 236);
  padding: 0 10px;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  .headerBox {
    height: 50px;
    border-radius: 3px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(236, 241, 247);
    border-bottom: 1px solid #d1d6e2;
  }

  .setUserIngBoxCenter {
    position: absolute;
    left: 50%;
    top: 144px;
    transform: translateX(-50%);
    background: #fff;
    width: 1000px;
    .centerBox {
      padding: 30px 20px;
    }
    .setTitle {
      margin-bottom: 18px;
    }
    .gerxinxiBox {
      display: flex;
      flex-direction: column;
      > div {
        margin-bottom: 18px;
      }
      .xinxiBitian {
        display: flex;
        align-items: center;
        > div {
          margin-right: 20px;
        }
      }
    }

    .cityBoxCenter {
      display: flex;
      align-items: center;
    }
  }
  .textAreaBox {
    font-size: 14px;
    width: 72%;
    height: 40px;
    margin-left: 80px;
    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
    }
    margin-bottom: 30px;
  }
  .bzTetxArea {
    font-size: 14px;
    width: 72%;
    height: 80px;
    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 30px;
      overflow: hidden;
    }
  }
  .quxiaoBox {
    @include BtnFunction("error");
  }
  .tijiaoBox {
    @include BtnFunction("success");
  }
}
</style>