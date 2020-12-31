<template>
    <div>
        <div class="mb16">
            <div class="fuzzyQueryBoxs clearfix mb16 ">
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
        </div>

        <!--        header top-->
        <div class="btnArr   pd10">
            <div class="backFF botD1 pd20">
                <div class="meiyiyetitle pd30">委托公司</div>
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
    import {Heavy} from "../../utils/validate";


    export default {
        name: "delegationInformation",
        components: {
            xialaHeader,
            tableCommin,
            pageComponent
        },
        data() {
            // let self = this
            return {
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
                            types: "orgFullName",
                            label: "委托公司"
                        },
                        {
                            types: "orgContact",
                            label: "联系人"
                        },
                        {
                            types: "orgContactPhone",
                            label: "联系电话"
                        },
                        {
                            types: "prodName",
                            label: "公司地址"
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
                let data = await this.$pOrgProductsApp.pOrgfindRecordPage(this.sendOutDataJson)
                console.log(data)
                if (data.code == "10000") {
                    this.changeDataRes(data.result)
                } else {
                    this.$messageSelf.message({
                        message: "获取委托公司失败",
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
                    let prodNumber = this.orgCityNames(item)
                    item.prodName = prodNumber
                })
                this.delegationJson.wieTuoGonShiJson.dropDownBoxData = Heavy(list, "orgFullName")
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