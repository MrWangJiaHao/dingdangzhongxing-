<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox">
        <div class="closeTitle">
          {{ !edif ? "编辑采购单" : "创建采购单" }}
        </div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>

      <div class="centerBox">
        <div class="setTitle">
          {{ !edif ? "编辑采购单" : "创建采购单" }}
        </div>
        <div class="gerxinxiBox">
          <div class="xinxiBitian">
            <div>
              <div class="displayalign ellipsis">
                <div class="noneIconTitle mr11">委托公司:</div>
                <div class="mr20">
                  <el-select
                    v-model="companyJson.value"
                    @focus="getCompanyJsonAndArr"
                    @change="changeCompany"
                    placeholder="请选择委托公司"
                  >
                    <el-option
                      v-for="(item, idx) in companyJson.companyArr"
                      :key="idx"
                      :label="item.orgName"
                      :value="idx"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <!-- 委托公司 -->
            <div>
              <div class="displayalign ellipsis">
                <div class="noneIconTitle mr11">
                  期望到货时间<span style="color: red">*</span> :
                </div>
                <div class="mr20">
                  <dateTime
                    :dateTimeData="datetimeDate"
                    @getDateTime="getexpectedArrivalTime"
                  />
                </div>
              </div>
            </div>
            <!-- 期望到货时间 getFindOrgChildWare -->
          </div>
          <div class="dispalyFlex mb20">
            <div class="noneIconTitle mr11 fosi0">
              <span class="fosi14" style="visibility: hidden">你好</span>
              <span class="fosi14">备注</span>
              <span class="fosi14" style="visibility: hidden">好</span>
              <span class="fosi14">:</span>
            </div>
            <div class="bzTetxArea">
              <textarea
                placeholder="请输入备注"
                v-model="createUserData.remark"
                maxlength="200"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <!-- 个人信息 -->
      <div class="pd20">
        <div class="setTitle">产品明细</div>
        <div class="mb20 tr">
          <div class="tijiaoBox disinb mr20" @click="addChanpin">添加产品</div>
          <div class="quxiaoBox disinb" @click="goClearRemove">删除</div>
        </div>
        <div class="mb20" style="height: 200px">
          <el-table
            ref="multipleTable"
            :data="tabledata"
            :stripe="true"
            :border="true"
            tooltip-effect="dark"
            style="width: 100%; height: 100%; overflow-y: auto"
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
              prop="prodCode"
              show-overflow-tooltip
            />
            <el-table-column
              label="产品名称"
              width="119"
              property="prodName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              width="119"
              label="产品规格"
              prop="specName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="品牌"
              width="119"
              prop="braName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="销售仓可用库存"
              width="119"
              prop="braName"
              show-overflow-tooltip
            ></el-table-column>

            <el-table-column
              label="低库存预警值"
              width="119"
              prop="currInventory"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="高库存预警值"
              width="119"
              prop="maxNum"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="申请采购数量**"
              width="119"
              prop="prodNum"
              show-overflow-tooltip
            >
              <el-input slot-scope="scope" v-model="scope.row.prodNum">
              </el-input>
            </el-table-column>
            <el-table-column
              label="期望到货时间*"
              prop="recommendSeatNo"
              show-overflow-tooltip
              width="180"
            >
              <div slot-scope="scope" @click="tablesClickDatas(scope.row)">
                <dateTime :dateTimeData="datetimeDate" />
              </div>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 账号信息 -->
      <div class="displayCenter mb20">
        <div class="quxiaoBox mb20 mr20" @click="closeBtn">取消</div>
        <div class="tijiaoBox mb20" @click="goAJAXCreate">提交</div>
      </div>
      <!-- btn -->
      <!-- 添加产品 start -->
      <div v-if="addChanpins" class="bjBox">
        <transition
          enter-active-class="animate__animated animate__zoomIn"
          leave-active-class="animate__animated animate__zoomOut"
        >
          <div v-if="addChanpins">
            <choiceSelect />
          </div>
        </transition>
      </div>
      <!-- 添加产品 end -->
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import dateTime from "../../components/commin/dateTime"; //用户管理下拉框
import { Message } from "element-ui";
import { getCookie, _isJsonEmit } from "../../utils/validate";
import {
  getpCommonFindOrgByWareId,
  getpPurchaseOrdersaveRecord,
} from "../../api/api";
import choiceSelect from "../../components/purchasingZhujian/choiceSelect";
export default {
  name: "createUsering",
  components: {
    choiceSelect,
    dateTime,
  },
  data() {
    return {
      companyJson: {
        companyArr: [],
        value: "",
      },
      datetimeDate: {
        placeholder: "期望到货时间",
      },
      multipleSelection: [],
      tabledata: [],
      addChanpins: false,
      ziCangJson: {
        value: "",
        ziCangArr: [],
      },
      createUserData: {
        putstatus: "0",
        disposeStatus: "0", //处理状态
        expectedSendTime: "", //期望入库时间
        operatorType: 1,
        wareId: getCookie("X-Auth-wareId"),
        remark: "",
        wareAreaId: "",
        wareAreaName: "",
        orgId: "",
        orgName: "",
        childWareName: "",
        pOutWarehouseDetails: [],
        expectedArrivalTime: "", //期望到货时间
        recommendSeatNo: [],
        id: (() => {
          return this.$route.query.id ? this.$route.query.id : "";
        })(), //编辑
      },
      tables: [],
      edif: false,
    };
  },
  props: {
    editDataJson: {
      type: Object,
      default: () => {},
    },
  },
  async created() {
    this.edif = _isJsonEmit(this.editDataJson);
    if (this.edif) {
      this.changeEditData();
    }
  },
  watch: {
    addChanpins(n) {
      if (!n) {
        this.tables = eval(sessionStorage.getItem("_addTablesData"));
        if (this.tables) {
          this.tables.forEach((item) => {
            item.prodId = item.id;
          });
          this.tabledata = this.tables;
          this.createUserData.pOutWarehouseDetails = this.tables;
        }
      }
    },
  },
  methods: {
    changeEditData() {
      console.log(this.editDataJson);
    },
    tablesClickDatas(e) {
      console.log(e);
    },

    //点击选择委托公司
    async getCompanyJsonAndArr() {
      console.log(this.createUserData, "this.createUserData点击委托公司");
      this.createUserData.wareAreaId = "";
      this.createUserData.childWareId = "";
      let datas = await getpCommonFindOrgByWareId();
      this.companyJson.companyArr = datas.result;
    },
    getexpectedArrivalTime(e) {
      this.createUserData.expectedArrivalTime = e;
    },
    //改变委托公司
    changeCompany(e) {
      this.createUserData.orgId = this.companyJson.companyArr[e].id;
      this.createUserData.orgName = this.companyJson.companyArr[e].orgName;
    },
    goClearRemove() {
      this.multipleSelection.forEach((item) => {
        let idxs = this.tabledata.indexOf(item);
        this.tabledata.splice(idxs, 1);
        sessionStorage.setItem(
          "_addTablesData",
          JSON.stringify(this.tabledata)
        );
      });
    },
    //点击了添加产品
    addChanpin() {
      if (!this.createUserData.expectedArrivalTime)
        return Message("请选择期望到货时间");
      this.addChanpins = true;
    },
    //关闭
    closeBtn() {
      this.$parent._data.isCreatePurchasing = false;
    },
    handleSelectionChange(e) {
      this.multipleSelection = e;
    },
    //点击了提交
    async goAJAXCreate() {
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      if (!this.multipleSelection.length)
        return Message("请选择要创建的产品明细");
      this.createUserData.detail = this.multipleSelection;
      let datas = await getpPurchaseOrdersaveRecord(this.createUserData);
      if (datas.code == "10000") {
        Message(datas.msg);
        sessionStorage.removeItem("_addTablesData");
        sessionStorage.removeItem("createManagementChildWareId");
        this.$parent.getTableData();
        this.closeBtn();
      }
    },
    getUserType(e) {
      //获取创建的用户类型
      this.createUserData.codeValue = e.codeValue;
      this.createUserData.roleId = e.roleId;
    },
  },
};
</script>

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

  .addChanpinClass {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 980px;
    z-index: 44;
    background: #f8f8f8;
    transform: translate(-50%, -50%);
  }

  .setUserIngBoxCenter {
    position: relative;
    left: 50%;
    top: 144px;
    transform: translateX(-50%);
    background: #fff;
    width: 1000px;

    .centerBox {
      padding: 30px 20px;
    }

    .setTitle {
      margin-bottom: 18px;
    }

    .gerxinxiBox {
      display: flex;
      flex-direction: column;

      > div {
        margin-bottom: 18px;
      }

      .xinxiBitian {
        display: flex;
        align-items: center;

        > div {
          margin-right: 20px;
        }
      }
    }

    .cityBoxCenter {
      display: flex;
      align-items: center;
    }
  }

  .textAreaBox {
    font-size: 14px;
    width: 72%;
    height: 40px;
    margin-left: 80px;

    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
    }

    margin-bottom: 30px;
  }

  .bzTetxArea {
    font-size: 14px;
    width: 72%;
    height: 80px;

    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 30px;
      overflow: hidden;
    }
  }

  .quxiaoBox {
    @include BtnFunction("error");
  }

  .tijiaoBox {
    @include BtnFunction("success");
  }
}
</style>
