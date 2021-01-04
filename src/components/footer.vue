<template>
    <div class="footer_box">
        <div class="dianJiTuiChu">
            <div class="displayalign">
                <img src="../assets/svg/userName.svg" class="mr7" alt/>
                <div class="wenZi" @click="loginOutMeg">
                    登录用户&nbsp;
                    <span
                    >wms_ss:<span class="ml11"> {{ userName }}</span></span
                    >
                </div>
            </div>
        </div>
        <transition
                enter-active-class="animate__animated animate__bounceInUp"
                leave-active-class="animate__animated animate__bounceOutDown"
        >
            <div v-show="display" class="loginOut">
                <div @click="loginout" class="clickLoginOutCenter">退出登入</div>
            </div>
        </transition>
        <div class="dianJiXiaoXi ">
            <div class="displayalign">
                <div class="imgBox">
                    <img src="../assets/svg/Toast.svg" alt/>
                </div>
                <div class="wenZi">消息</div>
                <div class="xiaoXiCenters ellipsis" @click="xiaoxiClick">
                    <div class="idBVox">
                        {{ content }}
                    </div>
                </div>
            </div>
            <transition enter-active-class="animate__animated animate__bounceInUp"
                        leave-active-class="animate__animated animate__bounceOutDown">
                <div class="toastMsg" v-show="xiaoxi" @mouseleave="mouseleaveSetTimeOut" @mouseout="moveOutClearTime">
                    <div class="title p20s  displayJucenMes">
                        消息
                        <div class="closeBox" @click="xiaoxi=false"></div>
                    </div>
                    <div class="pd20 centers">
                        {{title}}
                    </div>
                    <div class="pd20   centers">
                        {{ content }}
                    </div>
                    <div class="p20 tr centers">
                        {{readTime}}
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import {post} from "../api/api";
    import {getCookie} from "../utils/validate";

    export default {
        data() {
            return {
                pageNumber: 1,
                pageSize: 1,
                content: "",
                display: false,
                userName: "",
                xiaoxi: false,
                readTime: "",
                sendoutDataJson: {},
                timer: null,
                title: "",
                setTime: 3000
            };
        },
        computed: {
            dateNewData() {
                let data = new Date().toLocaleString("chinese", {hour12: false});
                return data
            },
        },
        async created() {
            this.userName = getCookie("userName");
            //发送请求 获取 当前的站内消息
            let {pageNumber, pageSize} = this;
            let {result} = await post({
                url:
                    "/wbs-warehouse-manage/v1/pWarehouseStationInfo/findRecordPage",
                data: {
                    pageNumber,
                    pageSize,
                },
            });
            let idBvox = document.getElementsByClassName("idBVox")[0],
                self = this
            idBvox.style.width = result.list[0].content.length * 14 + 40 + "px";
            this.content = result.list[0].content;
            this.title = result.list[0].title
            this.readTime = result.list[0].readTime;
            this.sendoutDataJson = {
                ...result.list[0],
                readTime: self.dateNewData,
                enableStatus: 1
            }
        },
        methods: {
            loginOutMeg() {
                this.display = !this.display;
            },
            moveOutClearTime() {
                clearTimeout(this.timer)
            },
            xiaoxiClick() {
                console.log(this.sendoutDataJson)
                this.$pOrgProductsApp.pWarehouseStationInfo(this.sendoutDataJson)
                this.xiaoxi = true
                this.clearTime()
            },
            clearTime() {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.xiaoxi = false
                }, this.setTime)
            },
            async loginout() {
                let datas = await post({
                    url: "http://139.196.176.227:8801/am/v1/pUser/logout",
                    data: {},
                });
                if (datas.code == "10000") {
                    this.$messageSelf.message(datas.msg);
                    this.$cookie.delete("userName");
                    this.$cookie.delete("password");
                    this.$cookie.delete("userToken");
                    this.$cookie.delete("userType");
                    this.$cookie.delete("X-Auth-wareId");
                    this.$cookie.delete("X-Auth-user");
                    this.$router.push({
                        path: "/",
                    });
                } else {
                    this.$messageSelf.message("退出登入" + datas.msg);
                }
            },
            mouseleaveSetTimeOut() {
                clearTimeout(this.timer)
                this.xiaoxi = false
            }
        },
    };
</script>
<style scoped>
    .idBVox {
        position: absolute;
        animation: demo 10s linear infinite normal;
    }

    @keyframes demo {
        form {
            right: -620px;
        }
        10% {
            right: -550px;
        }
        20% {
            right: -500px;
        }
        30% {
            right: -450px;
        }
        40% {
            right: -400px;
        }
        50% {
            right: -358px;
        }
        60% {
            right: -308px;
        }
        70% {
            right: -258px;
        }
        80% {
            right: -200px;
        }
        90% {
            right: -150px;
        }
        95% {
            right: -100px;
        }
        to {
            right: 0px;
        }
    }
</style>
<style lang="scss" scoped>
    .closeBox {
        width: 10px;
        height: 10px;
        background: url("../assets/img/close.png") center center/cover;
        cursor: pointer;
    }

    .title {
        font-size: 14px;
        color: #555555;
        font-weight: 600;
    }

    .footer_box {
        position: fixed;
        height: 30px;
        background: #599af3;
        width: 100%;
        bottom: 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 33;

        .dianJiTuiChu {
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            margin-left: 21px;

            .imgBox {
                margin-right: 7px;
                width: 14px;
                height: 14px;
                margin-top: -4px;

                img {
                    width: 14px;
                    height: 14px;
                }
            }

            .wenZi {
                font-size: 14px;
                font-family: Hiragino Sans GB;
                font-weight: normal;
                line-height: 30px;
                color: #ffffff;
                cursor: pointer;
            }
        }

        .centers {
            word-break: break-all;
            word-wrap: break-word;
        }

        .loginOut {
            width: 100px;
            cursor: pointer;
            height: 30px;
            position: absolute;
            bottom: 37px;
            left: 30px;
            border: 1px solid #ccc;

            &::after {
                content: "";
                position: absolute;
                left: 10px;
                border: 6px solid transparent;
                bottom: -12px;
                z-index: 100;
                filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
            }

            &:hover {
                border-top-color: #ccc;

                .clickLoginOutCenter {
                    cursor: pointer;
                    background: #ccc;
                }
            }

            .clickLoginOutCenter {
                line-height: 30px;
                padding: 0 10px;
            }
        }

        .dianJiXiaoXi {
            position: relative;

            .imgBox {
                width: 16px;
                height: 14px;
                margin-top: -4px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .toastMsg {
                position: absolute;
                bottom: 45px;
                z-index: -1;
                width: 70%;
                background: #fff;
                box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.28);

                border-radius: 8px;
            }

            .wenZi {
                font-size: 14px;
                font-family: Hiragino Sans GB;
                font-weight: normal;
                color: #ffffff;
                margin-left: 3px;
            }

            .xiaoXiCenters {
                width: 159px;
                font-size: 14px;
                font-family: Hiragino Sans GB;
                font-weight: normal;
                color: #ffffff;
                position: relative;
                height: 20px;
                z-index: 11111;
                overflow: hidden;
                margin-left: 23px;
                margin-right: 104px;
            }
        }
    }
</style>