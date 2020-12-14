<template>
    <div id="app">
        <router-view v-if="isRouterAlive"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isRouterAlive: true,
            };
        },
        provide() {
            return {
                reload: this.reload,
            };
        },
        created() {
            this.$store.dispatch("getusertype");
            if (localStorage.getItem("data")) {
                //replaceState替换数据 Object.assign合并对象
                this.$store.replaceState(
                    Object.assign(
                        {},
                        this.$store.state,
                        JSON.parse(localStorage.getItem("data"))
                    )
                );
            } //在页面刷新时将vuex里的信息保存到localStorage里
            window.addEventListener("beforeunload", () => {
                localStorage.setItem("data", JSON.stringify(this.$store.state));
            });
            this.addHenxianTables();
        },
        methods: {
            addHenxianTables() {
                setTimeout(() => {
                    this.$nextTick(() => {
                        let tablesCenter = document.getElementsByTagName("td");
                        tablesCenter = Array.from(tablesCenter);
                        tablesCenter.forEach((item) => {
                            if (!item.children[0].children.length) {
                                item.children[0].innerHTML = item.children[0].innerHTML
                                    ? item.children[0].innerHTML
                                    : "———";
                            }
                        });
                    });
                }, 700);
            },
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(function () {
                    this.isRouterAlive = true;
                });
            },
        },
    };
</script>

<style lang="scss">
    @import "./assets/scss/btn.scss";

    .remove {
        @include BtnFunction("error");
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
    }

    .l {
        float: left;
    }

    .r {
        float: right;
    }

    .clear {
        content: "";
        display: block;
        clear: both;
    }

    #app {
        height: 100%;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    /*隐藏滚动条
    ::-webkit-scrollbar {
      width: 0 !important;
    }
    ::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    } */
    /*改变滚动条样式*/
    ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }

    ::-webkit-scrollbar-track {
        background: #fff;
    }

    ::-webkit-scrollbar-thumb {
        width: 12px;
        height: 12px;
        background: #d1d6e2;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #333;
    }

    ::-webkit-scrollbar-corner {
        background: #fff;
    }

    /*去掉数字输入框的上下箭头*/
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
    }

    input[type="number"] {
        -moz-appearance: textfield !important;
    }

    .el-input__inner {
        font-size: 14px;
    }

    .el-table--border,
    .el-table--group {
        border: 1px solid #d2d6e2 !important;
        // border-bottom: none !important;
    }

    /*全局设置表格一行的高度*/
    .el-table td,
    .el-table th {
        padding: 6px 0 !important;
    }

    /*全局设置表格内容不换行 */
    .el-table .cell {
        white-space: nowrap !important;
    }

    /**全局设置表头背景颜色 */
    .has-gutter .el-table td,
    .el-table th.is-leaf {
        background: #e1eaf5 !important;
    }

    .el-table td,
    .el-table th.is-leaf {
        border-right: 1px solid #d2d6e2 !important;
        border-bottom: 1px solid #d2d6e2 !important;
    }

    /**全局设置表格斑马线背景色 */
    .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #f3f8fe !important;
    }

    /* 全局设置分页器样式*/
    .pageComponent {
        border: 1px solid #d2d6e2 !important;
        border-top: none !important;
        padding: 2px 0 !important;
        text-align: right !important;
        height: 36px !important;
        background: #ffffff !important;
    }

    //全局设置返回提交按钮css样式
    .footerBtnBox {
        height: 66px !important;

        .backBtnBox {
            position: fixed !important;
            bottom: 30px !important;
            background: #eef1f8 !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: flex-end !important;
            height: 66px !important;
            border-top: 1px solid #ced4de !important;

            .backBtn {
                margin: 0 16px 0 0 !important;
                @include BtnFunction("");
                background: white !important;
            }

            .submitBtn {
                margin: 0 10px 0 0 !important;
                @include BtnFunction("success");
            }
        }
    }
</style>
