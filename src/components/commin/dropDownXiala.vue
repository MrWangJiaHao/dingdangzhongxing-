<template>
    <div class="dropDownBox">
        <div v-if="title !== ''" class="titleBox">{{ title }}</div>
        <div
                class="input_box"
                :class="w320 ? w320 : dropDowBox.w320 ? dropDowBox.w320 : ''"
        >
            <el-select
                    v-model="dropDowBox.select"
                    slot="prepend"
                    :disabled="dropDowBox.disabled"
                    @input="selectShow"
                    :placeholder="dropDowBox.placeholder"
                    @focus="getMMs"
            >
                <el-option
                        v-for="(item, idx) in dropDowBox.dropDownBoxData"
                        :key="idx"
                        :label="item[drop]"
                        :value="idx"
                ></el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    /*eslint-disable */
    import {isMaoHao} from "../../utils/validate";

    export default {
        props: {
            dropDowBox: {
                type: Object,
                default: () => {
                    return {
                        dropDownBoxData: [],
                        select: "",
                    };
                },
            },
            drop: String,
            w320: {
                type: String,
                default: "",
            },
        },
        data() {
            return {
                title: "",
                disable: false,
            };
        },
        created() {
            if (this.dropDowBox.title) {
                this.dropDowBox.disabled = this.dropDowBox.disabled
                    ? this.dropDowBox.disabled
                    : false;
                this.title = isMaoHao(this.dropDowBox.title);
            }
        },
        methods: {
            selectShow() {
                this.$emit("getDropDownData", this.dropDowBox.select);
            },
            getMMs(e) {
                this.$emit("cliclInput");
            },
        },
        computed: {},
    };
</script>
<style>
    .el-select {
        width: 100%;
        height: 100%;
    }

    .titleBox {
        margin-right: 11px;
    }
</style>
<style lang='scss' scoped>
    .dropDownBox {
        display: flex;
        align-items: center;
        height: 34px;

        .titleBox {
            font-size: 14px;
            font-family: Hiragino Sans GB;
            font-weight: normal;
            color: #454545;
            margin-right: 11px;
        }

        .input_box {
            height: 34px;
            background: #ffffff;
            border-radius: 4px;
        }
    }
</style>