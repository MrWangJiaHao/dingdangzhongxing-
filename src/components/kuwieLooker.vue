<template>
  <div class="quyuKooler">
    <div class="kuweituBox" :style="getzicanParent(kuwieLookerDataJson.quyu)">
      <div v-for="(item, idx) in kuwieLookerDataJson.kuwie" :key="idx">
        <div class="displayalign diyipaidechanshu">
          <div class="paishu displayalign ellipsis">
            {{ getdaxieShuZi(idx) }}排
          </div>
          <div v-for="(zuS, idx) in item.groups" :key="idx" class="center-box">
            <div class="disinb">
              <div class="border" v-for="Nums in 9" :key="Nums">
                {{ "0" + Nums }}
              </div>
            </div>
            <div
              v-if="zuS.shelfDist"
              class="disinb verticalLine tc"
              :style="{
                width: zuS.shelfDist * (10000 / 85) + 'px',
              }"
            >
              {{ zuS.shelfDist }}m
            </div>
            <!-- 组与组之间的距离 -->
            <div class="disinb">
              <div class="border displayCenter" v-for="Nums in 9" :key="Nums">
                {{ "0" + Nums }}
              </div>
            </div>
          </div>
        </div>
        <!-- 排 -->
        <div
          v-if="item.rowDist && kuwieLookerDataJson.kuwie.length != 1"
          class="transverseLine juliLineShu"
          :style="{
            height: item.rowDist * (10000 / 85) + 'px',
            lineHeight: item.rowDist * (10000 / 85) + 'px',
            marginLeft: 28 + 30 + 14 - 4 + 'px',
          }"
        >
          {{ item.rowDist }}m
        </div>
        <!-- 排与排之间的距离 -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
import { getzicanParent, isNums } from "../utils/validate";
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
    getdaxieShuZi(num) {
      return isNums(num);
    },
  },
};
</script>

<style scoped>
.paishu {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #599af4;
  line-height: 10px;
  padding-right: 30px;
}
.kuweituBox {
  position: relative;
}
.quyuKooler {
  background: #f8f8f8;
}
.disinb .border:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.disinb .border:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-color: #000;
}
</style>