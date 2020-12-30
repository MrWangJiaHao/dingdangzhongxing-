<template>
    <div>
        <div class="setUserIngBoxCenter">
            <kuanjiaClick :titles='!edif ? "编辑采购单" : "创建采购单"' @closeBtn="closeBtn" @clickSubmit="goAJAXCreate">
                <template slot="centerKuanjia">

                    <div class="p20 botD1 ">
                        <div class="setTitle">
                            {{ !edif ? "编辑采购单" : "创建采购单" }}
                        </div>
                        <div class="gerxinxiBox">
                            <div class="xinxiBitian">
                                <div>
                                    <div class="displayalign ellipsis">
                                        <div class="noneIconTitle mr11">
                                            <span class="colred">*</span>
                                            委托公司:
                                        </div>
                                        <div class="mr20">
                                            <el-select
                                                    class="w400"
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
                                        <div class="noneIconTitle mr11">
                                            <span class="colred">*</span>期望到货时间:
                                        </div>
                                        <div class="mr20">
                                            <dateTime
                                                    :dateTimeData="datetimeDate"
                                                    @getDateTime="getexpectedArrivalTime"
                                                    :valueDataStart="createUserData.expectedArrivalTime"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <!-- 期望到货时间 getFindOrgChildWare -->
                            </div>
                            <div class="dispalyFlex mb20">
                                <div class="noneIconTitle mr11">
                                    <span class="colred">*</span>
                                    <span>备</span>
                                    <span class="visibilityHidden">你好</span>
                                    <span class="">注</span>
                                    :
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
                    </div>
                    <!-- 个人信息 -->
                    <div class="p20 " id="bjTableWraper">
                        <div class="clearfix">
                            <div class="setTitle fl">产品明细</div>
                            <div class="mb20 fr">
                                <div class="tijiaoBox disinb mr20" @click="addChanpin">
                                    添加产品
                                </div>
                                <div class="quxiaoBox disinb" @click="goClearRemove">删除</div>
                            </div>
                        </div>
                        <div class="mb20 tableInInput">
                            <el-table
                                    ref="multipleTable"
                                    :data="tabledata"
                                    :stripe="true"
                                    :border="true"
                                    tooltip-effect="dark"
                                    @selection-change="handleSelectionChange"
                            >
                                <el-table-column
                                        type="selection"
                                        width="82"
                                        fixed="left"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        label="序号"
                                        align="center"
                                        type="index"
                                        width="71"
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
                                        label="销售仓可用库存"
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
                                        label="高库存预警值"
                                        width="119"
                                        prop="maxNum"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="*申请采购数量"
                                        width="119"
                                        prop="prodNum"
                                        show-overflow-tooltip
                                >
                                    <el-input slot-scope="scope" v-model="scope.row.prodNum">
                                    </el-input>
                                </el-table-column>
                                <el-table-column
                                        label="*期望到货时间"
                                        prop="recommendSeatNo"
                                        show-overflow-tooltip
                                        width="260"
                                >
                                    <div slot-scope="scope" @click="tablesClickDatas(scope.$index)">
                                        <dateTime
                                                :dateTimeData="datetimeDate"
                                                @getDateTime="getQiWanDaoHuoshijian"
                                                :valueDataStart="scope.row.expectedArrivalTime"
                                        />
                                    </div>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <!-- 账号信息 -->
                </template>
            </kuanjiaClick>
            <!-- btn -->

            <!-- 添加产品 start -->
            <div v-if="addChanpins" class="bjBox">
                <transition
                        enter-active-class="animate__animated animate__zoomIn"
                        leave-active-class="animate__animated animate__zoomOut"
                >
                    <div v-if="addChanpins">
                        <choiceSelect @tables="GETtables"/>
                    </div>
                </transition>
            </div>
            <!-- 添加产品 end -->
        </div>
    </div>
</template>

<script>
    /*eslint-disable */
    import dateTime from "../../components/commin/dateTime"; //用户管理下拉框
    import kuanjiaClick from "../../components/commin/kuanjiaClick";

    import {getCookie, _isJsonEmpty} from "../../utils/validate";
    import {
        getFindWareOrg,
        getpPurchaseOrdersaveRecord,
        getppPurchaseOrderFindRecord,
    } from "../../api/api";
    import choiceSelect from "../../components/purchasingZhujian/choiceSelect";

    export default {
        name: "createUsering",
        components: {
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
                    placeholder: "期望到货时间",
                },
                multipleSelection: [],
                tabledata: [],
                addChanpins: false,
                ziCangJson: {
                    value: "",
                    ziCangArr: [],
                },
                createUserData: {
                    putstatus: "0",
                    disposeStatus: "0", //采购状态
                    wareId: getCookie("X-Auth-wareId"),
                    remark: "",
                    wareAreaId: "",
                    wareAreaName: "",
                    orgId: "",
                    orgName: "",
                    childWareName: "",
                    expectedArrivalTime: "", //期望到货时间
                    recommendSeatNo: [],
                    id: (() => {
                        return !this.edif ? this.editDataJson.id : "";
                    })(), //编辑
                },
                tables: [],
                edif: false,
                tableIdx: null,
            };
        },
        props: {
            editDataJson: {
                type: Object,
                default: () => {
                },
            },
        },
        async created() {
            this.edif = _isJsonEmpty(this.editDataJson);
            if (!this.edif) {
                this.changeEditData();
            }
        },
        mounted() {
            this.tabledata = JSON.parse(sessionStorage.getItem("allProduct"));
        },
        beforeDestroy() {
            sessionStorage.removeItem("allProduct");
        },
        methods: {
            _addTablesData() {
                this.tables = eval(sessionStorage.getItem("_addTablesData"));
                if (this.tables) {
                    this.tabledata = this.tabledata.concat(this.tables);
                    this.createUserData.detailList = this.tables;
                }
            },
            changeEditData() {
                this.companyJson.value = this.editDataJson.orgName;
                this.createUserData = {...this.editDataJson};
                this._getgetppPurchaseOrderFindRecord();
            },
            GETtables(e) {
                this.tabledata = this.tabledata.concat(e);
            },
            async _getgetppPurchaseOrderFindRecord() {
                let data = await getppPurchaseOrderFindRecord(this.createUserData);
                if (data.result[0]) {
                    return (this.tabledata = data.result[0].detailList);
                }
            },
            tablesClickDatas(e) {
                this.tableIdx = e;
            },
            //点击table的期望到货时间
            getQiWanDaoHuoshijian(e) {
                this.tabledata[this.tableIdx].expectedArrivalTime = e;
            },
            //点击选择委托公司
            async getCompanyJsonAndArr() {
                this.createUserData.wareAreaId = "";
                this.createUserData.childWareId = "";
                let datas = await getFindWareOrg();
                this.companyJson.companyArr = datas.result;
            },
            getexpectedArrivalTime(e) {
                this.createUserData.expectedArrivalTime = e;
            },
            //改变委托公司
            changeCompany(e) {
                this.createUserData.orgId = this.companyJson.companyArr[e].id;
                this.createUserData.orgName = this.companyJson.companyArr[e].orgName;
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
            //点击了添加产品
            addChanpin() {
                if (!this.createUserData.expectedArrivalTime)
                    return this.$messageSelf.message("请选择期望到货时间");
                this.addChanpins = true;
            },
            //关闭
            closeBtn() {
                console.log(sessionStorage.getItem("fromPage"));
                if (sessionStorage.getItem("fromPage") === "stockoutIndentManage") {
                    this.$router.push({
                        path: "/indentManagement/stockoutIndentManage",
                        query: {cancel: "cancel"},
                    });
                }
                sessionStorage.removeItem("fromPage");

                this.$parent._data.isCreatePurchasing = false;
                sessionStorage.removeItem("_addTablesData");
            },
            handleSelectionChange(e) {
                this.multipleSelection = e;
            },
            //点击了提交
            async goAJAXCreate() {
                if (!this.createUserData.orgId) return this.$messageSelf.message("请选择委托公司");
                if (!this.createUserData.expectedArrivalTime)
                    return this.$messageSelf.message("请选择期望到货时间");
                if (!this.multipleSelection.length)
                    return this.$messageSelf.message("请选择要创建的产品明细");
                this.createUserData.detailList = this.multipleSelection;
                let datas = await getpPurchaseOrdersaveRecord(this.createUserData);
                if (datas.code == "10000") {
                    this.$messageSelf.message(datas.msg);
                    sessionStorage.removeItem("_addTablesData");
                    sessionStorage.removeItem("createManagementChildWareId");
                    this.$parent.getTableData();
                    this.closeBtn();
                }
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

        .setUserIngBoxCenter {
            position: relative;
            left: 50%;
            top: 144px;
            transform: translateX(-50%);
            background: #fff;
            max-width: 1000px;

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

                    > div {
                        margin-right: 20px;
                    }
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
            width: 78%;
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
