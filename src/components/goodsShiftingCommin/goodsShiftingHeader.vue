<template>
    <div>
        <headerKuanJia left-width='87%' @clickQueryUser="queryCenter" @clearInputAll="clearInters">
            <template>
                <div class="inline mr20 mb16">
                    <dropDownXiala
                            :w320="'w320'"
                            :dropDowBox="wieTuoGonShiJson"
                            @getDropDownData="weiTuoGonShiInput"
                            :drop="'orgName'"
                    />
                </div>
                <!-- 委托公司 -->
                <div class="inline mr20 mb16">
                    <searchBox
                            @changeInputs="changereplenishOrderNo"
                            :searchCenter="buhuodanhaoJson"
                    />
                </div>
                <!-- 补货单号 -->
                <div class="inline mr20 mb16">
                    <searchBox
                            @changeInputs="changprodNumeJson"
                            :searchCenter="prodNumeJson"
                    />
                </div>
                <!-- 产品名称 -->
                <div class="inline mr20 mb16">
                    <searchBox
                            @changeInputs="changprodCodeJson"
                            :searchCenter="prodCodeJson"
                    />
                </div>
                <!-- 产品编码 -->
                <div class="inline mr20 mb16">
                    <dropDownXiala
                            :dropDowBox="specNameJson"
                            @getDropDownData="specNameqInput"
                            :drop="'specName'"
                    />
                </div>
                <!-- 请选择产品规格 -->
                <div class="inline mr20 mb16">
                    <dropDownXiala
                            :dropDowBox="disposeStatusJson"
                            @getDropDownData="disposeStatusInput"
                            :drop="'disposeStatuss'"
                    />
                </div>
                <!-- 补货状态 -->
                <div class="inline mr20 mb16">
                    <dropDownXiala
                            :dropDowBox="orderSourceJson"
                            @getDropDownData="orderSourceInput"
                            :drop="'orderSources'"
                    />
                </div>
                <!-- 补货类型 -->
                <div class="inline mr20 mb16">
                    <div class="displayalign zujianBox">
                        <div class="noneIconTitle mr11">创建时间:</div>
                        <div class=" displayalign">
                            <div class="mr10">
                                <dateTime
                                        :dateTimeData="createStartTime"
                                        @getDateTime="getcreateStartTime"
                                        ref="createStartTime"
                                />
                            </div>
                            <!-- 开始时间 -->
                            <div class="line"></div>
                            <div>
                                <dateTime
                                        :dateTimeData="createEndTime"
                                        @getDateTime="getcreateEndTime"
                                        ref="createEndTime"
                                />
                            </div>
                            <!-- 结束时间 -->
                        </div>
                    </div>
                </div>
                <!-- 下发时间 -->
                <div class="inline mr20 mb16">
                    <div class="displayalign zujianBox">
                        <div class="noneIconTitle mr11">补货开始时间:</div>
                        <div class="mr20 displayalign">
                            <div class="mr10">
                                <dateTime
                                        :dateTimeData="replenishStartTime"
                                        @getDateTime="getreplenishStartTime"
                                        ref="replenishStartTime"
                                />
                            </div>
                            <!-- 开始时间 -->
                            <div class="line"></div>
                            <div>
                                <dateTime
                                        :dateTimeData="replenishEndTime"
                                        @getDateTime="getreplenishEndTime"
                                        ref="replenishEndTime"
                                />
                            </div>
                            <!-- 结束时间 -->
                        </div>
                    </div>
                </div>
                <!-- 补货开始时间 -->
            </template>
        </headerKuanJia>
    </div>
</template>

<script>
    import headerKuanJia from "../../components/commin/headerKuanJia";
    import dropDownXiala from "../commin/dropDownXiala"; //下拉框
    import searchBox from "../commin/searvhBoxs"; //下拉框
    import dateTime from "../../components/commin/dateTime.vue"; //时间
	import { Heavy } from "../../utils/validate.js"
    export default {
        components: {
            dropDownXiala,
            searchBox,
            dateTime,
            headerKuanJia
        },
        data() {
            return {
                wieTuoGonShiJson: {
                    placeholder: "请选择委托公司",
                    title: "委托公司",
                    select: "",
                    dropDownBoxData: [],
                },
                specNameJson: {
                    placeholder: "请选择产品规格",
                    title: "产品规格",
                    select: "",
					drop:"spceName",
                    dropDownBoxData: [],
                },
                disposeStatusJson: {
                    placeholder: "请选择补货状态",
                    title: "补货状态",
                    select: "",
					drop:"disposeStatuss",
                    dropDownBoxData: [],
                },
                orderSourceJson: {
                    placeholder: "请选择补货类型",
                    title: "补货类型",
                    select: "",
                    dropDownBoxData: [],
                },
                createStartTime: {
                    placeholder: "创建开始时间",
                },
                createEndTime: {
                    placeholder: "创建结束时间",
                },
                replenishStartTime: {
                    placeholder: "请选择补货开始时间",
                },
                replenishEndTime: {
                    placeholder: "请选择补货结束时间",
                },
                buhuodanhaoJson: {
                    placeholder: "请输入补货单号",
                    title: "补货单号",
                    input: "",
                },
                prodNumeJson: {
                    placeholder: "请输入产品名称",
                    title: "产品名称",
                    input: "",
                },
                prodCodeJson: {
                    placeholder: "请输入产品编码",
                    title: "产品编码",
                    input: "",
                },
                paras: {
                    orgId: "", //委托公司id
                    createTime: "", //创建时间
                    createEndTime: "", //创建结束时间
                    createStartTime: "", //创建开始时间
                    replenishOrderNo: "", //补货单号
                    prodName: "", //产品名称
                    prodCode: "", //产品编码
                    specName: "", //产品规格
                    disposeStatus: "", //补货状态
                    orderSource: "", //补货类型
                    replenishStartTime: "", //补货开始时间，
                    replenishEndTime: "", //补货结束时间
                },
                sendOutDataJson: {
                    paras: {},
                    pageNumber: 1, //当前页数
                    pageSize: 10, //每页记录数
                },
            };
        },
        created() {
            this.getTableData();
        },
        methods: {
            //捕获状态
            disposeStatusInput(e) {
                this.paras.disposeStatus = this.disposeStatusJson.dropDownBoxData[e].disposeStatus;
            },
            //补货类型
            orderSourceInput(e) {
                this.paras.orderSource = this.orderSourceJson.dropDownBoxData[e].orderSource;
            },
            getcreateStartTime(e) {
                this.paras.createStartTime = e;
            },
            getcreateEndTime(e) {
                this.paras.createEndTime = e;
            },
            getreplenishStartTime(e) {
                this.paras.replenishStartTime = e;
            },
            getreplenishEndTime(e) {
                this.paras.replenishEndTime = e;
            },
            changereplenishOrderNo(e) {
                this.paras.replenishOrderNo = e;
            },
            changprodNumeJson(e) {
                this.paras.prodName = e;
            },
            changprodCodeJson(e) {
                this.changprodCodeJson.prodCode = e;
            },
            weiTuoGonShiInput(e) {
                this.paras.orgId = this.wieTuoGonShiJson.dropDownBoxData[e].orgId;
            },
            specNameqInput(e) {
                this.paras.specName = this.specNameJson.dropDownBoxData[e].specName;
            },
            queryCenter() {
                this.$emit("jobTaskHeader", this.paras);
            },
            clearInters() {
				this.paras = {
					orgId: "", //委托公司id
					createTime: "", //创建时间
					createEndTime: "", //创建结束时间
					createStartTime: "", //创建开始时间
					replenishOrderNo: "", //补货单号
					prodName: "", //产品名称
					prodCode: "", //产品编码
					specName: "", //产品规格
					disposeStatus: "", //补货状态
					orderSource: "", //补货类型
					replenishStartTime: "", //补货开始时间，
					replenishEndTime: "", //补货结束时间
				}
                this.wieTuoGonShiJson.select = ""; //清空委托公司
                this.buhuodanhaoJson.input = ""; //清空补货单号
                this.prodNumeJson.input = ""; //清空产品名称
                this.prodCodeJson.input = ""; //清空产品名称
                this.disposeStatusJson.select = ""; //补货状态
                this.orderSourceJson.select = ""; //补货类型
                this.$refs.replenishEndTime.clear();
                this.$refs.replenishStartTime.clear();
                this.$refs.createEndTime.clear();
                this.$refs.createStartTime.clear();
                this.$emit("jobTaskClearBtn", true);
                this.$parent.getTableData();
            },
            async getTableData(fn) {
                let datas = await this.$pOrgProductsApp.pReplenishOrderfindRecordPage(
                    this.sendOutDataJson
                );
                if (datas.code == "10000") {
                    this._changeDatas(datas.result);
                } else {
                    this.$messageSelf.message({message: datas.msg, type: "error"});
                }
                fn && fn(datas.result);
                return datas;
            },
            _changeDatas(res) {
                let {list} = res;
				list.forEach(item=>{
					item.orderSources = item.orderSource == 1 ?'手工创建':item.orderSource == 2 ? "缺货" : "未定义"
					item.disposeStatuss = item. disposeStatus == 1
                                    ? "待补货"
                                    :  item.disposeStatus == 2
                                    ? "补货中"
                                    : item.disposeStatus == 3
                                    ? "已补货"
                                    : "未定义"
				})
                this.wieTuoGonShiJson.dropDownBoxData =Heavy(list,'orgName') ;
                this.specNameJson.dropDownBoxData = list;
                this.disposeStatusJson.dropDownBoxData =Heavy(list,'disposeStatuss') ;
                this.orderSourceJson.dropDownBoxData =Heavy(list,'orderSources')  ;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/btn.scss";

    .goodsShiftingBox {
        min-height: 160px;
        padding: 20px 30px 4px 30px;
        position: relative;
        overflow: hidden;

        .btns {
            position: absolute;
            right: 10px;
            bottom: 10px;
        }
    }

    .line {
        width: 20px;
        height: 2px;
        background: #fff;
        margin-right: 10px;
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
</style>