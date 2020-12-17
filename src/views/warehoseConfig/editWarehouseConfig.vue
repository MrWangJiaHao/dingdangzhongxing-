/*编辑数据 */
<template>
    <div class="createWareHouseConfigBox">
        <div class="centerCreateWareHouseConfig">
            <div class="createTitle noUser">
                <div class="meiyiyetitle displayCenter"></div>
                <!-- 图像 -->
                <div class="noneIconTitle">子仓区域</div>
                <!-- 子仓区域-->
                （
                <div class="juli noUser">长：10m 宽：10m 上北、下南、左西、右东</div>
                ）
                <!-- 距离 -->
            </div>
            <!--子仓区域 title部分  -->
            <div
                    v-if="!createSetting.length"
                    class="wareHouseCenter noneZican displayCenter"
            >
                暂未划分区域
            </div>
            <!-- 暂无子仓 -->
            <div class="overAuto">
                <div
                        v-if="createSetting.length"
                        class="wareHouseCenter noneZican"
                        :style="{
          width: wareAreaLength * (10000 / 85) + 3 + 'px',
          height: wareAreaWidth * (10000 / 85) + 3 + 'px',
          position: 'relative',
          background: '#D8DCE7',
          border: '1px solid #D8DCE7',
          'border-radius': ' 8px',
        }"
                >
                    <div
                            v-for="(item, idx) in createSetting"
                            :key="idx"
                            class="displayCenter"
                            :class="activeNum === idx ? 'active' : ''"
                            :style="changePX(item)"
                            @click="ISEditQuYu(item, idx)"
                    >
                        {{ item.wareAreaName }}
                    </div>
                </div>
                <!-- 有子仓 -->
            </div>
            <!-- 子仓图区域 -->
            <div>
                <div class="createTitle noUser">
                    <div class="meiyiyetitle displayCenter"></div>
                    <!-- 图像 -->
                    <div class="noneIconTitle">新建子仓</div>
                    <!-- 子仓区域-->
                </div>
                <!--新建子仓 title部分  -->
                <div class="shuruTitle dispalywrap">
                    <div class="displayalign mb20">
                        <div class="noneIconTitle mr11">
                            区域名称
                            <span style="color: red">*</span>:
                        </div>
                        <div class="mr20 w120">
                            <el-input
                                    placeholder="请输入区域名称"
                                    v-model="createWarehouseJson.wareAreaName"
                                    clearable
                            ></el-input>
                        </div>
                    </div>
                    <!-- 区域名称 createWarehouseJson.wareAreaName -->
                    <div class="displayalign mb20">
                        <div class="noneIconTitle mr11">
                            区域类型
                            <span style="color: red">*</span>:
                        </div>
                        <div class="mr20">
                            <el-select
                                    class="w120"
                                    v-model="wareAreaCodeChange.wareAreaName"
                                    placeholder="请选择区域类型"
                                    slot="prepend"
                                    @input="quyuleixing"
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
                    <!-- 区域类型 createWarehouseJson.wareAreaType -->
                    <div class="displayalign mb20">
                        <div class="noneIconTitle mr11">
                            区域编号
                            <span style="color: red">*</span>:
                        </div>
                        <div class="mr20">
                            <el-select
                                    class="w120"
                                    v-model="wareAreaCodeChange.STR"
                                    placeholder="请选择字母编号"
                                    slot="prepend"
                                    @input="getWareAreaCode"
                            >
                                <el-option
                                        v-for="(item, idx) in wareAreaCodeZIMU"
                                        :key="idx"
                                        :label="item"
                                        :value="idx"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <!-- 区域编号 createWarehouseJson.wareAreaCode-->
                    <div class="displayalign mb20">
                        <div class="displayalign mr20">
                            <div
                                    class="anniu mr9 displayCenter"
                                    :class="!isNum ? 'active' : ''"
                            >
                                <div :class="!isNum ? 'active dian' : ''"></div>
                            </div>
                            <span class="noneIconTitle">数字:</span>
                        </div>
                        <div class="mr20">
                            <el-select
                                    class="w120"
                                    v-model="wareAreaCodeChange.NUM"
                                    placeholder="请选择数字编号"
                                    slot="prepend"
                                    @input="getWareAreaNumCode"
                            >
                                <el-option
                                        v-for="(item, idx) in wareAreaCodeNum"
                                        :key="idx"
                                        :label="item"
                                        :value="idx"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <!-- IS数字 createWarehouseJson.wareAreaCode-->
                    <div class="displayalign mb20">
                        <div class="noneIconTitle mr11">
                            区域长度
                            <span style="color: red">*</span>:
                        </div>
                        <div class="displayalign mr20">
                            <el-input
                                    class="w120"
                                    placeholder="请输入子仓长度"
                                    type="number"
                                    v-model="createWarehouseJson.wareAreaLength"
                                    clearable
                            ></el-input>
                            <span class="M">m</span>
                        </div>
                    </div>
                    <!-- 区域长度 createWarehouseJson.wareAreaLength m-->
                    <div class="displayalign mb20">
                        <div class="noneIconTitle mr11">
                            区域宽度
                            <span style="color: red">*</span>:
                        </div>
                        <div class="displayalign w120 mr20">
                            <el-input
                                    type="number"
                                    placeholder="请输入子仓宽度"
                                    v-model="createWarehouseJson.wareAreaWidth"
                                    clearable
                            ></el-input>
                            <span class="M">m</span>
                        </div>
                    </div>
                    <!-- 区域宽度 createWarehouseJson.wareAreaWidth m-->
                    <div class="displayalign mb20">
                        <div class="noneIconTitle mr11">
                            据北距离
                            <span style="color: red">*</span>:
                        </div>
                        <div class="displayalign w120 mr20">
                            <el-input
                                    placeholder="请输入据北距离"
                                    v-model="createWarehouseJson.y"
                                    clearable
                            ></el-input>
                            <span class="M">m</span>
                        </div>
                    </div>
                    <!-- 据北距离 m createWarehouseJson.y-->
                    <div class="displayalign mb20">
                        <div class="noneIconTitle mr11">
                            据西距离
                            <span style="color: red">*</span>:
                        </div>
                        <div class="displayalign w120 mr20">
                            <el-input
                                    placeholder="请输入据西距离"
                                    v-model="createWarehouseJson.x"
                                    clearable
                            ></el-input>
                            <span class="M">m</span>
                        </div>
                    </div>
                    <!-- 据西距离 m createWarehouseJson.x-->
                </div>
            </div>
            <!-- 输入部分 -->
            <div class="zujianBox tr">
                <div class="zujianBox disinb fanhiu" @click="gotoTop">返回</div>
                <div class="disinb tijiao" @click="submitData">提交</div>
            </div>
            <!-- btn -->
        </div>
    </div>
</template>

<script>
    /*eslint-disable */

    import {post} from "../../api/api";
    import {getConversionPx} from "../../utils/validate";

    export default {
        data() {
            return {
                isNum: false,
                createWarehouseJson: {
                    wareAreaType: "",
                    id: "",
                    childWareId: "",
                    wareAreaCode: "",
                    wareAreaLength: "",
                    wareAreaName: "",
                    wareAreaWidth: "",
                    y: "",
                    x: "",
                },
                wareAreaCodeChange: {
                    NUM: "",
                    STR: "",
                },
                chaxunDataJson: {
                    childWareId: "",
                    id: "",
                },
                wareAreaCodeNum: "01,02,03,04,05,06,07,08,09".split(","),
                wareAreaCodeZIMU: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
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
                wareAreaCodeZIMUstr: "",
                wareAreaCodenum: "",
                createSetting: [],
                activeNum: null,
                wareAreaLength: "",
                wareAreaWidth: "",
            };
        },
        beforeDestroy() {
            sessionStorage.removeItem("createWareHuseData");
            sessionStorage.removeItem("warseHouseData");
        },
        created() {
            let datas = JSON.parse(localStorage.getItem("warseHouseData"));
            let createWareHuseData = JSON.parse(
                sessionStorage.getItem("createWareHuseData")
            );
            console.log(createWareHuseData);
            if (createWareHuseData) {
                this.activeNum = createWareHuseData.idx;
                this.createWarehouseJson.childWareId = createWareHuseData.childWareId;
                this.createWarehouseJson.id = createWareHuseData.id;
                this.wareAreaLength = createWareHuseData.wareAreaLength;
                this.wareAreaWidth = createWareHuseData.wareAreaWidth;
                console.log(createWareHuseData, "创建页跳过来的");
                this.pWarehouseArea();
            }

            if (datas.childDatas) {
                console.log(datas, "首页跳过来的");
                this.createSetting = datas.childDatas;
                this.createWarehouseJson.childWareId = datas.childDatas[0].childWareId;
                this.createWarehouseJson.id = datas.childDatas[0].id;
                this.wareAreaLength = datas.wareAreaLength;
                this.wareAreaWidth = datas.wareAreaWidth;
                this.pWarehouseArea();
            }
        },
        methods: {
            //返回上一页
            gotoTop() {
                this.$messageSelf
                    .confirms(`确定返回上一页？`, "提示", {
                        type: "info",
                    })
                    .then(() => {
                        this.$router.go(-1);
                    })
                    .catch(() => {
                        this.$this.$messageSelf.message({
                            type: "info",
                            message: "已取消返回上一页",
                        });
                    });
            },
            async pWarehouseArea() {
                let datas = await post({
                    url:
                        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseArea/findRecord",
                    data: this.chaxunDataJson,
                });
                this.changeDataRes(datas.result[0]);
            },
            //更改获取过来的数据
            changeDataRes(data) {
                let {
                    wareAreaType,
                    wareAreaCode,
                    wareAreaLength,
                    wareAreaWidth,
                    x,
                    wareAreaName,
                    y,
                } = data;
                this.createWarehouseJson.wareAreaType = wareAreaType;
                this.createWarehouseJson.wareAreaName = wareAreaName;
                this.createWarehouseJson.wareAreaCode = wareAreaCode;
                this.createWarehouseJson.wareAreaLength = wareAreaLength;
                this.createWarehouseJson.wareAreaWidth = wareAreaWidth;
                this.createWarehouseJson.x = x;
                this.createWarehouseJson.y = y;
                this.changeWareAreaName(wareAreaType); //改变区域类型
                this.changewareAreaCode(wareAreaCode); //改变区域编号
            },
            changewareAreaCode(data) {
                let changewareAreaStr = data.substring(0, 1);
                let changewareAreaNum = data.substring(1, data.length);
                this.wareAreaCodeChange.NUM = changewareAreaNum;
                this.wareAreaCodeChange.STR = changewareAreaStr;
            },
            changeWareAreaName(wareAreaType) {
                let wareAreaNames = wareAreaType == 1 ? "存储区" : "拣货区";
                this.wareAreaTypeJson.forEach((item) => {
                    if (item.wareAreaName == wareAreaNames)
                        return (this.wareAreaCodeChange.wareAreaName = item.wareAreaName);
                });
            },
            ISEditQuYu(item, idx) {
                this.activeNum = idx;
                this.chaxunDataJson.childWareId = item.childWareId;
                this.chaxunDataJson.id = item.id;
                this.pWarehouseArea();
            },
            changePX(item) {
                return getConversionPx(item);
            },
            //区域类型数字改变时间
            quyuleixing(e) {
                this.createWarehouseJson.wareAreaType = this.wareAreaTypeJson[
                    e
                    ].wareAreaCode;
            },
            //改变数字框是否显示
            changeISNum() {
                this.isNum = true;
            },
            //获取区域编号
            getWareAreaCode(e) {
                this.wareAreaCodeZIMUstr = this.wareAreaCodeZIMU[e];
                this.hebing();
            },
            getWareAreaNumCode(e) {
                this.wareAreaCodenum = this.wareAreaCodeNum[e];
                this.hebing();
            },
            hebing() {
                this.createWarehouseJson.wareAreaCode =
                    this.wareAreaCodeZIMUstr + this.wareAreaCodenum;
            },
            /*点击提交按钮 */
            submitData() {
                this.sendOutCreatewarehouse();
                console.log(this.createWarehouseJson);
            },
            async sendOutCreatewarehouse() {
                let {createWarehouseJson} = this;
                let datas = await post({
                    url:
                        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseArea/saveRecord",
                    data: createWarehouseJson,
                });
                if (datas.code === "10000") {
                    this.$messageSelf.message(datas.msg);
                    return this.$router.push({
                        path: "/warehoseconfig/regionalManagements",
                    });
                } else {
                    this.$messageSelf.message({message: datas.msg, type: "error"});
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/btn.scss";

    .createWareHouseConfigBox {
        background-color: #eef1f8;
        padding: 10px;

        .centerCreateWareHouseConfig {
            background: #ffffff;
            padding: 30px 20px 20px 20px;
            border-bottom: 1px solid #d1d6e2;
            overflow: hidden;

            .createTitle {
                display: flex;
                padding: 20px 0;
                align-items: center;
            }

            .wareHouseCenter {
                padding: 10px 0;
                border-radius: 8px;
            }
        }

        .fanhiu {
            @include BtnFunction();

            border: 1px solid #d1d6e2;
        }

        .tijiao {
            @include BtnFunction("success");
        }
    }
</style>