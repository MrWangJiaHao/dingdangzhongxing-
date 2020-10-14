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
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          >
          </el-tree>
        </div>
        <div class="authChoose"></div>
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
      Treedata: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      pageDataArr: [],
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
        this.pageDataArr.forEach((v, i) => {
          this.Treedata.push({
            id: i,
            label: v.title,
          });
          v.children.forEach((value, index) => {
            console.log(value, index);
          });
        });
      }
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
  .mainBox {
    display: flex;
    height: 520px;
    .authName {
      width: 200px;
      height: 100%;
    }
    .authChoose {
      width: 670px;
      height: 100%;
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