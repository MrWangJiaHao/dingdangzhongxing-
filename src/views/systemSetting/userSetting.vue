/*eslint-disable*/
<template>
    <div class="userSettingBox">
        <div class="fuzzyQueryBox mb16">
            <div class="biaogeBox">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">用户账号:</div>
                    <div class="mr20">
                        <el-input
                                placeholder="请输入要查询的用户账号"
                                v-model="pagingQueryData.paras.loginName"
                                clearable
                        ></el-input>
                    </div>
                </div>
                <!-- 用户账户 -->
                <div class="zujianBox">
                    <div class="displayalign zujianBox">
                        <div class="noneIconTitle mr11">用户角色:</div>
                        <div class="mr20">
                            <el-select
                                    v-model="pagingQueryData.paras.createUser"
                                    slot="prepend"
                                    :disabled="dropDowBox.disabled"
                                    :placeholder="dropDowBox.placeholder"
                                    @input="getCodeValue"
                            >
                                <el-option
                                        v-for="(item, idx) in dropDowBox.dropDownBoxData"
                                        :key="idx"
                                        :label="item.codeName"
                                        :value="idx"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <!-- 用户角色 -->
                <div class="timeBox zujianBox">
                    <div style="margin-right: 10px">
                        <dateTime
                                :dateTimeData="datetimeDates"
                                @getDateTime="getStartTime"
                                ref="startTime"
                        />
                    </div>
                    <!-- 开始时间 -->
                    <div class="line"></div>
                    <div>
                        <dateTime
                                :dateTimeData="datetimeDate"
                                @getDateTime="getEndTime"
                                ref="endTime"
                        />
                    </div>
                    <!-- 结束时间 -->
                </div>
                <!-- 创建时间 -->
            </div>
            <div class="btns">
                <div class="queryBtn mr11 zujianBox" @click="clickQueryUser">查询</div>
                <div class="clearBtn" @click="clearInputAll">清空</div>
            </div>
        </div>
        <!-- 头部 -->
        <div class="btnArr">
            <div style="background-color: #fff">
                <div class="meiyiyetitle">系统管理</div>
                <div class="btnClick">
                    <div class="setUser" @click="gotoRouterSetUserIng">创建</div>
                    <div class="bianjiUser" @click="editBtn">编辑</div>
                    <div class="goOn" @click="lookUser">查看</div>
                    <div class="lodopFunClear" @click="locotpUserEWM">打印二维码</div>
                    <div class="remove" @click="clearUser">删除</div>
                </div>
            </div>
        </div>
        <!-- but按钮 -->
        <div class="tableBox">
            <div style="background-color: #fff; padding: 16px 20px 16px 20px">
                <div class="center">
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
                            :stripe="true"
                            :border="true"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                                type="selection"
                                align="center"
                                width="50"
                        ></el-table-column>
                        <el-table-column
                                label="序号"
                                type="index"
                                width="50"
                                align="center"
                                show-overflow-tooltip
                        />
                        <el-table-column
                                label="用户账号"
                                prop="loginName"
                                show-overflow-tooltip
                        />
                        <el-table-column
                                label="用户姓名"
                                prop="userName"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="用户角色"
                                prop="createUser"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="联系电话"
                                align="center"
                                prop="userPhone"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="居住地址"
                                prop="address"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="创建人"
                                prop="loginName"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column label="创建时间">
                            <template slot-scope="scope">{{ scope.row.createTime }}</template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 表格主体 -->
                <div class="pageComponent">
                    <pagecomponent
                            :pageComponentsData="pageComponentsData"
                            @getPageNum="getPageNum"
                            @sureSuccssBtn="sureSuccssBtn"
                    />
                </div>
            </div>
        </div>
        <!-- table表格 -->
        <div v-show="ewms" class="ewms clearfix" id="ewms">
            <div style="width: 840px">
                <div
                        v-for="(item, idx) in EwmArray"
                        :key="idx"
                        style="
            float: left;
            margin-right: 20px;
            margin-bottom: 20px;
            width: 220px;
          "
                >
                    <getEwmRes :ewmArr="item" :idx="idx"/>
                </div>
            </div>
        </div>
        <!-- 二维码 -->
        <div class="lineBox">
            <div class="line"></div>
        </div>
        <!-- 创建 start -->
        <!-- 采购单详情页 start -->
        <div v-show="isSetUserIng" class="bjBox">
            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div v-if="isSetUserIng">
                    <setUserIng/>
                </div>
            </transition>
        </div>
        <!-- 创建 end -->

        <!-- 编辑 start -->
        <div v-show="iseditUserIng" class="bjBox">
            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div v-if="iseditUserIng">
                    <editUserIng :editUserIngJson="editUserIngJson"/>
                </div>
            </transition>
        </div>
        <!-- 编辑 end -->
        <!-- 查看 start -->
        <div v-show="islookUser" class="bjBox">
            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div v-if="islookUser">
                    <lookUser :editUserIngJson="editUserIngJson"/>
                </div>
            </transition>
        </div>

        <!-- 查看 end -->
    </div>
</template>

<script>
    /*eslint-disable*/
    import dateTime from "../../components/commin/dateTime.vue"; //时间
    import pagecomponent from "../../components/commin/pageComponent"; //分页器
    import EWM from "../../components/EWM"; //分页器

    import {post, logins} from "../../api/api";
    import {mapState} from "vuex";
    import {ajaxPost} from "../../utils/validate";
    import getEwmRes from "../../components/getEwmRes";
    import setUserIng from "./setUserIng"; //创建
    import editUserIng from "./editUserIng"; //编辑
    import lookUser from "./lookUser";

    export default {
        components: {
            dateTime,
            pagecomponent,
            EWM,
            getEwmRes,
            setUserIng,
            editUserIng,
            lookUser,
        },
        computed: {
            ...mapState(["editUser", "userTypeArr"]),
        },
        data() {
            return {
                isSetUserIng: false,
                iseditUserIng: false, // 编辑
                islookUser: false, //查看
                ewms: false,
                tableData: [
                    {
                        loginName: 0,
                        userName: "",
                        codeName: "",
                        userPhone: 0,
                        address: " ",
                        createUser: "",
                        createTime: "",
                    },
                ],
                multipleSelection: [],
                dropDowBox: {
                    //下拉框需要的json
                    title: "用户角色",
                    dropDownBoxData: [], //下拉需要的data
                    placeholder: "请选择用户角色",
                },
                searchCenter: {
                    //搜索框需要的json
                    searchWrite: "",
                    placeholder: "请输入要查询的用户账号",
                },
                pageComponentsData: {
                    //这是分页器需要的json
                    pageNums: 0, //一共多少条 //默认一页10条
                },
                datetimeDate: {
                    placeholder: "请选择结束创建时间",
                },
                datetimeDates: {
                    title: "创建时间",
                    placeholder: "请选择开始创建时间",
                },
                LODOP: null,
                EwmArray: [],
                pagingQueryData: {
                    //分页查询
                    pageNumber: 1,
                    pageSize: 10,
                    paras: {
                        orgId: "",
                        id: "",
                        codeValue: "",
                        userType: null,
                        createStartTime: "",
                        createEndTime: "",
                        loginName: "",
                        roleId: "",
                        wareId: "",
                    },
                },
                editUserIngJson: {},
            };
        },
        async created() {
            this.fasonPagIngQueryData();
            setTimeout(() => {
                this.dropDowBox.dropDownBoxData = this.userTypeArr;
            }, 0);
        },
        methods: {
            locotpUserEWM() {
                if (this.multipleSelection.length == 0)
                    return this.$messageSelf.message({message: "请选择要打印的二维码", type: "warning"});
                let arr = this._getIDArr();
                this.EwmArray = this.multipleSelection;
                setTimeout(() => {
                    this.LODOP = this.$getLodop();
                    this._createEwm(this.multipleSelection);
                }, 200);
            },
            //打印二维码函数
            _createEwm() {
                this.LODOP.ADD_PRINT_HTM(
                    20,
                    40,
                    2970,
                    2100,
                    document.getElementById("ewms").innerHTML
                );
                // this.LODOP.PRINTA(); //不需要进入查看页面 直接打印
                this.LODOP.PREVIEW(); //需要进入页面查看
            },
            //点击查看角色
            lookUser() {
                if (!this.multipleSelection.length)
                    return this.$messageSelf.message({message: "请选择要查看的账号", type: "warning"});
                if (this.multipleSelection.length !== 1)
                    return this.$messageSelf.message({
                        message: "每次只能查看一条账号，请重新选择",
                        type: "warning",
                    });
                let id = this.multipleSelection[0].id;
                this.fasonEdit({id}, "islookUser");
            },
            //点击删除角色
            clearUser() {
                let arr = this._getIDArr();
                if (!arr.length) return this.$messageSelf.message({message: "请选择要删除的用户", type: "warning",});
                if (arr.length !== 1)
                    return this.$messageSelf.message({message: "一次只能删除一个用户", type: "warning"});
                this.$messageSelf
                    .confirms("确定要删除该用户？", "提示", {
                        type: "warning",
                    })
                    .then(() => {
                        this._clearAjax({id: arr[0]});
                    })
                    .catch((err) => {
                        this.$messageSelf.message("已取消删除");
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
                let datas = await post({
                        url: "http://139.196.176.227:8801/am/v1/pUser/delRecord",
                        data,
                    }),
                    self = this;
                if (datas.code === "10000") {
                    this.$messageSelf.message({
                        type: "success",
                        message: datas.msg,
                        duration: 1000,
                        onClose() {
                            self.fasonPagIngQueryData();
                        },
                    });
                } else {
                    this.$messageSelf.message({
                        type: "error",
                        message: datas.msg ? datas.msg : "删除失败",
                    });
                }
            },
            //点击编辑按钮
            editBtn() {
                if (!this.multipleSelection.length && this.multipleSelection.length != 1)
                    return this.$messageSelf.message(
                        {message: "请选择要编辑的账号,每次自能选择一条账号进行编辑", type: "warning"}
                    );
                let id = this.multipleSelection[0].id;
                this.fasonEdit({id}, "iseditUserIng");
            },
            async fasonEdit(data, path) {
                let datas = await post({
                    url: "http://139.196.176.227:8801/am/v1/pUser/findRecord",
                    data,
                });
                if (datas.code === "10000") {
                    this[path] = true;
                    this.editUserIngJson = datas.result[0];
                } else {
                    this.$messageSelf.message(datas.msg);
                }
            },
            //发送获取列表的消息
            async fasonPagIngQueryData() {
                let datas = await post({
                    url: "http://139.196.176.227:8801/am/v1/pUser/findWHRecordPage",
                    data: {...this.pagingQueryData, userType: 4},
                });
                if (datas.code === "10000") {
                    this.changeData(datas.result);
                } else {
                    this.$messageSelf.message(datas.msg);
                }
            },
            changeData(data) {
                this.changeTableData(data); //用来改变表格
                this.changePageData(data); //用来改变分页器的条数
            },
            //用来改变表格
            changeTableData(data) {
                let {list} = data;
                this.tableData = list;
                list.forEach((item, idx) => {
                    this.tableData[idx].address =
                        item.provinceName + item.cityName + item.areaName + item.userAddr;
                });
            },
            //用来改变分页器的条数
            changePageData(data) {
                let {totalRow} = data;
                this.pageComponentsData.pageNums = totalRow;
            },
            getPageNum(e) {
                this.pagingQueryData.pageNumber = e;
                this.fasonPagIngQueryData();
            },
            sureSuccssBtn(e) {
                this.pagingQueryData.pageNumber = e;
                this.fasonPagIngQueryData();
            },
            //点击创建按钮
            gotoRouterSetUserIng() {
                this.isSetUserIng = true;
            },
            //搜索框改变后的数据
            getChangeInput(e) {
                this.faSonajax.zhanhao = e;
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach((row) => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //点击查询按钮
            clickQueryUser() {
                this.fasonPagIngQueryData();
            },
            //点击清空按钮
            clearInputAll() {
                this.$store.dispatch("clearsystemSettingtime");
                this.pagingQueryData.paras.loginName = "";
                this.pagingQueryData.paras.createEndTime = "";
                this.pagingQueryData.paras.createStartTime = "";
                this.pagingQueryData.paras.createUser = ""
                this.$refs.startTime.clear();
                this.$refs.endTime.clear();
                this.fasonPagIngQueryData();
            },
            getStartTime(e) {
                this.pagingQueryData.paras.createStartTime = e;
                this.pagingQueryData.paras.userType = null;
            },
            getEndTime(e) {
                this.pagingQueryData.paras.createEndTime = e;
                this.pagingQueryData.paras.userType = null;
            },
            //用户角色
            getCodeValue(e) {
                this.pagingQueryData.paras.codeValue = this.dropDowBox.dropDownBoxData[
                    e
                    ].codeName;
            },
        },
    };
</script>

<style lang='scss' scoped>
    @import "../../assets/scss/btn.scss";

    .userSettingBox {
        border-top: 1px solid #d1d6e2;
        background-color: #eef1f8;

        .fuzzyQueryBox {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;

            .biaogeBox {
                align-items: center;
                display: flex;
            }

            .timeBox {
                display: flex;
                align-items: center;
            }

            .line {
                width: 20px;
                height: 2px;
                background: #fff;
                margin-right: 10px;
            }

            .btns {
                display: flex;

                .queryBtn {
                    @include BtnFunction("success");
                }

                .clearBtn {
                    @include BtnFunction();
                    background: #fff;
                }
            }
        }

        .btnArr {
            padding: 0 10px;

            > div {
                border-bottom: 1px solid #d1d6e2;
                padding: 16px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                div {
                    display: inline-block;
                }
            }

            .meiyiyetitle {

                &::before {
                    background: url(../../assets/img/systemTitlemesa.png) center center;
                    background-size: cover;
                }
            }

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

            .lodopFunClear {
                margin-right: 10px;
                @include BtnFunction("success");
            }
        }

        .tableBox {
            padding: 0 10px 0px 10px;

            .pageComponent {
                // margin: 180px 10px 0 0;
                text-align: right;
                height: 36px;
                background: #ffffff;
                border: 1px solid #d1d6e2;
            }
        }

        .lineBox {
            height: 25px;
            padding: 0 10px;

            > div {
                height: 100%;
                background: #fff;
            }
        }
    }

    .ewms {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #f8f8f8;
        z-index: 100;
    }
</style>