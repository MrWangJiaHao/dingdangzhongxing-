<template>
  <div>
    <div class="fuzzyQueryBox">
      <div class="biaogeBox">
        <slot name="biaoBoxCenter"></slot>
        <div class="btns inline btnArrs tr">
          <div class="queryBtn inline mr11 zujianBox" @click="clickQueryUser">
            查询
          </div>
          <div class="clearBtn inline" @click="clearInputAll">清空</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickQueryUser() {
      this.$emit("clickQueryUser", true);
    },
    clearInputAll() {
      this.$emit("clearInputAll", true);
    },
  },
};
</script>

<style lang='scss' scope>
@import "../../assets/scss/btn.scss";
.fuzzyQueryBox {
  padding: 20px 30px;
  overflow: hidden;
  position: relative;
  .biaogeBox {
    flex-wrap: wrap;
    align-items: center;
    display: flex;
  }
  .timeBox {
    display: flex;
    align-items: center;
  }
  .line {
    width: 20px;
    height: 2px;
    background: #fff;
    margin-right: 10px;
  }
}
.btns {
  position: absolute;
  right: 30px;
  bottom: 20px;
  .queryBtn {
    display: inline-block;
    @include BtnFunction("success");
  }
  .clearBtn {
    display: inline-block;
    @include BtnFunction();
    background: #fff;
  }
}
.line {
  width: 20px;
  height: 2px;
  background: #fff;
  margin-right: 10px;
}
</style>