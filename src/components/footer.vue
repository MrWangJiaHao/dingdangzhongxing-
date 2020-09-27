<template>
  <div class="footer_box">
    <div class="dianJiTuiChu">
      <div class="imgBox">
        <span></span>
        <img src="../assets/img/userName.png" alt />
      </div>
      <div class="wenZi">
        登入用户&nbsp;
        <span>wms_ss:{{ userName }}</span>
      </div>
    </div>
    <div class="loginOut">
      <div class="clickLoginOutCenter">asd</div>
    </div>
    <div class="dianJiXiaoXi displayalign">
      <div class="imgBox">
        <img src="../assets/img/message.png" alt />
      </div>
      <div class="wenZi">消息</div>
      <div class="xiaoXiCenters">{{ content }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pageNumber: 1,
      pageSize: 1,
      content: "",
    };
  },
  computed: {
    ...mapState(["userName"]),
  },
  async created() {
    //发送请求 获取 当前的站内消息
    // let { pageNumber, pageSize } = this;
    // let { result } = await this.$axios.post(
    //   "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseStationInfo/findRecordPage",
    //   {
    //     pageNumber,
    //     pageSize,
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       "X-Auth-user": "warehouse",
    //       "X-Auth-Token": "X-Auth-user",
    //       "X-Auth-wareId": "X-Auth-user",
    //       "X-Auth-name": "warehouse",
    //       "X-Auth-wareName": "",
    //     },
    //   }
    // );
    // let { list } = result;
    // this.content = list.content;
  },
};
</script>

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
  .dianJiTuiChu {
    display: flex;
    align-items: center;
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
      color: #ffffff;
    }
  }
  .loginOut {
    width: 100px;
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
      border: 6px solid;
      border-width: 6px;
      bottom: -12px;
      border-top-color: #ccc;
      z-index: 100;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
    }
    .clickLoginOutCenter {
      padding: 10px;
      &:hover {
        background: #ccc;
      }
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
      text-align: center;
      overflow: hidden;
      margin-left: 23px;
    }
  }
}
</style>