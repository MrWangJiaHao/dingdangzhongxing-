<template>
    <headerKuanJia @clickQueryUser="clickQueryUser" @clearInputAll="clearInputAll">
        <template>
            <div class="displayalign mb16 zujianBox">
                <div class="noneIconTitle mr11">委托公司:</div>
                <div class="mr20">
                    <el-select
                            class="w320"
                            v-model="paras.orgName"
                            slot="prepend"
                            :placeholder="EntrustedCompany.placeholder"
                            @input="getOrdName"
                            @focus="getOrderArr"
                    >
                        <el-option
                                v-for="(item, idx) in EntrustedCompany.entrustedCompanyArr"
                                :key="idx"
                                :label="item.orgFullName"
                                :value="idx"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <!-- 委托公司 -->
            <div class="zujianBox mb16">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">渠道:</div>
                    <div class="mr20">
                        <el-select
                                class="w160"
                                v-model="paras.channelName"
                                slot="prepend"
                                placeholder="请选择渠道"
                                @input="getchannelName"
                                @focus="changeChannelName"
                        >
                            <el-option
                                    v-for="(item, idx) in channelNameJson.channelNameArr"
                                    :key="idx"
                                    :label="item.channelName"
                                    :value="idx"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <!-- 渠道 -->
            <div class="zujianBox mb16">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">订单来源:</div>
                    <div class="mr20">
                        <el-select
                                class="w160"
                                v-model="paras.orderSourceName"
                                slot="prepend"
                                placeholder="请选择订单来源"
                                @focus="getOrderSourceName"
                                @input="changeOrderSourceName"
                        >
                            <el-option
                                    v-for="(item, idx) in orderSourceNameJson.orderSourceName"
                                    :key="idx"
                                    :label="item.orderSourceName"
                                    :value="idx"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <!-- 订单来源 -->

            <div class="zujianBox mb16">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">订单号:</div>
                    <div class="mr20">
                        <el-autocomplete
                                class="w120"
                                v-model="paras.orderNoCenter"
                                :fetch-suggestions="orderNoArr"
                                placeholder="请输入订单号"
                                @select="orderNoSelect"
                        ></el-autocomplete>
                    </div>
                </div>
            </div>
            <!-- 订单号 -->

            <div class="zujianBox mb16">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">子单号:</div>
                    <div class="mr20">
                        <el-autocomplete
                                class="w120"
                                v-model="paras.subOrderNoCenter"
                                :fetch-suggestions="subOrderNoArr"
                                placeholder="请输入子单号"
                                @select="subOrderNoSelect"
                        ></el-autocomplete>
                    </div>
                </div>
            </div>
            <!-- 子单号 -->

            <div class="zujianBox mb16">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">产品编号:</div>
                    <div class="mr20">
                        <el-autocomplete
                                class="w120"
                                v-model="paras.prodNameLike"
                                :fetch-suggestions="addressJsonArr"
                                placeholder="请输入产品编号"
                                @select="addressJsonSelect"
                        ></el-autocomplete>
                    </div>
                </div>
            </div>
            <!-- 产品名称 -->

            <div class="zujianBox mb16">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">产品名称:</div>
                    <div class="mr20">
                        <el-autocomplete
                                class="w120"
                                v-model="paras.prodNameLike"
                                :fetch-suggestions="addressJsonArr"
                                placeholder="请输入产品名称"
                                @select="addressJsonSelect"
                        ></el-autocomplete>
                    </div>
                </div>
            </div>
            <!-- 产品名称 -->

            <div v-if="fastFahuo" class="displayalign mb16 zujianBox">
                <div class="noneIconTitle mr11">物流打印状态:</div>
                <div class="mr20">
                    <el-select
                            class="w120"
                            v-model="paras.printExprStatus"
                            slot="prepend"
                            placeholder="请选择物物流打印状态"
                            @input="changewiliudayarr"
                    >
                        <el-option
                                v-for="(item, idx) in wiliudayarr"
                                :key="idx"
                                :label="item.title"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <!-- 物流公司 -->

            <div class="zujianBox mb16">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">下发时间:</div>
                    <div class="mr20 displayalign">
                        <div style="margin-right: 10px">
                            <dateTime
                                    :dateTimeData="pushStartTime"
                                    @getDateTime="getpushStartTime"
                                    ref="putStart"
                            />
                        </div>
                        <!-- 开始时间 -->
                        <div class="line"></div>
                        <div>
                            <dateTime
                                    :dateTimeData="pushEndTime"
                                    @getDateTime="getpushEndTime"
                                    ref="putEnd"
                            />
                        </div>
                        <!-- 结束时间 -->
                    </div>
                </div>
            </div>
            <!-- 下发时间 -->
        </template>
    </headerKuanJia>

</template>

<script>
    /*eslint-disable */
    import {
        pOrgFailSubOrderfindRecordPageGroupByProd,
        getEntrustedcompany,
    } from "../../api/api";
    import dateTime from "../../components/commin/dateTime.vue"; //时间
    import {getCookie} from "../../utils/validate";
    import headerKuanJia from "../../components/commin/headerKuanJia";

    export default {
        components: {
            dateTime,
            headerKuanJia
        },
        props: {
            fastFahuo: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                //委托公司
                EntrustedCompany: {
                    placeholder: "请选择委托公司",
                    entrustedCompanyArr: "",
                },
                //渠道数组
                channelNameJson: {
                    channelNameArr: [],
                },
                //订单来源
                orderSourceNameJson: {
                    orderSourceName: [],
                },
                exprNameJson: {
                    exprNameArr: [],
                },
                orderContactPhone: {
                    orderContactPhoneCenter: "",
                },
                orderAddr: {
                    orderAddrCenter: "",
                },
                addressJson: {
                    orderAddrArr: [],
                    addressArr: [],
                    addressJsonCenter: "",
                },
                systemProdName: {systemProdNameArr: []},
                PayStartTime: {placeholder: "请输入支付开始时间"},
                payEndTime: {placeholder: "请输入支付结束时间"},
                pushStartTime: {placeholder: "请选择下发开始时间"},
                pushEndTime: {placeholder: "请选择下发结束时间"},
                paras: {
                    wareId: getCookie("X-Auth-wareId"),
                    orgId: "",
                    orderSourceId: "",
                    channelId: "",
                    orderNo: "",
                    subOrderNo: "",
                    exprId: "",
                    orderContact: "",
                    orderSourceName: "",
                    orderContactPhoneCenter: "",
                    orderContactPhone: "",
                    orderAddr: "",
                    orderAddrLike: "",
                    systemProdName: "",
                    prodNameLike: "",
                    payStartTime: "",
                    payEndTime: "",
                    pushStartTime: "",
                    pushEndTime: "",
                    specialProd: (() => (this.fastFahuo ? 1 : null))(),
                    printExprStatus: null,
                },
                wiliudayarr: [
                    {
                        id: 0,
                        title: "未打印",
                    },
                    {id: 1, title: "已打印"},
                ],
                sendoutData: {
                    pageNumber: 1, //当前页数
                    pageSize: 10, //每页记录数
                    paras: {},
                },
            };
        },
        created() {
            this._getMes();
            this.addZhanKaiRes(".btnArrs");
        },
        methods: {
            addZhanKaiRes(child) {
                this.$nextTick(() => {
                    child = document.querySelector(child);
                    this.$isChaXun.isChaXun(child);
                });
            },
            changeorderAddr(e) {
                this.paras.orderAddr = addressJson.orderAddrArr[e].orderAddr;
            },
            changewiliudayarr(e) {
                this.paras.printExprStatus = e;
            },
            //获取数组
            async _getMes() {
                let {result} = await pOrgFailSubOrderfindRecordPageGroupByProd(
                    this.sendoutData
                );
                this._changDianDanLaiYuan(result.list);
            },
            //获取订单来源
            _changDianDanLaiYuan(res) {
                this.channelNameJson.channelNameArr = res;
                this.orderSourceNameJson.orderSourceName = res;
                this.exprNameJson.exprNameArr = res;
                this.addressJson.orderAddrArr = res;
                this.addressJson.addressArr = res;
                this.systemProdName.systemProdNameArr = res;
            },
            //change那个收货地址
            orderAddrSelect() {
            },
            //点击那个收货地址
            orderAddrArr() {
            },
            getPayStartTime(e) {
                this.paras.PayStartTime = e;
            },
            getpayEndTime(e) {
                this.paras.payEndTime = e;
            },
            getpushStartTime(e) {
                this.paras.pushStartTime = e;
            },
            getpushEndTime(e) {
                this.paras.pushEndTime = e;
            },
            //获取了那个订单号
            subOrderNoArr() {
            },
            //选择了那个订单号
            subOrderNoSelect() {
            },
            //点击产品名称
            addressJsonArr() {
            },
            //点击拉那个产品名称
            addressJsonSelect() {
            },
            //订单号数组
            orderNoArr(e) {
                this.paras.orderNo = e;
            },
            //选择那个订单数组
            orderNoSelect() {
            },
            //点击订单来源
            getOrderSourceName() {
            },
            //改变订单来源
            changeOrderSourceName(e) {
                this.paras.orderSourceId =
                    channelNameJson.channelNameArr[e].orderSourceId;
            },
            //改变渠道
            getchannelName(e) {
                this.paras.channelId = channelNameJson.channelNameArr[e].channelId;
            },
            //点击渠道
            changeChannelName() {
            },
            //发送ajax
            async getOrderArr() {
                let datas = await getEntrustedcompany();
                return (this.EntrustedCompany.entrustedCompanyArr = datas.result);
            },
            //委托公司
            getOrdName(e) {
                this.paras.orgId = this.EntrustedCompany.entrustedCompanyArr[e].id;
            },
            //点击了查询
            clickQueryUser() {
                this.$emit("getParasJson", this.paras);
            },
            //点击了清空
            clearInputAll() {
                this.paras = {
                    orgId: "",
                    orderSourceId: "",
                    channelId: "",
                    orderNo: "",
                    subOrderNo: "",
                    exprId: "",
                    orderContact: "",
                    orderSourceName: "",
                    orderContactPhoneCenter: "",
                    orderContactPhone: "",
                    orderAddr: "",
                    orderAddrLike: "",
                    systemProdName: "",
                    prodNameLike: "",
                    payStartTime: "",
                    payEndTime: "",
                    pushStartTime: "",
                    pushEndTime: "",
                };
                this.orderContactPhone.orderContactPhoneCenter = "";
                this.orderAddr.orderAddrCenter = "";
                this.addressJson.addressJsonCenter = "";
                this.$refs.putStart.clear();
                this.$refs.putEnd.clear();
                this.$emit("getParasJson", this.paras);
            },
        },
    };
</script>

<style lang='scss' scoped>
    @import "../../assets/scss/btn.scss";

    .fuzzyQueryBox {
        padding: 17px 30px;
        display: flex;
        position: relative;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        .biaogeBox {
            flex-wrap: wrap;
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
            background: #D1D6E2;
            margin-right: 10px;
        }

        .btns {
            display: inline-block;
            position: absolute;
            right: 30px;
            bottom: 20px;

            .queryBtn {
                display: inline-block;
                @include BtnFunction("success");
            }

            .clearBtn {
                display: inline-block;
                @include BtnFunction();
                background: #fff;
            }
        }
    }

    .line {
        width: 20px;
        height: 2px;
        background: #fff;
        margin-right: 10px;
    }
</style>