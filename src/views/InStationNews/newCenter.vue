<template>
    <div class="outerCenter ">
        <div class="mianbaoxie  botD1">
            <div class="ptb10 mianbaoxiaetitles">
                <span class="mianbaixiazhanneixiaoxi displayalign zhanniaoxititle">站内消息</span>
                <span class="mianbaixiazhanneixiaoxi gtboxCenters">&gt;</span>
                <span class="mianbaixiazhanneixiaoxi">消息内容</span>
            </div>
        </div>
        <div class="ptb10 mt10">
            <div class="backFF he83 botD1"></div>
        </div>
        <div class=" ptb10  centesBoxOuter">
            <div class="pt50 backFF displayCenter ptb3020">
                <div class="w1000  inline">
                    <div class="pt60">
                        <!--<div>{{dataMsg.lastModifyUser}}</div>-->
                        <div class="line40">{{dataMsg.title}}</div>
                        <div>{{dataMsg.content}}</div>
                    </div>
                    <div class="tr ">
                        {{dateNewData}}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "newCenter",
        data() {
            return {
                dataMsg: (() =>
                        JSON.parse(this.$route.query.data)
                )(),
                sendOutDataJson: {
                    enableStatus: 1
                }
            }
        },
        created() {
            this.dataMsg.readTime = this.dateNewData
            this.dataMsg.enableStatus = 1
            this.sendOutDataJson = this.dataMsg
            this.createGetTable()
        },
        computed: {
            dateNewData() {
                let data = new Date().toLocaleString("chinese", {hour12: false});
                return data
            },
        },
        methods: {
            async createGetTable() {
                let data = await this.$pOrgProductsApp.pWarehouseStationInfo(this.sendOutDataJson)
                console.log(data)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .centesBoxOuter {
        height: 100%;
    }

    .mianbaixiazhanneixiaoxi {
        color: #606266;
        font-weight: bold;
    }

    .zhanniaoxititle::before {
        content: "";
        display: inline-block;
        width: 3px;
        height: 16px;
        background: #5a9af4;
        margin-right: 10px;
    }

    .mianbaoxiaetitles {
        display: flex;
        align-items: center;
    }

    .gtboxCenters {
        padding: 0 10px;
    }
</style>