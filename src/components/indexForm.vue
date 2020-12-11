<template>
  <div class="indexForm">
    <el-table :data="tableData" border max-height="380" style="width: 100%">
      <el-table-column
        prop="role"
        label="角色"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="person"
        label="人员"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="pickNumber"
        label="拣货数量(单)"
        align="center"
        width="110"
        min-width="110"
      ></el-table-column>
      <el-table-column
        prop="pickError"
        label="拣货错误"
        align="center"
        width="100"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="consumeTime"
        label="耗时(min)"
        align="center"
        width="100"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="efficiency"
        label="效率(min/单)"
        align="center"
        width="110"
        min-width="110"
      ></el-table-column>
      <el-table-column
        prop="errorRate"
        label="出错率(%)"
        align="center"
        width="100"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="effAver"
        label="过往效率平均值(min/单)"
        align="center"
        width="180"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="errAver"
        label="过往出错率平均值(%)"
        align="center"
        width="170"
        min-width="170"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">

</style>