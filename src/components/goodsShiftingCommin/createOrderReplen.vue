<template>
  <div>
    <kuanjiaClick
      :titles="chuanjianJsonAndArr.title"
      @closeBtn="closeBtn"
      @clickSubmit="clickSubmit"
    >
      <template slot="centerKuanjia">
        <div class="pd20">
          <createMonent :chuanjianJsonAndArr="chuanjianJsonAndArr" />
        </div>
        <!-- 创建补货单 -->
        <div class="pd20 mb16">
          <chanpinmingxi :chanpinminxiJson="chanpinminxiJson">
            <template slot="anniuBtns">
              <span class="goOn mr11 inline">添加产品</span>
              <span class="lodopFunClear inline">删除</span>
            </template>
          </chanpinmingxi>
        </div>
        <!-- 产品明细 -->
        <div></div>
        <!-- 备注 -->
      </template>
    </kuanjiaClick>
  </div>
</template>

<script>
import kuanjiaClick from "../commin/kuanjiaClick"; //点击架子
import createMonent from "../commin/createMonent"; //创建上面
import chanpinmingxi from "../commin/chanpinmingxi"; // 产品明细
export default {
  components: {
    createMonent,
    kuanjiaClick,
    chanpinmingxi,
  },
  data() {
    return {
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
          },
          {
            title: "子仓名称",
            disabled: false,
            select: "",
            types: "search",
            w320: "w120",
            placeholder: "请选择子仓名称",
          },
          {
            title: "区域名称",
            disabled: true,
            input: "",
            types: "search",
            placeholder: "请选择区域名称",
            w320: "w120",
          },
          {
            title: "区域编号",
            disabled: true,
            input: "",
            types: "search",
            w320: "w120",
            placeholder: "请选择区域编号",
          },
          {
            title: "补货类型",
            disabled: true,
            types: "xiala",
            w320: "w120",
            placeholder: "请选择区域编号",
          },
        ],
      },
      chuangjianJson: {}, //创建补货单点击后传出来的json
      chanpinminxiJson: {
        title: "产品明细",
        tableDataJsonAndArr: {
          tabledata: [
            {
              prodCode: "asd",
              searchBoxInput: {
                placeholder: "请选择补货数量",
                input: "",
              },
              dropDownXiala: {
                placeholder: "请选择补货数量",
              },
            },
            {
              prodCode: "asd",
            },
            {
              prodCode: "asd",
            },
          ],
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
          ],
        },
      },
    };
  },
  methods: {
    closeBtn() {
      this.$emit("closeFn", false);
    },
    clickSubmit() {
      this.closeBtn();
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