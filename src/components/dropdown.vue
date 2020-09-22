<template>
  <div class="dropdownCom">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">{{dropdownTitle}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(v,i) in dropdownArr" :key="i">{{v.text}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
    props:{
        dropdownTitle:String,
        dropdownArr:Array
    },
    
};
</script>

<style>
.dropdownCom .el-dropdown{
    font-size: 16px;color: white;
}
</style>