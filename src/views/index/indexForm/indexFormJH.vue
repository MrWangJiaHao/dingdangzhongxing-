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
      tableData: [],
    };
  },
};
</script>

<style scoped>
</style>