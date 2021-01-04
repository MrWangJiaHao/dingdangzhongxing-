<template>
    <el-table
            style="overflow-y: auto"
            :data="tableDataJson.tabledata"
            ref="multipleTable"
            tooltip-effect="dark"
            :stripe="true"
            :border="true"
            @row-click="handleRowClick"
            @filter-change="filterHandler"
            @selection-change="handleSelectionChange"
    >
        <template v-for="(tableItem, tableIdx) in tableDataJson.typeData">
            <el-table-column
                    v-if="tableItem.types == 'selection'"
                    :key="tableIdx"
                    type="selection"
                    fixed="left"
                    width="82"
                    :align="tableItem.align || 'center'"
                    :label="tableItem.label"
                    show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
                    v-else-if="tableItem.types == 'index'"
                    :key="tableIdx"
                    :align="tableItem.align || 'center'"
                    type="index"
                    :label="tableItem.label"
                    :width="tableItem.width"
                    show-overflow-tooltip
            />
            <el-table-column v-else-if="tableItem.types == 'expand'"
                             :key="tableIdx"
                             type="expand"
                             :align="tableItem.align || 'center'"
                             :label="tableItem.label"
                             :width="tableItem.width || 100"
                             show-overflow-tooltip>
                <div slot-scope="scoped">
                    <slot :data="scoped.row"></slot>
                </div>
            </el-table-column>
            <el-table-column
                    v-else-if="tableItem.flag"
                    :key="tableIdx"
                    :type="tableItem.types"
                    :label="tableItem.label"
                    :width="tableItem.width"
                    show-overflow-tooltip
                    :align="tableItem.align?tableItem.align:'left' "
            >
          <span slot-scope="scoped">
            <div v-if="tableItem.flag == 'input'">
              <input
                      :type="tableItem.inputType ? tableItem.inputType : 'text'"
                      class="input"
                      :class="tableItem.disabled?'is-disableds':''"
                      v-model="scoped.row[tableItem.drop]"
                      :placeholder="tableItem.placeholder"
                      :disabled="tableItem.disabled"
                      @blur="tableItem.OnBlur(scoped.$index, scoped.row) || ''"
              />
                <slot name="input"></slot>
            </div>
            <div v-else-if="tableItem.flag == 'xiala'">
              <slot name="xiala"></slot>
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
              <slot name="date"></slot>
              <dateTime
                      :width="tableItem.w320?tableItem.w320:'220'"
                      :dateTimeData="tableItem.dateTimeData"
                      :valueDataStart="scoped.row[tableItem.drop]"
                      @getDateTime="tableItem.getDateTime"
              />
            </div>
            <div
                    v-else-if="tableItem.flag == 'puton'"
                    class="lookDeatil"
                    @click="tableItem.OnClicks(scoped.row)"
            >
              <slot name="puton"></slot>
              {{ scoped.row[tableItem.types] }}
            </div>
            <div v-else-if="tableItem.flag=='radio'">
                    <div class="weiduBox inline mr7"
                         :class="!scoped.row[tableItem.types]?'weiduClick':'yiduClick'"></div>
                    <div class="inline">{{!scoped.row[tableItem.types]?' 未读':'已读' }}</div>
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
                    :align="tableItem.align?tableItem.align:'left'"
                    show-overflow-tooltip
            >
          <span slot-scope="scope">
            <ex-slot
                    v-if="tableItem.render"
                    :row="scope.row"
                    :index="scope.$index"
                    :render="tableItem.render"
                    :align="tableItem.align?tableItem.align:'left'"
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
        components: {exSlot, dateTime, dropDownXiala},
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
                multipute: []
            };
        },
        methods: {
            handleSelectionChange(e) {
                this.multipute = e;
                this.$emit("tableSelectArr", this.multipute);
            },
            // 某一行被点击
            handleRowClick(row) {
                this.$emit("clickEvents", row);
            },
            filterHandler(filters) {
                this.$emit("filterEvents", filters);
            },
        },
    };
</script>

<style lang='scss' scoped>
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

    #app .is-disableds {
        background-color: #f3f3f3;
        opacity: 1;
        cursor: not-allowed;
        color: #ccc;
    }

    .weiduBox {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }

    .weiduClick {
        background: #5DBB2E;
    }

    .yiduClick {
        background: #BEBEBE;
    }
</style>