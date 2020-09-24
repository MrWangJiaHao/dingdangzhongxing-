<template>
  <div class="indexForm">
    <el-table :data="tableData" border max-height="380" style="width: 100%">
      <el-table-column prop="role" label="角色" width="154" height="62"></el-table-column>
      <el-table-column prop="person" label="人员" width="160"></el-table-column>
      <el-table-column prop="pickNumber" label="拣货数量(单)" width="160"></el-table-column>
      <el-table-column prop="pickError" label="拣货错误" width="166"></el-table-column>
      <el-table-column prop="consumeTime" label="耗时(min)" width="164"></el-table-column>
      <el-table-column prop="efficiency" label="效率(min/单)" width="157"></el-table-column>
      <el-table-column prop="errorRate" label="出错率(%)" width="154"></el-table-column>
      <el-table-column prop="effAver" label="过往效率平均值(min/单)" width="154"></el-table-column>
      <el-table-column prop="errAver" label="过往出错率平均值(%)" width="150"></el-table-column>
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
.indexForm .has-gutter tr th {
  background: #e1eaf5;
  text-align: center;
}
</style>