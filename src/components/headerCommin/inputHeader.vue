<template>
    <div>
        <div class="inline mr20 fl ">
            <div class="displayalign">
                <div class=" displayalign">
                    <div >
                        <searchBox
                                @changeInputs="changereplenishOrderNo"
                                :searchCenter="buhuodanhaoJson"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import searchBox from "../commin/searvhBoxs"; //下拉框

    export default {
        props: {
            buhuodanhaoJson: {
                type: Object,
                default: () => {
                    return {
                        placeholder: "",
                        title: "",
                        input: "",
                    };
                },
            },
        },
        components: {
            searchBox,
        },
        methods: {
            changereplenishOrderNo(e) {
                this.$emit("changereplenishOrderNo", e);
            },
            clearInput() {
                this.buhuodanhaoJson.input = "";
            },
        },
    };
</script>

<style lang='scss' scoped>
</style>