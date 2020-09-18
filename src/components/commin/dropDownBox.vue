<template>
  <div class="dropDownBox">
    <div class="titleBox">{{title}}</div>
    <div class="input_box">
      <el-select
        v-model="select"
        slot="prepend"
        :disabled="dropDowBox.disabled"
        @input="selectShow"
        placeholder="请选择"
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
    this.dropDowBox.disabled = this.dropDowBox.disabled
      ? this.dropDowBox.disabled
      : false;
    this.title = isMaoHao(this.dropDowBox.title);
  },
  methods: {
    selectShow(e) {
      console.log(e, this.dropDowBox.dropDownBoxData[e]);
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
    width: 362px;
    height: 34px;
    background: #ffffff;
    border: 1px solid #d1d6e2;
    border-radius: 4px;
  }
}
</style>