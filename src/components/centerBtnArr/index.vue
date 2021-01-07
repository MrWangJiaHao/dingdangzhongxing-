<template>
    <div>
        <div v-if="!isShowIdx" class="btnArr pd10">
            <div class="backFF flexBetWeen botD1 pd20">
                <div class="meiyiyetitle  pd30">{{title}}</div>
                <div class="displayalign " v-if="btnArr.length">
                    <button v-for="(item,idx) in btnArr" @click="item.onClick" :key="idx" :class="item.class">
                        {{item.title}}
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="btnArr ">
            <div class="backFF flexBetWeen pd20">
                <div class="meiyiyetitle pt20 ">{{title}}</div>
                <div class="displayalign " v-if="btnArr.length">
                    <button v-for="(item,idx) in btnArr" @click="item.onClick" :key="idx" :class="item.class">
                        {{item.title}}
                    </button>
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
                default: () => []
            },
            isShowIdx: {
                type: Boolean,
                default: false
            }
        }
    }
    /*{
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
}*/
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