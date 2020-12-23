<template>
    <div>
        <div
                style="
        background: #ffffff;
        border: 1px solid #d1d6e2;
      "
        >
            <div style="padding: 24px;">
                <div class="canvas" style="position: relative;">
                    <div style="position: absolute;left: 50%;z-index: 100; top: 50%;transform: translate(-50%,-50%)">
                        <img src="../assets/svg/logo.svg"/>
                    </div>
                </div>
            </div>
            <div style="padding: 0 24px 10px 24px; font-size: 14px;">
                <div>
                    <div style="font-weight:700;display: inline-block;width: 58px;text-align-last: justify">
                        姓名
                    </div>
                    ：{{ ewmArr.userName }}
                </div>
                <div>
                    <div style="font-weight:700;display: inline-block;width: 58px;text-align-last: justify">
                        角色
                    </div>
                    ：{{ewmArr.createUser}}
                </div>
                <div>
                    <div style="font-weight:700;display: inline-block;width: 58px;text-align-last: justify">
                        手机号
                    </div>
                    ：{{ewmArr.userPhone}}
                </div>
                <div>
                    <div style="font-weight:700;display: inline-block;width: 58px;text-align-last: justify">
                        入职时间
                    </div>
                    ：{{ewmArr.createTime}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            ewmArr: Object,
            idx: Number,
        },
        mounted() {
            this.getEwm();
        },
        methods: {
            getEwm() {
                let qrCode = new this.$QRCode(
                    document.getElementsByClassName("canvas")[this.idx],
                    {
                        width: 210,
                        height: 200,
                    }
                );
                qrCode.makeCode(this.ewmArr.id);
            },
        },
    };
</script>
