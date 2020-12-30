<template>
    <div>
        <div>
            <processingHeader @clickQuery="clickQuery"></processingHeader>
        </div>
        <!-- 头部-->
        <div class="btnArr pd10">
            <div class="backFF flexBetWeen botD1 pd20">
                <div class="meiyiyetitle  pd30">加工作业</div>
                <div class="displayalign ">
                    <div class="mr10 bianjiUser">创建入库单</div>
                    <div class="mr10 bianjiUser">转采购</div>
                    <div class="mr10 bianjiUser">完成</div>
                    <div class="mr10 bianjiUser">加工排期</div>
                    <div class="mr10 bianjiUser">编辑</div>
                    <div class="remove">删除</div>
                </div>
            </div>
        </div>
        <!-- but按钮 -->
        <div class="pd10">
            <div class="tableInInput tableBoxCol ">
                <tableCommin :tableDataJson="tableDataJson"></tableCommin>
                <div class="pageComponent ">
                    <pageComponent></pageComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import processingHeader from "../../components/processingHeader"
    import tableCommin from "../../components/commin/tableCommin";
    import pageComponent from "../../components/commin/pageComponent";
    // import {Heavy} from "../../utils/validate";

    export default {
        name: "processingOffice",
        components: {
            processingHeader,
            tableCommin,
            pageComponent
        },
        data() {
            return {
                tableDataJson: {
                    tabledata: [],
                    typeData: [
                        {
                            types: 'selection'
                        }, {
                            label: "序号",
                            width: 71,
                            types: "index"
                        },
                        {
                            label: "委托公司",
                            width: 100
                        },
                        {
                            label: "加工作业单号",
                            width: 140

                        },
                        {
                            label: "组合产品",
                            width: 100
                        },
                        {
                            label: "是否缺货",
                            width: 100
                        },
                        {
                            label: "是否缺货",
                            width: 100
                        }, {
                            label: "加工状态",
                            width: 100
                        }, {
                            label: "加工作业总数",
                            width: 140

                        }, {
                            label: "已完成数量",
                            width: 130

                        }, {
                            label: "未完成数量",
                            width: 130

                        }, {
                            label: "期望完成时间",

                        }, {
                            label: "开始加工时间",
                        },
                        {
                            label: "实际完成时间",
                        },
                    ]
                },
                sendOutDataJson: {
                    pageSize: 10,
                    pageNumber: 1,
                    paras: {
                        orderType: 0

                    }
                }
            }
        },
        created() {
            this.getTableData()
        },
        methods: {
            clickQuery(e) {
                let json = Object.assign({}, this.sendOutDataJson, e)
                this.sendOutDataJson.paras = json
            },
            async getTableData() {
                let data = await this.$pOrgProductsApp.pProcessWorkFindRecordPage(this.sendOutDataJson)
                console.log(data)
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/btn.scss";

    .bianjiUser {
        @include BtnFunction("success");
    }

    .remove {
        @include BtnFunction("error");
    }

</style>