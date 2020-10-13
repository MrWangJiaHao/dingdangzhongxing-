<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox">
        <div class="closeTitle">创建入库单</div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>

      <div class="centerBox">
        <div class="setTitle">创建入库单</div>
        <div class="gerxinxiBox">
          <div class="xinxiBitian">
            <div>
              <div class="displayalign ellipsis">
                <div class="noneIconTitle mr11">委托公司:</div>
                <div class="mr20">
                  <searchBox
                    :searchCenter="searchName"
                    @getSearchCenterShuJu="getUserName"
                  ></searchBox>
                </div>
              </div>
            </div>
            <!-- 用户姓名 -->
            <div>
              <div class="displayalign ellipsis">
                <div class="noneIconTitle mr11">子仓名称:</div>
                <div class="mr20">
                  <el-input
                    placeholder="请输入联系电话"
                    v-model="createUserData.userPhone"
                    clearable
                    @blur="getMobile"
                    @input="isMobilePanduan"
                  ></el-input>
                </div>
              </div>
            </div>
            <!-- 联系电话 -->
            <div>
              <div class="displayalign ellipsis">
                <div class="noneIconTitle mr11">期望入库时间:</div>
                <div class="mr20">
                  <el-input
                    placeholder="请输入联系电话"
                    v-model="createUserData.userPhone"
                    clearable
                    @blur="getMobile"
                    @input="isMobilePanduan"
                  ></el-input>
                </div>
              </div>
            </div>
            <!-- 期望入库时间 -->
          </div>
        </div>
      </div>
      <!-- 个人信息 -->
      <div class="pd20">
        <div class="setTitle">产品明细</div>
        <div class="mb20 tr">
          <div class="tijiaoBox disinb mr20" @click="addChanpin">添加产品</div>
          <div class="quxiaoBox disinb" @click="goAJAXCreate">删除</div>
        </div>
        <div class="mb20">biaoge</div>
      </div>
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
              placeholder="请输入备注"
              v-model="createUserData.remark"
              maxlength="200"
            ></textarea>
          </div>
        </div>
      </div>
      <!-- 备注 -->
      <!-- 账号信息 -->
      <div class="displayCenter mb20">
        <div class="quxiaoBox mr20" @click="closeBtn">取消</div>
        <div class="tijiaoBox" @click="goAJAXCreate">提交</div>
      </div>
      <!-- btn -->
      <!-- 添加产品 start -->
      <transition name="fade">
        <div v-show="addChanpins" ref="parentSelect" class="addChanpinClass">
          <choiceSelect ref="childSelect" />
        </div>
      </transition>
      <!-- 添加产品 end -->
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import searchBox from "../../components/commin/searchBox"; //搜索框
import dropDowbox from "../../components/commin/dropDownBox"; //下拉框
import dropDownUserType from "../../components/commin/dropDownUserType"; //用户管理下拉框
import { mapState } from "vuex";
import { Message } from "element-ui";
import { isMobile, isEmail } from "../../utils/validate";
import { post } from "../../api/api";
import choiceSelect from "../../components/manual/choiceSelect";
export default {
  name: "createUsering",
  components: {
    dropDowbox,
    searchBox,
    dropDownUserType,
    choiceSelect,
  },
  data() {
    let tabledata = [
      {
        orgName: "", //委托公司
        orgId: "", //委托id
        orderNo: "", //原定单号（关联单号）
        putWareNo: "", //入库单号
        putstatus: "", //入库状态
        prodCode: "", //产品编码
        prodName: "", //产品名称
        specName: "", //规格名称
        putStartTime: "", //入库时间开始时间
        putEndTime: "", //入库时间结束时间
        expectedSendStartTime: "", //期望入库开始时间
        expectedSendEndTime: "", //期望入库时间结束时间
        putUser: "", //入库人
        batchNo: "",
      },
    ];
    return {
      tabledata,
      addChanpins: false,
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
        disabled: false,
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
        userType: 4,
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
        codeValue: "",
      },
      getProvinceData: {
        parentCode: 0,
      },
      isXuanzhe: false, //判断是否选择了省之前的
      isCity: false, //判断是否选择了省之前的
      isEdit: false, //是不是来编辑的
    };
  },
  async created() {},
  methods: {
    //点击了增加产品
    addChanpin() {
      this.addChanpins = true;
    },
    //关闭
    closeBtn() {
      this.$router.go(-1);
    },
    //取消编辑
    closeEdit() {
      this.$confirm("是否退出编辑？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("clearEditUser");
          this.$router.go(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserName(e) {
      if (!e) return Message("请输入用户姓名");
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
      if (!mes) return Message("请输入11位正确的联系电话");
    },
    //点击了提交
    async goAJAXCreate() {},
    getUserType(e) {
      //获取创建的用户类型
      this.createUserData.codeValue = e.codeValue;
      this.createUserData.roleId = e.roleId;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";
.fade-enter-active,
.fade-leave-active {
  transition: transform 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0);
}
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
    position: relative;
    justify-content: space-between;
    background: rgb(236, 241, 247);
    border-bottom: 1px solid #d1d6e2;
  }
  .addChanpinClass {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 980px;
    background: #f8f8f8;
    transform: translate(-50%, -50%);
  }
  .setUserIngBoxCenter {
    position: relative;
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