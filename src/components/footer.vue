<template>
    <div class="footer_box">
        <div class="dianJiTuiChu">
            <div class="displayalign">
                <img src="../assets/svg/userName.svg" class="mr7" alt/>
                <div class="wenZi" @click="loginOutMeg">
                    登录用户&nbsp;
                    <span
                    >:<span class="ml11"> {{ userName }}</span></span
                    >
                </div>
            </div>
        </div>
        <transition
                enter-active-class="animate__animated animate__bounceInUp"
                leave-active-class="animate__animated animate__bounceOutDown"
        >
            <div v-show="display" class="loginOut tc">
                <div @click="loginout" class="clickLoginOutCenter">退出登入</div>
            </div>
        </transition>
        <div class="dianJiXiaoXi ">
            <div class="displayalign">
                <div class="imgBox">
                    <img src="../assets/svg/Toast.svg" alt/>
                </div>
                <div class="wenZi">消息</div>
                <div class="xiaoXiCenters ellipsis" @mouseout="xiaoxiout" @mouseleave="xiaoxiLeave"
                     @click="xiaoxiClick">
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
                    <div class="pd20 centers">
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
                pageSize: 1000,
                content: "",
                display: false,
                userName: "",
                xiaoxi: false,
                readTime: "",
                sendoutDataJson: {},
                timer: null,
                timer1: null,
                title: "",
                idx: 0,
                listLength: 0,
                setTime: 3000,
                isShowXiaoXiLeiBiao: false,
                xiaoxiArr: []
            };
        },
        computed: {
            dateNewData() {
                let data = new Date().toLocaleString('zh', {
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });
                return data
            },
        },
        async created() {
            this.userName = getCookie("userName");
            //发送请求 获取 当前的站内消息
            this.datares()
        },
        mounted() {

        },
        methods: {
            async datares() {
                let {result} = await post({
                    url:
                        "/wbs-warehouse-manage/v1/pWarehouseStationInfo/findRecordPage",
                    data: {
                        pageNumber: 1,
                        pageSize: 1000,
                        paras: {
                            enableStatus: 0
                        }
                    },
                });
                if (result.list.length) {
                    console.log(result)
                    this.xiaoxiArr = result.list
                    this.listLength = this.xiaoxiArr.length
                    this.changeLength()
                    this.moveStart()
                } else {
                    this.isShowXiaoXiLeiBiao = true
                    this.content = '暂无未读消息'
                }
            },
            xiaoxiout() {
                console.log(1)
                clearTimeout(this.timer1)
            },
            xiaoxiLeave() {
                this.moveStart()
            },
            changeLength() {
                this.content = this.xiaoxiArr[this.idx ? this.idx - 1 : 0].content;
                this.title = this.xiaoxiArr[this.idx ? this.idx - 1 : 0].title
                this.readTime = this.xiaoxiArr[this.idx ? this.idx - 1 : 0].readTime;
                this.sendoutDataJson = {
                    ...this.xiaoxiArr[this.idx ? this.idx - 1 : 0],
                    readTime: `${this.dateNewData}`,
                    enableStatus: 1,
                    readUserName: getCookie('userName'),
                }
            },
            startMove(obj, iTarget) {
                let self = this
                clearInterval(self.timer1);
                self.timer1 = setInterval(function () {
                    let speed = (iTarget - obj.offsetLeft) / 10;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    if (-obj.offsetLeft >= iTarget) {
                        obj.style.left = 0 + 'px';
                        if (self.listLength == self.idx) {
                            self.idx = 0
                        }
                        self.idx++;
                        self.changeLength()
                        console.log(self.listLength, self.idx)
                    } else {
                        obj.style.left = obj.offsetLeft + -speed + 'px';
                    }
                }, 500)
            },
            loginOutMeg() {
                this.datares()
                this.display = !this.display;
            },
            moveStart() {
                this.$nextTick(() => {
                    setTimeout(() => {
                        let parent = document.querySelector(".idBVox");
                        let clientWidth = parent.offsetWidth
                        this.startMove(parent, clientWidth)
                    }, 100)
                })
            },
            moveOutClearTime() {
                clearTimeout(this.timer)
                clearTimeout(this.timer1)
            },
            xiaoxiClick() {
                console.log(this.sendoutDataJson)
                if (this.isShowXiaoXiLeiBiao) return
                this.$pOrgProductsApp.pWarehouseStationInfo(this.sendoutDataJson)
                this.xiaoxi = true
                this.clearTime()
            },
            clearTime() {
                clearTimeout(this.timer)
                clearTimeout(this.timer1)
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
                this.moveStart()
                this.xiaoxi = false
            }
        },
    };
</script>

<style lang="scss" scoped>
    .idBVox {
        position: absolute;
        left: 0px;
    }

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
            left: 100px;
            box-shadow: 0px 7px 11px 1px rgba(0, 0, 0, 0.28);
            background: #fff;
            border-radius: 8px;

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
                border-radius: 4px;

                .clickLoginOutCenter {
                    cursor: pointer;
                    background: #ecf5ff;
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