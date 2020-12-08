<template>
  <div>
    <kuanjiaClick
      :titles="chuanjianJsonAndArr.title"
      @closeBtn="closeBtn"
      @clickSubmit="clickSubmit"
    >
      <template slot="centerKuanjia">
        <createMonent :chuanjianJsonAndArr="chuanjianJsonAndArr" />
        <chanpinmingxi
          :chanpinminxiJson="chanpinminxiJson"
          @tableSelectArrs="tableSelectArr"
        >
          <template slot="anniuBtns">
            <span class="goOn mr11 inline" @click="isAddcreateChanpinShow"
              >添加产品</span
            >
            <span class="lodopFunClear inline" @click="removeItem">删除</span>
          </template>
        </chanpinmingxi>
        <!-- 产品明细 -->
        <div class="pd20 mt20 mb16">
          <remarksInput
            @changeInputs="changeInputs"
            :searchCenter="searchCenter"
          />
        </div>
        <!-- 备注 -->
      </template>
    </kuanjiaClick>
    <div v-if="isAddcreateChanpin">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isAddcreateChanpin">
          <addTianjiaChanpin :sendoutJson="sendoutJson" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import kuanjiaClick from "../commin/kuanjiaClick"; //点击架子
import createMonent from "../commin/createMonent"; //创建上面
import chanpinmingxi from "../commin/chanpinmingxi"; // 产品明细
import remarksInput from "../commin/remarksInput";
import { _removeData } from "../../utils/validate";
import addTianjiaChanpin from "../goodsShiftingCommin/addTianjiaChanpin"; // 添加产品

export default {
  props: {
    chuanjianJsonAndArr: {
      type: Object,
      default: () => {
        return {};
      },
    },
    chanpinminxiJson: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    kuanjiaClick,
    createMonent,
    chanpinmingxi,
    remarksInput,
    addTianjiaChanpin,
  },
  data() {
    let self = this;
    return {
      mutitleMes: [],
      isAddcreateChanpin: false,
    };
  },
  methods: {
    //添加产品
    isAddcreateChanpinShow() {},
    tableSelectArr(e) {
      this.mutitleMes = e;
    },
    //删除
    removeItem() {
      if (!this.mutitleMes.length) return;
      _removeData(
        this.chanpinminxiJson.tableDataJsonAndArr.tabledata,
        this.mutitleMes
      );
    },
    closeBtn() {
      this.$emit("closeFn");
    },
    clickSubmit() {
      this.$emit("clickSubmit");
    },
  },
};
</script>
