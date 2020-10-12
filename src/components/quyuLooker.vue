/*eslint-disable */
<template>
  <div>
    <div
      class="zicankuwie"
      :style="{
        width: quyuDatas.warehouseAdmin.wareAreaWidth
          ? quyuDatas.warehouseAdmin.wareAreaWidth * (10000 / 85) + 'px'
          : '1000px',
        height: quyuDatas.warehouseAdmin.wareAreaLength * (10000 / 85) + 'px',
      }"
    >
      <div
        class="quyuKooler"
        v-for="(item, idx) in quyuDatas.regionalManage"
        :key="idx"
        :style="getStyle(item)"
      >
        <div class="parents">
          <div class="namesBox">
            {{ item.wareAreaName }}
          </div>
          <div
            class="tansveerBox"
            :style="{
              height: item.wareAreaWidth * (10000 / 85) + 'px',
              right: -11 + 'px',
            }"
          >
            <div
              class="transverseLine displayalign"
              :style="{
                height: item.wareAreaWidth * (10000 / 85) + 'px',
              }"
            >
              {{ item.wareAreaWidth }}m
            </div>
          </div>
          <div
            class="verticalBox"
            :style="{
              width: item.wareAreaLength * (10000 / 85) + 'px',
              bottom: -11 + 'px',
              'text-indent': 10 + 'px',
            }"
          >
            <div
              class="verticalLine displayCenter"
              :style="{
                width: item.wareAreaLength * (10000 / 85) + 'px',
                'text-indent': 10 + 'px',
              }"
            >
              <span style="margin-top: 15px"> {{ item.wareAreaLength }}m </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
/**
 *  wareAreaWidth: 1,
    wareAreaLength: 1,
    x: 0,
    y: 0,
    wareAreaName: "test1",
*/
import { getMarginConversion, getzicanParent } from "../utils/validate";
export default {
  props: {
    quyuDatas: Object,
  },
  methods: {
    getStyle(item) {
      return getMarginConversion(item);
    },
    getzicank() {
      console.log(quyuDatas.warehouseAdmin);
      return getzicanParent(quyuDatas.warehouseAdmin);
    },
  },
};
</script>

<style scoped>
.zicankuwie {
  position: relative;
  background: #f8f8f8;
}
.parents {
  position: relative;
  width: 100%;
  height: 100%;
}
.namesBox,
.tansveerBox,
.verticalBox {
  position: absolute;
}
.namesBox {
  left: 50%;
  transform: translate(-50%);
}
.quyuKooler {
  background: #d8dce7;
  user-select: none;
}
.wareAreaNameS {
  position: relative;
}
</style>