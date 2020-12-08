<template>
  <div>
    <kuanjiaClick
      :titles="'添加产品'"
      :width="'980px'"
      :top="'160px'"
      @closeBtn="closeBtn"
      @clickSubmit="goAJAXCreate"
    >
      <template slot="centerKuanjia">
        <div>
          <createMonent :chuanjianJsonAndArr="chuanjianJsonAndArr">
            <template slot="btnsArr">
              <div class="tr dispalyFlex">
                <span class="goOn inline mr11">查询</span>
                <span class="lodopFunClear inline" @click="clearInputs">
                  清空
                </span>
              </div>
            </template>
          </createMonent>
          <!-- 上部分 -->
          <div class="tr mt20 pd20">
            <span class="lodopFunClear inline" @click="removeTarget">删除</span>
          </div>
          <div class="pd20 centerBox mb16">
            <table-commin
              :tableDataJson="tableDataJson"
              @tableSelectArr="tableSelectArr"
            ></table-commin>
            <div class="tr pageComponent mb16 pd20">
              <pageComponent
                :pageComponentsData="pageComponentsData"
                @sureSuccssBtn="sureSuccssBtn"
                @handleSizeChange="handleSizeChange"
                @getPageNum="getPageNum"
              ></pageComponent>
            </div>
          </div>
        </div>
      </template>
    </kuanjiaClick>
  </div>
</template>

<script>
import createMonent from "../commin/createMonent"; //创建上面
import kuanjiaClick from "../commin/kuanjiaClick"; //点击架子
import TableCommin from "../commin/tableCommin.vue";
import pageComponent from "../commin/pageComponent";

export default {
  props: {
    sendoutJson: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      chuanjianJsonAndArr: {
        inputArr: [
          {
            title: "产品编码",
            types: "search",
            input: "",
            placeholder: "请输入产品编码",
          },
          {
            title: "产品名称",
            types: "search",
            input: "",
            placeholder: "请输入产品名称",
          },
          {
            title: "产品规格",
            types: "xiala",
            select: "",
            placeholder: "请选择产品规格",
            dropDownXialaClickFun() {},
            getDropDownChangeDataFun() {},
          },
        ],
      },
      pageComponentsData: {
        pageNums: 10,
        sizes: true,
      },
      tableDataJson: {
        tabledata: [], // 表格数据
        typeData: [
          {
            types: "selection",
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
            types: "specName",
            label: "产品规格",
          },
          {
            types: "braName",
            label: "品牌",
          },
          {
            types: "currInventory",
            label: "仓库可用库存",
          },
        ], //表头数据
      },
      sendoutJsonData: {
        pageNumber: 1,
        pageSize: 10,
        paras: {},
      },
      multiputes: [],
    };
  },
  components: {
    kuanjiaClick,
    createMonent,
    pageComponent,
    TableCommin,
  },
  created() {
    this._tableDataArrs();
  },
  methods: {
    clearInputs() {
      this.chuanjianJsonAndArr.inputArr[0].input = "";
      this.chuanjianJsonAndArr.inputArr[1].input = "";
      this.chuanjianJsonAndArr.inputArr[2].select = "";
    },
    closeBtn() {
      this.$parent._data.isAddcreateChanpin = false;
    },
    async _tableDataArrs() {
      let { result } = await this.$pOrgProductsApp.findReplienshProductPagePost(
        this.sendoutJsonData
      );
      this.tableDataJson.tabledata = result.list;
      return result.list;
    },
    tableSelectArr(e) {
      this.multiputes = e;
    },
    sureSuccssBtn(e) {
      this.sendoutJsonData.pageNumber = e;
    },
    handleSizeChange(e) {
      this.sendoutJsonData.pageSize = e;
    },
    getPageNum(e) {
      this.sendoutJsonData.pageNumber = e;
    },
    removeTarget() {
      this._removeData(this.tableDataJson.tabledata, this.multiputes);
    },
    //删除data
    _removeData(data, target) {
      data = data || [];
      target = target || [];
      target.forEach((item) => {
        let idx = data.indexOf(item);
        data.splice(idx, 1);
      });
      sessionStorage.setItem("tianjiachanpings", JSON.stringify(data));
      return data;
    },
    //点击了提交
    goAJAXCreate() {
      sessionStorage.setItem(
        "tianjiachanpings",
        JSON.stringify(this.multiputes)
      );
      this.closeBtn();
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";
.goOn {
  @include BtnFunction("success");
}
.goOnmes {
  border: 1px solid #000;
  @include BtnFunction();
}

.lodopFunClear {
  @include BtnFunction("error");
}
</style>