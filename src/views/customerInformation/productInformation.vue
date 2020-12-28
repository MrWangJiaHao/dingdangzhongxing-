<template>
    <div>

        <div class="fuzzyQueryBoxs clearfix  ">
            <div class="biaogeBox dispalywrap ">
                <xialaHeader :xialaJson="delegationJson" @weiTuoGonShiClick="weiTuoGonShiClick"></xialaHeader>
            </div>
            <div class="btns   btnArrs ">
                <div class="nowrap">
                    <div class="queryBtn inline mr11 zujianBox"   @click="clickQueryUser">
                        查询
                    </div>
                    <div class="clearBtn inline" @click="clearInputAll">清空</div>
                </div>
            </div>
        </div>
        <!--        header top-->
        <div class="btnArr   pd10">
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
    // Heavy
    import {Heavy} from "../../utils/validate";


    export default {
        name: "delegationInformation",
        components: {
            xialaHeader,
            tableCommin,
            pageComponent
        },
        data() {
            let self = this
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
                pageComponentsData: {
                    pageNums: 0
                },
                tableDataJson: {
                    typeData: [
                        {
                            types: "index",
                            label: "序号"
                        },
                        {
                            types: "orgName",
                            label: "委托公司"
                        },
                        {
                            types: "prodCode",
                            label: "产品编码"
                        },
                        {
                            types: "prodName",
                            label: "产品名称"
                        },
                        {
                            types: "specName",
                            label: "产品规格"
                        },
                        {
                            types: "zhonlian",
                            label: "重量"
                        },
                        {
                            types: "tiji",
                            label: "体积"
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
                sendOutDataJson: {
                    pageNumber: 1,
                    pageSize: 10,
                    paras: {
                        id: ""
                    }
                }
            }
        },
        created() {
            this.getTableData()
        },
        computed: {},
        methods: {
            weiTuoGonShiClick(e) {
                this.delegationJson.wieTuoGonShiJson.dropDownBoxData[e || 0].id
                this.sendOutDataJson.paras.id = this.delegationJson.wieTuoGonShiJson.dropDownBoxData[e || 0].id
            },
            clickQueryUser() {
                this.getTableData()
            },
            clearInputAll() {
                this.delegationJson.wieTuoGonShiJson.select = ""
                this.sendOutDataJson.paras.id = ''
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
            orgCityNames(data) {
                return data.orgProName + data.orgCityName + data.orgCountyName
            },
            changeDataRes(json) {
                let {totalRow, list} = json
                list.forEach(item => {
                    item.zhonlian = `${item.prodWeight}${item.prodWeightUnit}`
                    item.tiji = `${item.prodLength}${item.prodLwhUnit}*${item.prodWidth}${item.prodLwhUnit}*${item.prodHeight}${item.prodLwhUnit}`
                })
                this.delegationJson.wieTuoGonShiJson.dropDownBoxData = Heavy(list, "orgName")
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