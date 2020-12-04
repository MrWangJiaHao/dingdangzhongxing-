<template>
  <div class="footer_box">
    <div class="dianJiTuiChu">
      <img src="../assets/img/userName.png" style="margin-right: 7px" alt />
      <div class="wenZi" @click="loginOutMeg">
        登录用户&nbsp;
        <span
          >wms_ss:<span class="ml11"> {{ userName }}</span></span
        >
      </div>
    </div>
    <div v-show="display" class="loginOut">
      <div @click="loginout" class="clickLoginOutCenter">退出登入</div>
    </div>
    <div class="dianJiXiaoXi displayalign">
      <div class="imgBox">
        <img src="../assets/img/message.png" alt />
      </div>
      <div class="wenZi">消息</div>
      <div class="xiaoXiCenters ellipsis">
        <div class="idBVox" style="width: auto">
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../api/api";
import { getCookie } from "../utils/validate";
export default {
  data() {
    return {
      pageNumber: 1,
      pageSize: 1,
      content: "",
      display: false,
      userName: "",
    };
  },
  computed: {},
  async created() {
    this.userName = getCookie("userName");
    //发送请求 获取 当前的站内消息
    let { pageNumber, pageSize } = this;
    let { result } = await post({
      url:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseStationInfo/findRecordPage",
      data: {
        pageNumber,
        pageSize,
      },
    });
    let idBvox = document.getElementsByClassName("idBVox")[0];
    idBvox.style.width = result.list[0].content.length * 14 + "px";
    this.content = result.list[0].content;
  },
  methods: {
    loginOutMeg() {
      this.display = !this.display;
    },
    async loginout() {
      let datas = await post({
        url: "http://139.196.176.227:8801/am/v1/pUser/logout",
        data: {},
      });
      if (datas.code == "10000") {
        this.$messageSelf.message(datas.msg);
        console.log(1);
        this.$cookie.delete("userName");
        this.$cookie.delete("password");
        this.$cookie.delete("userToken");
        this.$cookie.delete("userType");
        this.$cookie.delete("X-Auth-wareId");
        this.$cookie.delete("X-Auth-user");
        console.log(2);
        this.$router.push({
          path: "/",
        });
      } else {
        this.$messageSelf.message("退出登入" + datas.msg);
      }
    },
  },
};
</script>
<style scoped>
.idBVox {
  position: absolute;
  animation: demo 10s linear infinite normal;
}
@keyframes demo {
  form {
    right: -620px;
  }
  10% {
    right: -550px;
  }
  20% {
    right: -500px;
  }
  30% {
    right: -450px;
  }
  40% {
    right: -400px;
  }
  50% {
    right: -358px;
  }
  60% {
    right: -308px;
  }
  70% {
    right: -258px;
  }
  80% {
    right: -200px;
  }
  90% {
    right: -150px;
  }
  95% {
    right: -100px;
  }
  to {
    right: 0px;
  }
}
</style>
<style lang="scss" scoped>
.footer_box {
  position: fixed;
  height: 30px;
  background: #599af3;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 33;
  .dianJiTuiChu {
    display: flex;
    align-items: center;
    user-select: none;
    margin-left: 21px;
    .imgBox {
      margin-right: 7px;
      width: 14px;
      height: 16px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .wenZi {
      font-size: 14px;
      font-family: Hiragino Sans GB;
      font-weight: normal;
      line-height: 30px;
      color: #ffffff;
      cursor: pointer;
    }
  }

  .loginOut {
    width: 100px;
    cursor: pointer;
    height: 30px;
    position: absolute;
    bottom: 37px;
    left: 30px;
    border: 1px solid #ccc;
    &::after {
      content: "";
      position: absolute;
      position: absolute;
      left: 10px;
      border: 6px solid transparent;
      border-width: 6px;
      border-top-color: transparent;
      bottom: -12px;
      z-index: 100;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
    }
    &:hover {
      border-top-color: #ccc;
      .clickLoginOutCenter {
        cursor: pointer;
        background: #ccc;
      }
    }
    .clickLoginOutCenter {
      line-height: 30px;
      padding: 0 10px;
    }
  }
  .dianJiXiaoXi {
    .imgBox {
      width: 16px;
      height: 14px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .wenZi {
      font-size: 14px;
      font-family: Hiragino Sans GB;
      font-weight: normal;
      color: #ffffff;
      margin-left: 3px;
    }
    .xiaoXiCenters {
      width: 159px;
      font-size: 14px;
      font-family: Hiragino Sans GB;
      font-weight: normal;
      color: #ffffff;
      position: relative;
      height: 20px;
      z-index: 11111;
      overflow: hidden;
      margin-left: 23px;
      margin-right: 104px;
    }
  }
}
</style>