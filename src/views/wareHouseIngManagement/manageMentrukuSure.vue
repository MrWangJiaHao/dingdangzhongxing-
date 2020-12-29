<template>
    <div class="setUserIngBox" id="manageMenyrukuSures">
        <kuanjiaClick :titles='!isrukuDetails ? "入库确认" : "入库详情"' @closeBtn="closeBtn"
                      :is-looker="isrukuDetails" width="1120px" @clickSubmit="goAJAXCreate">
            <template slot="centerKuanjia">
                <div class="centerBox">
                    <div class="setTitle mb20">
                        {{ !isrukuDetails ? "入库确认" : "入库详情" }}
                    </div>
                    <div class="gerxinxiBox">
                        <div class="xinxiBitian">
                            <div class="dispalywrap rukuquerenparent">
                                <div
                                        v-for="(key, item, idx) in rukuSureJsonFn"
                                        :key="idx"
                                        class="displayalign parentBox"
                                >
                                    <div class="titleBox" v-html="shezhizitiwiered(item)"></div>
                                    <div class="centersBox">
                                        <div v-if="item == '*入库人'">
                                            <input
                                                    v-model="createUserData.putUser"
                                                    class="input"
                                                    placeholder="请输入入库人"
                                            />
                                        </div>
                                        <div v-else-if="item == '*入库时间'">
                                            <dateTime
                                                    style="height: 28px;"
                                                    :dateTimeData="dateTimeData"
                                                    :valueDataStart="createUserData.expectedSendTime"
                                                    @getDateTime="getDateTimeExpectedSendTime"
                                            />
                                        </div>
                                        <div v-else-if="item == '*批次号'">
                                            <input
                                                    v-model="createUserData.batchNo"
                                                    class="input"
                                                    placeholder="请输入批次号"
                                            />
                                        </div>
                                        <div v-else>
                                            {{ key() }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 个人信息 -->
                <div class="centerBox ">
                    <div class="clearfix">
                        <div class="setTitle fl">产品明细</div>
                        <div v-if="!isrukuDetails" class="fr mb20">
                            <div class="tijiaoBox disinb mr20" @click="copyChanpin">
                                复制产品
                            </div>
                            <div class="tijiaoBox disinb mr20" @click="addChanpin">
                                添加产品
                            </div>
                            <div class="remove disinb" @click="goClearRemove">删除</div>
                        </div>
                    </div>
                    <div class="mb20" id="bjTableWraper">
                        <el-table
                                ref="multipleTable"
                                :data="tabledata"
                                :stripe="true"
                                :border="true"
                                tooltip-effect="dark"
                                @selection-change="handleSelectionChange"
                        >
                            <el-table-column
                                    type="selection"
                                    align="center"
                                    width="82"
                                     fixed="left"
                            ></el-table-column>
                            <el-table-column
                                    label="序号"
                                    type="index"
                                    align="center"
                                    width="71"
                                    show-overflow-tooltip
                            />
                            <el-table-column
                                    label="产品编码"
                                    width="160"
                                    prop="prodCode"
                                    show-overflow-tooltip
                            />
                            <el-table-column
                                    label="产品名称"
                                    width="150"
                                    property="prodName"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="产品规格"
                                    prop="specName"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="品牌"
                                    prop="braName"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="申请入库数量"
                                    prop="prodNum"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="存储区库位产品数量"
                                    prop="braName"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="残次品库位产品数量"
                                    prop="damagedNum"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="存储区库位最大存放数"
                                    prop="damagedNum"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="残次品库位最大存放数"
                                    prop="maxNum"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="推荐入库库位"
                                    prop="recommendedLocation"
                                    width="180"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="实际入库库位"
                                    prop="recommendSeatNo"
                                    show-overflow-tooltip
                                    width="180"
                            >
                                <div v-if="!isrukuDetails" slot-scope="scoped">
                                    <el-select
                                            v-model="scoped.row.recommendSeatNo"
                                            @focus="getkuweimes(scoped.row, scoped.$index)"
                                            @change="kuweiChanges"
                                            placeholder="请选择实际入库库位"
                                    >
                                        <el-option
                                                v-for="(item, idx) in scoped.row.kueirArr"
                                                :key="idx"
                                                :label="item.recommendSeatNo"
                                                :value="idx"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-table-column>
                            <el-table-column
                                    label="实际入库数量*"
                                    prop="actualNum"
                                    show-overflow-tooltip
                            >
                                <div v-if="!isrukuDetails" slot-scope="scope">
                                    <el-input
                                            v-model="scope.row.actualNum"
                                            placeholder="实际入库数量"
                                    ></el-input>
                                </div>
                            </el-table-column>
                            <el-table-column
                                    label="残次品数量"
                                    prop="damagedNum"
                                    show-overflow-tooltip
                            >
                                <div v-if="!isrukuDetails" slot-scope="scoped">
                                    <el-input
                                            v-model="scoped.row.damagedNum"
                                            placeholder="请输入残次品数量"
                                    ></el-input>
                                </div>
                            </el-table-column>
                            <el-table-column
                                    label="残次品库位"
                                    prop="damagedSeatNo"
                                    width="180"
                                    show-overflow-tooltip
                            >
                                <div v-if="!isrukuDetails" slot-scope="scoped">
                                    <el-select
                                            v-model="scoped.row.damagedSeatNo"
                                            placeholder="请选择残次品库位"
                                    >
                                        <el-option
                                                v-for="item in prodUnitData"
                                                :key="item"
                                                :label="item"
                                                :value="item"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-table-column>
                            <el-table-column
                                    label="生产日期"
                                    prop="manuTime"
                                    show-overflow-tooltip
                                    width="200"
                            >
                                <div
                                        v-if="!isrukuDetails"
                                        slot-scope="scoped"
                                        @click="getDataSelentIndex(scoped.$index)"
                                >
                                    <dateTime
                                            :dateTimeData="dateTimeData"
                                            v-model="scoped.row.actualNum"
                                            @getDateTime="getDateSelectTime"
                                    />
                                </div>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="dispalyFlex ptb3020 mb16">
                    <div class="noneIconTitle mr11  fosi0">
                        <span class="fosi14" style="visibility: hidden">你好</span>
                        <span class="fosi14">备注</span>
                        <span class="fosi14" style="visibility: hidden">好</span>
                        <span class="fosi14">:</span>
                    </div>
                    <div class="bzTetxArea mb16">
            <textarea
                    placeholder="请输入备注"
                    v-model="createUserData.remark"
                    maxlength="200"
            ></textarea>
                    </div>
                </div>
                <!-- 备注 -->
            </template>
        </kuanjiaClick>

        <!-- 添加产品 start -->
        <div v-show="addChanpins" class="bjBox">
            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div v-if="addChanpins">
                    <div>
                        <choiceSelect ref="childSelect" @tables="tablesArr"/>
                    </div>
                </div>
            </transition>
        </div>

        <!-- 添加产品 end -->
    </div>
</template>
<style>
    .centersBox {
        margin-left: 10px;
    }
</style>
<script>
    /*eslint-disable */
    import searchBox from "../../components/commin/searchBox"; //搜索框
    import dropDowbox from "../../components/commin/dropDownBox"; //下拉框
    import dropDownUserType from "../../components/commin/dropDownUserType"; //用户管理下拉框
    import dateTime from "../../components/commin/dateTime"; //用户管理下拉框

    import {
        getFindWareOrg,
        getFindOrgChildWare,
        getfindOrgProductPage,
        getSaveRecord,
    } from "../../api/api";
    import choiceSelect from "../../components/manual/choiceSelect";
    import {_removeData} from "../../utils/validate";
    import kuanjiaClick from "../../components/commin/kuanjiaClick";

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
                self: this,
                datetimeDate: {
                    placeholder: "请选择预期入库时间",
                    title: "",
                },
                dateTimeData: {
                    placeholder: "请选择入库时间",
                },
                rukuSure: {
                    入库单号: () => this.listJson.putWareNo,
                    委托公司: () => this.listJson.orgName,
                    入库状态: () => (this.listJson.putstatus ? "已入库" : "未入库"),
                    入库类型: () => this.WarehousingTypeArr,
                    "*入库人": "",
                    "*入库时间": "",
                    "*批次号": "",
                    关联单号: () => this.listJson.orderNo,
                },
                rukuDetailJson: {
                    入库单号: () => this.listJson.putWareNo,
                    委托公司: () => this.listJson.orgName,
                    入库状态: () => (this.listJson.putstatus ? "已入库" : "未入库"),
                    期望到货时间: () =>
                        this.listJson.expectedSendTime
                            ? this.listJson.expectedSendTime
                            : "--",
                    实际到货时间: () =>
                        this.listJson.arrivalTime ? this.listJson.arrivalTime : "--",
                    入库批次号: () =>
                        this.listJson.batchNo ? this.listJson.batchNo : "--",
                    入库人: () => (this.listJson.putUser ? this.listJson.putUser : "--"),
                    入库时间: () =>
                        this.listJson.putStartTime ? this.$route.query.putStartTime : "--",
                },
                multipleSelection: [],
                tabledata: [],
                addChanpins: false,
                ziCangJson: {
                    value: "",
                    ziCangArr: [],
                },
                kueirArr: [],
                createUserData: {
                    expectedSendTime: "",
                    orderSource: (() => this.orderSources)(), //订单类型(0-手工创建；1-渠道创建 2-预入库 3-采购 4-库建调拨 5-加工作业 6-分解作业 7-退货 8-盘盈 9-其他）
                    orgName: "",
                    orgId: "",
                    remark: "",
                    waerId: "",
                    detailList: [],
                    batchNo: "",
                    putWareId: "",
                    recommendSeatId: "",
                    id: "",
                    operatorType: 3,
                    childWareId: "",
                    wareId: this.$cookie.get("X-Auth-wareId"),
                },
                getProvinceData: {
                    parentCode: 0,
                },
                prodUnitData: [],
                tables: [],
                listJson: JSON.parse(sessionStorage.getItem("listArrs")),
                rowTable: 0,
                isrukuDetails: false,
                Index: null,
            };
        },
        props: {
            WarehousingTypeArr: {
                type: String,
                default: "",
            },
            orderSources: {
                type: String,
                default: "0",
            },
            detailManageMent: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            rukuSureJsonFn() {
                if (this.isrukuDetails) {
                    return this.rukuDetailJson;
                } else {
                    return this.rukuSure;
                }
            },
        },
        async created() {
            let manageMentrukuSureData = JSON.parse(
                sessionStorage.getItem("manageMentrukuSureData")
            );
            if (manageMentrukuSureData) {
                this.createUserData.putWareId = manageMentrukuSureData.id;
                this.createUserData.childWareId = manageMentrukuSureData.childWareId;
                this.createUserData.orgId = manageMentrukuSureData.orgId;
                this.createUserData.id = manageMentrukuSureData.id;
                this.createUserData.batchNo = manageMentrukuSureData.batchNo;
                this.createUserData.expectedSendTime =
                    manageMentrukuSureData.expectedSendTime;
                this.createUserData.putUser = manageMentrukuSureData.putUser;
            }
            if (manageMentrukuSureData.rukuDetails) {
                this.isrukuDetails = manageMentrukuSureData.rukuDetails;
            }
            this._changeRecommedLocation(this.listJson.detailList);
            this.tabledata = this.listJson.detailList;
            this.tables = eval(sessionStorage.getItem("_addTablesData"));
            if (this.tables) {
                this.tabledata = this.tables;
                getfindOrgProductPage(this.createUserData).then((data) => {
                    this._changeKuweiS(data.result.list, data);
                    this.$forceUpdate();
                });
            }
        },
        methods: {
            tablesArr(arr) {
                arr.forEach((item, idx) => {
                    console.log(this.tabledata.includes(item));
                    if (!this.tabledata.includes(item)) {
                        this.tabledata.push(item);
                    }
                });
            },
            _changeRecommedLocation(data) {
                data.forEach((item) => {
                    let recommendedLocation = item.recommendSeatNo;
                    item.recommendedLocation = recommendedLocation;
                });
            },

            getDataSelentIndex(e) {
                this.rowTable = e;
            },
            //删除产品
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
            //copy产品
            copyChanpin() {
                if (this.multipleSelection.length == 0) {
                    return this.$messageSelf.message("请选择要复制的产品");
                } else if (this.multipleSelection.length != 1) {
                    return this.$messageSelf.message("每次只能复制一个产品");
                } else {
                    this.tabledata = _removeData(this.tabledata, this.multipleSelection, true)
                }
            },

            getDateSelectTime(e) {
                this.tabledata[+this.rowTable].manuTime = e;
            },
            shezhizitiwiered(item) {
                let idxs = item.indexOf("*");
                if (idxs != -1) {
                    item =
                        `<span style="color:red;">${item[idxs]}</span>` +
                        item.substring(idxs + 1);
                }
                return item;
            },
            /*获取库位 start */
            getkuweimes(data, idx) {
                this.targetRow = data;
                this.$nextTick(() => {
                    getfindOrgProductPage(this.createUserData).then((res) => {
                        this._changeKuweiS(res.result.list, data, idx);
                    });
                });
                this.$forceUpdate();
            },
            _changeKuweiS(arr, dataJson, e = 0) {
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
            /*获取库位 end  */

            //库位点击
            kuweiChanges(e) {
                if (this.Index != this.delistIndex) {
                    this.createUserData.detailList.push({});
                }
                this.targetRow.maxNum = this.tabledata[this.delistIndex].kueirArr[
                    e
                    ].maxNum;
                this.targetRow.currInventory = this.tabledata[this.delistIndex].kueirArr[
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
            },

            //点击选择委托公司
            async getCompanyJsonAndArr() {
                let datas = await getFindWareOrg();
                this.companyJson.companyArr = datas.result;
            },
            getDateTimeExpectedSendTime(e) {
                this.createUserData.expectedSendTime = e;
            },
            //点击了子仓名称
            async getZiCangJsonAndArr() {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");
                let datas = await getFindOrgChildWare(this.createUserData.orgId);
                this.ziCangJson.ziCangArr = datas.result;
            },
            //点击了添加产品
            addChanpin() {
                this.addChanpins = true;
                sessionStorage.setItem("orgId", this.createUserData.orgId);
            },
            //关闭
            closeBtn() {
                this.$parent._data.ismanageMentrukuSure = false;
                this.$parent.getTableData();
                sessionStorage.removeItem("manageMentrukuSureData");
            },
            handleSelectionChange(e) {
                this.multipleSelection = e;
            },
            //点击了提交
            goAJAXCreate() {
                this.createUserData.detailList = this.multipleSelection;
                if (!this.createUserData.putUser)
                    return this.$messageSelf.message("请输入入库人");
                if (!this.createUserData.expectedSendTime)
                    return this.$messageSelf.message("请输入入库时间");
                if (!this.createUserData.batchNo)
                    return this.$messageSelf.message("请输入批次号");
                this._getSaveRecord(this.createUserData).then((res) => {
                    if (res.code == "10000") {
                        this.$parent.getTableData();
                        sessionStorage.removeItem("manageMentrukuSureData");
                        this.$messageSelf.message(res.msg);
                        this.closeBtn();
                    } else {
                        this.$messageSelf.message(res.msg);
                    }
                });
            },
            async _getSaveRecord(data) {
                let datas = await getSaveRecord(data);
                return datas;
            },
            //getSaveRecord
            getUserType(e) {
                //获取创建的用户类型
                this.createUserData.codeValue = e.codeValue;
                this.createUserData.roleId = e.roleId;
            },
        },
    };
</script>
<style>
    #manageMenyrukuSures
    .ivu-input-wrapper.ivu-input-wrapper-default.ivu-input-type.ivu-date-picker-editor {
        width: 190px;
        height: 28px !important;
    }

    #manageMenyrukuSures .ivu-input.ivu-input-default.ivu-input-with-suffix {
        border: 1px solid #d2d6e2;
        height: 28px !important;
        color: #333333;
        font-size: 14px;
        font-weight: normal;
        background: rgba(236, 241, 247, 0);
        border-radius: 2px;
    }

    #manageMenyrukuSures .el-input__inner {
        height: 28px !important;
    }

    #manageMenyrukuSures .ivu-input-suffix {
        justify-content: center;
    }

    #manageMenyrukuSures .ivu-input {
        height: 28px !important;
    }

    #manageMenyrukuSures .ivu-icon-ios-close-circle {
        width: 15px !important;
        height: 15px !important;
    }

    #manageMenyrukuSures .ivu-icon.ivu-icon-ios-calendar-outline {
        width: 15px !important;
        height: 15px !important;
    }

    #manageMenyrukuSures .ivu-input-inner-container {
        width: auto;
    }
</style>
<style lang='scss' scoped>
    @import "../../assets/scss/btn.scss";

    .fade-enter-active,
    .fade-leave-active {
        transition: transform 1s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        transform: scale(0);
    }

    .input {
        border: 1px solid #d2d6e2;
        height: 28px;
        text-indent: 10px;
        color: #333333;
        font-size: 14px;
        font-weight: normal;
        background: rgba(236, 241, 247, 0);
        border-radius: 2px;
    }

    .rukuquerenparent {
        width: 100%;
        border-left: 1px solid #d1d6e2;
        border-top: 1px solid #d1d6e2;

        .parentBox {
            width: 33.3%;
            color: #333333;
            border: 1px solid #d1d6e2;
            border-left: none;
            border-top: none;

            .titleBox {
                padding: 12px 20px 12px 0;
                width: 106px;
                border-right: 1px solid #d1d6e2;
                background-color: #ecf1f7;
                text-align: right;
            }
        }
    }

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
            z-index: 44;
            overflow: auto;

            background: #f8f8f8;
            transform: translate(-50%, -50%);
        }

        .setUserIngBoxCenter {
            position: relative;
            left: 50%;
            top: 144px;
            transform: translateX(-50%);
            background: #fff;
            max-width: 1080px;
            overflow: auto;
            max-height: 750px;
            overflow: auto;

            .centerBox {
                padding: 30px 20px 0 20px;
            }

            .gerxinxiBox {
                display: flex;
                flex-direction: column;

                > div {
                    margin-bottom: 18px;
                }

                .xinxiBitian {
                    display: flex;
                    flex-wrap: wrap;
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