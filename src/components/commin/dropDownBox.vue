<template>
  <div class="dropDownBox">
    <div v-if="title!==''" class="titleBox">{{title}}</div>
    <div class="input_box">
      <el-select
        v-model="select"
        slot="prepend"
        :disabled="dropDowBox.disabled"
        @input="selectShow"
        :placeholder="dropDowBox.placeholder"
      >
        <el-option
          v-for="(item,idx) in dropDowBox.dropDownBoxData"
          :key="idx"
          :label="item"
          :value="idx"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { isMaoHao } from "../../utils/validate";
/*eslint-disable */
export default {
  props: {
    dropDowBox: Object,
  },
  data() {
    return {
      select: "",
      title: "",
      disable: false,
    };
  },
  created() {
    if (this.dropDowBox.title) {
      this.dropDowBox.disabled = this.dropDowBox.disabled
        ? this.dropDowBox.disabled
        : false;
      this.title = isMaoHao(this.dropDowBox.title);
    }
  },
  methods: {
    selectShow(e) {
      this.$emit("getDropDownData", this.dropDowBox.dropDownBoxData[e]);
    },
  },
  computed: {},
};
</script>
<style >
.el-select {
  width: 100%;
  height: 100%;
}
.titleBox {
  margin-right: 11px;
}
</style>
<style lang='scss' scoped>
.dropDownBox {
  display: flex;
  align-items: center;
  height: 34px;
  .titleBox {
    font-size: 14px;
    font-family: Hiragino Sans GB;
    font-weight: normal;
    color: #454545;
    margin-right: 11px;
  }
  .input_box {
    height: 34px;
    background: #ffffff;
    border: 1px solid #d1d6e2;
    border-radius: 4px;
  }
}
</style>