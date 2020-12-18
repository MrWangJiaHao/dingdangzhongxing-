<template>
    <div class="setUserIngBox">
        <div
                class="setUserIngBoxCenter"
                :style="{ maxWidth: width || '1000px', top: top || ' 144px' }"
        >
            <div class="headerBox">
                <div class="closeTitle">
                    {{ titles }}
                </div>
                <div class="closeIcon" @click="closeBtn"></div>
            </div>
            <slot name="centerKuanjia"></slot>
            <!-- 账号信息 -->
            <div class="disRight mr20 ">
                <div class="quxiaoBox mr20 mb20" @click="closeBtn">
                    {{ isLooker ? "返回" : "取消" }}
                </div>
                <div class="tijiaoBox mb20" v-if="!isLooker" @click="goAJAXCreate">
                    提交
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
                default: "1000px",
            },
            top: {
                type: String,
                default: "144px",
            },
        },
        methods: {
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

    .setUserIngBox {
        .headerBox {
            height: 50px;
            border-radius: 3px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            position: relative;
            justify-content: space-between;
            background: rgb(236, 241, 247);
            border-bottom: 1px solid #d1d6e2;
        }

        .addChanpinClass {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 980px;
            z-index: 44;
            background: #f8f8f8;
            transform: translate(-50%, -50%);
        }

        .setUserIngBoxCenter {
            position: relative;
            left: 50%;
            max-height: 600px;
            overflow: auto;
            transform: translateX(-50%);
            background-color: #fff;

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
        }

        .tijiaoBox {
            @include BtnFunction("success");
        }
    }
</style>