<template>
	<div>
		<headerKuanJia parentHeader='100px'>
			<template>
				<dropDownXiala :xiala-json='huojiaJson'></dropDownXiala>
				<!-- 货架名称 -->
				<dropDownXiala :xiala-json='typeJson'></dropDownXiala>
				<dropDownXiala :xiala-json='otherJson'></dropDownXiala>
			</template>
		</headerKuanJia>
		<centerBtnArr title='货架管理' :btnArr='btnArr'></centerBtnArr>
		<div class="pd10">
			<div class="tableInInput tableBoxCol center" id="purchasingIndexss">
				<tableCommin :tableDataJson="tableDataJson" @tableSelectArr="handleSelectionChangeDatas">
				</tableCommin>
				<div class="pageComponent ">
					<pageComponent :pageComponentsData="pageComponentsData" @getPageNum='sureSuccssBtn' @sureSuccssBtn='sureSuccssBtn'>
					</pageComponent>
				</div>
			</div>
		</div>
		<!--  table 内容   -->
	</div>
</template>
<script>
	import headerKuanJia from "../../components/commin/headerKuanJia"
	import tableCommin from "../../components/commin/tableCommin.vue"
	import centerBtnArr from "../../components/centerBtnArr/index.vue"
	import dropDownXiala from "../../components/headerCommin/xialaHeader.vue"
	import pageComponent from "../../components/commin/pageComponent.vue"
	import { _getArrTarget } from "../../utils/validate.js"
	export default {
		components: {
			headerKuanJia,
			tableCommin,
			centerBtnArr,
			dropDownXiala,
			pageComponent
		},
		data() {
			return {
				mutilatesArr: [],
				tableDataJson: {
					tabledata: [],
					typeData: [{
							types: "selection"
						},
						{
							types: "index",
							label: "序号",
							width: 71
						},
						{
							types: "shelfCode",
							label: "货架编号",
						},
						{
							types: "shelfTypes",
							label: "货架类型",
						},
						{
							types: "shelfName",
							label: "货架名称",
						},
						// {
						// 	types: "shelfName",
						// 	label: "货架层数",
						// },
						{
							types: "shelfLevelNum",
							label: "货架列数",
						},
						{
							types: "shelfLength",
							label: "货架长（m）",
						},
						{
							types: "shelfWidth",
							label: "货架宽（m）",
						},
						{
							types: "shelfWidth",
							label: "货架宽（m）",
						},
						{
							types: "shelfHight",
							label: "货架高（m）",
						},
						{
							types: "shelfVolume",
							label: "库位存放体积（m³）",
							width: 160
						},
						// {
						// 	types: "shelfVolume",
						// 	label: "货位数量",
						// 	}
						{
							types: "enableStatuss",
							label: "使用状态",
						},
						{
							types: "createUser",
							label: "创建人",
						},
						{
							types: "createTime",
							label: "创建时间",
						}
					]

				},
				pageComponentsData: {
					pageNums: 0
				},
				huojiaJson: {
					title: "货架名称",
					wieTuoGonShiJson: {
						placeholder:'请选择货架名称',
						select:"",
						dropDownBoxData:[]
					},
					drop: "shelfName",
					w320: "w160",
				},
				typeJson: {
					title: "货架类型",
					wieTuoGonShiJson: {
						placeholder:'请选择货架类型',
						select:"",
						dropDownBoxData:[]
					},
					drop: "shelfTypes",
					w320: "w160",
				},
				otherJson: {
					title: "使用状态",
					wieTuoGonShiJson: {
						placeholder:'请选择使用状态',
						select:"",
						dropDownBoxData:[]
					},
					drop: "enableStatuss",
					w320: "w160",
				},
				btnArr: [{
						title: "创建",
						onClick() {

						},
						class: "mr10 bianjiUser"
					},
					{
						title: "编辑",
						onClick() {

						},
						class: "mr10 bianjiUser"
					},
					{
						title: "删除",
						onClick() {

						},
						class: "remove"
					},
				],
				sendOutData: {
					pageNumber: 1,
					pageSize: 10,
					paras: {}
				}
			}
		},
		created() {
			this.getTable()
		},
		methods: {
			sureSuccssBtn(e){
				this.sendOutData.pageNumber = e
				this.getTable()
			},
			
			//货架类型(1-存储类货架;2-拣货类货架)
			handleSelectionChangeDatas(e) {
				this.mutilatesArr = e
			},
			async getTable() {
				let data = await this.$api.pWarehouseShelfFindRecordPage(this.sendOutData)
				console.log(data)
				this._childrenData(data.result)
			},
			_childrenData(json){
				json.list.forEach(item=>{
					item.shelfTypes = item.shelfType ==1 ? '存储类货架':'拣货类货架'
					item.enableStatuss = item.enableStatuss ==1 ? '已使用':'未使用'
				})
				this.tableDataJson.tabledata = json.list
				this.pageComponentsData.pageNums = json.totalRow
			}
		}
	}
</script>

<style lang="scss" scoped=""></style>
