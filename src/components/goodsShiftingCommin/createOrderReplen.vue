<template>
  <div>
    <kuanjiaClick
      :titles="chuanjianJsonAndArr.title"
      @closeBtn="closeBtn"
      @clickSubmit="clickSubmit"
    >
      <template slot="centerKuanjia">
        <div>
          <createMonent :chuanjianJsonAndArr="chuanjianJsonAndArr" />
        </div>
        <!-- 创建补货单 -->
        <div class="mb16">
          <chanpinmingxi
            :chanpinminxiJson="chanpinminxiJson"
            @tableSelectArrs="tableSelectArr"
          >
            <template slot="anniuBtns">
              <span class="goOn mr11 inline" @click="isAddcreateChanpinShow"
                >添加产品</span
              >
              <span class="lodopFunClear inline" @click="removeItem">删除</span>
            </template>
          </chanpinmingxi>
        </div>
        <!-- 产品明细 -->
        <div class="pd20 mb16">
          <remarksInput
            @changeInputs="changeInputs"
            :searchCenter="searchCenter"
          />
        </div>
        <!-- 备注 -->
      </template>
    </kuanjiaClick>
    <div v-show="isAddcreateChanpin" class="bjBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div v-if="isAddcreateChanpin">
          <addTianjiaChanpin :sendoutJson="sendoutJson" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import kuanjiaClick from "../commin/kuanjiaClick"; //点击架子
import createMonent from "../commin/createMonent"; //创建上面
import chanpinmingxi from "../commin/chanpinmingxi"; // 产品明细
import addTianjiaChanpin from "../goodsShiftingCommin/addTianjiaChanpin"; // 添加产品
import {
  getEntrustedcompany,
  getFindOrgChildWare,
  queryAreaOfWS,
} from "../../api/api";
import remarksInput from "../commin/remarksInput";
import {
  getCookie,
  removeSessageItem,
  _removeData,
} from "../../utils/validate";
export default {
  components: {
    createMonent,
    kuanjiaClick,
    chanpinmingxi,
    addTianjiaChanpin,
    remarksInput,
  },
  data() {
    let self = this;
    return {
      searchCenter: {
        input: "",
        chuanjianJsonAndArr: [],
        placeholder: "请输入备注",
      },
      sendoutJson: {
        orderSource: 2, //手工创建 补货类型（1-缺货 2-手工创建）
        disposeStatus: 1, //状态 //（1-待补货 2-补货中 3已补货）
        orgId: "", //委托商id
        orgName: "", //委托商姓名
        childWareId: "", //子仓库id
        childWareName: "", //子仓库名称
        remark: "", //备注
        wareAreaName: "", //区域名称
        wareAreaId: "", //区域id
        wareId: getCookie("X-Auth-wareId"),
        detailList: [],
        operatorType: 1, //(1-新增 2-修改 3-补货确认)
      },
      isAddcreateChanpin: false,
      wareAreaCode: "",
      chuanjianJsonAndArr: {
        title: "创建补货单",
        inputArr: [
          {
            title: "委托公司",
            disabled: false,
            types: "xiala",
            select: "",
            w320: "w320",
            placeholder: "请选择委托公司",
            dropDownBoxData: [],
            drop: "orgName",
            dropDownXialaClickFun: function () {
              self.$nextTick(async () => {
                let { result } = await getEntrustedcompany();
                self.chuanjianJsonAndArr.inputArr[0].dropDownBoxData = result;
              });
            },
            getDropDownChangeDataFun: (res) => {
              console.log(
                self.chuanjianJsonAndArr.inputArr[0].dropDownBoxData[res]
                  .seatType || "没有 委托公司"
              );
              this.sendoutJson.orgId =
                self.chuanjianJsonAndArr.inputArr[0].dropDownBoxData[res].id;
              this.sendoutJson.orgName =
                self.chuanjianJsonAndArr.inputArr[0].dropDownBoxData[
                  res
                ].orgName;
            },
          },
          {
            title: "子仓名称",
            disabled: false,
            select: "",
            types: "xiala",
            w320: "w120",
            placeholder: "请选择子仓名称",
            dropDownBoxData: [],
            drop: "childWareName",
            dropDownXialaClickFun: async () => {
              this.sendoutJson.wareAreaId = "";
              this.sendoutJson.wareAreaName = "";
              this.sendoutJson.childWareName = "";
              this.sendoutJson.childWareId = "";
              let { orgId } = this.sendoutJson;
              let { result } = await getFindOrgChildWare(orgId);
              self.chuanjianJsonAndArr.inputArr[1].dropDownBoxData = result;
            },
            getDropDownChangeDataFun: (res) => {
              console.log(
                self.chuanjianJsonAndArr.inputArr[1].dropDownBoxData[res]
                  .seatType || "没有 子仓名称"
              );
              this.sendoutJson.childWareId =
                self.chuanjianJsonAndArr.inputArr[1].dropDownBoxData[res].id;
              this.sendoutJson.childWareName =
                self.chuanjianJsonAndArr.inputArr[1].dropDownBoxData[
                  res
                ].childWareName;
            },
          },
          {
            title: "区域名称",
            disabled: false,
            select: "",
            types: "xiala",
            placeholder: "请选择区域名称",
            w320: "w120",
            dropDownBoxData: [],
            drop: "wareAreaName",
            dropDownXialaClickFun: async () => {
              this.sendoutJson.wareAreaId = "";
              this.sendoutJson.wareAreaName = "";
              let { data } = await queryAreaOfWS(this.sendoutJson);
              self.chuanjianJsonAndArr.inputArr[2].dropDownBoxData =
                data.result;
            },
            getDropDownChangeDataFun: (res) => {
              this.sendoutJson.wareAreaId =
                self.chuanjianJsonAndArr.inputArr[2].dropDownBoxData[res].id;
              this.sendoutJson.wareAreaName =
                self.chuanjianJsonAndArr.inputArr[2].dropDownBoxData[
                  res
                ].wareAreaName;
              console.log(
                self.chuanjianJsonAndArr.inputArr[2].dropDownBoxData[res]
                  .seatType || "没有 区域名称"
              );
              self.chuanjianJsonAndArr.inputArr[3].input =
                self.chuanjianJsonAndArr.inputArr[2].dropDownBoxData[
                  res
                ].wareAreaCode;
            },
          },
          {
            title: "区域编号",
            disabled: true,
            input: "",
            types: "search",
            w320: "w120",
            placeholder: "请输入区域编号",
          },
          {
            title: "补货类型",
            disabled: true,
            types: "xiala",
            select: "手工创建",
            w320: "w120",
            dropDownBoxData: [
              {
                value: "手工创建",
                orderSource: 2,
              },
              {
                value: "缺货",
                orderSource: 1,
              },
            ],
            drop: "value",
            placeholder: "请选择区域编号",
            dropDownXialaClickFun: async () => {},
            getDropDownChangeDataFun: (res) => {
              this.sendoutJson.orderSource =
                self.chuanjianJsonAndArr.inputArr[2].dropDownBoxData[
                  res
                ].orderSource;
            },
          },
        ],
      },
      chuangjianJson: {}, //创建补货单点击后传出来的json
      chanpinminxiJson: {
        title: "产品明细",
        tableDataJsonAndArr: {
          tabledata: [], //表格data
          typeData: [
            {
              types: "selection",
              width: 55,
            },
            {
              types: "index",
              label: "序号",
              width: 70,
            },

            {
              types: "prodCode",
              label: "产品编码",
            },
            {
              types: "prodName",
              label: "产品名称",
            },
            {
              types: "prodName",
              label: "产品规格",
            },
            {
              types: "prodName",
              label: "品牌",
            },
            {
              types: "prodName",
              label: "存储区库位产品数量",
            },
            {
              types: "prodName",
              label: "存储区最大存放数",
            },
            {
              types: "prodName",
              label: "补货库位产品数量",
            },
            {
              types: "prodName",
              label: "补货预警值",
            },
            {
              types: "prodName",
              label: "最大补货数量",
            },
            {
              types: "prodName",
              label: "申请补货数量*",
              width: 250,
              render: (h, data) => {
                let inputs = document.createElement("input");
                // console.log(h(), data);
                h(inputs, data);
              },
            },
            {
              types: "prodName",
              label: "补货库位",
              width: 250,
            },
            {
              types: "prodName",
              width: 250,
              label: "存储区库位",
            },
          ], ////表头data
        },
      },
      muitiplites: [],
    };
  },
  watch: {
    isAddcreateChanpin(n) {
      if (!n) {
        this._isTianJiaPinS();
      }
    },
  },
  created() {
    this._isTianJiaPinS();
  },
  methods: {
    changeInputs(e) {
      this.sendoutJson.remark = e;
    },
    removeItem() {
      _removeData(
        this.chanpinminxiJson.tableDataJsonAndArr.tabledata,
        this.muitiplites
      );
    },
    tableSelectArr(e) {
      this.muitiplites = e;
      // console.log(this.chanpinminxiJson.tableDataJsonAndArr.tabledata, e);
    },
    _isTianJiaPinS() {
      let data = JSON.parse(sessionStorage.getItem("tianjiachanpings"));
      this.chanpinminxiJson.tableDataJsonAndArr.tabledata = data;
      return data;
    },
    isAddcreateChanpinShow() {
      let { orgName, childWareName, wareAreaName } = this.sendoutJson;
      if (!orgName) return this.$messageSelf.message("请选择委托公司");
      if (!childWareName) return this.$messageSelf.message("请选择子仓名称");
      if (!wareAreaName) return this.$messageSelf.message("请选择区域名称");
      this.isAddcreateChanpin = true;
    },
    closeBtn() {
      this.$emit("closeFn", false);
    },
    async clickSubmit() {
      // this.sendoutJson = {
      //   disposeStatus: 1,
      //   operatorType: 1,
      //   orderSource: 2,
      //   orgId: "4C2F466B16E94451B942EBBD07BE0F8B",
      //   orgName: "巨子生物",
      //   remark: "",
      //   wareAreaId: "49664829685A406390F5A8102F963EAD",
      //   wareAreaName: "test5",
      //   wareId: "2A8B48391F4F4EB5BDEDF9EBA0B6BAE7",
      //   childWareId: "3E65D6F787854793B1D70AC19E8C2A76",
      //   childWareName: "test5",
      //   detailList: [],
      // };
      this.sendoutJson.detailList = this.muitiplites;
      let data = await this.$pOrgProductsApp.pReplenishOrderSaveRecord(
        this.sendoutJson
      );
      removeSessageItem("tianjiachanpings");
    },
  },
};
</script>
<style>
</style>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";
.goOn {
  @include BtnFunction("success");
}

.lodopFunClear {
  @include BtnFunction("error");
}
</style>