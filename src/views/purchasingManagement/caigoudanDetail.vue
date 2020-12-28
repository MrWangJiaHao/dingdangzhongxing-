<template>
    <div class="setUserIngBox" id="manageMenyrukuSure">
        <div class="setUserIngBoxCenter">
            <kuanjiaClick titles="采购单详情" @closeBtn="closeBtn"
                          width="1100" :is-looker="true">
                <template slot="centerKuanjia">
                    <div class="centerBox">
                        <div class="setTitle">采购单</div>
                        <div class="gerxinxiBox">
                            <div class="xinxiBitian">
                                <div class="dispalywrap rukuquerenparent">
                                    <div
                                            v-for="(key, item, idx) in rukuSure"
                                            :key="idx"
                                            class="displayalign parentBox"
                                    >
                                        <div class="titleBox">{{ item }}</div>
                                        <div class="centersBox">
                                            <div v-if="item == '*入库人'">
                                                <input
                                                        v-model="createUserData.putUser"
                                                        class="input"
                                                        placeholder="请输入入库人"
                                                />
                                            </div>
                                            <div v-else-if="item == '*入库时间'">
                                                <dateTime
                                                        :dateTimeData="dateTimeData"
                                                        @getDateTime="getDateTimeExpectedSendTime"
                                                />
                                            </div>
                                            <div v-else-if="item == '*批次号'">
                                                <input
                                                        v-model="createUserData.batchNo"
                                                        class="input"
                                                        placeholder="请输入批次号"
                                                />
                                            </div>
                                            <div v-else>
                                                {{ key() }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 个人信息 -->
                    <div class="centerBox mb20">
                        <div class="setTitle">采购详情</div>
                        <div v-if="!isrukuDetails" class="mb20 tr"></div>
                        <div class="mb20" id="bjTableWraper tableBox">
                            <el-table
                                    ref="multipleTable"
                                    :data="tabledata"
                                    :stripe="true"
                                    :border="true"
                                    tooltip-effect="dark"
                                    style="width: 100%; height: 100%; overflow: auto"
                                    @selection-change="handleSelectionChange"
                            >
                                <el-table-column type="expand" width="82">
                                    <template slot-scope="scope">
                                        <el-table
                                                border
                                                :data="scope.row.detailList"
                                                tooltip-effect="dark"
                                                style="width: 100%"
                                                default-expand-all
                                        >
                                            <el-table-column
                                                    type="index"
                                                    label="序号"
                                                    width="71"
                                                    align="center"
                                                    show-overflow-tooltip
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    label="产品编码"
                                                    show-overflow-tooltip
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    label="产品名称"
                                                    show-overflow-tooltip
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    label="品牌"
                                                    show-overflow-tooltip
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    label="产品规格"
                                                    show-overflow-tooltip
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    label="销售仓可用库存"
                                                    show-overflow-tooltip
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    label="低库存预警值"
                                                    show-overflow-tooltip
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    label="高库存预警值"
                                                    show-overflow-tooltip
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                    prop="address"
                                                    label="申请采购数量"
                                                    show-overflow-tooltip
                                            >
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="序号"
                                        type="index"
                                        width="71"
                                        align="center"
                                        show-overflow-tooltip
                                />
                                <el-table-column
                                        label="委托公司"
                                        prop="orgName"
                                        show-overflow-tooltip
                                />
                                <el-table-column
                                        label="采购单号"
                                        width="250"
                                        property="purcNo"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="采购状态"
                                        prop="disposeStatus"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="采购类型"
                                        prop="orderSource"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="申请采购数量"
                                        prop="prodNum"
                                        width="120"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="期望到货时间"
                                        width="160"
                                        prop="expectedArrivalTime"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="实际到货数量"
                                        width="120"
                                        prop="damagedNum"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="实际到货时间"
                                        width="120"
                                        prop="putStartTime"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="创建人"
                                        prop="createUser"
                                        show-overflow-tooltip
                                ></el-table-column>
                                <el-table-column
                                        label="创建日期"
                                        prop="createTime"
                                        width="180"
                                        show-overflow-tooltip
                                ></el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div>
                        <div class="dispalyFlex ptb20 mb20">
                            <div class="noneIconTitle mr11 fosi0">
                                <span class="fosi14 visibilityHidden">你好</span>
                                <span class="fosi14">备注</span>
                                <span class="fosi14 visibilityHidden">好</span>
                                <span class="fosi14">:</span>
                            </div>
                            <div class="bzTetxArea">
            <textarea
                    disabled
                    placeholder="请输入备注"
                    v-model="caigoudanDetailJson.remark"
                    maxlength="200"
            ></textarea>
                            </div>
                        </div>
                    </div>
                    <!-- 备注 -->

                </template>
            </kuanjiaClick>
            <!-- 添加产品 start -->
        </div>
    </div>
</template>

<script>
    /*eslint-disable */
    import dateTime from "../../components/commin/dateTime"; //用户管理下拉框
    import {getppPurchaseOrderFindRecord} from "../../api/api";
    import kuanjiaClick from "../../components/commin/kuanjiaClick";

    export default {
        name: "createUsering",
        components: {
            dateTime,
            kuanjiaClick
        },
        props: {
            caigoudanDetailJson: {
                type: Object,
                default: {},
            },
        },
        data() {
            return {
                companyJson: {
                    companyArr: [],
                    value: "",
                },
                self: this,
                datetimeDate: {
                    placeholder: "请选择预期入库时间",
                    title: "",
                },
                dateTimeData: {
                    placeholder: "请选择入库时间",
                },
                rukuSure: {
                    采购单号: () => this.caigoudanDetailJson.purcNo,
                    委托公司: () => this.caigoudanDetailJson.orgName,
                    采购状态: () =>
                        this.$parent.dindanzhuantai(this.caigoudanDetailJson.disposeStatus),
                    采购类型: () => this.caigoudanDetailJson.orderSource,
                    创建人: () => this.caigoudanDetailJson.createUser,
                    创建时间: () => this.caigoudanDetailJson.createTime,
                    期望到货时间: () => this.caigoudanDetailJson.expectedArrivalTime,
                    实际到货时间: () => this.caigoudanDetailJson.putStartTime,
                    审核原因: () => "无",
                },

                multipleSelection: [],
                tabledata: [],
                ziCangJson: {
                    value: "",
                    ziCangArr: [],
                },
                kueirArr: [],
                createUserData: {
                    expectedSendTime: "", //expectedSendTime
                    orderSource: "",
                    orgName: "",
                    orgId: "",
                    waerId: "",
                    detailList: [],
                    batchNo: "",
                    putWareId: "",
                    recommendSeatId: "",
                    operatorType: 3,
                    childWareId: "",
                    wareId: this.$cookie.get("X-Auth-wareId"),
                },
                getProvinceData: {
                    parentCode: 0,
                },
                prodUnitData: [],
                tables: [],
                chanpinCenter: {},
                rowTable: 0,
                isrukuDetails: false,
                detailsData: [],
            };
        },

        async created() {
            console.log(this.caigoudanDetailJson, "caigoudanDetailJson");
            this._getppPurchaseOrderFindRecord();
        },
        methods: {
            //关闭
            closeBtn() {
                this.$emit("getiscaigoudanDetail", false);
            },

            handleSelectionChange(e) {
                this.multipleSelection = e;
            },

            async _getppPurchaseOrderFindRecord(id) {
                let datas = await getppPurchaseOrderFindRecord(this.caigoudanDetailJson);
                console.log(datas, "detail");
                return (this.tabledata = datas.result);
            },
        },
    };
</script>
<style>
    #manageMenyrukuSure
    .ivu-input-wrapper.ivu-input-wrapper-default.ivu-input-type.ivu-date-picker-editor {
        width: 172px;
        height: 28px;
    }

    #manageMenyrukuSure .ivu-input.ivu-input-default.ivu-input-with-suffix {
        border: 1px solid #d2d6e2;
        height: 28px;
        color: #333333;
        font-size: 14px;
        font-weight: normal;
        background: rgba(236, 241, 247, 0);
        border-radius: 2px;
    }

    #tableBox .el-icon.el-icon-arrow-right::before {
        content: "+";
    }

    #tableBox .el-table__expand-icon--expanded {
        transform: rotate(0deg);
        transition: all 0.3s;
    }

    #tableBox
    .el-table__expand-icon--expanded
    .el-icon.el-icon-arrow-right::before {
        content: "-";
    }
</style>
<style lang='scss' scoped>
    @import "../../assets/scss/btn.scss";

    .fade-enter-active,
    .fade-leave-active {
        transition: transform 1s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        transform: scale(0);
    }

    .input {
        border: 1px solid #d2d6e2;
        height: 28px;
        text-indent: 10px;
        color: #333333;
        font-size: 14px;
        font-weight: normal;
        background: rgba(236, 241, 247, 0);
        border-radius: 2px;
    }

    .rukuquerenparent {
        width: 100%;

        .parentBox {
            width: 33.3%;
            color: #333333;
            border: 1px solid #d1d6e2;

            .titleBox {
                padding: 12px 20px 12px 0;
                width: 106px;
                border-right: 1px solid #d1d6e2;
                background-color: #ecf1f7;
                text-align: right;
            }

            .centersBox {
                padding-left: 10px;
            }
        }
    }

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
            transform: translateX(-50%);
            background: #fff;
            max-width: 1100px;

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
                    flex-wrap: wrap;
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