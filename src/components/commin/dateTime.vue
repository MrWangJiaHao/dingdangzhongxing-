<template>
  <div class="dateTimeBox displayalign">
    <div v-if="title !== ''" class="titleBox">{{ title }}</div>
    <div>
      <Date-picker
        type="datetime"
        :placeholder="dateTimeData.placeholder"
        @on-change="changeDate"
        @on-open-change="openChangeDate"
        @on-ok="openChangeDate"
        ref='time'
      ></Date-picker>
    </div>
  </div>
</template>
<style >
.ivu-input {
  height: 40px;
  padding: 0 30px 0 15px;
  font-size: 15px;
}
</style>
<script>
import { isMaoHao } from "../../utils/validate";
import { mapState } from "vuex";
export default {
  props: {
    dateTimeData: Object,
  },
  computed: {
    ...mapState(["systemTime"]),
  },
  data() {
    return {
      title: "",
      date: "",
    };
  },
  watch: {
    systemTime(n) {
      if (n) {
        this.date = "";
      }
      console.log(n, "是否发生了变化");
    },
  },
  created() {
    if (this.dateTimeData.title) {
      this.title = isMaoHao(this.dateTimeData.title);
    }
  },
  methods: {
    changeDate(e) {
      this.date = e;
    },
    openChangeDate(e) {
      if (!e) {
        this.$emit("getDateTime", this.date);
      }
      // this.$refs.element.handleClear();
    },
    clear() {
      this.$refs.time.handleClear()
    }
  },
};
</script>

<style lang='scss'>
.ivu-input-suffix {
  display: flex;
  align-items: center;
  .ivu-icon {
    width: 25px;
    height: 25px;
    background: url(../../assets/img/icon_calendar.png) center center no-repeat;
    background-size: cover;
    &::before {
      content: "";
    }
  }
}
</style>

<style lang='scss' scoped>
.dateTimeBox {
  display: flex;
  align-items: center;
  .titleBox {
    margin-right: 11px;
  }
}
</style>