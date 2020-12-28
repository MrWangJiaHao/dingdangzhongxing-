<template>
    <div class="outerCenter p10">
        <div class="">

        </div>
        <div class="backFF botD1 he83">
        </div>
        <div class="backFF centesBoxOuter">
            <div class="pt50 displayCenter centerBox">
                <div class="w1000  inline">
                    <div class="pt60">
                        <!--<div>{{dataMsg.lastModifyUser}}</div>-->
                        <div>{{dataMsg.title}}</div>
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

    .outerCenter {
        height: 70%;
    }
</style>