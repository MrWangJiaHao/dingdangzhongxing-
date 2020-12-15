<template>
    <div>
        <div class=" btnArrCenter  ">
            <div class="clickArrOuter" v-for="(item,idx) in xiaoxiDataArr" :key="idx" @click="clickOuter(idx)"
                 :class="idx===index?'active':''">
                {{item}}
            </div>
        </div>
        <!--  btn arr -->
        <headerKuanjia>
            <template slot="biaoBoxCenter">
                <inputHeader :buhuodanhaoJson="titleshoushuoJson"></inputHeader>
                <inputHeader></inputHeader>
                <dateHeader></dateHeader>
                <xialaHeader></xialaHeader>
            </template>
        </headerKuanjia>

    </div>
</template>

<script>
    /* eslint-disable */
    import headerKuanjia from "../../components/commin/headerKuanJia"
    import inputHeader from "../../components/headerCommin/inputHeader"; //input
    import dateHeader from "../../components/headerCommin/dateHeader"; //dateInput
    import xialaHeader from "../../components/headerCommin/xialaHeader"; //xialaHeader

    //(0-手工创建；1-渠道创建 2-预入库 3-采购 4-库建调拨 5-加工作业 6-分解作业 7-退货 8-盘盈 9-其他）
    export default {
        name: "newIndex",
        components: {
            headerKuanjia,
            inputHeader,
            dateHeader,
            xialaHeader
        },
        data() {
            let slef = this
            return {
                sendOutDataJson: {
                    pageSize: 10,
                    pageNumber: 1,
                    paras: {}
                },
                xiaoxiDataArr: ["手工创建消息",
                    "渠道创建消息", '预入库消息', "采购消息", "库建调拨消息", "加工作业消息", "分解作业消息", "退货消息", "盘盈消息", "其他消息"]
                , index: 0,
                titleshoushuoJson: {}
            }
        },
        created() {
            sessionStorage.setItem("isZhanNeiXiaoXi", "true")
            this.getTable()
        },
        methods: {
            async getTable() {
                let datas = await this.$pOrgProductsApp.pWarehouseStationInfoSaveRecord(this.sendOutDataJson)
                console.log(datas)

            },
            clickOuter(i) {
                this.sendOutDataJson.paras.infoType = i
                this.getTable()
                return this.index = i
            }
        },
        deactivated() {
            sessionStorage.setItem("isZhanNeiXiaoXi", "false")
        },

    }
</script>

<style lang="scss" scoped>
    .btnArrCenter {
        padding: 16px 30px 0 30px;
        border-bottom: 1px solid #D1D6E2;

    }

    .clickArrOuter {
        width: 113px;
        height: 34px;
        text-align: center;
        display: inline-block;
        margin-right: 20px;
        line-height: 34px;
        border-radius: 4px;
        border: 1px solid #D1D6E2;
        background: #fff;
        border-bottom: none;
        color: #333333;
        cursor: pointer;
        user-select: none;
    }

    .active {
        background: #599AF4;
        color: #fff;
    }
</style>