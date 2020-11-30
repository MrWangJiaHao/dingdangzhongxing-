<template>
  <div id="sures">
    <kuanjiaClick
      :titles="'补货确认'"
      @closeBtn="closeBtn"
      @clickSubmit="clickSubmit"
    >
      <template slot="centerKuanjia">
        <div class="mb16">
          <detailsData
            :detailsArr="detailsArr"
            title="补货订单详情"
          ></detailsData>
        </div>
        <div class="mb16">
          <chanpinmingxi :chanpinminxiJson="chanpinminxiJson">
            <template slot="anniuBtns">
              <span class="goOn mr11 inline">复制产品</span>
              <span class="lodopFunClear inline">删除</span>
            </template>
          </chanpinmingxi>
        </div>
      </template>
    </kuanjiaClick>
  </div>
</template>

<script>
import kuanjiaClick from "../commin/kuanjiaClick"; //点击架子
import detailsData from "../commin/dindanxiangq"; //订单详情
import chanpinmingxi from "../commin/chanpinmingxi"; // 产品明细

export default {
  data() {
    return {
      detailsArr: [
        {
          titles: "补货单号",
          centers: "adsdas",
        },
        {
          titles: "补货状态",
          centers: "adsdas",
        },
        {
          titles: "创建时间",
          centers: "adsdas",
        },
        {
          titles: "创建人",
          centers: "adsdas",
        },
        {
          titles: "补货时间",
          type: "date",
          centers: "请输入补货订单详情",
          getDateTimeExpectedSendTime: (res) => {
            console.log(res);
          },
        },
        {
          titles: "补货人",
          type: "input",
          centers: "adsdas",
          input: "asd",
        },
      ],
      chanpinminxiJson: {
        title: "产品明细",
        tableDataJsonAndArr: {
          tabledata: [],
          typeData: [
            {
              types: "selection",
            },
            {
              types: "index",
              label: "序号",
              width: 71,
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
              label: "储存区库位产品数量",
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
              label: "申请补货数量",
            },
            {
              types: "prodName",
              label: "补货库位",
            },
            {
              types: "input",
              label: "实际补货数量",
              flag: "input",
              placeholder: "请输入实际补货数量",
              width: 200,
            },
            {
              types: "",
              label: "储存区库位",
              width: 200,
              flag: "xiala",
              dropDowBox: {
                dropDownBoxData: [],
                select: "",
                placeholder: "请选择储存区库位",
              },
              getDropDownData: (res) => {
                console.log(res);
              },
              cliclInput: (res) => {
                console.log(res, "点击储存区库位");
              },
            },
            {
              types: "",
              label: "批次号",
              width: 200,
              flag: "xiala",
              drop: "asd",
              dropDowBox: {
                dropDownBoxData: [],
                select: "",
                placeholder: "请选择批次号",
              },
              getDropDownData: (res) => {
                console.log(res);
              },
              cliclInput: (res) => {
                console.log(res, "点击批次号");
              },
            },
            {
              types: "",
              label: "生产日期",
              flag: "date",
              width: 250,
              dateTimeData: {
                placeholder: "请选择生产日期",
              },
              getDateTime: (res) => {
                console.log(res);
              },
            },
          ],
        },
      },
    };
  },
  components: {
    kuanjiaClick,
    detailsData,
    chanpinmingxi,
  },
  methods: {
    closeBtn() {
      this.$emit("closeBtnSure", false);
    },
    //点击了确认
    clickSubmit() {},
  },
};
</script>

<style lang='scss'>
@import "../../assets/scss/btn.scss";
.goOn {
  @include BtnFunction("success");
}
.lodopFunClear {
  @include BtnFunction("error");
}
#sures .input {
  border: 1px solid #d2d6e2;
  height: 28px;
  text-indent: 10px;
  color: #333333;
  font-size: 14px;
  font-weight: normal;
  background: rgba(236, 241, 247, 0);
  border-radius: 2px;
}
#sures .el-input__inner {
  height: 28px;
}
#sures .dropDownBox .input_box[data-v-0e988ff4] {
  height: 28px;
}
#sures .el-input__icon {
  line-height: 28px;
}
#sures .ivu-input {
  height: 28px !important;
}
</style>