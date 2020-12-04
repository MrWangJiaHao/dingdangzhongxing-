<template>
  <div></div>
</template>

<script>
/*eslint-disable */
import dropDownXiala from "../commin/dropDownXiala"; //下拉框
import searchBox from "../commin/searvhBoxs"; //下拉框
import dateTime from "../../components/commin/dateTime.vue"; //时间
export default {
  components: {
    dropDownXiala,
    searchBox,
    dateTime,
  },
  data() {
    return {
      paras: {},
    };
  },
  //   mounted() {
  //     this.$nextTick(() => {
  //       this.$isChaXun.isChaXun(document.querySelector(".btnArrs"));
  //     });
  //   },
  methods: {
    clearInters() {
      this.wieTuoGonShiJson.select = ""; //清空委托公司
      this.buhuodanhaoJson.input = ""; //清空补货单号
      this.prodNumeJson.input = ""; //清空产品名称
      this.prodCodeJson.input = ""; //清空产品名称
      this.disposeStatusJson.select = ""; //补货状态
      this.orderSourceJson.select = ""; //补货类型
      this.$refs.replenishEndTime.clear();
      this.$refs.replenishStartTime.clear();
      this.$refs.createEndTime.clear();
      this.$refs.createStartTime.clear();
      this.$emit("jobTaskClearBtn", true);
      this.$parent.getTableData();
    },
  },
};
</script>

<style lang='scss'>
</style>