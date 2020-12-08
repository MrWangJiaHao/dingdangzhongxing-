<template>
  <div id="shipmentStatPage">
    <!-- 这是缺货订单管理页面 -->
    <div class="formBox">
      <el-tabs type="card">
        <el-tab-pane label="发货订单统计">
          <div class="headerHtml">
            <div class="headerInput">
              <div class="el-inputBox entrustCompany">
                <div class="el-inputBox-text">委托公司：</div>
                <div class="el-inputBox-checkBox" style="width: 320px">
                  <el-select
                    v-model="entrustCompany"
                    placeholder="请选择委托公司"
                    @change="entrustCompanys"
                    clearable
                  >
                    <el-option
                      v-for="item in entrustCompanyData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="el-inputBox">
                <div class="el-inputBox-text">渠道：</div>
                <div class="el-inputBox-checkBox" style="width: 120px">
                  <el-select
                    v-model="channelName"
                    placeholder="请选择渠道"
                    @change="channelNames"
                    clearable
                  >
                    <el-option
                      v-for="item in channelNameData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="el-inputBox">
                <div class="el-inputBox-text">订单来源：</div>
                <div class="el-inputBox-checkBox" style="width: 160px">
                  <el-select
                    v-model="orderSourceName"
                    placeholder="请选择订单来源"
                    @change="orderSourceNames"
                    clearable
                  >
                    <el-option
                      v-for="item in orderSourceNameData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="el-inputBox">
                <div class="el-inputBox-text">物流公司：</div>
                <div class="el-inputBox-checkBox" style="width: 160px">
                  <el-select
                    v-model="expressName"
                    placeholder="请选择物流公司"
                    @change="expressNames"
                    clearable
                  >
                    <el-option
                      v-for="item in expressNameData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="el-inputBox">
                <div class="el-inputBox-text">订单号：</div>
                <div class="el-inputBox-checkBox" style="width: 160px">
                  <el-input v-model="orderNo" placeholder="模糊检索">
                  </el-input>
                </div>
              </div>
              <div class="el-inputBox">
                <div class="el-inputBox-text">子单号：</div>
                <div class="el-inputBox-checkBox" style="width: 160px">
                  <el-input v-model="subOrderNo" placeholder="模糊检索">
                  </el-input>
                </div>
              </div>
              <div class="el-inputBox">
                <div class="el-inputBox-text">物流单状态：</div>
                <div class="el-inputBox-checkBox" style="width: 150px">
                  <el-select
                    v-model="expressState"
                    placeholder="请选择物流状态"
                    @change="expressStates"
                    clearable
                  >
                    <el-option
                      v-for="item in expressStateData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="timeChoose el-inputBox">
                <div class="el-inputBox-text">揽件时间：</div>
                <div class="timeBox">
                  <div style="">
                    <dateTime
                      :dateTimeData="datetimeDates"
                      @getDateTime="getStartTime"
                      ref="startTime"
                    />
                  </div>
                  <!-- 开始时间 -->
                  <div class="line"></div>
                  <div>
                    <dateTime
                      :dateTimeData="datetimeDate"
                      @getDateTime="getEndTime"
                      ref="endTime"
                    />
                  </div>
                  <!-- 结束时间 -->
                </div>
              </div>
              <div class="header-botton">
                <div class="queryBtn" @click="clickQuery">查询</div>
                <div class="clearBtn" @click="clearInput">清空</div>
              </div>
            </div>
          </div>

          <div class="formHeader">
            <div class="icon-title">
              <div class="icon-title-icon">
                <img src="../../assets/img/systemTitlemesa.png" />
              </div>
              <div class="icon-title-title">查询结果</div>
            </div>
            <div class="someBtn">
              <a class="setUser prodEduce" @click="prodEduce" target="_blank"
                >导出</a
              >
            </div>
          </div>
          <div class="formTable">
            <el-table
              :data="productData"
              border
              style="width: 100%"
              @selection-change="prodHandleSelectionChange"
              :stripe="true"
              tooltip-effect="dark"
            >
              <el-table-column type="selection" width="55" align="center">
              </el-table-column>
              <el-table-column
                label="序号"
                align="center"
                type="index"
                width="60"
              >
              </el-table-column>
              <el-table-column prop="orgName" label="委托公司" align="center">
              </el-table-column>
              <el-table-column prop="prodCode" label="产品编码" align="center">
              </el-table-column
              ><el-table-column prop="prodName" label="产品名称" align="center">
              </el-table-column
              ><el-table-column prop="specName" label="产品规格" align="center">
              </el-table-column
              ><el-table-column prop="braName" label="品牌" align="center">
              </el-table-column
              ><el-table-column
                prop="inventoryUpper"
                label="高库存预警值"
                align="center"
              >
              </el-table-column
              ><el-table-column
                prop="inventoryFloor"
                label="低库存预警值"
                align="center"
              >
              </el-table-column
              ><el-table-column
                prop="prodNum"
                label="销售仓可用库存数量"
                align="center"
              >
              </el-table-column
              ><el-table-column
                prop="orderProdNum"
                label="缺货数量"
                align="center"
              >
              </el-table-column
              ><el-table-column
                prop="orderNum"
                label="缺货订单数"
                align="center"
              >
                <template slot-scope="scope">
                  <div
                    class="lookDeatil"
                    @click="lookDeatilOrderNum(scope.row)"
                  >
                    {{ scope.row.orderNum }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pageComponent">
              <pagecomponent
                :pageComponentsData="pageComponentsData"
                @getPageNum="getPageNum"
                @sureSuccssBtn="sureSuccssBtn"
              ></pagecomponent>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="发货单品统计">
          <div class="formHeader">
            <div class="icon-title">
              <div class="icon-title-icon">
                <img src="../../assets/img/systemTitlemesa.png" />
              </div>
              <div class="icon-title-title">查询结果</div>
            </div>
            <div class="someBtn">
              <a class="setUser orderEduce" @click="orderEduce" target="_blank"
                >导出</a
              >
            </div>
          </div>
          <div class="formTable">
            <el-table
              :data="orderData"
              border
              style="width: 100%"
              @selection-change="orderHandleSelectionChange"
              :stripe="true"
              tooltip-effect="dark"
            >
              <el-table-column type="selection" width="55" align="center">
              </el-table-column>
              <el-table-column
                label="序号"
                align="center"
                type="index"
                width="60"
              >
              </el-table-column>
              <el-table-column prop="orgName" label="委托公司" align="center">
              </el-table-column>
              <el-table-column prop="channelName" label="渠道" align="center">
              </el-table-column>
              <el-table-column
                prop="orderSourceName"
                label="订单来源"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="orderNo" label="订单号" align="center">
                <template slot-scope="scope">
                  <div class="lookDeatil" @click="lookDeatilOrderNo(scope.row)">
                    {{ scope.row.orderNo }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="subOrderNo"
                label="子订单号"
                align="center"
              >
                <template slot-scope="scope">
                  <div
                    class="lookDeatil"
                    @click="lookDeatilSubOrderNo(scope.row)"
                  >
                    {{ scope.row.subOrderNo }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="exprName" label="物流公司" align="center">
              </el-table-column>
              <el-table-column prop="exprNo" label="物流单号" align="center">
              </el-table-column>
              <el-table-column prop="reason" label="失败原因" align="center">
                <template slot-scope="scope">
                  <div class="failCause">
                    {{ scope.row.reason }}
                  </div>
                </template> </el-table-column
              ><el-table-column
                prop="pullTime"
                label="下发时间"
                align="center"
                width="180"
                min-width="180"
              ></el-table-column>
            </el-table>
            <div class="pageComponent">
              <pagecomponent
                :pageComponentsData="pageComponentsData1"
                @getPageNum="getPageNum1"
                @sureSuccssBtn="sureSuccssBtn1"
              ></pagecomponent>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import dateTime from "../../components/commin/dateTime.vue"; //时间
// import { } from "../../api/api";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {};
  },
  mounted() {},
  watch: {},

  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

#shipmentStatPage {
  padding: 20px 10px;
}

.headerHtml {
  height: 100px;
  position: absolute;
  top: -50px;
  padding: 0 16px;
  z-index: 999;
  .headerInput {
    display: flex;
    flex-wrap: wrap;
    .el-inputBox {
      display: flex;
      align-items: center;
      margin: 0 20px 16px 0;
      .el-inputBox-text {
        white-space: nowrap;
      }
    }
  }
  .header-botton {
    width: 186px;
    height: 36px;
    position: absolute;
    right: 0;
    bottom: 16px;
    display: flex;
    align-items: center;
    .queryBtn {
      @include BtnFunction("success");
    }
    .clearBtn {
      @include BtnFunction();
      background: #fff;
      margin: 0 16px 0 10px;
    }
  }
  .timeChoose {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    .titleBox {
      font-size: 16px;
    }
    .timeBox {
      height: 34px;
      display: flex;
      align-items: center;
      .line {
        width: 10px;
        height: 2px;
        background: #d1d6e2;
        margin: 0 10px;
      }
    }
  }
}

.formBox {
  position: relative;
  margin-top: 100px;
  .formHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d2d6e2;
    background: white;
    .icon-title {
      display: flex;
      .icon-title-icon {
        width: 14px;
        height: 14px;
        margin: 2px 0 0 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .icon-title-title {
        margin: -1px 0 0 8px;
        font-size: 16px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 16px 16px 0;
      .setUser {
        @include BtnFunction("success");
      }
      .takeOrdersDiv {
        margin-right: 10px;
        @include BtnFunction("success");
      }
    }
  }
  .formTable {
    background: white;
    padding: 16px;
  }
}
</style>
<style lang="scss">
@import "../../assets/scss/btn.scss";

.entrustCompany {
  .el-select {
    width: 100%;
  }
}
#shipmentStatPage {
  .el-tabs__item.is-active {
    @include BtnFunction("success");
    border: 1px solid transparent;
  }
  .el-tabs__item {
    @include BtnFunction("");
    background: white;
    margin-right: 10px;
    border: 1px solid #d1d6e2;
  }
  .el-tabs--card > .el-tabs__header {
    border: none;
    position: absolute;
    left: 126px;
    top: 16px;
  }
}
</style>
