<template>
  <div class="searchBox">
    <div class="titleBox ellipsis">备注:</div>
    <textarea
      style="height: 80px"
      :placeholder="searchCenter.placeholder"
      v-model="textareaCenter"
      @blur="searchData"
      clearable
      :disabled="searchCenter.disabled"
      @input="changerInputs"
      maxlength="200"
    ></textarea>
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
    textareaCenter: {
      type: String,
      default: "",
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
  .titleBox {
    margin-right: 11px;
  }
}
</style>