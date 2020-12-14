<template>
    <div class="setUserIngBox">
        <div class="setUserIngBoxCenter">
            <div class="headerBox mb10">
                <div class="closeTitle">打印批次号</div>
                <div class="closeIcon" @click="closeBtn"></div>
            </div>
            <div style="border-bottom: 1px solid #d2d6e2; padding: 0 0 0px 0">
                <div id="printCenter" style="text-align: center">
                    <div style="width: 780px">
                        <div
                                v-for="(item, idx) in parintBatchNumberArrs"
                                :key="idx"
                                style="
                position: relative;
                padding: 20px;
                display: inline-block;
                margin-left: 20px;
                margin-bottom: 20px;
                width: 300px;
                color: #333333;
                font-size: 16px;
                font-weight: normal;
                text-align: left;
                border: 1px solid #d1d6e2;
              "
                        >
                            <div style="margin-bottom: 10px">
                                产品名称：{{ item.prodName }}
                            </div>
                            <div style="margin-bottom: 10px">规 格：{{ item.specName }}</div>
                            <div style="margin-bottom: 10px">
                                委托公司：{{ item.supName }}
                            </div>
                            <div style="margin-bottom: 10px">批次号：{{ item.batchNo }}</div>
                            <div
                                    style="
                  height: 50px;
                  z-index: -1;
                  overflow: hidden;
                "
                            >
                                <img
                                        width="300"
                                        height="100"
                                        style="margin-left: -40px"
                                        :src="
                    'http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeat/getBarCodeImg?code=' +
                    item.batchNo
                  "
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 打印的内容 -->

                <div class="tr" style="padding: 20px 20px 20px 0">
                    <div class="tijiaoBox mt20 disinb" @click="printWarehouseReceipt">
                        打印
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableDatas: [],
                Newtime: "",
                parintBatchNumberArrs: [],
            };
        },
        created() {
            this._changeTime();
            let parintBatchNumberArrs = eval(
                sessionStorage.getItem("parintBatchNumberArrs")
            );
            if (parintBatchNumberArrs) {
                this.parintBatchNumberArrs = parintBatchNumberArrs;
            }
        },
        mounted() {
            this.$nextTick(() => {
                let cells = document
                    .getElementById("printCenter")
                    .getElementsByClassName("cell");
                let array = Array.from(cells);
                array.forEach((item) => {
                    item.style = "text-align:center;";
                });
            });
        },
        methods: {
            closeBtn() {
                this.$parent._data.BatchNumber = false;
            },
            //打印
            printWarehouseReceipt() {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.LODOP = this.$getLodop();
                        setTimeout(() => {
                            this._createEwm(this.multipleSelection);
                        }, 100);
                    }, 200);
                });
            },
            _createEwm() {
                this.LODOP.ADD_PRINT_HTM(
                    20,
                    10,
                    2970,
                    2100,
                    document.getElementById("printCenter").innerHTML
                );
                // this.LODOP.PRINTA(); //不需要进入查看页面 直接打印
                this.LODOP.PREVIEW(); //需要进入页面查看
            },
            _changeTime() {
                this.Newtime = new Date().toLocaleString("chinese", {hour12: false});
            },
        },
    };
</script>


<style lang="scss" scoped>
    @import "../../assets/scss/btn.scss";

    .setUserIngBox {
        .headerBox {
            height: 50px;
            border-radius: 3px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            position: relative;
            justify-content: space-between;
            background: rgb(236, 241, 247);
            border-bottom: 1px solid #d1d6e2;
        }

        .setUserIngBoxCenter {
            position: relative;
            left: 50%;
            top: 144px;
            transform: translateX(-50%);
            background: #fff;
            width: 800px;
            overflow-y: auto;
            max-height: 750px;

            .centerBox {
                padding: 30px 20px;
            }

            .setTitle {
                margin-bottom: 18px;
            }

            .gerxinxiBox {
                display: flex;
                flex-direction: column;

                > div {
                    margin-bottom: 18px;
                }

                .xinxiBitian {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;

                    > div {
                        margin-right: 20px;
                    }
                }
            }

            .cityBoxCenter {
                display: flex;
                align-items: center;
            }
        }

        .textAreaBox {
            font-size: 14px;
            width: 72%;
            height: 40px;
            margin-left: 80px;

            > textarea {
                color: #606266;
                text-indent: 16px;
                line-height: 40px;
                white-space: nowrap;
                overflow: hidden;
            }

            margin-bottom: 30px;
        }

        .bzTetxArea {
            font-size: 14px;
            width: 72%;
            height: 80px;

            > textarea {
                color: #606266;
                text-indent: 16px;
                line-height: 30px;
                overflow: hidden;
            }
        }

        .quxiaoBox {
            @include BtnFunction("error");
        }

        .tijiaoBox {
            @include BtnFunction("success");
        }
    }
</style>