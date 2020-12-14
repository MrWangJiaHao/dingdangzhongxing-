<template>
  <div>
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
          prop="reCheckOrderCount"
          label="复核数量(单)"
          align="center"
          min-width="110"
          sortable
        ></el-table-column>
        <el-table-column
          prop="reCheckTimeCount"
          label="耗时(min)"
          align="center"
          min-width="100"
          sortable
        ></el-table-column>
        <el-table-column
          prop="efficiency"
          label="效率(min/单)"
          align="center"
          min-width="110"
          sortable
        ></el-table-column>
        <el-table-column
          prop="effAver"
          label="过往效率平均值(min/单)"
          align="center"
          min-width="180"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
};
</script>

<style scoped>
</style>