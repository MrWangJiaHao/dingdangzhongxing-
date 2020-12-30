<template>
    <div>
        <div class="inline mr20 ">
            <div class="displayalign">
                <div class="noneIconTitle mr10">{{ xialaJson.title }}:</div>
                <div class=" displayalign">
                    <dropDownXiala
                            :w320="xialaJson.w320"
                            :dropDowBox="xialaJson.wieTuoGonShiJson"
                            @cliclInput="weiTuoGonShiClick"
                            @getDropDownData="weiTuoGonShiInput"
                            :drop="xialaJson.drop"
                    />
                </div>
            </div>
        </div>
        <!-- 补货开始时间 -->
    </div>
</template>

<script>
    import dropDownXiala from "../commin/dropDownXiala"; //下拉框
    export default {
        props: {
            xialaJson: {
                type: Object,
                default: () => {
                    return {
                        title: "",
                        wieTuoGonShiJson: {},
                        drop: "",
                        w320: "w160",
                    };
                },
            },
        },
        components: {
            dropDownXiala,
        },
        methods: {
            weiTuoGonShiClick() {
                this.$emit("weiTuoGonShiClick", undefined);
            },
            weiTuoGonShiInput(e) {
                this.$emit("weiTuoGonShiClick", e);
            },
            clearXiaLa() {
                this.xialaJson.wieTuoGonShiJson.select = ''
            }
        },
    };
</script>

<style lang='scss' scoped>
</style>