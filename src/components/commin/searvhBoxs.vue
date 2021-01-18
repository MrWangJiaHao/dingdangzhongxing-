<template>
  <div class="searchBox">
    <div v-if="title !== ''" class="titleBox nowrap">{{ title }}</div>
    <div>
      <el-input
        :class="searchCenter.w320 "
        :placeholder="searchCenter.placeholder"
        v-model="searchCenter.input"
        @blur="searchData"
        clearable
        :disabled="searchCenter.disabled"
        @input="changerInputs"
      ></el-input>
    </div>
  </div>
</template>

<script>
import { isMaoHao } from "../../utils/validate";

export default {
  props: {
    searchCenter: {
      type: Object,
      default: () => {
        return {
          searchCenter: false,
          input: "",
        };
      },
    },
  
  },
  data() {
    return {
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
    },
    changerInputs(e) {
      this.$emit("getChangeInput", e);
      this.$emit("changeInputs", this.searchCenter.input);
    },
  },
};
</script>

<style lang="scss" scoped>
.searchBox {
  display: flex;
  height: 36px;
  align-items: center;

  .titleBox {
    line-height: 36px;
    margin-right: 11px;
  }
}
</style>