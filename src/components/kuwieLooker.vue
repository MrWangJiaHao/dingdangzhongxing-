<template>
    <div class="quyuKooler">
        <div class="kuweituBox">
            <div v-if="kuwieLookerDataJson.kuwie.length">
                <div v-for="(item, idx) in kuwieLookerDataJson.kuwie" :key="idx">
                    <div class="displayalign diyipaidechanshu">
                        <div class="paishu displayalign ellipsis">
                            {{ getdaxieShuZi(idx) }}排
                        </div>
                        <div v-for="(zuS, index) in item.groups" :key="index" class="center-box">
                            <div class="disinb">
                                <div class="border displayCenter kuweiName" v-for="Nums in 9" :key="Nums"
                                >
                                    {{ "0" + Nums }}
                                </div>
                            </div>

                            <div
                                    v-if="zuS.shelfDist && item.groups.length != 1"
                                    class="disinb verticalLine tc"
                                    :style="{
                width: zuS.shelfDist * (10000 / 85) + 'px',
                top:'-40px'
              }"
                            >
                                {{ zuS.shelfDist }}m
                            </div>
                            <span class="kouweiCss" v-if="zuS.shelfDist">
                                S口
                            </span>
                            <span class="kouweiCss Down"
                                  v-if="zuS.shelfDist"
                            >
                                B口
                            </span>
                            <span class="centerWenZi" v-if="zuS.shelfDist">
                                A0101
                            </span>
                            <!-- 组与组之间的距离 -->
                            <div class=" disinb">
                                <div class="border kuweiName displayCenter" v-for="Nums in 9" :key="Nums"
                                >
                                    {{ "0" + Nums }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 排 -->
                    <div
                            v-if="item.rowDist && kuwieLookerDataJson.kuwie.length != 1"
                            class="transverseLine juliLineShu"
                            :style="{
            height: item.rowDist * (10000 / 85) + 'px',
            lineHeight: item.rowDist * (10000 / 85) + 'px',
          }"
                    >
                        {{ item.rowDist }}m
                    </div>
                    <!-- 排与排之间的距离 -->
                </div>
            </div>
            <div v-else>
                暂无库位
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable*/
    import {getzicanParent, isNums} from "../utils/validate";

    export default {
        props: {
            kuwieLookerDataJson: Object,
        },
        created() {
            console.log(this.kuwieLookerDataJson);
        },
        methods: {
            getzicanParent(item) {
                return getzicanParent(item);
            },
            getdaxieShuZi(num) {
                return isNums(num);
            },
        },
    };
</script>

<style scoped>
    .center-box {
        position: relative;
    }

    .kuweiName {
        height: 33px;
        width: 50px;
    }

    .kouweiCss {
        position: absolute;
        left: 50%;
        color: #599AF4;
        font-size: 16px;
        transform: translate(-50%);
    }

    .kouweiCss.Down {
        bottom: 0;
    }

    .paishu {
        font-size: 16px;
        font-weight: bold;
        color: #599af4;
        line-height: 10px;
        padding-right: 30px;
    }

    .kuweituBox {
        position: relative;
        max-width: 1000px;
        max-height: 750px;
        overflow: auto;
    }

    .centerWenZi {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 12px;
        font-size: 16px;
        font-weight: 400;
        color: #65696F;
    }

    .quyuKooler {
        background: #f8f8f8;
        max-width: 1000px;
        max-height: 750px;
        overflow: auto;
    }

    .disinb .border:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .disinb .border:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-bottom-color: #000;
    }
</style>