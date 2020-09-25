<template>
  <div id="main">
    <div class="AuthorityPage"></div>
  </div>
</template>

<script>
import { jurisdicRequest } from "../../api/api";
//这是设置角色权限的页面
export default {
  data() {
    return {};
  },
  mounted() {
    let data = {
      appNo: "99125FCFA23B4AD09668DC8F1DC53C18",
      type: "1",
      id: "AA4EBC35E2544E7688E2F4230F3F5E30",
    };
    jurisdicRequest(data).then((ok) => {
      console.log(ok);
    });
  },
  methods: {},
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
  background: #eef1f8;
  overflow: hidden;
}
.AuthorityPage {
  width: 960px;
  margin: 100px auto 0;
}
</style>