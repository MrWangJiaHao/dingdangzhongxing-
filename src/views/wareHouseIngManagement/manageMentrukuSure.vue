<template>
  <div class="setUserIngBox">
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
                <div class="titleBox displayCenter">
                  {{ shezhizitiwiered(item) }}
                </div>
                <div class="centersBox">
                  <div v-if="item == '入库人*'">
                    <el-input placeholder="请输入入库人"></el-input>
                  </div>
                  <div v-else-if="item == '入库时间*'">
                    <el-input placeholder="请输入入库时间"></el-input>
                  </div>
                  <div v-else-if="item == '批次号*'">
                    <el-input placeholder="请输入批次号"></el-input>
                  </div>
                  <div v-else>
                    {{ key }}
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
          <div class="tijiaoBox disinb mr20" @click="addChanpin">复制产品</div>
          <div class="tijiaoBox disinb mr20" @click="addChanpin">添加产品</div>
          <div class="quxiaoBox disinb" @click="goAJAXCreate">删除</div>
        </div>
        <div class="mb20">
          <el-table
            ref="multipleTable"
            :data="tabledata"
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
              prop="prodcode"
              show-overflow-tooltip
            />
            <el-table-column
              label="产品名称"
              width="119"
              property="prodFullName"
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
              label="推荐库位产品数量"
              width="119"
              prop="putstatus"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="最大存放数"
              width="119"
              prop="putUser"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="入库数量*"
              width="119"
              prop="putStartTime"
              show-overflow-tooltip
            >
              <el-input slot-scope="scope" v-model="scope.row.putStartTime">
              </el-input>
            </el-table-column>
            <el-table-column
              label="推荐库位"
              prop="putEndTime"
              show-overflow-tooltip
              width="119"
            >
              <el-select
                slot-scope="scope"
                v-model="scope.row.putEndTime"
                placeholder="请选择库位"
                @focus="getkuweimes"
              >
                <el-option
                  v-for="item in prodUnitData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-table-column>
            <el-table-column
              label="期望入库时间"
              prop="expectedSendTime"
              show-overflow-tooltip
            >
              <div slot-scope="scope">
                <div @click="mes(scope.row, index)">
                  <dateTime
                    :dateTimeData="datetimeDate"
                    @getDateTime="getDateTimeExpectedSendTime(scope.row)"
                  />
                </div>
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
      datetimeDate: {
        placeholder: "请选择预期入库时间",
      },
      rukuSure: {
        入库单号: "CK20180904006",
        委托公司: "委托公司委托公司1",
        入库状态: "入库状态",
        入库类型: "采购",
        "入库人*": "",
        "入库时间*": "",
        "批次号*": "",
        关联单号: "CG20180923006",
      },
      multipleSelection: [],
      tabledata: [
        // {
        // orgName: "1", //委托公司
        // orgId: "1", //委托id
        // orderNo: "1", //原定单号（关联单号）
        // putWareNo: "1", //入库单号
        // putstatus: "1", //入库状态
        // prodCode: "1", //产品编码
        // prodName: "1", //产品名称
        // specName: "1", //规格名称
        // putStartTime: "1", //入库时间开始时间
        // putEndTime: "1", //入库时间结束时间
        // expectedSendStartTime: "1", //期望入库开始时间
        // expectedSendEndTime: "1", //期望入库时间结束时间
        // putUser: "1", //入库人
        // batchNo: "1",
        // },
      ],
      addChanpins: false,
      ziCangJson: {
        value: "",
        ziCangArr: [],
      },
      createUserData: {
        userType: 4,
        userAddr: "",
        roleId: "",
        parentId: "",
        orgId: "",
        waerId: "",
        codeValue: "",
        detailList: [],
      },
      getProvinceData: {
        parentCode: 0,
      },
      prodUnitData: [],
      tables: [],
    };
  },
  async created() {
    this.tables = eval(sessionStorage.getItem("_addTablesData"));
    this.tables.forEach((item) => {
      item.prodId = item.id;
    });
    this.tabledata = this.tables;
    this.createUserData.detailList = this.tables;
  },
  computed: {},
  methods: {
    shezhizitiwiered(item) {
      console.log(item);
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
      console.log(e);
    },
    mes(e) {
      console.log(e, "parent");
    },
    //改变委托公司
    changeCompany(e) {
      console.log(e, this.companyJson.companyArr[e]);
      this.createUserData.orgId = this.companyJson.companyArr[e].id;
      this.createUserData.orgName = this.companyJson.companyArr[e].orgName;
    },
    //点击了子仓名称
    async getZiCangJsonAndArr() {
      console.log(this.createUserData.orgId);
      if (!this.createUserData.orgId) return Message("请选择委托公司");
      let datas = await getFindOrgChildWare(this.createUserData.orgId);
      this.ziCangJson.ziCangArr = datas.result;
    },
    //改变了子仓名称
    changeziCang(e) {},
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
    async goAJAXCreate() {
      console.log(this.tabledata);
      let datas = await getfindOrgProductPage(this.createUserData);

      console.log(datas);
    },
    getUserType(e) {
      //获取创建的用户类型
      this.createUserData.codeValue = e.codeValue;
      this.createUserData.roleId = e.roleId;
    },
  },
};
</script>
<style lang="scss" >
.el-input__inner {
  padding: 0;
  height: 30px;
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
.rukuquerenparent {
  width: 100%;
  .parentBox {
    width: 33.3%;
    color: #333333;
    border: 1px solid #d1d6e2;
    .titleBox {
      padding: 12px 0;
      width: 106px;
      border-right: 1px solid #d1d6e2;
      background-color: #ecf1f7;
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