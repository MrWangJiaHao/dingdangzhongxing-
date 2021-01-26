<template>
	<headerKuanJia @clickQueryUser="clickQueryUser" @clearInputAll="clearInput">
		<xialaHeader class="mb16" :xiala-json="weituonGonshi" @weiTuoGonShiClick='gonshiClick'></xialaHeader>
		<!-- 委托 -->
		<xialaHeader class="mb16" :xiala-json="qudaoJson" @weiTuoGonShiClick='qudaoClick'></xialaHeader>
		<!-- 渠道 -->
		<xialaHeader class="mb16" :xiala-json="dindanlaiyuanJson" @weiTuoGonShiClick='laiyuanClick'></xialaHeader>
		<!-- 订单来源 -->
		<inputHeader class="mb16" :buhuodanhao-json="dindanhao" @changereplenishOrderNo='dindanhaoInput'></inputHeader>
		<!-- 订单号 -->
		<inputHeader class="mb16" :buhuodanhao-json="zidanhao" @changereplenishOrderNo='zidanhaoInput'></inputHeader>
		<!-- 子单号 -->
		<xialaHeader class="mb16" :xiala-json="fuehryuan" @weiTuoGonShiClick='fuheClick'></xialaHeader>
		<!-- 复核人员 -->
		<xialaHeader class="mb16" :xiala-json="fuhezhuangtai" @weiTuoGonShiClick='fuheRyuanClick'></xialaHeader>
		<!-- 复核状态 -->
		<xialaHeader class="mb16" :xiala-json="wuliuyuan" @weiTuoGonShiClick='wuliugonshiClick'></xialaHeader>
		<!-- 物流公司 -->
		<dateHeader class="mb16" :qianmiande-data="{ placeholder: '请选择复核开始时间' }" :houmiande-data="{ placeholder: '请选择复核结束时间' }"
		 title="复核开始时间" ref="fuheStart" @getTime='fuheTime'></dateHeader>
		<dateHeader class="mb16" title="拣货开始时间"  @getTime='jianhuoTime' :qianmiande-data="{ placeholder: '请选择拣货开始时间' }" :houmiande-data="{ placeholder: '请选择拣货结束时间' }"
		 ref="jianhuoStart"></dateHeader>
	</headerKuanJia>
</template>

<script>
	import headerKuanJia from "../../components/commin/headerKuanJia";
	import xialaHeader from "../headerCommin/xialaHeader";
	import inputHeader from "../headerCommin/inputHeader";
	import dateHeader from "../headerCommin/dateHeader";
	import { Heavy } from "../../utils/validate.js"
	export default {
		name: "index",
		components: {
			headerKuanJia,
			xialaHeader,
			inputHeader,
			dateHeader,
		},
		data() {
			return {
				weituonGonshi: {
					title: "委托公司",
					wieTuoGonShiJson: {
						placeholder: "请选择委托公司",
						w320: "w320",
						dropDownBoxData: [],
						select: "",
						drop: "orgName",
					},
					drop: "orgName",
				},
				qudaoJson: {
					title: "渠道",
					wieTuoGonShiJson: {
						placeholder: "请选择渠道",
						dropDownBoxData: [],
						select: "",
						drop: "channelName",
					},
					drop: "channelName",
				},
				dindanlaiyuanJson: {
					title: "订单来源",
					wieTuoGonShiJson: {
						placeholder: "请选择订单来源",
						dropDownBoxData: [],
						select: "",
						drop: "orderSourceName",
					},
					drop: "orderSourceName",
				},
				dindanhao: {
					title: "订单号",
					placeholder: "请输入订单号",
					input: "",
					drop: "orderNo",
				},
				zidanhao: {
					title: "子单号",
					placeholder: "请输入子单号",
					input: "",
					drop: "subOrderNo",
				},
				fuehryuan: {
					title: "复核人员",
					wieTuoGonShiJson: {
						placeholder: "请选择复核人员",
						dropDownBoxData: [],
						select: "",
						drop: "reCheckUser",
					},
					drop: "reCheckUser",
				},
				fuhezhuangtai: {
					title: "复核状态",
					wieTuoGonShiJson: {
						placeholder: "请选择复核状态",
						dropDownBoxData: [],
						select: "",
						drop: "reCheckResults",
					},
					drop: "reCheckResults",
				},
				wuliuyuan: {
					title: "物流公司",
					wieTuoGonShiJson: {
						placeholder: "请选择物流公司",
						dropDownBoxData: [],
						select: "",
						drop: "exprName",
					},
					drop: "exprName",
				},
				sendoutData: {},
			};
		},
		methods: {
			gonshiClick(e) {
				e = e || 0
				this.sendoutData.orgName = this.	weituonGonshi.wieTuoGonShiJson.dropDownBoxData[e].orgName
				this.sendoutData.orgId = this.	weituonGonshi.wieTuoGonShiJson.dropDownBoxData[e].orgId
			},
			qudaoClick(e) {	
				e = e || 0
				this.sendoutData.channelName = this.weituonGonshi.wieTuoGonShiJson.dropDownBoxData[e].channelName
			},
			laiyuanClick(e) {
				e = e || 0
				this.sendoutData.orderSourceName =
					this.qudaoJson.wieTuoGonShiJson.dropDownBoxData[e].orderSourceName
			},
			dindanhaoInput(e) {
				this.sendoutData.orderNo = e
			},
			zidanhaoInput(e) {
				this.sendoutData.subOrderNo = e
			},
			fuheClick(e) {
				e = e || 0
				this.sendoutData.reCheckUser = this.fuhezhuangtai.wieTuoGonShiJson.dropDownBoxData[e].reCheckUser
			},
			fuheRyuanClick(e){
				e = e || 0
				this.sendoutData.reCheckResults = this.fuehryuan.wieTuoGonShiJson.dropDownBoxData[e].reCheckResults
			},
			wuliugonshiClick(e){
			e = e || 0
				this.sendoutData.exprName = this.wuliuyuan.wieTuoGonShiJson.dropDownBoxData[e].exprName
			},
			fuheTime(e){
				this.sendoutData.checkStartTime = e.startTime
				this.sendoutData.checkEndTime = e.checkEndTime
			},
			jianhuoTime(e){
				this.sendoutData.pickStartTime = e.pickStartTime
				this.sendoutData.pickEndTime = e.pickEndTime
			},
			clickQueryUser() {
				this.$emit("querySelect", this.sendoutData);
			},
			clearInput() {
				this.weituonGonshi.wieTuoGonShiJson.select = ""; //委托公司
				this.qudaoJson.wieTuoGonShiJson.select = ""; //
				this.dindanlaiyuanJson.wieTuoGonShiJson.select = "";
				this.dindanhao.input = "";
				this.zidanhao.input = "";
				this.fuehryuan.wieTuoGonShiJson.select = "";
				this.fuhezhuangtai.wieTuoGonShiJson.select = "";
				this.wuliuyuan.wieTuoGonShiJson.select = "";
				this.$refs.fuheStart.clearTime();
				this.$refs.jianhuoStart.clearTime();
				this.sendoutData = {}
				this.$emit("clearInput", this.sendoutData);
			},
			changeData(arr){
				arr.forEach(item=>{
					item.reCheckResults = item.reCheckResult?'成功':'失败'
				})
				this.weituonGonshi.wieTuoGonShiJson.dropDownBoxData = Heavy(arr,'orgName');
				this.qudaoJson.wieTuoGonShiJson.dropDownBoxData = Heavy(arr,'channelName');
				this. dindanlaiyuanJson.wieTuoGonShiJson.dropDownBoxData = Heavy(arr,'orderSourceName');
				this. fuehryuan.wieTuoGonShiJson.dropDownBoxData = Heavy(arr,'reCheckUser');
				this. fuhezhuangtai.wieTuoGonShiJson.dropDownBoxData = Heavy(arr,'reCheckResults');
				this. wuliuyuan.wieTuoGonShiJson.dropDownBoxData = Heavy(arr,'exprName');
			},
			async _gettableData() {
				let data = await this.$pOrgProductsApp.pOrgPickOrderFindOrderPage(
					{
						pageSize: 1000,
						pageNumber: 1,
						paras: {},
					}
				);
				if (data.code === "10000") {
					this.changeData(data.result.list);
				} else {
					this.$messageSelf.message({
						type: "error",
						message: "获取列表数据失败",
					});
				}
			}
		},
		created() {
			this._gettableData()
		},
	};
</script>
