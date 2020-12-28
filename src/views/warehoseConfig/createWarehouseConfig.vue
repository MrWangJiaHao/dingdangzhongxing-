<template>
    <div class="createWareHouseConfigBox">
        <div class="centerCreateWareHouseConfig">
            <div class="createTitle noUser">
                <div class="meiyiyetitle displayCenter"></div>
                <!-- 图像 -->
                <div class="noneIconTitle">子仓区域</div>
                <!-- 子仓区域-->
                （
                <div class="juli noUser">
                    长：{{ wareAreaLength }}m 宽：{{ wareAreaWidth }}m
                    上北、下南、左西、右东
                </div>
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
          width: wareAreaLength * (10000 / 85) + 2 + 'px',
          height: wareAreaWidth * (10000 / 85) + 2 + 'px',
          position: 'relative',
          background: '#D8DCE7',
          border: ' 1px solid #D8DCE7',
          'border-radius': ' 8px',
        }"
                >
                    <div
                            v-for="(item, idx) in createSetting"
                            :key="idx"
                            class="displayCenter"
                            :class="activeNum === idx ? 'active' : ''"
                            :style="getConversion(item)"
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
                    <div class="noneIconTitle">新建区域</div>
                    <!-- 子仓区域-->
                </div>
                <!--新建子仓 title部分  -->
                <div class="shuruTitle dispalywrap">
                    <div class="displayalign mb20">
                        <div class="noneIconTitle mr11">
                            <span class="colred">*</span>
                            区域名称
                            :
                        </div>
                        <div class="mr20 w150">
                            <el-input
                                    maxlength="30"
                                    placeholder="请输入区域名称"
                                    @input="createDomTestWareName"
                                    v-model="createWarehouseJson.wareAreaName"
                                    clearable
                            ></el-input>
                        </div>
                    </div>
                    <!-- 区域名称 createWarehouseJson.wareAreaName -->
                    <div class="displayalign mb20">
                        <div class="noneIconTitle mr11">
                            <span class="colred">*</span>
                            区域类型
                            :
                        </div>
                        <div class="mr20 w150">
                            <el-select
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
                            <span class="colred">*</span>
                            区域编号
                            :
                        </div>
                        <div class="mr20 w150">
                            <el-select
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
                                    @click="changeISNum"
                                    class="anniu mr9 displayCenter"
                                    :class="isNum ? 'active' : ''"
                            >
                                <div :class="isNum ? 'active dian' : ''"></div>
                            </div>
                            <span class="noneIconTitle">数字:</span>
                        </div>
                        <div class="mr20 w140">
                            <el-select
                                    v-model="wareAreaCodeChange.NUM"
                                    placeholder="请选择数字编号"
                                    slot="prepend"
                                    @input="getWareAreaNumCode"
                                    :disabled="isNum ? false : true"
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
                            <span class="colred">*</span>
                            区域长度
                            :
                        </div>
                        <div class="displayalign mr20 w140">
                            <el-input
                                    placeholder="请输入子仓长度"
                                    type="number"
                                    v-model="createWarehouseJson.wareAreaLength"
                                    clearable
                                    @input="createDomTestwareAreaLength"
                            ></el-input>
                            <span class="M">m</span>
                        </div>
                    </div>
                    <!-- 区域长度 createWarehouseJson.wareAreaLength m-->
                    <div class="displayalign mb20 mr11">
                        <div class="noneIconTitle mr11">
                            <span class="colred">*</span>
                            区域宽度
                            :
                        </div>
                        <div class="displayalign w150">
                            <el-input
                                    placeholder="请输入子仓宽度"
                                    type="number"
                                    v-model="createWarehouseJson.wareAreaWidth"
                                    @input="createDomTestwareAreaWidth"
                                    clearable
                            ></el-input>
                        </div>
                        <span class="M">m</span>
                    </div>
                    <!-- 区域宽度 createWarehouseJson.wareAreaWidth m-->
                    <div class="displayalign mb20 mr11">
                        <div class="noneIconTitle mr11">
                            <span class="colred">*</span>
                            据北距离
                            :
                        </div>
                        <div class="displayalign w150">
                            <el-input
                                    placeholder="请输入据北距离"
                                    v-model="createWarehouseJson.y"
                                    type="number"
                                    @input="createDomTesty"
                                    clearable
                            ></el-input>
                        </div>
                        <span class="M">m</span>
                    </div>
                    <!-- 据北距离 m createWarehouseJson.y -->
                    <div class="displayalign mb20 mr11">
                        <div class="noneIconTitle mr11">
                            <span class="colred">*</span>
                            据西距离
                            :
                        </div>
                        <div class="displayalign w150">
                            <el-input
                                    placeholder="请输入据西距离"
                                    type="number"
                                    v-model="createWarehouseJson.x"
                                    @input="createDomTestX"
                                    clearable
                            ></el-input>
                        </div>
                        <span class="M">m</span>
                    </div>
                    <!-- 据西距离 m createWarehouseJson.x-->
                </div>
            </div>
            <!-- 输入部分 -->
            <div class="zujianBox tr">
                <div class="zujianBox mr11 disinb fanhiu" @click="$router.go(-1)">
                    返回
                </div>
                <div class="disinb tijiao" @click="submitData">提交</div>
            </div>
            <!-- btn -->
        </div>
    </div>
</template>

<script>
    import {post} from "../../api/api";
    import {getConversionPx} from "../../utils/validate";

    export default {
        data() {
            return {
                isNum: false,
                createWarehouseJson: {
                    wareAreaType: "",
                    childWareId: "",
                    wareAreaCode: "",
                    wareAreaLength: 0,
                    wareAreaName: "",
                    wareAreaWidth: 0,
                    y: "",
                    x: "",
                },
                wareAreaCodeChange: {
                    NUM: "",
                    STR: "",
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
                wareName: "",
                createDomTest: {},
            };
        },
        created() {
            let datas = JSON.parse(localStorage.getItem("warseHouseData"));
            this.createSetting = datas.childDatas;
            this.wareAreaWidth = datas.wareAreaWidth;
            this.wareAreaLength = datas.wareAreaLength;
            this.wareName = datas.wareName;
            this.createWarehouseJson.childWareId = datas.childWareId;
        },
        beforeDestroy() {
            sessionStorage.removeItem("warseHouseData");
        },
        methods: {
            createDomTestWareName() {
                this.createDomTest.wareAreaName = this.createWarehouseJson.wareAreaName;
                this.createDomTest.back = true;
                this.createSetting.push(this.createDomTest);
            },

            createDomTestwareAreaLength() {
                this.createDomTest.wareAreaLength = this.createWarehouseJson.wareAreaLength;
                this.createSetting.push(this.createDomTest);
            },
            createDomTestwareAreaWidth() {
                this.createDomTest.wareAreaWidth = this.createWarehouseJson.wareAreaWidth;
                this.createSetting.push(this.createDomTest);
            },
            createDomTesty() {
                this.createDomTest.y = this.createWarehouseJson.y;
                this.createSetting.push(this.createDomTest);
            },
            createDomTestX() {
                this.createDomTest.x = this.createWarehouseJson.x;
                this.createSetting.push(this.createDomTest);
            },
            //是否跳入编辑页
            ISEditQuYu(item, idx) {
                this.activeNum = idx;
                if (item.back) return;
                this.$messageSelf
                    .confirms(`确定修改${this.wareName}的仓库配置`, "提示", {
                        type: "info",
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                    })
                    .then(() => {
                        window.sessionStorage.setItem(
                            "createWareHuseData",
                            JSON.stringify({
                                childWareId: item.childWareId,
                                id: item.id,
                                idx,
                                wareAreaWidth: this.wareAreaWidth,
                                wareAreaLength: this.wareAreaLength,
                            })
                        );
                        this.$router.push({
                            path: "/warehoseconfig/editWarehouseConfig",
                        });
                    })
                    .catch(() => {
                        this.$messageSelf.message({
                            type: "info",
                            message: "已取消修改",
                        });
                    });
            },
            //改变距离大小
            getConversion(item) {
                return getConversionPx(item);
            },
            //区域类型数字改变时间
            quyuleixing(e) {
                this.createWarehouseJson.wareAreaType = this.wareAreaTypeJson[
                    e
                    ].wareAreaCode;
                this.createDomTest.wareAreaName = this.wareAreaCodeChange.wareAreaName;
                this.createSetting.push(this.createDomTest);
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
                    return this.$router.go(-1);
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
            position: relative;
            border-bottom: 1px solid #d1d6e2;

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