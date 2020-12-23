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
                                class="w120"
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
                                v-model="paras.orderSourceName"
                                class="w160"
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

            <div class="displayalign mb16 zujianBox">
                <div class="noneIconTitle mr11">物流公司:</div>
                <div class="mr20">
                    <el-select
                            class="w150"
                            v-model="paras.exprName"
                            slot="prepend"
                            placeholder="请选择物流公司"
                            @input="changeExprName"
                            @focus="getexprName"
                    >
                        <el-option
                                v-for="(item, idx) in exprNameJson.exprNameArr"
                                :key="idx"
                                :label="item.exprName"
                                :value="idx"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <!-- 物流公司 -->

            <div class="zujianBox mb16">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">收货人:</div>
                    <div class="mr20">
                        <el-autocomplete
                                class="w120"
                                v-model="paras.orderContactCenter"
                                :fetch-suggestions="orderContactArr"
                                placeholder="请输入收货人"
                                @select="orderContactSelect"
                        ></el-autocomplete>
                    </div>
                </div>
            </div>
            <!-- 收货人 -->

            <div class="zujianBox mb16">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">联系电话:</div>
                    <div class="mr20">
                        <el-autocomplete
                                class="w120"
                                v-model="orderContactPhone.orderContactPhoneCenter"
                                :fetch-suggestions="orderContactPhoneArr"
                                placeholder="请输入收货人"
                                @select="orderContactPhoneSelect"
                        ></el-autocomplete>
                    </div>
                </div>
            </div>
            <!-- 联系电话 -->

            <div class="zujianBox mb16">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">收货地址:</div>
                    <div class="mr20 displayalign">
              <span class="mr11">
                <el-autocomplete
                        class="w120"
                        v-model="orderAddr.orderAddrCenter"
                        :fetch-suggestions="orderAddrArr"
                        placeholder="请输入收货地址"
                        @select="orderAddrSelect"
                ></el-autocomplete>
              </span>

                        <el-select
                                class="w150"
                                v-model="paras.orderAddr"
                                slot="prepend"
                                placeholder="请选择收货地址"
                                @input="changeorderAddr"
                        >
                            <el-option
                                    v-for="(item, idx) in addressJson.orderAddrArr"
                                    :key="idx"
                                    :label="item.orderAddr"
                                    :value="idx"
                            ></el-option>
                        </el-select>
                        <!--address 收货地址  -->
                    </div>
                </div>
            </div>
            <!-- 收货地址 -->

            <div class="zujianBox mb16">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">产品名称:</div>
                    <div class="mr20 displayalign">
              <span class="mr11">
                <el-autocomplete
                        class="w120"
                        v-model="paras.prodNameLike"
                        :fetch-suggestions="addressJsonArr"
                        placeholder="请输入产品名称"
                        @select="addressJsonSelect"
                ></el-autocomplete>
              </span>

                        <el-select
                                class="w150"
                                v-model="paras.systemProdName"
                                slot="prepend"
                                placeholder="请选择产品名称"
                                @input="changeaddress"
                                @focus="getaddress"
                        >
                            <el-option
                                    v-for="(item, idx) in systemProdName.systemProdNameArr"
                                    :key="idx"
                                    :label="item.systemProdName"
                                    :value="idx"
                            ></el-option>
                        </el-select>
                        <!--address 产品名称  -->
                    </div>
                </div>
            </div>
            <!-- 产品名称 -->

            <div v-if="fastFahuo" class="displayalign mb16 zujianBox">
                <div class="noneIconTitle mr11">物流打印状态:</div>
                <div class="mr20">
                    <el-select
                            class="w190"
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
                    <div class="noneIconTitle mr11">支付时间:</div>
                    <div class="mr20 displayalign">
                        <div style="margin-right: 10px">
                            <dateTime
                                    :dateTimeData="PayStartTime"
                                    @getDateTime="getPayStartTime"
                                    ref="expectedStart"
                            />
                        </div>
                        <!-- 开始时间 -->
                        <div class="line"></div>
                        <div>
                            <dateTime
                                    :dateTimeData="payEndTime"
                                    @getDateTime="getpayEndTime"
                                    ref="expectedEnd"
                            />
                        </div>
                        <!-- 结束时间 -->
                    </div>
                </div>
            </div>
            <!-- 支付时间 -->

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
        getEntrustedcompany,
        pDeliverGoodsFindNormalRecordPage,
        pDeliverGoodsFindFastRecordPage,
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
                    paras: {
                        wareId: getCookie("X-Auth-wareId"),
                    },
                },
                sendoutDataPage: {
                    page: 1, //当前页数
                    pageSize: 10, //每页记录数
                    paras: {
                        specialProd: 0,
                        wareId: getCookie("X-Auth-wareId"),
                    },
                },
            };
        },
        created() {
            this._getMes();
        },
        methods: {
            changeorderAddr(e) {
                this.paras.orderAddr = this.addressJson.orderAddrArr[e].orderAddr;
            },
            changewiliudayarr(e) {
                this.paras.printExprStatus = e;
            },
            //获取数组
            async _getMes() {
                let {result} = await this._ajaxMes();
                this._changDianDanLaiYuan(result.list);
            },
            _ajaxMes() {
                return this.fastFahuo
                    ? pDeliverGoodsFindFastRecordPage(this.sendoutDataPage)
                    : pDeliverGoodsFindNormalRecordPage(this.sendoutData);
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
            //点击收货地址
            getaddress() {
            },
            //改变收货地址
            changeaddress(e) {
                this.paras.orderAddr = this.systemProdName.systemProdNameArr[e].orderAddr;
            },
            //收货联系电话
            orderContactPhoneArr(e) {
                this.paras.orderContactPhone = e;
            },
            //选择了那个收货联系电话
            orderContactPhoneSelect() {
            },
            //点击收货人
            orderContactArr(e) {
                this.paras.orderContact = e;
            },
            //选择了那个收货人
            orderContactSelect() {
            },
            //改变物流公司
            changeExprName(e) {
                exprNameJson.exprNameArr = this.exprNameJson.exprNameArr[e].exprNameArr;
            },
            //点击物流公司
            getexprName() {
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
                this.paras.orderSourceId = this.channelNameJson.channelNameArr[
                    e
                    ].orderSourceId;
            },
            //改变渠道
            getchannelName(e) {
                this.paras.channelId = this.channelNameJson.channelNameArr[e].channelId;
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
                this.$refs.expectedStart.clear();
                this.$refs.expectedEnd.clear();
                this.$refs.putStart.clear();
                this.$refs.putEnd.clear();
                this.$emit("getParasJson", this.paras);
            },
        },
    };
    // let flag = 1;
    //
    // //判断需不需要添加
    // function createZhangkaiD(child) {
    //     let parent = child.parentNode;
    //     let parentHeight = parent.offsetHeight;
    //     if (parentHeight >= 118) {
    //         parent.style.height = 118 + "px";
    //         createDomPush(child);
    //     }
    // }
    //
    // //
    // function createDomPush(child) {
    //     let text = flag % 2 != 0 ? "展开" : "收起";
    //     let div = document.createElement("div");
    //     div.innerText = text;
    //     div.className = "inline mr11 clickMes";
    //     child.insertBefore(div, child.children[0]);
    //     div.addEventListener("click", clickFun, false);
    // }
    //
    // //isClickMes
    // function clickFun() {
    //     flag++;
    // }
</script>

<style lang='scss' scoped>
    @import "../../assets/scss/btn.scss";

    .fuzzyQueryBox {
        position: relative;
        padding: 20px 30px;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
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
            background: #fff;
            margin-right: 10px;
        }

        .btn {
            position: absolute;
            right: 30px;
            bottom: 10px;
        }

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

    .line {
        width: 20px;
        height: 2px;
        background: #fff;
        margin-right: 10px;
    }
</style>
