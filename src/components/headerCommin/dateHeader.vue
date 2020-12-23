<template>
    <div>
        <div class="inline mr11 ">
            <div class="displayalign">
                <div class="noneIconTitle mr11">{{ title }}:</div>
                <div class="mr20 displayalign">
                    <div class="mr10">
                        <dateTime
                                :dateTimeData="qianmiandeData"
                                @getDateTime="getreplenishStartTime"
                                ref="replenishStartTime"
                        />
                    </div>
                    <!-- 开始时间 -->
                    <div class="line"></div>
                    <div>
                        <dateTime
                                :dateTimeData="houmiandeData"
                                @getDateTime="getreplenishEndTime"
                                ref="replenishEndTime"
                        />
                    </div>
                    <!-- 结束时间 -->
                </div>
            </div>
        </div>
        <!-- 补货开始时间 -->
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