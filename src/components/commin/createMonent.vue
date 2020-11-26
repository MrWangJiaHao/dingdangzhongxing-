<template>
  <div>
    <div class="centerBox">
      <div class="setTitle mb16">{{ chuanjianJsonAndArr.title }}</div>
      <!-- title -->
      <div class="dispalywrap">
        <div
          v-for="(item, idx) in chuanjianJsonAndArr.inputArr"
          :key="idx"
          class="mb16"
        >
          <div v-if="item.types == 'xiala'" class="mr11">
            <dropDownXiala :dropDowBox="item" />
          </div>
          <div v-else-if="item.types == 'search'" class="mr11">
            <searchBox :searchCenter="item" />
          </div>
          <div v-else>
            {{ "再加一个判断" + item }}
          </div>
        </div>
      </div>
      <!-- 主体 -->
    </div>
  </div>
</template>

<script>
import dropDownXiala from "./dropDownXiala";
import searchBox from "./searchBox";
export default {
  components: {
    dropDownXiala,
    searchBox,
  },
  props: {
    chuanjianJsonAndArr: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.centerBox {
  padding: 30px 20px;
}
</style>