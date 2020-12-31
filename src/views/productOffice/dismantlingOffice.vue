<template>
    <div>
        <div>
            <processingHeader @clickQuery="clickQuery"></processingHeader>
        </div>
        <div class="btnArr pd10">
            <div class="backFF flexBetWeen botD1 pd20">
                <div class="meiyiyetitle  pd30">拆解作业</div>
                <div class="displayalign ">
                    <div class="mr10 bianjiUser">创建入库单</div>
                    <div class="mr10 bianjiUser">完成</div>
                    <div class="mr10 bianjiUser">分解排期</div>
                    <div class="mr10 bianjiUser">编辑</div>
                    <div class="remove">删除</div>
                </div>
            </div>
        </div>
        <!-- but按钮 -->
    </div>
</template>

<script>
    import processingHeader from "../../components/processingHeader"
    import tableCommin from "../../components/commin/tableCommin";
    import pageComponent from "../../components/commin/pageComponent";

    export default {
        name: "dismantlingOffice",
        components: {
            processingHeader,
            tableCommin,
            pageComponent
        },
        data() {
            return {
                sendOutDataJson: {
                    pageSize: 10,
                    pageNumber: 1,
                    paras: {
                        orderType: 1
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

<style lang="scss" scoped>

</style>