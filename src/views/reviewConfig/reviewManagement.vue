<template>
	<div>
		<reviewHeader @querySelect="querySelect" @clearInput="clearInput"></reviewHeader>
		<centerBtnArr title="复核管理"></centerBtnArr>
		<div class="pd10">
			<div class="tableInInput tableBoxCol center" id="purchasingIndexss">
				<tableCommin :tableDataJson="tableDataJson" @clickEvents="clickEventsOuter" @tableSelectArr="handleSelectionChangeDatas">
				</tableCommin>
				<div class="pageComponent">
					<pageComponent :pageComponentsData="pageComponentsData">
					</pageComponent>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/*eslint-disable*/
	import reviewHeader from "../../components/reviewConfig";
	import centerBtnArr from "../../components/centerBtnArr";
	import tableCommin from "../../components/commin/tableCommin";
	import pageComponent from "../../components/commin/pageComponent";

	export default {
		name: "reviewManagement",
		components: {
			centerBtnArr,
			tableCommin,
			pageComponent,
			reviewHeader,
		},
		data() {
			return {
				tableDataJson: {
					typeData: [{
							types: "selection",
						},
						{
							label: "序号",
							width: 80,
							types: "index",
						},
						{
							label: "委托公司",
							types: "orgName",
							width: 100,
						},
						{
							label: "渠道",
							types: "channelName",
						},
						{
							label: "订单来源",
							types: "orderSourceName",
						},
						{
							label: "订单号",
							types: "orderNo",
						},
						{
							label: "子订单号",
							types: "subOrderNo",
						},
						{
							label: "复核状态",
							types: "reCheckResults", //复核结果 0-失败 1-成功
						},
						{
							label: "物流公司",
							types: "exprName",
						},
						{
							label: "物流单号",
							types: "exprNo",
						},
						{
							label: "拣货人",
							types: "pickUser",
						},
						{
							label: "拣货开始时间",
							types: "pickStartTime",
							width: 150,
						},
						{
							label: "拣货完成时间",
							types: "pickEndTime",
							width: 150,
						},
						{
							label: "复核人员",
							types: "reCheckUser",
							width: 150,
						},
						{
							label: "复核次数",
							types: "reCheckNum",
							width: 150,
						},
						{
							label: "复核开始时间",
							types: "checkStartTime",
							width: 150,
						},
						{
							label: "复核完成时间",
							types: "checkEndTime",
							width: 150,
						},
						{
							label: "复核照片",
							types: "reCheckImageData",
							width: 300,
						},
						{
							label: "失败原因",
							types: "子订单号",
							width: 150,
						},
					],
					tabledata: [],
					selections: [],
				},
				pageComponentsData: {
					pageNums: 0,
				},
				sendOutDataJson: {
					pageSize: 10,
					pageNumber: 1,
					paras: {},
				},
			};
		},
		created() {
			this._gettableData();
		},
		methods: {
			clearAndQuery(json) {
				return Object.assign({}, this.sendOutDataJson.paras, json)
			},
			clickEventsOuter(e) {
				let json = this.clearAndQuery(e)
				this.sendOutDataJson.paras = json;
			},
			handleSelectionChangeDatas(e) {
				this.tableDataJson.selections = e;
			},
			querySelect(e) {
				let json = this.clearAndQuery(e)
				this.sendOutDataJson.paras = json;
				this._gettableData();
			},
			clearInput() {
				this.sendOutDataJson.paras = {};
				this._gettableData();
			},
			async _gettableData() {
				let data = await this.$pOrgProductsApp.pOrgPickOrderFindOrderPage(
					this.sendOutDataJson
				);
				if (data.code === "10000") {
					this._changeTableData(data.result);
				} else {
					this.$messageSelf.message({
						type: "error",
						message: "获取列表数据失败",
					});
				}
			},
			_changeTableData(json) {
				json.list.forEach(item=>{
					item.reCheckResults = item.reCheckResult?'成功':'失败'
				})
				this.tableDataJson.tabledata = json.list;
				this.pageComponentsData.pageNums = json.totalRow;
			},
		},
	};
</script>
