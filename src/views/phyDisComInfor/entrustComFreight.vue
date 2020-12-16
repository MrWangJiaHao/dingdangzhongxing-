<template>
  <div id="mateAdmin">
    <!-- 这是委托公司运费模板页面 -->
    <div class="roleName">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="nameBox">
            <div class="roleName-text">委托公司：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="phyComName"
                placeholder="请选择委托公司"
                @change="phyComNames"
              >
                <el-option
                  v-for="item in phyComNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">模板名称：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="templateName"
                placeholder="请选择模板名称"
                @change="templateNames"
              >
                <el-option
                  v-for="item in templateNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">生效状态：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="takeEffectState"
                placeholder="请选择生效状态"
                @change="takeEffectStates"
              >
                <el-option
                  v-for="item in takeEffectStateData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">模板状态：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="templateState"
                placeholder="请选择模板状态"
                @change="templateStates"
              >
                <el-option
                  v-for="item in templateStateData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="roleName-botton">
          <div class="queryBtn" @click="clickQuery">查询</div>
          <div class="clearBtn" @click="clearInput">清空</div>
        </div>
      </div>
      <div class="childWarehouseForm">
        <div class="formHeader">
          <div class="icon-title">
            <div class="icon-title-icon">
              <img src="../../assets/img/systemTitlemesa.png" />
            </div>
            <div class="icon-title-title">委托公司运费模板信息</div>
          </div>
          <div class="someBtn">
            <div class="bianjiUser" @click="lookDetail">查看</div>
          </div>
        </div>
        <div class="resultForm">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :stripe="true"
            tooltip-effect="dark"
            :span-method="spanMethod"
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
            <el-table-column prop="exprFeeCode" label="模板编号" align="left">
            </el-table-column>
            <el-table-column prop="orgName" label="委托公司" align="center">
            </el-table-column>
            <el-table-column prop="exprFeeName" label="模板名称" align="center">
            </el-table-column>
            <el-table-column prop="exprName" label="物流公司" align="center">
            </el-table-column>
            <el-table-column
              prop="effectStartTime"
              label="生效日期"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="unTakeEffect"
              label="生效状态"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="enableStatus"
              label="模板状态"
              align="center"
            ></el-table-column>
          </el-table>
          <div class="pageComponent">
            <pagecomponent
              :pageComponentsData="pageComponentsData"
              @getPageNum="getPageNum"
              @sureSuccssBtn="sureSuccssBtn"
            ></pagecomponent>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹框 -->
    <el-dialog title="配送区域查看" :visible.sync="dialogFormVisible">
      <div class="dialogForm">
        <el-table
          :data="tableData1"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :stripe="true"
          tooltip-effect="dark"
          max-height="500"
        >
          <el-table-column
            prop="typeName"
            label="计费方式"
            align="center"
            width="90"
          ></el-table-column>
          <el-table-column
            prop="cargoName"
            label="运货方式"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="firstHeavy"
            label="首重(5KG)"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="continuedHeavy"
            label="续重(每1KG)"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="areaName"
            label="区域"
            align="left"
          ></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { queryStorePhyDis, queryStorePhyDisCon } from "../../api/api";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      tableDataRes: [],
      phyComName: "",
      templateName: "",
      takeEffectState: "",
      templateState: "",
      brandNameValue: "",
      phyComNameData: [],
      templateNameData: [],
      takeEffectStateData: [
        {
          value: "0",
          label: "未生效",
        },
        {
          value: "1",
          label: "已生效",
        },
        {
          value: "2",
          label: "已失效",
        },
      ],
      templateStateData: [
        {
          value: "0",
          label: "停用",
        },
        {
          value: "1",
          label: "启用",
        },
      ],
      brandNameValueData: [],

      //----------弹窗里面的select选择框和输入框开始---------------

      //----------弹窗里面的select选择框和输入框结束---------------
      tableData: [],
      tableData1: [],
      multipleSelection: [],

      dialogFormVisible: false,

      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10条
      },
      queryFun: () => {},
      allInfroDate: [],
      idQueryData: {
        exprId: "",
        wareId: "",
        id: "",
      },

      pagingQueryData: {
        exprId: "", //物流公司
        wareId: "", //仓库id
        orgId: "",
        id: "", //模板id
        exprFeeName: "",
        unTakeEffect: "", //是否生效
        enableStatus: "", //启用状态(1-启用 0-停用)
        exprType: 3, //物流模板类型（1-平台；2-仓库经营者；3-委托公司）
      },
      spanArr: [],
      spanCodeArr: [],
      pos: 0,
      codePos: 0,
    };
  },
  mounted() {
    this.queryFun = () => {
      let pagingQueryData = this.pagingQueryData;
      queryStorePhyDis(pagingQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result;
          this.tableData.sort(this.creatCompare("orgName"));
          this.allInfroDate = ok.data.result;
          this.tableData.forEach((v) => {
            if (v.unTakeEffect === 0) {
              v.unTakeEffect = "未生效";
            } else if (v.unTakeEffect === 1) {
              v.unTakeEffect = "已生效";
            } else if (v.unTakeEffect === 2) {
              v.unTakeEffect = "已失效";
            }
            if (v.enableStatus === 0) {
              v.enableStatus = "停用";
            } else if (v.enableStatus === 1) {
              v.enableStatus = "启用";
            }
            this.templateNameData.push({
              value: v.id,
              label: v.exprFeeName,
            });
            this.phyComNameData.push({
              value: v.orgId,
              label: v.orgName,
            });
            let testObj = {};
            this.phyComNameData = this.phyComNameData.reduce((item, next) => {
              testObj[next.value]
                ? ""
                : (testObj[next.value] = true && item.push(next));
              return item;
            }, []);
          });
        } else {
          this.$messageSelf.message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    };
    this.queryFun();
  },
  methods: {
    creatCompare(propertyName) {
      return function (obj1, obj2) {
        var value1 = obj1[propertyName];
        var value2 = obj2[propertyName];
        if (value1 < value2) {
          return -1;
        } else if (value1 > value2) {
          return 1;
        } else {
          return 0;
        }
      };
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column, rowIndex, columnIndex);
      if (column.property === 3) {
        return [2, 2];
      }
    },
    clickQuery() {
      //点击查询
      this.tableData = [];
      let pagingQueryData = this.pagingQueryData;
      queryStorePhyDis(pagingQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result;
        } else {
          this.$messageSelf.message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    },
    clearInput() {
      //点击清空输入框
      this.phyComName = "";
      this.templateName = "";
      this.takeEffectState = "";
      this.templateState = "";
      this.tableData = [];
      this.phyComNameData = [];
      this.templateNameData = [];
      this.pagingQueryData.exprId = "";
      this.pagingQueryData.orgId = "";
      this.pagingQueryData.exprFeeName = "";
      this.pagingQueryData.unTakeEffect = "";
      this.pagingQueryData.enableStatus = "";
      this.pagingQueryData.id = "";
      this.queryFun();
    },

    lookDetail() {
      //查看
      this.tableData1 = [];
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要查看模板",
          type: "warning",
        });
      if (this.multipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能编辑一个模板，请重新选择",
          type: "warning",
        });
      this.dialogFormVisible = true;
      this.idQueryData.exprId = this.multipleSelection[0].exprId;
      this.idQueryData.id = this.multipleSelection[0].id;
      let idQueryData = this.idQueryData;
      queryStorePhyDisCon(idQueryData).then((ok) => {
        let res = ok.data.result;
        res.exprFeeAreas.forEach((v) => {
          this.tableData1.push({
            typeName: res.tails.typeName,
            cargoName: res.tails.cargoName,
            firstHeavy: v.firstFee + "元",
            continuedHeavy: v.continuedFee + "元",
            areaName: v.areaName,
          });
        });
      });
    },
    phyComNames(val) {
      this.pagingQueryData.orgId = val;
    },
    templateNames(val) {
      // this.templateNameData.forEach((v) => {
      // if (val === v.value) {
      // this.templateName = v.label;
      this.pagingQueryData.id = val;
      //   let label = v.label;
      //   this.allInfroDate.forEach((vv) => {
      // if (label === vv.exprFeeName) {
      //   this.pagingQueryData.id = vv.id;
      // }
      //   });
      // }
      // });
    },
    takeEffectStates(val) {
      this.takeEffectState = val;
      this.pagingQueryData.unTakeEffect = val;
    },
    templateStates(val) {
      this.templateState = val;
      this.pagingQueryData.enableStatus = val;
    },
    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.pagingQueryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data); //用来改变分页器的条数
    },
    //用来改变分页器的条数
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";
#mateAdmin {
  background: #eef1f8;
  padding: 20px 10px;
}
.roleName-choose {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .name_type {
    display: flex;
    .nameBox {
      display: flex;
      align-items: center;
      margin: 0 16px 0 0;
      .roleName-text {
        font-size: 14px;
        white-space: nowrap;
      }
      .roleName {
        height: 76px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #d1d6e2;
        .roleName-choose {
          width: 360px;
          display: flex;
          align-items: center;
          .roleName-text {
            margin: 0 10px 0 30px;
            font-size: 14px;
          }
        }
      }
    }
  }

  .roleName-botton {
    display: flex;
    align-items: center;
    .queryBtn {
      @include BtnFunction("success");
    }
    .clearBtn {
      @include BtnFunction();
      background: #fff;
      margin: 0 0 0 10px;
    }
  }
}
.childWarehouseForm {
  margin: 16px 0 0 0;
  background: white;
  .formHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d1d6e2;
    .icon-title {
      display: flex;
      .icon-title-icon {
        width: 14px;
        height: 14px;
        margin: 0 0 0 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .icon-title-title {
        margin: 0 0 0 8px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 20px 16px 0;
      .bianjiUser {
        @include BtnFunction("success");
      }
    }
  }
  .resultForm {
    padding: 16px 20px;
  }
}
</style>

<style lang="scss">
#mateAdmin {
  .el-dialog__wrapper {
    // background: #eef1f8;
  }
  .el-dialog {
    width: 900px;
    height: 630px;
    border-radius: 4px;
    .el-dialog__header {
      padding: 0 20px;
      font-weight: 600;
      height: 50px;
      width: 100%;
      line-height: 50px;
      background: #ecf1f7;
      .el-dialog__headerbtn {
        top: 0;
      }
    }
    .el-dialog__body {
      width: 100%;
      height: 500px;
      border-top: 1px solid #d1d6e2;
      border-bottom: 1px solid #d1d6e2;
      padding: 0;
    }
    .el-dialog__footer {
      width: 100%;
      height: 80px;
      padding: 20px 20px;
      .el-button {
        border: 1px solid #dcdfe6;
      }
    }
  }
}
</style>