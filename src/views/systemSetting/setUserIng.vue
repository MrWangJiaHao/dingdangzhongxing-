<template>
    <div>
        <kuanjiaClick titles="创建用户" @closeBtn="closeBtn" @clickSubmit="goAJAXCreate">
            <template slot="centerKuanjia">
                <div class="centerBox">
                    <div class="setTitle">个人信息</div>
                    <div class="gerxinxiBox">
                        <div class="xinxiBitian">
                            <div>
                                <div class="displayalign">
                                    <div class="noneIconTitle mr11">
                                        用户姓名
                                        <span class="colred">*</span>:
                                    </div>
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
                                <div class="displayalign">
                                    <div class="noneIconTitle mr11">
                                        联系电话
                                        <span class="colred">*</span>:
                                    </div>
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
                        </div>
                        <div class="cityBoxCenter">
                            <div class="mr20">
                                <div class="displayalign">
                                    <div class="noneIconTitle mr11">
                                        居住住址
                                        <span class="visibilityHidden">*</span>:
                                    </div>
                                    <div>
                                        <dropDowbox
                                                :dropDowBox="dropDowProvince"
                                                @getDropDownData="getProvinceCode"
                                                @cliclInput="setProvinceCode"
                                        ></dropDowbox>
                                    </div>
                                </div>
                            </div>
                            <!-- 省 -->
                            <div class="mr20">
                                <dropDowbox
                                        :dropDowBox="dropDowCity"
                                        @getDropDownData="getCityCode"
                                        @cliclInput="setCityCode"
                                ></dropDowbox>
                            </div>
                            <!-- 市 -->
                            <div>
                                <dropDowbox
                                        :dropDowBox="dropDowDistrictCount"
                                        @getDropDownData="getAreaCode"
                                        @cliclInput="setAreaCode"
                                ></dropDowbox>
                            </div>
                            <!-- 区/县 -->
                        </div>
                        <div class="textAreaBox">
            <textarea
                    placeholder="请输入详细地址"
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
                                <span class="colred">*</span>:
                            </div>
                            <div class="mr20">
                                <searchBox
                                        :searchCenter="searchzhanhao"
                                        @getSearchCenterShuJu="getLoginName"
                                        maxlength="30"
                                ></searchBox>
                            </div>
                        </div>
                        <!-- 用户账号 -->
                        <div class="displayalign">
                            <div class="noneIconTitle mr11">
                                <span class="visibilityHidden">你好</span>密码
                                <span class="colred">*</span>:
                            </div>
                            <div>
                                <el-input
                                        placeholder="请输入密码"
                                        maxlength="30"
                                        v-model="createUserData.loginPwd"
                                        clearable
                                        type="password"
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
                                    <span class="colred">*</span>:
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
                                    <span class="colred">*</span>:
                                </div>
                                <div>
                                    <el-input
                                            placeholder="请输入邮箱"
                                            v-model="createUserData.userEmail"
                                            clearable
                                            maxlength="30"
                                            @blur="isEmails"
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
                            <div class="noneIconTitle dispalyFlex mr11 fosi0">
                                <span class="fosi14 visibilityHidden">你好</span>
                                <span class="fosi14">备注</span>
                                <span class="fosi14 visibilityHidden">*</span>
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
                </div>
                <!-- 账号信息 -->
            </template>
        </kuanjiaClick>
    </div>
</template>
<style>
    .noneIconTitle {
        display: flex;
        white-space: nowrap;
    }
</style>
<script>
    /*eslint-disable*/
    import kuanjiaClick from "../../components/commin/kuanjiaClick";


    import searchBox from "../../components/commin/searchBox"; //搜索框
    import dropDowbox from "../../components/commin/dropDownBox"; //下拉框
    import dropDownUserType from "../../components/commin/dropDownUserType"; //用户管理下拉框
    import {mapState} from "vuex";

    import {isMobile, isEmail, getCookie} from "../../utils/validate";
    import {post} from "../../api/api";

    export default {
        name: "createUsering",
        components: {
            dropDowbox,
            searchBox,
            dropDownUserType,
            kuanjiaClick,
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
                    orgId: getCookie("orgId"),
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
        async created() {
            this.$store.dispatch("getusertype");

            let probinceData = this.fasonCodeAjax();
            probinceData.then((data) => {
                this.dropDowProvince.dropDownBoxData = data;
            });
        },
        mounted() {
            this.dropDowUserType.dropDownBoxData = this.userTypeArr;
        },
        computed: {
            ...mapState(["userTypeArr"]),
        },
        methods: {
            //关闭
            closeBtn() {
                this.$parent._data.isSetUserIng = false;
                this.$parent.fasonPagIngQueryData();
            },
            //取消编辑
            closeEdit() {
                this.$messageSelf
                    .confirms("是否退出编辑？", "提示", {
                        type: "warning",
                    })
                    .then(() => {
                        this.$store.dispatch("clearEditUser");
                        this.closeBtn();
                    })
                    .catch((err) => err);
            },
            getUserName(e) {
                if (!e)
                    return this.$messageSelf.message({
                        message: "请输入用户姓名",
                        type: "warning",
                    });
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
                if (!mes)
                    return this.$messageSelf.message({
                        message: "请输入11位正确的联系电话",
                        type: "warning",
                    });
            },
            //点击了提交
            async goAJAXCreate() {
                let isMobiles = isMobile(this.createUserData.userPhone);
                let isEmails = isEmail(this.createUserData.userEmail);
                if (!this.createUserData.userName)
                    return this.$messageSelf.message({
                        message: "请输入用户姓名",
                        type: "warning",
                    });
                if (!this.createUserData.userPhone)
                    return this.$messageSelf.message({
                        message: "请输入用户联系电话",
                        type: "warning",
                    });
                if (!this.createUserData.loginName)
                    return this.$messageSelf.message({
                        message: "请输入用户账号",
                        type: "warning",
                    });
                if (!this.createUserData.loginPwd)
                    return this.$messageSelf.message({
                        message: "请输入用户密码",
                        type: "warning",
                    });
                if (!this.createUserData.userType)
                    return this.$messageSelf.message({
                        message: "请输入用户角色",
                        type: "warning",
                    });
                if (!this.createUserData.userEmail)
                    return this.$messageSelf.message({
                        message: "请输入邮箱地址",
                        type: "warning",
                    });
                if (!isMobiles)
                    return this.$messageSelf.message({
                        message: "请输入11位正确的联系电话",
                        type: "warning",
                    });
                if (!isEmails)
                    return this.$messageSelf.message({
                        message: "请输入正确的邮箱",
                        type: "warning",
                    });

                let results = await post({
                    url: "/am/v1/pUser/saveRecord",
                    data: this.createUserData,
                });
                if (results.code === "10000") {
                    this.$messageSelf.message({message: "创建成功", type: "success"});
                    this.closeBtn()
                    this.$router.push({
                        path: "/systemSetting/userSetting",
                    });
                } else {
                    this.$messageSelf.message({message: results.msg, type: "error"});
                }
            },
            setProvinceCode() {
                //点击了省
                this.isXuanzhe = true;
            },
            setCityCode() {
                if (!this.isXuanzhe)
                    return this.$messageSelf.message({
                        message: "请选择省",
                        type: "warning",
                    });
                if (!this.getProvinceData.parentCode)
                    return this.$messageSelf.message({
                        message: "请选择省",
                        type: "warning",
                    });
                let probinceData = this.fasonCodeAjax();
                probinceData.then((data) => {
                    this.dropDowCity.dropDownBoxData = data;
                });
                this.isCity = true;
            },
            setAreaCode() {
                if (!this.isCity)
                    return this.$messageSelf.message({
                        message: "请选择市",
                        type: "warning",
                    });
                let probinceData = this.fasonCodeAjax();
                probinceData.then((data) => {
                    this.dropDowDistrictCount.dropDownBoxData = data;
                });
            },
            getProvinceCode(e) {
                //修改省
                let {areaCode, areaName} = e;
                this.createUserData.provinceCode = areaCode;
                this.createUserData.provinceName = areaName;
                this.getProvinceData.parentCode = areaCode;
            },
            getCityCode(e) {
                //修改市
                let {areaCode, areaName} = e;
                this.createUserData.cityCode = areaCode;
                this.createUserData.cityName = areaName;
                this.getProvinceData.parentCode = areaCode;
            },
            getAreaCode(e) {
                //修改区
                let {areaCode, areaName} = e;
                this.createUserData.areaCode = areaCode;
                this.createUserData.areaName = areaName;
            },
            //发送省市 ajax
            async fasonCodeAjax() {
                let provinceDatas = await post({
                    url: "/am/v1/pArea/findRecord",
                    data: this.getProvinceData,
                });
                return provinceDatas.result;
            },
            getLoginName(e) {
                this.createUserData.loginName = e;
            },
            isEmails() {
                let mes = isEmail(this.createUserData.userEmail);
                if (!mes)
                    return this.$messageSelf.message({
                        message: "请输入正确的邮箱",
                        type: "warning",
                    });
            },
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

    .setUserIngBox {
        .setUserIngBoxCenter {
            .gerxinxiBox {
                display: flex;
                flex-direction: column;

                .xinxiBitian {
                    display: flex;
                    align-items: center;

                    > div {
                        margin-right: 20px;
                    }
                }
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
            width: 81%;
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