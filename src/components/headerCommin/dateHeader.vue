<template>
    <div class="inline mr20 fl  ">
        <div class="displayalign ">
            <div class="noneIconTitle mr11">{{ title }}:</div>
            <div class=" displayalign">
                <div class="mr10">
                    <dateTime
                            :width="width"
                            :dateTimeData="qianmiandeData"
                            @getDateTime="getreplenishStartTime"
                            ref="replenishStartTime"
                    />
                </div>
                <!-- 开始时间 -->
                <div class="line"></div>
                <div>
                    <dateTime
                            :width="width"
                            :dateTimeData="houmiandeData"
                            @getDateTime="getreplenishEndTime"
                            ref="replenishEndTime"
                    />
                </div>
                <!-- 结束时间 -->
            </div>
        </div>
    </div>
</template>

<script>
    import dateTime from "../../components/commin/dateTime.vue"; //时间
    export default {
        props: {
            title: {
                type: String,
                default: "",
            },
            width: {
                type: String,
                default: "180"
            },
            qianmiandeData: {
                type: Object,
                default: () => {
                },
            },
            houmiandeData: {
                type: Object,
                default: () => {
                },
            },
        },
        data() {
            return {
                sendOutData: {
                    startTime: "",
                    endTime: "",
                },
            };
        },
        components: {
            dateTime,
        },
        methods: {
            getreplenishStartTime(e) {
                this.sendOutData.startTime = e;
                this.$emit("getTime", this.sendOutData);
            },
            getreplenishEndTime(e) {
                this.sendOutData.endTime = e;
                this.$emit("getTime", this.sendOutData);
            },
            clearTime() {
                this.$refs.replenishStartTime.clear();
                this.$refs.replenishEndTime.clear();
            },
        },
    };
</script>