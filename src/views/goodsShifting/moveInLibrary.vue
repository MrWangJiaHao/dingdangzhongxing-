<template>
	<div id="fahuoguanli">
		<div class="manualBox">
			<div>
				<goodsShiftingHeader @queryClick="jobTaskHeader" @clearInters="jobTaskClearBtn" />
			</div>

			<div class="btnArr">
				<div class="backFF">
					<div class="meiyiyetitle">库内移动</div>
					<div class="btnClick">
						<div class="setUser" @click="isBuHuoSureJson">移库确认</div>
						<div class="setUser" @click="isReplenishmentNoteClick">
							打印移库单
						</div>
						<div class="setUser" @click="createOrderNoteFun">创建</div>
						<div class="setUser" @click="editOrderNote">编辑</div>
						<div class="remove" @click="removeIsOrderNode">删除</div>
					</div>
				</div>
				<!-- but按钮 -->
			</div>

			<div class="tableBox">
				<div class="tableBoxCol">
					<tableCommin :tableDataJson="tableDataJson" @tableSelectArr="tableSelectArrDaiBuHuo" />
					<!-- 待补货产品 -->
					<div class="pageComponent">
						<pagecomponent :pageComponentsData="pageComponentsData" @getPageNum="getPageNum" @sureSuccssBtn="sureSuccssBtn" />
					</div>
				</div>
			</div>
			<!-- table-biaoge -->
		</div>

		<!-- 补货单 start -->
		<div v-show="isReplenishmentNote" class="bjBox">
			<transition enter-active-class="animate__animated animate__zoomIn" leave-active-class="animate__animated animate__zoomOut">
				<div v-if="isReplenishmentNote">
					<delivetyNote :tabledatasArr="tabledatasArr" :ReplenishmentNote="replenishmentNoteJson" @getiswuliudanOne="getiswuliudanOne" />
				</div>
			</transition>
		</div>
		
		<!-- 补货单 end -->
		<!-- 创建移库单 & 编辑 start -->
		
		<div v-show="isOrderNote" class="bjBox">
			<transition enter-active-class="animate__animated animate__zoomIn" leave-active-class="animate__animated animate__zoomOut">
				<div v-if="isOrderNote">
					<createOrderReplen :beizhuObj="beizhuObj" @closeFn="isOrderNoteFun" @clickSubmit="clickSubmit"
					 @changpingmingxiData="changpingmingxiData" :editDataJson="editDataJson" :chanpinminxiJson="chanpinminxiJson"
					 :chuanjianJsonAndArr="moveCreateData" />
				</div>
			</transition>
		</div>
		<!-- 创建移库单 & 编辑 end -->

		<!-- 补货确认 start -->
		<div v-show="isBuHuoSures" class="bjBox">
			<transition enter-active-class="animate__animated animate__zoomIn" leave-active-class="animate__animated animate__zoomOut">
				<div v-if="isBuHuoSures">
					<createOrderSure :kuangjiaTitle="yikuSureOrDelite" :detailsJson="moveSureDetailsJson" :chanpinminxiJson="moveSureChanpinminxiJson"
					 @closeBtnSure="closeBtnSure" @tableSelectArrs="moveSuretableSelectArrs" :isLooker="isLooker" @sureSubmit="sureSubmit" />
				</div>
			</transition>
		</div>
		<!-- 补货确认 end -->
	</div>
</template>

<script>
	/*eslint-disable */
	import goodsShiftingHeader from "../../components/goodsShiftingCommin/moveInLibrayHeader.vue";
	import pagecomponent from "../../components/commin/pageComponent"; //分页器
	import delivetyNote from "../../components/commin/componentList"; //补货单
	import createOrderReplen from "../../components/goodsShiftingCommin/moveInLibraryCreate"; //创建补货单
	import createOrderSure from "../../components/sureYeMian/sureIndex"; //补货确认
	import {
		_childWareType,
		_getArrTarget,
		_removeData,
		_WareAreaType,
		getCookie,
	} from "../../utils/validate";
	import tableCommin from "../../components/commin/tableCommin";

	export default {
		components: {
			goodsShiftingHeader,
			delivetyNote,
			createOrderReplen,
			pagecomponent,
			tableCommin,
			createOrderSure,
		},
		data() {
			let self = this;
			return {
				yikuSureOrDelite:"移库确认",
				beizhuObj: {
					changeInputs: (e) => {
						self.createDataJson.remark = e;
					},
				},
				isLooker: false, //点击查看
				isBuHuoSures: false, // 补货确认
				daibuhuochanping: false, //点击了待补货产品
				isReplenishmentNote: false, //补货单
				isOrderNote: false, //创建补货单
				tableData: [],
				pageComponentsData: {
					pageNums: 0, //一共多少条 //默认一页10
				},
				replenishmentNoteJson: {
					title: "",
					replenishOrderNo: "",
					queryArr: [],
					basicJson: [{
						titles: "产品明细",
						basicJsonArr: [{
								types: "orgName",
								centerStr: "委托公司",
							},
							{
								types: "prodCode",
								centerStr: "产品编码",
							},
							{
								types: "prodName",
								centerStr: "产品名称",
							},
							{
								types: "specName",
								centerStr: "产品规格",
							},
							{
								types: "prodNum",
								centerStr: "申请移库数量",
								width: 220
							},
							{
								types: "prodNum",
								centerStr: "当前库位",
							},
							{
								types: "prodNum",
								centerStr: "实际移库数量",
								width: 220
							},
							{
								types: "wareAreaName",
								centerStr: "移入库位",
							},
						],
					}, ],
				},
				tabledatasArr: [], //data
				sendOutDataJson: {
					paras: {
						wareId: getCookie("X-Auth-wareId"),
					},
					pageNumber: 1, //当前页数
					pageSize: 10, //每页记录数
				},
				pickOrderNo: "",
				multipleSelection: [], //选择了那个
				tableDataJson: {
					tabledata: [],
					typeData: [{
							types: "selection",
						},
						{
							types: "index",
							label: "序号",
							width: 71,
						},
						{
							types: "innerMoveNo",
							label: "移库单号",
							flag: "puton",
							width: 250,
							OnClicks(res) {
								self.clickInnerMoveNo(res);
							},
						},
						{
							types: "moveStatuss",
							label: "移库单状态",
							width: 100,
							align: "center",
						},
						{
							types: "createUser",
							label: "创建人",
						},
						{
							types: "createTime",
							label: "创建时间",
							width: 200,
						},
						{
							types: "moveUser",
							label: "移库人",
						},
						{
							types: "innerMoveStartTime",
							label: "移库开始时间",
							width: 200,
						},
						{
							types: "innerMoveEndTime",
							label: "移库结束时间",
							width: 200,
						},
					],
				},
				editDataJson: {}, //编辑
				BuHuoSureJson: {}, //补货确认
				//创建数据 start
				createDataJson: {
					id: "", //移库单id
					innerMoveEndTime: "", //移库开始时间
					innerMoveNo: "", //移库单号
					innerMoveStartTime: "", //移库结束时间
					moveStatus: 1, //移库状态（1-待移动 2-移动中 3已移动)
					moveUser: "", //移库人
					operatorType: 1, //操作状态(1-新增 2-修改 3-入库确认)
					remark: "", //备注
					detailList: [], //移库产品明细集合
					wareType: "", //仓库类型（1-销售；2-售后；3-残次品）
				},
				moveCreateData: {
					title: "创建移库单",
					inputArr: [{
							title: "子仓名称",
							disabled: false,
							types: "xiala",
							select: "",
							w320: "w160",
							placeholder: "请选择子仓名称",
							dropDownBoxData: [],
							drop: "childWareName",
							dropDownXialaClickFun(params) {
								self.$pOrgProductsApp.query_WH_Request({}).then((res) => {
									self.moveCreateData.inputArr[0].dropDownBoxData =
										self.$messageSelf.isDataCodeExistence(res).list || [];
								});
							},
							getDropDownChangeDataFun(e) {
								console.log(_childWareType(self.createDataJson.wareType));
								self.createDataJson = {
									...self.createDataJson,
									childWareId: self.moveCreateData.inputArr[0].dropDownBoxData[e].id || 0,
									wareType: self.moveCreateData.inputArr[0].dropDownBoxData[e].wareType,
									wareAreaId: "",
									wareAreaType: "",
									wareAreaCode: "",
								};
								self.moveCreateData.inputArr[1].select = _childWareType(
									self.createDataJson.wareType
								);
							},
						},
						{
							title: "子仓类型",
							disabled: true,
							types: "xiala",
							select: "",
							w320: "w160",
							placeholder: "请选择子仓类型",

							dropDownBoxData: [],
							drop: "",
							dropDownXialaClickFun() {},
							getDropDownChangeDataFun() {},
						},
						{
							title: "区域名称",
							disabled: false,
							types: "xiala",
							select: "asdsads",
							input: "",
							w320: "w160",
							placeholder: "请选择区域名称",
							dropDownBoxData: [],
							drop: "wareAreaName",
							dropDownXialaClickFun() {
								if (!self.createDataJson.childWareId)
									return self.$messageSelf.message("请选择子仓名称");
								self.$pOrgProductsApp
									.queryAreaOfWS(self.createDataJson)
									.then((res) => {
										let datas = self.$messageSelf.isDataCodeExistence(res);
										self.moveCreateData.inputArr[2].dropDownBoxData = datas || [];
									});
							},
							getDropDownChangeDataFun(e) {
								self.createDataJson = {
									...self.createDataJson,
									wareAreaId: self.moveCreateData.inputArr[2].dropDownBoxData[e].id,
									wareAreaType: self.moveCreateData.inputArr[2].dropDownBoxData[e]
										.wareAreaType,
									wareAreaCode: self.moveCreateData.inputArr[2].dropDownBoxData[e]
										.wareAreaCode,
								};
								self.moveCreateData.inputArr[3].select = _WareAreaType(
									self.createDataJson.wareAreaType
								);
								self.moveCreateData.inputArr[4].input =
									self.createDataJson.wareAreaCode;
							},
						},
						{
							title: "区域类型",
							disabled: true,
							types: "xiala",
							select: "",
							w320: "w160",
							placeholder: "请选择区域类型",
							dropDownBoxData: [],
							drop: "",
							dropDownXialaClickFun() {},
							getDropDownChangeDataFun() {},
						},
						{
							title: "区域编号",
							disabled: true,
							types: "search",
							input: "",
							w320: "w160",
							placeholder: "请输入区域编号",
							dropDownBoxData: [],
							drop: "",
							searchCenter: "",
						},
					],
				},
				moveSureDetailsJson: {
					title: "移库确认详情",
					detailsArr: [{
							titles: "移库单号",
							centers: "",
						},
						{
							titles: "移库状态",
							centers: "待移库",
						},
						{
							titles: "创建时间",
							centers: "",
						},
						{
							titles: "创建人",
							centers: "",
						},
						{
							titles: "移库时间",
							centers: "",
							type: "date",
							disabled: false,
							getDateTimeExpectedSendTime(res) {
								self.createDataJson.innerMoveStartTime = res;
							},
						},
						{
							titles: "移库人",
							centers: "",
							type: "input",
							input: "",
							disabled: false,
							placeholder: "请输入移库人姓名",
							OnBlur(res) {
								res = res.target.value;
								self.createDataJson.moveUser = res;
							},
						},
					],
				},
				moveSureChanpinminxiJson: {
					title: "产品明细",
					moveSureChanPInarr: [],
					copyShopping() {
						if (!self.createDataJson.detailList.length)
							return self.$messageSelf.message("请选择要复制的产品");
						let arr = _removeData(
							self.moveSureChanpinminxiJson.tableDataJsonAndArr.tabledata,
							self.createDataJson.detailList,
							true
						);
						self.moveSureChanpinminxiJson.tableDataJsonAndArr.tabledata = arr;
						self.createDataJson.detailList = arr;
					},
					removeShopping() {
						let arrs = _removeData(
							self.moveSureChanpinminxiJson.tableDataJsonAndArr.tabledata,
							self.createDataJson.detailList
						);
						self.moveSureChanpinminxiJson.tableDataJsonAndArr.tabledata = arrs;
						self.createDataJson.detailList = arrs;
					},
					tableDataJsonAndArr: {
						tabledata: [],
						typeData: [{
								types: "selection",
							},
							{
								types: "index",
								label: "序号",
								width: 71,
							},
							{
								types: "orgName",
								label: "委托公司",
								width: 120,
							},
							{
								types: "prodCode",
								label: "产品编码",
							},
							{
								types: "prodName",
								label: "产品名称",
								width: 120,
							},
							{
								types: "",
								label: "产品规格",
							},
							{
								label: "品牌",
								types: "",
							},
							{
								types: "",
								label: "当前库位产品数量",
								width: 200
							},
							{
								types: "",
								label: "移入库位产品数量",
								width: 200

							},
							{
								types: "",
								label: "移入库位最大存货数",
								width: 200

							},
							{
								types: "",
								label: "申请移库数量",
								width: 200

							},
							{
								types: "",
								label: "*实际移库数量",
								width: 250,
								flag: "input",
								inputType: "number",
								placeholder: "请输入实际移库数量",
								drop: "value",
								OnBlur: (e, data) => {
									console.log(e, data);
								},
							},
							{
								types: "",
								label: "批次号",
								width: 250,
							},
							{
								types: "",
								label: "生产日期",
								width: 250,
							},
							{
								types: "",
								label: "*移出库位",
								width: 250,
							},
							{
								types: "",
								label: "*移入库位",
								width: 250,
							},
						],
					},
				},
				changeInputs(e) {
					console.log(e);
				},
				chanpinminxiJson: {
					title: "产品明细",
					tableDataJsonAndArr: {
						tabledata: [],
						typeData: [{
								types: "selection",
								width: 55,
								align: "center",
							},
							{
								types: "index",
								width: 71,
								label: "序号",
								align: "center",
							},
							{
								types: "orgName",
								label: "委托公司",
							},
							{
								types: "prodCode",
								label: "产品编码",
							},
							{
								types: "prodName",
								label: "产品名称",
							},
							{
								types: "specName",
								label: "产品规格",
							},
							{
								types: "braName",
								label: "品牌",
							},
							{
								types: "prodNum",
								label: "当前库位产品数量",
								width: 250,
							},
							{
								types: "prodNum",
								label: "移入库位产品数量",
								width: 250,
							},
							{
								types: "maxNum",
								label: "移入库位最大存货数",
								width: 250,
							},
							{
								types: "prodNum",
								label: "申请移库数量*",
								width: 250,
								flag: "input",
								placeholder: "请输入申请移库数量",
								OnBlur(e, data) {
									console.log(e, data, this);
								},
							},
							{
								types: "wareSeatNo",
								label: "移出库位*",
								width: 250,
								flag: "xiala",
								dropDowBox: {
									placeholder: "请选择移出库位",
									dropDownBoxData: [],
									select: "",
								},
								drop: "wareSeatNo",
								cliclInput(e) {
									this.dropDowBox.dropDownBoxData = e.prodSeatList;
								},
								getDropDownData(e) {
									console.log(e);
								},
							},
							{
								types: "inWareSeatNo",
								label: "移入库位*",
								width: 250,
								flag: "xiala",
								dropDowBox: {
									placeholder: "请选择移入库位",
									dropDownBoxData: [],
									select: "",
								},
								drop: "storageSeatNo",
								cliclInput(e) {
									this.dropDowBox.dropDownBoxData = e.prodSeatList2;
								},
								getDropDownData(e) {
									// .dropDownBoxData[e][this.drop]
									console.log(this, e);
								},
							},
						],
					},
				},
				//创建数据 end
			};
		},
		created() {
			this.getTableData();
		},
		methods: {
			//点击移库单号
			clickInnerMoveNo(data) {
				this.yikuSureOrDelite='移库详情'
				this.changePageSureData(data);
				this._getdetailsChanPin(data);
				this.isBuHuoSures = true;
				this.isLooker = true;
			},
			_clearchanpinminxiJson() {
				this.chanpinminxiJson.tableDataJsonAndArr.tabledata = [];
				this.createDataJson = {
					id: "", //移库单id
					innerMoveEndTime: "", //移库开始时间
					innerMoveNo: "", //移库单号
					innerMoveStartTime: "", //移库结束时间
					moveStatus: 1, //移库状态（1-待移动 2-移动中 3已移动)
					moveUser: "", //移库人
					operatorType: 1, //操作状态(1-新增 2-修改 3-入库确认)
					remark: "", //备注
					detailList: [], //移库产品明细集合
					wareType: "", //仓库类型（1-销售；2-售后；3-残次品）
				};
				this.moveCreateData.inputArr.forEach((item) => {
					if (item.select) {
						item.select = "";
					} else if (item.input) {
						item.input = "";
					}
				});
			},
			//产品明细
			moveSuretableSelectArrs(e) {
				this.moveSureChanpinminxiJson.moveSureChanPInarr = e;
				this.createDataJson.detailList = e;
			},
			changpingmingxiData(e) {
				this.chanpinminxiJson.tableDataJsonAndArr.tabledata = e;
			},
			//创建
			createOrderNoteFun() {
				this.editDataJson = {};
				this._clearchanpinminxiJson();
				this.isOrderNote = true;
			},
			async clickSubmit(e) {
				this.createDataJson.detailList = e;
				let data = await this.$pOrgProductsApp.pWarehouseInnerMoveSaveRecord(
					this.createDataJson
				)
				this.$messageSelf.isCode10000(data, data.msg, data.msg, () => {
					this.closeBtnSure()
				})
			},
			//编辑
			editOrderNote() {
				if (!this.multipleSelection.length || this.multipleSelection.length != 1)
					return this.$messageSelf.message({
						message: "请选择要编辑的移库单,并且只能选择一个编辑",
						type: "warning",
					});
				this.createDataJson.operatorType = 2;
				let data = Object.assign({}, this.editDataJson, this.createDataJson);
				data = Object.assign({}, data, this.multipleSelection[0]);
				console.log(data, "编辑");
				this._getdetailsChanPin(this.multipleSelection[0], (data) => {
					this.chanpinminxiJson.tableDataJsonAndArr.tabledata = data;
				});
				this.isOrderNote = true;
			},
			//删除
			removeIsOrderNode() {
				let self = this;
				if (!this.multipleSelection.length)
					return this.$messageSelf.message("请选择要删除的移库单");
				this.$messageSelf
					.confirms("确认删除改移库单号？", "提示", {
						type: "info",
					})
					.then(() => {
						this.$pOrgProductsApp
							.pWarehouseInnerMoveDelRecord({
								ids: _getArrTarget(this.multipleSelection, "id"),
							})
							.then((res) => {
								self.$messageSelf.isDataCodeExistence(res, (res) => {
									self.$messageSelf.message(res.msg);
									self.getTableData();
								});
							});
					});
			},
			//确定移货
			isBuHuoSureJson() {
				if (!this.multipleSelection.length || this.multipleSelection.length != 1)
					return this.$messageSelf.message({
						message: "请选择要确认的移库单,并且只能选择一个确认",
						type: "warning",
					});
					this.yikuSureOrDelite='移库确认'
				this.createDataJson.moveStatus = 3;
				this.createDataJson.operatorType = 3;
				this.createDataJson.id = this.multipleSelection[0].id;
				this.createDataJson.wareType = this.multipleSelection[0].wareType;
				this.BuHuoSureJson = this.multipleSelection[0];
				this.changePageSureData(this.multipleSelection[0]);
				this._getdetailsChanPin(this.multipleSelection[0]);
				this.isLooker = false;
				this.isBuHuoSures = true;
			},
			changePageSureData(json) {
				let moveSureDateArr = [
					"innerMoveNo",
					"moveStatus",
					"createTime",
					"createUser",
					"innerMoveStartTime",
					"moveUser",
				];
				moveSureDateArr.forEach((item, idx) => {
					if (item === "innerMoveStartTime") {
						json[item] = json[item] ? json[item] : "请选择移库时间";
					}
					this.moveSureDetailsJson.detailsArr[idx].centers = json[item];
				});
			},
			async _getdetailsChanPin(e, fn) {
				let data = await this.$pOrgProductsApp.pWarehouseInnerMoveFindRecord({
					id: e.id,
				});
				console.log(data, "dataTable列表错误");
				if (data.code === "10000") {
					fn && fn(data);
					data.result.forEach((item) => {
						this.chanpinminxiJson.tableDataJsonAndArr.tabledata = item.detailList;
					});
				} else {
					this.$messageSelf.message({
						message: "打印移库单Table列表错误",
						type: "error",
					});
				}
			},
			shenchengbuhuodan() {
				this.isOrderNote = true;
			},
			closeBtnSure() {
				this.isBuHuoSures = false;
				this.getTableData();
			},
			isOrderNoteFun() {
				this._clearchanpinminxiJson();
				this.getTableData();
				this.isOrderNote = false;
			},
			//打印移库单
			isReplenishmentNoteClick() {
				if (!this.multipleSelection.length || this.multipleSelection.length != 1)
					return this.$messageSelf.message({
						message: "请选择要打印的移库单,以及移库单只能打印一张",
						type: "warning",
					});
				let json = [{
						queryTitle: "移库单号",
						queryCenter: this.multipleSelection[0].innerMoveNo ?
							this.multipleSelection[0].innerMoveNo :
							"",
					},
					{
						queryTitle: "移库人（签字）",
						queryCenter: "",
						queryLine: true, //是否有横线
					},
					{
						queryTitle: "移库时间",
						queryCenter: "",
						queryLine: true,
					},
				];
				this.replenishmentNoteJson.queryArr = json;
				this.replenishmentNoteJson.title = "移库单";
				this.replenishmentNoteJson.replenishOrderNo = this.multipleSelection[0].innerMoveNo;
				this._getdetailsChanPin(this.multipleSelection[0]);
				this.isReplenishmentNote = true;
			},
			jobTaskHeader(e) {
				this.sendOutDataJson.paras = Object.assign({},
					this.sendOutDataJson.paras,
					e
				);
				this.getTableData();
			},
			jobTaskClearBtn() {
				this.sendOutDataJson.paras = {}
				this.getTableData();
			},
			getiswuliudanOne(e) {
				this.isReplenishmentNote = e;
			},
			goToDetailOut(e) {
				this.BuHuoSureJson = e;
				this._getdetailsChanPin(e);
				this.isLooker = true;
				this.isBuHuoSures = true;
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
			//表格发生了变化以及点击了查询按钮
			getParasJson(data) {
				this.sendOutDataJson.paras = { ...data
				};
				this.getTableData();
			},
			//获取table表格内容
			async getTableData(fn) {
				let datas = await this.$pOrgProductsApp.pWarehouseInnerMoveFindRecordPage(
					this.sendOutDataJson
				);
				if (datas.code == "10000") {
					this._changeDatas(datas.result);
				} else {
					this.$messageSelf.message({
						message: datas.msg,
						type: "error"
					});
				}
				fn && fn(datas);
				return datas;
			},
			_changeDatas(datas) {
				datas.list.forEach(item => {
					item.moveStatuss = this.moveStatussFn(item.moveStatus)
				})
				this.tableData = datas.list;
				this.pageComponentsData.pageNums = datas.totalRow;
				//点击生产补货单
				datas.list.forEach((item) => {
					item.moveStatus = this.movestatusData(item.moveStatus);
				});
				this.tableDataJson.tabledata = datas.list;
			},
			moveStatussFn(i) {
				console.log(i)
				switch (i) {
					case 1:
						return '待移动';
						break;
					case 2:
						return '移动中';
						break;
					case 3:
						return '已移动';
						break;
					case 0:
						return '待移动';
					default:
						"未定义"

				}
			},
			sureSubmit(e) {
				if (!this.createDataJson.innerMoveStartTime)
					return this.$messageSelf.message({
						type: "warning",
						message: "请选择移库时间",
					});
				if (!this.createDataJson.moveUser)
					return this.$messageSelf.message({
						type: "warning",
						message: "请选择移库人",
					});
				this.clickSubmit();
			},
			movestatusData(res) {
				return res == 1 ?
					"待移动" :
					res == 2 ?
					"移动中" :
					res == 3 ?
					"已移动" :
					"未定义";
			},
			tableSelectArrDaiBuHuo(e) {
				this.multipleSelection = e;
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
		margin-right: 10px;
		@include BtnFunction("success");
	}
</style>
