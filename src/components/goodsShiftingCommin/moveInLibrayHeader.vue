<template>
    <div>
        <headerKuanJia
                @clickQueryUser="clickQueryUser"
                @clearInputAll="clearInters"
        >
            <template slot="biaoBoxCenter">
                <searchBox
                        :buhuodanhaoJson="buhuodanhaoJson"
                        @changereplenishOrderNo="yikudanhao"
                />
                <!-- 移库单号 -->
                <dropDownXiala
                        :xialaJson="yikuzhuangytaiJson"
                        @weiTuoGonShiClick="yikuzhuantaiFun"
                />
                <!-- 移库状态 -->
                <searchBox :buhuodanhaoJson="chanpingCode" @changereplenishOrderNo="changpingbianma"/>
                <!-- 产品编码  -->
                <searchBox :buhuodanhaoJson="chanpingName" @changereplenishOrderNo="changpingName"/>
                <!-- 产品名称  -->
                <dropDownXiala
                        :xialaJson="changpingGuiGe"
                        @weiTuoGonShiClick="chanbianCodeFun"
                />
                <!-- 产品规格 -->
                <dateTime
                        :title="'创建时间'"
                        :qianmiandeData="qianmiandeData"
                        :houmiandeData="houmiandeData"
                        ref="createDate"
                        @getTime="createGetTime"
                />
                <!-- 创建时间 -->
                <dateTime
                        :title="'移库时间'"
                        :qianmiandeData="qianmiandeMoveData"
                        :houmiandeData="houmiandeMoveData"
                        ref="moveDate"
                        @getTime="createMoveGetTime"
                />
                <!-- 创建时间  -->
            </template>
        </headerKuanJia>
    </div>
</template>

<script>
    /*eslint-disable */
    import headerKuanJia from "../commin/headerKuanJia"; //头部框架
    import dropDownXiala from "../headerCommin/xialaHeader"; //下拉框
    import searchBox from "../headerCommin/inputHeader"; //下拉框
    import dateTime from "../../components/headerCommin/dateHeader"; //时间
    export default {
        components: {
            dropDownXiala,
            searchBox,
            dateTime,
            headerKuanJia,
        },
        data() {
            return {
                qianmiandeData: {
                    placeholder: "请选择开始创建时间",
                },
                houmiandeData: {
                    placeholder: "请选择结束创建时间",
                },
                qianmiandeMoveData: {
                    placeholder: "请选择开始移库时间",
                },
                houmiandeMoveData: {
                    placeholder: "请选择结束移库时间",
                },
                yikuzhuangytaiJson: {
                    title: "移库状态",
                    wieTuoGonShiJson: {
                        placeholder: "请选择移库状态",
                        dropDownBoxData: [],
                        select: "",
                    },
                    drop: "",
                    w320: "w160",
                },
                changpingGuiGe: {
                    title: "产品规格",
                    wieTuoGonShiJson: {
                        placeholder: "请选择产品规格",
                        dropDownBoxData: [],
                        select: "",
                    },
                    drop: "",
                    w320: "w160",
                },
                buhuodanhaoJson: {
                    placeholder: "请输入移库单号",
                    title: "移库单号",
                    input: "",
                },
                chanpingCode: {
                    placeholder: "请输入产品编码",
                    title: "产品编码",
                    input: "",
                },
                chanpingName: {
                    placeholder: "请输入产品名称",
                    title: "产品名称",
                    input: "",
                },
                paras: {
                    innerMoveNo: "", //移库单号
                    moveStatus: "", //移库状态
                    innerMoveStartTime: "", //移库开始时间
                    innerMoveEndTime: "", //移库结束时间
                    createStartTime: "", //创建开始时间
                    createEndTime: "", //创建结束时间
                    prodCode: "", //产品编码
                    prodName: "", //产品名称
                    specId: "", //产品规格id
                    specName: "", //产品规格名称
                },
            };
        },
        methods: {
            changpingName(e) {
                this.paras.prodName = e
            },

            //产品编码
            changpingbianma(e) {
                this.paras.prodCode = e
            },
            //移库单号
            yikudanhao(e) {
                this.paras.innerMoveNo = e;
            },
            //移库状态
            yikuzhuantaiFun(e) {
                this.paras.moveStatus =
                    this.yikuzhuangytaiJson.wieTuoGonShiJson.dropDownBoxData[e]
                        .moveStatus || "";
            },

            //产品规格
            chanbianCodeFun(e) {
                this.paras.specId =
                    this.changpingGuiGe.wieTuoGonShiJson.dropDownBoxData[e].specId || "";
                this.paras.specName =
                    this.changpingGuiGe.wieTuoGonShiJson.dropDownBoxData[e].specName || "";
            },
            //创建时间
            createGetTime(e) {
                this.paras.createStartTime = e.startTime;
                this.paras.createEndTime = e.endTime;
            },
            //移库时间
            createMoveGetTime(e) {
                this.paras.innerMoveStartTime = e.startTime;
                this.paras.innerMoveEndTime = e.endTime;
            },
            clickQueryUser() {
                this.$emit("queryClick", this.paras);
            },
            clearInters() {
                this.yikuzhuangytaiJson.wieTuoGonShiJson.select = "";
                this.changpingGuiGe.wieTuoGonShiJson.select = "";
                this.buhuodanhaoJson.input = "";
                this.chanpingName.input = "";
                this.chanpingCode.input = "";
                this.$refs.moveDate.clearTime();
                this.$refs.createDate.clearTime();
                this.$emit("clearInters", true);
            },
        },
    };
</script>