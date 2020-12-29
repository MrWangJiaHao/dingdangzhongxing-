<template>
    <div id="fahuoguanli">
        <div class="manualBox">
            <div class="fuzzyQueryBoxs clearfix mb16 ">
                <div class="biaogeBox dispalywrap ">
                    <div class="zujianBox">
                        <div class="displayalign zujianBox">
                            <div class="noneIconTitle nowrap mr11">拣货单号:</div>
                            <div class="mr20">
                                <el-input
                                        v-model="pickOrderNo"
                                        placeholder="扫描拣货单号/输入查询"
                                ></el-input>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="btns   btnArrs ">
                    <div class="nowrap">
                        <div class="queryBtn inline mr11 zujianBox"   @click="queryBtns">
                            查询
                        </div>
                        <div class="clearBtn inline" @click="clearBtns">清空</div>

                    </div>
                </div>
            </div>
            <div class="btnArr">
                <div class="backFF">
                    <div class="meiyiyetitle">发货单打印</div>
                    <div class="btnClick">
                        <div class="setUser" @click="warehousingConfirmation">
                            打印发货单
                        </div>
                    </div>
                </div>
                <!-- but按钮 -->
            </div>
            <div class="tableBox">
                <div class="tableBoxCol">
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
                                    label="订单号"
                                    prop="orderNo"
                                    show-overflow-tooltip
                            >
                <span slot-scope="scoped">
                  <div @click="goToDetailOut(scoped.row)" class="lookDeatil">
                    {{ scoped.row.orderNo }}
                  </div>
                </span>
                            </el-table-column>
                            <el-table-column
                                    label="子单号"
                                    prop="subOrderNo"
                                    show-overflow-tooltip
                            >
                <span slot-scope="scoped">
                  <div @click="goToSubOrderNo(scoped.row)" class="lookDeatil">
                    {{ scoped.row.subOrderNo }}
                  </div>
                </span>
                            </el-table-column>
                            <el-table-column
                                    label="推荐用箱"
                                    prop="commendBox"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="订单编号"
                                    prop="pickOrderNo"
                                    show-overflow-tooltip
                            >
                            </el-table-column>
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
                    <div>
                        <delivetyNote
                                @getiswuliudanOne="getiswuliudanOne"
                                :parseMes="dayindanJson"
                        />
                    </div>
                </div>
            </transition>
        </div>
        <!-- 拣货单 end -->
    </div>
</template>

<script>
    /*eslint-disable */
    import pagecomponent from "../../components/commin/pageComponent"; //分页器
    import delivetyNote from "../../components/deliveryManagement/delivetyNote"; //发货单
    import {
        pOrgPickOrderfindOrderPage,
        pDeliverGoodsprintDeliverGoods,
        pDeliverGoodsfindSubOrderByPickOrderNo,
    } from "../../api/api";
    import headerKuanJia from "../../components/commin/headerKuanJia";

    export default {
        components: {
            delivetyNote,
            headerKuanJia,
            pagecomponent,
        },
        data() {
            return {
                isJianHuoDanShow: false,
                dayindanJson: {},
                tableData: [],
                pageComponentsData: {
                    pageNums: 0, //一共多少条 //默认一页10
                },
                sendOutDataJson: {
                    paras: {},
                    pageNumber: 1, //当前页数
                    pageSize: 10, //每页记录数
                },
                pickOrderNo: "",
                multipleSelection: [], //选择了那个
            };
        },
        created() {
            this.getTableData();
        },
        methods: {
            queryBtns() {
                pDeliverGoodsfindSubOrderByPickOrderNo({
                    pickOrderNo: this.pickOrderNo,
                }).then((res) => {
                    if (res.code == "10000") {
                        res.list && this._changeDatas(res.list);
                    }
                });
            },
            clearBtns() {
                this.pickOrderNo = "";
                this.getTableData();
            },
            getiswuliudanOne(e) {
                this.isJianHuoDanShow = e;
            },
            //打印发货单
            iSJianHuoDan() {
                this.dayindanJson = this.multipleSelection[0];
                this.isJianHuoDanShow = true;
                pDeliverGoodsprintDeliverGoods([
                    {id: this.multipleSelection[0].id},
                ]).then((res) => {
                    console.log(res)
                    // if (res.code == "10000") {
                    //     this.$messageSelf.message({message: res.msg, type: "success"});
                    // }
                });
            },
            goToDetailOut(e) {
                this.$router.push({
                    path: "/indentManagement/orderDetail",
                    query: {
                        orderNo: e,
                        type: "orderNo",
                    },
                });
            },
            goToSubOrderNo(e) {
                this.$router.push({
                    path: "/indentManagement/childOrderDetail",
                    query: {
                        subOrderNos: e,
                        type: "subOrderNos",
                    },
                });
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
            //集计
            warehousingConfirmation() {
                if (!this.multipleSelection.length)
                    return this.$messageSelf.message({
                        message: "请选择要集计的拣货单单",
                        type: "warning",
                    });
                this.$messageSelf
                    .confirms(
                        `总共${this.multipleSelection.length}笔订单，请确认是否打印？`,
                        "确认打印",
                        {
                            type: "info",
                        }
                    )
                    .then(() => {
                        this.iSJianHuoDan();
                    })
                    .catch(() => {
                        this.$messageSelf.message({
                            message: "已经取消打印",
                            type: "success",
                        });
                    });
            },
            //表格发生了变化以及点击了查询按钮
            getParasJson(data) {
                this.sendOutDataJson.paras = {...data};
                this.getTableData();
            },
            //获取table表格内容
            async getTableData(fn) {
                let datas = await pOrgPickOrderfindOrderPage(this.sendOutDataJson);
                console.log(datas, "发货单管理");
                if (datas.code == "10000") {
                    this._changeDatas(datas.result);
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

<style>
</style>
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

    .bianjiUser {
        margin-right: 10px;
        @include BtnFunction("success");
    }

    .remove {
        background-color: #fff;
        @include BtnFunction();
    }
</style>
