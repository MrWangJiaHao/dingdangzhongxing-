<template>
    <div>
        <div class="manualBox">
            <manualHeader @getParasJson="getParasJson" :tableData="tableData" @clearInput='clearInput'/>
            <div class="btnArr">
                <div class="backFF">
                    <div class="meiyiyetitle">入库管理</div>
                    <div class="btnClick">
                        <div class="setUser" @click="warehousingConfirmation">入库确认</div>
                        <div class="bianjiUser" @click="printstockinlist">打印入库单</div>
                        <div class="bianjiUser" @click="printReceipt">打印收货单</div>
                        <div class="bianjiUser" @click="parintBatchNumber">打印批次号</div>
                        <a class="lodopFunClear disinb" id="rukudanExcel" @click="ExportArr"
                        >导出</a
                        >
                        <div v-show="$route.params.type == 0" class="mr10"></div>
                        <div
                                class="goOn"
                                v-if="$route.params.type == 0"
                                @click="CreateStockInOrder"
                        >
                            创建入库单
                        </div>
                        <div
                                class="lodopFunClear mr10"
                                v-if="$route.params.type == 0"
                                @click="editBtn"
                        >
                            编辑
                        </div>
                        <div
                                class="remove "
                                v-if="$route.params.type == 0"
                                @click="clearBtn"
                        >
                            删除
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
								:row-key="getRowKeys"
                        >
                            <el-table-column
                                    type="selection"
                                    align="center"
                                    width="82"
                                    fixed="left"
                            ></el-table-column>
                            <el-table-column
                                    label="序号"
                                    align="center"
                                    type="index"
                                    width="71"
                                    show-overflow-tooltip
                            />
                            <el-table-column
                                    label="委托公司"
                                    width="250"
                                    prop="orgName"
                                    show-overflow-tooltip
                            />
                            <el-table-column
                                    label="入库单号"
                                    width="250"
                                    property="putWareNo"
                                    show-overflow-tooltip
                            >
                <span
                        slot-scope="scoped"
                        class="lookDeatil"
                        @click="gotoRuKudetails(scoped.row)"
                >
                  <div>
                    {{ scoped.row.putWareNo }}
                  </div>
                </span>
                            </el-table-column>
                            <el-table-column
                                    width="119"
                                    label="关联单号"
                                    prop="orderNo"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="期望入库开始时间"
                                    prop="expectedSendTime"
                                    show-overflow-tooltip
                                    width="250"
                            ></el-table-column>
                            <el-table-column
                                    label="入库状态"
                                    width="119"
                                    prop="putstatus"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="入库人"
                                    width="119"
                                    prop="putUser"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="入库开始时间"
                                    prop="putStartTime"
                                    width="250"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="入库完成时间"
                                    prop="putEndTime"
                                    width="250"
                                    show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                                    label="入库批次"
                                    width="119"
                                    prop="batchNo"
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
        <!-- 头部组件 -->
        <div v-show="WarehouseReceipt" class="bjBox">
            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div v-if="WarehouseReceipt">
                    <WarehouseReceipt
                            :WarehousingType="
              WarehousingTypeArr[$route.params.type].WarehousingTypeCenter
            "
                    />
                </div>
            </transition>
        </div>
        <!-- 入库单 -->
        <div v-show="Receipt" class="bjBox">
            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div v-if="Receipt" class="posFixCenter">
                    <Receipt
                            :WarehousingType="
              WarehousingTypeArr[$route.params.type].WarehousingTypeCenter
            "
                    />
                </div>
            </transition>
        </div>
        <!-- 收货单 -->
        <div v-show="BatchNumber" class="bjBox">
            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div v-if="BatchNumber" class="posFixCenter">
                    <BatchNumber :batchNo='batchNo'/>
                </div>
            </transition>
        </div>
        <!-- 批次号 -->
        <!-- 创建&&编辑 start -->
        <div v-show="iscreateManagement" :class="popUpShows?'bjBox':'bjBox'">
            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div v-if="iscreateManagement">
                    <createManagement
                            :orderSources="sendOutDataJson.paras.orderSource"
                            @closeFun="closeCreate"
                            @addchangping="addchangping"
                            :edifManageMent="edifManageMent"
                    />
                </div>
            </transition>
        </div>
        <!-- 创建&&编辑 end -->

        <!-- 入库确认&&入库详情 start -->
        <div v-show="ismanageMentrukuSure" :class="popUpShows?'bjBox':'bjBox'">
            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div v-if="ismanageMentrukuSure">
                    <manageMentrukuSure
					:isLooker = 'isLooker'
                            :orderSources="sendOutDataJson.paras.orderSource"
                            :WarehousingTypeArr="
              WarehousingTypeArr[$route.params.type].WarehousingTypeCenter
            "
                    />
                </div>
            </transition>
        </div>
        <!-- 入库确认&&入库详情 end -->
    </div>
</template>

<script>
    /*eslint-disable*/
    import manualHeader from "../../components/manual/manualHeader";
    import pagecomponent from "../../components/commin/pageComponent"; //分页器
    import WarehouseReceipt from "../../components/manual/WarehouseReceipt"; //入库单
    import Receipt from "../../components/manual/Receipt"; //收货单
    import BatchNumber from "../../components/manual/BatchNumber"; //批次号
    import createManagement from "./createManagement"; //创建和编辑
    import manageMentrukuSure from "./manageMentrukuSure"; //入库确认和入库详情
    import {
        getFindRecord,
        getFindWareHouseDetailByIds,
        insertExcelData,
        putWarehouseFindRecordPage,
        delRecordByIdArrs,
    } from "../../api/api";

    import {_getArrTarget, _getExportExcels, popUpShow, popUpCount} from "../../utils/validate";

    export default {
        components: {
            manualHeader,
            pagecomponent,
            WarehouseReceipt,
            Receipt,
            BatchNumber,
            createManagement,
            manageMentrukuSure,
        },
        data() {
            return {
				batchNo:"",
				isLooker:false,
                ismanageMentrukuSure: false, //入库确认和入库详情
                iscreateManagement: false, //创建&&删除
                WarehouseReceipt: false,
                WarehouseReceiptIds: "",
                Receipt: false,
                ReceiptIds: "",
                BatchNumber: false,
                bjzhezhaoRes: sessionStorage.setItem('zhezhao', 1),
                BatchNumberIds: "",
                tableData: [],
                pageComponentsData: {
                    pageNums: 0, //一共多少条 //默认一页10条
                },
				getRowKeys(row){
					return row.id
				},
                sendOutDataJson: {
                    paras: {
                        orgName: "",
                        orgId: "",
                        orderNo: "",
                        putWareNo: "",
                        putstatus: "",
                        orderSource: 0,
                        prodCode: "",
                        prodName: "",
                        specName: "",
                        putStartTime: "",
                        putEndTime: "",
                        expectedSendStartTime: "",
                        expectedSendEndTime: "",
                        putUser: "",
                        batchNo: "",
                    },
                    pageNumber: 1, //当前页数
                    pageSize: 10, //每页记录数
                },
                multipleSelection: [], //选择了那个
                thisOneShow: true,
                listArrs: {},
                edifManageMent: false,
                WarehousingTypeArr: [
                    {
                        WarehousingType: 0,
                        WarehousingTypeCenter: "手工创建入库",
                    },
                    {
                        WarehousingType: 1,
                        WarehousingTypeCenter: "采购调拨入库",
                    },
                    {
                        WarehousingType: 2,
                        WarehousingTypeCenter: "预入库",
                    },
                    {
                        WarehousingType: 3,
                        WarehousingTypeCenter: "采购预入库",
                    },
                    {
                        WarehousingType: 4,
                        WarehousingTypeCenter: "调拨入库",
                    },
                    {
                        WarehousingType: 5,
                        WarehousingTypeCenter: "加工入库",
                    },
                    {
                        WarehousingType: 6,
                        WarehousingTypeCenter: "拆解入库",
                    },
                    {
                        WarehousingType: 7,
                        WarehousingTypeCenter: "退货入库",
                    },
                    {
                        WarehousingType: 8,
                        WarehousingTypeCenter: "盘盈入库",
                    },
                    {
                        WarehousingType: 9,
                        WarehousingTypeCenter: "其他入库",
                    },
                ],
            };
        },
		beforeRouteEnter(to,from,next){
			next((vm)=>{
				vm.sendOutDataJson.paras.orderSource = to.params.type
			})
		},
        computed: {
            popUpShows() {
                return this.isShowUpSgows(1)
            }
        },
        created() {
            if (this.thisOneShow) {
                this.thisOneShow = false;
            }
            this.popUpCounts()
            this.getTableData();
        },
        methods: {
            closeCreate(e) {
                if (e) {
                    this.getTableData();
                }
            },
            isShowUpSgows(target) {
                return popUpShow(target)
            },
            popUpCounts() {
                popUpCount(1)
            },
            gotoRuKudetails(row) {
                this._getFindRecord(row.id).then(() => {
                    sessionStorage.setItem(
                        "manageMentrukuSureData",
                        JSON.stringify({rukuDetails: true, ...row})
                    );
					this.isLooker = true
                    this.ismanageMentrukuSure = true;
                });
            },
            getPageNum(e) {
                this.sendOutDataJson.pageNumber = e;
                this.getTableData();
            },
            addchangping(e) { //点击添加产品
                this.isShowUpSgows(2)
            },
            sureSuccssBtn(e) {
                this.sendOutDataJson.pageNumber = e;
                this.getTableData();
            },
            handleSelectionChange(e) {
                this.multipleSelection = e;
            },
            //入库确认
            warehousingConfirmation() {
				this.isLooker = false
                if (!this.multipleSelection.length) {
                    return this.$messageSelf.message({message:"请选择入库确认的单号",type:"warning"});
                } else if (this.multipleSelection.length > 1) {
                    return this.$messageSelf.message({type:"warning",message:"只能选择一个入库单号"});
                } else {
                    this._getFindRecord(this.multipleSelection[0].id).then(() => {
                        sessionStorage.setItem(
                            "manageMentrukuSureData",
                            JSON.stringify(this.multipleSelection[0])
                        );
                        this.ismanageMentrukuSure = true;
                    });
                }
                this.popUpCounts()
            },
            //打印入库单:
            printstockinlist() {
                if (!this.multipleSelection.length) {
                    return this.$messageSelf.message({message:"请选择要打印的入库单",type:"warning"});
                } else if (this.multipleSelection.length > 1) {
                    return this.$messageSelf.message({message:"只能选择打印一个入库单",type:"warning"});
                } else {
                    this.WarehouseReceiptIds = this.multipleSelection[0].id;
                    this._getFindRecord(this.multipleSelection[0].id, () => {
                        this.WarehouseReceipt = !this.WarehouseReceipt;
                    });
                }
            },
            //打印收货单
            printReceipt() {
                if (!this.multipleSelection.length) {
                    return this.$messageSelf.message({message:"请选择要打印的收货单",type:"warning"});
                } else if (this.multipleSelection.length > 1) {
                    return this.$messageSelf.message({message:"只能选择打印一个收货单",type:"warning"});
                } else {
                    this.ReceiptIds = this.multipleSelection[0].id;

                    this._getFindRecord(this.multipleSelection[0].id, () => {
                        this.Receipt = !this.Receipt;
                    });
                }
            },
            // 打印批次号
            parintBatchNumber() {
                if (!this.multipleSelection.length)
                    return this.$messageSelf.message({message:"请选择需要打印的批次号",type:"warning"});
                let target = _getArrTarget(this.multipleSelection, "id");
                getFindWareHouseDetailByIds({ids: target}, (data) => {
                    data = JSON.parse(data);
                    if (data.code === "10000") {
                        sessionStorage.setItem(
                            "parintBatchNumberArrs",
                            JSON.stringify(data.result)
                        );
						if(!this.multipleSelection[0].batchNo) return this.$messageSelf.message({
							type:"warning",
							message:"该入库单暂无批次号，请入库确认后在打印批次号"
						})
						this.batchNo =  this.multipleSelection[0].batchNo
                        this.BatchNumber = !this.BatchNumber;
                    } else {
                        this.$messageSelf.message(data.msg);
                    }
                });
            },
            async _getFindRecord(ids, fn) {
                let datas = await getFindRecord(ids);
                this.listArrs = datas.result[0];
                sessionStorage.setItem("listArrs", JSON.stringify(datas.result[0]));
                fn && fn();
                return datas;
            },
            //导出
            ExportArr() {
                if (!this.multipleSelection.length)
                    return this.$messageSelf.message({message:"请选择要导出的入库单",type:"warning"})
                if (this.multipleSelection.length != 1)
                    return this.$messageSelf.message({message:"一次只能选择一个入库单",type:"warning"})
                insertExcelData({
                    ids: this.multipleSelection[0].id,
                }).then((res) => {
                    _getExportExcels(res);
                });
            },

            //创建入库单
            CreateStockInOrder() {
                this.popUpCounts()
                this.edifManageMent = false;
                this.iscreateManagement = true;
            },
            //编辑
            editBtn() {
                this.popUpCounts()
                if (!this.multipleSelection.length)
                    return this.$messageSelf.message({message:"请选择要编辑的入库单",type:"warning"})
                if (this.multipleSelection.length != 1)
                    return this.$messageSelf.message({message:"一次只能编辑一个入库单",type:"warning"})
                sessionStorage.setItem(
                    "manualManageMentEdit",
                    JSON.stringify(this.multipleSelection[0])
                );
                this.edifManageMent = true;
                this.iscreateManagement = true;
            },
            //删除
            clearBtn() {
                if (!this.multipleSelection.length)
                    return this.$messageSelf.message({message:"请选择要删除的入库单",type:"warning"})
                this.$messageSelf
                    .confirms(this.$clearArr( _getArrTarget(this.multipleSelection, "id")), "提示", {
                        type: "info",
                    })
                    .then(() => {
                        delRecordByIdArrs({
                            ids: _getArrTarget(this.multipleSelection, "id"),
                        }).then((res) => {
                            if (res.data.code == "10000") {
                                return this.$messageSelf.message("删除成功");
								this.getTableData();
                            } else {
                                return this.$messageSelf.message(res.data.msgdfs);
                            }
                        });
                    })
                    .catch(() => {
                        this.$messageSelf.message("已经取消");
                    });
            },
			clearInput(data){
				this.sendOutDataJson.paras = this.dataWueryAndClear(data);
				this.getTableData();
			},
			dataWueryAndClear(data){
				return Object.assign({},this.sendOutDataJson.paras,data)
			},
            //表格发生了变化以及点击了查询按钮
            getParasJson(data) {
                this.sendOutDataJson.paras = this.dataWueryAndClear(data);
                this.getTableData();
            },
            //获取table表格内容
            async getTableData(fn) {
                let datas = await putWarehouseFindRecordPage(this.sendOutDataJson);
				if(datas.code==='10000'){
					this.tableData = [];
					this.changeDatas(datas.result);
					fn && fn();
				}
				else{
					this.$messageSelf.message({
						type:"error",
						message:datas.msg
					})
				}
                return datas;
            },
            changeDatas(datas) {
                if (datas.list) {
                    datas.list.forEach((item) => {
                        item.putstatus = this.isPutStatus(item.putstatus)
                    });
                }
                this.tableData = datas.list;
                this.pageComponentsData.pageNums = datas.totalRow;
            },
			isPutStatus(i){
				switch(i){
					case 0:
					return "未入库"
					break;
					case 1:
					return "入库中"
					break;
					case 2:
					return "已入库"
					break;
				}
			}
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
        margin-right: 10px;
        @include BtnFunction("success");
    }

    .bianjiUser {
        margin-right: 10px;
        @include BtnFunction("success");
    }

    .remove {
        @include BtnFunction("error");
    }

    .goOn {
        margin-right: 10px;
        @include BtnFunction("success");
    }

    .lodopFunClear {
        @include BtnFunction("success");
    }
</style>