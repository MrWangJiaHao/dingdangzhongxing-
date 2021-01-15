<template>
  <div class="setUserIngBox">
    <kuanjiaClick
      :titles="title"
      @closeBtn="closeBtn"
      :isLookerShow="isLookerShow"
      print="打印"
      :width="width"
      :min-height="minHeight"
      @clickSubmit="printWarehouseReceipt"
    >
      <template slot="centerKuanjia">
        <div style="width: 660px">
          <div id="printCenter">
            <slot></slot>
            <slot name="printCenter"></slot>
          </div>
          <!-- 打印的内容 -->
        </div>
      </template>
    </kuanjiaClick>
  </div>
</template>

<script>
import kuanjiaClick from "../../components/commin/kuanjiaClick";

export default {
  data() {
    return {
      tableDatas: [],
      Newtime: "",
      parintBatchNumberArrs: [],
      baseurl: sessionStorage.getItem("baseUrl"),
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    isLookerShow: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String || Number,
      default: "600",
    },
    minHeight: {
      type: String || Number,
      default: "380",
    },
  },
  components: {
    kuanjiaClick,
  },
  created() {
    this._changeTime();
    let parintBatchNumberArrs = eval(
      sessionStorage.getItem("parintBatchNumberArrs")
    );
    if (parintBatchNumberArrs) {
      this.parintBatchNumberArrs = parintBatchNumberArrs;
    }
  },
  mounted() {
    this.$nextTick(() => {
      let cells = document
        .getElementById("printCenter")
        .getElementsByClassName("cell");
      let array = Array.from(cells);
      array.forEach((item) => {
        item.style = "text-align:center;";
      });
    });
  },
  methods: {
    closeBtn() {
      this.$emit("closeFn", true);
    },
    //打印
    printWarehouseReceipt() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.LODOP = this.$getLodop();
          setTimeout(() => {
            this._createEwm(this.multipleSelection);
          }, 100);
        }, 200);
      });
    },
    _createEwm() {
      this.LODOP.ADD_PRINT_HTM(
        20,
        10,
        2970,
        2100,
        document.getElementById("printCenter").innerHTML
      );
      // this.LODOP.PRINTA(); //不需要进入查看页面 直接打印
      this.LODOP.PREVIEW(); //需要进入页面查看
    },
    _changeTime() {
      this.Newtime = new Date().toLocaleString("chinese", { hour12: false });
    },
  },
};
</script>


<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

.setUserIngBox {
  .headerBox {
    height: 50px;
    border-radius: 3px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    background: rgb(236, 241, 247);
    border-bottom: 1px solid #d1d6e2;
  }

  .setUserIngBoxCenter {
    width: 800px;
    overflow-y: auto;
    max-height: 750px;

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
        flex-wrap: wrap;
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
    @include BtnFunction("error");
  }

  .tijiaoBox {
    @include BtnFunction("success");
  }
}
</style>