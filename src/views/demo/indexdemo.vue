<template>
  <div>
    <el-row>
      <el-col><div class="grid-content bg-purple" style="font-size:24px">仓储端</div></el-col>
      <el-col >
          <div class="grid-content bg-purple-light aa">
              <ul class="oul">
                  <li>111</li>
                  <li>222</li>
                  <li>333</li>
                  <li>444</li>
                  <li>555</li>
                  <li>666</li>
                  <li>777</li>
                  <li>888</li>
                  <li>999</li>
                    <li>111</li>
                  <li>222</li>
                  <li>333</li>
                  <li>444</li>
                  <li>555</li>
                  <li>666</li>
                  <li>777</li>
                  <li>888</li>
                  <li>999</li>
                  <li>111</li>
                  <li>222</li>
                  <li>333</li>
                  <li>444</li>
              </ul>
          </div>
    </el-col>
      <el-col>
          <div class="grid-content bg-purple">
                <span style="font-size:16px" @click="fun" class="left">《</span>
                <span style="font-size:16px;margin-left:20px" @click="fun1">》</span>
              </div>
     </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        fun(){
            let left = document.querySelector('.oul')
            left.style.left = "-800px"
        },
        fun1(){
            let left = document.querySelector('.oul')
            left.style.left = 0
        }   
    }

};
</script>

<style>
.el-row {
  display: flex;
  width: 100%;
}
.el-col:nth-of-type(1) {
  width: 100px;
    white-space: nowrap;

}
.el-col:nth-of-type(2) {
 flex: 1;
    width: 80%;
    height: 36px;

}
.el-col:nth-of-type(3) {
  width: 100px;
    white-space: nowrap;

}

.bg-purple {
  background: red;
}
.bg-purple-light {
  background: #e5e9f2;
}
.aa{
    position: relative;
    height: 36px;
    overflow: hidden;

}
ul{
    position: absolute;
    display: flex;
    transition: 0.5s;
}
li{
    padding:0 30px;
    font-size: 16px;
    white-space: nowrap;
}
</style>