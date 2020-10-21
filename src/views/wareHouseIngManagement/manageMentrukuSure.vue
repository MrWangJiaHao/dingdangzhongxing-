<template>
  <div class="setUserIngBox" id="manageMenyrukuSure">
    <div class="setUserIngBoxCenter">
      <div class="headerBox">
        <div class="closeTitle">入库确认</div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>

      <div class="centerBox">
        <div class="setTitle">入库确认</div>
        <div class="gerxinxiBox">
          <div class="xinxiBitian">
            <div class="dispalywrap rukuquerenparent">
              <div
                v-for="(key, item, idx) in rukuSure"
                :key="idx"
                class="displayalign parentBox"
              >
                <div class="titleBox" v-html="shezhizitiwiered(item)"></div>
                <div class="centersBox">
                  <div v-if="item == '*入库人'">
                    <input
                      v-model="createUserData.putUser"
                      class="input"
                      placeholder="请输入入库人"
                    />
                  </div>
                  <div v-else-if="item == '*入库时间'">
                    <dateTime
                      :dateTimeData="dateTimeData"
                      @getDateTime="getDateTimeExpectedSendTime"
                    />
                  </div>
                  <div v-else-if="item == '*批次号'">
                    <input
                      v-model="createUserData.batchNo"
                      class="input"
                      placeholder="请输入批次号"
                    />
                  </div>
                  <div v-else>
                    {{ key() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 个人信息 -->
      <div class="pd20">
        <div class="setTitle">产品明细</div>
        <div class="mb20 tr">
          <div class="tijiaoBox disinb mr20" @click="copyChanpin">复制产品</div>
          <div class="tijiaoBox disinb mr20" @click="addChanpin">添加产品</div>
          <div class="quxiaoBox disinb" @click="goClearRemove">删除</div>
        </div>
        <div class="mb20">
          <el-table
            ref="multipleTable"
            :data="tabledata"
            :stripe="true"
            @select="select"
            :border="true"
            tooltip-effect="dark"
            style="width: 100%; overflow: auto"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="82"></el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="71"
              :index="indexMethod"
              show-overflow-tooltip
            />
            <el-table-column
              label="产品编码"
              prop="damagedNum"
              show-overflow-tooltip
            />
            <el-table-column
              label="产品名称"
              property="damagedNum"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="产品规格"
              prop="specName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="品牌"
              prop="braName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="申请入库数量"
              prop="braName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="存储区库位产品数量"
              prop="braName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="残次品库位产品数量"
              prop="damagedNum"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="存储区库位最大存放数"
              prop="damagedNum"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="残次品库位最大存放数"
              prop="damagedNum"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="推荐入库库位"
              prop="damagedNum"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="实际入库库位"
              prop="damagedNum"
              show-overflow-tooltip
            >
              <div slot-scope="scoped">
                <el-select
                  v-model="scoped.row.damagedNum"
                  placeholder="请选择实际入库库位"
                >
                  <el-option
                    v-for="item in prodUnitData"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-table-column>
            <el-table-column
              label="实际入库数量*"
              prop="actualNum"
              show-overflow-tooltip
            >
              <div slot-scope="scope">
                <el-input
                  v-model="scope.row.actualNum"
                  placeholder="实际入库数量"
                ></el-input>
              </div>
            </el-table-column>
            <el-table-column
              label="残次品数量"
              prop="actualNum"
              show-overflow-tooltip
            >
              <div slot-scope="scoped">
                <el-input
                  v-model="scoped.row.acyualNum"
                  placeholder="请输入残次品数量"
                ></el-input>
              </div>
            </el-table-column>
            <el-table-column
              label="残次品库位"
              prop="actualNum"
              show-overflow-tooltip
            >
              <div slot-scope="scoped">
                <el-select
                  v-model="scoped.row.damagedNum"
                  placeholder="请选择残次品库位"
                >
                  <el-option
                    v-for="item in prodUnitData"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-table-column>
            <el-table-column
              label="生产日期"
              prop="actualNum"
              show-overflow-tooltip
              width="200"
            >
              <div slot-scope="scoped">
                <dateTime
                  :dateTimeData="dateTimeData"
                  v-model="scoped.row.actualNum"
                  @getDateTime="getDateSelectTime"
                />
              </div>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
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
      <!-- 备注 -->
      <!-- 账号信息 -->
      <div class="displayCenter mb20">
        <div class="quxiaoBox mr20" @click="closeBtn">取消</div>
        <div class="tijiaoBox" @click="goAJAXCreate">提交</div>
      </div>
      <!-- btn -->
      <!-- 添加产品 start -->
      <transition name="fade">
        <div v-show="addChanpins" ref="parentSelect" class="addChanpinClass">
          <choiceSelect ref="childSelect" />
        </div>
      </transition>
      <!-- 添加产品 end -->
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import searchBox from "../../components/commin/searchBox"; //搜索框
import dropDowbox from "../../components/commin/dropDownBox"; //下拉框
import dropDownUserType from "../../components/commin/dropDownUserType"; //用户管理下拉框
import dateTime from "../../components/commin/dateTime"; //用户管理下拉框
import { mapState } from "vuex";
import { Message } from "element-ui";
import { isMobile, isEmail } from "../../utils/validate";
import {
  post,
  getFindWareOrg,
  getFindOrgChildWare,
  getfindOrgProductPage,
  getFindWarehouseProduct,
  getSaveRecord,
} from "../../api/api";
import choiceSelect from "../../components/manual/choiceSelect";
export default {
  name: "createUsering",
  components: {
    dropDowbox,
    searchBox,
    dropDownUserType,
    choiceSelect,
    dateTime,
  },
  data() {
    return {
      companyJson: {
        companyArr: [],
        value: "",
      },
      self: this,
      datetimeDate: {
        placeholder: "请选择预期入库时间",
        title: "",
      },
      dateTimeData: {
        placeholder: "请选择入库时间",
      },
      rukuSure: {
        入库单号: () => this.listJson.putWareNo,
        委托公司: () => this.listJson.orgName,
        入库状态: () => (this.listJson.putstatus ? "已入库" : "未入库"),
        入库类型: () => this.$route.query.WarehousingTypeArr,
        "*入库人": "",
        "*入库时间": "",
        "*批次号": "",
        关联单号: () => this.listJson.orderNo,
      },
      multipleSelection: [],
      tabledata: [],
      addChanpins: false,
      ziCangJson: {
        value: "",
        ziCangArr: [],
      },
      createUserData: {
        userType: 4,
        userAddr: "",
        address: "",
        expectedSendTime: "", //expectedSendTime
        orderSource: "", //订单类型(0-手工创建；1-渠道创建 2-预入库 3-采购 4-库建调拨 5-加工作业 6-分解作业 7-退货 8-盘盈 9-其他）
        orgName: "",
        roleId: "",
        parentId: "",
        orgId: "",
        putUser: "",
        waerId: "",
        codeValue: "",
        detailList: [],
        createUser: "",
        createTime: "",
        batchNo: "",
        id: this.$route.query.id,
        operatorType: 3,
        wareId: this.$cookie.get("X-Auth-wareId"),
      },
      getProvinceData: {
        parentCode: 0,
      },
      prodUnitData: [],
      tables: [],
      listJson: JSON.parse(sessionStorage.getItem("listArrs")),
      chanpinCenter: {},
    };
  },
  async created() {
    this._getFindWarehouseProduct(this.$route.query.id);
    this.tabledata = this.listJson.detailList;
    this.tables = eval(sessionStorage.getItem("_addTablesData"));
    if (this.tables) {
      this.tables.forEach((item) => {
        item.prodId = item.id;
      });
      this.tabledata = this.tabledata.concat(this.tables);
    }
  },
  //getFindWarehouseProduct
  methods: {
    indexMethod(e) {
      return e;
    },
    //删除产品
    goClearRemove() {
      console.log(this.multipleSelection, "点击了删除");
    },
    //copy产品
    copyChanpin() {
      if (this.multipleSelection.length == 0) {
        return Message("请选择要复制的产品");
      } else if (this.multipleSelection.length != 1) {
        return Message("每次只能复制一个产品");
      } else {
        let idxs = this.tabledata.indexOf(this.multipleSelection[0]);
        let copyIdxs = this.multipleSelection[0];
        this.tabledata.splice(idxs, 0, copyIdxs);
        this.$refs.multipleTable.toggleRowSelection(this.tabledata[idxs+1]);
      }
      console.log('this.tabledata', this.tabledata)
    },
    select(e, row) {
      console.log(e, row, "select");
    },
    getDateSelectTime(e) {
      console.log(e, "el-input");
    },
    shezhizitiwiered(item) {
      let idxs = item.indexOf("*");
      if (idxs != -1) {
        item =
          `<span style="color:red;">${item[idxs]}</span>` +
          item.substring(idxs + 1);
      }
      return item;
    },
    getkuweimes() {
      console.log(1);
    },
    //点击选择委托公司
    async getCompanyJsonAndArr() {
      let datas = await getFindWareOrg();
      this.companyJson.companyArr = datas.result;
    },
    getDateTimeExpectedSendTime(e) {
      this.createUserData.expectedSendTime = e;
    },
    //改变委托公司
    changeCompany(e) {
      console.log(e, this.companyJson.companyArr[e]);
      this.createUserData.orgId = this.companyJson.companyArr[e].id;
      this.createUserData.orgName = this.companyJson.companyArr[e].orgName;
    },
    //点击了子仓名称
    async getZiCangJsonAndArr() {
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      let datas = await getFindOrgChildWare(this.createUserData.orgId);
      this.ziCangJson.ziCangArr = datas.result;
    },
    //点击了添加产品
    addChanpin() {
      this.addChanpins = true;
    },
    //关闭
    closeBtn() {
      this.$router.go(-1);
    },
    handleSelectionChange(e) {
      this.multipleSelection = e;
    },
    //点击了提交
    goAJAXCreate() {
      this.createUserData.detailList = this.multipleSelection;
      if (!this.createUserData.putUser) return Message("请输入入库人");
      if (!this.createUserData.expectedSendTime)
        return Message("请输入入库时间");
      if (!this.createUserData.batchNo) return Message("请输入批次号");
      this._getSaveRecord(this.createUserData).then((res) => {
        if (res.code == "10000") {
          Message(res.msg);
          this.closeBtn();
        } else {
          Message(res.msg);
        }
      });
    },
    async _getSaveRecord(data) {
      let datas = await getSaveRecord(data);
      return datas;
    },
    //getSaveRecord
    getUserType(e) {
      //获取创建的用户类型
      this.createUserData.codeValue = e.codeValue;
      this.createUserData.roleId = e.roleId;
    },
    async _getChanping() {
      let datas = await getfindOrgProductPage(this.createUserData);
      console.log(datas);
    },
    async _getFindWarehouseProduct(id) {
      let datas = await getFindWarehouseProduct(id);
      return (this.chanpinCenter = datas.result);
    },
  },
};
</script>
<style >
#manageMenyrukuSure
  .ivu-input-wrapper.ivu-input-wrapper-default.ivu-input-type.ivu-date-picker-editor {
  width: 172px;
  height: 28px;
}

#manageMenyrukuSure .ivu-input.ivu-input-default.ivu-input-with-suffix {
  border: 1px solid #d2d6e2;
  height: 28px;
  color: #333333;
  font-size: 14px;
  font-weight: normal;
  background: rgba(236, 241, 247, 0);
  border-radius: 2px;
}
</style>
<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";
.fade-enter-active,
.fade-leave-active {
  transition: transform 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0);
}
.input {
  border: 1px solid #d2d6e2;
  height: 28px;
  text-indent: 10px;
  color: #333333;
  font-size: 14px;
  font-weight: normal;
  background: rgba(236, 241, 247, 0);
  border-radius: 2px;
}
.rukuquerenparent {
  width: 100%;
  .parentBox {
    width: 33.3%;
    color: #333333;
    border: 1px solid #d1d6e2;
    .titleBox {
      padding: 12px 20px 12px 0;
      width: 106px;
      border-right: 1px solid #d1d6e2;
      background-color: #ecf1f7;
      text-align: right;
    }
  }
}
.setUserIngBox {
  background: rgb(232, 233, 236);
  padding: 0 10px;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
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
        flex-wrap: wrap;
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