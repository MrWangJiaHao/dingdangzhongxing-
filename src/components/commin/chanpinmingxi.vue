<template>
    <div class="Colord1d6e2 mt20">
        <div class="clearfix">
            <div class="setTitle fl mb16">{{ chanpinminxiJson.title }}</div>
            <div class="tr fr mb16">
                <slot name="anniuBtns"></slot>
            </div>
        </div>
        <div class="tableInInput">
            <tableCommin
                    :tableDataJson="chanpinminxiJson.tableDataJsonAndArr"
                    @tableSelectArr="tableSelectArrs"
            >
            </tableCommin>
        </div>
    </div>
</template>

<script>
    import tableCommin from "./tableCommin";

    export default {
        components: {
            tableCommin,
        },
        props: {
            chanpinminxiJson: {
                type: Object,
                default: () => {
                    return {
                        title: "",
                    };
                },
            },
        },
        methods: {
            tableSelectArrs(e) {
                this.$emit("tableSelectArrs", e);
            },
        },
    };
</script>
