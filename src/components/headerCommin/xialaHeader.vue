<template>
  <div>
    <div class="inline mr11 mb16">
      <div class="displayalign">
        <div class="noneIconTitle mr11">{{ xialaJson.title }}:</div>
        <div class="mr20 displayalign">
          <dropDownXiala
            :w320="xialaJson.w320"
            :dropDowBox="xialaJson.wieTuoGonShiJson"
            @cliclInput="weiTuoGonShiClick"
            @getDropDownData="weiTuoGonShiInput"
            :drop="xialaJson.drop"
          />
        </div>
      </div>
    </div>
    <!-- 补货开始时间 -->
  </div>
</template>

<script>
import dropDownXiala from "../commin/dropDownXiala"; //下拉框
export default {
  props: {
    xialaJson: {
      type: Object,
      default: () => {
        return {
          title: "",
          wieTuoGonShiJson: {},
          drop: "",
          w320: "w160",
        };
      },
    },
  },
  components: {
    dropDownXiala,
  },
  methods: {
    weiTuoGonShiClick() {
      this.$emit("weiTuoGonShiClick", undefined);
    },
    weiTuoGonShiInput(e) {
      this.$emit("weiTuoGonShiClick", e);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>