<template>
    <div>
        <div>
            <div class="setTitle pd20 mt20" v-if="chuanjianJsonAndArr.title">
                {{ chuanjianJsonAndArr.title }}
            </div>
            <!-- title -->
            <div>
                <slot></slot>
                <div
                        class="dis botD1 pd20"
                >
                    <div
                            v-for="(item, idx) in chuanjianJsonAndArr.inputArr"
                            :key="idx"
                            class="mb16 mr20 inline"
                    >
                        <div v-if="item.types == 'xiala'" class=" ellipsis">
                            <dropDownXiala
                                    :dropDowBox="item"
                                    :drop="item.drop"
                                    @cliclInput="item.dropDownXialaClickFun"
                                    @getDropDownData="item.getDropDownChangeDataFun"
                            />
                        </div>
                        <div v-else-if="item.types == 'search'" class=" ellipsis">
                            <searchBox :searchCenter="item"/>
                        </div>
                        <div v-else>
                            {{ "再加一个判断" + item }}
                        </div>

                    </div>
                    <slot name="btnsArr"></slot>

                </div>
            </div>
            <!-- 主体 -->
        </div>
    </div>
</template>

<script>
    import dropDownXiala from "./dropDownXiala";
    import searchBox from "./searchBox";

    export default {
        components: {
            dropDownXiala,
            searchBox,
        },
        props: {
            chuanjianJsonAndArr: {
                type: Object,
                default: () => {
                    return {};
                },
            },
        },
        methods: {},
    };
</script>

<style lang='scss' scoped>
    .centerBox {
        padding: 30px 20px;
        border-bottom: 1px solid #d1d6e2;
    }
</style>