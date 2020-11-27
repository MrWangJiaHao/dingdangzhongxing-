<template>
  <div>
    <el-table
      style="height: 220px; overflow-y: auto"
      :data="tableDataJson.tabledata"
      ref="multipleTable"
      tooltip-effect="dark"
      border
      @selection-change="handleSelectionChange"
    >
      <template v-for="(tableItem, tableIdx) in tableDataJson.typeData">
        <el-table-column
          v-if="tableItem.types == 'selection'"
          :key="tableIdx"
          type="selection"
          :label="tableItem.label"
        />
        <el-table-column
          v-else-if="tableItem.types == 'index'"
          :key="tableIdx"
          type="index"
          :label="tableItem.label"
          :width="tableItem.width"
        />
        <el-table-column
          v-else
          :label="tableItem.label"
          :type="tableItem.types"
          :width="tableItem.width"
          :key="tableIdx"
        >
          <span slot-scope="scope">
            <div v-if="tableItem.searchBox">
              <slot name="searchBox"></slot>
            </div>
            <div v-else-if="tableItem.dropDownXiala">
              <slot name="dropDownXiala"></slot>
            </div>
            <span v-else>
              {{ scope.row[tableItem.types] }}
            </span>
          </span>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableDataJson: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    handleSelectionChange(e) {
      this.$emit("tableSelectArr", e);
    },
  },
};
</script>

<style>
</style>