<template>
  <div>
    <div class="inline mr11 mb16">
      <div class="displayalign">
        <div class="mr20 displayalign">
          <div style="margin-right: 10px">
            <searchBox
              @changeInputs="changereplenishOrderNo"
              :searchCenter="buhuodanhaoJson"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBox from "../commin/searvhBoxs"; //下拉框

export default {
  props: {
    buhuodanhaoJson: {
      type: Object,
      default: () => {
        return {
          placeholder: "",
          title: "",
          input: "",
        };
      },
    },
  },
  components: {
    searchBox,
  },
  methods: {
    changereplenishOrderNo(e) {
      this.$emit("changereplenishOrderNo", e);
    },
    clearInput() {
      this.buhuodanhaoJson.input = "";
    },
  },
};
</script>

<style lang='scss' scoped>
</style>