<template>
    <div>
        <div class="btnArrCenter displayalign">
            <div
                    class="clickArrOuter nowrap"
                    v-for="(item, idx) in xiaoxiDataArr"
                    :key="idx"
                    @click="clickOuter(idx)"
                    :class="idx === index ? 'active' : ''"
            >
                {{ item }}
            </div>
        </div>
        <!--  btn arr -->

        <div class="fuzzysss clearfix  ">
            <div class="biaogeBox fl inline dispalywrap ">
                <inputHeader :buhuodanhaoJson="titleshoushuoJson" ref="titleInputs"
                             @changereplenishOrderNo="titleInput"></inputHeader>
                <!--标题-->
                <inputHeader :buhuodanhaoJson="centerHaoJson" ref="centerInputs"
                             @changereplenishOrderNo="centerInput"></inputHeader>
                <!--内容-->
                <dateHeader
                        title="接收时间"
                        :qianmiandeData="{ placeholder: '请选择开始接收时间' }"
                        :houmiandeData="{ placeholder: '请选择结束的接收时间' }"
                        @getTime="jieshouTime"
                        ref="jieshouTimes"
                ></dateHeader>
                <!--接受时间-->
                <xialaHeader ref="xiaoxiZhuanTais" @weiTuoGonShiClick="xiaoxiZhuantai"
                             :xialaJson="stationJson"></xialaHeader>
                <!--消息状态-->
            </div>

            <div class="btns fr inline btnArrs ">
                <div class="nowrap">
                    <div class="queryBtn inline mr11 zujianBox"   @click="clickQueryUser">
                        查询
                    </div>
                    <div class="clearBtn inline" @click="clearInputAll">清空</div>

                </div>
            </div>
        </div>
        <innerCenter title="查询结果"></innerCenter>
        <!--  内容  -->
        <div class="plr10">
            <div class="ptd1620 innerCenterTable">
                <tableCommin :tableDataJson="tableDataJson" @clickEvents="clickEvents"></tableCommin>
                <div class="pageComponent">
                    <pagecomponent :pageComponentsData="pageComponentsData"
                                   @getPageNum="getPageNum"
                                   @sureSuccssBtn="sureSuccssBtn"></pagecomponent>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .fuzzysss {
        overflow: hidden;
        position: relative;
        padding: 20px 30px 4px 30px;
    }
</style>
<script>
    /* eslint-disable */
    import headerKuanjia from "../../components/commin/headerKuanJia";
    import inputHeader from "../../components/headerCommin/inputHeader"; //input
    import dateHeader from "../../components/headerCommin/dateHeader"; //dateInput
    import xialaHeader from "../../components/headerCommin/xialaHeader"; //xialaHeader
    import innerCenter from "../../components/innerCenter"; //table上部分
    import tableCommin from "../../components/commin/tableCommin";
    import pagecomponent from "../../components/commin/pageComponent"; //分页器

    export default {
        name: "newIndex",
        components: {
            headerKuanjia,
            inputHeader,
            dateHeader,
            xialaHeader,
            innerCenter,
            tableCommin,
            pagecomponent
        },
        data() {
            let self = this;
            return {
                sendOutDataJson: {
                    pageSize: 10,
                    pageNumber: 1,
                    paras: {},
                },
                xiaoxiDataArr: [
                    "全部消息",
                    "手工创建消息",
                    "渠道创建消息",
                    "预入库消息",
                    "采购消息",
                    "库建调拨消息",
                    "加工作业消息",
                    "分解作业消息",
                    "退货消息",
                    "盘盈消息",
                    "其他消息",
                ],
                index: 0,
                titleshoushuoJson: {
                    placeholder: "请输入标题",
                    title: "标题",
                    input: ""
                },
                pageComponentsData: {
                    pageNums: 0, //一共多少条 //默认一页10条
                },
                stationJson: {
                    title: "消息状态",
                    wieTuoGonShiJson: {
                        placeholder: "请选择消息状态",
                        dropDownBoxData: [
                            {
                                title: "未读",
                                id: 0
                            },
                            {
                                title: "已读",
                                id: 1
                            }
                        ],
                        select: ""
                    },
                    drop: "title",
                    w320: "w160",
                },
                centerHaoJson: {
                    placeholder: "请输入内容",
                    title: "内容",
                    input: ""
                },
                tableDataJson: {
                    tabledata: [],
                    typeData: [
                        {
                            types: "index",
                            label: "序号",
                            width: 71,
                        },
                        {
                            types: "title",
                            label: "标题",
                            width: 300
                        },
                        {
                            types: "content",
                            label: "内容",
                            width: 600
                        },
                        {
                            types: "acceptTime",
                            label: "接受时间",
                            width: 200
                        },
                        {
                            types: "infoType",
                            label: "消息类型",
                            width: 200
                        },
                        {
                            types: "enableStatus",
                            label: "消息状态",
                            align: "center",
                            flag: "radio",
                        },
                    ],
                },
            };
        },

        created() {
            this.getTable();
        },
        watch: {
            $route() {
                this.getTable()
            }
        },
        methods: {
            async getTable(fn) {
                let datas = await this.$pOrgProductsApp.pWarehouseStationInfoSaveRecord(
                    this.sendOutDataJson
                );
                fn && fn();
                this.changeData(datas.result);
            },
            clickEvents(row) {
                sessionStorage.setItem("isZhanneixiaoxi", false)
                row.infoType = this._changeleixing(row.infoType, false)
                this.$router.push({
                    path: "/InStationNews/newCenter",
                    query: {
                        data: JSON.stringify(row)
                    }
                })
            },
            xiaoxiZhuantai(e) {
                this.sendOutDataJson.paras.enableStatus = e
            },
            clickQueryUser() {
                this.getTable();
            },
            clearInputAll() {
                this.sendOutDataJson = {
                    pageSize: 10,
                    pageNumber: 1,
                    paras: {},
                }
                this.centerHaoJson.input = ''
                this.titleshoushuoJson.input = ''
                this.stationJson.wieTuoGonShiJson.select = ""
                this.$refs.jieshouTimes.clearTime()
                this.getTable();

            },
            getPageNum(e) {
                this.sendOutDataJson.pageNumber = e;
                this.getTable();
            },
            sureSuccssBtn(e) {
                this.sendOutDataJson.pageNumber = e;
                this.getTable();
            },
            titleInput(e) {
                this.sendOutDataJson.paras.title = e
            },
            centerInput(e) {
                this.sendOutDataJson.paras.content = e
            },
            jieshouTime(e) {
                this.sendOutDataJson.paras.acceptStartTime = e.startTime
                this.sendOutDataJson.paras.acceptEndTime = e.endTime
            },
            changeData(data) {
                let {list, totalRow} = data;
                list.forEach((item) => {
                    item.infoType = this._changeleixing(item.infoType);
                });
                this.pageComponentsData.pageNums = totalRow
                this.tableDataJson.tabledata = list;
            },
            _changeleixing(leixin, isIdxShow = true) {
                let arr = [
                        "手工创建消息",
                        "渠道创建消息",
                        "预入库消息",
                        "采购消息",
                        "库建调拨消息",
                        "加工作业消息",
                        "分解作业消息",
                        "退货消息",
                        "盘盈消息",
                        "其他消息",
                    ],
                    str;
                arr.forEach((item, idx) => {
                    if (leixin == idx && isIdxShow) {
                        str = item
                    } else if (leixin == item && !isIdxShow) {
                        str = idx
                    }
                });
                return str;
            },
            clickOuter(i) {
                if (i - 1 < 0) {
                    this.sendOutDataJson.paras.infoType = null;
                } else {
                    this.sendOutDataJson.paras.infoType = i - 1;
                }
                this.getTable();
                return (this.index = i);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .btnArrCenter {
        padding: 16px 30px 0 30px;
        border-bottom: 1px solid #d1d6e2;
    }

    .innerCenterTable {
        background: #fff;
    }

    .clickArrOuter:last-child {
        margin-right: 0px;
    }

    .clickArrOuter {
        width: 113px;
        height: 34px;
        text-align: center;
        display: inline-block;
        margin-right: 20px;
        line-height: 34px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border: 1px solid #d1d6e2;
        background: #fff;
        border-bottom: none;
        color: #333333;
        cursor: pointer;
        user-select: none;
    }

    .active {
        background: #599af4;
        color: #fff;
    }
</style>