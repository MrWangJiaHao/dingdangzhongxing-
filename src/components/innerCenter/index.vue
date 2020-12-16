<template>
    <div>
        <div class="btnArr">
            <div class="btnInnerCenter">
                <div class="meiyiyetitle">{{title || innerCenterIndex.title}}</div>
                <div>
                    <slot name="btnArrCenter"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .btnArr {
        padding: 0 10px;
    }

    .meiyiyetitle {
        display: flex;
        align-items: center;
    }

    .btnInnerCenter {
        border-bottom: 1px solid #d1d6e2;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(255, 255, 255);
    }
</style>
<script>
    export default {
        name: "index",
        props: {
            title: {
                type: String,
                default: ""
            },
            innerCenterIndex: {
                type: Object,
                default: () => {
                    return {
                        title: ""
                    }
                }
            }
        }
    }
</script>