<template>
    <div id="fahuoguanli">
        <div class="manualBox">
            <div>
                <manualHeader @getParasJson="getParasJson" :tableData="tableData"/>
            </div>
            <div class="btnArr">
                <div class="backFF">
                    <div class="meiyiyetitle">发货异常管理</div>
                    <div class="btnClick">
                        <div class="setUser" @click="warehousingConfirmation">
                            产品库位映射
                        </div>
                    </div>
                </div>
                <!-- but按钮 -->
            </div>
            <div class="tableBox">
                <div
                        class="tableBoxCol"
                >
                    <div class="center">
                        <el-table
                                ref="multipleTable"
                                :data="tableData"
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
                            ></el-table-column>
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
                                    label="产品编码"
                                    prop="channelName"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="产品名称"
                                    prop="orderSourceName"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="产品规格"
                                    prop="channelOrderNo"
                                    show-overflow-tooltip
                            >
                            </el-table-column>
                            <el-table-column
                                    label="品牌"
                                    prop="subOrderNo"
                                    show-overflow-tooltip
                            >
                            </el-table-column>
                            <el-table-column
                                    label="关联订单数"
                                    prop="exprName"
                                    show-overflow-tooltip
                            ></el-table-column>
                        </el-table>
                    </div>
                    <!-- 表格主体 -->
                    <div class="pageComponent">
                        <pagecomponent
                                :pageComponentsData="pageComponentsData"
                                @getPageNum="getPageNum"
                                @sureSuccssBtn="sureSuccssBtn"
                        />
                    </div>
                </div>
            </div>
            <!-- table-biaoge -->
        </div>
        <!-- 拣货单 start -->
        <div v-show="isJianHuoDanShow" class="bjBox">
            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div v-if="isJianHuoDanShow">
                    <pickingList @getiscaigoudanDetail="getiscaigoudanDetail"/>
                </div>
            </transition>
        </div>
        <!-- 拣货单 end -->
    </div>
</template>

<script>
    /*eslint-disable */
    import manualHeader from "../../components/deliveryManagement/adnormalDeliberyHeader";
    import pagecomponent from "../../components/commin/pageComponent"; //分页器
    import pickingList from "../../components/deliveryManagement/pickingList"; //拣货单
    import {
        pOrgFailSubOrderfindRecordPageGroupByProd,
        pOrgSubOrderMegerOrder,
    } from "../../api/api";
    import {getCookie, _getArrTarget} from "../../utils/validate";

    export default {
        components: {
            manualHeader,
            pickingList,
            pagecomponent,
        },
        data() {
            return {
                isJianHuoDanShow: false,
                tableData: [],
                pageComponentsData: {
                    pageNums: 0, //一共多少条 //默认一页10
                },
                sendOutDataJson: {
                    paras: {
                        orgName: "",
                        orgId: "",
                        orderNo: "",
                        prodId: "",
                        specId: "",
                        childWareId: "",
                        childWareName: "",
                        specName: "",
                        outWareTimeStart: "",
                        pickTimeStart: "",
                        checkTimeStart: "",
                        outWareTimeEnd: "",
                        pickTimeEnd: "",
                        checkTimeEnd: "",
                    },
                    pageNumber: 1, //当前页数
                    pageSize: 10, //每页记录数
                },
                multipleSelection: [], //选择了那个
            };
        },
        created() {
            this.getTableData();
        },
        methods: {
            getiscaigoudanDetail(e) {
                this.isJianHuoDanShow = e;
            },
            getPageNum(e) {
                this.sendOutDataJson.pageNumber = e;
                this.getTableData();
            },
            sureSuccssBtn(e) {
                this.sendOutDataJson.pageNumber = e;
                this.getTableData();
            },
            handleSelectionChange(e) {
                this.multipleSelection = e;
            },
            //产品库位映射
            warehousingConfirmation() {
                if (!this.multipleSelection.length || this.multipleSelection.length != 1)
                    return this.$messageSelf.message({
                        message: "请选择产品库位映射的产品,并且只能选择一个产品",
                        type: "warning",
                    });
                this.$router.push({
                    path: "/storageLocalMap/storeLocalBindProduct",
                    query: {
                        datas: this.multipleSelection[0],
                        type: "edit",
                    },
                });
            },
            //表格发生了变化以及点击了查询按钮
            getParasJson(data) {
                this.sendOutDataJson.paras = {...data};
                this.getTableData();
            },
            //获取table表格内容
            async getTableData(fn) {
                let datas = await pOrgFailSubOrderfindRecordPageGroupByProd(
                    this.sendOutDataJson
                );
                if (datas.code == "10000") {
                    datas.result && this._changeDatas(datas.result);
                } else {
                    this.$messageSelf.message({message: datas.msg, type: "error"});
                }
                fn && fn(datas);
                return datas;
            },
            _changeDatas(datas) {
                this.tableData = datas.list;
                this.pageComponentsData.pageNums = datas.totalRow;
            },
        },
    };
</script>

<style lang='scss' scoped>
    @import "../../assets/scss/btn.scss";

    .posFixCenter {
        display: flex;
        align-self: center;
        justify-content: center;
    }

    .manualBox {
        // border-top: 1px solid #d1d6e2;
        // background-color: rgb(232, 233, 236);
    }

    .btnArr {
        padding: 0 10px;

        > div {
            border-bottom: 1px solid #d1d6e2;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            div {
                display: inline-block;
            }
        }

        .meiyiyetitle {
            display: flex;
            align-items: center;
        }
    }

    .tableBox {
        padding: 0 10px 0px 10px;

        .pageComponent {
            // margin: 180px 10px 0 0;
            text-align: right;
            height: 36px;
            background: #ffffff;
            border: 1px solid #d1d6e2;
        }
    }

    .setUser {
        @include BtnFunction("success");
    }
</style>