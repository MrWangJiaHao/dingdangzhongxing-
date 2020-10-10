<template>
  <div>
    <div
      class="ewmParents displayColom"
      style="
        background: #ffffff;
        border: 1px solid #d1d6e2;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
      "
    >
      <div
        style="
          padding: 10px;
          display: flex;
          align-items: center;
          width: 260px;
          justify-content: center;
          position: relative;
        "
      >
        <div style="padding-top:10px;" class="canvas"></div>
        <div
          style="
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          "
        >
          <img src="../assets/svg/logo.svg" alt="" />
        </div>
      </div>
      <div class="fon24 padB10" style="padding-bottom: 10px; font-weight:700; font-size: 14px">
        {{ ewmArr.userName }}
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
    console.log(this.ewmArr);
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

<style lang="scss" scoped>
.ewmParents {
  background: #ffffff;
  border: 1px solid #d1d6e2;
  .canvasMes {
    position: relative;

    padding: 10px;
  }
  .imgLogo {
    position: absolute;
  }
}
</style>