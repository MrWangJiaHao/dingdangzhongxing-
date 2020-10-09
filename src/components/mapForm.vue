<template>
  <div class="childWarehouseForm">
    <div class="formHeader">
      <div class="icon-title">
        <div class="icon-title-icon">
          <img src="../assets/img/home_page-icon-default@2x.png" />
        </div>
        <div class="icon-title-title">库位管理</div>
      </div>
      <div class="someBtn">
        <div class="setUser" @click="create">创建</div>
        <div class="bianjiUser" @click="edit">编辑</div>
        <div class="remove" @click="del">删除</div>
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
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" align="center" type="index" width="55">
        </el-table-column>
        <el-table-column prop="delegaCompany" label="委托公司" align="center">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" align="center">
        </el-table-column>
        <el-table-column prop="productNumber" label="产品编号" align="center">
        </el-table-column>
        <el-table-column
          prop="producTspecifica"
          label="产品规格"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="brand" label="品牌" align="center">
        </el-table-column>
        <el-table-column prop="CHName" label="子仓名称" align="center">
        </el-table-column>
        <el-table-column
          prop="storageArea"
          :label="storageArea"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="storageShelf"
          :label="storageShelf"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="storageTier"
          :label="storageTier"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="storageUnit"
          :label="storageUnit"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createName"
          label="创建人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <div class="pageComponent" v-if="this.tableData.length >= 10">
      <pagecomponent
        :pageComponentsData="pageComponentsData"
        @getPageNum="getPageNum"
        @sureSuccssBtn="sureSuccssBtn"
      ></pagecomponent>
    </div>
  </div>
</template>

<script>
import pagecomponent from "./commin/pageComponent"; //分页器
export default {
  components: {
    pagecomponent,
  },
  props: {
    storageArea: String,
    storageShelf: String,
    storageTier: String,
    storageUnit: String,
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 0, //一共多少条 //默认一页10条
      },
    };
  },
  methods: {
    create() {},
    edit() {},
    del() {},
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.pagingQueryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data); //用来改变分页器的条数
    },
    //用来改变分页器的条数
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/btn.scss";

.childWarehouseForm {
  margin: 16px 0 0 0;
  background: white;
  .formHeader {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d1d6e2;
    .icon-title {
      display: flex;
      margin: 24px 0 0 0;
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
        font-size: 16px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 20px 16px 0;
      .setUser {
        margin-right: 10px;
        @include BtnFunction("success");
      }
      .bianjiUser {
        margin-right: 10px;
        @include BtnFunction("success");
      }
      .remove {
        @include BtnFunction("error");
      }
      .goOn {
        margin-right: 10px;
        @include BtnFunction("success");
      }
    }
  }
  .resultForm {
    padding: 20px;
  }
  .pageComponent {
    margin: 20px 10px 0 0;
    text-align: right;
    height: 36px;
    background: #ffffff;
  }
}
</style>