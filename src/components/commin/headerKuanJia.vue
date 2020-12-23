<template>
    <div class="fuzzyQueryBox clearfix  ">
        <div class="biaogeBox dispalywrap fl">
            <slot name="biaoBoxCenter"></slot>
            <slot></slot>
        </div>
        <div class="btns inline  btnArrs fr">
            <div class="queryBtn inline mr11 zujianBox"   @click="clickQueryUser">
                查询
            </div>
            <div class="clearBtn inline" @click="clearInputAll">清空</div>
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

    .fuzzyQueryBox {
        position: relative;
        overflow: hidden;

        .line {
            width: 20px;
            height: 2px;
            background: #fff;
            margin-right: 10px;
        }
    }

    .btns {
        position: absolute;
        right: 30px;
        bottom: 0px;

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