<template>
	<div class="manualBox">
		<manualHeader @getParasJson="getParasJson" :tableData="tableData" />
		<div class="btnArr">
			<div class="backFF">
				<div class="meiyiyetitle">拣货单管理</div>
				<div class="btnClick">
					<div class="setUser mr11" @click="TovoidClick">作废</div>
					<div class="setUser" @click="printPicking">打印拣货单</div>
				</div>
			</div>
			<!-- but按钮 -->
		</div>
		<div class="tableBox">
			<div class="tableBoxCol">
				<div class="center">
					<el-table ref="multipleTable" :data="tableData" :stripe="true" :border="true" tooltip-effect="dark" style="width: 100%"
					 @selection-change="handleSelectionChange">
						<el-table-column type="selection" align="center" width="82"></el-table-column>
						<el-table-column label="序号" type="index" align="center" width="71" show-overflow-tooltip />
						<el-table-column label="拣货单号" width="119" prop="pickOrderNo" show-overflow-tooltip />
						<el-table-column width="119" label="拣货单状态" prop="pickPrintStatus" show-overflow-tooltip>
							<div slot-scope="scoped">
								{{ scoped.row.pickPrintStatus ? "已打印" : "未打印" }}
							</div>
						</el-table-column>
						<el-table-column width="119" label="打印次数" prop="orderCount" align="center" show-overflow-tooltip></el-table-column>
						<el-table-column label="订单数量" align="center" prop="orderCount" show-overflow-tooltip>
						</el-table-column>
						<el-table-column label="产品种类" prop="prodTypeCount" show-overflow-tooltip>
							<span slot-scope="scoped">
								<div @click="goToDetailOut(scoped.row)" class="lookDeatil">
									{{ scoped.row.subOrderNo }}
								</div>
							</span>
						</el-table-column>
						<el-table-column width="119" label="产品数量" align="center" prop="prodCount" show-overflow-tooltip></el-table-column>
						<el-table-column label="创建时间" width="250" prop="createTime"></el-table-column>
						<el-table-column label="打印时间" width="160" prop="printTime"></el-table-column>
						<el-table-column label="打印人" width="250" prop="pickUserName" show-overflow-tooltip></el-table-column>
						<el-table-column label="拣货开始时间" prop="pickStartTime" width="250" show-overflow-tooltip></el-table-column>
						<el-table-column label="拣货完成时间" prop="pickEndTime" width="250" show-overflow-tooltip></el-table-column>
						<el-table-column label="拣货人员" prop="pickUserName" width="250" show-overflow-tooltip></el-table-column>
					</el-table>
				</div>
				<!-- 表格主体 -->
				<div class="pageComponent">
					<pagecomponent :pageComponentsData="pageComponentsData" @getPageNum="getPageNum" @sureSuccssBtn="sureSuccssBtn" />
				</div>
			</div>
			<!-- table-biaoge -->
			<!-- 拣货单 start -->
			<div v-show="isJianHuoDanShow" class="bjBox">
				<transition enter-active-class="animate__animated animate__zoomIn" leave-active-class="animate__animated animate__zoomOut">
					<div v-if="isJianHuoDanShow">
						<pickingList :detailsJianHuoDan="detailsJianHuoDan" @getiscaigoudanDetail="getiscaigoudanDetail" />
					</div>
				</transition>
			</div>
			<!-- 拣货单 end -->
		</div>
	</div>
</template>

<script>
	/*eslint-disable */
	import manualHeader from "../../components/deliveryManagement/pickingListesHead";
	import pagecomponent from "../../components/commin/pageComponent"; //分页器
	import pickingList from "../../components/deliveryManagement/pickingList"; //拣货单
	import {
		pOrgPickOrderfindRecordPage,
		pDeliverGoodsUpdatePrintExprStatus,
		pOrgPickOrderPickCancle,
	} from "../../api/api";

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
				detailsJianHuoDan: {},
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
		beforeRouteEnter(to, from, next) {
			if (from.name === "/deliveryManagement/normalDelivery") {
				next((vm) => {
					vm.$nextTick(() => {
						if (to.query.id) {
							vm._jijiJianhuodan(to.query.id);
						}
					});
				});
			} else {
				next();
			}
		},
		methods: {

			//拣货单 作废
			TovoidClick(e) {
				if (!this.multipleSelection.length)
					return this.$messageSelf.message({
						message: "请选择要作废的拣货单",
						type: "warning",
					});
				// `是否要作废，拣货单号${this.multipleSelection[0].pickOrderNo}？</br> 作废后，订单要重新集计处理!`
				this.$messageSelf
					.confirms(
						this.$clearArr(this.multipleSelection, "作废"),

						"作废", {
							confirmButtonText: "确定",
							cancelButtonText: "取消",
							dangerouslyUseHTMLString: true,
							type: "info",
						}
					)
					.then(() => {
						this._TovoidClick();
					})
					.catch(() => {
						this.$messageSelf.message({
							type: info,
							message: "已取消作废",
						});
					});
			},
			_TovoidClick() {
				pOrgPickOrderPickCancle([{
						pickOrderNo: this.multipleSelection[0].pickOrderNo,
					}, ])
					.then((res) => {
						if (res.code == "10000") {
							this.$messageSelf.message({
								message: res.msg,
								type: "success",
							});
							this.getTableData();
						} else {
							this.$messageSelf.message({
								message: res.msg,
								type: "error",
							});
						}
					})
					.catch((err) => err);
			},
			getiscaigoudanDetail(e) {
				if (this.$route.query.id) {
					this.$router.go(-1)
				} else {
					this.isJianHuoDanShow = e;
				}
			},
			//打印拣货单
			async _jijiJianhuodan(id) {
				let res = await pDeliverGoodsUpdatePrintExprStatus([{
					ids: id,
				}, ]);
				if (res.code == "10000") {
					let json = {
						pickOrderNo: id,
						...this.multipleSelection[0],
					};
					this.detailsJianHuoDan = json;
					this.isJianHuoDanShow = true;
					this.getTableData();
				} else {
					this.$messageSelf.message({
						message: res.msg,
						type: "error",
					});
				}
			},
			goToDetailOut(e) {
				sessionStorage.setItem("warehouseDetails", JSON.stringify(e));
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
			//打印拣货单
			printPicking() {
				if (!this.multipleSelection.length)
					return this.$messageSelf.message({
						message: "请选择要打印的拣货单~~",
						type: "warning",
					});
				this.$messageSelf
					.confirms(
						`共选中${this.multipleSelection.length}笔拣货单，${this.multipleSelection.length}笔订单，确认打印吗？`,
						"确认打印", {
							type: "info",
						}
					)
					.then(() => {
						this._jijiJianhuodan(this.multipleSelection[0].id);
					})
					.catch(() => {
						this.$messageSelf.message({
							type: info,
							message: "已经取消打印拣货单~~",
						});
					});
			},
			//表格发生了变化以及点击了查询按钮
			getParasJson(data) {
				this.sendOutDataJson.paras = { ...data
				};
				this.getTableData();
			},
			//获取table表格内容
			async getTableData(fn) {
				let datas = await pOrgPickOrderfindRecordPage(this.sendOutDataJson);
				if (datas.code == "10000") {
					fn && fn(datas);
					this._changeDatas(datas.result);
				} else {
					this.$messageSelf.message({
						message: datas.msg,
						type: "error",
					});
				}
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

	.btnArr {
		padding: 0 10px;

		>div {
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
		@include BtnFunction("error");
	}

	.goOn {
		margin-right: 10px;
		@include BtnFunction("success");
	}

	.lodopFunClear {
		margin-right: 10px;
		@include BtnFunction("success");
	}
</style>
