<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox">
        <div class="closeTitle">
          {{ editSavaRecord ? "编辑发货规则" : "创建发货规则" }}
        </div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>
      <div style="margin: 20px">
        <div class="displayalign">
          <div class="mr20">
            发货规则
            <span style="color: red">*</span>
          </div>
          <div>
            <el-input placeholder="请输入发货规则" maxlength="20"> </el-input>
          </div>
        </div>
      </div>
      <!-- 账号信息 -->
      <div class="displayCenter mb20">
        <div class="quxiaoBox mb20 mr20" @click="closeBtn">取消</div>
        <div class="tijiaoBox mb20" @click="goAJAXCreate">提交</div>
      </div>
      <!-- btn -->
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import { getCookie } from "../../utils/validate";
import {} from "../../api/api";
export default {
  name: "createUsering",
  components: {},
  data() {
    return {
      sendDataJson: {
        id: "", //发货规则id

        orderNum: "", //订单合并数量

        orderSource: "", //订单来源合并规则

        orgIds: [], //发货规则应用委托公司id集合

        prodMeger: 0, //订单产品重合度集计(按照订单中商品交集最大数集计)

        prodNum: 0, // 订单中产品种类大于x的订单，分出单独发货

        wareId: getCookie("X-Auth-wareId"),

        prodTypeNum: 0, //订单中产品种类只有一种

        ruleName: "", //发货规则名称
      },
    };
  },
  props: {
    editSavaRecord: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  methods: {
    closeBtn() {
      this.$emit("closeBtns", false);
    },
    //点击了提交
    goAJAXCreate() {},
  },
};
</script>

<style lang='scss' scoped>
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
    position: relative;
    left: 50%;
    top: 144px;
    transform: translateX(-50%);
    background: #fff;
    width: 1000px;
  }

  .quxiaoBox {
    @include BtnFunction("error");
  }

  .tijiaoBox {
    @include BtnFunction("success");
  }
}
</style>
