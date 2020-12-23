<template>
    <div>
        <kuanjiaClick
                :titles="chuanjianJsonAndArr.title"
                @closeBtn="closeBtn"
                @clickSubmit="clickSubmit"
                :isLooker="isLooker"
        >
            <template slot="centerKuanjia">
                <createMonent :chuanjianJsonAndArr="chuanjianJsonAndArr"/>
                <chanpinmingxi
                        id="cangpingmingxi"
                        :chanpinminxiJson="chanpinminxiJson"
                        @tableSelectArrs="tableSelectArr"
                >
                    <template slot="anniuBtns">
            <span class="goOn mr11 inline" @click="isAddcreateChanpinShow">
              添加产品</span
            >
                        <span class="lodopFunClear inline" @click="removeItem">删除</span>
                    </template>
                </chanpinmingxi>
                <!-- 产品明细 -->
                <div class="pd20 mt20 mb16">
                    <remarksInput
                            @changeInputs="beizhuObj.changeInputs"
                            :searchCenter="beizhuObj.searchCenter"
                    />
                </div>
                <!-- 备注 -->
            </template>
        </kuanjiaClick>
        <div v-if="isAddcreateChanpin" class="bjBox">
            <transition
                    enter-active-class="animate__animated animate__zoomIn"
                    leave-active-class="animate__animated animate__zoomOut"
            >
                <div v-if="isAddcreateChanpin">
                    <addTianjiaChanpin
                            :sendoutJson="sendoutJson"
                            @clickSubmitFun="clickSubmitFun"
                    />
                </div>
            </transition>
        </div>
    </div>
</template>
<style lang="scss">
    #cangpingmingxi .el-input__inner {
        height: 28px;
    }

    #cangpingmingxi .el-input__icon {
        line-height: 28px;
    }

    #cangpingmingxi .dropDownBox .input_box {
        height: 28px;
    }

    #cangpingmingxi .input {
        border-radius: 4px;
        /*color:#DCDFE6;*/
        border: 1px solid #dcdfe6;
    }
</style>
<script>
    /*eslint-disable */
    import kuanjiaClick from "../commin/kuanjiaClick"; //点击架子
    import createMonent from "../commin/createMonent"; //创建上面
    import chanpinmingxi from "../commin/chanpinmingxi"; // 产品明细
    import remarksInput from "../commin/remarksInput";
    import {_removeData} from "../../utils/validate";
    import addTianjiaChanpin from "../goodsShiftingCommin/addTianjiaChanpin"; // 添加产品

    export default {
        props: {
            beizhuObj: {
                type: Object,
                default: () => {
                    return {
                        changeInputs: () => {
                        },
                        searchCenter: "请输入备注",
                    };
                },
            },
            isLooker: {
                type: Boolean,
                default: false,
            },
            sendoutJson: {
                type: Object,
                default: () => {
                },
            },
            chuanjianJsonAndArr: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            chanpinminxiJson: {
                type: Object,
                default: () => {
                    return {};
                },
            },
        },
        components: {
            kuanjiaClick,
            createMonent,
            chanpinmingxi,
            remarksInput,
            addTianjiaChanpin,
        },
        data() {
            let self = this;
            return {
                mutitleMes: [],
                isAddcreateChanpin: false,
                stream: "",
            };
        },
        methods: {
            //添加产品
            isAddcreateChanpinShow() {
                this.isAddcreateChanpin = true;
            },
            tableSelectArr(e) {
                this.mutitleMes = e;
            },
            //删除
            removeItem() {
                if (!this.mutitleMes.length) return;
                _removeData(
                    this.chanpinminxiJson.tableDataJsonAndArr.tabledata,
                    this.mutitleMes
                );
            },
            clickSubmitFun(e) {
                this.$emit("changpingmingxiData", e);
            },
            closeBtn() {
                this.$emit("closeFn");
            },
            clickSubmit() {
                if (!this.mutitleMes.length)
                    return this.$messageSelf.message({
                        message: "请选择要创建的产品明细",
                        type: "warning",
                    });
                this.$emit("clickSubmit", this.mutitleMes);
            },
        },
    };
</script>