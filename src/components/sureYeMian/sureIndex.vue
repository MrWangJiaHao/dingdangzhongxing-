<template>
    <div id="sures">
        <kuanjiaClick
                :titles="kuangjiaTitle"
                @closeBtn="closeBtn"
                :isLooker="isLooker"
                @clickSubmit="clickSubmit"
                :width="'1080px'"
        >
            <template slot="centerKuanjia">
                <div class="mb16">
                    <detailsData
                            :detailsArr="detailsJson.detailsArr"
                            :title="detailsJson.title"
                    ></detailsData>
                </div>
                <div class="mb16">
                    <chanpinmingxi :chanpinminxiJson="chanpinminxiJson">
                        <template slot="anniuBtns">
                            <span class="goOn mr11 inline" @click="chanpinminxiJson.copyShopping">复制产品</span>
                            <span class="lodopFunClear inline" @click="chanpinminxiJson.removeShopping">删除</span>
                        </template>
                    </chanpinmingxi>
                </div>
            </template>
        </kuanjiaClick>
    </div>
</template>

<script>
    /*eslint-disable*/
    import kuanjiaClick from "../commin/kuanjiaClick"; //点击架子
    import detailsData from "../commin/dindanxiangq"; //订单详情
    import chanpinmingxi from "../commin/chanpinmingxi"; // 产品明细

    export default {
        name: "sureIndex",
        components: {
            kuanjiaClick,
            detailsData,
            chanpinmingxi
        },
        props: {
            kuangjiaTitle: {type: String, default: ""},
            detailsJson: {
                type: Object,
                default: () => {
                    return {
                        title: "",
                        detailsArr: []
                    }
                }
            },
            chanpinminxiJson: {
                type: Object,
                default: () => {
                    return {
                        title: "产品明细",
                        copyShopping: () => {
                        },
                        removeShopping: () => {
                        }
                    }
                }
            },
            isLooker: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            closeBtn() {
                this.$emit('closeBtnSure')
            },
            clickSubmit() {
                this.$emit("sureSubmit")
            },
        }

    }
</script>

<style lang='scss'>
    @import "../../assets/scss/btn.scss";

    .goOn {
        @include BtnFunction("success");
    }

    .lodopFunClear {
        @include BtnFunction("error");
    }

    #sures .input {
        border: 1px solid #d2d6e2;
        height: 28px;
        text-indent: 10px;
        color: #333333;
        font-size: 14px;
        font-weight: normal;
        background: rgba(236, 241, 247, 0);
        border-radius: 2px;
    }

    #sures .el-input__inner {
        height: 28px;
    }

    #sures .dropDownBox .input_box[data-v-0e988ff4] {
        height: 28px;
    }

    #sures .el-input__icon {
        line-height: 28px;
    }

    #sures .ivu-input {
        height: 28px !important;
    }
</style>