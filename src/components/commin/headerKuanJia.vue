<template>
    <div class="fuzzyQueryBoxs clearfix  ">
        <div class="biaogeBox dispalywrap ">
            <slot name="biaoBoxCenter"></slot>
            <slot></slot>
        </div>

        <div class="btns   btnArrs ">
            <div>

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
        created() {
            this.addZhanKaiRes(".btnArrs");
        },
        methods: {
            clickQueryUser() {
                this.$emit("clickQueryUser", true);
            },
            clearInputAll() {
                this.$emit("clearInputAll", true);
            },
            addZhanKaiRes(child) {
                setTimeout(() => {
                    this.$nextTick(() => {
                        child = document.querySelector(child);
                        this.$isChaXun.isChaXun(child);
                    });
                }, 10)
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

    .biaogeBox {
        width: 85%;
    }

    .btns {
        width: 15%;
        height: 100%;
        text-align: right;
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;

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