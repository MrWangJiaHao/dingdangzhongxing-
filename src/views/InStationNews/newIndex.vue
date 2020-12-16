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
                <!--标题-->
                <inputHeader :buhuodanhaoJson="centerHaoJson"></inputHeader>
                <!--内容-->
                <dateHeader title="接收时间" :qianmiandeData="{placeholder:'请选择开始接收时间'}"
                            :houmiandeData="{placeholder:'请选择结束的接收时间'}"></dateHeader>
                <!--接受时间-->
                <xialaHeader :xialaJson="stationJson"></xialaHeader>
                <!--消息状态-->
            </template>
        </headerKuanjia>
        <!--header-->
        <innerCenter title="查询结果">
        </innerCenter>
        <!--  内容  -->
        <div class="plr10">
            <div class="ptd1620 innerCenterTable">
                <tableCommin :tableDataJson="tableDataJson"></tableCommin>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import headerKuanjia from "../../components/commin/headerKuanJia"
    import inputHeader from "../../components/headerCommin/inputHeader"; //input
    import dateHeader from "../../components/headerCommin/dateHeader"; //dateInput
    import xialaHeader from "../../components/headerCommin/xialaHeader"; //xialaHeader
    import innerCenter from "../../components/innerCenter"; //table上部分
    import tableCommin from "../../components/commin/tableCommin";

    export default {
        name: "newIndex",
        components: {
            headerKuanjia,
            inputHeader,
            dateHeader,
            xialaHeader,
            innerCenter,
            tableCommin
        },
        data() {
            let slef = this
            return {
                sendOutDataJson: {
                    pageSize: 10,
                    pageNumber: 1,
                    paras: {}
                },
                xiaoxiDataArr: ["全部消息", "手工创建消息",
                    "渠道创建消息", '预入库消息', "采购消息", "库建调拨消息",
                    "加工作业消息", "分解作业消息", "退货消息", "盘盈消息", "其他消息"]
                , index: 0,
                titleshoushuoJson: {
                    placeholder: "请输入标题",
                    title: "标题"
                },
                stationJson: {
                    title: "消息状态",
                    wieTuoGonShiJson: {
                        placeholder: "请选择消息状态"
                    },
                    drop: "",
                    w320: "w160",
                },
                centerHaoJson: {
                    placeholder: "请输入内容",
                    title: "内容"
                },
                tableDataJson: {
                    tabledata: [],
                    typeData: [
                        {
                            types: "index",
                            label: "序号",
                            width: 71
                        },
                        {
                            types: "title",
                            label: "标题"
                        },
                        {
                            types: "content",
                            label: "内容"
                        }, {
                            types: "acceptTime",
                            label: "接受时间"
                        }, {
                            types: "infoType",
                            label: "消息类型"
                        }, {
                            types: "enableStatus",
                            label: "消息状态",
                        }
                    ]
                }
            }
        },

        created() {
            this.getTable()
        },
        methods: {
            async getTable(fn) {
                let datas = await this.$pOrgProductsApp.pWarehouseStationInfoSaveRecord(this.sendOutDataJson)
                fn && fn()
                console.log(datas)
                this.changeData(datas.result)
            },
            changeData(data) {
                let {list, totalRow} = data
                list.forEach(item => {
                    console.log(this._changeleixing(item.infoType))
                    item.infoType = this._changeleixing(item.infoType)
                })
                this.tableDataJson.tabledata = list
                console.log(list, totalRow)
            },
            _changeleixing(leixin) {
                let arr = ["手工创建消息",
                        "渠道创建消息", '预入库消息', "采购消息", "库建调拨消息",
                        "加工作业消息", "分解作业消息", "退货消息", "盘盈消息", "其他消息"],
                    str
                arr.forEach((item, idx) => {
                    if (leixin == idx) {
                        str = item
                    }
                })
                return str
            },
            clickOuter(i) {
                if (i - 1 < 0) {
                    this.sendOutDataJson.paras.infoType = null;
                } else {
                    this.sendOutDataJson.paras.infoType = i - 1
                }
                this.getTable()
                return this.index = i
            }
        },
    }
</script>

<style lang="scss" scoped>
    .btnArrCenter {
        padding: 16px 30px 0 30px;
        border-bottom: 1px solid #D1D6E2;
    }

    .innerCenterTable {
        background: #fff;
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