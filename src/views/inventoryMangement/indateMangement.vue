<template>
  <div id="indateMangement">
    <!-- 这是有效期管理页面 -->
    <div class="roleName">
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
            <div class="el-inputBox-text">产品名称：</div>
            <div class="el-inputBox-checkBox" style="width: 400px">
              <el-input v-model="productName" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">产品编码：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="productCode" placeholder="模糊检索">
              </el-input>
            </div>
          </div>

          <div class="el-inputBox">
            <div class="el-inputBox-text">规格：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="specName"
                placeholder="请选择规格"
                @change="specNames"
                clearable
              >
                <el-option
                  v-for="item in specNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">入库批次号：</div>
            <div class="el-inputBox-checkBox">
              <el-input v-model="batchNos" placeholder="模糊检索"> </el-input>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">品牌：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="braName"
                placeholder="请选择品牌"
                @change="braNames"
                clearable
              >
                <el-option
                  v-for="item in braNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">批次状态：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="batchState"
                placeholder="请选择批次状态"
                @change="batchStates"
                clearable
              >
                <el-option
                  v-for="item in batchStateData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">是否到期：</div>
            <div class="el-inputBox-checkBox" style="width: 150px">
              <el-select
                v-model="isExpire"
                placeholder="请选择是否到期"
                @change="isExpires"
                clearable
              >
                <el-option
                  v-for="item in isExpireData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="header-botton">
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
            <div class="icon-title-title">查询结果</div>
          </div>
          <div class="someBtn">
            <div class="setUser" @click="saveBatch">批次有效期修改</div>
            <div class="setUser" @click="setExpire">设置临期值</div>
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
            <el-table-column prop="orgName" label="委托公司" align="left">
            </el-table-column>
            <el-table-column
              prop="prodCode"
              label="产品编码"
              align="left"
              width="160"
            >
            </el-table-column>
            <el-table-column
              prop="prodName"
              label="产品名称"
              align="left"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="specName"
              label="产品规格"
              align="center"
              width="150"
              min-width="150"
            >
            </el-table-column>
            <el-table-column
              prop="braName"
              label="品牌"
              align="center"
              width="190"
              min-width="190"
            >
            </el-table-column>
            <el-table-column
              prop="currInventory"
              label="存储区库存"
              align="center"
              sortable
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="batchNo"
              label="入库批次号"
              align="center"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="enableStatus"
              label="批次状态"
              align="center"
              sortable
              width="150"
            >
              <template slot-scope="scpoe">
                <div class="canuseNum">
                  {{ scpoe.row.outOfProdNum }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="manuTime"
              label="生产日期"
              align="center"
              sortable
              width="160"
            >
            </el-table-column>
            <el-table-column
              prop="qualityDate"
              label="保质期(月)"
              align="center"
              width="150"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="expireTime"
              label="到期日期"
              align="center"
              width="160"
            >
            </el-table-column>
            <el-table-column
              prop="expireTime"
              label="临期值"
              align="center"
              width="100"
              min-width="100"
              ><template slot-scope="scpoe">
                <div>
                  {{ scpoe.row.expireTime }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="isExpire"
              label="是否到期"
              align="center"
              width="160"
              min-width="160"
            >
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
      </div>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      custom-class="animate__animated animate__zoomIn"
    >
      <div class="dialogBox">
        <div class="boxTitle">
          <span>基础信息</span>
        </div>
        <div class="boxContent">
          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title addStar">委托公司</div>
              <el-input
                v-model="dialogorgName"
              ></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title addStar">产品编码</div>
              <el-input
                v-model="dialogProdCode"
              ></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title addStar">产品名称</div>
              <el-input
                v-model="dialogProdName"
              ></el-input>
            </div>
          </div>
          <div class="content_one">
            
            <div class="name_con">
              <div class="name_con_title addStar">产品规格</div>
              <el-input
                v-model="dialogProdSpec"
              ></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title addStar">存储区库存</div>
              <el-input
                v-model="dialogInventory"
              ></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title addStar">生产日期</div>
              <el-input
                v-model="dialogManuTime"
                placeholder="请输入物料名称"
              ></el-input>
            </div>
          </div>
          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title addStar">物料名称</div>
              <el-input
                v-model="dialogMateName"
                placeholder="请输入物料名称"
              ></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title addStar">物料名称</div>
              <el-input
                v-model="dialogMateName"
                placeholder="请输入物料名称"
              ></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title addStar">物料编号</div>
              <el-input
                v-model="dialogMateCode"
                placeholder="请输入物料编号"
              ></el-input>
            </div>
          </div>
          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title addStar">物料名称</div>
              <el-input
                v-model="dialogMateName"
                placeholder="请输入物料名称"
              ></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title addStar">物料名称</div>
              <el-input
                v-model="dialogMateName"
                placeholder="请输入物料名称"
              ></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title addStar">物料编号</div>
              <el-input
                v-model="dialogMateCode"
                placeholder="请输入物料编号"
              ></el-input>
            </div>
          </div>
          <div class="content_one">
            <div class="remarkInforTitle">纠错数量</div>
            <el-input
              placeholder="请输入纠错数量"
              v-model="errorNum"
            >
            </el-input>
          </div>
          <div class="remarkInforBox content_one">
            <div class="remarkInforTitle">备注信息</div>
            <el-input
              type="textarea"
              placeholder="请输入备注信息"
              v-model="remarkInfor"
              maxlength="100"
              show-word-limit
            >
            </el-input>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <div @click="dialogFormVisible = false" class="quxiaoBox">取 消</div>
        <div @click="okBtn" class="sureBtn">提 交</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/*eslint-disable */
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { usefulLifeManagment, setExpireTime } from "../../api/api";
import { clearTimeInput, reduceFun } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      title: "批次有效期修改",
      dialogFormVisible: false,
      errorNum:"",
      dialogorgName:"",
      dialogProdCode:"",
      dialogProdName:"",
      dialogProdSpec:"",
      dialogInventory:"",
      dialogManuTime:"",


      entrustCompany: "",
      productCode: "",
      productName: "",
      specName: "",
      braName: "",
      batchNos: "",
      batchState: "",
      batchNos: "",
      entrustCompanyData: [],
      specNameData: [],
      isExpire: [],
      braNameData: [],
      batchStateData: [
        {
          value: "1",
          label: "开启",
        },
        {
          value: "2",
          label: "停用",
        },
      ],
      isExpireData: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "2",
          label: "否",
        },
      ],
      tableData: [],
      multipleSelection: [],
      queryData: {
        pageNumber: "1",
        pageSize: "10",
        paras: {
          orgId: "",
          prodCode: "",
          prodName: "",
          specId: "",
          prodType: "",
          batchNo: "",
          braId: "",
          batchStatus: "",
          isExpire: "",
        },
      },
      queryDataAll: {
        pageNumber: "1",
        pageSize: "99999999",
        paras: {},
      },
      pageComponentsData: {
        pageNums: 0,
      },
    };
  },
  computed: {
    // isExpireFun(manuTime, expireTime) {
    // //   let isExpire =
    // //     expireTime.split(" ")[0] - manuTime.split(" ")[0] > 0 ? "否" : "是";
    // },
  },
  mounted() {
    this.pageQueryFun();

    this.entrustCompanyData = this.$store.state.orgInfor.orgInforData;
  },
  methods: {
    pageQueryFun() {
      usefulLifeManagment(this.queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData.forEach((v) => {});
        }
      });
    },
    entrustCompanys(val) {
      this.queryData.paras.orgId = val;
    },
    specNames(val) {
      this.queryData.paras.specName = val;
    },
    braNames(val) {
      this.queryData.paras.braId = val;
    },
    batchStates(val) {
      this.queryData.paras.braId = val;
    },
    isExpires(val) {
      this.queryData.paras.braId = val;
    },
    clickQuery() {
      //点击查询
      this.queryData.paras.prodName = this.productName;
      this.queryData.paras.prodCode = this.productCode;
      this.queryData.paras.inventoryFloor = this.warningVal;
      this.pageQueryFun();
    },
    clearInput() {
      //点击清空输入框
      clearTimeInput();
      Object.keys(this.queryData.paras).forEach((v) => {
        this.queryData.paras[v] = "";
      });
      this.pageQueryFun();
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    okBtn() {
      this.dialogFormVisible = false;
    },
    saveBatch() {
      //批次有效期修改
      this.dialogFormVisible = true;
    },
    setExpire() {
      //设置临期值
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择产品",
          type: "warning",
        });
      if (this.multipleSelection.length > 1)
        return this.$messageSelf.message({
          message: "一次只能选择一个",
          type: "warning",
        });

      this.$messageSelf
        .prompts("产品临期值", "设置产品临期值", {
          inputValidator: (num) => {
            if (num === null) {
              return "请输入预警值";
            } else if (!/^\d+$/.test(num)) {
              return "输入数据不合法";
            }
          },
        })
        .then(({ value }) => {
          this.setRequest({
            id: this.multipleSelection[0].id,
            expireTime: value,
          });
        })
        .catch(() => {});
    },
    setRequest(data) {
      setExpireTime(data).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.$messageSelf.message({ message: "修改成功", type: "success" });
          this.pageQueryFun();
        } else {
          this.$messageSelf.message({ message: "修改失败", type: "error" });
        }
      });
    },
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
      this.pageQueryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
#indateMangement {
  padding: 20px 10px;
  background: #eef1f8;
}
.headerHtml {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px;
  transition: 0.3s;
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
    margin-bottom: 16px;
    display: flex;
    align-items: flex-end;
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
  margin: 4px 0 0 0;
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
      .setUser {
        @include BtnFunction("success");
        margin-left: 10px;
      }
    }
  }
  .resultForm {
    padding: 16px 20px;
  }
}
</style>
<style lang="scss">
.entrustCompany {
  .el-select {
    width: 100%;
  }
}
</style>
<style lang="scss">
@import "../../assets/scss/btn.scss";

#indateMangement {
  .el-dialog {
    width: 900px;
    height: 566px;
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
      height: 436px;
      border-top: 1px solid #d1d6e2;
      border-bottom: 1px solid #d1d6e2;
      padding: 0 20px;
      .dialogBox {
        .boxTitle span {
          line-height: 56px;
          font-size: 16px;
          color: #5bb2fe;
          font-weight: 600;
          margin-left: 10px;
          position: relative;
        }
        .boxTitle span::before {
          content: "";
          width: 3px;
          height: 100%;
          background: #5bb2fe;
          position: absolute;
          left: -10px;
          top: 0px;
        }
        .boxContent {
          .content_one {
            display: flex;
            .name_con {
              display: flex;
              margin-bottom: 16px;
              border: 1px solid #d1d6e2;
              border-radius: 3px;
              margin-right: 20px;
              .name_con_title {
                width: 104px;
                background: #ecf1f7;
                border-right: 1px solid #d1d6e2;
                line-height: 36px;
                color: #000;
                text-align: center;
              }
              .el-input {
                width: 167px;
                .el-input__inner {
                  border: none;
                  color: #000;
                }
              }
            }
          }
          .remarkInforBox {
            border: 1px solid #d1d6e2;
            border-radius: 3px;
            .remarkInforTitle {
              width: 104px;
              background: #ecf1f7;
              border-right: 1px solid #d1d6e2;
              line-height: 84px;
              padding: 0 16px;
              color: #000;
            }
            .el-textarea__inner {
              border: none;
            }
          }
          .addStar {
            position: relative;
          }
          .addStar::before {
            content: "*";
            color: red;
            position: absolute;
            left: 15px;
            top: 3px;
          }

          .addStar1 {
            position: relative;
          }
          .addStar1::before {
            content: "*";
            color: red;
            position: absolute;
            left: 30px;
            top: 3px;
          }

          .addStar2 {
            position: relative;
          }
          .addStar2::before {
            content: "*";
            color: red;
            position: absolute;
            left: 10px;
            top: 3px;
          }
        }
      }
    }
    .el-dialog__footer {
      width: 100%;
      height: 76px;
      padding: 0 20px;
      .dialog-footer {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .quxiaoBox {
          @include BtnFunction();
        }
        .sureBtn {
          @include BtnFunction("success");
          margin-left: 10px;
        }
      }
    }
  }
}
</style>