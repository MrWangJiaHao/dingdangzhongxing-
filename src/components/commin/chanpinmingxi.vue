<template>
  <div class="pd20">
    <div class="setTitle mb16">{{ chanpinminxiJson.title }}</div>
    <div class="tr mb16">
      <slot name="anniuBtns"></slot>
    </div>
    <div>
      <tableCommin :tableDataJson="chanpinminxiJson.tableDataJsonAndArr">
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
};
</script>

<style>
</style>