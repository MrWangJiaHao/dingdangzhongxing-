<template>
    <kuanjiaClick titles="选择产品"
	@closeBtn="closeBtn"
	minHeight='600'
	maxHeight='700'
	@clickSubmit="clickSubmit"
	>
        <template slot="centerKuanjia">
			<div class="pb20">
				<div class="p20 botD1  clearfix  mb20">
					<div class="setTitle">
						选择产品
					</div>
					<div class="dispalywrap mb16 ">
						<div class="mb20 ">
							<div class="displayalign ellipsis">
								<div class="noneIconTitle mr11">产品名称:</div>
								<div class="mr20">
									<el-autocomplete
											class="inline-input"
											v-model="sendoutDatas.paras.prodName"
											:fetch-suggestions="prodNameQuerySearch"
											placeholder="请输入产品名称"
											:trigger-on-focus="false"
											@select="prodNameHandleSelect"
									></el-autocomplete>
								</div>
							</div>
						</div>
						<!-- 产品名称 -->
						<div class="mb20">
							<div class="displayalign ellipsis">
								<div class="noneIconTitle mr11">产品编码:</div>
								<div class="mr20">
									<el-autocomplete
											class="inline-input"
											v-model="sendoutDatas.paras.prodCode"
											:fetch-suggestions="prodCodeQuerySearch"
											placeholder="请输入产品编码"
											:trigger-on-focus="false"
											@select="prodCodeHandleSelect"
									></el-autocomplete>
								</div>
							</div>
						</div>
						<!-- 产品名称 -->
						<div class="mb20">
							<div class="displayalign ellipsis">
								<div class="noneIconTitle mr11">产品规格:</div>
								<div class="mr20">
									<el-autocomplete
											class="inline-input"
											v-model="sendoutDatas.paras.specName"
											:fetch-suggestions="specNameQuerySearch"
											placeholder="请输入产品规格"
											:trigger-on-focus="false"
											@select="specNameHandleSelect"
									></el-autocomplete>
								</div>
							</div>
						</div>
						<!-- 产品规格 -->
						<div>
							<div class="displayalign ellipsis">
								<div class="noneIconTitle mr11">
									品<span class="visibilityHidden">你好</span>牌:
								</div>
								<div class="mr20">
									<el-autocomplete
											class="inline-input"
											v-model="sendoutDatas.paras.braId"
											:fetch-suggestions="specNameQuerySearch"
											placeholder="请输入品牌"
											:trigger-on-focus="false"
											@select="specNameHandleSelect"
									></el-autocomplete>
								</div>
							</div>
						</div>
						<!-- 品牌 -->
						<div class="disinb tijiaoBox tr mr11" @click="sendoutDataAsync">查询</div>
						<div class="disinb quxiaoBox tr" @click="clearChanPinMinChen">清空</div>
					</div>
				</div>
				<div class="disspaceBetween pd20">
					<div class="setTitle">
						产品明细
					</div>
					<div class="disinb quxiaoBoxs mb16 inline " @click="clearRemovetable">删除</div>
				</div>
				<div class="mb20 pd20">
					<el-table
							ref="multipleTable"
							:data="tabledata"
							:stripe="true"
							:border="true"
							tooltip-effect="dark"
							style="width: 100%; height: 100%; overflow-y: auto"
							@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" align="center" width="82" fixed="left"></el-table-column>
						<el-table-column
								label="序号"
								type="index"
								align="center"
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
								prop="supName"
								show-overflow-tooltip
						></el-table-column>
						<el-table-column
								label="产品规格"
								width="119"
								align="center"
								prop="braName"
								show-overflow-tooltip
						></el-table-column>
						<el-table-column
								label="销售仓可用库存"
								width="119"
								prop="outOfProdNum"
								align="center"
								show-overflow-tooltip
						></el-table-column>
						<el-table-column
								label="低库存预警值"
								width="119"
								prop="braName"
								show-overflow-tooltip
						></el-table-column>
						<el-table-column
								label="高库存预警值"
								width="119"
								prop="braName"
								show-overflow-tooltip
						></el-table-column>
						<el-table-column
								label="申请采购数量*"
								width="119"
								prop="prodNum"
								show-overflow-tooltip
						>
							<el-input
									slot-scope="scope"
									v-model="scope.row.prodNum"
									placeholder="请输入采购数量"
							></el-input>
						</el-table-column>
					</el-table>
					<div class="tr pageComponent mb16">
						<pageComponent
								@handleSizeChange="handleSizeChange"
								@getPageNum="getPageNum"
								:pageComponentsData="pageComponentsData"
						/>
					</div>
				</div>
				</div>
        </template>
    </kuanjiaClick>
</template>
<style>
    .centerBox {
        border-bottom: 1px solid #d1d6e2;
    }
	
</style>
<script>
    import {
        getpWareOrgProdfindRecordPage,
        queryProductInfor,
        getSaveRecord,
    } from "../../api/api";
    import {getCookie} from "../../utils/validate";
    import pageComponent from "../commin/pageComponent";
    import kuanjiaClick from "../../components/commin/kuanjiaClick";

    export default {
        data() {
            return {
                pageComponentsData: {
                    pageNums: 0,
                    sizes: true,
                },
                tabledata: [],
                mutalisArr: [],
                sendoutDatas: {
                    pageNumber: 1,
                    pageSize: 10,
                    operatorType: 1,
                    wareid: getCookie("X-Auth-wareId"),
                    childWareId: (() => {
                        return sessionStorage.getItem("createManagementChildWareId");
                    })(),
                    orgId: sessionStorage.getItem("orgId"),
                    orderSource: (() => this.$route.query.orderSource)(),
                    paras: {
                        prodName: "", //产品名称
                        prodCode: "", //产品编码
                        specName: "", //产品规格

                    },
                },
            };
        },
        created() {
            this.sendoutDataAsync();
        },
        components: {
            pageComponent,
            kuanjiaClick
        },
        methods: {
            async _chanpinmingc(dataJson) {
                let datas = await queryProductInfor({
                    data: {
                        ...this.sendoutDatas,
                        paras: {
                            ...dataJson,
                        },
                    },
                });
                return datas.data;
            },
            //点击产品名称
            async _getSaveRecord(dataJson) {
                let datas = await getSaveRecord({
                    ...this.sendoutDatas,
                    paras: {
                        ...dataJson,
                    },
                });
                console.log(datas);
            },
            prodNameQuerySearch(e, cb) {
                this.$nextTick(() => {
                    this._sendOutAsync({prodName: e}).then((res) => {
                        res.list.forEach((item) => {
                            item.value = item.prodName;
                        });
                        cb(res.list);
                    });
                });
            },
            prodNameHandleSelect(e) {
                if (!e) this.sendoutDatas.paras.braId = "";
                this.sendoutDatas.paras.braId = e.braId;
                this.tabledata = [e];
            },
            prodCodeQuerySearch(e, cb) {
                this.$nextTick(() => {
                    this._sendOutAsync({prodName: e}).then((res) => {
                        res.list.forEach((item) => {
                            item.value = item.prodCode;
                        });
                        cb(res.list);
                    });
                });
            },
            prodCodeHandleSelect(e) {
                if (!e) this.sendoutDatas.paras.prodCode = "";
                this.sendoutDatas.paras.prodCode = e.prodCode;
                this.tabledata = [e];
            },
            specNameQuerySearch(e, cb) {
                this.$nextTick(() => {
                    this._sendOutAsync({specName: e}).then((res) => {
                        res.list.forEach((item) => {
                            item.value = item.specName;
                        });
                        cb(res.list);
                    });
                });
            },
            specNameHandleSelect(e) {
                if (!e) this.sendoutDatas.paras.specName = "";
                this.sendoutDatas.paras.specName = e.specName;
                this.tabledata = [e];
            },
            sendoutDataAsync() {
                this._sendOutAsync().then((res) => {
                    this._changeList(res);
                });
            },
            clearChanPinMinChen() {
                this.sendoutDatas.paras.prodName = "";
                this.sendoutDatas.paras.prodCode = "";
                this.sendoutDatas.paras.specName = "";
                this.sendoutDataAsync();
            },
            closeBtn() {
                this.$parent._data.addChanpins = false;
            },
            handleSelectionChange(e) {
                this.mutalisArr = e;
            },
            clearRemovetable() {
                this.mutalisArr.forEach((item) => {
                    let idxs = this.tabledata.indexOf(item);
                    this.tabledata.splice(idxs, 1);
                });
                sessionStorage.setItem("_addTablesData", JSON.stringify(this.tabledata));
            },
            //点击了提交
            clickSubmit() {
                this.$emit("tables", this.mutalisArr);
                console.log(this.mutalisArr, "this.mutalisArr");
                sessionStorage.setItem("_addTablesData", JSON.stringify(this.mutalisArr));
                this.closeBtn();
            },
            //发生请求
            async _sendOutAsync() {
                let datas = await getpWareOrgProdfindRecordPage(this.sendoutDatas);
                return datas.result;
            },
            //改变数据
            _changeList(data) {
                this.tabledata = data.list;
                this.pageComponentsData.pageNums = data.totalRow;
            },
            handleSizeChange(e) {
                this.sendoutDatas.pageSize = e;
                this.sendoutDataAsync();
            },
            getPageNum(e) {
                this.sendoutDatas.pageSize = e;
                this.sendoutDataAsync();
            },
        },
    };
</script>
<style>
    .el-pager {
        margin-right: 6px;
    }
</style>

<style lang="scss" scoped>
    @import "../../assets/scss/btn.scss";

    .choiceSelectBox {
        background: #f8f8f8;
        overflow: auto;
    }

    .headerBox {
        width: 100%;
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

    .quxiaoBox {
        @include BtnFunction();
    }

    .quxiaoBoxs {
        @include BtnFunction("error");

    }

    .tijiaoBox {
        @include BtnFunction("success");
    }
</style>