<template>
  <div class="childWarehouseForm">
    <div class="formHeader">
      <div class="icon-title">
        <div class="icon-title-icon">
          <img src="../assets/img/systemTitlemesa.png" />
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
        @cell-click="lookDetail"
      >
        <el-table-column type="selection" width="82" fixed="left"> </el-table-column>
        <el-table-column label="序号" align="center" type="index">
        </el-table-column>
        <el-table-column prop="orgName" label="委托公司" align="center">
        </el-table-column>
        <el-table-column prop="prodFullName" label="产品名称" align="center">
        </el-table-column>
        <el-table-column prop="prodCode" label="产品编号" align="center">
        </el-table-column>
        <el-table-column prop="specName" label="产品规格" align="center">
        </el-table-column>
        <el-table-column prop="braName" label="品牌" align="center">
        </el-table-column>
        <el-table-column prop="childWareName" label="子仓名称" align="center">
        </el-table-column>
        <el-table-column
          prop="wareAreaName"
          :label="storageArea"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="wareSeatCode1"
          :label="storageShelf"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="wareSeatCode2"
          :label="storageTier"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="wareSeatCode"
          :label="wareSeatCode"
          align="center"
        >
          <template slot-scope="scope">
            <div class="lookDetail">{{ scope.row.wareSeatCode }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="创建人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          min-width="120"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { delStoreMapRelation } from "../api/api";

export default {
  props: {
    storageArea: String,
    storageShelf: String,
    storageTier: String,
    wareSeatCode: String,
    tableData: Array,
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    create() {
      //创建库位
      this.$router.push({
        path: "/storageLocalMap/storeLocalBindProduct",
        query: { datas: this.multipleSelection, type: "create" },
      });
    },
    edit() {
      //编辑操作
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({message:"请选择要编辑的库位",type:"warning"});
      if (this.multipleSelection.length !== 1)
        return this.$messageSelf.message({
          message: "每次只能编辑一条库位信息，请重新选择",
          type: "warning",
        });
      this.$router.push({
        path: "/storageLocalMap/storeLocalBindProduct",
        query: { datas: this.multipleSelection, type: "edit" },
      });
    },
    del() {
      //删除操作
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length) return this.$messageSelf.message({message:"请选择要删除的库位",type:"warning"});
      this.$$messageSelf
        .confirms("确定要删除吗？", "提示", {
          type: "info",
        })
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {
          this.$messageSelf.message({message:"已取消删除",type:"success"});
        });
    },
    delRequest(data) {
      //删除的请求
      delStoreMapRelation(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "删除成功",
          });
          window.location.reload();
        } else {
          this.$messageSelf.message({
            type: "error",
            message: ok.data.msg ? ok.data.msg : "删除失败",
          });
        }
      });
    },
    lookDetail(row, column) {
      if (column.property === "wareSeatCode") {
        this.$router.push({
          path: "/storageLocalMap/storageLocalDetail",
          query: { kuwei: row },
        });
      }
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
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
    padding: 16px 20px;
    .lookDetail {
      color: #599af3;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .pageComponent {
    margin: 20px 10px 0 0;
    text-align: right;
    height: 36px;
    background: #ffffff;
  }
}
</style>