<template>
    <headerKuanJia @clickQueryUser="clickQueryUser" @clearInputAll="clearInput">
        <xialaHeader class="mb16" :xiala-json="weituonGonshi" ></xialaHeader>
        <!-- 委托 -->
        <xialaHeader class="mb16" :xiala-json="qudaoJson"></xialaHeader>
        <!-- 渠道 -->
        <xialaHeader class="mb16" :xiala-json="dindanlaiyuanJson"></xialaHeader>
        <!-- 订单来源 -->
        <inputHeader class="mb16" :buhuodanhao-json="dindanhao"></inputHeader>
        <!-- 订单号 -->
        <inputHeader class="mb16" :buhuodanhao-json="zidanhao"></inputHeader>
        <!-- 子单号 -->
        <xialaHeader class="mb16" :xiala-json="fuehryuan"></xialaHeader>
        <!-- 复核人员 -->
        <xialaHeader class="mb16" :xiala-json="fuhezhuangtai"></xialaHeader>
        <!-- 复核状态 -->
        <xialaHeader class="mb16" :xiala-json="wuliuyuan"></xialaHeader>
        <!-- 物流公司 -->
        <dateHeader
                class="mb16"
                :qianmiande-data="{ placeholder: '请选择复核开始时间' }"
                :houmiande-data="{ placeholder: '请选择复核结束时间' }"
                title="复核开始时间"
                ref="fuheStart"
        ></dateHeader>
        <dateHeader
                class="mb16"
                title="拣货开始时间"
                :qianmiande-data="{ placeholder: '请选择拣货开始时间' }"
                :houmiande-data="{ placeholder: '请选择拣货结束时间' }"
                ref="jianhuoStart"
        ></dateHeader>
    </headerKuanJia>
</template>

<script>
    import headerKuanJia from "../../components/commin/headerKuanJia";
    import xialaHeader from "../headerCommin/xialaHeader";
    import inputHeader from "../headerCommin/inputHeader";
    import dateHeader from "../headerCommin/dateHeader";

    export default {
        name: "index",
        components: {
            headerKuanJia,
            xialaHeader,
            inputHeader,
            dateHeader,
        },
        data() {
            return {
                weituonGonshi: {
                    title: "委托公司",
                    wieTuoGonShiJson: {
                        placeholder: "请选择委托公司",
                        w320: "w320",
                        dropDownBoxData: [],
                        select: "",
                        drop: "orgName",
                    },
                    drop: "orgName",
                },
                qudaoJson: {
                    title: "渠道",
                    wieTuoGonShiJson: {
                        placeholder: "请选择渠道",
                        dropDownBoxData: [],
                        select: "",
                        drop: "channelName",
                    },
                    drop: "channelName",
                },
                dindanlaiyuanJson: {
                    title: "订单来源",
                    wieTuoGonShiJson: {
                        placeholder: "请选择订单来源",
                        dropDownBoxData: [],
                        select: "",
                        drop: "orderSourceName",
                    },
                    drop: "orderSourceName",
                },
                dindanhao: {
                    title: "订单号",
                    placeholder: "请输入订单号",
                    input: "",
                    drop: "orderNo",
                },
                zidanhao: {
                    title: "子单号",
                    placeholder: "请输入子单号",
                    input: "",
                    drop: "subOrderNo",
                },
                fuehryuan: {
                    title: "复核人员",
                    wieTuoGonShiJson: {
                        placeholder: "请选择复核人员",
                        dropDownBoxData: [],
                        select: "",
                        drop: "reCheckUser",
                    },
                    drop: "reCheckUser",
                },
                fuhezhuangtai: {
                    title: "复核状态",
                    wieTuoGonShiJson: {
                        placeholder: "请选择复核状态",
                        dropDownBoxData: [],
                        select: "",
                        drop: "reCheckResults",
                    },
                    drop: "reCheckResults",
                },
                wuliuyuan: {
                    title: "物流公司",
                    wieTuoGonShiJson: {
                        placeholder: "请选择物流公司",
                        dropDownBoxData: [],
                        select: "",
                        drop: "exprName",
                    },
                    drop: "exprName",
                },
                sendoutData: {},
            };
        },
        methods: {
			
            clickQueryUser() {
                this.$emit("querySelect", this.sendoutData);
            },
            clearInput() {
                this.weituonGonshi.wieTuoGonShiJson.select = "";
                this.qudaoJson.wieTuoGonShiJson.select = "";
                this.dindanlaiyuanJson.wieTuoGonShiJson.select = "";
                this.dindanhao.input = "";
                this.zidanhao.input = "";
                this.fuehryuan.wieTuoGonShiJson.select = "";
                this.fuhezhuangtai.wieTuoGonShiJson.select = "";
                this.wuliuyuan.wieTuoGonShiJson.select = "";
				this.sendoutData = {}
                this.$refs.fuheStart.clearTime();
                this.$refs.jianhuoStart.clearTime();
                this.$emit("clearInput", this.sendoutData);
            },
        },
        created() {
        },
    };
</script>