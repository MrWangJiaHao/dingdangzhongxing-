<template>
  <div id="createBreakage">
    <div class="main">
      <div class="headerBox">
        <div class="headerBox-title">创建报损单</div>
        <div class="headerBox-input">
          <div class="el-inputBox">
            <div class="el-inputBox-text">委托公司：</div>
            <div class="el-inputBox-checkBox">
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
            <div class="el-inputBox-text">报损类型：</div>
            <div class="el-inputBox-checkBox">
              <el-select
                v-model="breakageType"
                placeholder="请选择报损类型"
                @change="breakageTypes"
                clearable
              >
                <el-option
                  v-for="item in breakageTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="tableBox">
        <div class="tableBox-title">
          <div class="titleText">明细</div>
          <div class="titleBtn">
            <div class="add" @click="add">添加产品</div>
            <div class="del" @click="del">删除</div>
          </div>
        </div>
        <div class="tableBox-table">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :stripe="true"
            tooltip-effect="dark"
          >
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="60"
            >
            </el-table-column>
            <el-table-column
              prop="childWareName"
              label="子仓名称"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="seatType" label="区域类型" align="center">
            </el-table-column>
            <el-table-column
              prop="wareAreaName"
              label="区域名称"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="prodCode" label="产品编码" align="center">
            </el-table-column>
            <el-table-column prop="prodName" label="产品名称" align="center">
            </el-table-column>
            <el-table-column prop="specName" label="产品规格" align="center">
            </el-table-column>
            <el-table-column prop="braName" label="品牌" align="center">
            </el-table-column>
            <el-table-column
              prop="prodNum"
              label="当前库位产品数量"
              align="center"
              min-width="150"
            >
            </el-table-column>
            <el-table-column
              prop="prodNum"
              label="残次品库位产品数量"
              align="center"
              min-width="170"
            >
            </el-table-column>
            <el-table-column
              prop="prodNum"
              label="残次品库位最大存放数"
              align="center"
              min-width="180"
            >
            </el-table-column>
            <el-table-column prop="prodNum" label="报损数量" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.proNum"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="prodNum" label="当前库位" align="center">
              <template slot-scope="scope">
                <el-select v-model="currentKuwei" @change="currentKuweis">
                  <el-option
                    v-for="item in scope.row.prodNum"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="prodNum"
              label="残次品库位"
              align="center"
              min-width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="imperfectKuwei" @change="imperfectKuweis">
                  <el-option
                    v-for="item in scope.row.prodNum"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="remarkBox">
        <div class="remark">备注：</div>
        <div class="textarea">
          <el-input
            type="textarea"
            v-model="textarea"
            maxlength="100"
            show-word-limit
          ></el-input>
        </div>
      </div>
      <div class="backBtnBox">
        <div class="backBtn" @click="back">返回</div>
        <div class="submitBtn" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryEntrustCompany, saveBreakageOrder } from "../../api/api";
import { getCookie } from "../../utils/validate";
export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/breakageManagement/addProduct") {
      next((vm) => {
        if (vm.$route.query.type === "addProd") {
          vm.tableData = vm.$route.query.val;
        }
      });
    } else {
      next();
    }
  },
  data() {
    return {
      breakageType: "",
      entrustCompany: "",
      textarea: "",
      tableData: [],
      entrustCompanyData: [],
      breakageTypeData: [
        {
          value: "1",
          label: "损坏报损",
        },
        {
          value: "2",
          label: "入库报损",
        },
        {
          value: "3",
          label: "丢失报损",
        },
        {
          value: "4",
          label: "其他报损",
        },
      ],
    };
  },
  mounted() {
    let data = {
      wareId: getCookie("X-Auth-wareId"),
      orgId: "",
    };
    queryEntrustCompany(data).then((ok) => {
      // console.log(ok)
      if (ok.code === "10000") {
        ok.result.forEach((v) => {
          this.entrustCompanyData.push({
            value: v.id,
            label: v.orgName,
          });
        });
      }
    });
  },
  methods: {
    entrustCompanys(val) {
      this.entrustCompany = val;
    },
    breakageTypes(val) {
      this.breakageType = val;
    },
    currentKuweis(val) {
      this.currentKuwei = val;
    },
    imperfectKuweis(val) {
      this.imperfectKuwei = val;
    },
    add() {
      this.$router.push({
        path: "/breakageManagement/addProduct",
        query: { type: "add" },
      });
    },
    del() {},
    back() {
      this.$router.push({
        path: "/breakageManagement/breakageMain",
        query: { type: "quxiao" },
      });
    },
    submit() {
      if (this.entrustCompany === "" || this.breakageType === "") {
        return this.$messageSelf.message({
          message: "请选择委托公司或者报损类型",
          type: "error",
        });
      }
      saveBreakageOrder().then((ok) => {
        console.log(ok);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

#createBreakage {
  padding: 20px;
  background: #e3e4e8;
  .main {
    .headerBox {
      margin-bottom: 20px;
      .headerBox-title {
        font-size: 16px;
        position: relative;
        margin: 0 0 20px 25px;
      }
      .headerBox-title::before {
        content: "";
        width: 15px;
        height: 15px;
        background: url("../../assets/img/systemTitlemesa.png");
        position: absolute;
        left: -25px;
        top: 3px;
      }
      .headerBox-input {
        display: flex;
        font-size: 16px;
        .el-inputBox {
          display: flex;
          align-items: center;
          margin-right: 20px;
        }
      }
    }
    .tableBox {
      background: white;

      .tableBox-title {
        border-bottom: 1px solid #d1d6e2;
        height: 69px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .titleText {
          font-size: 16px;
          position: relative;
          margin-left: 50px;
        }
        .titleText::before {
          content: "";
          width: 15px;
          height: 15px;
          background: url("../../assets/img/systemTitlemesa.png");
          position: absolute;
          left: -25px;
          top: 3px;
        }
        .titleBtn {
          display: flex;
          .add {
            @include BtnFunction("success");
            margin-right: 10px;
          }
          .del {
            @include BtnFunction("error");
            margin-right: 20px;
          }
        }
      }
      .tableBox-table {
        padding: 20px;
      }
    }
    .remarkBox {
      margin-top: 20px;
      .remark {
        font-size: 16px;
        margin-bottom: 10px;
      }
    }
    .backBtnBox {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 16px;
      .backBtn {
        margin: 0 16px 0 0;
        @include BtnFunction("success");
      }
      .submitBtn {
        @include BtnFunction("success");
      }
    }
  }
}
</style>
<style lang="scss">
.textarea {
  .el-textarea__inner {
    height: 80px;
  }
}
</style>