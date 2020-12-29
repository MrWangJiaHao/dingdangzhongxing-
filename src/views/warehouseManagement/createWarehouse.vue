<template>
    <div class="setUserIngBox">
        <div class="setUserIngBoxCenter">
            <kuanjiaClick :titles='editCreateWarehouse ? "编辑出库单" : "创建出库单"'
                          @closeBtn="closeBtn" @clickSubmit="goAJAXCreate" width="1000px">
                <template slot="centerKuanjia">
                    <div class="centerBox ">
                        <div class="setTitle">
                            {{ editCreateWarehouse ? "编辑出库单" : "创建出库单" }}
                        </div>
                        <div class="gerxinxiBox">
                            <div class="xinxiBitian">
                                <div>
                                    <div class="displayalign ellipsis">
                                        <div class="noneIconTitle mr11">委托公司:</div>
                                        <div class="mr20">
                                            <el-select
                                                    v-model="companyJson.value"
                                                    @focus="getCompanyJsonAndArr"
                                                    @change="changeCompany"
                                                    placeholder="请选择委托公司"
                                            >
                                                <el-option
                                                        v-for="(item, idx) in companyJson.companyArr"
                                                        :key="idx"
                                                        :label="item.orgName"
                                                        :value="idx"
                                                >
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <!-- 委托公司 -->
                                <div>
                                    <div class="displayalign ellipsis">
                                        <div class="noneIconTitle mr11">子仓名称:</div>
                                        <div class="mr20">
                                            <el-select
                                                    v-model="createUserData.childWareName"
                                                    @focus="getZiCangJsonAndArr"
                                                    @change="changeziCang"
                                                    placeholder="请选择子仓名称"
                                            >
                                                <el-option
                                                        v-for="(item, idx) in ziCangJson.ziCangArr"
                                                        :key="idx"
                                                        :label="item.childWareName"
                                                        :value="idx"
                                                >
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <!-- 根据委托公司查询子仓 getFindOrgChildWare -->
                                <div>
                                    <div class="displayalign ellipsis">
                                        <div class="noneIconTitle mr11">区域名称:</div>
                                        <div class="mr20">
                                            <el-select
                                                    v-model="createUserData.wareAreaName"
                                                    @focus="getquyuJsonAndArr"
                                                    @change="changequyu"
                                                    placeholder="请选择区域名称"
                                            >
                                                <el-option
                                                        v-for="(item, idx) in quyuJson.quyuArr"
                                                        :key="idx"
                                                        :label="item.wareAreaName"
                                                        :value="idx"
                                                >
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <!-- 期望入库时间 -->
                            </div>
                        </div>
                    </div>
                    <!-- 个人信息 -->
                    <div class="centerBox ">
                        <div class="clearfix">
                            <div class="setTitle fl">产品明细</div>
                            <div class="mb20 fr">
                                <div class="tijiaoBox disinb mr20" @click="addChanpin">
                                    添加产品
                                </div>
                                <div class="remove disinb" @click="goClearRemove">删除</div>
                            </div>
                        </div>
                        <div class="mb20">
                            <el-table
                                    ref="multipleTable"
                                    :data="tabledata"
                                    :stripe="true"
                                    :border="true"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange"
                            >
                                <el-table-column
                                        type="selection"
                                        align="center"
                                        width="82"
                                         fixed="left"
                                ></el-table-column>
                                <el-table-column
                                        label="序号"
                                        type="index"
                                        width="71"
                                        align="center"
                                        show-overflow-tooltip
                                />
                                <el-table-column
                                        label="产品编码"
                                        width="119"
                                        prop="prodCode"
                                        show-overflow-tooltip
                                />
                                <el-table-column
                                        label="产品名称"
                                        width="119"
                                        property="prodName"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        width="119"
                                        label="产品规格"
                                        prop="specName"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="品牌"
                                        width="119"
                                        prop="braName"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="低库存预警值"
                                        width="119"
                                        prop="currInventory"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="推荐库位可用库存"
                                        width="200"
                                        prop="maxNum"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="*申请出库数量"
                                        width="119"
                                        prop="actualProdNum"
                                        show-overflow-tooltip
                                >
                                    <el-input slot-scope="scope" v-model="scope.row.prodNum">
                                    </el-input>
                                </el-table-column>
                                <el-table-column
                                        label="推荐库位"
                                        prop="wareSeatCode"
                                        show-overflow-tooltip
                                        width="180"
                                >
                                    <el-select
                                            slot-scope="scope"
                                            :multiple="true"
                                            v-model="scope.row.wareSeatCode"
                                            placeholder="请选择库位"
                                            @focus="getkuweimes(scope.row, scope.$index)"
                                            @change="kuweiChanges($event, scope.$index, scope.row)"
                                    >
                                        <el-option
                                                v-for="(item, idx) in scope.row.kueirArr"
                                                :key="idx"
                                                :label="item.wareSeatCode"
                                                :value="idx"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>

                    <div class=" ptb20 mb16">
                        <div class="dispalyFlex ">
                            <div class="noneIconTitle mr11 fosi0">
                                <span class="fosi14 visibilityHidden">你好</span>
                                <span class="fosi14">备注</span>
                                <span class="fosi14 visibilityHidden">好</span>
                                <span class="fosi14">:</span>
                            </div>
                            <div class="bzTetxArea">
            <textarea
                    placeholder="请输入备注"
                    v-model="createUserData.remark"
                    maxlength="200"
            ></textarea>
                            </div>
                        </div>
                    </div>
                    <!-- 备注 -->
                </template>
            </kuanjiaClick>
            <!-- 账号信息 -->

            <!-- 添加产品 start -->
            <div v-show="addChanpins" class="bjBox">
                <transition
                        enter-active-class="animate__animated animate__zoomIn"
                        leave-active-class="animate__animated animate__zoomOut"
                >
                    <div v-if="addChanpins" ref="parentSelect">
                        <choiceSelect ref="childSelect"/>
                    </div>
                </transition>
            </div>
            <!-- 添加产品 end -->
        </div>
    </div>
</template>

<script>
    /*eslint-disable */
    import kuanjiaClick from "../../components/commin/kuanjiaClick";

    import searchBox from "../../components/commin/searchBox"; //搜索框
    import dropDowbox from "../../components/commin/dropDownBox"; //下拉框
    import dropDownUserType from "../../components/commin/dropDownUserType"; //用户管理下拉框
    import dateTime from "../../components/commin/dateTime"; //用户管理下拉框
    import {
        getCookie,
        _getArrTarget,
    } from "../../utils/validate";
    import {
        getFindWareOrg,
        getFindOrgChildWare,
        queryAreaOfWS,
        getpOutWarehousefindOutWareDetailById,
        getpOutWarehouseSaveRecord,
        getRecommendSeatByBatchNoAndQualityDate,
    } from "../../api/api";
    import choiceSelect from "../../components/warehouse/choiceSelectCopy";

    export default {
        name: "createUsering",
        components: {
            dropDowbox,
            searchBox,
            dropDownUserType,
            choiceSelect,
            dateTime,
            kuanjiaClick
        },
        data() {
            return {
                companyJson: {
                    companyArr: [],
                    value: "",
                },
                datetimeDate: {
                    placeholder: "请选择预期入库时间",
                },
                multipleSelection: [],
                tabledata: [],
                addChanpins: false,
                ziCangJson: {
                    value: "",
                    ziCangArr: [],
                },
                createUserData: {
                    pageNumber: 1,
                    pageSize: 10,
                    putstatus: "0",
                    disposeStatus: "0", //处理状态
                    expectedSendTime: "", //期望入库时间
                    operatorType: 1,
                    wareId: getCookie("X-Auth-wareId"),
                    childWareId: "",
                    remark: "",
                    wareAreaId: "",
                    wareAreaName: "",
                    orgId: "",
                    orgName: "",
                    childWareName: "",
                    pOutWarehouseDetails: [],
                    prodIds: [],
                    recommendSeatNo: [],
                    outWareType: (() => this.outWareType)(),
                },
                getProvinceData: {
                    parentCode: 0,
                },
                quyuJson: {
                    quyuArr: [],
                },
                prodUnitData: [],
                tables: [],
                rowTables: null,
                kueirArr: [],
                delistIndex: null,
            };
        },
        props: {
            outWareType: {
                type: String,
                default: "",
            },
            editCreateWarehouse: {
                type: Boolean,
                default: false,
            },
        },
        async created() {
            if (this.editCreateWarehouse) {
                let EditData = JSON.parse(sessionStorage.getItem("warehouseEdit"));
                console.log(EditData.wareAreaName);
                this.companyJson.value = EditData.orgName;
                this.createUserData.childWareName = EditData.childWareName;
                this.createUserData.childWareId = EditData.childWareId;
                this.createUserData.id = EditData.id;
                this.createUserData.orgId = EditData.orgId;
                this.createUserData.createUserData = EditData.createUserData;
                this.createUserData.wareName = EditData.wareName;
                this.createUserData.expectedSendTime = EditData.expectedSendTime;
                this._getpOutWarehousefindOutWareDetailById(EditData.id);
            }
            this.tables = eval(sessionStorage.getItem("_addTablesData"));
            if (this.tables) {
                this.tabledata = this.tables;
                this.createUserData.pOutWarehouseDetails = this.tables;
            }
        },
        destroyed() {
            sessionStorage.removeItem("manualManageMentEdit");
            sessionStorage.removeItem("_addTablesData");
        },
        watch: {
            addChanpins(n) {
                if (!n) {
                    this.tables = eval(sessionStorage.getItem("_addTablesData"));
                    if (this.tables) {
                        this.tabledata = this.tables;
                        this.createUserData.pOutWarehouseDetails = this.tables;
                    }
                }
            },
        },
        methods: {
            //获取产品明细
            _getpOutWarehousefindOutWareDetailById(id) {
                getpOutWarehousefindOutWareDetailById(id).then((data) => {
                    this.createUserData.wareAreaId =
                        data.result.tails.pOutWarehouseDetail[0].wareAreaId;
                    this.createUserData.wareAreaName =
                        data.result.tails.pOutWarehouseDetail[0].wareAreaName;
                    this._changeChangPinMinXi(data.result.tails.pOutWarehouseDetail);
                });
            },
            _changeChangPinMinXi(data) {
                this.tabledata = data;
            },
            //点击区域
            getquyuJsonAndArr() {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");
                if (!this.createUserData.childWareId)
                    return this.$messageSelf.message("请选择子仓名称");
                queryAreaOfWS(this.createUserData).then((res) => {
                    if (res.data.code == "10000") {
                        this._changequyuJsonArr(res.data.result);
                    } else {
                        this.$messageSelf.message(res.data.data.msg);
                    }
                });
            },
            _changequyuJsonArr(arr) {
                this.quyuJson.quyuArr = arr;
            },
            //点击区域select
            changequyu(e) {
                this.createUserData.wareAreaId = this.quyuJson.quyuArr[e].id;
                this.createUserData.wareAreaName = this.quyuJson.quyuArr[e].wareAreaName;
                sessionStorage.setItem(
                    "createNabagenentWarehousewareAreaId",
                    this.quyuJson.quyuArr[e].id
                );
            },
            getkuweimes(data, e) {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");
                let datas = eval(sessionStorage.getItem("_addTablesData"));
                if (datas) {
                    this.createUserData.prodIds = _getArrTarget(datas, "prodId");
                }
                this.createUserData.prodIds = [data.prodId];
                getRecommendSeatByBatchNoAndQualityDate({
                    ...this.createUserData,
                }).then((res) => {
                    if (res.code == "10000") {
                        this._changeKuweiS(res.result, data, e);
                        this.$forceUpdate();
                    } else {
                        this.$messageSelf.message(res.msg);
                    }
                });
            },
            kuweiChanges(e, idx, data) {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");

                this.createUserData.pOutWarehouseDetails[
                    this.delistIndex
                    ].recommendSeatId = data.recommendSeatId;

                this.createUserData.pOutWarehouseDetails[this.delistIndex].batchNo =
                    data.batchNo;

                this.createUserData.pOutWarehouseDetails[this.delistIndex].currInventory =
                    data.currInventory;

                this.createUserData.pOutWarehouseDetails[this.delistIndex].minNum =
                    data.minNum;

                this.createUserData.pOutWarehouseDetails[
                    this.delistIndex
                    ].recommendAreaId = data.recommendAreaId;

                this.createUserData.pOutWarehouseDetails[this.delistIndex].wareSeatCode =
                    data.wareSeatCode;

                this.createUserData.pOutWarehouseDetails[
                    this.delistIndex
                    ].recommendAreaName = data.recommendAreaName;

                this.createUserData.pOutWarehouseDetails[this.delistIndex].manufTime =
                    data.manufTime;
            },
            _changeKuweiS(arr, dataJson, e) {
                if (!arr.length)
                    return this.$messageSelf.message("暂时并未有库位，尝试去创建？");
                dataJson.kueirArr = [];
                this.tabledata[e].kueirArr = arr;
                var data = JSON.stringify(this.tabledata);
                this.tabledata = [];
                this.tabledata = JSON.parse(data);

                this.delistIndex = e;
                this.$forceUpdate();
            },
            //点击选择委托公司
            async getCompanyJsonAndArr() {
                // console.log(this.createUserData, "this.createUserData点击委托公司");
                this.createUserData.wareAreaId = "";
                this.createUserData.childWareId = "";
                let datas = await getFindWareOrg();
                this.companyJson.companyArr = datas.result;
            },
            getDateTimeExpectedSendTime(e) {
                this.tabledata[+this.rowTables].expectedSendTime = e;
                this.tabledata[+this.rowTables].manuTime = e;
            },
            getDateTimeIndex(e) {
                this.rowTables = e;
            },
            //改变委托公司
            changeCompany(e) {
                this.createUserData.orgId = this.companyJson.companyArr[e].id;
                this.createUserData.orgName = this.companyJson.companyArr[e].orgName;
            },
            //点击了子仓名称
            async getZiCangJsonAndArr() {
                this.createUserData.wareAreaId = ""; //区域id
                this.createUserData.wareAreaName = ""; //区域name
                this.createUserData.childWareId = ""; //子仓id
                this.createUserData.wareName = "";
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");
                let datas = await getFindOrgChildWare(this.createUserData.orgId);
                this.ziCangJson.ziCangArr = datas.result;
            },
            goClearRemove() {
                this.multipleSelection.forEach((item) => {
                    let idxs = this.tabledata.indexOf(item);
                    this.tabledata.splice(idxs, 1);
                    sessionStorage.setItem(
                        "_addTablesData",
                        JSON.stringify(this.tabledata)
                    );
                });
            },
            //改变了子仓名称
            changeziCang(e) {
                sessionStorage.setItem(
                    "createManagementChildWareId",
                    this.ziCangJson.ziCangArr[e].id
                );
                this.createUserData.wareId = this.ziCangJson.ziCangArr[e].wareId; //仓库id
                this.createUserData.wareName = this.ziCangJson.ziCangArr[e].wareName; //仓库id
                this.createUserData.childWareId = this.ziCangJson.ziCangArr[e].id; //子仓id
                this.createUserData.childWareName = this.ziCangJson.ziCangArr[
                    e
                    ].childWareName; //子仓姓名
            },
            //点击了添加产品
            addChanpin() {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");
                if (!sessionStorage.getItem("createManagementChildWareId"))
                    return this.$messageSelf.message("请选择子仓名称");
                this.addChanpins = true;
                sessionStorage.setItem("orgId", this.createUserData.orgId);
            },
            //关闭
            closeBtn() {
                this.$emit("closeBtns", false);
            },
            handleSelectionChange(e) {
                this.multipleSelection = e;
            },
            //点击了提交
            async goAJAXCreate() {
                if (!this.createUserData.orgId)
                    return this.$messageSelf.message("请选择委托公司");
                if (!this.createUserData.childWareId)
                    return this.$messageSelf.message("请选择子仓名称");
                if (!this.multipleSelection.length)
                    return this.$messageSelf.message("请选择要创建的产品明细");
                this.createUserData.pOutWarehouseDetails = this.multipleSelection;
                let datas = await getpOutWarehouseSaveRecord(this.createUserData);
                if (datas.code == "10000") {
                    this.$messageSelf.message({
                        message: datas.msg,
                        onClose: () => {
                            sessionStorage.removeItem("_addTablesData");
                            sessionStorage.removeItem("createManagementChildWareId");
                            this.$parent.getTableData();
                            this.closeBtn();
                        },
                    });
                }
            },
            getUserType(e) {
                //获取创建的用户类型
                this.createUserData.codeValue = e.codeValue;
                this.createUserData.roleId = e.roleId;
            },
        },
    };
</script>

<style lang='scss' scoped>
    @import "../../assets/scss/btn.scss";

    .setUserIngBox {
        .headerBox {
            height: 50px;
            border-radius: 3px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            position: relative;
            justify-content: space-between;
            background: rgb(236, 241, 247);
            border-bottom: 1px solid #d1d6e2;
        }

        .addChanpinClass {
            position: absolute;
            max-width: 980px;
            z-index: 44;
            overflow: auto;
            background: #f8f8f8;
        }

        .setUserIngBoxCenter {

            max-width: 1000px;
            overflow: auto;

            .centerBox {
                padding: 30px 20px;
            }

            .setTitle {
                margin-bottom: 18px;
            }

            .gerxinxiBox {
                display: flex;
                flex-direction: column;

                > div {
                    margin-bottom: 18px;
                }

                .xinxiBitian {
                    display: flex;
                    align-items: center;

                }
            }

            .cityBoxCenter {
                display: flex;
                align-items: center;
            }
        }

        .textAreaBox {
            font-size: 14px;
            width: 72%;
            height: 40px;
            margin-left: 80px;

            > textarea {
                color: #606266;
                text-indent: 16px;
                line-height: 40px;
                white-space: nowrap;
                overflow: hidden;
            }

            margin-bottom: 30px;
        }

        .bzTetxArea {
            font-size: 14px;
            width: 72%;
            height: 80px;

            > textarea {
                color: #606266;
                text-indent: 16px;
                line-height: 30px;
                overflow: hidden;
            }
        }

        .quxiaoBox {
            border: 1px solid rgb(209, 214, 226);
            @include BtnFunction();
        }

        .tijiaoBox {
            @include BtnFunction("success");
        }
    }
</style>
