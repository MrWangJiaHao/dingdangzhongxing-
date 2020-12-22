<template>
    <div>
        <div class="centerBox mb20" id="CentersBox">
            <div class="setTitle">{{ title }}</div>
            <div class="gerxinxiBox">
                <div class="xinxiBitian">
                    <div class="dispalywrap rukuquerenparent">
                        <div
                                v-for="(item, idx) in detailsArr"
                                :key="idx"
                                class="displayalign parentBox"
                        >
                            <div
                                    class="titleBox"
                                    v-html="shezhizitiwiered(item.titles)"
                            ></div>
                            <div class="centersBox">
                                <div v-if="item.type == 'date'">
                                    <dateTime
                                            style="height: 28px;!important; "
                                            :style="{ width: item.width ? item.width : '170px' }"
                                            :valueDataStart="item.centers"
                                            :dateTimeData="{
                      placeholder: item.centers,
                      disabled: item.disabled ? item.disabled : false,
                    }"
                                            @getDateTime="item.getDateTimeExpectedSendTime"
                                    />
                                </div>
                                <div v-else-if="item.type == 'input'">
                                    <input
                                            type="text"
                                            v-model="item.input"
                                            class="input"
                                            :disabled="item.disabled"
                                            :placeholder="item.placeholder || ''"
                                            @input="item.onInputs || ''"
                                            @blur="item.OnBlur"
                                    />
                                </div>
                                <div v-else>
                                    {{ item.centers }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import dateTime from "../../components/commin/dateTime";

    export default {
        components: {
            dateTime,
        },
        props: {
            detailsArr: {
                type: Array,
                default: () => [],
            },
            title: {
                type: String,
                default: "",
            },
        },
        methods: {
            shezhizitiwiered(item) {
                let idxs = item.indexOf("*");
                if (idxs != -1) {
                    item =
                        `<span style="color:red;">${item[idxs]}</span>` +
                        item.substring(idxs + 1);
                }
                return item;
            },
        },
    };
</script>
<style>
    #CentersBox .ivu-input-inner-container {
        width: 180px;
        height: 28px;
    }

    #CentersBox .ivu-input {
        height: 28px !important;
    }
</style>
<style lang='scss' scoped>
    .input {
        border: 1px solid #d2d6e2;
        height: 28px;
        text-indent: 10px;
        color: #333333;
        font-size: 14px;
        font-weight: normal;
        background: rgba(236, 241, 247, 0);
        border-radius: 2px;
    }

    .centerBox {
        padding: 30px 20px;
        border-bottom: 1px solid #d1d6e2;

        .setTitle {
            margin-bottom: 18px;
        }
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

    .rukuquerenparent {
        width: 100%;
        border-top: 1px solid #d1d6e2;
        border-left: 1px solid #d1d6e2;
        .parentBox {
            width: 33.3%;
            color: #333333;
            border: 1px solid #d1d6e2;
            border-top: none;
            border-left: none;

            .titleBox {
                padding: 12px 20px 12px 0;
                width: 106px;
                border-right: 1px solid #d1d6e2;
                background-color: #ecf1f7;
                text-align: right;
            }
        }
    }
</style>