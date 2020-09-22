<template>
  <el-table :data="tableData" height="318" border style="width: 100%">
    <el-table-column prop="role" label="角色" width="154"></el-table-column>
    <el-table-column prop="person" label="人员" width="154"></el-table-column>
    <el-table-column prop="pickNumber" label="拣货数量(单)" width="154"></el-table-column>
    <el-table-column prop="pickError" label="拣货错误" width="154"></el-table-column>
    <el-table-column prop="consumeTime" label="耗时(min)" width="154"></el-table-column>
    <el-table-column prop="efficiency" label="效率(min/单)" width="154"></el-table-column>
    <el-table-column prop="errorRate" label="出错率(%)" width="154"></el-table-column>
    <el-table-column prop="effAver" label="过往效率平均值(min/单)" width="154"></el-table-column>
    <el-table-column prop="errAver" label="过往出错率平均值(%)" width="154"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          role: "拣货人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.00,
          effAver: 0.06,
          errAver: 1.00,
        },
        {
          role: "拣货人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.00,
          effAver: 0.06,
          errAver: 1.00,
        },
        {
          role: "拣货人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.00,
          effAver: 0.06,
          errAver: 1.00,
        },
        {
          role: "拣货人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.00,
          effAver: 0.06,
          errAver: 1.00,
        },
        {
          role: "拣货人员",
          person: "张三",
          pickNumber: 1000,
          pickError: 10,
          consumeTime: 60,
          efficiency: 0.06,
          errorRate: 1.00,
          effAver: 0.06,
          errAver: 1.00,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">

</style>