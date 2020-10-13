<template>
  <div ref="childSelect" class="displayCenter choiceSelectBox">
    <div class="headerBox">
      <div class="closeTitle">选择产品</div>
      <div class="closeIcon" @click="closeBtn"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeBtn() {
      this.$parent._data.addChanpins = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.headerBox {
  width: 100%;
  height: 50px;
  border-radius: 3px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  background: rgb(236, 241, 247);
  border-bottom: 1px solid #d1d6e2;
}
</style>