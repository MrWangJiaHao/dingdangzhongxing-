<template>
  <div>
    <div
      class="ewmParents displayColom"
      style="
        width: 59.3px;
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
          justify-content: center;
        "
      >
        <div class="canvas"></div>
        <div style="position: absolute">
          <img src="../assets/svg/logo.svg" style="position: absolute" alt="" />
        </div>
      </div>
      <div class="fon24 padB10" style="padding-bottom: 10px font-size:24px;">
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
          width: 52.5,
          height: 52.5,
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