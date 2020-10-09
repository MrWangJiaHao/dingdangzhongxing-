<template>
  <div id="mapInfor">
    <!-- 这是库位映射详情页面 -->
    <div class="productInfor">
      <div class="productInfor_title">产品信息</div>
      <div class="productInfor_div">
        <div class="selectDiv">
          <div class="text_select">
            <div>委托公司：</div>
            <el-select
              v-model="delegaCompanyValue"
              placeholder="请选择委托公司"
              @change="delegaCompanyValues"
            >
              <el-option
                v-for="item in delegaCompanyData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="text_select">
            <div>产品编号：</div>
            <el-select
              v-model="productCodeValue"
              placeholder="请选择产品编号"
              @change="productCodeValues"
            >
              <el-option
                v-for="item in productCodeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="text_select">
            <div>产品名称：</div>
            <el-select
              v-model="productNameValue"
              placeholder="请选择产品名称"
              @change="productNameValues"
            >
              <el-option
                v-for="item in productNameData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="text_select">
            <div>规格：</div>
            <el-select
              v-model="specificationValue"
              placeholder="请选择规格"
              @change="specificationValues"
            >
              <el-option
                v-for="item in specificationData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="inputDiv">
          <div class="text_box">
            <div>品牌：</div>
            <div>可立金</div>
          </div>
          <div class="text_box">
            <div>长：</div>
            <div>10</div>
            m
          </div>
          <div class="text_box">
            <div>宽：</div>
            <div>5</div>
            m
          </div>
          <div class="text_box">
            <div>高：</div>
            <div>3</div>
            m
          </div>
        </div>
      </div>
    </div>

    <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
    <div class="productInfor">
      <div class="productInfor_title">绑定存储区库位</div>
      <div class="productInfor_div">
        <div class="selectDiv">
          <div class="text_select">
            <div>子仓：</div>
            <el-select
              v-model="delegaCompanyValue"
              placeholder="请选择委托公司"
              @change="delegaCompanyValues"
            >
              <el-option
                v-for="item in delegaCompanyData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="text_select">
            <div>区域：</div>
            <el-select
              v-model="productCodeValue"
              placeholder="请选择产品编号"
              @change="productCodeValues"
            >
              <el-option
                v-for="item in productCodeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="text_select">
            <div>货架：</div>
            <el-select
              v-model="productNameValue"
              placeholder="请选择产品名称"
              @change="productNameValues"
            >
              <el-option
                v-for="item in productNameData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="text_select">
            <div>库位：</div>
            <el-input
              placeholder="模糊搜索"
              v-model="storageLocation"
              clearable
            >
            </el-input>
          </div>
          <div class="queryBtnDiv">
            <div class="queryBtn" @click="clickQuery">查询</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      specificationData: [
        {
          value: "好好",
          label: "好好",
        },
      ],
      specificationValue: "",
    };
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";

#mapInfor {
  background: #e6e7ea;
  height: 100%;
  .productInfor {
    padding: 16px;
    .productInfor_title {
      position: relative;
      font-size: 16px;
      margin-left: 16px;
    }
    .productInfor_title:after {
      content: "";
      position: absolute;
      width: 3px;
      height: 100%;
      background: #409eff;
      left: -16px;
      top: 0;
    }
  }
  .productInfor_div {
    margin-top: 16px;
    .selectDiv {
      display: flex;
      .text_select {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-right: 16px;
      }
    }
    .inputDiv {
      margin-top: 16px;
      display: flex;
      .text_box {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-right: 16px;
        div:nth-of-type(2) {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          background: white;
          border-radius: 4px;
          padding: 0 30px 0 15px;
          color: rgb(96, 98, 102);
          border: 1px solid #dcdfe6;
        }
      }
    }
  }
}

.queryBtn {
  @include BtnFunction("success");
}
</style>
<style lang="scss">
</style>