<template>
  <div id="main">
    <div class="AuthorityPage">
      <div class="title-icon">
        <div class="title">设置权限</div>
        <div class="icon el-icon-close" @click="goBack"></div>
      </div>
      <el-tabs
        :tab-position="tabPosition"
        style="height: 520px"
        :stretch="true"
      >
        <el-tab-pane
          :label="pageDataArr[i].title"
          v-for="(v, i) in pageDataArr"
          :key="i"
        >
          <div class="checkBoxDiv">
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
        </el-tab-pane>
      </el-tabs>
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

const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      tabPosition: "left",
      pageDataArr: [],
      selected: "",
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
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
      this.pageDataArr = ok.data.result;
    });
  },
  methods: {
    goBack() {
      this.$router.replace({ path: "/systemSetting/userControl" }); //返回后 再后退不能再跳转到此页面
    },
    submitData() {
      //提交按钮
      this.$router.push({ path: "/systemSetting/userControl" });
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      console.log(value);
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
  width: 870px;
  height: 560px;
  background: #ecf1f7;
  box-shadow: 0px 0px 10px 5px #e4e6e9;
  margin: auto;
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
.AuthorityPage .el-tabs__content {
  position: relative;
  padding: 50px;
}
</style>