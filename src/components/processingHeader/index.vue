<template>
    <headerKuanJia left-width="97%" @clickQueryUser="clickQueryUser" @clearInputAll="clearInputAll">
        <template>
            <xialaHeader class="mb16" :xialaJson="delegationJson"
                         @weiTuoGonShiClick="weiTuoGonShiClickFun"></xialaHeader>
            <!--   委托公司   -->
            <inputHeader class="mb16" :buhuodanhaoJson='changpingbianmaJson'
                         @changereplenishOrderNo="jiagonzuoyedanhao"></inputHeader>
            <!-- 加工作业单号 分解作业单号 -->
            <xialaHeader class="mb16" :xialaJson="isJiaGonOffice?fenjiezhuangtai :jiagonzhuangtai"
                         @weiTuoGonShiClick="disposeStatusFun"></xialaHeader>
            <!--   加工状态  分解状态 -->
            <xialaHeader class="mb16" :xialaJson="isJiaGonOffice? fenjiabianmaJson:jiagonzuoyeJson"
                         @weiTuoGonShiClick="prodIdFun"></xialaHeader>
            <!--   组合产品   -->
            <dateHeader width="200" class="mb16" title="期望完成时间" @getTime="qiwanjieshuDate"
                        :qianmiandeData="{placeholder:'请选择期望完成开始时间'}"
                        :houmiande-data="{placeholder:'请选择期望完成结束时间'}"
                        ref="qiwanDate"></dateHeader>
            <!--     期望完成时间   -->
            <dateHeader width="200" class="mb16" title="加工时间" @getTime="jiagonshijianFun"
                        :qianmiandeData="{placeholder:'请选择开始加工时间'}"
                        :houmiande-data="{placeholder:'请选择结束加工时间'}"
                        ref="startDate"></dateHeader>
            <!-- 开始加工时间 -->
        </template>
    </headerKuanJia>
</template>

<script>
    import headerKuanJia from "../../components/commin/headerKuanJia";
    import xialaHeader from "../../components/headerCommin/xialaHeader";
    import dateHeader from "../../components/headerCommin/dateHeader";
    import inputHeader from "../../components/headerCommin/inputHeader";
    import tableCommin from "../../components/commin/tableCommin";
    import pageComponent from "../../components/commin/pageComponent";

    export default {
        name: "processingHeaderIndex",
        components: {
            headerKuanJia,
            xialaHeader,
            dateHeader,
            inputHeader,
            tableCommin,
            pageComponent
        },
        created() {
            this.getTableData()
            let href = window.location.href;
            if (href.includes('processingOffice')) { //加工
                this.isJiaGonOffice = false
                this.sendOutDataJson.orderType = 0
            } else { //拆解
                this.isJiaGonOffice = true
                this.sendOutDataJson.orderType = 1
            }
        },
        data() {
            let zhuangtaiArr = [
                {
                    id: 0,
                    title: "待提交"
                },
                {
                    id: 1,
                    title: "待分配"
                },
                {
                    id: 2,
                    title: "分配中"
                },
                {
                    id: 3,
                    title: "分配成功"
                },
                {
                    id: 4,
                    title: "分配失败"
                },
                {
                    id: 5,
                    title: "已完成"
                },
            ]
            return {
                isJiaGonOffice: false, //默认是加工
                delegationJson: {
                    title: "委托公司",
                    wieTuoGonShiJson: {
                        placeholder: "请选择委托公司",
                        select: "",
                        dropDownBoxData: []
                    },
                    drop: "orgFullName",
                    w320: "w400",
                },
                changpingbianmaJson: {
                    title: '加工作业单号',
                    placeholder: '请输入加工作业单号',
                    input: "",
                    w320: 'w160'
                },
                jiagonzuoyeJson: {
                    title: '加工作业单号',
                    placeholder: '请输入加工作业',
                    input: ""
                },
                fenjiabianmaJson: {
                    title: '分解作业单号',
                    placeholder: '请输入分解作业单号',
                    input: ""
                },
                jiagonzhuangtai: {
                    title: "加工状态",
                    wieTuoGonShiJson: {
                        placeholder: "请选择加工状态",
                        select: "",
                        dropDownBoxData: zhuangtaiArr
                    },
                    drop: "title",
                    w320: 'w160s'
                },
                fenjiezhuangtai: {
                    title: "分解状态",
                    wieTuoGonShiJson: {
                        placeholder: "请选择分解状态",
                        select: "",
                        dropDownBoxData: zhuangtaiArr
                    },
                    drop: "title",
                },
                zhuhechangping: {
                    title: "组合产品",
                    drop: "",
                    wieTuoGonShiJson: {
                        placeholder: "请选择组合产品",
                        select: "",
                        dropDownBoxData: []
                    },
                    w320: 'w160s'
                },
                sendOutDataJson: {
                    orderType: 0,
                    orgId: "", //委托公司id
                    processNo: "",//作业单号(加工、分解)
                    disposeStatus: "",//作业处理状态
                    prodId: "",//组合产品id
                    searchStartTime: "",//期望开始时间
                    searchEndTime: "",//期望结束时间
                    processEndTime: "",//结束加工时间
                    processStartTime: "",//开始加工时间
                }
            }
        },
        methods: {
            jiagonshijianFun(e) {
                this.sendOutDataJson.processEndTime = e.endTime
                this.sendOutDataJson.processStartTime = e.startTime
            },
            qiwanjieshuDate(e) {
                this.sendOutDataJson.searchEndTime = e.endTime
                this.sendOutDataJson.searchStartTime = e.startTime
            },
            //点击查询
            clickQueryUser() {
                this.$emit("clickQuery", this.sendOutDataJson)
            },
            disposeStatusFun(e) {
                //xialaJson="isJiaGonOffice?fenjiezhuangtai :jiagonzhuangtai"
                let json = this.isJiaGonOffice ? this.fenjiezhuangtai : this.jiagonzhuangtai
                this.sendOutDataJson.disposeStatus = json.wieTuoGonShiJson.dropDownBoxData[e || 0].id
            },
            prodIdFun(e) {
                // let json = this.isJiaGonOffice ? this.fenjiabianmaJson : this.jiagonzuoyeJson
                this.sendOutDataJson.prodId = e
            },
            weiTuoGonShiClickFun(e) {
                this.sendOutDataJson.orgId = this.delegationJson.wieTuoGonShiJson.dropDownBoxData[e || 0].orgId
            },
            jiagonzuoyedanhao(e) {
                this.sendOutDataJson.processNo = e
            },
            //点击清空
            clearInputAll() {
                this.sendOutDataJson = {
                    ...this.sendOutDataJson,
                    orgId: "", //委托公司id
                    processNo: "",//作业单号(加工、分解)
                    disposeStatus: "",//作业处理状态
                    prodId: "",//组合产品id
                    searchStartTime: "",//期望开始时间
                    searchEndTime: "",//期望结束时间
                    processEndTime: "",//结束加工时间
                    processStartTime: "",//开始加工时间
                }
                let json = this.isJiaGonOffice ? this.fenjiabianmaJson : this.jiagonzhuangtai
                this.$refs.qiwanDate.clearTime()
                this.$refs.startDate.clearTime()
                this.$emit("clearInput")
            },
            async getTableData() {
                let data = await this.$pOrgProductsApp.pProcessWorkFindRecordPage(this.sendOutDataJson)
                console.log(data)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/btn.scss";

    .bianjiUser {
        @include BtnFunction("success");
    }

    .remove {
        @include BtnFunction("error");
    }

</style>