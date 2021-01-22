<template>
    <kuanjiaClick
            titles="添加产品"
            @closeBtn="closeBtn"
            @clickSubmit="goAJAXCreate"
            width="1100"
    >
        <template slot="centerKuanjia">
            <div style="width: 1100px">
                <div id="creReplensss">

                    <createMonent :chuanjianJsonAndArr="chuanjianJsonAndArr">
                        <template>
                            <div class="setTitle mtb20 pd20">
                                选择产品
                            </div>
                        </template>
                        <template slot="btnsArr">
                            <div class="dispalyFlex mb16">
                                <span class="tijiaoBox inline mr11">查询</span>
                                <span class=" quxiaoBox inline" @click="clearInputs">
                  清空
                </span>
                            </div>
                        </template>
                    </createMonent>
                </div>

                <!-- 上部分 -->
                <div class="disspaceBetween pd20 mt20">
                    <div class="setTitle ">
                        产品明细
                    </div>
                    <span class="remove mb20 inline" @click="removeTarget">删除</span>
                </div>
                <div class="pd20   ">
                    <table-commin
                            :tableDataJson="tableDataJson"
                            @tableSelectArr="tableSelectArr"
                    ></table-commin>
                    <div class="tr pageComponent mb16 pd20">
                        <pageComponent
                                :pageComponentsData="pageComponentsData"
                                @sureSuccssBtn="sureSuccssBtn"
                                @handleSizeChange="handleSizeChange"
                                @getPageNum="getPageNum"
                        ></pageComponent>
                    </div>
                </div>
            </div>
        </template>
    </kuanjiaClick>
</template>

<script>
    /* eslint-disable */
    import createMonent from "../commin/createMonent"; //创建上面
    import kuanjiaClick from "../commin/kuanjiaClick"; //点击架子
    import TableCommin from "../commin/tableCommin.vue";
    import pageComponent from "../commin/pageComponent";

    export default {
        props: {
            sendoutJson: {
                type: Object,
                default: () => {
                },
            },
        },
        data() {
            return {
                chuanjianJsonAndArr: {
                    inputArr: [
                        {
                            title: "产品编码",
                            types: "search",
                            input: "",
                            placeholder: "请输入产品编码",
                            w320: "w150",
                        },
                        {
                            title: "产品名称",
                            types: "search",
                            input: "",
                            placeholder: "请输入产品名称",
                            w320: "w150",
                        },
                        {
                            title: "产品规格",
                            types: "xiala",
                            select: "",
                            w320: "w150",
                            placeholder: "请选择产品规格",
                            dropDownXialaClickFun() {
                            },
                            getDropDownChangeDataFun() {
                            },
                        },
                    ],
                },
                pageComponentsData: {
                    pageNums: 10,
                    sizes: true,
                },
                tableDataJson: {
                    tabledata: [], // 表格数据
                    typeData: [
                        {
                            types: "selection",
                        },
                        {
                            types: "index",
                            label: "序号",
                            width: 70,
                        },
                        {
                            types: "prodCode",
                            label: "产品编码",
                            width: 200,
                        },
                        {
                            types: "prodName",
                            label: "产品名称",
                        },
                        {
                            types: "specName",
                            label: "产品规格",
                        },
                        {
                            types: "braName",
                            label: "品牌",
                        },
                        {
                            types: "currInventory",
                            label: "仓库可用库存",
                        },
                    ], //表头数据
                },
                sendoutJsonData: {
                    pageNumber: 1,
                    pageSize: 10,
                    paras: {},
                },
                multiputes: [],
            };
        },
        components: {
            kuanjiaClick,
            createMonent,
            pageComponent,
            TableCommin,
        },
        created() {
            this._tableDataArrs();
            this._hrefDatas();
        },
        computed: {
            //委托公司
            _inputArrMoveInLibrary() {
                return [
                    {
                        title: "委托公司",
                        types: "search",
                        input: "",
                        placeholder: "请选择委托公司",
                        w320: "w320",
                    },
                    {
                        title: "产品编码",
                        types: "search",
                        input: "",
                        placeholder: "请输入产品编码",
                        w320: "w160",
                    },
                    {
                        title: "产品名称",
                        types: "search",
                        input: "",
                        placeholder: "请输入产品名称",
                        w320: "w160",
                    },
                    {
                        title: "产品规格",
                        types: "xiala",
                        select: "",
                        placeholder: "请选择产品规格",
                        dropDownXialaClickFun() {
                        },
                        getDropDownChangeDataFun() {
                        },
                        w320: "w160",
                    },
                ];
            },
            //产品明细，table
            _changpingmingxiData() {
                return [
                    {
                        types: "selection",
                    },
                    {
                        types: "index",
                        label: "序号",
                        width: 70,
                    },
                    {
                        types: "orgName",
                        label: "委托公司",
                    },
                    {
                        types: "prodCode",
                        label: "产品编码",
                        width: 200,
                    },
                    {
                        types: "prodName",
                        label: "产品名称",
                    },
                    {
                        types: "specName",
                        label: "产品规格",
                    },
                    {
                        types: "braName",
                        label: "品牌",
                    },
                    {
                        types: "currInventory",
                        label: "销售仓可用库存",
                    },
                ];
            },
        },
        methods: {
            _hrefDatas() {
                let _href = window.location.href;
                if (_href.includes("/moveInLibrary")) {
                    this.chuanjianJsonAndArr.inputArr = this._inputArrMoveInLibrary;
                    this.tableDataJson.typeData = this._changpingmingxiData;
                }
            },
            clearInputs() {
                this.chuanjianJsonAndArr.inputArr[0].input = "";
                this.chuanjianJsonAndArr.inputArr[1].input = "";
                this.chuanjianJsonAndArr.inputArr[2].select = "";
            },
            closeBtn() {
                this.$parent._data.isAddcreateChanpin = false;
            },
            async _tableDataArrs() {
                let {result} = await this.$pOrgProductsApp.findReplienshProductPagePost(
                    this.sendoutJsonData
                );
                this.tableDataJson.tabledata = result.list;
                return result.list;
            },
            tableSelectArr(e) {
                this.multiputes = e;
            },
            sureSuccssBtn(e) {
                this.sendoutJsonData.pageNumber = e;
            },
            handleSizeChange(e) {
                this.sendoutJsonData.pageSize = e;
            },
            getPageNum(e) {
                this.sendoutJsonData.pageNumber = e;
            },
            removeTarget() {
                this._removeData(this.tableDataJson.tabledata, this.multiputes);
            },
            //删除data
            _removeData(data, target) {
                data = data || [];
                target = target || [];
                target.forEach((item) => {
                    let idx = data.indexOf(item);
                    data.splice(idx, 1);
                });
                sessionStorage.setItem("tianjiachanpings", JSON.stringify(data));
                return data;
            },
            //点击了提交
            goAJAXCreate() {
                if (!this.multiputes.length)
                    return this.$messageSelf.message({
                        message: "请选择要提交的产品明细",
                        type: "warning",
                    });
                sessionStorage.setItem(
                    "tianjiachanpings",
                    JSON.stringify(this.multiputes)
                );
                this.$emit("clickSubmitFun", this.multiputes);
                this.closeBtn();
            },
        },
    };
</script>
<style lang='scss' scoped>
    @import "../../assets/scss/btn.scss";


    .quxiaoBox {
        @include BtnFunction();
    }


    .tijiaoBox {
        @include BtnFunction("success");
    }
</style>