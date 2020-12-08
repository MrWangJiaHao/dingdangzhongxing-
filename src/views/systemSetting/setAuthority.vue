<template>
  <div id="main">
    <div class="AuthorityPage">
      <div class="title-icon">
        <div class="title">设置权限</div>
        <div class="icon el-icon-close" @click="goBack"></div>
      </div>
      <div class="mainBox">
        <div class="authName">
          <el-tree
            :data="Treedata"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            :highlight-current="true"
            @node-click="nodeClick"
          >
          </el-tree>
        </div>
        <div class="authChoose">
          <div v-for="(v, i) in authChooseData" :key="i">
            {{ v.title }}
            <br />
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 15px 0"></div>
            <el-checkbox-group
              v-model="checkedCities"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{
                city
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="submit-cancel">
        <el-button @click="goBack">取 消</el-button>
        <el-button type="primary" @click="submitData">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { jurisdicRequest } from "../../api/api";
// import Vue from "vue";

//这是设置角色权限的页面

export default {
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: ["添加", "删除"],
      isIndeterminate: true,

      Treedata: [],
      authChooseData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      pageDataArr: [],
      checkBox: [],
    };
  },
  mounted() {
    let data = {
      appNo: "99125FCFA23B4AD09668DC8F1DC53C18",
      type: "4",
      id: "AA4EBC35E2544E7688E2F4230F3F5E30",
    };
    jurisdicRequest(data).then((ok) => {
      console.log(ok);
      if (ok.data.code === "10000") {
        this.pageDataArr = ok.data.result;
        this.pageDataArr.forEach((v, idx) => {
          this.Treedata.push({
            label: v.title,
            children: [],
          });
          v.children.forEach((val) => {
            this.Treedata[idx].children.push({
              label: val.title,
            });
            // this.cities.push(
            //   val.permissions
            // )
          });
        });
      }
    });
  },
  methods: {
    nodeClick(a) {
      let label = a.label;
      switch (label) {
        case "渠道管理":
          this.authChooseDataQC();
          this.authChooseData.push({ title: "渠道管理" });
          break;
        case "物流公司管理":
          this.authChooseDataQC();
          this.authChooseData.push({ title: "物流公司管理" });
          break;
      }
    },
    authChooseDataQC() {
      // let testObj = {};
      // this.authChooseData = this.authChooseData.reduce((item, next) => {
      //   testObj[next.value]
      //     ? ""
      //     : (testObj[next.value] = true && item.push(next));
      //   return item;
      // }, []);
      this.authChooseData = [];
    },

    goBack() {
      this.$router.replace({ path: "/systemSetting/userControl" }); //返回后 再后退不能再跳转到此页面
    },
    submitData() {
      //提交按钮
      this.$router.push({
        path: "/systemSetting/userControl",
        query: { id: 1 },
      });
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
};
</script>

<style scoped lang="scss">
#main {
  width: 100%;
  height: 100%;
  background: #eef1f8;
  overflow: hidden;
}
.AuthorityPage {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  max-width: 870px;
  overflow: auto;
  height: 560px;
  background: #ecf1f7;
  box-shadow: 0px 0px 10px 5px #e4e6e9;
  margin: auto;
  .mainBox {
    display: flex;
    height: 520px;
    .authName {
      width: 300px;
      height: 100%;
      overflow-y: auto;
    }
    .authChoose {
      width: 670px;
      height: 440px;
      border-bottom: 1px #e1e6eb solid;
    }
  }
}

.title-icon {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e1e6eb;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 20px;
  }
  .icon {
    margin-right: 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
}

.submit-cancel {
  position: absolute;
  right: 50px;
  bottom: 20px;
}
</style>
<style lang="scss">
</style>