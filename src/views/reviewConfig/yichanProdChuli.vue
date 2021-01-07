<template>
    <div>
        <centerBtnArr title="异产区产品处理" :isShowIdx="true" :btnArr="btnArr"></centerBtnArr>
        <div class="tableInInput tableBoxCol center">
            <tableCommin :tableDataJson="tableDataJson"></tableCommin>
        </div>

    </div>
</template>

<script>
    import centerBtnArr from '../../components/centerBtnArr'
    import tableCommin from "../../components/commin/tableCommin";

    export default {
        name: "yichanProdChuli",
        components: {
            centerBtnArr,
            tableCommin
        },
        data() {
            return {
                btnArr: [
                    {
                        title: "打印异常清单",
                        onClick: () => {

                        },
                        class: "bianjiUser"
                    }
                ],
                tableDataJson: {
                    typeData: [
                        {
                            types: "selection"
                        },
                        {
                            label: "序号",
                            types: 'index',
                            width: 71
                        },
                        {
                            label: "委托公司",
                        },
                        {
                            label: '产品编号'
                        },
                        {
                            label: '产品名称'
                        },
                        {
                            label: '产品规格'
                        },
                        {
                            label: '数量'
                        },
                        {
                            label: '拣货区域'
                        },
                        {
                            label: '拣货货架'
                        },
                        {
                            label: '层'
                        },
                        {
                            label: '拣货库位编号'
                        },
                        {
                            label: '明细'
                        }
                    ],
                    tabledata: []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>