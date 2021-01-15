<template>
  <div class="setUserIngBox" id="moveBox">
    <div
      class="setUserIngBoxCenter"
      :style="{
        maxWidth: width ? isPX(width) : '1000px',
        minHeight: minHeight ? isPX(minHeight) : '700px',
        maxHeight: maxHeight ? isPX(maxHeight) : '850px',
      }"
    >
      <div
        class="headerBox"
        :style="{ minWidth: width ? isPX(width) : '1000px' }"
      >
        <div class="closeTitle">
          {{ titles }}
        </div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>
      <div class="heightLine"></div>
      <div :style="{ width: isPX(width) || '1000px' }">
        <slot name="centerKuanjia"></slot>
        <slot></slot>
      </div>
      <!-- 账号信息 -->
      <div
        class="disRight btnsSure"
        :style="{ maxWidth: width ? isPX(width) : '1000px' }"
      >
        <div
          v-if="isLookerShow"
          class="quxiaoBox mb20"
          @click="closeBtn"
          @keyup.27="closeBtn"
        >
          {{ isLooker ? "返回" : "取消" }}
        </div>
        <div v-if="!isLooker" class="mr20"></div>
        <div
          v-if="print != '提交' && !isLooker"
          class="tijiaoBox mb20"
          @click="goAJAXCreate"
        >
          {{ print }}
        </div>
        <div
          class="tijiaoBox mb20"
          v-if="!isLooker && print == '提交'"
          @click="goAJAXCreate"
        >
          提交
        </div>
      </div>
      <!-- btn -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    minHeight: {
      type: String,
      default: "700px",
    },
    maxHeight: {
      type: String,
      default: "700px",
    },
    isLooker: {
      type: Boolean,
      default: false,
    },
    titles: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    top: {
      type: String,
      default: "144px",
    },
    print: {
      type: String,
      default: "提交",
    },
    isLookerShow: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    isPX(mes) {
      return mes.includes("px") ? mes : mes + "px";
    },
    closeBtn() {
      this.$emit("closeBtn", false);
    },
    goAJAXCreate() {
      this.$emit("clickSubmit", false);
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";

.btnsSure {
  position: absolute;
  bottom: 0px;
  z-index: 100;
  border-top: 1px solid #d1d6e2;
}

.setUserIngBox {
  position: relative;
  overflow: hidden;

  .headerBox {
    height: 50px;
    border-radius: 3px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 100;
    justify-content: space-between;
    background: rgb(236, 241, 247);
    border-bottom: 1px solid #d1d6e2;
  }

  .heightLine {
    height: 50px;
  }

  .setUserIngBoxCenter {
    min-height: 560px;
    max-height: 600px;
    overflow: auto;
    background-color: #fff;
    padding-bottom: 54px;

    .centerBox {
      padding: 30px 20px;
    }

    .setTitle {
      margin-bottom: 18px;
    }

    .gerxinxiBox {
      display: flex;
      flex-direction: column;

      > div {
        margin-bottom: 18px;
      }

      .xinxiBitian {
        display: flex;
        align-items: center;

        > div {
          margin-right: 20px;
        }
      }
    }

    .cityBoxCenter {
      display: flex;
      align-items: center;
    }
  }

  .textAreaBox {
    font-size: 14px;
    width: 72%;
    height: 40px;
    margin-left: 80px;

    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
    }

    margin-bottom: 30px;
  }

  .bzTetxArea {
    font-size: 14px;
    width: 72%;
    height: 80px;

    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 30px;
      overflow: hidden;
    }
  }

  .quxiaoBox {
    border: 1px solid rgb(209, 214, 226);
    @include BtnFunction();
    background: #fff;
  }

  .tijiaoBox {
    @include BtnFunction("success");
  }
}

.btnsSure {
  width: 100%;
  height: 74px;
  background: #fff;
  padding-top: 20px;
  padding-right: 20px;
}
</style>