<template>
  <div class="Colord1d6e2 mt20">
    <div class="clearfix">
      <div class="setTitle fl mb16">{{ chanpinminxiJson.title }}</div>
      <div class="tr fr mb16">
        <slot name="anniuBtns"></slot>
      </div>
    </div>
    <div>
      <tableCommin
        :tableDataJson="chanpinminxiJson.tableDataJsonAndArr"
        @tableSelectArr="tableSelectArrs"
      >
        <template name="searchBox">
          <input type="text" placeholder="asdsa" />
        </template>
        <template name="dropDownXiala">
          <input type="text" placeholder="asdsa" />
        </template>
      </tableCommin>
    </div>
  </div>
</template>
  
<script>
import tableCommin from "./tableCommin";
export default {
  components: {
    tableCommin,
  },
  props: {
    chanpinminxiJson: {
      type: Object,
      default: () => {
        return {
          title: "",
        };
      },
    },
  },
  methods: {
    tableSelectArrs(e) {
      this.$emit("tableSelectArrs", e);
    },
  },
};
</script>

<style>
</style>