<template>
    <div>
        <div class="btnArrCenter displayalign">
            <div
                    class="clickArrOuter nowrap"
                    v-for="(item, idx) in xiaoxiDataArr"
                    :key="idx"
                    @click="clickOuter(idx)"
                    :class="idx === index ? 'active' : ''"
            >
                {{ item }}
            </div>
        </div>
        <!--  btn arr -->
        <div class="p10">
            <div class="backFF">
                <div v-if="index==0">
                    <fuheBox></fuheBox>
                </div>
                <!-- 复核内容-->
                <div v-else>
                    <yichanProdChuli></yichanProdChuli>
                </div>
                <!-- 异产区产品处理 内容  -->
            </div>
        </div>
    </div>
</template>

<script>
    import fuheBox from "./fuheBox"; //复核功能
    import yichanProdChuli from './yichanProdChuli' ; //异产区产品处理

    export default {
        name: "ReviewDelivery",
        components: {
            fuheBox,
            yichanProdChuli
        },
        data() {
            return {
                xiaoxiDataArr: ['复核', '异产区产品处理'],
                index: 0
            }
        },
        methods: {
            clickOuter(idx) {
                this.index = idx
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btnArrCenter {
        padding: 16px 30px 0 30px;
        border-bottom: 1px solid #d1d6e2;
    }

    .innerCenterTable {
        background: #fff;
    }

    .clickArrOuter:last-child {
        margin-right: 0px;
    }

    .clickArrOuter {
        width: 113px;
        height: 34px;
        text-align: center;
        display: inline-block;
        margin-right: 20px;
        line-height: 34px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border: 1px solid #d1d6e2;
        background: #fff;
        border-bottom: none;
        color: #333333;
        cursor: pointer;
        user-select: none;
    }

    .active {
        background: #599af4;
        color: #fff;
    }
</style>