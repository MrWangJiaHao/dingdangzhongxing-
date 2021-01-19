<template>
    <div>
        <headerKuanJia @clickQueryUser="clickQueryUser " @clearInputAll="clearInputAll">
            <template>
                <xialaHeader :xialaJson="delegationJson" @weiTuoGonShiClick="weiTuoGonShiClick"></xialaHeader>
                <inputHeader :buhuodanhaoJson="changpingningchengJson"
                             @changereplenishOrderNo="changpintgmingcFun"></inputHeader>
                <inputHeader :buhuodanhaoJson="changpingbianmaJson"
                             @changereplenishOrderNo="changpingbianmaFun"></inputHeader>
                <xialaHeader :xialaJson="changpingguigeJson" @weiTuoGonShiClick="changpingguigeFun"></xialaHeader>
                <xialaHeader :xialaJson="pingpaiJson" @weiTuoGonShiClick="pingpaiFun"></xialaHeader>
                <xialaHeader :xialaJson="zhuheleixingJson" @weiTuoGonShiClick="shuheleixingFun"></xialaHeader>
            </template>
        </headerKuanJia>
        <!-- header top-->
        <div class="btnArr pd10">
            <div class="backFF botD1 pd20">
                <div class="meiyiyetitle pd30">产品信息</div>
            </div>
            <!-- but按钮 -->
        </div>
        <div class="tableBox pd10">
            <div class="tableBoxCol">
                <tableCommin
                        :tableDataJson="tableDataJson"
                />
                <!-- 待补货产品 -->
                <div class="pageComponent">
                    <pageComponent
                            :pageComponentsData="pageComponentsData"
                            @getPageNum="getPageNum"
                            @sureSuccssBtn="sureSuccssBtn"
                    />
                </div>
            </div>
        </div>
        <!-- table-biaoge -->
    </div>
</template>

<script>
    import xialaHeader from "../../components/headerCommin/xialaHeader";
    import tableCommin from "../../components/commin/tableCommin";
    import pageComponent from "../../components/commin/pageComponent";
    import inputHeader from "../../components/headerCommin/inputHeader";
    import {Heavy} from "../../utils/validate";
    import headerKuanJia from "../../components/commin/headerKuanJia";

    export default {
        name: "delegationInformation",
        components: {
            xialaHeader,
            tableCommin,
            pageComponent,
            inputHeader,
            headerKuanJia
        },
        data() {
            return {
                delegationJson: {
                    title: "委托公司",
                    wieTuoGonShiJson: {
                        placeholder: "请选择委托公司",
                        select: "",
                        dropDownBoxData: []
                    },
                    drop: "orgName",
                    w320: "w400",
                },
                changpingguigeJson: {
                    title: '产品规格',
                    wieTuoGonShiJson: {
                        placeholder: '请选择产品规格',
                        input: "",
                        select: "",
                        dropDownBoxData: []
                    },
                    drop: "specName",
                },
                pingpaiJson: {
                    title: '品牌',
                    wieTuoGonShiJson: {
                        placeholder: '请选择品牌',
                        select: "",
                        dropDownBoxData: []
                    },
                    drop: "braName",
                },
                zhuheleixingJson: {
                    title: '组合类型',
                    wieTuoGonShiJson: {
                        placeholder: '请选择组合类型',
                        select: "",
                        dropDownBoxData: []
                    },
                    drop: "prodFullName",
                },
                pageComponentsData: {
                    pageNums: 0
                },
                tableDataJson: {
                    typeData: [
                        {
                            types: "index",
                            label: "序号",
							width:71
                        },
                        {
                            types: "orgName",
                            label: "委托公司",
                            width: 180
                        },
                        {
                            types: "prodCode",
                            label: "产品编码",
                            width: 200
                        },
                        {
                            types: "prodName",
                            label: "产品名称"
                        },
                        {
                            types: "specName",
                            label: "产品规格",
							align:"center"
                        },
                        {
                            types: "zhonlian",
                            label: "重量"
                        },
                        {
                            types: "tiji",
                            label: "体积",
                            width: 200
                        },
                        {
                            types: "braName",
                            label: "品牌"
                        },
                        {
                            types: "qualityDate",
                            label: "保质期"
                        },
                        {
                            types: "prodType",
                            label: "产品类型"
                        },
                        {
                            types: "prodFullName",
                            label: "组合类型"
                        },
                    ],
                    tabledata: []
                },
                changpingningchengJson: {
                    title: '产品名称',
                    placeholder: '请输入产品名称',
                    input: "",
                },
                changpingbianmaJson: {
                    title: '产品编码',
                    placeholder: '请输入产品编码',
                    input: ""
                },

                sendOutDataJson: {
                    pageNumber: 1,
                    pageSize: 10,
                    paras: {
                        id: "",
                        orgId: "",
                        prodName: "",
                        prodCode: "",
                        prodType: "",
                        braId: "",
                        specId: ""
                    }
                }
            }
        },
        created() {
            this.getTableData()
            this.letTables()
        },
        methods: {
            changpintgmingcFun(e) {
                this.sendOutDataJson.paras.prodName = e
            },
            changpingbianmaFun(e) {
                this.sendOutDataJson.paras.prodCode = e
            },
            changpingguigeFun(e) {
                this.sendOutDataJson.paras.specId = this.changpingguigeJson.wieTuoGonShiJson.dropDownBoxData[e || 0].specId
                this.sendOutDataJson.paras.specName = this.changpingguigeJson.wieTuoGonShiJson.dropDownBoxData[e || 0].specName
            },
            pingpaiFun(e) {
                this.sendOutDataJson.paras.braId = this.pingpaiJson.wieTuoGonShiJson.dropDownBoxData[e || 0].braId
            },
            shuheleixingFun(e) {
                this.sendOutDataJson.paras.prodType = this.zhuheleixingJson.wieTuoGonShiJson.dropDownBoxData[e || 0].prodType
            },
            weiTuoGonShiClick(e) {
                this.sendOutDataJson.paras.orgId = this.delegationJson.wieTuoGonShiJson.dropDownBoxData[e || 0].orgId
            },

            clickQueryUser() {
                this.getTableData()
            },
            clearInputAll() {
                this.delegationJson.wieTuoGonShiJson.select = ""
                this.changpingguigeJson.wieTuoGonShiJson.select = ""
                this.pingpaiJson.wieTuoGonShiJson.select = ""
                this.zhuheleixingJson.wieTuoGonShiJson.select = ""
                this.changpingningchengJson.input = ''
                this.changpingbianmaJson.input = ''
                this.sendOutDataJson.paras.id = ''
                this.sendOutDataJson.paras.orgId = ''
                this.sendOutDataJson.paras.prodName = ''
                this.sendOutDataJson.paras.prodCode = ''
                this.sendOutDataJson.paras.specName = ''
                this.sendOutDataJson.paras.prodType = null
                this.sendOutDataJson.paras.braId = ''
                this.sendOutDataJson.paras.specId = ''
                this.getTableData()
            },
            getPageNum(e) {
                this.sendOutDataJson.pageNumber = e
                this.getTableData()
            },
            sureSuccssBtn(e) {
                this.sendOutDataJson.pageNumber = e
                this.getTableData()
            },
            async getTableData() {
                let data = await this.$pOrgProductsApp.pOrgProductsfindRecordPage(this.sendOutDataJson)
                if (data.code == "10000") {
                    this.changeDataRes(data.result)
                } else {
                    this.$messageSelf.message({
                        message: "获取产品信息失败",
                        type: "error"
                    })
                }
            },
            async letTables() {
                let {pageNumber, pageSize} = this.sendOutDataJson
                let json = {
                    pageNumber,
                    pageSize,
                    paras: {}
                }
                let data = await this.$pOrgProductsApp.pOrgProductsfindRecordPage(json)
                if (data.code == "10000") {
                    this.changeDataInputs(data.result)
                } else {
                    this.$messageSelf.message({
                        message: "获取产品信息失败",
                        type: "error"
                    })
                }
            },
            changeDataInputs(json) {
                let {list} = json
                this.delegationJson.wieTuoGonShiJson.dropDownBoxData = Heavy(list, "orgName")
                this.changpingguigeJson.wieTuoGonShiJson.dropDownBoxData = Heavy(list, "specName") //产品规格
                this.pingpaiJson.wieTuoGonShiJson.dropDownBoxData = Heavy(list, "braName") //品牌
                this.zhuheleixingJson.wieTuoGonShiJson.dropDownBoxData = Heavy(list, "prodFullName") //组合类型
            },
            orgCityNames(data) {
                return data.orgProName + data.orgCityName + data.orgCountyName
            },
            changeDataRes(json) {
                let {totalRow, list} = json
                list.forEach(item => {
                    item.zhonlian = `${item.prodWeight}${item.prodWeightUnit}`
                    item.tiji = `${item.prodLength}${item.prodLwhUnit}*${item.prodWidth}${item.prodLwhUnit}*${item.prodHeight}${item.prodLwhUnit}`
                })
                this.tableDataJson.tabledata = list
                this.pageComponentsData.pageNums = totalRow
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/btn.scss";

    .fuzzyQueryBoxs {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: hidden;
        position: relative;
        padding: 20px 30px 4px 30px;
    }

    .fuzzyQueryBox {
        overflow: hidden;

        .line {
            width: 20px;
            height: 2px;
            background: #fff;
            margin-right: 10px;
        }
    }

    .biaogeBox {
        width: 92%;
    }

    .btns {
        width: 8%;
        height: 100%;
        text-align: right;
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;

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

</style>