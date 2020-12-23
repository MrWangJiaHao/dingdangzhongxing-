<template>
  <div>
    <el-table
      style="overflow-y: auto"
      :data="tableDataJson.tabledata"
      ref="multipleTable"
      tooltip-effect="dark"
      border
      @row-click="handleRowClick"
      @filter-change="filterHandler"
      @selection-change="handleSelectionChange"
    >
      <template v-for="(tableItem, tableIdx) in tableDataJson.typeData">
        <el-table-column
          v-if="tableItem.types == 'selection'"
          :key="tableIdx"
          type="selection"
          :align="tableItem.align || 'center'"
          :label="tableItem.label"
        />
        <el-table-column
          v-else-if="tableItem.types == 'index'"
          :key="tableIdx"
          :align="tableItem.align || 'center'"
          type="index"
          :label="tableItem.label"
          :width="tableItem.width"
        />
        <el-table-column
          v-else-if="tableItem.flag"
          :key="tableIdx"
          :type="tableItem.types"
          :label="tableItem.label"
          :width="tableItem.width"
          :align="tableItem.align || 'left'"
        >
          <span slot-scope="scoped">
            <div v-if="tableItem.flag == 'input'">
              <input
                :type="tableItem.inputType ? tableItem.inputType : 'text'"
                class="input"
                v-model="scoped.row[tableItem.drop]"
                :placeholder="tableItem.placeholder"
                @blur="tableItem.OnBlur(scoped.$index, scoped.row) || ''"
              />
            </div>
            <div v-else-if="tableItem.flag == 'xiala'">
              <dropDownXiala
                style="height: 28px"
                :dropDowBox="tableItem.dropDowBox"
                :drop="tableItem.drop"
                :select="scoped.row.drop"
                @getDropDownData="tableItem.getDropDownData"
                @cliclInput="tableItem.cliclInput(scoped.row, scoped.$index)"
              ></dropDownXiala>
            </div>
            <div v-else-if="tableItem.flag == 'date'">
              <dateTime
                :dateTimeData="tableItem.dateTimeData"
                @getDateTime="tableItem.getDateTime"
                style="height: 28px"
              />
            </div>
            <div
              v-else-if="tableItem.flag == 'puton'"
              class="lookDeatil"
              @click="tableItem.OnClicks(scoped.row)"
            >
              {{ scoped.row[tableItem.types] }}
            </div>
            <div v-else>再加一个判断 {{ tableItem.flag }}</div>
          </span>
        </el-table-column>
        <el-table-column
          v-else
          :label="tableItem.label"
          :type="tableItem.types"
          :width="tableItem.width"
          :key="tableIdx"
        >
          <span slot-scope="scope">
            <ex-slot
              v-if="tableItem.render"
              :row="scope.row"
              :index="scope.$index"
              :render="tableItem.render"
              :column="tableItem"
            >
              {{ scope.row[tableItem.types] || "1" }}
            </ex-slot>
            <span v-else>
              {{ scope.row[tableItem.types] || "———" }}
            </span>
          </span>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import dateTime from "../commin/dateTime";
import dropDownXiala from "../commin/dropDownXiala";
var exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index,
    };
    if (data.props.column) params.column = data.props.column;
    return data.props.render(h, params);
  },
};
export default {
  name: "comp-table",
  components: { exSlot, dateTime, dropDownXiala },

  props: {
    tableDataJson: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      multipute: [],
    };
  },
  methods: {
    handleSelectionChange(e) {
      this.multipute = e;
      this.$emit("tableSelectArr", this.multipute);
    },
    // 某一行被点击
    handleRowClick(row) {
      this.$emit("click-events", row);
    },
    filterHandler(filters) {
      this.$emit("filter-events", filters);
    },
  },
};
</script>

<style lang='scss' scoped >
.input {
  border: 1px solid #d2d6e2;
  height: 28px;
  text-indent: 10px;
  color: #333333;
  font-size: 14px;
  font-weight: normal;
  background: rgba(236, 241, 247, 0);
  border-radius: 2px;
}
</style>