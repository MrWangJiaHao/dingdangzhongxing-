<template>
    <div>
        <processingHeader @clickQuery="clickQuery" @clearInput="clearInput"></processingHeader>

        <centerBtnArr title="拆解作业" :btnArr="btnArr"></centerBtnArr>

        <div class="pd10">
            <div class="tableInInput tableBoxCol center" id="purchasingIndexss">
                <tableCommin :tableDataJson="tableDataJson" @tableSelectArr=
                        "handleSelectionChangeDatas">
                    <template>
                        <div id="tableCenters" class="tableInInput">
                            <tableCommin :tableDataJson="xiaodeDataJson"></tableCommin>
                        </div>
                    </template>
                </tableCommin>
                <div class="pageComponent ">
                    <pageComponent :pageComponentsData="pageComponentsData">
                    </pageComponent>
                </div>
            </div>
        </div>
        <!--  table 内容   -->
        <!-- 加工排期 start-->
        <div v-show="isShowChedule" class="bjBox">
            <transition enter-active-class="animate__animated animate__zoomIn"
                        leave-active-class="animate__animated animate__zoomOut">
                <div v-if="isShowChedule">
                    <schedule :title="title" :scheduleJson="scheduleJson" @closeBtn="closeBtn"
                              @clickSubmit="clickSubmit"></schedule>
                </div>
            </transition>
        </div>
        <!-- 加工排期 end-->
        <div class="bjBox" v-if="isShowwareOut">
            <createManagement></createManagement>
        </div>
        <!--入库单-->
    </div>
</template>

<script>
    /*eslint-disable*/
    import processingHeader from "../../components/processingHeader"
    import tableCommin from "../../components/commin/tableCommin";
    import pageComponent from "../../components/commin/pageComponent";
    import centerBtnArr from '../../components/centerBtnArr'
    import schedule from "./schedule";
    import createManagement from "../wareHouseIngManagement/createManagement";

    export default {
        name: "dismantlingOffice",
        components: {
            processingHeader,
            tableCommin,
            pageComponent,
            centerBtnArr,
            schedule,
            createManagement
        },
        data() {
            let self = this
            return {
                title: "分解排期",
                isShowChedule: false,
                isShowwareOut: false,
                scheduleJson: {},
                btnArr: [
                    {
                        title: "创建入库单",
                        onClick() {
                            console.log(self)
                        },
                        class: "mr10 bianjiUser"
                    },
                    {
                        title: "完成",
                        onClick() {
                        },
                        class: "mr10 bianjiUser"
                    },
                    {
                        title: "分解排期",
                        onClick() {
                            if (!self.tableDataJson.dataResult.length
                                ||
                                self.tableDataJson.dataResult.length != 1) return self.$messageSelf.message({
                                type: 'warning',
                                message: "请选择要排期的列表,并且只能选择一个"
                            })
                            self.scheduleJson = self.tableDataJson.dataResult[0]
                            self.isShowChedule = true
                        },
                        class: "mr10 bianjiUser"
                    },
                    {
                        title: "编辑",
                        onClick() {

                        },
                        class: "mr10 bianjiUser"
                    },
                    {
                        title: "删除",
                        onClick() {

                        },
                        class: "remove"
                    }
                ],
                tableDataJson: {
                    typeData: [
                        {
                            types: 'selection'
                        },
                        {
                            label: "展开",
                            width: 71,
                            types: "expand"
                        },
                        {
                            label: "序号",
                            width: 71,
                            types: "index"
                        },
                        {
                            types: "orgName",
                            label: "委托公司",
                            width: 100
                        },
                        {
                            types: "processNo",
                            label: "分解作业单号",
                            width: 260
                        },
                        {
                            types: "prodName",
                            label: "组合产品",
                            width: 100
                        },

                        {
                            label: "分解状态",
                            types: 'disposeStatusStr',
                            width: 100
                        }, {
                            label: "分解作业总数",
                            width: 140,
                            types: 'prodNum'
                        }, {
                            label: "已完成数量",
                            width: 130,
                            types: "actualProdNum",

                        }, {
                            label: "未完成数量",
                            types: "otherProdNum",
                            width: 130
                        }, {
                            types: 'planTime',
                            label: "期望完成时间",
                            width: 200
                        }, {
                            label: "开始加工时间",
                            types: 'actualStartTime',
                            width: 200
                        },
                        {
                            types: 'actualEndTime',
                            label: "实际完成时间",
                            width: 200
                        }
                    ],
                    tabledata: [],
                    dataResult: []
                },
                xiaodeDataJson: {
                    typeData: [
                        {
                            types: 'selection'
                        },
                        {
                            label: "序号",
                            width: 80,
                            types: "index"
                        },
                        {
                            label: "开始时间",
                            flag: "date",
                            dateTimeData: {
                                placeholder: "请选择开始时间",
                                w320: "w150"
                            },
                            getDateTime(res) {
                                console.log(res)
                            }
                        },
                        {
                            label: "结束时间",
                        },
                        {
                            label: "分解作业数量",
                        },
                        {
                            label: "分配人数",
                        },
                        {
                            label: "实际完成分解数",
                        },
                        {
                            label: "出库单号",
                        },
                        {
                            label: "入库单号",
                        }],
                    tabledata: [],
                    dataResult: []
                },
                sendOutDataJson: {
                    pageSize: 10,
                    pageNumber: 1,
                    paras: {
                        orderType: 1
                    }
                },
                pageComponentsData: {
                    pageNums: 0,
                }
            }
        },
        created() {
            this.getTableData()
        },
        methods: {
            handleSelectionChangeDatas(e) {
                this.tableDataJson.dataResult = e
            },
            async getDetailDatas(id) {
                let data = await this.$pOrgProductsApp.pProcessWorkWarePlanFindRecord({id})
                if (data.code == "10000") {
                    this._changeDataInner(data.result)
                } else {
                    this.$messageSelf.message({
                        type: "error",
                        message: "获取详情失败"
                    })
                }
                return data.result
            },
            _changeDataInner(json) {
                let {prodDatas} = json
                this.xiaodeDataJson.tabledata = prodDatas
            },
            _changeDataInner(json) {
                let {prodDatas} = json
                this.xiaodeDataJson.tabledata = prodDatas
            },
            closeBtn() {
                this.isShowChedule = false
            },
            clickSubmit(json) {
                console.log(json)
                // this.isShowChedule = false
            },
            clickQuery(e) {
                let json = Object.assign({}, this.sendOutDataJson, e)
                this.sendOutDataJson.paras = json
                this.getTableData()
            },
            clearInput(e) {
                let json = Object.assign({}, this.sendOutDataJson.paras, e)
                this.sendOutDataJson.paras = json
                this.getTableData()
            },
            async getTableData() {
                let data = await this.$pOrgProductsApp.pProcessWorkFindRecordPage(this.sendOutDataJson)
                if (data.code == '10000') {
                    this._changeData(data.result)
                } else {
                    this.$messageSelf.message({
                        type: 'info',
                        messages: "获取table数据失败"
                    })
                }
            },
            _changeData(data) {
                let {list, totalRow} = data
                list.forEach(item => {
                    // item.lackProds = item.lackProd ? '是' : '否'
                    item.disposeStatusStr = this._disposeStatusChange(item.disposeStatus)
                    item.otherProdNum = +item.prodNum - +item.actualProdNum
                    item.actualProdNum = `${item.actualProdNum}`
                })
                this.tableDataJson.tabledata = list
                this.pageComponentsData.pageNums = totalRow
            },
            _disposeStatusChange(str) {
                switch (str) {
                    case 0:
                        return "待提交"
                        break;
                    case 1:
                        return "待分配"
                        break;
                    case 2:
                        return "分配中"
                        break;
                    case 3:
                        return "分配成功"
                        break;
                    case 4:
                        return "分配失败"
                        break;
                    case 5:
                        return "已完成"
                        break;
                    default :
                        return "未定义"
                        break
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/btn.scss";

    .bianjiUser {
        @include BtnFunction("success");
    }

    .el-table__expand-icon--expanded {
        transform: rotate(180deg);
    }

    .el-table__expand-icon
    .el-icon.el-icon-arrow-right::before {
        content: "+";
    }

    .el-table__expand-icon.el-table__expand-icon--expanded
    .el-icon.el-icon-arrow-right::before {
        content: " ";
        display: inline-block;
        width: 8px;
        height: 0.5px;
        background: #2f4646;
        position: relative;
        top: -8px;
    }

    .remove {
        @include BtnFunction("error");
    }

    #tableCenters .el-table {
        border: none !important;
    }

    #purchasingIndexss .el-table__expanded-cell {
        border-right: none !important;
    }

</style>