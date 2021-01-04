<template>
    <div>
        <div>
            <processingHeader @clickQuery="clickQuery" @clearInput="clearInput"></processingHeader>
        </div>
        <div class="btnArr pd10">
            <div class="backFF flexBetWeen botD1 pd20">
                <div class="meiyiyetitle  pd30">拆解作业</div>
                <div class="displayalign ">
                    <div class="mr10 bianjiUser">创建入库单</div>
                    <div class="mr10 bianjiUser">完成</div>
                    <div class="mr10 bianjiUser">分解排期</div>
                    <div class="mr10 bianjiUser">编辑</div>
                    <div class="remove">删除</div>
                </div>
            </div>
        </div>
        <!-- but按钮 -->
    </div>
</template>

<script>
    /*eslint-disable*/
    import processingHeader from "../../components/processingHeader"
    import tableCommin from "../../components/commin/tableCommin";
    import pageComponent from "../../components/commin/pageComponent";

    export default {
        name: "dismantlingOffice",
        components: {
            processingHeader,
            tableCommin,
            pageComponent
        },
        data() {
            return {
                sendOutDataJson: {
                    pageSize: 10,
                    pageNumber: 1,
                    paras: {
                        orderType: 1
                    }
                }
            }
        },
        created() {
            this.getTableData()
        },
        methods: {
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
                console.log(data)
                if (data.code == '10000') {
                    this._changeData(data.result)
                }
            },
            _changeData(data) {
                let {list, totalRow} = data
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
            }
        }
    }
</script>
