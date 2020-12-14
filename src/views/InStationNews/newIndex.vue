<template>
    <div>
        站内消息

    </div>
</template>

<script>
    //(0-手工创建；1-渠道创建 2-预入库 3-采购 4-库建调拨 5-加工作业 6-分解作业 7-退货 8-盘盈 9-其他）
    export default {
        name: "newIndex",
        data() {
            return {
                sendOutDataJson: {
                    pageSize: 10,
                    pageNumber: 1,
                    paras: {}
                },
                xiaoxiDataArr: ["手工创建", "渠道创建", '预入库', "采购", "库建调拨", "加工作业", "分解作业", "退货", "盘盈", "其他"]
            }
        },
        created() {
            this.getTable()
        },
        methods: {
            async getTable() {
                let datas = await this.$pOrgProductsApp.pWarehouseStationInfoSaveRecord(this.sendOutDataJson)
                console.log(datas)

            }
        },
    }
</script>

<style lang="scss" scoped>

</style>