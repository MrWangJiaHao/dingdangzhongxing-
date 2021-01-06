<template>
    <div class="fuzzyQueryBoxs clearfix  ">
        <div class="biaogeBox dispalywrap " :style="{
            width:leftWidth?leftWidth:'94%'
        }">
            <slot name="biaoBoxCenter"></slot>
            <slot></slot>
        </div>

        <div class="btns   btnArrs " :style="{
            width:isBaifenhao,
            height:isBtns
        }">
            <div class="nowrap">
                <div class="queryBtn inline mr11 zujianBox"   @click="clickQueryUser">
                    查询
                </div>
                <div class="clearBtn inline" @click="clearInputAll">清空</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            leftWidth: {
                type: String,
                default: "96%"
            },
            isBtns: {
                type: String,
                default: "100%"
            }
        },
        computed: {
            isBaifenhao() {
                let idx = this.leftWidth.includes("%") ? this.leftWidth.substring(0, 2) : this.leftWidth
                return 100 - +idx + "%"
            }
        },
        mounted() {
            let self = this
            window.addEventListener("resize", () => {
                self.addZhanKaiRes(".btnArrs");
            });
        },
        created() {
            this.addZhanKaiRes(".btnArrs");
        },
        watch: {
            $router() {
                this.addZhanKaiRes(".btnArrs");
            }
        },
        methods: {
            clickQueryUser() {
                this.$emit("clickQueryUser", true);
            },
            clearInputAll() {
                this.$emit("clearInputAll", true);
            },
            addZhanKaiRes(child) {
                this.$nextTick(() => {
                    child = document.querySelector(child);
                    this.$isChaXun.isChaXun(child);
                });
            },
        },

    };
</script>

<style lang='scss' scope>
    @import "../../assets/scss/btn.scss";

    .fuzzyQueryBoxs {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: hidden;
        position: relative;
        padding: 20px 30px 4px 30px;
    }

    .fuzzyQueryBox {
        overflow: hidden;

        .line {
            width: 20px;
            height: 2px;
            background: #fff;
            margin-right: 10px;
        }
    }


    .btns {
        text-align: right;
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        z-index: 100;

        .queryBtn {
            display: inline-block;
            @include BtnFunction("success");
        }

        .clearBtn {
            display: inline-block;
            @include BtnFunction();
            background: #fff;
        }
    }

    .line {
        width: 20px;
        height: 2px;
        background: #fff;
        margin-right: 10px;
    }
</style>