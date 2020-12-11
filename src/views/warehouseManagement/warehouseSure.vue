<template>
    <div class="setUserIngBox" id="chukuSure">
        <div class="setUserIngBoxCenter">
            <div class="headerBox">
                <div class="closeTitle">
                    {{ !isDetails ? "出库确认" : "出库单详情" }}
                </div>
                <div class="closeIcon" @click="closeBtn"></div>
            </div>

            <div class="centerBox ">
                <div class="setTitle">{{ !isDetails ? "出库确认" : "出库单详情" }}</div>
                <div class="gerxinxiBox">
                    <div class="xinxiBitian">
                        <div class="dispalywrap rukuquerenparent">
                            <div
                                    v-for="(key, item, idx) in isDetailsFn()"
                                    :key="idx"
                                    class="displayalign parentBox"
                            >
                                <div
                                        class="titleBox ellipsis"
                                        v-html="shezhizitiwiered(item)"
                                ></div>
                                <div class="centersBox">
                                    <div v-if="item == '*取货人'">
                                        <input
                                                v-model="createUserData.takeUser"
                                                class="input"
                                                placeholder="请输入取货人"
                                        />
                                    </div>
                                    <div v-else-if="item == '*取货人联系电话'">
                                        <el-input
                                                type="number"
                                                @input="takePhoneChange"
                                                @blur="blurTakePhone"
                                                v-model="createUserData.takePhone"
                                                placeholder="请输入取货人联系电话"
                                        >
                                        </el-input>
                                    </div>
                                    <div v-else-if="item == '*出库人'">
                                        <input
                                                v-model="createUserData.outWareUser"
                                                class="input"
                                                placeholder="请输入出库人"
                                        />
                                    </div>
                                    <div v-else-if="item == '*出库时间'">
                                        <div v-if="!isDetails">
                                            <dateTime
                                                    :valueDataStart="createUserData.outWareTime"
                                                    :dateTimeData="dateTimeData"
                                                    @getDateTime="getDateTimeExpectedSendTime"
                                            />
                                        </div>
                                        <div v-else>
                                            {{ createUserData.outWareTime }}
                                        </div>
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
            <div id="bjTableWraper " class="centerBox mb20 ">
                <div class="clearfix">
                    <div class="setTitle fl">产品明细</div>
                    <div class="mb20 fr">
                        <div
                                class="tijiaoBox disinb mr20"
                                v-if="!isDetails"
                                @click="copyChanpin"
                        >
                            复制产品
                        </div>
                        <div
                                class="remove disinb"
                                v-if="!isDetails"
                                @click="goClearRemove"
                        >
                            删除
                        </div>
                    </div>
                </div>
                <div class="mb20">
                    <el-table
                            ref="multipleTable"
                            :data="tabledata"
                            :stripe="true"
                            :border="true"
                            tooltip-effect="dark"
                            style="width: 100%; overflow: auto"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                                v-if="!isDetails"
                                type="selection"
                                align="center"
                                width="82"
                        ></el-table-column>
                        <el-table-column
                                label="序号"
                                type="index"
                                align="center"
                                width="71"
                                :index="indexMethod"
                                show-overflow-tooltip
                        />
                        <el-table-column
                                label="产品编码"
                                prop="prodCode"
                                show-overflow-tooltip
                        />
                        <el-table-column
                                label="产品名称"
                                property="prodName"
                                width="140"
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
                                label="低库存预警值"
                                prop="prodNum"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="销售仓可用库存"
                                prop="braName"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="推荐库位产品数量"
                                prop="damagedNum"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="申请出库数量"
                                prop="prodNum"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="实际出库数量*"
                                prop="actualProdNum"
                                width="200"
                                show-overflow-tooltip
                        >
                            <el-input
                                    v-if="!isDetails"
                                    slot-scope="scoped"
                                    v-model="scoped.row.actualProdNum"
                            ></el-input>
                        </el-table-column>
                        <el-table-column
                                label="推荐库位"
                                prop="actualSeatNo"
                                width="180"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="批次号"
                                prop="batchNo"
                                show-overflow-tooltip
                                width="200"
                        >
                            <div slot-scope="scoped">
                                <el-input
                                        v-if="!isDetails"
                                        v-model="scoped.row.batchNo"
                                        placeholder="请输入批次号"
                                >
                                </el-input>
                            </div>
                        </el-table-column>
                        <el-table-column
                                label="生产日期*"
                                prop="manufTime"
                                width="200"
                                show-overflow-tooltip
                        >
                            <div
                                    v-if="!isDetails"
                                    slot-scope="scope"
                                    @click="manufTimeClick(scope.row)"
                            >
                                <dateTime
                                        :valueDataStart="scope.row.manufTime"
                                        :dateTimeData="dateTimeData"
                                        @getDateTime="getManufTimeClickSendTime"
                                />
                            </div>
                        </el-table-column>
                        <el-table-column
                                label="实际出库库位"
                                prop="actualSeatNo"
                                show-overflow-tooltip
                                width="200"
                        >
                            <div v-if="!isDetails" slot-scope="scoped">
                                <el-input
                                        v-model="scoped.row.actualSeatNo"
                                        placeholder="请输入实际出库库位"
                                ></el-input>
                            </div>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- 账号信息 -->
            <div class="disRight mb20 mr20">
                <div class="quxiaoBox mb20 mr20" @click="closeBtn">
                    {{ !isDetails ? "取消" : "返回" }}
                </div>
                <div v-if="!isDetails" class="tijiaoBox mb20" @click="goAJAXCreate">
                    提交
                </div>
            </div>
            <!-- btn -->
            <!-- 添加产品 start -->
            <transition name="fade">
                <div v-show="addChanpins" ref="parentSelect" class="addChanpinClass">
                    <choiceSelect ref="childSelect"/>
                </div>
            </transition>
            <!-- 添加产品 end -->
        </div>
    </div>
</template>
<style>
    .centerBox {
        border-bottom: 1px solid #d1d6e2;
    }

    .centersBox {
        margin-left: 10px;
    }
</style>
<script>
    /*eslint-disable */
    import dateTime from "../../components/commin/dateTime"; //用户管理下拉框
    import {_removeData, isMobile} from "../../utils/validate";
    import {
        getFindWareOrg,
        getFindOrgChildWare,
        getfindOrgProductPage,
        getFindWarehouseProduct,
        getpOutWarehouseconfirmRecord,
        getpOutWarehousefindOutWareDetailById,
    } from "../../api/api";
    import choiceSelect from "../../components/manual/choiceSelect";

    export default {
        name: "createUsering",
        components: {
            choiceSelect,
            dateTime,
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
                    placeholder: "请选择出库时间",
                },
                rukuSure: {
                    出库单号: () =>
                        this.createUserData.outWareNo ? this.createUserData.outWareNo : "- -",
                    委托公司: () =>
                        this.createUserData.orgName ? this.createUserData.orgName : "- -",
                    出库状态: () =>
                        this.createUserData.outWareStatus ? "已出库" : "未出库",
                    出库类型: () =>
                        this.createUserData.outWareType
                            ? this.createUserData.outWareType
                            : "- -",
                    "&nbsp;收货人": () =>
                        this.createUserData.takeUser ? this.createUserData.takeUser : "- -",
                    收货人联系电话: () =>
                        this.$route.query.takePhone ? this.createUserData.takePhone : "- -",
                    "*取货人": () =>
                        this.createUserData.takeUser ? this.createUserData.takeUser : "- -",
                    "*取货人联系电话": () =>
                        this.createUserData.takePhone ? this.createUserData.takePhone : "- -",
                    "*出库人": () =>
                        this.createUserData.outWareUser
                            ? this.createUserData.outWareUser
                            : "- -",
                    "*出库时间": () =>
                        this.createUserData.outWareTime
                            ? this.createUserData.outWareTime
                            : "- -",
                },
                feizhitiJson: {
                    出库单号: () =>
                        this.createUserData.outWareNo ? this.createUserData.outWareNo : "- -",
                    委托公司: () =>
                        this.createUserData.orgName ? this.createUserData.orgName : "- -",
                    出库状态: () =>
                        this.createUserData.outWareStatus ? "已出库" : "未出库",
                    出库类型: () =>
                        his.createUserData.outWareType
                            ? this.createUserData.outWareType
                            : "- -",
                    "&nbsp;收货人": () =>
                        this.createUserData.takeUser ? this.createUserData.takeUser : "- -",
                    收货人联系电话: () =>
                        this.createUserData.takePhone ? this.createUserData.takePhone : "- -",
                    "*出库人": () =>
                        this.createUserData.outWareUser
                            ? this.createUserData.outWareUser
                            : "- -",
                    "*出库时间": () =>
                        this.createUserData.outWareTime
                            ? this.createUserData.outWareTime
                            : "- -",
                },
                detailChuKu: {
                    出库单号: () =>
                        this.createUserData.outWareNo ? this.createUserData.outWareNo : "- -",
                    委托公司: () =>
                        this.createUserData.orgName ? this.createUserData.orgName : "- -",
                    订单状态: () => this.createUserData.outWareStatus,
                    创建时间: () =>
                        this.$route.query.takeUser ? this.createUserData.takeUser : "- -",
                    创建人: () =>
                        this.createUserData.takeUser ? this.createUserData.takeUser : "- -",
                    出库人: () =>
                        this.createUserData.outWareUser
                            ? this.createUserData.outWareUser
                            : "- -",
                    出库时间: () =>
                        this.createUserData.outWareTime
                            ? this.createUserData.outWareTime
                            : "- -",
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
                    userType: 4,
                    expectedSendTime: "", //expectedSendTime
                    orderSource: "", //订单类型(0-手工创建；1-渠道创建 2-预入库 3-采购 4-库建调拨 5-加工作业 6-分解作业 7-退货 8-盘盈 9-其他）
                    orgName: "",
                    orgId: "",
                    remark: "",
                    takeUser: "",
                    takePhone: "",
                    outWareUser: "",
                    waerId: "",
                    detailList: [],
                    batchNo: "",
                    putWareId: "",
                    takeUser: "",
                    recommendSeatId: "",
                    id: (() => this.$route.query.id)(),
                    operatorType: 3,
                    childWareId: "",
                    wareId: this.$cookie.get("X-Auth-wareId"),
                },
                getProvinceData: {
                    parentCode: 0,
                },
                prodUnitData: [],
                tables: [],
                chanpinCenter: {},
                rowTable: 0,
                manufTimeClickData: {},
                detailsArr: [],
                sureTakePhone: false,
                isDetails: false,
            };
        },
        props: {
            isWarehouseSureDetails: {
                type: Boolean,
                default: false,
            },
            isWarehouseSure: {
                type: Boolean,
                default: false,
            },
        },
        beforeDestroy() {
            sessionStorage.removeItem("sarehouseChuKuSure");
            sessionStorage.removeItem("warehouseDetails");
        },
        async created() {
            let warehouseDetails = JSON.parse(
                sessionStorage.getItem("warehouseDetails")
            ); //详情页
            if (warehouseDetails) {
                this.createUserData.putWareId = warehouseDetails.id;
                this.createUserData.recommendSeatId = warehouseDetails.recommendSeatId;
                this.createUserData.childWareId = warehouseDetails.childWareId;
                this.createUserData.orgId = warehouseDetails.orgId;
                this.createUserData.orgName = warehouseDetails.orgName;
                this.createUserData.childWareId = warehouseDetails.childWareId;
                this.createUserData.childWareName = warehouseDetails.childWareName;
                this.createUserData.outWareNo = warehouseDetails.outWareNo;
                this.createUserData.outWareNo = warehouseDetails.outWareNo;
                this.createUserData.outWareStatus = warehouseDetails.outWareStatus;
                this.createUserData.outWareType = warehouseDetails.outWareType;
                this.createUserData.createTime = warehouseDetails.createTime;
                this.createUserData.createUser = warehouseDetails.createUser;
                this.createUserData.takePhone = warehouseDetails.takePhone;
                this.createUserData.takeTime = warehouseDetails.takeTime;
                this.createUserData.takeUser = warehouseDetails.takeUser;
                this.createUserData.outWareTime = warehouseDetails.outWareTime;
                this.createUserData.outWareUser = warehouseDetails.outWareUser;
                this.tabledata = warehouseDetails.tails.pOutWarehouseDetail;
                this._getFindWarehouseProduct(warehouseDetails.id);
                getpOutWarehousefindOutWareDetailById(warehouseDetails.id).then((res) => {
                    this.tabledata = res.result.tails.pOutWarehouseDetail;
                });
            }
            if (this.isWarehouseSureDetails) {
                this.isDetails = this.isWarehouseSureDetails;
            }
            let manageMentrukuSureData = JSON.parse(
                sessionStorage.getItem("sarehouseChuKuSure")
            );
            if (manageMentrukuSureData) {
                this.createUserData.putWareId = manageMentrukuSureData.id;
                this.createUserData.recommendSeatId =
                    manageMentrukuSureData.recommendSeatId;
                this.createUserData.childWareId = manageMentrukuSureData.childWareId;
                this.createUserData.orgId = manageMentrukuSureData.orgId;
                this.createUserData.orgName = manageMentrukuSureData.orgName;
                this.createUserData.outWareTime = manageMentrukuSureData.outWareTime;
                this.createUserData.childWareId = manageMentrukuSureData.childWareId;
                this.createUserData.childWareName = manageMentrukuSureData.childWareName;
                this.createUserData.outWareNo = manageMentrukuSureData.outWareNo;
                this.createUserData.outWareNo = manageMentrukuSureData.outWareNo;
                this.createUserData.outWareStatus = manageMentrukuSureData.outWareStatus;
                this.createUserData.outWareType = manageMentrukuSureData.outWareType;
                this.createUserData.createTime = manageMentrukuSureData.createTime;
                this.createUserData.createUser = manageMentrukuSureData.createUser;
                this.createUserData.takePhone = manageMentrukuSureData.takePhone;
                this.createUserData.takeTime = manageMentrukuSureData.takeTime;
                this.createUserData.takeUser = manageMentrukuSureData.takeUser;
                this.tabledata = manageMentrukuSureData.tails.pOutWarehouseDetail;
            }

            this.tables = eval(sessionStorage.getItem("_addTablesData"));
            if (this.tables) {
                this.tables.forEach((item) => {
                    item.prodId = item.id;
                });
                this.tabledata = this.tabledata.concat(this.tables);
            }
        },
        methods: {
            isDetailsFn() {
                if (this.isDetails) {
                    return this.detailChuKu;
                } else {
                    return this.rukuSure;
                }
            },
            manufTimeClick(data) {
                this.manufTimeClickData = data;
            },
            getManufTimeClickSendTime(e) {
                this.manufTimeClickData.manufTime = e;
            },
            takePhoneChange() {
                this.createUserData.takePhone = this.createUserData.takePhone.substring(
                    0,
                    11
                );
            },
            blurTakePhone(e) {
                let Moble = isMobile(e.target.value);
                if (!Moble)
                    return this.$messageSelf.message({
                        message: "请输入正确的手机号",
                        duration: 1000,
                    });
                else {
                    this.sureTakePhone = true;
                }
            },
            indexMethod(e) {
                return e;
            },
            //删除产品
            goClearRemove() {
                this.multipleSelection.forEach((item) => {
                    let idxs = this.tabledata.indexOf(item);
                    this.tabledata.splice(idxs, 1);
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
            select(e, row) {
                console.log(e, row, "select");
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
            getkuweimes(data) {
                this.targetRow = data;
                this.$nextTick(() => {
                    getfindOrgProductPage(this.createUserData).then((res) => {
                        this._changeKuweiS(res.result.list, data);
                        this.$forceUpdate();
                    });
                });
                this.$forceUpdate();
            },
            _changeKuweiS(arr, dataJson) {
                this.$nextTick(() => {
                    arr.forEach((item, idx) => {
                        if (item.prodCode == dataJson.prodCode) {
                            console.log(item.prodSeatList);
                            this.kueirArr = item.prodSeatList;
                            this.delistIndex = idx;
                            this.$forceUpdate();
                        }
                    });
                    this.$forceUpdate();
                });
            },
            //库位点击
            kuweiChanges(e) {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.this.$messageSelf.message("请选择委托公司");
                this.targetRow.maxNum = this.kueirArr[e].maxNum;
                if (this.createUserData.detailList) {
                    this.targetRow.currInventory = this.kueirArr[e].currInventory;
                    this.createUserData.detailList[
                        this.delistIndex
                        ].recommendSeatId = this.kueirArr[e].recommendSeatId;
                    this.createUserData.detailList[
                        this.delistIndex
                        ].recommendSeatNo = this.kueirArr[e].recommendSeatNo;
                    this.createUserData.detailList[
                        this.delistIndex
                        ].recommendAreaId = this.kueirArr[e].recommendAreaId;
                    this.createUserData.detailList[
                        this.delistIndex
                        ].recommendAreaName = this.kueirArr[e].recommendAreaName;
                }
            },
            //点击选择委托公司
            async getCompanyJsonAndArr() {
                let datas = await getFindWareOrg();
                this.companyJson.companyArr = datas.result;
            },
            getDateTimeExpectedSendTime(e) {
                this.createUserData.outWareTime = e;
            },
            //改变委托公司
            changeCompany(e) {
                console.log(e, this.companyJson.companyArr[e]);
                this.createUserData.orgId = this.companyJson.companyArr[e].id;
                this.createUserData.orgName = this.companyJson.companyArr[e].orgName;
            },
            //点击了子仓名称
            async getZiCangJsonAndArr() {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.this.$messageSelf.message("请选择委托公司");
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
                sessionStorage.removeItem("sarehouseChuKuSure");
                sessionStorage.removeItem("warehouseDetails");
                this.$emit("closeDetails", false);
            },
            handleSelectionChange(e) {
                this.multipleSelection = e;
            },
            //点击了提交
            goAJAXCreate() {
                this.createUserData.pOutWarehouseDetails = this.multipleSelection;
                if (!this.createUserData.takeUser)
                    return this.$messageSelf.message("请输入取货人");
                if (!this.multipleSelection)
                    return this.$messageSelf.message("请选择要确认的产品明细");
                if (!this.createUserData.takePhone)
                    return this.$messageSelf.message("请输入取货人联系电话");
                if (!this.sureTakePhone)
                    return this.$messageSelf.message("请输入正确的手机号码");
                if (!this.createUserData.outWareUser)
                    return this.$messageSelf.message("请输入出货人");
                if (!this.createUserData.outWareTime)
                    return this.$messageSelf.message("请输入出库时间");
                this._getpOutWarehouseconfirmRecord(this.createUserData).then((res) => {
                    if (res.code == "10000") {
                        this.$messageSelf.message(res.msg);
                        this.closeBtn();
                    } else {
                        this.$messageSelf.message(res.msg);
                    }
                });
            },
            async _getpOutWarehouseconfirmRecord(data) {
                let datas = await getpOutWarehouseconfirmRecord(data);
                return datas;
            },
            getUserType(e) {
                //获取创建的用户类型
                this.createUserData.codeValue = e.codeValue;
                this.createUserData.roleId = e.roleId;
            },
            async _getChanping() {
                let datas = await getfindOrgProductPage(this.createUserData);
                console.log(datas);
            },
            async _getFindWarehouseProduct(id) {
                let datas = await getFindWarehouseProduct(id);
                return (this.chanpinCenter = datas.result);
            },
        },
    };
</script>
<style>
    #chukuSure
    .ivu-input-wrapper.ivu-input-wrapper-default.ivu-input-type.ivu-date-picker-editor {
        width: 172px;
        height: 28px;
    }

    #chukuSure .el-input .el-input__inner {
        width: 172px;
        height: 28px;
    }

    #chukuSure .ivu-input.ivu-input-default.ivu-input-with-suffix {
        border: 1px solid #d2d6e2;
        height: 28px;
        color: #333333;
        font-size: 14px;
        font-weight: normal;
        background: rgba(236, 241, 247, 0);
        border-radius: 2px;
    }

    #chukuSure .ivu-input-suffix {
        justify-content: center;
    }

    #chukuSure .ivu-input {
        height: 28px !important;
    }

    #chukuSure .ivu-icon-ios-close-circle {
        width: 15px !important;
        height: 15px !important;
    }

    #chukuSure .ivu-icon.ivu-icon-ios-calendar-outline {
        width: 15px !important;
        height: 15px !important;
    }

    #chukuSure .ivu-input-inner-container {
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

        .parentBox {
            width: 33.3%;
            color: #333333;
            border: 1px solid #d1d6e2;

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
            background: #f8f8f8;
            transform: translate(-50%, -50%);
        }

        .setUserIngBoxCenter {
            position: relative;
            left: 50%;
            top: 144px;
            transform: translateX(-50%);
            background: #fff;
            overflow: auto;
            max-width: 1080px;
            max-height: 750px;
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