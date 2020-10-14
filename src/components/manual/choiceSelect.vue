<template>
  <div ref="childSelect" class="displayCenter choiceSelectBox">
    <div style="width: 100%">
      <div class="headerBox mb20">
        <div class="closeTitle">选择产品</div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>
      <div class="displayalign mb20 pd20">
        <div>
          <div class="displayalign ellipsis">
            <div class="noneIconTitle mr11">产品名称:</div>
            <div class="mr20">
              <el-input></el-input>
            </div>
          </div>
        </div>
        <!-- 产品名称 -->
        <div>
          <div class="displayalign ellipsis">
            <div class="noneIconTitle mr11">产品名称:</div>
            <div class="mr20">
              <el-input></el-input>
            </div>
          </div>
        </div>
        <!-- 产品名称 -->
        <div>
          <div class="displayalign ellipsis">
            <div class="noneIconTitle mr11">产品规格:</div>
            <div class="mr20">
              <el-input></el-input>
            </div>
          </div>
        </div>
        <!-- 产品规格 -->
      </div>
      <div class="btn tr mb20 pd20">
        <div class="disinb quxiaoBox">删除</div>
      </div>
      <div class="mb20 pd20">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :stripe="true"
          :border="true"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="82"></el-table-column>
          <el-table-column
            label="序号"
            type="index"
            width="71"
            show-overflow-tooltip
          />
          <el-table-column
            label="产品编码"
            width="119"
            prop="orgName"
            show-overflow-tooltip
          />
          <el-table-column
            label="产品名称"
            width="119"
            property="putWareNo"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            width="119"
            label="产品规格"
            prop="orderNo"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="供应商"
            prop="expectedSendStartTime"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="品牌"
            width="119"
            prop="putstatus"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
      <div class="mb20 pd20 tc">
        <div class="disinb quxiaoBox mr11" @click="closeBtn">删除</div>
        <div class="disinb tijiaoBox">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
// import searchBox from "../../components/commin/searchBox"; //搜索框

export default {
  data() {
    let tabledata = [
      {
        orgName: "", //委托公司
        orgId: "", //委托id
        orderNo: "", //原定单号（关联单号）
        putWareNo: "", //入库单号
        putstatus: "", //入库状态
        prodCode: "", //产品编码
        prodName: "", //产品名称
        specName: "", //规格名称
        putStartTime: "", //入库时间开始时间
        putEndTime: "", //入库时间结束时间
        expectedSendStartTime: "", //期望入库开始时间
        expectedSendEndTime: "", //期望入库时间结束时间
        putUser: "", //入库人
        batchNo: "",
      },
    ];
    return {
      tabledata,
    };
  },
  components: {
    // searchBox,
  },
  methods: {
    closeBtn() {
      this.$parent._data.addChanpins = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

.headerBox {
  width: 100%;
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
.quxiaoBox {
  @include BtnFunction("error");
}
.tijiaoBox {
  @include BtnFunction("success");
}
</style>