<template>
  <div class="setUserIngBox" id="dindanlaiyuan fahuoguizhepeizhi" >
    <kuanjiaClick
      :titles="
        lookerRecord
          ? '查看发货规则'
          : editSavaRecord
          ? '编辑发货规则'
          : '创建发货规则'
      "
      @closeBtn="closeBtn"
      :is-looker="lookerRecord"
      print="提交"
      width="1000"
      @clickSubmit="goAJAXCreate"
    >
      <template>
        <div class="mt20"></div>
        <div
          class="mb20 w980 pd20"
          v-for="(item, idx) in CenterJson"
          :key="idx"
          :class="item.title != '订单数量' ? 'botD1' : ''"
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
                  <span v-if="items.isImportant" class="colred">*</span>
                  {{ items.title }}
                </div>
                <div v-if="items.placeholder">
                  <el-input
                    v-model="sendDataJson.ruleName"
                    :placeholder="items.placeholder"
                    :disabled="lookerRecord || editSavaRecord ? true : false"
                    :maxlength="items.maxlength"
                  >
                  </el-input>
                </div>
                <div v-else-if="items.ruleUsers" id="guizheuser">
                  <div class="displayalign mb20 mt20">
                    <el-checkbox
                      :disabled="lookerRecord || editSavaRecord ? true : false"
                      style="margin-right: 30px"
                      :indeterminate="isIndeterminate"
                      v-model="itemsRuleUsers"
                      @change="handleCheckAllChange"
                      >全选
                    </el-checkbox>
                    <el-checkbox-group
                      v-model="sendDataJson.orgIds"
                      :disabled="lookerRecord || editSavaRecord ? true : false"
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
                <div class="ml11">
                  <el-radio
                    :disabled="lookerRecord ? true : false"
                    v-model="sendDataJson.orderSource"
                    label="1"
                    >按渠道</el-radio
                  >
                  <el-radio
                    :disabled="lookerRecord ? true : false"
                    v-model="sendDataJson.orderSource"
                    label="2"
                    >按订单来源</el-radio
                  >
                </div>
                <div class="mb20"></div>
                <!-- 订单来源 -->
              </div>
              <div v-if="item.ruleUsers[0].jijiguizheCenter">
                <div class="ml11">
                  <el-checkbox-group
                    :disabled="lookerRecord ? true : false"
                    v-model="sendDataJson.guizheArr"
                    @change="handleCheckedguizheArr"
                  >
                    <el-checkbox
                      style="display: block; margin-bottom: 20px"
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
            <div
              v-if="item.placeholder"
              class="displayalign dindanshulian mb20"
            >
              <div class="noneIconTitle mr20 mb20">
                <span v-if="item.isImportant" class="colred">*</span>
                {{ item.title }}
              </div>
              <div v-if="item.placeholder" class="mb20">
                <el-input
                  class="w160"
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
      </template>
    </kuanjiaClick>
  </div>
</template>
<style>
	#fahuoguizhepeizhi .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
	     top:4px !important;
	}
	.el-input.is-disabled .el-input__inner{
		background-color:#F2F6FC ;
	}
	.el-radio__input.is-disabled.is-checked .el-radio__inner::after{
		background-color: #C0C4CC;
	}
</style>
<script>
/*eslint-disable */
import { getCookie,_getArrTarget } from "../../utils/validate";
import { pWarehouseRuleSaveRecord, getFindWareOrg } from "../../api/api";
import kuanjiaClick from "../../components/commin/kuanjiaClick";

export default {
  name: "createUsering",
  components: { kuanjiaClick },
  data() {
    return {
      prodNumIndex: 2, //产品订单种类大于 多少的订单 集计规则
      sendDataJson: {
        id: "", //发货规则id
        orderNum: "10", //订单合并数量
        orderSource: "", //订单来源合并规则
        orgIds: [], //发货规则应用委托公司id集合
        guizheArr: [], //订单集计规则
        laiyuanArr: "", //订单来源
        prodMeger: 0, //订单产品重合度集计(按照订单中商品交集最大数集计)
        prodNum: null, // 订单中产品种类大于x的订单，分出单独发货
        wareId: getCookie("X-Auth-wareId"),
        prodTypeNum: 0, //订单中产品种类只有一种
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
              id: "1",
              titleName: "按渠道",
            },
            {
              id: "2",
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
              id: "prodMeger",
              jijiguizheCenter:
                "订单产品重合度集计(按照订单中商品交集最大数集计)",
            },
            {
              id: "prodNum",
              jijiguizheCenter:
                "订单中产品种类大于 &nbsp; 的订单，分为单独发货",
            },
            {
              id: "prodTypeNum",
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
      inputs.oninput = (e) => {
        if (e.target.value) {
          this.sendDataJson.guizheArr.push("prodNum");
        } else {
          this.sendDataJson.guizheArr.pop();
        }
        e.target.value = e.target.value.substring(0, this.prodNumIndex);
        this.sendDataJson.prodNum = e.target.value.substring(
          0,
          this.prodNumIndex
        );
      };
      this.$forceUpdate();
    });
  },
  created() {
    if (this.editSavaRecord || this.lookerRecord) {
		console.log('来编辑，或者查看')
      this._changeCreateJson();
    }
	this._changeRulesPeople();
  },
  methods: {
    //获取规则使用者
    _changeRulesPeople() {
      getFindWareOrg().then((res) => {
        this.CenterJson[0].ruleUsers[1].ruleUsers = res.result;
      });
      this.$forceUpdate();
    },
    //改变传送过来的数据
    _changeCreateJson() {
      this.sendDataJson = Object.assign(
        {},
        this.sendDataJson,
        this.editAndLookdata
      );

      this.sendDataJson.orderSource = `${this.editAndLookdata.orderSource}`;
	 
      this.sendDataJson.orgIds =_getArrTarget( this.editAndLookdata.orgRuleList,"orgId");
      this._changeDindanJIji();
    },
    _changeDindanJIji() {
      let arrJIjiGuizhe = ["prodMeger", "prodNum", "prodTypeNum"];
      arrJIjiGuizhe.forEach((item) => {
        if (this.editAndLookdata[item]) {
          this.sendDataJson.guizheArr.push(`${item}`);
        }
      });
    },
    orderNumChange(idx) {
      this.sendDataJson.orderNum = this.sendDataJson.orderNum.substring(0, idx);
    },
    changeInput(e) {
      let src = e.indexOf("&nbsp;");
      e = e.replace(
        /&nbsp;/g,
        `<input id="input" style='width:140px;' ${
          this.lookerRecord ? "disabled" : ""
        } maxlength="2" class="el-input__inner ${
          this.lookerRecord ? "is-disabled" : ""
        }" type="number" value='${
          this.sendDataJson.prodNum
        }' placeholder="请输入订单数量" />`
      );
      return e;
    },
    //订单规则
    handleCheckedguizheArr(e) {
      this.sendDataJson.guizheArr = e;
      this._seveich(e);
    },
    _seveich(e) {
      e.includes("prodMeger")
        ? (this.sendDataJson.prodMeger = 1)
        : (this.sendDataJson.prodMeger = 0);
      e.includes("prodTypeNum")
        ? (this.sendDataJson.prodTypeNum = 1)
        : (this.sendDataJson.prodTypeNum = 0);
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
      let { ruleName, prodNum, orderNum, guizheArr } = this.sendDataJson;
      if (!ruleName)
        return this.$messageSelf.message({
          message: "请输入发货规则",
          type: "error",
        });

      guizheArr.forEach((item) => {
        if (item == 2 && !prodNum)
          return this.$messageSelf.message({
            message: "请输入订单集计规则的订单数量",
            type: "error",
          });
      });
      if (!orderNum)
        return this.$messageSelf.message({
          message: "请输入订单数量",
          type: "error",
        });
      pWarehouseRuleSaveRecord(this.sendDataJson)
        .then((res) => {
          if (res.code == "10000") {
            this.$messageSelf.message({
              message: res.msg,
              type: "success",
            });
            this.$parent.getTableData();
            this.closeBtn();
          } else {
            this.$messageSelf.message({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((err) =>
          this.$messageSelf.message({
            message: res.msg,
            type: "error",
          })
        );
    },
  },
};
</script>
<style>
#app #dindanlaiyuan .el-radio__input.is-checked .el-radio__inner {
  background: #fff;
}

#dindanlaiyuan .setUserIngBoxCenter .padBottom:last-child {
  border-bottom: none;
}

#app #dindanlaiyuan .el-checkbox__inner::after {
  height: 7px !important;
  left: 4px !important;
  top: 1px !important;
}

#app #dindanlaiyuan .el-checkbox__inner {
  width: 14px !important;
  height: 14px !important;
}

#input {
  height: 30px;
  width: 130px;
  margin: 0 5px;
  border-radius: 6px;
}

.el-radio__input.is-checked .el-radio__inner::after {
  width: 10px;
  height: 10px;
  background: #409eff;
}

.is-disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
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
    transform: translateX(-50%);
    background: #fff;
    max-width: 1000px;
  }

  .quxiaoBox {
    border: 1px solid rgb(209, 214, 226);
    @include BtnFunction();
  }

  .tijiaoBox {
    @include BtnFunction("success");
  }
}
</style>
