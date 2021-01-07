<template>
    <div>

        <centerBtnArr title="复核管理"></centerBtnArr>
        <div class="pd10">
            <div class="tableInInput tableBoxCol center" id="purchasingIndexss">
                <tableCommin :tableDataJson="tableDataJson" @clickEvents="clickEventsOuter"
                             @tableSelectArr=
                                     "handleSelectionChangeDatas">
                </tableCommin>
                <div class="pageComponent">
                    <pageComponent :pageComponentsData="pageComponentsData">
                    </pageComponent>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import centerBtnArr from '../../components/centerBtnArr'
    import tableCommin from "../../components/commin/tableCommin";
    import pageComponent from "../../components/commin/pageComponent";

    export default {
        name: "reviewManagement",
        components: {
            centerBtnArr,
            tableCommin,
            pageComponent
        },
        data() {
            return {
                tableDataJson: {
                    typeData: [
                        {
                            types: "selection"
                        },
                        {
                            label: "序号",
                            width: 80,
                            types: "index"
                        },
                        {
                            label: "委托公司",
                            types: "orgNume",
                            width: 100
                        },
                        {
                            label: "渠道",
                            types: "orgNume"
                        },
                        {
                            label: "订单来源",
                            types: "orgNume"
                        },
                        {
                            label: "订单号",
                            types: "订单号"
                        },
                        {
                            label: "子订单号",
                            types: "子订单号"
                        },
                        {
                            label: "复核状态",
                            types: "子订单号"
                        },
                        {
                            label: "物流公司",
                            types: "子订单号"
                        },
                        {
                            label: "物流单号",
                            types: "子订单号"
                        },
                        {
                            label: "拣货人",
                            types: "子订单号"
                        },
                        {
                            label: "拣货开始时间",
                            types: "子订单号"
                        },
                        {
                            label: "拣货完成时间",
                            types: "子订单号"
                        },
                        {
                            label: "复核人员",
                            types: "子订单号"
                        },
                        {
                            label: "复核次数",
                            types: "子订单号"
                        },
                        {
                            label: "复核开始时间",
                            types: "子订单号"
                        },
                        {
                            label: "复核完成时间",
                            types: "子订单号"
                        },
                        {
                            label: "复核照片",
                            types: "子订单号"
                        },
                        {
                            label: "失败原因",
                            types: "子订单号"
                        }
                    ],
                    tabledata: []
                },
                pageComponentsData: {
                    pageNums: 0,
                }
            }
        },
        methods: {
            clickEventsOuter(e) {
            },
            handleSelectionChangeDatas(e) {
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>