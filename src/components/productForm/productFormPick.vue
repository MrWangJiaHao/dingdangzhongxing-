<template>
  <div class="inputInTable">
    <div class="tableBox tableInInput">
      <el-table
        :data="inforData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :stripe="true"
        tooltip-effect="dark"
        max-height="300"
      >
        <el-table-column type="selection" width="82" align="center" fixed="left">
        </el-table-column>
        <el-table-column label="序号" align="center" type="index" width="71">
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
        <el-table-column
          prop="storeUnit"
          label="库位存放体积(m³)"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="prodUnit" label="存放单位" align="center">
          <el-select
            slot-scope="scope"
            v-model="scope.row.prodUnit"
            placeholder="请选择单位"
            @change="prodUnits"
          >
            <el-option
              v-for="item in prodUnitData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-table-column>
        <el-table-column
          prop="MaxNumberInput"
          label="最大存放数"
          align="center"
        >
          <el-input
            slot-scope="scope"
            v-model="scope.row.MaxNumberInput"
          ></el-input>
        </el-table-column>
        <el-table-column prop="repleNum" label="补货预警值" align="center">
          <el-input slot-scope="scope" v-model="scope.row.repleNum"></el-input>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "aaa",
  props: {
    inforData: Array,
  },
  data() {
    return {
      multipleSelection: [],
      prodUnitData: [
        {
          value: "箱",
          label: "箱",
        },
        {
          value: "个",
          label: "个",
        },
      ],
      MaxNumberInput: "",
      prodUnit: "",
      pagingQueryData: {
        //分页查询
        pageNumber: 1,
        pageSize: 3,
        paras: {},
      },
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 0, //一共多少条 //默认一页10条
      },
      emptyArr: [],
    };
  },
  methods: {
    prodUnits(value) {
      this.prodUnit = value;
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
      this.$store.dispatch("PFSRequestAct1", value);
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