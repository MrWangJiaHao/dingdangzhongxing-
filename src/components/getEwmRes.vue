<template>
    <div>
        <div
                style="
        background: #ffffff;
        border: 1px solid #d1d6e2;
        text-align: center;
      "
        >
            <div style="padding: 24px;">
                <div class="canvas" style="width: 180px;height: 180px;position: relative;">
                    <div style="position: absolute;left: 50%;z-index: 100; top: 50%;transform: translate(-50%,-50%)">
                        <img src="../assets/svg/logo.svg"/>
                    </div>
                </div>
            </div>
            <div style="padding-bottom: 10px; font-weight:700; font-size: 14px;width: 220px">
                姓名： {{ ewmArr.userName }}
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
                        width: 180,
                        height: 180,
                    }
                );
                qrCode.makeCode(this.ewmArr.id);
            },
        },
    };
</script>
