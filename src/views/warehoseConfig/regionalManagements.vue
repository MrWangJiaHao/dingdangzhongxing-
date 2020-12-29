<template>
    <div class="userSettingBox mb16">
        <div class="fuzzyQueryBox clearfix mb16 ">
            <div class="biaogeBox dispalywrap fl">
                <div class="displayalign zujianBox">
                    <div class="noneIconTitle mr11">子仓名称:</div>
                    <div class="mr20 w160">
                        <el-select
                                v-model="pagingQueryData.paras.childWareName"
                                slot="prepend"
                                placeholder="请选择子仓名称"
                                @input="getwareHouseValue"
                        >
                            <el-option
                                    v-for="(item, idx) in nameOfSubwareHouseDataArr"
                                    :key="idx"
                                    :label="item.childWareName"
                                    :value="idx"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <!-- 子仓名称 -->
                <div class="zujianBox">
                    <div class="displayalign zujianBox">
                        <div class="noneIconTitle mr11">区域类型:</div>
                        <div class="mr20 w150">
                            <el-select
                                    v-model="wareAreaTypeJson.wareAreaName"
                                    placeholder="请选择区域类型"
                                    @input="getAreaValue"
                            >
                                <el-option
                                        v-for="(item, idx) in wareAreaTypeJson"
                                        :key="idx"
                                        :label="item.wareAreaName"
                                        :value="idx"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <!-- 区域类型 -->
                <div class="zujianBox">
                    <div class="displayalign zujianBox">
                        <div class="noneIconTitle mr11">区域名称:</div>
                        <div class="mr20 w160">
                            <el-select
                                    v-model="pagingQueryData.paras.wareAreaName"
                                    slot="prepend"
                                    placeholder="请选择区域名称"
                                    @change="getAreaNameValue"
                                    @focus="getQuYuData"
                            >
                                <el-option
                                        v-for="(item, idx) in AreaName.AreaNameData"
                                        :key="idx"
                                        :label="item.wareAreaName"
                                        :value="idx"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <!-- 区域名称 -->
            </div>
            <div class="btns inline  btnArrs fr">
                <div class="nowrap">
                    <div class="queryBtn inline mr11 zujianBox"   @click="clickQueryUser">
                        查询
                    </div>
                    <div class="clearBtn inline" @click="clearInputAll">清空</div>
                </div>

            </div>
        </div>
        <!-- 头部 -->
        <div class="btnArr">
            <div class="backFF">
                <div class="meiyiyetitle">区域管理</div>
                <div class="btnClick">
                    <div class="goOn" @click="shelfSetting">货架设置</div>
                    <div class="lodopFunClear" @click="areaPlan">区域平面图</div>
                    <div class="lodopFunClear" @click="warehousePlan">库位平面图</div>
                    <div class="setUser" @click="createSubWarehouse">创建</div>
                    <div class="bianjiUser" @click="editBtn">编辑</div>
                    <div class="remove" @click="clearWarehouseplan">删除</div>
                </div>
            </div>
        </div>
        <!-- but按钮 -->

        <div v-show="quyuLook" class="bjBox">
            <div
                    v-show="quyuLook"
                    class="pofixCenter displayCenter"
            >
                <transition
                        enter-active-class="animate__animated animate__zoomIn"
                        leave-active-class="animate__animated animate__zoomOut"
                >
                    <div v-if="quyuLook" class="quyupinmianBoxMsg">
                        <kuanjiaClick titles="区域平面图" @closeBtn="quyuLook = !quyuLook" @clickSubmit=""
                                      :isLookerShow="false" print="关闭">
                            <template>
                                <div class="bkf p20 botD1">
                                    <div class="setTitle mb20">货架编号</div>
                                    <div class="displayalign flexBetWeen">
                                        <div class="displayalign">
                                            <div class="mr20">
                                                <div class="displayalign">
                                                    <div class="noneIconTitle mr11">
                                                        子仓名称
                                                        <span class="visibilityHidden">*</span>:
                                                    </div>
                                                    <div class="w160">
                                                        <el-select
                                                                v-model="
                          quyuzicanNameOfSubWareHouse.nameOfSubWareHouseName
                        "
                                                                slot="prepend"
                                                                :placeholder="nameOfSubWareHouse.placeholder"
                                                                @input="getZicankuOfSunWareHouseWareId"
                                                        >
                                                            <el-option
                                                                    v-for="(
                            item, idx
                          ) in quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData"
                                                                    :key="idx"
                                                                    :label="item.childWareName"
                                                                    :value="idx"
                                                            ></el-option>
                                                        </el-select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="displayalign">
                                                <div class="noneIconTitle mr11">区域类型:</div>
                                                <el-radio v-model="quyuleixingMsg" label="1">存储区</el-radio>
                                                <el-radio v-model="quyuleixingMsg" label="2">拣货区</el-radio>
                                            </div>
                                        </div>
                                        <div class="bianjiUser" @click="dinjichaxunquyutu">查询</div>
                                    </div>
                                </div>
                                <div class="centers bkf p20 botD1" v-if="quyuDatas.regionalManage.length">
                                    <div class="displayalign mb20">
                                        {{quyuMsg}}区域平面图（
                                        <div class="juli">上北、下南、左西、右东</div>
                                        ）
                                    </div>
                                    <div class="zuti bkf p20">
                                        <quyuLooker :quyuDatas="quyuDatas"></quyuLooker>
                                    </div>
                                </div>
                            </template>
                        </kuanjiaClick>
                    </div>
                </transition>

            </div>
            <!-- 关闭部分 -->
        </div>
        <!-- 区域平面图 -->
        <div v-show="kuwieLook" class="bjBox">

            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div
                        v-if="kuwieLook"
                        class="pofixCenter displayCenter"
                >
                    <kuanjiaClick titles="库位平面图" @closeBtn="kuwieLook = !kuwieLook" @clickSubmit=""
                                  :isLookerShow="false" print="关闭">
                        <div class="quyupinmianBoxMsgs" :style="{
                        width:kuwieDatas.kuwie.length?'':'1000px'
                    }">
                            <div class="bkf p20 ">
                                <div class="setTitle mb20">库位编号</div>
                                <div>
                                    <kuwieLooker :kuwieLookerDataJson="kuwieDatas"/>
                                </div>
                            </div>
                        </div>
                    </kuanjiaClick>
                </div>
            </transition>

        </div>
        <!-- 库位平面图 -->
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
                                width="82"
                                align="center"
                                 fixed="left"
                        ></el-table-column>
                        <el-table-column
                                label="序号"
                                type="index"
                                width="71"
                                align="center"
                                show-overflow-tooltip
                        />
                        <el-table-column
                                label="子仓名称"
                                prop="childWareName"
                                width="120"
                                show-overflow-tooltip
                        />
                        <el-table-column
                                label="区域类型"
                                property="wareAreaType"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                width="130"
                                label="区域名称"
                                prop="wareAreaName"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                width="119"
                                label="区域长(m)"
                                align="center"
                                prop="wareAreaLength"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="区域宽(m)"
                                align="center"
                                width="119"
                                prop="wareAreaWidth"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="货架总排数"
                                width="119"
                                align="center"
                                prop="rowNum"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="货架总数"
                                align="center"
                                width="119"
                                prop="shelfNum"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="货架总库位数"
                                align="center"
                                width="119"
                                prop="seatNum"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="已用库位"
                                width="119"
                                prop="useSeat"
                                align="center"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="未使用库位"
                                width="119"
                                align="center"
                                prop="noSeat"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                label="创建人"
                                width="120"
                                align="center"
                                prop="createUser"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column label="创建时间" width="250">
                            <template slot-scope="scope">{{ scope.row.createTime }}</template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pageComponent">
                    <pagecomponent
                            :pageComponentsData="pageComponentsData"
                            @getPageNum="getPageNum"
                            @sureSuccssBtn="sureSuccssBtn"
                    />
                </div>
                <!-- 表格主体 -->
            </div>
        </div>
        <!-- table表格 -->
    </div>
</template>

<script>
    /*eslint-disable*/
    import pagecomponent from "../../components/commin/pageComponent"; //分页器
    import {post} from "../../api/api";
    import {mapState} from "vuex";
    import quyuLooker from "../../components/quyuLooker";
    import kuwieLooker from "../../components/kuwieLooker";
    import {getCookie} from "../../utils/validate";
    import headerKuanJia from "../../components/commin/headerKuanJia";
    import kuanjiaClick from "../../components/commin/kuanjiaClick";

    export default {
        components: {
            pagecomponent,
            quyuLooker,
            kuwieLooker,
            headerKuanJia,
            kuanjiaClick
        },
        computed: {
            ...mapState(["editUser", "warehouseConfig"]),
        },
        watch: {
            $route(to, from) {
                if (
                    from.path == "/warehoseconfig/createWarehouseConfig" ||
                    from.path == "/warehoseconfig/editWarehouseConfig"
                ) {
                    this.fasonPagIngQueryData();
                }
            },
        },
        data() {
            return {
                quyuDatas: {
                    warehouseAdmin: {
                        wareAreaWidth: 0,
                        wareAreaLength: 0,
                    },
                    regionalManage: [],
                }, //区域平面图 data
                chaxunLockese: false,
                kuwieDatas: {
                    quyu: {
                        wareAreaLength: 5,
                        wareAreaWidth: 4,
                    },
                    kuwie: [],
                }, //库位平面图 data
                quyuMsg: "",
                quyuleixingMsg: "1",
                isJianhuio: true, //是不是拣货区
                quyuLook: false, //区域平面图 显示
                kuwieLook: false, //库位平面图 显示
                kuwieDataJson: {},
                tableData: [],
                wareAreaTypeJson: [
                    {
                        wareAreaName: "存储区",
                        wareAreaCode: 1,
                    },
                    {
                        wareAreaName: "拣货区",
                        wareAreaCode: 2,
                    },
                ],
                multipleSelection: [],
                dropDowBox: {
                    //下拉框需要的json
                    title: "用户角色",
                    dropDownBoxData: [], //下拉需要的data
                    placeholder: "请选择用户角色",
                },
                nameOfSubWareHouse: {
                    placeholdes: "请选择子仓名称",
                    nameOfSubwareHouseData: [],
                },
                nameOfSubwareHouseDataArr: [],
                quyuzicanNameOfSubWareHouse: {
                    placeholdes: "请选择子仓名称",
                    nameOfSubwareHouseData: [],
                    nameOfSubWareHouseName: "",
                },
                areaType: {
                    placeholdes: "请选择区域类型",
                    areaTypeData: [],
                },
                AreaName: {
                    placeholdes: "请选择区域名称",
                    AreaNameData: [],
                },
                LODOP: null,
                pageComponentsData: {
                    pageNums: 0, //一共多少条 //默认一页10条
                },
                pagingQueryData: {
                    //分页查询
                    pageNumber: 1,
                    pageSize: 10,
                    paras: {
                        childWareId: "",
                        wareAreaType: "",
                        id: "",
                        childWareName: "",
                        wareAreaName: "",
                    },
                },
                childrenJson: {
                    wareId: "43C86919FC7E4360838AA522B361A242",
                    id: "1998999DDA5F4260A5E8598603929477",
                },
                zicandaixao: [],
                zhichangdaxiao: {
                    wareLength: 0,
                    wareWidth: 0,
                },
                regionalManage: [],
                flag: true,
            };
        },
        created() {
            setTimeout(() => {
                this.dropDowBox.dropDownBoxData = this.warehouseConfig;
            }, 0);
        },
        mounted() {
            this.fasonPagIngQueryData();
        },
        methods: {
            //获取子仓名称
            async getZicankuOfSunWareHouseWareId(e) {
                let json = {
                    childWareId: this.quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData[e]
                        .childWareId,
                };
                let warehouseAdmin = await this._getChildWidth({
                    wareId: getCookie("X-Auth-wareId"),
                    id: this.quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData[e]
                        .childWareId,
                });
                this.quyuMsg = `${this.quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData[e].tails.wareName}/${this.quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData[e].wareAreaType}`
                console.log(this.quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData[e].wareAreaType)
                this.quyuleixingMsg = this.quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData[e].wareAreaType == "存储区" ? "1" : "2"
                this.regionalManage = await this._getQuYuData(json);
            },
            dinjichaxunquyutu() {
                this.quyuDatas.warehouseAdmin.wareAreaWidth = this.wareLength;
                this.quyuDatas.warehouseAdmin.wareAreaLength = this.wareWidth;
                this.quyuDatas.regionalManage = this.regionalManage;
            },
            //获取区域名称
            getQuYuData() {
                let json = {
                    childWareId: this.pagingQueryData.paras.childWareId,
                };
                this._getQuYuData(json);
            },
            async _getQuYuData(data) {
                let datas = await post({
                    url: "/wbs-warehouse-manage/v1/pWarehouseArea/findRecord",
                    data,
                });
                this.AreaName.AreaNameData = datas.result;
                return datas.result;
            },
            //点击查看区域平面图
            areaPlan() {
                this.quyuDatas = {
                    warehouseAdmin: {
                        wareAreaWidth: 0,
                        wareAreaLength: 0,
                    },
                    regionalManage: [],
                }//区域平面图 data
                this.quyuLook = !this.quyuLook;
            },
            //点击查看库位平面图
            warehousePlan() {
                this.kuwieDatas = {
                    quyu: {
                        wareAreaLength: 5,
                        wareAreaWidth: 4,
                    },
                    kuwie: [],
                } //库位平面图 data
                if (!this.multipleSelection.length)
                    return this.$messageSelf.message({message: "请选择看那个库位的平面图", type: "warning"});
                if (this.multipleSelection.length !== 1)
                    return this.$messageSelf.message("只能选择一个库位查看库位图");

                this.kuwieDatas.quyu.wareAreaLength = this.multipleSelection[0].wareAreaLength;
                this.kuwieDatas.quyu.wareAreaWidth = this.multipleSelection[0].wareAreaWidth;
                this._quyuAsync({
                    wareAreaId: this.multipleSelection[0].id,
                });
                this.kuwieLook = !this.kuwieLook;
            },
            //点击发送区域平面图js
            async _quyuAsync(data) {
                let datas = await post({
                    url: "/wbs-warehouse-manage/v1/pWarehouseSeat/findWareSeatRecord",
                    data,
                });
                this.kuwieDatas.kuwie = datas.result;
                return datas;
            },
            //点击货架设置
            shelfSetting() {
                this.$router.push({
                    path: "/warehoseconfig/shelfSetting",
                });
            },
            //点击删除子仓
            clearWarehouseplan() {
                let arr = this._getIDArr();
                if (!arr.length) return this.$messageSelf.message({message: "请选择要删除的用户", type: "warning"});
                this.$messageSelf
                    .confirms("确定要删除该区域管理？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        this._clearAjax({ids: arr});
                    })
                    .catch((err) => {
                        this.$messageSelf.message("已取消删除");
                    });
            },
            //发送删除的ajax
            async _clearAjax(data) {
                let res = await post({
                    url: "/wbs-warehouse-manage/v1/pWarehouseArea/delRecord",
                    data,
                });
                if (res.code === "10000") {
                    this.$messageSelf.message({
                        type: "success",
                        message: res.msg,
                        duration: 1000
                    });
                    this.fasonPagIngQueryData();
                } else {
                    this.$messageSelf.message(res.msg);
                }
            },
            //获取要删除的区域管理
            _getIDArr() {
                let arr = [];
                this.multipleSelection.forEach((item) => {
                    if (!arr.includes(item.id)) {
                        arr.push(item.id);
                    }
                });
                return arr;
            },
            //获取子仓的长度
            async _getChildWidth(data) {
                let datas = await post({
                    url: "/wbs-warehouse-manage/v1/pWarehouseChild/findRecord",
                    data,
                });
                this.zicandaixao = datas.result;
                this.wareLength = this.zicandaixao[0].wareLength;
                this.wareWidth = this.zicandaixao[0].wareWidth;
                return this.zicandaixao;
            },
            //点击创建按钮
            createSubWarehouse() {
                if (this.multipleSelection.length == 0)
                    return this.$messageSelf.message({message: "请选择在那个子仓下创建区域", type: "warning"});
                if (this.multipleSelection.length > 1)
                    return this.$messageSelf.message({message: "每次只能在一个子仓下创建区域", type: "warning"});
                this._getChildWidth({
                    wareId: getCookie("X-Auth-wareId"),
                    id: this.multipleSelection[0].childWareId,
                });

                this.createWarehouseAjax(
                    {
                        childWareId: this.multipleSelection[0].childWareId,
                    },
                    "/warehoseconfig/createWarehouseConfig"
                );
            },
            //发送创建区域的ajax
            async createWarehouseAjax(data, path) {
                let datas = await post({
                    url: "/wbs-warehouse-manage/v1/pWarehouseArea/findRecord",
                    data,
                });
                if (this.zicandaixao.length == 0)
                    return this.$messageSelf.message({message: "网络较慢，请稍后重试", type: "error"});
                console.log(this.zicandaixao, "his.zicandaixao");
                if (datas.code === "10000") {
                    localStorage.setItem(
                        "warseHouseData",
                        JSON.stringify({
                            childDatas: datas.result,
                            wareAreaLength: this.zicandaixao[0].wareLength,
                            wareAreaWidth: this.zicandaixao[0].wareWidth,
                            wareName: this.zicandaixao[0].childWareName,
                            childWareId: this.multipleSelection[0].childWareId,
                        })
                    );
                    return this.$router.push({
                        path,
                    });
                } else {
                    this.$messageSelf.message(datas.result);
                }
            },
            //点击编辑按钮
            async editBtn() {
                if (this.multipleSelection.length == 0)
                    return this.$messageSelf.message({message: "请选择在哪一个区域下编辑", type: "warning"});
                if (this.multipleSelection.length > 1)
                    return this.$messageSelf.message({message: "每次只能编辑一个区域，请重新选择", type: "warning"});

                let datas = await this._getChildWidth({
                    wareId: getCookie("X-Auth-wareId"),
                    id: this.multipleSelection[0].childWareId,
                });
                sessionStorage.setItem(
                    "createWareHuseDataS",
                    JSON.stringify({
                        childWareId: this.multipleSelection[0].childWareId,
                        id: this.multipleSelection[0].id,
                        wareAreaLength: this.wareAreaLength,
                        wareAreaWidth: this.wareAreaWidth,
                    })
                );
                this.createWarehouseAjax(
                    {childWareId: this.multipleSelection[0].childWareId},
                    "/warehoseconfig/editWarehouseConfig"
                );
            },
            //发送编辑数据ajax
            async fasonEdit(data, path) {
                let datas = await post({
                    url: "/wbs-warehouse-manage/v1/pWarehouseArea/saveRecord",
                    data,
                });
                if (datas.code === "10000") {
                    this.$store.dispatch("editUser", datas.result[0]);
                    this.$router.push({
                        path,
                    });
                } else {
                    this.$messageSelf.message(datas.msg);
                }
            },
            //发送获取列表的消息
            async fasonPagIngQueryData() {
                let datas = await post({
                    url: "/wbs-warehouse-manage/v1/pWarehouseArea/findRecordPage",
                    data: {...this.pagingQueryData, userType: 4},
                });
                if (datas.code === "10000") {
                    this.changeData(datas.result);
                } else {
                    this.$messageSelf.message(datas.msg);
                }
            },
            changeData(data) {
                if (this.flag) {
                    this.nameOfSubwareHouseDataArr = data.list;
                    this.flag = false;
                }
                this.nameOfSubWareHouse.nameOfSubwareHouseData = data.list;
                this.quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData = data.list;
                this.changeTableData(data); //用来改变表格
                this.changePageData(data); //用来改变分页器的条数
            },
            //用来改变表格
            changeTableData(data) {
                let {list} = data;
                // console.log(list, "表格的数据");
                this.tableData = list;
                list.forEach((item, idx) => {
                    this.tableData[idx].wareAreaType = item.wareAreaType
                        ? item.wareAreaType == 1
                            ? "存储区"
                            : "拣货区"
                        : "———";

                    this.tableData[idx].address =
                        item.provinceName + item.cityName + item.areaName + item.userAddr;
                    this.tableData[idx].address === "NaN"
                        ? this.tableData[idx].address
                        : "———";
                    this.tableData[idx].noSeat = item.seatNum - item.useSeat;
                    this.tableData[idx].noSeat === "NaN"
                        ? this.tableData[idx].noSeat
                        : "———";
                });
            },
            //用来改变分页器的条数
            changePageData(data) {
                let {totalRow} = data;
                this.pageComponentsData.pageNums = totalRow;
            },
            //点击分页器的
            getPageNum(e) {
                this.pagingQueryData.pageNumber = e;
                this.fasonPagIngQueryData();
            },
            //点击分页器的确定
            sureSuccssBtn(e) {
                this.pagingQueryData.pageNumber = e;
                this.fasonPagIngQueryData();
            },
            //搜索框改变后的数据
            toggleSelection(rows) {
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //点击查询按钮
            clickQueryUser() {
                this.fasonPagIngQueryData();
                // console.log(this.pagingQueryData, "点击查询");
            },
            //点击清空按钮
            clearInputAll() {
                this.clearTimeInput();
                this.pagingQueryData.paras.childWareName = "";
                this.pagingQueryData.paras.wareAreaName = "";
                this.pagingQueryData.paras.id = "";
                this.pagingQueryData.paras.wareAreaType = "";
                this.pagingQueryData.paras.childWareId = "";
                console.log(this.pagingQueryData, "点击清空");
                this.fasonPagIngQueryData();
            },
            clearTimeInput() {
                let input = document.getElementsByClassName("ivu-input");
                for (let i = 0; i < input.length; i++) {
                    input[i].value = "";
                }
                let elInput = document.querySelectorAll(
                    ".el-input--suffix .el-input__inner"
                );
                for (let i = 0; i < elInput.length; i++) {
                    elInput[i].value = "";
                }
            },
            getStartTime(e) {
                this.pagingQueryData.paras.createStartTime = e;
                this.pagingQueryData.paras.userType = null;
            },
            getEndTime(e) {
                this.pagingQueryData.paras.createEndTime = e;
                this.pagingQueryData.paras.userType = null;
            },
            //子仓名称下拉框
            getwareHouseValue(e) {
                this.pagingQueryData.paras.childWareId = this.nameOfSubwareHouseDataArr[
                    e
                    ].childWareId;
                this.pagingQueryData.paras.childWareName = this.nameOfSubwareHouseDataArr[
                    e
                    ].childWareName;
            },
            //区域类型下拉框
            getAreaValue(e) {
                this.pagingQueryData.paras.wareAreaType = this.wareAreaTypeJson[
                    e
                    ].wareAreaCode;
            },
            //区域名称下拉框
            getAreaNameValue(e) {
                this.pagingQueryData.paras.id = this.AreaName.AreaNameData[e].id;
                this.pagingQueryData.paras.wareAreaName = this.AreaName.AreaNameData[
                    e
                    ].wareAreaName;
            },
        },
    };
</script>
<style>
</style>
<style lang='scss' scoped>
    @import "../../assets/scss/btn.scss";

    .quyupinmianBoxMsg {
        min-width: 1000px;
        max-height: 600px;
    }

    .quyupinmianBoxMsgs {
        min-width: 1000px;

    }

    .userSettingBox {
        background-color: #eef1f8;

        .fuzzyQueryBox {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;

            .biaogeBox {
                align-items: center;
                display: flex;
            }

            .timeBox {
                display: flex;
                align-items: center;
            }

            .line {
                width: 20px;
                height: 2px;
                background: #fff;
                margin-right: 10px;
            }

            .btns {
                display: flex;

                .queryBtn {
                    @include BtnFunction("success");
                }

                .clearBtn {
                    @include BtnFunction();
                    background: #fff;
                }
            }
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
                text-align: right;
                height: 36px;
                background: #ffffff;
                border: 1px solid #d1d6e2;
            }
        }

        .lineBox {
            height: 25px;
            padding: 0 10px;

            > div {
                height: 100%;
                background: #fff;
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
    }
</style>