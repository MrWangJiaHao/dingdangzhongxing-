<template>
    <div class="setUserIngBox">
        <div
                class="setUserIngBoxCenter"
                :style="{  maxWidth: width? isPX(width) :'1000px'}"
        >
            <div class="headerBox" :style="{ minWidth:width ? isPX(width):'1000px'}">
                <div class="closeTitle">
                    {{ titles }}
                </div>
                <div class="closeIcon" @click="closeBtn"></div>
            </div>
            <div class="heightLine"></div>
            <slot name="centerKuanjia"></slot>
            <slot></slot>
            <!-- 账号信息 -->
            <div class="disRight btnsSure ">
                <div v-if="isLookerShow" class="quxiaoBox mr20 mb20" @click="closeBtn">
                    {{ isLooker ? "返回" : "取消" }}
                </div>
                <div class="tijiaoBox mb20" v-if="!isLooker" @click="goAJAXCreate">
                    {{print}}
                </div>
            </div>
            <!-- btn -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: {
            isLooker: {
                type: Boolean,
                default: false,
            },
            titles: {
                type: String,
                default: "",
            },
            width: {
                type: String,
                default: "",
            },
            top: {
                type: String,
                default: "144px",
            },
            print: {
                type: String,
                default: "提交"
            },
            isLookerShow: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            isPX(mes) {
                return mes.includes("px") ? mes : mes + "px"
            },
            closeBtn() {
                this.$emit("closeBtn", false);
            },
            goAJAXCreate() {
                this.$emit("clickSubmit", false);
            },
        },
    };
</script>

<style lang='scss' scoped>
    @import "../../assets/scss/btn.scss";

    .btnsSure {
        position: absolute;
        bottom: 0px;
        z-index: 100;
        border-top: 1px solid #D1D6E2;
    }

    .setUserIngBox {
        position: relative;
        overflow: hidden;

        .headerBox {
            height: 50px;
            border-radius: 3px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            position: fixed;
            z-index: 100;
            justify-content: space-between;
            background: rgb(236, 241, 247);
            border-bottom: 1px solid #d1d6e2;
        }

        .heightLine {
            height: 50px;
        }

        .setUserIngBoxCenter {
            min-height: 600px;
            max-height: 600px;
            overflow: auto;
            background-color: #fff;
            padding-bottom: 54px;

            .centerBox {
                padding: 30px 20px;
            }

            .setTitle {
                margin-bottom: 18px;
            }

            .gerxinxiBox {
                display: flex;
                flex-direction: column;

                > div {
                    margin-bottom: 18px;
                }

                .xinxiBitian {
                    display: flex;
                    align-items: center;

                    > div {
                        margin-right: 20px;
                    }
                }
            }

            .cityBoxCenter {
                display: flex;
                align-items: center;
            }
        }

        .textAreaBox {
            font-size: 14px;
            width: 72%;
            height: 40px;
            margin-left: 80px;

            > textarea {
                color: #606266;
                text-indent: 16px;
                line-height: 40px;
                white-space: nowrap;
                overflow: hidden;
            }

            margin-bottom: 30px;
        }

        .bzTetxArea {
            font-size: 14px;
            width: 72%;
            height: 80px;

            > textarea {
                color: #606266;
                text-indent: 16px;
                line-height: 30px;
                overflow: hidden;
            }
        }

        .quxiaoBox {
            border: 1px solid rgb(209, 214, 226);
            @include BtnFunction();
            background: #fff;
        }

        .tijiaoBox {
            @include BtnFunction("success");
        }
    }

    .btnsSure {
        width: 100%;
        height: 74px;
        background: #fff;
        padding-top: 20px;
        padding-right: 30px;
    }
</style>