<template>
    <div>
        <kuanjiaClick :titles='edifManageMent ? "编辑入库单" : "创建入库单"' @closeBtn="closeBtn"
                      width="1200"
                      @clickSubmit="goAJAXCreate">
            <template slot="centerKuanjia">
                <div class="centerBox">
                    <div class="setTitle">
                        {{ edifManageMent ? "编辑入库单" : "创建入库单" }}
                    </div>
                    <div class="gerxinxiBox">
                        <div class="xinxiBitian">
                            <div>
                                <div class="displayalign ellipsis">
                                    <div class="noneIconTitle mr11">委托公司:</div>
                                    <div class="mr20">
                                        <el-select
                                                v-model="companyJson.value"
                                                @focus="getCompanyJsonAndArr"
                                                @change="changeCompany"
                                                placeholder="请选择委托公司"
                                        >
                                            <el-option
                                                    v-for="(item, idx) in companyJson.companyArr"
                                                    :key="idx"
                                                    :label="item.orgName"
                                                    :value="idx"
                                            >
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <!-- 委托公司 -->
                            <div>
                                <div class="displayalign ellipsis">
                                    <div class="noneIconTitle mr11">子仓名称:</div>
                                    <div class="mr20">
                                        <el-select
                                                v-model="createUserData.childWareName"
                                                @focus="getZiCangJsonAndArr"
                                                @change="changeziCang"
                                                placeholder="请选择子仓名称"
                                        >
                                            <el-option
                                                    v-for="(item, idx) in ziCangJson.ziCangArr"
                                                    :key="idx"
                                                    :label="item.childWareName"
                                                    :value="idx"
                                            >
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <!-- 根据委托公司查询子仓 getFindOrgChildWare -->
                            <div>
                                <div class="displayalign ellipsis">
                                    <div class="noneIconTitle mr11">期望入库时间:</div>
                                    <div class="mr20">
                                        <dateTime
                                                width="250"
                                                :valueDataStart="createUserData.expectedSendTime"
                                                :dateTimeData="datetimeDate"
                                                @getDateTime="getExpectedSendTime"
                                        />
                                    </div>
                                </div>
                            </div>
                            <!-- 期望入库时间 -->
                        </div>
                    </div>
                </div>
                <!-- 个人信息 -->
                <div class="centerBox ">
                    <div class="clearfix">
                        <div class="setTitle fl">产品明细</div>
                        <div class="mb20 fr">
                            <div class="tijiaoBox disinb mr20" @click="addChanpin">
                                添加产品
                            </div>
                            <div class="remove disinb" @click="goClearRemove">删除</div>
                        </div>
                    </div>
                    <div class="mb20 tableInInput" id="bjTableWraper">
                        <el-table
                                ref="multipleTable"
                                :data="tabledata"
                                :stripe="true"
                                :border="true"
                                tooltip-effect="dark"
                                @selection-change="handleSelectionChange"
                        >
                            <el-table-column
                                    align="center"
                                    type="selection"
                                    width="82"
                                    fixed="left"
                            ></el-table-column>
                            <el-table-column
                                    label="序号"
                                    type="index"
                                    width="71"
                                    align="center"
                                    show-overflow-tooltip
                            />
                            <el-table-column
                                    label="产品编码"
                                    width="180"
                                    prop="prodCode"
                                    show-overflow-tooltip
                            />
                            <el-table-column
                                    label="产品名称"
                                    width="119"
                                    property="prodName"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    width="119"
                                    label="产品规格"
                                    prop="specName"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="品牌"
                                    width="119"
                                    prop="braName"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="当前库位产品数量"
                                    width="200"
                                    prop="currInventory"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="最大存放数"
                                    width="119"
                                    prop="maxNum"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="*入库数量"
                                    width="119"
                                    prop="prodNum"
                                    show-overflow-tooltip
                            >
                                <el-input
                                        type="number"
                                        slot-scope="scope"
                                        v-model="scope.row.prodNum"
                                >
                                </el-input>
                            </el-table-column>
                            <el-table-column
                                    label="推荐库位"
                                    prop="putEndTime"
                                    show-overflow-tooltip
                                    width="200"
                            >
                                <el-select
                                        slot-scope="scope"
                                        v-model="scope.row.recommendSeatNo"
                                        placeholder="请选择库位"
                                        @focus="getkuweimes(scope.row, scope.$index)"
                                        @change="kuweiChanges"
                                >
                                    <el-option
                                            v-for="(item, idx) in scope.row.kueirArr"
                                            :key="idx"
                                            :label="item.recommendSeatNo"
                                            :value="idx"
                                    >
                                    </el-option>
                                </el-select>
                            </el-table-column>
                            <el-table-column
                                    label="期望入库时间"
                                    prop="expectedSendTime"
                                    width="250"
                                    show-overflow-tooltip
                            >
                                <div slot-scope="scope">
                                    <div @click="getDateTimeIndex(scope.$index)">
                                        <dateTime
                                                width="200"
                                                :valueDataStart="scope.row.manuTime"
                                                :dateTimeData="datetimeDate"
                                                @getDateTime="getDateTimeExpectedSendTime"
                                        />
                                    </div>
                                </div>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div>
                    <div class="dispalyFlex ptb20 mb20">
                        <div class="noneIconTitle mr11 fosi0">
                            <span class="fosi14 visibilityHidden">你好</span>
                            <span class="fosi14">备注</span>
                            <span class="fosi14 visibilityHidden">好</span>
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
            </template>
        </kuanjiaClick>

        <!-- 添加产品 start -->
        <div v-show="addChanpins" :class="popUpShows?'bjBox':'bjBox'">

            <div
                    v-if="addChanpins"
            >
                <choiceSelect ref="childSelect"/>
            </div>
            <!-- 添加产品 end -->
        </div>
    </div>
</template>
<style>
    .setUserIngBox .is-disabled {
        background: #e1eaf5;
    }

    .centerBox {
        border-bottom: 1px solid #d1d6e2;
    }
</style>
<script>
    /*eslint-disable */
    import kuanjiaClick from "../../components/commin/kuanjiaClick";

    import searchBox from "../../components/commin/searchBox"; //搜索框
    import dropDowbox from "../../components/commin/dropDownBox"; //下拉框
    import dropDownUserType from "../../components/commin/dropDownUserType"; //用户管理下拉框
    import dateTime from "../../components/commin/dateTime"; //用户管理下拉框
    import {getCookie, popUpShow, popUpCount} from "../../utils/validate";
    import {
        getFindWareOrg,
        getFindOrgChildWare,
        getfindOrgProductPage,
        getFindWareHouseDetailByIds,
        getSaveRecord,
    } from "../../api/api";
    import choiceSelect from "../../components/manual/choiceSelect";

    export default {
        name: "createUsering",
        components: {
            dropDowbox,
            searchBox,
            dropDownUserType,
            choiceSelect,
            dateTime,
            kuanjiaClick
        },

        data() {
            return {
                companyJson: {
                    companyArr: [],
                    value: "",
                },
                datetimeDate: {
                    placeholder: "请选择预期入库时间",
                },
                multipleSelection: [],
                tabledata: [],
                addChanpins: false,
                ziCangJson: {
                    value: "",
                    ziCangArr: [],
                },
                createUserData: {
                    putstatus: "0",
                    disposeStatus: "0", //处理状态
                    expectedSendTime: "", //期望入库时间
                    operatorType: (() => (this.edifManageMent ? 2 : 1))(),
                    wareid: getCookie("X-Auth-wareId"),
                    childWareId: sessionStorage.getItem("createManagementChildWareId"),
                    remark: "",
                    orgId: sessionStorage.getItem("orgId"),
                    orgName: "",
                    childWareName: "",
                    detailList: [],
                    orderSource: (() => this.orderSources)(),
                    id: "",
                },
                Index: null,
                sendoutDatas: {
                    pageNumber: 1,
                    pageSize: 10,
                    operatorType: (() => (this.edifManageMent ? 2 : 1))(),
                    wareid: getCookie("X-Auth-wareId"),
                    childWareId: (() => {
                        return sessionStorage.getItem("createManagementChildWareId");
                    })(),
                    orgId: sessionStorage.getItem("orgId"),
                    orderSource: (() => this.orderSources)(),
                    paras: {
                        prodName: "", //产品名称
                        prodCode: "", //产品编码
                        specName: "", //产品规格
                    },
                },
                getProvinceData: {
                    parentCode: 0,
                },
                prodUnitData: [],
                tables: [],
                rowTables: null,
                kueirArr: [],
                targetRow: {},
                delistIndex: null,
            };
        },
        props: {
            orderSources: {
                type: String,
                default: "0",
            },
            edifManageMent: {
                Type: Boolean,
                default: false,
            },
        },
        computed: {
            popUpShows() {
                return this.isPopUpShow()
            }
        },
        async created() {
            if (this.edifManageMent) {
                let EditData = JSON.parse(sessionStorage.getItem("manualManageMentEdit"));
                this.companyJson.value = EditData.orgName;
                this.createUserData.childWareName = EditData.childWareName;
                this.createUserData.childWareId = EditData.childWareId;
                this.createUserData.orgId = EditData.orgId;
                this.createUserData.id = EditData.id;
                this.createUserData.expectedSendTime = EditData.expectedSendTime;
                this._getFindWareHouseDetailByIds(EditData);
            }
            this.tables = eval(sessionStorage.getItem("_addTablesData"));
            if (this.tables) {
                this.tabledata = this.tables;
                this.createUserData.detailList = this.tables;
            }

        },
        destroyed() {
            sessionStorage.removeItem("manualManageMentEdit");
            sessionStorage.removeItem("_addTablesData");
        },
        watch: {
            addChanpins(n) {
                if (!n) {
                    this.tables = eval(sessionStorage.getItem("_addTablesData"));
                    if (this.tables) {
                        this.tabledata = this.tables;
                        this.createUserData.detailList = this.tables;
                    }
                }
            },
        },
        methods: {
            isPopUpShow() {
                return popUpShow(1)
            },
            //获取产品明细
            _getFindWareHouseDetailByIds(Json) {
                getFindWareHouseDetailByIds({ids: Json.id}, (data) => {
                    data = JSON.parse(data);
                    this._changeChangPinMinXi(data.result);
                });
            },
            _changeChangPinMinXi(data) {
                this.tabledata = data;
            },
            //期望入库时间
            getExpectedSendTime(e) {
                this.createUserData.expectedSendTime = e;
            },
            getkuweimes(data, e) {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");
                this.targetRow = data;
                this.$nextTick(() => {
                    getfindOrgProductPage(this.sendoutDatas).then((res) => {
                        this._changeKuweiS(res.result.list, data, e);
                        this.$forceUpdate();
                    });
                });
                this.$forceUpdate();
            },
            kuweiChanges(e) {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");
                if (this.Index != this.delistIndex) {
                    this.createUserData.detailList.push({});
                }
                this.tabledata.maxNum = this.tabledata[this.delistIndex].kueirArr[
                    e
                    ].maxNum;
                this.tabledata.currInventory = this.tabledata[this.delistIndex].kueirArr[
                    e
                    ].currInventory;

                this.createUserData.detailList[this.delistIndex][
                    "recommendSeatId"
                    ] = this.tabledata[this.delistIndex].kueirArr[e].recommendSeatId;
                this.createUserData.detailList[this.delistIndex][
                    "recommendSeatNo"
                    ] = this.tabledata[this.delistIndex].kueirArr[e].recommendSeatNo;
                this.createUserData.detailList[
                    this.delistIndex
                    ].recommendAreaId = this.tabledata[this.delistIndex].kueirArr[e][
                    "recommendAreaId"
                    ];
                this.createUserData.detailList[this.delistIndex][
                    "recommendAreaName"
                    ] = this.tabledata[this.delistIndex].kueirArr[e].recommendAreaName;
                this.Index = this.delistIndex;
                this.$forceUpdate();
            },
            _changeKuweiS(arr, dataJson, e) {
                dataJson.kueirArr = [];
                this.delistIndex = e;

                if (arr[e]) {
                    this.tabledata[e].kueirArr = arr[e].prodSeatList;
                    var data = JSON.stringify(this.tabledata);
                    this.tabledata = [];
                    this.tabledata = JSON.parse(data);
                    this.$forceUpdate();
                }
            },
            //点击选择委托公司
            async getCompanyJsonAndArr() {
                let datas = await getFindWareOrg();
                this.companyJson.companyArr = datas.result;
            },
            getDateTimeExpectedSendTime(e) {
                this.tabledata[+this.rowTables].expectedSendTime = e;
                this.tabledata[+this.rowTables].manuTime = e;
            },
            getDateTimeIndex(e) {
                this.rowTables = e;
            },
            //改变委托公司
            changeCompany(e) {
                this.createUserData.orgId = this.companyJson.companyArr[e].id;
                this.createUserData.orgName = this.companyJson.companyArr[e].orgName;
            },
            //点击了子仓名称
            async getZiCangJsonAndArr() {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");
                let datas = await getFindOrgChildWare(this.createUserData.orgId);
                this.ziCangJson.ziCangArr = datas.result;
            },
            goClearRemove() {
                this.multipleSelection.forEach((item) => {
                    let idxs = this.tabledata.indexOf(item);
                    this.tabledata.splice(idxs, 1);
                    sessionStorage.setItem(
                        "_addTablesData",
                        JSON.stringify(this.tabledata)
                    );
                });
            },
            //改变了子仓名称
            changeziCang(e) {
                this.createUserData.childWareId = this.ziCangJson.ziCangArr[e].id;
                sessionStorage.setItem(
                    "createManagementChildWareId",
                    this.ziCangJson.ziCangArr[e].id
                );
                this.createUserData.wareId = this.ziCangJson.ziCangArr[e].wareId;
                this.createUserData.childWareName = this.ziCangJson.ziCangArr[
                    e
                    ].childWareName;
            },
            //点击了添加产品
            addChanpin() {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");
                if (!sessionStorage.getItem("createManagementChildWareId"))
                    return this.$messageSelf.message("请选择子仓名称");
                this.addChanpins = true;
                popUpCount(1)
                this.$emit("addchangping", false)
                sessionStorage.setItem("orgId", this.createUserData.orgId);
            },
            //关闭
            closeBtn() {
                this.$parent._data.iscreateManagement = false;
                this.$parent.getTableData();
            },
            handleSelectionChange(e) {
                this.multipleSelection = e;
            },
            async _goAJAXCreate() {
                let datas = await getSaveRecord(this.createUserData);
                console.log(datas);
            },
            //点击了提交
            async goAJAXCreate() {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");
                if (!this.createUserData.childWareId)
                    return this.$messageSelf.message("请选择子仓名称");
                if (!this.multipleSelection.length)
                    return this.$messageSelf.message(
                        `请选择要${this.edifManageMent ? "编辑" : "创建"}的产品明细`
                    );
                this.createUserData.detailList = this.multipleSelection;
                let datas = await getSaveRecord(this.createUserData);
                if (datas.code == "10000") {
                    this.$messageSelf.message({
                        message: datas.msg,
                        onClose: () => {
                            sessionStorage.removeItem("_addTablesData");
                            sessionStorage.removeItem("createManagementChildWareId");
                            this.$emit("closeCreate", true);
                            this.closeBtn();
                        },
                    });
                }
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
            max-width: 980px;
            overflow: auto;
            z-index: 44;
            background: #f8f8f8;
            transform: translate(-50%, -50%);
        }

        .setUserIngBoxCenter {
            position: relative;
            left: 50%;
            top: 144px;
            transform: translateX(-50%);
            background: #fff;
            max-width: 1000px;
            overflow: auto;

            .centerBox {
                padding: 20px 20px;
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
                }
            }

            .cityBoxCenter {
                display: flex;
                align-items: center;
            }
        }

        .textAreaBox {
            font-size: 14px;
            width: 93%;
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