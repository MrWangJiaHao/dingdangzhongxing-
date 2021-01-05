<template>
    <kuanjiaClick :titles="title" width="1200" @closeBtn="closeBtn" @clickSubmit="clickSubmit">
        <template>
            <div class="w1300">
                <dindanxiangq :title="titles"
                              :detailsArr="isJiaGonOffice?caijieDetailArrs:addDetatilArrs"></dindanxiangq>
                <!--排期-->
                <div>
                    <chanpinmingxi :chanpinminxiJson="zhuheChangeArrJson"
                                   @tableSelectArrs="zhuhechanpinmingxitableSelectArrs"></chanpinmingxi>
                </div>
                <!--组合产品明细-->

                <div>
                    <chanpinmingxi :chanpinminxiJson="zuhechanpinminxiJson"
                                   @tableSelectArrs="zuhechanpinminxiJsontableSelectArrs">
                        <template>
                            <div class="inline mr10 bianjiUser"> {{btnCenters}}</div>
                            <div class="inline remove">删除</div>
                        </template>
                    </chanpinmingxi>
                </div>
                <!--分解作业计划-->
                <div class="mb20 chukuchanpingminxi ">
                    <chanpinmingxi :chanpinminxi-json="chukuchangpinminxiJson"
                                   @tableSelectArrs="chukuchangpinminxiJsontableSelectArrs"></chanpinmingxi>
                </div>
            </div>
        </template>
    </kuanjiaClick>
</template>

<script>
    import kuanjiaClick from "../../components/commin/kuanjiaClick";
    import dindanxiangq from "../../components/commin/dindanxiangq";
    import chanpinmingxi from "../../components/commin/chanpinmingxi";

    export default {
        name: "schedule",
        components: {
            kuanjiaClick,
            dindanxiangq,
            chanpinmingxi
        },
        data() {
            let self = this
            return {
                addDetatilArrs: [
                    {
                        titles: "委托公司",
                        centers: (() => self.scheduleJson.orgName || '未定义')()
                    },
                    {
                        titles: "加工作业单号",
                        centers: (() => self.scheduleJson.processNo || '未定义')()
                    },
                    {
                        titles: "加工作业状态",
                        centers: (() => self.scheduleJson.disposeStatusStr || '未定义')()
                    },
                    {
                        titles: "组合产品",
                        centers: (() => self.scheduleJson.prodName || '未定义')()
                    },
                    {
                        titles: "期望完成时间",
                        centers: (() => self.scheduleJson.planTime || '未定义')()
                    },
                    {
                        titles: "申请加工作业总数",
                        centers: (() => self.scheduleJson.prodNum || '未定义')()
                    },
                    {
                        titles: "已完成作业数",
                        centers: (() => self.scheduleJson.actualProdNum || '未定义')()
                    },
                    {
                        titles: "待加工作业数",
                        centers: (() => self.scheduleJson.prodNum || '未定义')()
                    },
                    {
                        titles: "最大可组合产品数",
                        centers: "10000"
                    }
                ],
                caijieDetailArrs: [
                    {
                        titles: "委托公司",
                        centers: (() => self.scheduleJson.orgName || '未定义')()
                    },
                    {
                        titles: "分解作业单号",
                        centers: (() => self.scheduleJson.processNo || '未定义')()
                    },
                    {
                        titles: "分解作业状态",
                        centers: (() => self.scheduleJson.disposeStatusStr || '未定义')()
                    },
                    {
                        titles: "组合产品",
                        centers: (() => self.scheduleJson.prodName || '未定义')()
                    },
                    {
                        titles: "期望完成时间",
                        centers: (() => self.scheduleJson.planTime || '未定义')()
                    },
                    {
                        titles: "申请分解作业总数",
                        centers: (() => self.scheduleJson.prodNum || '未定义')()
                    },
                    {
                        titles: "已完成作业数",
                        centers: (() => self.scheduleJson.actualProdNum || '未定义')()
                    },
                    {
                        titles: "待分解作业数",
                        centers: (() => self.scheduleJson.otherProdNum || '未定义')()
                    },
                    {
                        titles: "最大可组合产品数",
                        centers: "10000"
                    }
                ],
                isJiaGonOffice: false,
                titles: '',
                btnCenters: "",
                zuhechanpinminxiJson: {
                    title: "加工作业计划",
                    tableDataJsonAndArr: {
                        tabledata: [{}],
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
                                getDateTime() {
                                },
                                w320: '150',
                                dateTimeData: {
                                    placeholder: "请选择开始时间",
                                },
                            },
                            {
                                label: "结束时间",
                                flag: "date",
                                getDateTime() {
                                },
                                w320: '150',
                                dateTimeData: {
                                    placeholder: "请选择结束时间",
                                },
                            },
                            {
                                label: "*加工作业数量",
                                flag: "input",
                                placeholder: "请输入加工作业数量",
                                OnBlur(e) {
                                },
                            },
                            {
                                label: "*分配人数",
                                flag: "input",
                                inputType: 'number',
                                placeholder: "请输入分配人数",
                                OnBlur(e) {
                                },
                            },
                            {
                                label: '实际完成作业数'
                            }
                        ],
                    },
                    selections: []
                },
                zhuheChangeArrJson: {
                    title: "组合产品明细",
                    tableDataJsonAndArr: {
                        tabledata: [{}],
                        typeData: [
                            {
                                label: "序号",
                                types: "index",
                                width: 71
                            },
                            {
                                label: "产品编码",
                                types: "prodCode",
                                width: 150
                            },
                            {
                                label: "产品名称",
                                types: "prodName",
                                width: 250
                            },
                            {
                                label: "产品规格",
                                types: "specName",
                                width: 250
                            },
                            {
                                label: "供应商",
                                types: "orgName",
                                width: 250
                            },
                            {
                                label: "品牌",
                                types: "braName",
                            },
                            {
                                label: "数量",
                                types: "braName",
                            }
                        ]
                    },
                    selections: []
                },
                chukuchangpinminxiJson: {
                    title: "出库产品明细",
                    tableDataJsonAndArr: {
                        tabledata: [{}, {}],
                        typeData: [
                            {
                                types: 'selection'
                            },
                            {
                                label: "序号",
                                width: 71,
                                types: "index"
                            },
                            {
                                label: "产品编码"
                            },
                            {
                                label: "产品名称"
                            },
                            {
                                label: "产品规格"
                            },
                            {
                                label: "品牌"
                            },
                            {
                                label: "低库存预警值",
                                width: 150

                            },
                            {
                                label: "推荐库位可用库存",
                                width: 180

                            },
                            {
                                label: "申请出库数量",
                                width: 170

                            },
                            {
                                label: "推荐库位"
                            }
                        ],
                    },
                    selections: [{}]
                },
                chanpingJson: {}
            }
        },
        created() {
            let self = this
            this.othermsg()
            this.$parent.getDetailDatas(this.scheduleJson.id).then((res) => {
                let {pProcessWork, prodDatas, plans} = res
                self.pProcessWork = pProcessWork
                self.chukuchangpinminxiJson.tableDataJsonAndArr.tabledata = prodDatas
                self.zuhechanpinminxiJson.tableDataJsonAndArr.tabledata = plans
                self.getChuKuChanPin()
            })
        },
        props: {
            title: {
                type: String,
                default: "创建排期"
            },
            scheduleJson: {
                type: Object,
                default: () => {
                }
            }
        },
        methods: {
            async getChuKuChanPin() {
                console.log(this.pProcessWork)
                this.$pOrgProductsApp.getAddfindProdByWares({
                    prodId: this.pProcessWork.prodId,
                    orgId: this.pProcessWork.orgId,
                    prodName: this.pProcessWork.prodName,
                }).then(res => {
                    console.log(res, "产品明细")
                })
            },
            zhuhechanpinmingxitableSelectArrs(e) {
                this.zhuheChangeArrJson.selections = e
            },
            zuhechanpinminxiJsontableSelectArrs(e) {
                this.zuhechanpinminxiJson.selections = e
            },
            chukuchangpinminxiJsontableSelectArrs(e) {
                this.chukuchangpinminxiJson.selections = e
            },
            othermsg() {
                let href = window.location.href;
                if (href.includes('processingOffice')) { //加工
                    this.isJiaGonOffice = false
                    this.titles = '加工排期'
                    this.zuhechanpinminxiJson.title = '加工作业计划'
                    this.btnCenters = '添加作业计划'
                } else { //拆解
                    this.isJiaGonOffice = true
                    this.titles = '拆解排期'
                    this.zuhechanpinminxiJson.title = '分解作业计划'
                    this.btnCenters = '添加分解计划'
                }
            },
            closeBtn() {
                this.$emit('closeBtn', true)
            },
            clickSubmit() {
                let json,
                    plans = this.chukuchangpinminxiJson.selections,
                    prods = this.zuhechanpinminxiJson.selections
                if (!prods.length) return this.$messageSelf.message('请选择要出库产品明细')
                json = {
                    prods,
                    plans,
                    processId: this.scheduleJson.id
                }
                this.$emit('clickSubmit', json)
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
    .chukuchanpingminxi .Colord1d6e2 {
        border-bottom: none;
    }
</style>