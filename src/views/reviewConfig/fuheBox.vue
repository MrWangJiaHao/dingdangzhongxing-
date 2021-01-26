<template>
	<div class="p20s fuhuBoxCenter">
		<div class="backD1 mb20">
			<div class="p20s">
				<div class="mb10 titlesBox"	>
				950149632935009173-2
					发货单条形码: <input class="input" v-model="subOrderNo" placeholder="请扫描/输入发货单条形码" @keyup.enter="querSuborderNo" @focus="subOrderNo = '' "
					 type="text">
				</div>
				<div v-for="(itemsss,indexsss) in headerConter" :key="indexsss" class="inline titlesBox mb16 mr60">
					<span>{{itemsss.title}}:</span>
					<span v-if="itemsss.center" :class="itemsss.class || ''">&nbsp;{{itemsss.center}}</span>
				</div>	
				<div class="titlesBox">
					复核结果:
					<span>订单拣货正确；订单多拣XX产品，请放到异常区，其它产品正常发货；订单少拣XX产品，请将整单放置异常区</span>
				</div>
			</div>
		</div>
		<!-- 头部-->
		<div class="mb20">
			<centerBtnArr title="待复核明细" :isShowIdx="true" :btnArr="btnArr"></centerBtnArr>
			<tableCommin :tableDataJson="tableDataJson"></tableCommin>
		</div>
		<!--待复核明细-->
		<div>
			<centerBtnArr title="已复核明细" :isShowIdx="true"></centerBtnArr>
			<tableCommin :tableDataJson="isFuHeDataJson"></tableCommin>
		</div>
		<!--已复核明细-->
		<div class="videoBox" v-if="video">

		</div>
		<!--video-->
	</div>
</template>
<style scoped>
	.fuhuBoxCenter .input {
		width: 240px;
		height: 40px;
		background: #FFFFFF;
		border: 1px solid #D1D6E2;
		border-radius: 4px;
		font-size: 16px;
		color: #333333;
		text-indent: 10px;
	}
</style>
<script>
	import centerBtnArr from '../../components/centerBtnArr'
	import tableCommin from "../../components/commin/tableCommin";

	export default {
		name: "fuheBox",
		components: {
			centerBtnArr,
			tableCommin
		},
		data() {
			let self = this
			return {
				video: false,
				subOrderNo: "",
				btnArr: [{
						title: "重新复核",
						class: " bianjiUser mr10",
						onClick: () => {
							self.isFuHeDataJson.tabledata = []
						},
					},
					{
						title: "复核完成",
						class: " bianjiUser ",
						onClick: () => {
							self.btnArr.shift()
						},
					}
				],
				tableDataJson: {
					typeData: [{
							types: "index",
							width: 71,
							label: "序号"
						},
						{
							types: "prodFullName",
							label: "产品名称"
						},
						{
							types: "prodCode",
							label: "产品编码"
						},
						{
							types: "specName",
							label: "产品规格"
						},
						{
							types: "prodNum",
							label: "数量"
						}
					],
					tabledata: []
				},
				isFuHeDataJson: {
					typeData: [{
							types: "index",
							width: 71,
							label: "序号"
						},
						{
							types: "prodName",
							label: "产品名称"
						},
						{
							types: "prodName",
							label: "产品编码"
						},
						{
							types: "prodName",
							label: "产品规格"
						},
						{
							types: "prodName",
							label: "数量"
						},
						{
							types: 'result',
							label: '结果'
						}
					],
					tabledata: []
				},
				headerConter: [{
						title: "发货条形码",
						class:''
					},
					{
						title: "产品总数"
					},
					{
						title: "待扫产品数",
						center:"3",
						class:"colred"
					},
					{
						title: '委托公司'
					},
					{
						title: '发货物流'
					},
					{
						title: '箱型'
					},
					{
						title: '复核人',
					},
					{
						title: '复核开始时间',
					}
				],
				fuhejieguo: "asdsa",
				jieguoArr:['suborderNo','prods.length','prodsLength','supName']
			}
		},
		methods: {
			querSuborderNo() {
				if(!this.subOrderNo) return this.$messageSelf.message({
					type:"warning",
					message:'请扫描/输入发货单条形码'
				})
				this.getSuborderNoFun()
			},
			async getSuborderNoFun() {
				let {subOrderNo } = this,
					data = await this.$api.pOrgOrderReCheckFindSubOrderDetail({subOrderNo})
				if(data.code==='10000'){
					this._changeDatasArr(data.result)
				}else{
					this.$messageSelf.message({
						type:'error',
						message:data.msg
					})
				}
			},
			_changeDatasArr(data){
				let { prods } = data
				prods.forEach(item=>{
					item.gaolian = false
				})
				this.tableDataJson.tabledata = prods
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Nums {
		color: #DF1515;
	}


	.titlesBox {
		font-size: 16px;
		color: #333333;
	}

	.videoBox {
		position: absolute;
		right: 30px;
		top: 120px;
		z-index: 100;
		min-width: 480px;
		min-height: 270px;
		background: #000000;
		border-radius: 2px;

	}
</style>
