<template>
    <div>
        <processingHeader @clickQuery="clickQuery" @clearInput="clearInput"></processingHeader>
        <!-- 头部-->
        <centerBtnArr title="加工作业" :btnArr="btnArr">
        </centerBtnArr>
        <!-- but按钮 -->

        <div class="pd10">
            <div class="tableInInput tableBoxCol center" id="purchasingIndexss">
                <tableCommin :tableDataJson="tableDataJson" @clickEvents="clickEventsOuter"
                             @tableSelectArr=
                                     "handleSelectionChangeDatas">
                    <template>
                        <div id="tableCenters" class="tableInInput">
                            <tableCommin :tableDataJson="xiaodeDataJson"></tableCommin>
                        </div>
                    </template>
                </tableCommin>
                <div class="pageComponent">
                    <pageComponent :pageComponentsData="pageComponentsData">
                    </pageComponent>
                </div>
            </div>
        </div>
        <!-- table - center -->

        <!-- 加工排期 start-->
        <div v-show="isShowChedule" class="bjBox">
            <transition enter-active-class="animate__animated animate__zoomIn"
                        leave-active-class="animate__animated animate__zoomOut">
                <div v-if="isShowChedule">
                    <schedule :title="title"
                              :scheduleJson="scheduleJson"
                              @closeBtn="closeBtn"
                              @clickSubmit="clickSubmit"></schedule>
                </div>
            </transition>
        </div>
        <!-- 加工排期 end-->
        <!-- 创建入库单 start-->
        <div class="bjBox" v-if="isShowwareOut">
            <createManagement :orderId="paiqiId" @closeFun="closeCreate"></createManagement>
        </div>
        <!-- 创建入库单 end -->

        <!--采购单 start-->
        <div class="bjBox" v-if="isShowShop">
            <createPurchasing :isCankuzuoye="true" @closeFn="purchasingClose"></createPurchasing>
        </div>
        <!--采购单 end-->
        <div class="bjBox" v-if="zichankudetails">
            <warehouseSure @closeDetails="closeChuKuFun" :isLooker="true"></warehouseSure>
        </div>
        <!--出库-->
        <div class="bjBox" v-if="manageMentrukuSureShow">
            <manageMentrukuSure @closeFun="closeFunSure" :isLooker="true"></manageMentrukuSure>
        </div>
        <!--入库-->
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
    import createPurchasing from "../purchasingManagement/createPurchasing";
    import {getCookie, _getArrTarget} from "../../utils/validate";
    import warehouseSure from "../warehouseManagement/warehouseSure"; //出库单号
    import manageMentrukuSure from "../wareHouseIngManagement/manageMentrukuSure"; //入库单号

    export default {
        name: "processingOffice",
        components: {
            processingHeader,
            tableCommin,
            pageComponent,
            centerBtnArr,
            schedule,
            createManagement,
            createPurchasing,
            warehouseSure,
            manageMentrukuSure
        },
        data() {
            let self = this
            return {
                title: "加工排期",
                isShowChedule: false,// 加工排期
                isShowwareOut: false, //入库单
                isShowShop: false,//转采购
                zichankudetails: false, //出库
                manageMentrukuSureShow: false, //入库
                paiqiId: "",
                isEdit: false,
                btnArr: [
                    {
                        title: "创建入库单",
                        onClick() {
                            if (!self.tableDataJson.dataResult.length || self.tableDataJson.dataResult.length != 1) return self.$messageSelf.message({
                                type: 'warning',
                                message: "请选择要排期的列表,并且只能选择一个"
                            })
                            self.paiqiId = self.tableDataJson.dataResult[0].id
                            self.isShowwareOut = true
                        },
                        class: "mr10 bianjiUser"
                    },
                    {
                        title: "转采购",
                        onClick() {
                            if (!getCookie("X-Auth-wareId")) return this.$messageSelf.message("该登入员没有创建权限");
                            self.isShowShop = true
                        },
                        class: "mr10 bianjiUser"
                    },
                    {
                        title: "完成",
                        onClick() {
                            if (!self.tableDataJson.dataResult.length) return self.$messageSelf.message({
                                type: "warning",
                                message: "请选择要强制完成的列表"
                            })
                            let arr = _getArrTarget(self.tableDataJson.dataResult, 'id')
                            self._otherWancheng({ids: arr})
                        },
                        class: "mr10 bianjiUser"
                    },
                    {
                        title: "加工排期",
                        onClick() {
                            if (!self.tableDataJson.dataResult.length
                                ||
                                self.tableDataJson.dataResult.length != 1) return self.$messageSelf.message({
                                type: 'warning',
                                message: "请选择要排期的列表,并且只能选择一个"
                            })
                            self.scheduleJson = self.tableDataJson.dataResult[0]
                            self.isShowChedule = true
                            self.isEdit = false
                        },
                        class: "mr10 bianjiUser"
                    },
                    {
                        title: "编辑",
                        onClick() {
                            if (!self.tableDataJson.dataResult.length
                                ||
                                self.tableDataJson.dataResult.length != 1) return self.$messageSelf.message({
                                type: 'warning',
                                message: "请选择要编辑的列表,并且只能选择一个进行编辑"
                            })
                            self.scheduleJson = self.tableDataJson.dataResult[0]
                            self.isShowChedule = true
                            self.isEdit = true
                        },
                        class: "mr10 bianjiUser"
                    },
                    {
                        title: "删除",
                        onClick() {
                            if (!self.tableDataJson.dataResult.length) return self.$messageSelf.message({
                                type: "warning",
                                message: "请选择要删除的的列表"
                            })
                            let arr = _getArrTarget(self.tableDataJson.dataResult)
                            self._delData({ids: arr})
                        },
                        class: "remove"
                    }
                ],
                xiaodeDataJson: {
                    tabledata: [{inWareNo: "asdasdsa", outWareNo: "asdasda"}],
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
                            drop: "startTime",
                            dateTimeData: {
                                placeholder: "请选择开始时间",
                                disabled: true,
                                w320: "w150",
                            },
                            getDateTime() {
                            }
                        },
                        {
                            label: "结束时间",
                            flag: "date",
                            drop: "endTime",
                            dateTimeData: {
                                placeholder: "请选择开始时间",
                                disabled: true,
                                w320: "w150",
                            },
                            getDateTime() {
                            }
                        },
                        {
                            label: "加工作业数量",
                            flag: "input",
                            drop: "prodNum",
                            disabled: true
                        },
                        {
                            label: "分配人数",
                            flag: "input",
                            drop: "userNum",
                            disabled: true
                        },
                        {
                            label: "实际完成作业数",
                            types: 'actualProdNum'
                        },
                        {
                            label: "出库单号",
                            types: "inWareNo",
                            flag: 'puton',
                            OnClicks: (res) => {
                                console.log(res)
                                self.zichankudetails = true
                            }
                        },
                        {
                            label: "入库单号",
                            types: "outWareNo",
                            flag: 'puton',
                            OnClicks: (res) => {
                                console.log(res)
                                self.manageMentrukuSureShow = true
                            }
                        }
                    ],
                    dataResult: []
                },
                scheduleJson: {},
                tableDataJson: {
                    tabledata: [],
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
                            label: "加工作业单号",
                            width: 260
                        },
                        {
                            types: "prodName",
                            label: "组合产品",
                            width: 100
                        },
                        {
                            types: 'lackProds',
                            label: "是否缺货",
                            width: 100,
                            align: 'center'
                        },
                        {
                            label: "加工状态",
                            types: 'disposeStatusStr',
                            width: 100
                        }, {
                            label: "加工作业总数",
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
                        },
                    ],
                    dataResult: []
                },
                pageComponentsData: {
                    pageNums: 0,
                },
                sendOutDataJson: {
                    pageSize: 10,
                    pageNumber: 1,
                    paras: {
                        orderType: 0
                    }
                },
            }
        },
        created() {
            this.getTableData()
        },
        methods: {
            closeFunSure() {
                this.manageMentrukuSureShow = false
            },
            closeChuKuFun() {
                this.zichankudetails = false
            },
            purchasingClose() {
                this.isShowShop = false
            },
            //点击了入库单是关闭
            closeCreate() {
                this.isShowwareOut = false
            },
            //外面的
            handleSelectionChangeDatas(e) {
                this.tableDataJson.dataResult = e
            },
            clickEventsOuter(e) {
                console.log(e)
                this.getDetailDatas(e.id)
            },
            closeBtn() {
                this.isShowChedule = false
            },
            //提交
            clickSubmit(json) {
                if (this.isEdit) { //是编辑
                    this._editpProcessWorkWarePlanEditRecordFun(json).then(res => {
                        this.$messageSelf.isCode10000(res, res.msg, res.msg, () => {
                            this.isShowChedule = false
                        })
                    })
                } else {
                    this.$pOrgProductsApp.pProcessWorkWarePlanSaveRecord(json).then(res => {
                        if (res.code === '10000') {
                            this.isShowChedule = false
                            this.$messageSelf.message(res.msg)
                        } else {
                            this.$messageSelf.message(res.msg)
                        }
                    })
                }
            },
            clickQuery(e) {
                let json = Object.assign({}, this.sendOutDataJson.paras, e)
                this.sendOutDataJson.paras = json
                this.getTableData()
            },
            clearInput(e) {
                let json = Object.assign({}, this.sendOutDataJson.paras, e)
                this.sendOutDataJson.paras = json
                this.getTableData();
            },
            async getDetailDatas(id) {
                let data = await this.$pOrgProductsApp.pProcessWorkWarePlanFindRecord({id})
                this.xiaodeDataJson.tabledata = []
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
            async getTableData() {
                let data = await this.$pOrgProductsApp.pProcessWorkFindRecordPage(this.sendOutDataJson)
                if (data.code == '10000') {
                    this._changeData(data.result)
                } else {
                    this.$messageSelf.message(data.msg)
                }
            },
            _changeData(json) {
                let {list, totalRow} = json
                list.forEach(item => {
                    item.lackProds = item.lackProd ? '是' : '否'
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
            },
            async _editpProcessWorkWarePlanEditRecordFun(json) {
                let data = await this.$pOrgProductsApp.pProcessWorkWarePlanEditRecord(json)
                if (data.code === '10000') {
                    this.$messageSelf.message({
                        type: "success",
                        message: data.msg
                    })
                } else {
                    this.$messageSelf.message({
                        type: "error",
                        message: data.msg
                    })
                }
            },
            _delData(arr) {
                this.$messageSelf.confirms(this.$clearArr(arr.ids), "提示", {
                    type: "warning"
                }).then(async () => {
                    let data = await this.$pOrgProductsApp.pProcessWorkWarePlanDelRecord(arr)
                    if (data.code == "10000") {
                        this.$messageSelf.message({
                            type: "success",
                            message: "删除成功"
                        })
                    } else {
                        this.$messageSelf.message({
                            type: "error",
                            message: data.msg
                        })
                    }
                }).catch(err => err)
            },
            _otherWancheng(arr) {
                this.$messageSelf.confirms(this.$clearArr(arr.ids, "强制完成"), "提示", {
                    type: "info"
                }).then(async () => {
                    let data = await this.$pOrgProductsApp.pProcessWorkProcessFinish(arr)
                    if (data.code == "10000") {
                        this.$messageSelf.message({
                            type: "success",
                            message: "强制完成成功"
                        })
                    } else {
                        this.$messageSelf.message({
                            type: "error",
                            message: data.msg
                        })
                    }
                }).catch(err => err)
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
        color: #000;
        font-size: 16px;
        font-weight: bold;
    }

    .el-table__expand-icon.el-table__expand-icon--expanded
    .el-icon.el-icon-arrow-right::before {
        content: "";
          display:  inline-block;
          width:  8px;
          height:  2px;
          background:   #000;
          line-height:  20px;
          position:  absolute;
          top:  10px;
          left:  27px;
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