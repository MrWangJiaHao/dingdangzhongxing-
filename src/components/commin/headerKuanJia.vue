<template>
    <div class="fuzzyQueryBox clearfix mb16">
        <div class="biaogeBox dispalywrap fl">
            <slot name="biaoBoxCenter"></slot>
            <slot></slot>
        </div>
        <div class="btns inline  btnArrs fr">
            <div class="queryBtn inline mr11 zujianBox"   @click="clickQueryUser">
                查询1
            </div>
            <div class="clearBtn inline" @click="clearInputAll">清空</div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            clickQueryUser() {
                this.$emit("clickQueryUser", true);
            },
            clearInputAll() {
                this.$emit("clearInputAll", true);
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