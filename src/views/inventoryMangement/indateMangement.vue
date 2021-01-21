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
              <el-input v-model="productName" placeholder="请输入产品名称">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">产品编码：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="productCode" placeholder="请输入产品编码">
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
              <el-input v-model="batchNos" placeholder="请输入批次号"> </el-input>
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
            <el-table-column
              type="selection"
              width="82"
              align="center"
              fixed="left"
            >
            </el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="71"
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
              prop="batchStatus"
              label="批次状态"
              align="center"
              sortable
              width="150"
            >
              <template slot-scope="scpoe">
                <div class="canuseNum">
                  <el-switch
                    v-model="scpoe.row.batchStatus"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0"
                    :width="50"
                    disabled
                  >
                  </el-switch>
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
              prop="AdventValue"
              label="临期值"
              align="center"
              width="100"
              min-width="100"
            >
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
              <div class="name_con_title">
                <span class="addStar">委托公司</span>
              </div>
              <el-input v-model="dialogorgName" disabled></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">产品编码</span>
              </div>
              <el-input v-model="dialogProdCode" disabled></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">产品名称</span>
              </div>
              <el-input v-model="dialogProdName" disabled></el-input>
            </div>
          </div>
          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">产品规格</span>
              </div>
              <el-input v-model="dialogProdSpec" disabled></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">存储区库存</span>
              </div>
              <el-input v-model="dialogInventory" disabled></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">生产日期</span>
              </div>
              <el-input v-model="dialogManuTime" disabled></el-input>
            </div>
          </div>
          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">到期日期</span>
              </div>
              <el-input v-model="dialogExpireTime" disabled></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">保质期(月)</span>
              </div>
              <el-input v-model="dialogQualityDate" disabled></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">库存编号</span>
              </div>
              <el-input v-model="dialogSeatCode" disabled></el-input>
            </div>
          </div>

          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">正确批次号</span>
              </div>
              <el-input
                v-model="dialogBatchNo"
                placeholder="请输入批次号"
              ></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">纠错数量</span>
              </div>
              <el-input
                v-model="errorNum"
                placeholder="请输入纠错数量"
              ></el-input>
            </div>
          </div>
          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">正确生产日期</span>
              </div>
              <div class="rightBox">
                <dateTime
                  :dateTimeData="datetimeDates"
                  @getDateTime="getStartTime"
                  ref="startTime"
                />
              </div>
            </div>
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">正确到期日期</span>
              </div>
              <div class="rightBox">
                <dateTime
                  :dateTimeData="datetimeDates1"
                  @getDateTime="getEndTime"
                  ref="endTime"
                />
              </div>
            </div>
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
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { usefulLifeManagment, setExpireTime, setIndate } from "../../api/api";
import { clearTimeInput } from "../../utils/validate";
import dateTime from "../../components/commin/dateTime.vue"; //时间

export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      batchStatusValue: "",
      title: "批次有效期修改",
      dialogFormVisible: false,
      errorNum: "",
      dialogorgName: "",
      dialogProdCode: "",
      dialogProdName: "",
      dialogProdSpec: "",
      dialogInventory: "",
      dialogManuTime: "",
      dialogExpireTime: "",
      dialogQualityDate: "",
      dialogSeatCode: "",
      dialogBatchNo: "",
      remarkInfor: "",
      datetimeDates: {
        placeholder: "请选择正确生产日期",
      },
      datetimeDates1: {
        placeholder: "请选择正确到期日期",
      },
      entrustCompany: "",
      productCode: "",
      productName: "",
      specName: "",
      braName: "",
      batchState: "",
      batchNos: "",
      expireTime: "", //临期值
      manuTime: "", //生产日期
      id: "",
      // batchStatusValue:"1",//批次状态开关
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
          value: "0",
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
      tableData: [
        // {
        //   batchStatus:1
        // }
      ],
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
  mounted() {
    this.pageQueryFun();
    this.entrustCompanyData = this.$store.state.orgInfor.orgInforData;
  },
  methods: {
    pageQueryFun() {
      usefulLifeManagment(this.queryData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData.forEach((v) => {
            v.isExpire = this.isExpireFun(v.expireTime);
            v.qualityDate = this.qualityDateFun(v.expireTime, v.manuTime);
          });
        }
      });
    },
    isExpireFun(data) {
      let nowDate = new Date();
      let isExpireState = "";
      if (data > nowDate) {
        isExpireState = "是";
      } else {
        isExpireState = "否";
      }
      return isExpireState;
    },
    qualityDateFun(manuTime, expireTime) {
      let dateNum = "";
      let diff = new Date(manuTime) - new Date(expireTime);
      dateNum = parseInt(diff / (1000 * 60 * 60 * 12 * 30));
      return dateNum;
    },
    entrustCompanys(val) {
      this.queryData.paras.orgId = val;
    },
    specNames(val) {
      this.queryData.paras.specId = val;
    },
    braNames(val) {
      this.queryData.paras.braId = val;
    },
    batchStates(val) {
      this.queryData.paras.batchStatus = val;
    },
    isExpires(val) {
      this.queryData.paras.isExpire = val;
    },
    clickQuery() {
      //点击查询
      this.queryData.paras.prodName = this.productName;
      this.queryData.paras.prodCode = this.productCode;
      this.queryData.paras.batchNo = this.batchNos;
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
      if (this.dialogBatchNo === "")
        return this.$messageSelf.message({
          message: "请输入正确的批次号",
          type: "warning",
        });
      if (this.errorNum === "")
        return this.$messageSelf.message({
          message: "请输入纠错数量",
          type: "warning",
        });
      if (this.manuTime === "")
        return this.$messageSelf.message({
          message: "请选择正确的生产日期",
          type: "warning",
        });
      if (this.expireTime === "")
        return this.$messageSelf.message({
          message: "请选择正确的到期日期",
          type: "warning",
        });
      //正则验证
      // if (!/dswsaasdf/.test(this.dialogBatchNo)) {
      //   return this.$messageSelf.message({
      //     message: "批次号格式有误",
      //     type: "warning",
      //   });
      // }
      // if (!/dswsaasdf/.test(this.errorNum)) {
      //   return this.$messageSelf.message({
      //     message: "纠错数量格式有误",
      //     type: "warning",
      //   });
      // }
      this.dialogFormVisible = false;
      let data = {
        id: this.id,
        expireTime: this.expireTime,
        manuTime: this.manuTime,
        batchNo: this.dialogBatchNo,
        remark: this.remarkInfor,
      };
      setIndate(data).then((ok) => {
        // console.log(ok)
        if (ok.data.code === "10000") {
          this.$messageSelf.message({ message: "修改成功", type: "success" });
          this.pageQueryFun();
        } else {
          this.$messageSelf.message({ message: "修改失败", type: "error" });
        }
      });
    },
    saveBatch() {
      //批次有效期修改
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
      this.dialogFormVisible = true;
      let selectData = this.multipleSelection[0];
      this.id = selectData.id;
      this.dialogorgName = selectData.orgName;
      this.dialogProdCode = selectData.prodCode;
      this.dialogProdName = selectData.prodName;
      this.dialogProdSpec = selectData.specName;
      this.dialogInventory = selectData.currInventory;
      this.dialogManuTime = selectData.manuTime;
      this.dialogExpireTime = selectData.expireTime;
      this.dialogQualityDate = selectData.qualityDate;
      this.dialogSeatCode = selectData.wareSeatCode;
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
        .prompts("", "设置产品临期值", {
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
    getStartTime(e) {
      this.manuTime = e;
    },
    getEndTime(e) {
      this.expireTime = e;
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
                width: 105px;
                background: #ecf1f7;
                border-right: 1px solid #d1d6e2;
                line-height: 34px;
                color: #000;
                text-align: right;
                padding: 0 10px 0 0;
                white-space: nowrap;
              }
              .rightBox {
                width: 190px;
                .ivu-input {
                  border: none;
                }
              }
              .el-input {
                width: 166px;
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
              text-align: right;
              width: 114px;
              background: #ecf1f7;
              border-right: 1px solid #d1d6e2;
              line-height: 84px;
              padding: 0 16px;
              color: #000;
            }
            .el-textarea {
              width: 746px;
              .el-textarea__inner {
                border: none;
              }
            }
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