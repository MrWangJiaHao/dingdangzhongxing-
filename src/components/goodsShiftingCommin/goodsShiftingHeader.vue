<template>
  <div class="goodsShiftingBox">
    <div class="dispalywrap">
      <div class="inline mr11 mb16">
        <dropDownXiala
          :dropDowBox="wieTuoGonShiJson"
          @cliclInput="weiTuoGonShiClick"
          @getDropDownData="weiTuoGonShiInput"
          :drop="'orgName'"
        />
      </div>
      <!-- 委托公司 -->
      <div class="inline mr11 mb16">
        <searchBox
          @changeInputs="changereplenishOrderNo"
          :searchCenter="buhuodanhaoJson"
        />
      </div>
      <!-- 补货单号 -->
      <div class="inline mr11 mb16">
        <searchBox
          @changeInputs="changprodNumeJson"
          :searchCenter="prodNumeJson"
        />
      </div>
      <!-- 产品名称 -->
      <div class="inline mr11 mb16">
        <searchBox
          @changeInputs="changprodCodeJson"
          :searchCenter="prodCodeJson"
        />
      </div>
      <!-- 产品编码 -->
      <div class="inline mr11 mb16">
        <dropDownXiala
          :dropDowBox="specNameJson"
          @cliclInput="specNameClick"
          @getDropDownData="specNameqInput"
          :drop="'specName'"
        />
      </div>
      <!-- 委托公司 -->
      <div class="inline mr11 mb16">
        <dropDownXiala
          :dropDowBox="disposeStatusJson"
          @cliclInput="disposeStatusClick"
          @getDropDownData="disposeStatusInput"
          :drop="'disposeStatus'"
        />
      </div>
      <!-- 补货状态 -->
      <div class="inline mr11 mb16">
        <dropDownXiala
          :dropDowBox="orderSourceJson"
          @cliclInput="orderSourceClick"
          @getDropDownData="orderSourceInput"
          :drop="'orderSource'"
        />
      </div>
      <!-- 补货类型 -->

      <div class="inline mr11 mb16">
        <div class="displayalign zujianBox">
          <div class="noneIconTitle mr11">创建时间:</div>
          <div class="mr20 displayalign">
            <div style="margin-right: 10px">
              <dateTime
                :dateTimeData="createStartTime"
                @getDateTime="getcreateStartTime"
                ref="createStartTime"
              />
            </div>
            <!-- 开始时间 -->
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="createEndTime"
                @getDateTime="getcreateEndTime"
                ref="createEndTime"
              />
            </div>
            <!-- 结束时间 -->
          </div>
        </div>
      </div>
      <!-- 下发时间 -->
      <div class="inline mr11 mb16">
        <div class="displayalign zujianBox">
          <div class="noneIconTitle mr11">补货开始时间:</div>
          <div class="mr20 displayalign">
            <div style="margin-right: 10px">
              <dateTime
                :dateTimeData="replenishStartTime"
                @getDateTime="getreplenishStartTime"
                ref="replenishStartTime"
              />
            </div>
            <!-- 开始时间 -->
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="replenishEndTime"
                @getDateTime="getreplenishEndTime"
                ref="replenishEndTime"
              />
            </div>
            <!-- 结束时间 -->
          </div>
        </div>
      </div>
      <!-- 补货开始时间 -->
    </div>
    <div class="tr btns">
      <div class="queryBtn mr11" @click="queryCenter">查询</div>
      <div class="clearBtn" @click="clearInters">清空</div>
    </div>
    <!-- 补获作业 header -->
  </div>
</template>

<script>
import dropDownXiala from "../commin/dropDownXiala"; //下拉框
import searchBox from "../commin/searvhBoxs"; //下拉框
import dateTime from "../../components/commin/dateTime.vue"; //时间

export default {
  components: {
    dropDownXiala,
    searchBox,
    dateTime,
  },
  data() {
    return {
      wieTuoGonShiJson: {
        placeholder: "请选择委托公司",
        title: "委托公司",
        select: "",
        dropDownBoxData: [],
      },
      specNameJson: {
        placeholder: "请选择产品规格",
        title: "产品规格",
        select: "",
        dropDownBoxData: [],
      },
      disposeStatusJson: {
        placeholder: "请选择补货状态",
        title: "补货状态",
        select: "",
        dropDownBoxData: [],
      },
      orderSourceJson: {
        placeholder: "请选择补货类型",
        title: "补货类型",
        select: "",
        dropDownBoxData: [],
      },
      createStartTime: {
        placeholder: "创建开始时间",
      },
      createEndTime: {
        placeholder: "创建结束时间",
      },
      replenishStartTime: {
        placeholder: "请选择补货开始时间",
      },
      replenishEndTime: {
        placeholder: "请选择补货结束时间",
      },
      buhuodanhaoJson: {
        placeholder: "请输入补货单号",
        title: "补货单号",
        input: "",
      },
      prodNumeJson: {
        placeholder: "请输入产品名称",
        title: "产品名称",
        input: "",
      },
      prodCodeJson: {
        placeholder: "请输入产品编码",
        title: "产品编码",
        input: "",
      },
      paras: {
        orgId: "", //委托公司id
        createTime: "", //创建时间
        createEndTime: "", //创建结束时间
        createStartTime: "", //创建开始时间
        replenishOrderNo: "", //补货单号
        prodName: "", //产品名称
        prodCode: "", //产品编码
        specName: "", //产品规格
        disposeStatus: "", //补货状态
        orderSource: "", //补货类型
        replenishStartTime: "", //补货开始时间，
        replenishEndTime: "", //补货结束时间
      },
    };
  },
  methods: {
    //委托公司
    weiTuoGonShiClick() {
      let orgNume = {
        orgNume: "撒旦撒 ",
      };
      this.wieTuoGonShiJson.dropDownBoxData.push(orgNume);
    },
    //点击产品规格
    specNameClick() {},
    //补货状态
    disposeStatusClick() {},
    //补货类型
    orderSourceClick() {},
    //捕获状态
    disposeStatusInput(e) {
      this.paras.specName = this.disposeStatusJson.dropDownBoxData[e].id;
    },
    //补货类型
    orderSourceInput(e) {
      this.paras.orderSource = this.orderSourceJson.dropDownBoxData[e].id;
    },
    getcreateStartTime(e) {
      this.paras.createStartTime = e;
    },
    getcreateEndTime(e) {
      this.paras.createEndTime = e;
    },
    getreplenishStartTime(e) {
      this.paras.replenishStartTime = e;
    },
    getreplenishEndTime(e) {
      this.paras.replenishEndTime = e;
    },
    changereplenishOrderNo(e) {
      this.paras.replenishOrderNo = e;
    },
    changprodNumeJson(e) {
      this.paras.prodName = e;
    },
    changprodCodeJson(e) {
      this.changprodCodeJson.prodCode = e;
    },
    weiTuoGonShiInput(e) {
      this.paras.orgId = this.wieTuoGonShiJson.dropDownBoxData[e].orgId;
    },
    specNameqInput(e) {
      this.paras.specName = this.specNameJson.dropDownBoxData[e].specName;
    },
    queryCenter() {
      this.$emit("jobTaskHeader", this.paras);
    },
    clearInters() {
      this.wieTuoGonShiJson.select = ""; //清空委托公司
      this.buhuodanhaoJson.input = ""; //清空补货单号
      this.prodNumeJson.input = ""; //清空产品名称
      this.prodCodeJson.input = ""; //清空产品名称
      this.disposeStatusJson.select = ""; //补货状态
      this.orderSourceJson.select = ""; //补货类型
      this.$refs.replenishEndTime.clear();
      this.$refs.replenishStartTime.clear();
      this.$refs.createEndTime.clear();
      this.$refs.createStartTime.clear();
      this.$emit("jobTaskClearBtn", true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
.goodsShiftingBox {
  position: relative;
  .btns {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
}

.line {
  width: 20px;
  height: 2px;
  background: #fff;
  margin-right: 10px;
}
.queryBtn {
  display: inline-block;
  @include BtnFunction("success");
}
.clearBtn {
  display: inline-block;
  @include BtnFunction();
  background: #fff;
}
</style>