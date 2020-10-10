<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :stripe="true"
      tooltip-effect="dark"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" align="center" type="index" width="55">
      </el-table-column>
      <el-table-column prop="CWName" label="子仓" align="center">
      </el-table-column>
      <el-table-column prop="areaName" label="区域" align="center">
      </el-table-column>
      <el-table-column prop="shelfName" label="货架" align="center">
      </el-table-column>
      <el-table-column prop="tierChoose" label="层" align="center">
      </el-table-column>
      <el-table-column
        prop="storageLocalChoose"
        label="库位"
        align="center"
      ></el-table-column>
      <el-table-column prop="storeUnit" label="库位存放体积(m³)" align="center">
      </el-table-column>
      <el-table-column
        prop="maxNumber"
        label="最大存放数"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="maxNumber"
        label="最大存放数"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      pagingQueryData: {
        //分页查询
        pageNumber: 1,
        pageSize: 3,
        paras: {
         
        },
      },
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 0, //一共多少条 //默认一页10条
      },
    };
  },
  methods: {
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.pagingQueryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data); //用来改变分页器的条数
    },
    //用来改变分页器的条数
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
  },
};
</script>

<style scoped lang="scss">
</style>