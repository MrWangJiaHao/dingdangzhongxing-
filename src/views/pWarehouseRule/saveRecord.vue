<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox">
        <div class="closeTitle">
          {{ editSavaRecord ? "编辑发货规则" : "创建发货规则" }}
        </div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>

      <div
        v-for="(item, idx) in CenterJson"
        :key="idx"
        style="margin: 20px; border-bottom: 1px solid #d1d6e2"
      >
        <div>
          <div v-if="item.title" class="setTitle">
            {{ item.title }}
          </div>
          <div v-if="item.ruleUsers">
            <div
              v-for="(items, idxs) in item.ruleUsers"
              :key="idxs"
              class="displayalign"
            >
              <div class="noneIconTitle mr20">
                {{ items.title }}
                <span v-if="items.isImportant" style="color: red">*</span>
              </div>
              <div v-if="items.placeholder">
                <el-input
                  v-model="sendDataJson.ruleName"
                  :placeholder="items.placeholder"
                  :disabled="lookerRecord ? true : false"
                  :maxlength="items.maxlength"
                >
                </el-input>
              </div>
              <div v-else-if="items.ruleUsers">
                <div class="displayalign mb20 mt20">
                  <el-checkbox
                    style="margin-right: 20px"
                    :indeterminate="isIndeterminate"
                    v-model="itemsRuleUsers"
                    @change="handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="sendDataJson.orgIds"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="(city, idx) in items.ruleUsers"
                      :label="city.id"
                      :key="idx"
                    >
                      {{ city.orgFullName }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <!-- 规则使用者 -->
              </div>
            </div>
            <div v-if="item.ruleUsers[0].titleName">
              <div class="mt20 mb20 ml11">
                <el-checkbox-group
                  v-model="sendDataJson.laiyuanArr"
                  @change="handleCheckedlaiyuanArr"
                >
                  <el-checkbox
                    style="display: block"
                    v-for="(city, idx) in item.ruleUsers"
                    :label="city.id"
                    :key="idx"
                  >
                    {{ city.titleName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- 订单来源 -->
            </div>
            <div v-if="item.ruleUsers[0].jijiguizheCenter">
              <div class="mt20 mb20 ml11">
                <el-checkbox-group
                  v-model="sendDataJson.guizheArr"
                  @change="handleCheckedguizheArr"
                >
                  <el-checkbox
                    style="display: block"
                    v-for="(city, idx) in item.ruleUsers"
                    :label="city.id"
                    :key="idx"
                  >
                    <div v-html="changeInput(city.jijiguizheCenter)"></div>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <!-- 订单集计规则 -->
          </div>
          <div v-if="item.placeholder" class="displayalign mb20">
            <div class="noneIconTitle mr20">
              {{ item.title }}
              <span v-if="item.isImportant" style="color: red">*</span>
            </div>
            <div v-if="item.placeholder">
              <el-input
                v-model="sendDataJson.orderNum"
                :placeholder="item.placeholder"
                :maxlength="item.maxlength"
                :disabled="lookerRecord ? true : false"
                type="number"
                @input="orderNumChange(item.maxlength)"
              >
              </el-input>
            </div>
            <!-- 订单数量 -->
          </div>
        </div>
      </div>

      <div class="displayCenter mb20">
        <div class="quxiaoBox mb20 mr20" @click="closeBtn">
          {{ lookerRecord ? "返回" : "取消" }}
        </div>
        <div v-if="!lookerRecord" class="tijiaoBox mb20" @click="goAJAXCreate">
          提交
        </div>
      </div>
      <!-- btn -->
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import { getCookie } from "../../utils/validate";
import { pWarehouseRuleSaveRecord } from "../../api/api";
export default {
  name: "createUsering",
  components: {},
  data() {
    return {
      prodNumIndex: 5, //产品订单种类大于 多少的订单 集计规则
      sendDataJson: {
        id: "", //发货规则id
        orderNum: "", //订单合并数量
        orderSource: "", //订单来源合并规则
        orgIds: [], //发货规则应用委托公司id集合
        guizheArr: [], //订单集计规则
        laiyuanArr: [], //订单来源
        prodMeger: 0, //订单产品重合度集计(按照订单中商品交集最大数集计)
        prodNum: 0, // 订单中产品种类大于x的订单，分出单独发货
        wareId: getCookie("X-Auth-wareId"),
        prodTypeNum: 0, //订单中产品种类只有一种4
        ruleName: "", //发货规则名称
      },
      isIndeterminate: false,
      itemsRuleUsers: false,
      CenterJson: [
        {
          title: "",
          isImportant: false,
          ruleUsers: [
            {
              title: "发货规则",
              isImportant: true,
              placeholder: "请输入发货规则",
              maxlength: 60,
            },
            {
              title: "规则使用者:",
              isImportant: false,
              ruleUsers: [
                {
                  orgFullName: "巨子生物",
                  id: "4C2F466B16E94451B942EBBD07BE0F8B",
                },
                {
                  orgFullName: "test2",
                  id: "88FC4C8DD7954A7F8220C8AEA3B70C32",
                },
              ],
            },
          ],
        },
        // 规则使用者
        {
          title: "订单来源",
          isImportant: false,
          isHuanhang: true,
          ruleUsers: [
            {
              id: "按渠道1",
              titleName: "按渠道",
            },
            {
              id: "2按订单来源",
              titleName: "按订单来源",
            },
          ],
        },
        // 订单来源
        {
          title: "订单集计规则",
          isImportant: false,
          isHuanhang: true,
          ruleUsers: [
            {
              id: 1,
              jijiguizheCenter:
                "订单产品重合度集计(按照订单中商品交集最大数集计)",
            },
            {
              id: 2,
              jijiguizheCenter:
                "订单中产品种类大于   &nbsp; 的订单，分为单独发货",
            },
            {
              id: 3,
              jijiguizheCenter: "订单中产品种类只有一种",
            },
          ],
        },
        //订单集计规则
        {
          isImportant: true,
          title: "订单数量",
          placeholder: "请输入订单数量",
          type: "number",
          maxlength: 2,
        },
        //订单数量
      ],
    };
  },
  props: {
    //来编辑
    editSavaRecord: {
      type: Boolean,
      default: false,
    },
    //来查看
    lookerRecord: {
      type: Boolean,
      default: false,
    },
    editAndLookdata: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.$nextTick(() => {
      let inputs = document.getElementById("input");
      inputs.addEventListener(
        "input",
        (e) => {
          let res = e.target.value.substring(0, this.prodNumIndex);
          e.target.value = res;
          console.log(e.target.value.substring(0, this.prodNumIndex));
          this.sendDataJson.prodNum = res;
        },
        false
      );
      this.$forceUpdate();
    });
  },
  created() {
    this._changeCreateJson();
  },
  methods: {
    //改变传送过来的数据
    _changeCreateJson() {
      console.log(this.editAndLookdata);
    },
    orderNumChange(idx) {
      this.sendDataJson.orderNum = this.sendDataJson.orderNum.substring(0, idx);
    },
    changeInput(e) {
      let src = e.indexOf("&nbsp;");
      e = e.replace(
        /&nbsp;/g,
        `<input id="input" ${
          this.lookerRecord ? "disabled" : ""
        } maxlength="2" class="el-input__inner ${
          this.lookerRecord ? "is-disabled" : ""
        }" type="number" value='${
          this.sendDataJson.prodNum
        }' placeholder="请输入订单数量" />`
      );
      return e;
    },
    //订单来源
    handleCheckedlaiyuanArr(e) {
      this.sendDataJson.laiyuanArr = e;
    },
    //订单规则
    handleCheckedguizheArr(e) {
      this.sendDataJson.guizheArr = e;
    },
    //全选的change
    handleCheckAllChange(val) {
      let arr = [];
      this.CenterJson[0].ruleUsers[1].ruleUsers.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      this.sendDataJson.orgIds = val ? arr : [];
      this.isIndeterminate = false;
    },
    //应该全选的
    handleCheckedCitiesChange(val) {
      let checkedCount = val.length;
      this.itemsRuleUsers =
        checkedCount === this.CenterJson[0].ruleUsers[1].ruleUsers.length;
      this.isIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.CenterJson[0].ruleUsers[1].ruleUsers.length;
    },
    closeBtn() {
      this.$emit("closeBtns", false);
    },
    //点击了提交
    async goAJAXCreate() {
      let { ruleName, prodNum, guizheArr } = this.sendDataJson;
      if (!ruleName) return this.$messageSelf.message("请输入发货规则");
      guizheArr.forEach((item) => {
        if (item == 2 && !prodNum)
          return this.$messageSelf.message("请输入订单集计规则的订单数量");
      });
      if (!prodNum) return this.$messageSelf.message("请输入订单数量");
      pWarehouseRuleSaveRecord(this.sendDataJson)
        .then((res) => {
          if (res.code == "10000") {
            this.$messageSelf.message({
              message: res.msg,
              onClose: () => {
                this.closeBtn();
              },
            });
          } else {
            this.$messageSelf.message(res.msg);
          }
        })
        .catch((err) => this.$messageSelf.message(err.msg));
    },
  },
};
</script>
<style>
#input {
  height: 30px;
  width: 130px;
  margin: 0 5px;
}
.is-disabled {
  background-color: #F5F7FA;
  border-color: #E4E7ED;
  color: #C0C4CC;
  cursor: not-allowed;
}
</style>
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
