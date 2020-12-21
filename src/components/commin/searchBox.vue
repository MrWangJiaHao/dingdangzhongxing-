<template>
    <div class="searchBox">
        <div v-if="title !== ''" class="titleBox">{{ title }}</div>

        <div>
            <el-input
                    :class="searchCenter.w320 ? searchCenter.w320 : ''"
                    :placeholder="searchCenter.placeholder"
                    v-model="searchCenter.input"
                    @blur="searchData"
                    clearable
                    :disabled="searchCenter.disabled"
                    @input="changerInputs"
                    :maxlength="maxlength"
            ></el-input>
        </div>
    </div>
</template>

<script>
    import {isMaoHao} from "../../utils/validate";

    export default {
        props: {
            searchCenter: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            maxlength: {
                type: String,
                default: "30"
            }
        },
        data() {
            return {
                title: "",
            };
        },
        created() {
            if (this.searchCenter.title) {
                this.searchCenter.disabled = this.searchCenter.disabled
                    ? this.searchCenter.disabled
                    : false;
                this.title = isMaoHao(this.searchCenter.title);
            }
        },
        methods: {
            searchData() {
                this.$emit("getSearchCenterShuJu", this.searchCenter.input);
                this.$emit("clearInput", this.searchCenter.clearInput);
            },
            changerInputs(e) {
                this.$emit("getChangeInput", e);
                this.$emit("changeInputs", this.searchCenter.input);
            },
            clearInput() {
            },
        },
    };
</script>

<style lang="scss" scoped>
    .searchBox {
        display: flex;
        align-items: center;
        height: 36px;

        .titleBox {
            line-height: 36px;
            margin-right: 11px;
        }
    }
</style>