<template>
  <div class="quyuKooler">
    <div class="kuweituBox" :style="getzicanParent(kuwieLookerDataJson.quyu)">
      <div v-for="(item, idx) in kuwieLookerDataJson.kwwei" :key="idx"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
import { getzicanParent } from "../utils/validate";
export default {
  props: {
    kuwieLookerDataJson: Object,
  },
  created() {
    console.log(this.kuwieLookerDataJson);
  },
  methods: {
    getzicanParent(item) {
      return getzicanParent(item);
    },
  },
};
</script>

<style scoped>
.kuweituBox {
  position: relative;
}
.quyuKooler {
  background: #f8f8f8;
}
</style>