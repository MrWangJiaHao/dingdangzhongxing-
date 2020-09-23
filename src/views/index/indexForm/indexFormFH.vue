<template>
  <div>
    <IndexForm :tableData="tableData"></IndexForm>
  </div>
</template>

<script>
import IndexForm from "../../../components/indexForm";
export default {
  components: {
    IndexForm,
  },
  data() {
    return {
      tableData: [
        {
          role: "复核人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.0,
          effAver: 0.06,
          errAver: 1.0,
        },
        {
          role: "复核人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.0,
          effAver: 0.06,
          errAver: 1.0,
        },
        {
          role: "复核人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.0,
          effAver: 0.06,
          errAver: 1.0,
        },
        {
          role: "复核人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.0,
          effAver: 0.06,
          errAver: 1.0,
        },
        {
          role: "复核人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.0,
          effAver: 0.06,
          errAver: 1.0,
        },
        {
          role: "复核人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.0,
          effAver: 0.06,
          errAver: 1.0,
        },
        {
          role: "复核人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.0,
          effAver: 0.06,
          errAver: 1.0,
        },
        {
          role: "复核人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.0,
          effAver: 0.06,
          errAver: 1.0,
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>