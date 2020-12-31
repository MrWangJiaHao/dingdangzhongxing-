<template>
    <div>
        <div class="btnArr pd10">
            <div class="backFF flexBetWeen botD1 pd20">
                <div class="meiyiyetitle  pd30">{{title}}</div>
                <div class="displayalign ">
                    <div v-for="(item,idx) in btnArr" @click="item.onClick" :key="idx" :class="item.class">
                        {{item.title}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: {
            title: {
                type: String,
                default: "默认"
            },
            btnArr: {
                type: Array,
                default: () => [{
                    title: "创建入库单",
                    onClick() {

                    },
                    class: "mr10 bianjiUser"
                },
                    {
                        title: "删除",
                        onClick() {

                        },
                        class: "remove"
                    }]
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/btn.scss";

    .bianjiUser {
        @include BtnFunction("success");
    }

    .remove {
        @include BtnFunction("error");
    }

</style>