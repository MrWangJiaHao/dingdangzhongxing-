<template>
  <div ref="childSelect" class="displayCenter choiceSelectBox">
    <div style="width: 100%">
      <div class="headerBox mb20">
        <div class="closeTitle">选择产品</div>
        <div class="closeIcon" @click="closeBtn"></div>
      </div>
      <div class="displayalign mb20 pd20">
        <div>
          <div class="displayalign ellipsis">
            <div class="noneIconTitle mr11">产品名称:</div>
            <div class="mr20">
              <el-autocomplete
                class="inline-input"
                v-model="sendoutDatas.paras.prodName"
                :fetch-suggestions="prodNameQuerySearch"
                placeholder="请输入产品名称"
                :trigger-on-focus="false"
                @select="prodNameHandleSelect"
              ></el-autocomplete>
            </div>
          </div>
        </div>
        <!-- 产品名称 -->
        <div>
          <div class="displayalign ellipsis">
            <div class="noneIconTitle mr11">产品编码:</div>
            <div class="mr20">
              <el-input
                v-model="sendoutDatas.paras.prodCode"
                placeholder="请输入产品编码"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 产品名称 -->
        <div>
          <div class="displayalign ellipsis">
            <div class="noneIconTitle mr11">产品规格:</div>
            <div class="mr20">
              <el-input
                v-model="sendoutDatas.paras.specName"
                placeholder="请输入产品规格"
              ></el-input>
            </div>
          </div>
        </div>
        <!-- 产品规格 -->
        <div class="displayalign">
          <div class="disinb tijiaoBox mr11" @click="sendoutDataAsync">
            查询
          </div>
          <div class="disinb quxiaoBox" @click="clearChanPinMinChen">清空</div>
        </div>
      </div>
      <div class="btn tr mb20 pd20">
        <div class="disinb quxiaoBox" @click="clearRemovetable">删除</div>
      </div>
      <div class="mb20 pd20">
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
            label="供应商"
            prop="supName"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="品牌"
            width="119"
            prop="braName"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
      <div class="tr mb20 pd20">
        <pageComponent
          @handleSizeChange="handleSizeChange"
          :pageComponentsData="pageComponentsData"
        />
      </div>

      <div class="mb20 pd20 tc">
        <div class="disinb quxiaoBox mr11" @click="closeBtn">返回</div>
        <div class="disinb tijiaoBox" @click="clickSubmit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getfindOrgProductPage, queryProductInfor } from "../../api/api";
import { getCookie } from "../../utils/validate";
/*eslint-disable */
import pageComponent from "../commin/pageComponent";
export default {
  data() {
    return {
      pageComponentsData: {
        pageNums: 0,
        sizes: true,
      },
      tabledata: [
        {
          prodcode: "1", //产品编码
          prodFullName: "1322", //产品名称
          specName: "321", //产品规格
          supName: "321", //供应商
          braName: "321", //品牌
          id: 1,
        },
        {
          prodcode: "2", //产品编码
          prodFullName: "1323", //产品名称
          specName: "321", //产品规格
          supName: "3221", //供应商
          braName: "321", //品牌
          id: 0,
        },
        {
          prodcode: "3", //产品编码
          prodFullName: "1324", //产品名称
          specName: "321", //产品规格
          supName: "3211", //供应商
          braName: "321", //品牌
          id: 2,
        },
      ],
      mutalisArr: [],
      sendoutDatas: {
        pageNumber: 1,
        pageSize: 10,
        paras: {
          prodName: "", //产品名称
          prodCode: "", //产品编码
          specName: "", //产品规格
        },
      },
    };
  },
  components: {
    // searchBox,
    pageComponent,
  },
  methods: {
    async _chanpinmingc(data) {
      let datas = await queryProductInfor({
        wareid: getCookie("X-Auth-wareId"),
        orgId: sessionStorage.getItem("orgId"),
        paras: {
          ...data,
        },
      });
      return datas.data;
    },
    prodNameQuerySearch(e, cb) {
      this._chanpinmingc({ prodName: e }).then((res) => {
        console.log(res);
        cb(res.result);
      });
    },
    prodNameHandleSelect() {},
    sendoutDataAsync() {
      this._sendOutAsync().then((res) => {
        this._changeList(res);
      });
    },
    clearChanPinMinChen() {
      this.sendoutDatas.paras.prodName = "";
      this.sendoutDatas.paras.prodCode = "";
      this.sendoutDatas.paras.specName = "";
    },
    closeBtn() {
      window.location.reload(true);
      // this.$parent._data.addChanpins = false;
    },
    handleSelectionChange(e) {
      this.mutalisArr = e;
    },
    clearRemovetable() {
      console.log(this.mutalisArr);
      this.mutalisArr.forEach((item) => {
        let idxs = this.tabledata.indexOf(item);
        this.tabledata.splice(idxs, 1);
      });
    },
    //点击了提交
    clickSubmit() {
      this.$emit("tables", this.mutalisArr);
      sessionStorage.setItem("_addTablesData", JSON.stringify(this.mutalisArr));
      this.closeBtn();
    },
    //发生请求
    async _sendOutAsync() {
      let datas = await getfindOrgProductPage(this.sendoutDatas);
      return datas.result;
    },
    //改变数据
    _changeList(data) {
      data.tabledata = data.list;
      this.pageComponentsData.pageNums = data.totalRow;
    },
    handleSizeChange(e) {
      this.sendoutDatas.pageSize = e;
    },
  },
};
</script>
<style>
.el-pager {
  margin-right: 6px;
}
</style>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

.headerBox {
  width: 100%;
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
.quxiaoBox {
  @include BtnFunction("error");
}
.tijiaoBox {
  @include BtnFunction("success");
}
</style>