<template>
  <div class="searchBox">
    <div v-if="title!==''" class="titleBox">{{title}}</div>
    <div>
      <el-input
        :placeholder="searchCenter.placeholder"
        v-model="input"
        @blur="searchData"
        clearable
        :disabled="searchCenter.disabled"
        @input="changerInputs"
      ></el-input>
    </div>
  </div>
</template>

<script>
// @getSearchCenterShuJu="getOne"
import { isMaoHao } from "../../utils/validate";

export default {
  props: {
    searchCenter: Object,
  },
  data() {
    return {
      input: "",
      title: "",
    };
  },
  created() {
    if (this.searchCenter.title) {
      this.searchCenter.disabled = this.searchCenter.disabled
        ? this.searchCenter.disabled
        : false;
      this.title = isMaoHao(this.searchCenter.title);
    }
  },
  methods: {
    searchData() {
      this.$emit("getSearchCenterShuJu", this.input);
      this.$emit("clearInput", this.clearInput);
    },
    changerInputs(e) {
      this.$emit("getChangeInput", e);
    },
    clearInput() {
      this.input = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.searchBox {
  display: flex;
  height: 36px;
  .titleBox {
    line-height: 36px;
    margin-right: 11px;
  }
}
</style>