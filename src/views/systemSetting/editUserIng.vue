<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox">
        <div class="closeTitle">编辑用户</div>
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
                  <span style="color: red">*</span>:
                </div>
                <div class="mr20">
                  <el-input
                    placeholder="请输入用户姓名"
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
                  <span style="color: red">*</span>:
                </div>
                <div class="mr20">
                  <el-input
                    placeholder="请输入联系电话"
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
                  <span style="visibility: hidden">*</span>:
                </div>
                <div>
                  <el-select
                    v-model="createUserData.provinceName"
                    slot="prepend"
                    @focus="setProvinceCode"
                    @input="getProvinceCode"
                  >
                    <el-option
                      v-for="(item, idx) in dropDowProvince.dropDownBoxData"
                      :key="idx"
                      :label="item.areaName ? item.areaName : item"
                      :value="idx"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <!-- 省 -->
            <div class="mr20">
              <el-select
                v-model="createUserData.cityName"
                @input="getCityCode"
                @focus="setCityCode"
                slot="prepend"
              >
                <el-option
                  v-for="(item, idx) in dropDowCity.dropDownBoxData"
                  :key="idx"
                  :label="item.areaName ? item.areaName : item"
                  :value="idx"
                ></el-option>
              </el-select>
            </div>
            <!-- 市 -->
            <div>
              <el-select
                v-model="createUserData.areaName"
                @input="getAreaCode"
                @focus="setAreaCode"
                slot="prepend"
              >
                <el-option
                  v-for="(item, idx) in dropDowDistrictCount.dropDownBoxData"
                  :key="idx"
                  :label="item.areaName ? item.areaName : item"
                  :value="idx"
                ></el-option>
              </el-select>
            </div>
            <!-- 区/县 -->
          </div>
          <div class="textAreaBox">
            <textarea
              :placeholder="
                createUserData.userAddr
                  ? createUserData.userAddr
                  : '未录入详细地址'
              "
              v-model="createUserData.userAddr"
              maxlength="200"
            ></textarea>
          </div>
          <!-- 居住地址 -->
        </div>
      </div>
      <!-- 个人信息 -->
      <div class="mb20 centerBox">
        <div class="setTitle">账号信息</div>
        <div class="displayalign mb20">
          <div class="displayalign">
            <div class="noneIconTitle mr11">
              用户账号
              <span style="color: red">*</span>:
            </div>
            <div class="mr20">
              <el-input
                :placeholder="createUserData.loginName"
                v-model="createUserData.loginName"
                clearable
                disabled
              ></el-input>
            </div>
          </div>
          <!-- 用户账号 -->
          <div class="displayalign">
            <div class="noneIconTitle mr11">
              <span style="visibility: hidden">你好</span>密码
              <span style="color: red">*</span>:
            </div>
            <div>
              <el-input
                placeholder="请输入密码"
                v-model="createUserData.loginPwd"
                clearable
                type="text"
                @focus="isPWDkuan"
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
                <span style="color: red">*</span>:
              </div>
              <div class="mr20">
                <dropDownUserType
                  :dropDowBox="dropDowUserType"
                  @getDropDownData="getUserType"
                ></dropDownUserType>
              </div>
            </div>
          </div>
          <!-- 用户角色 -->
          <div>
            <div class="displayalign">
              <div class="noneIconTitle mr11">
                用户邮箱
                <span style="color: red">*</span>:
              </div>
              <div>
                <el-input
                  placeholder="请输入邮箱"
                  v-model="createUserData.userEmail"
                  clearable
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
              <span class="fosi14" style="visibility: hidden">你好</span>
              <span class="fosi14">备注</span>
              <span class="fosi14" style="visibility: hidden">好</span>
              <span class="fosi14">:</span>
            </div>
            <div class="bzTetxArea">
              <textarea
                :placeholder="
                  createUserData.remark ? createUserData.remark : '未录入备注'
                "
                v-model="createUserData.remark"
                maxlength="200"
              ></textarea>
            </div>
          </div>
        </div>
        <!-- 备注 -->
      </div>
      <!-- 账号信息 -->
      <div class="disRight mr20 mb20">
        <div class="quxiaoBox mr20" @click="closeBtn">取消</div>
        <div class="tijiaoBox" @click="goAJAXCreate">提交</div>
      </div>
      <!-- btn -->
    </div>
  </div>
</template>

<script>
import { isMobile, isEmail } from "../../utils/validate";
import { post } from "../../api/api";
import { mapState } from "vuex";
import dropDownUserType from "../../components/commin/dropDownUserType"; //用户管理下拉框

export default {
  name: "createUsering",
  components: {
    dropDownUserType,
  },
  props: {
    editUserIngJson: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(["editUser", "userTypeArr"]),
  },
  data() {
    return {
      dropDowProvince: {
        //下拉框需要的json
        dropDownBoxData: [], //下拉需要的data
        placeholder: "省",
      },
      dropDowCity: {
        placeholder: "市",
        dropDownBoxData: [], //下拉需要的data
      },
      dropDowDistrictCount: {
        placeholder: "区/县",
        dropDownBoxData: [], //下拉需要的data
      },
      searchName: {
        //搜索框需要的json
        searchWrite: "",
        placeholder: "请输入用户姓名",
      },
      dropDowUserType: {
        //下拉框需要的json
        dropDownBoxData: [],
        placeholder: "请选择用户角色",
        disabled: true,
        value: "",
      },
      searchMobile: {
        //搜索框需要的json
        searchWrite: "",
        placeholder: "请输入联系电话",
      },
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "创建时间",
        placeholder: "请选择开始时间",
      },
      searchzhanhao: {
        placeholder: "请输入您的账号",
      },
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
        id: "",
      },
      getProvinceData: {
        parentCode: 0,
      },
      getCityCodeData: {
        parentCode: 0,
      },
      getAreaCodeData: {
        parentCode: 0,
      },
      loginPWd: "", //存储密码
      isXuanzhe: false, //判断是否选择了省之前的
      isCity: false, //判断是否选择了省之前的
      isEdit: false, //是不是来编辑的
    };
  },
  created() {
    console.log(this.editUserIngJson);

    let probinceData = this.fasonCodeAjax(this.getProvinceData);
    probinceData.then((data) => {
      this.dropDowProvince.dropDownBoxData = data;
    });
    this.changeDataLookerUser();
  },
  mounted() {
    this.dropDowUserType.dropDownBoxData = this.userTypeArr;
  },
  methods: {
    //密码框
    isPWDkuan() {},
    changeDataLookerUser() {
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
        remark,
        provinceCode,
        cityCode,
        userType,
        areaCode,
        loginPwdOriginal,
        id,
        orgId,
      } = this.editUserIngJson;
      this.createUserData.orgId = orgId;
      this.createUserData.userName = userName;
      this.createUserData.userPhone = userPhone;
      this.createUserData.provinceName = provinceName;
      this.createUserData.cityName = cityName;
      this.createUserData.areaName = areaName;
      this.createUserData.userAddr = userAddr;
      this.createUserData.loginName = loginName;
      this.createUserData.loginPwd = loginPwdOriginal;
      this.createUserData.id = id;
      this.loginPWd = loginPwdOriginal;
      this.createUserData.roleId = roleId;
      this.createUserData.userType = userType;
      this.createUserData.userEmail = userEmail;
      this.createUserData.remark = remark;
      this.getProvinceData.parentCode = provinceCode;
      this.getCityCodeData.parentCode = cityCode;
      this.getAreaCodeData.parentCode = areaCode;
      this.dropDowUserType.value = userType;
    },
    //关闭
    closeBtn() {
      this.closeEdit();
    },
    //取消编辑
    closeEdit() {
      this.$messageSelf
        .confirms("是否退出编辑？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.$store.dispatch("clearEditUser");
          this.$parent._data.iseditUserIng = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserName(e) {
      if (!e) return this.$messageSelf.message("请输入用户姓名");
      this.createUserData.userName = e;
    },
    isMobilePanduan() {
      this.createUserData.userPhone = this.createUserData.userPhone.substring(
        0,
        11
      );
    },
    getMobile() {
      let mes = isMobile(this.createUserData.userPhone);
      if (!mes) return this.$messageSelf.message("请输入11位正确的联系电话");
    },
    //点击了提交
    async goAJAXCreate() {
      if (!this.createUserData.userName)
        return this.$messageSelf.message("请输入用户姓名");
      if (!this.createUserData.userPhone)
        return this.$messageSelf.message("请输入用户联系电话");
      if (!this.createUserData.loginName)
        return this.$messageSelf.message("请输入用户账号");
      if (!this.createUserData.loginPwd)
        return this.$messageSelf.message("请输入用户密码");
      if (!this.createUserData.userType)
        return this.$messageSelf.message("请输入用户角色");
      if (!this.createUserData.userEmail)
        return this.$messageSelf.message("请输入邮箱地址");
      let results = await post({
        url: "http://139.196.176.227:8801/am/v1/pUser/saveRecord",
        data: this.createUserData,
      });
      if (results.code === "10000") {
        this.$messageSelf.message(results.msg);
        this.$router.push({
          path: "/systemSetting/userSetting",
        });
      } else {
        this.$messageSelf.message(results.msg);
      }
    },
    //点击省
    setProvinceCode() {
      console.log("点击省", this.getProvinceData);
      this.fasonCodeAjax(this.getProvinceData);
    },
    //点击市
    setCityCode() {
      console.log(this.getProvinceData + "点击市");
      this.fasonCodeAjax(this.getProvinceData).then((data) => {
        this.dropDowCity.dropDownBoxData = data;
      });
    },
    //直接点击区
    setAreaCode() {
      console.log("点击区");
      console.log(this.getCityCodeData);
      this.fasonCodeAjax(this.getCityCodeData).then((data) => {
        this.dropDowDistrictCount.dropDownBoxData = data;
      });
    },
    getProvinceCode(e) {
      //修改省
      e = this.dropDowProvince.dropDownBoxData[e];
      let { areaCode, areaName } = e;
      this.createUserData.provinceCode = areaCode;
      this.createUserData.provinceName = areaName;
      this.getProvinceData.parentCode = areaCode;
    },
    getCityCode(e) {
      //修改市
      e = this.dropDowCity.dropDownBoxData[e];
      let { areaCode, areaName } = e;
      this.createUserData.cityCode = areaCode;
      this.createUserData.cityName = areaName;
      this.getCityCodeData.parentCode = areaCode;
    },
    getAreaCode(e) {
      //修改区
      e = this.dropDowDistrictCount.dropDownBoxData[e];
      let { areaCode, areaName } = e;
      this.createUserData.areaCode = areaCode;
      this.createUserData.areaName = areaName;
      this.getAreaCodeData.parentCode = areaCode;
    },
    //发送省市 ajax
    async fasonCodeAjax(data) {
      let provinceDatas = await post({
        url: "http://139.196.176.227:8801/am/v1/pArea/findRecord",
        data,
      });
      return provinceDatas.result;
    },
    getLoginName(e) {
      this.createUserData.loginName = e;
    },
    isEmails() {
      let mes = isEmail(this.createUserData.userEmail);
      if (!mes) return this.$messageSelf.message("请输入正确的邮箱");
    },
    getUserType(e) {
      console.log(e);
      this.createUserData.userType = e.codeValue;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";
.setUserIngBox {
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
    max-width: 1000px;
    overflow: auto;
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
    border: 1px solid rgb(209, 214, 226);
    @include BtnFunction();
  }
  .tijiaoBox {
    @include BtnFunction("success");
  }
}
</style>