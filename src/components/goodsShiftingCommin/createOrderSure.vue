<template>
    <div id="sures">
        <kuanjiaClick
                :titles="'补货确认'"
                @closeBtn="closeBtn"
                :isLooker="isLooker"
                @clickSubmit="clickSubmit"
                :width="'1080px'"
        >
            <template slot="centerKuanjia">
                <div class="mb16">
                    <detailsData
                            :detailsArr="detailsArr"
                            title="补货订单详情"
                    ></detailsData>
                </div>
                <div class="mb16">
                    <chanpinmingxi :chanpinminxiJson="chanpinminxiJson">
                        <template slot="anniuBtns">
                            <span class="goOn mr11 inline">复制产品</span>
                            <span class="lodopFunClear inline">删除</span>
                        </template>
                    </chanpinmingxi>
                </div>
            </template>
        </kuanjiaClick>
    </div>
</template>

<script>
    import kuanjiaClick from "../commin/kuanjiaClick"; //点击架子
    import detailsData from "../commin/dindanxiangq"; //订单详情
    import chanpinmingxi from "../commin/chanpinmingxi"; // 产品明细
    import {getCookie, _isJsonEmpty} from "../../utils/validate";

    export default {
        data() {
            return {
                detailsArr: [
                    {
                        titles: "补货单号",
                        centers: (() => this.BuHuoSureJson.replenishOrderNo || "--")(),
                    },
                    {
                        titles: "补货状态",
                        centers: (() =>
                            this.BuHuoSureJson.disposeStatus == "1"
                                ? "待补货"
                                : this.BuHuoSureJson.disposeStatus == "2"
                                ? "补货中"
                                : this.BuHuoSureJson.disposeStatus == "3"
                                    ? "已补货"
                                    : "未定义" || "--")(),
                    },
                    {
                        titles: "创建时间",
                        centers: (() => this.BuHuoSureJson.createTime || "--")(),
                    },
                    {
                        titles: "创建人",
                        centers: (() => this.BuHuoSureJson.createUser || "--")(),
                    },
                    {
                        titles: "补货时间",
                        type: "date",
                        disabled: false,
                        centers: (() =>
                            this.BuHuoSureJson.replenishStartTime || "请输入补货订单详情")(),
                        getDateTimeExpectedSendTime: (res) => {
                            this.sendOutData.replenishStartTime = res;
                        },
                    },
                    {
                        titles: "补货人",
                        type: "input",
                        centers: "",
                        placeholder: "请输入补货人",
                        input: "",
                        disabled: false,
                        drop: "replenishUserName",
                        OnBlur: (res) => {
                            this.sendOutData.replenishUserName = res.target.value;
                        },
                    },
                ],
                sendOutData: {
                    replenishStartTime: "", // 补货确认
                    operatorType: 3, //操作状态(1-新增 2-修改 3-补货确认)
                    id: (() => this.BuHuoSureJson.id || "")(), //入库单id
                    detailList: [],
                    replenishOrderNo: (() => this.BuHuoSureJson.replenishOrderNo || "")(),
                    orgId: (() => this.BuHuoSureJson.orgId || "")(),
                    orgName: (() => this.BuHuoSureJson.orgName || "")(),
                    childWareId: (() => this.BuHuoSureJson.childWareId || "")(),
                    childWareName: (() => this.BuHuoSureJson.childWareName || "")(),
                    orderSource: 1,
                    disposeStatus: 1,
                    remark: (() => this.BuHuoSureJson.remark || "")(),
                    wareId: getCookie("X-Auth-wareId"),
                    replenishUserName: "",
                },
                chanpinminxiJson: {
                    title: "产品明细",
                    tableDataJsonAndArr: {
                        tabledata: [],
                        typeData: [
                            {
                                types: "selection",
                            },
                            {
                                types: "index",
                                label: "序号",
                                width: 71,
                            },
                            {
                                types: "prodCode",
                                label: "产品编码",
                            },
                            {
                                types: "prodName",
                                label: "产品名称",
                            },
                            {
                                types: "specName",
                                label: "产品规格",
                            },
                            {
                                types: "braName",
                                label: "品牌",
                            },
                            {
                                types: "prodName",
                                label: "储存区库位产品数量",
                            },
                            {
                                types: "prodName",
                                label: "补货库位产品数量",
                            },
                            {
                                types: "prodName",
                                label: "补货预警值",
                            },
                            {
                                types: "prodName",
                                label: "最大补货数量",
                            },
                            {
                                types: "prodName",
                                label: "申请补货数量",
                            },
                            {
                                types: "prodName",
                                label: "补货库位",
                            },
                            {
                                types: "input",
                                label: "实际补货数量",
                                flag: "input",
                                placeholder: "请输入实际补货数量",
                                width: 200,
                            },
                            {
                                types: "",
                                label: "储存区库位",
                                width: 200,
                                flag: "xiala",
                                dropDowBox: {
                                    dropDownBoxData: [],
                                    select: "",
                                    placeholder: "请选择储存区库位",
                                },
                                getDropDownData: (res) => {
                                    console.log(res);
                                },
                                cliclInput: (res) => {
                                    console.log(res, "点击储存区库位");
                                },
                            },
                            {
                                types: "",
                                label: "批次号",
                                width: 200,
                                flag: "xiala",
                                drop: "asd",
                                dropDowBox: {
                                    dropDownBoxData: [],
                                    select: "",
                                    placeholder: "请选择批次号",
                                },
                                getDropDownData: (res) => {
                                    console.log(res);
                                },
                                cliclInput: (res) => {
                                    console.log(res, "点击批次号");
                                },
                            },
                            {
                                types: "",
                                label: "生产日期",
                                flag: "date",
                                width: 250,
                                dateTimeData: {
                                    placeholder: "请选择生产日期",
                                },
                                getDateTime: (res) => {
                                    console.log(res);
                                },
                            },
                        ],
                    },
                },
                buhuoSure: null,
                isBUhuoDna: false
            };
        },
        props: {
            BuHuoSureJson: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            isLooker: {
                type: Boolean,
                default: false,
            },
            tabledatasArr: {
                type: Array,
                default: () => [],
            },
        },
        components: {
            kuanjiaClick,
            detailsData,
            chanpinmingxi,
        },
        created() {
            this.buhuoSure = _isJsonEmpty(this.BuHuoSureJson);
            this.detailsArr[5].input = this.BuHuoSureJson.replenishUserName;
            console.log(this.BuHuoSureJson.replenishStartTime, "this.tabledatasArr");
            this.detailsArr[5].disabled = this.isLooker;
            this.detailsArr[4].disabled = this.isLooker;
            if (this.tabledatasArr.length != 0) {
                this.chanpinminxiJson.tableDataJsonAndArr.tabledata = this.tabledatasArr;
            }
            this._isTableMes();
            this.isBuHUODanXianQin()
        },
        computed: {},
        methods: {
            isBuHUODanXianQin() {
                let _href = window.location.href
                if (_href.includes("/jobTask")) {
                    this.isBUhuoDna = true
                } else {
                    this.isBUhuoDna = false
                }

            },
            _isTableMes() {
                if (this.isLooker) {
                    let json = {
                        titles: "委托公司",
                        centers: (() => this.BuHuoSureJson.orgName || "--")(),
                        play: (() => this.isLooker)(),
                    };
                    this.detailsArr.unshift(json);
                }
            },
            closeBtn() {
                this.$emit("closeBtnSure", false);
            },
            //点击了确认
            clickSubmit() {
                let self = this;
                if (this.isBUhuoDna) {
                    this.$pOrgProductsApp
                        .pReplenishOrderSaveRecord(this.sendOutData)
                        .then((res) => {
                            res.code === "10000" && self.closeBtn();
                        });
                }
                this.$emit('sureSubmit')
            },
        },
    };
</script>

<style lang='scss'>
    @import "../../assets/scss/btn.scss";

    .goOn {
        @include BtnFunction("success");
    }

    .lodopFunClear {
        @include BtnFunction("error");
    }

    #sures .input {
        border: 1px solid #d2d6e2;
        height: 28px;
        text-indent: 10px;
        color: #333333;
        font-size: 14px;
        font-weight: normal;
        background: rgba(236, 241, 247, 0);
        border-radius: 2px;
    }

    #sures .el-input__inner {
        height: 28px;
    }

    #sures .dropDownBox .input_box[data-v-0e988ff4] {
        height: 28px;
    }

    #sures .el-input__icon {
        line-height: 28px;
    }

    #sures .ivu-input {
        height: 28px !important;
    }
</style>