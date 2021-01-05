<template>
    <div id="creReplen">
        <kuanjiaClick
                :titles="chuanjianJsonAndArr.title"
                @closeBtn="closeBtn"
                min-height="610"
                @clickSubmit="clickSubmit"
        >
            <template slot="centerKuanjia">
                <createMonent :chuanjianJsonAndArr="chuanjianJsonAndArr"/>
                <!-- 创建补货单 -->
                <div class="mb16">
                    <chanpinmingxi
                            :chanpinminxiJson="chanpinminxiJson"
                            @tableSelectArrs="tableSelectArr"
                    >
                        <template slot="anniuBtns">
              <span class="goOn mr11 inline" @click="isAddcreateChanpinShow"
              >添加产品</span
              >
                            <span class="lodopFunClear inline" @click="removeItem">删除</span>
                        </template>
                    </chanpinmingxi>
                </div>
                <!-- 产品明细 -->
                <div class="pd20 mb16">
                    <remarksInput
                            @changeInputs="changeInputs"
                            :searchCenter="searchCenter"
                    />
                </div>
                <!-- 备注 -->
            </template>
        </kuanjiaClick>
        <div v-show="isAddcreateChanpin" class="bjBox">
            <div v-if="isAddcreateChanpin">
                <addTianjiaChanpin :sendoutJson="sendoutJson"/>
            </div>
        </div>
    </div>
</template>

<script>
    /*eslint-disable */
    import kuanjiaClick from "../commin/kuanjiaClick"; //点击架子
    import createMonent from "../commin/createMonent"; //创建上面
    import chanpinmingxi from "../commin/chanpinmingxi"; // 产品明细
    import addTianjiaChanpin from "../goodsShiftingCommin/addTianjiaChanpin"; // 添加产品
    import {
        getEntrustedcompany,
        getFindOrgChildWare,
        queryAreaOfWS,
    } from "../../api/api";
    import remarksInput from "../commin/remarksInput";
    import {
        getCookie,
        removeSessageItem,
        _isJsonEmpty,
        _removeData,
    } from "../../utils/validate";

    export default {
        components: {
            createMonent,
            kuanjiaClick,
            chanpinmingxi,
            addTianjiaChanpin,
            remarksInput,
        },
        data() {
            let self = this;
            return {
                searchCenter: {
                    input: "",
                    chuanjianJsonAndArr: [],
                    placeholder: "请输入备注",
                },
                sendoutJson: {
                    orderSource: 2, //手工创建 补货类型（1-缺货 2-手工创建）
                    disposeStatus: 1, //状态 //（1-待补货 2-补货中 3已补货）
                    orgId: "", //委托商id
                    orgName: "", //委托商姓名
                    childWareId: "", //子仓库id
                    childWareName: "", //子仓库名称
                    remark: "", //备注
                    wareAreaName: "", //区域名称
                    wareAreaId: "", //区域id
                    wareId: getCookie("X-Auth-wareId"),
                    detailList: [],
                    operatorType: (() => (!_isJsonEmpty(this.editDataJson) ? 2 : 1))(), //(1-新增 2-修改 3-补货确认)
                },
                isAddcreateChanpin: false,
                wareAreaCode: "",
                chuanjianJsonAndArr: {
                    title: _isJsonEmpty(this.editDataJson) ? "创建补货单" : "编辑补货单",
                    inputArr: [
                        {
                            title: "委托公司",
                            disabled: false,
                            types: "xiala",
                            select: "",
                            w320: "w320",
                            placeholder: "请选择委托公司",
                            dropDownBoxData: [],
                            drop: "orgName",
                            dropDownXialaClickFun: function () {
                                self.$nextTick(async () => {
                                    let {result} = await getEntrustedcompany();
                                    self.chuanjianJsonAndArr.inputArr[0].dropDownBoxData = result;
                                });
                            },
                            getDropDownChangeDataFun: (res) => {
                                this.sendoutJson.orgId =
                                    self.chuanjianJsonAndArr.inputArr[0].dropDownBoxData[res].id;
                                this.sendoutJson.orgName =
                                    self.chuanjianJsonAndArr.inputArr[0].dropDownBoxData[
                                        res
                                        ].orgName;
                            },
                        },
                        {
                            title: "子仓名称",
                            disabled: false,
                            select: "",
                            types: "xiala",
                            w320: "w150",
                            placeholder: "请选择子仓名称",
                            dropDownBoxData: [],
                            drop: "childWareName",
                            dropDownXialaClickFun: async () => {
                                this.sendoutJson.wareAreaId = "";
                                this.sendoutJson.wareAreaName = "";
                                this.sendoutJson.childWareName = "";
                                this.sendoutJson.childWareId = "";
                                let {orgId} = this.sendoutJson;
                                let {result} = await getFindOrgChildWare(orgId);
                                self.chuanjianJsonAndArr.inputArr[1].dropDownBoxData = result;
                            },
                            getDropDownChangeDataFun: (res) => {
                                this.sendoutJson.childWareId =
                                    self.chuanjianJsonAndArr.inputArr[1].dropDownBoxData[res].id;
                                this.sendoutJson.childWareName =
                                    self.chuanjianJsonAndArr.inputArr[1].dropDownBoxData[
                                        res
                                        ].childWareName;
                            },
                        },
                        {
                            title: "区域名称",
                            disabled: false,
                            select: "",
                            types: "xiala",
                            placeholder: "请选择区域名称",
                            w320: "w150",
                            dropDownBoxData: [],
                            drop: "wareAreaName",
                            dropDownXialaClickFun: async () => {
                                this.sendoutJson.wareAreaId = "";
                                this.sendoutJson.wareAreaName = "";
                                let {childWareId} = this.sendoutJson;
                                let {data} = await queryAreaOfWS({childWareId});
                                self.chuanjianJsonAndArr.inputArr[2].dropDownBoxData =
                                    data.result;
                            },
                            getDropDownChangeDataFun: (res) => {
                                this.sendoutJson.wareAreaId =
                                    self.chuanjianJsonAndArr.inputArr[2].dropDownBoxData[res].id;
                                this.sendoutJson.wareAreaName =
                                    self.chuanjianJsonAndArr.inputArr[2].dropDownBoxData[
                                        res
                                        ].wareAreaName;
                                self.chuanjianJsonAndArr.inputArr[3].input =
                                    self.chuanjianJsonAndArr.inputArr[2].dropDownBoxData[
                                        res
                                        ].wareAreaCode;
                            },
                        },
                        {
                            title: "区域编号",
                            disabled: true,
                            input: "",
                            types: "search",
                            w320: "w150",
                            placeholder: "请输入区域编号",
                        },
                        {
                            title: "补货类型",
                            disabled: true,
                            types: "xiala",
                            select: "手工创建",
                            w320: "w120",
                            dropDownBoxData: [
                                {
                                    value: "手工创建",
                                    orderSource: 2,
                                },
                                {
                                    value: "缺货",
                                    orderSource: 1,
                                },
                            ],
                            drop: "value",
                            placeholder: "请选择区域编号",
                            dropDownXialaClickFun: async () => {
                            },
                            getDropDownChangeDataFun: (res) => {
                                this.sendoutJson.orderSource =
                                    self.chuanjianJsonAndArr.inputArr[2].dropDownBoxData[
                                        res
                                        ].orderSource;
                            },
                        },
                    ],
                },
                chuangjianJson: {}, //创建补货单点击后传出来的json
                chanpinminxiJson: {
                    title: "产品明细",
                    tableDataJsonAndArr: {
                        tabledata: [], //表格data
                        typeData: [
                            {
                                types: "selection",
                                width: 55,
                            },
                            {
                                types: "index",
                                label: "序号",
                                width: 70,
                            },

                            {
                                types: "prodCode",
                                label: "产品编码",
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
                                types: "prodName",
                                label: "存储区库位产品数量",
                                width: 160,
                            },
                            {
                                types: "prodName",
                                label: "存储区最大存放数",
                                width: 160,
                            },
                            {
                                types: "prodName",
                                label: "补货库位产品数量",
                                width: 160,
                            },
                            {
                                types: "prodName",
                                label: "补货预警值",
                                width: 160,
                            },
                            {
                                types: "prodName",
                                label: "最大补货数量",
                                width: 160,
                            },
                            {
                                types: "prodName",
                                label: "*申请补货数量",
                                width: 250,
                                flag: "input",
                                placeholder: "请输入申请补货数量",
                                drop: "wareSeatNo",
                                inputType: "number",
                                OnBlur: (e, data) => {
                                    console.log(e, data);
                                },
                            },
                            {
                                types: "prodName",
                                label: "补货库位",
                                width: 250,
                                flag: "xiala",
                                drop: "wareSeatNo",
                                dropDowBox: {
                                    placeholder: "请选择补货库位",
                                    dropDownBoxData: [],
                                    select: "",
                                },
                                getDropDownData: (e, data) => {
                                    console.log(e, data);
                                },
                                cliclInput: (e) => {
                                    console.log(e.prodSeatList, "补货库位");
                                    this.chanpinminxiJson.tableDataJsonAndArr.typeData[12].dropDowBox.dropDownBoxData =
                                        e.prodSeatList;
                                },
                            },
                            {
                                types: "prodName",
                                width: 250,
                                label: "存储区库位",
                                flag: "xiala",
                                dropDowBox: {
                                    select: "",
                                    placeholder: "请选择存储区库位",
                                    dropDownBoxData: [],
                                },
                                drop: "storageSeatNo",
                                getDropDownData: (e) => {
                                    console.log(e.prodSeatList2);
                                },
                                cliclInput: (e) => {
                                    console.log(e.prodSeatList2, "存储区库位");
                                    this.chanpinminxiJson.tableDataJsonAndArr.typeData[13].dropDowBox.dropDownBoxData =
                                        e.prodSeatList2;
                                },
                            },
                        ], //表头data
                    },
                },
                muitiplites: [],
                _isBuHuoZuoYe: false,
            };
        },
        watch: {
            isAddcreateChanpin(n) {
                if (!n) {
                    this._isTianJiaPinS();
                }
            },
        },
        props: {
            editDataJson: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            moveCreateData: {
                type: Object,
                default: () => {
                    return {};
                },
            },
        },
        created() {
            let href = window.location.href;
            if (href.includes("/moveInLibrary")) {
                this._isBuHuoZuoYe = true;
            } else {
                this._isBuHuoZuoYe = false;
            }
            this._isTianJiaPinS();
            if (!_isJsonEmpty(this.editDataJson)) {
                //来编辑
                this.changeEdits();
            }
        },
        methods: {
            async changeEdits() {
                this.editDataJson.operatorType = !_isJsonEmpty(this.editDataJson) ? 2 : 1;
                this.sendoutJson = Object.assign({}, this.sendoutJson, this.editDataJson);
                let {
                    orgName,
                    childWareName,
                    wareAreaName,
                    wareAreaCode,
                } = this.sendoutJson;
                this.chuanjianJsonAndArr.inputArr[0].select = orgName;
                this.chuanjianJsonAndArr.inputArr[1].select = childWareName;
                this.chuanjianJsonAndArr.inputArr[2].select = wareAreaName;
                this.chuanjianJsonAndArr.inputArr[3].input = wareAreaCode;
                this._getdetailsChanPin();
            },
            async _getdetailsChanPin() {
                let data = await this.$pOrgProductsApp.pReplenishOrderFindRecord({
                    id: this.editDataJson.id,
                });
                this.chanpinminxiJson.tableDataJsonAndArr.tabledata =
                    data.result[0].detailList;
                console.log(data);
            },
            changeInputs(e) {
                this.sendoutJson.remark = e;
            },
            removeItem() {
                _removeData(
                    this.chanpinminxiJson.tableDataJsonAndArr.tabledata,
                    this.muitiplites
                );
            },
            tableSelectArr(e) {
                this.muitiplites = e;
            },
            _isTianJiaPinS() {
                let data = JSON.parse(sessionStorage.getItem("tianjiachanpings"));
                this.chanpinminxiJson.tableDataJsonAndArr.tabledata = data;
                return data;
            },
            isAddcreateChanpinShow() {
                let {orgName, childWareName, wareAreaName} = this.sendoutJson;
                if (!orgName)
                    return this.$messageSelf.message({
                        message: "请选择委托公司",
                        type: "warning",
                    });
                if (!childWareName)
                    return this.$messageSelf.message({
                        message: "请选择子仓名称",
                        type: "warning",
                    });
                if (!wareAreaName)
                    return this.$messageSelf.message({
                        message: "请选择区域名称",
                        type: "warning",
                    });
                this.isAddcreateChanpin = true;
            },
            closeBtn() {
                this.$emit("closeFn", false);
            },
            async clickSubmit() {
                if (!this.muitiplites.length)
                    return this.$messageSelf.message({
                        message: "请选择要添加的产品明细",
                        type: "warning",
                    });
                this.sendoutJson.detailList = this.muitiplites;

                if (this._isBuHuoZuoYe) {
                    this.$emit("clickSubmit", this.sendoutJson);
                } else {
                    this._buhuozuoye();
                    removeSessageItem("tianjiachanpings");
                }
            },
            async _buhuozuoye() {
                let data = await this.$pOrgProductsApp.pReplenishOrderSaveRecord(
                    this.sendoutJson
                );
                if (data.code == "10000") {
                    this.$messageSelf.message({messge: data.msg, type: "success"});
                    this.closeBtn();
                } else {
                    this.$messageSelf.message({message: data.msg, type: "error"});
                }
            },
        },
    };
</script>

<style lang='scss'>
    @import "../../assets/scss/btn.scss";

    .goOn {
        @include BtnFunction("success");
    }

    .lodopFunClear {
        @include BtnFunction("error");
    }

    #creReplen .el-input__inner {
        height: 28px;
    }

    #creReplen .dropDownBox .input_box {
        height: 28px;
    }

    #creReplen .el-input__icon {
        line-height: 28px;
    }
</style>