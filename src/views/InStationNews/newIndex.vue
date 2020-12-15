<template>
    <div>
        站内消息

    </div>
</template>

<script>
    /* eslint-disable */
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
                xiaoxiDataArr: ["手工创建消息", "渠道创建消息", '预入库消息', "采购消息", "库建调拨消息", "加工作业消息", "分解作业消息", "退货消息", "盘盈消息", "其他消息"]
            }
        },
        created() {
            sessionStorage.setItem("isZhanNeiXiaoXi", "true")
            this.getTable()
        },
        methods: {
            async getTable() {
                let datas = await this.$pOrgProductsApp.pWarehouseStationInfoSaveRecord(this.sendOutDataJson)
                // console.log(datas)

            }
        },
        deactivated() {
            sessionStorage.setItem("isZhanNeiXiaoXi", "false")
        }
}
</script>

<style lang="scss" scoped>

</style>