<template>
  <div class="setUserIngBox">
    <div class="setUserIngBoxCenter">
      <div class="headerBox">
        <div class="closeTitle">创建用户</div>
        <div class="closeIcon" @click="$router.go(-1)"></div>
      </div>

      <div class="centerBox">
        <div class="setTitle">个人信息</div>
        <div class="gerxinxiBox">
          <div class="xinxiBitian">
            <div>
              <div class="displayalign">
                <div class="noneIconTitle mr11">
                  用户账号
                  <span style="color:red;">*</span>:
                </div>
                <div class="mr20">
                  <searchBox :searchCenter="searchName"></searchBox>
                </div>
              </div>
            </div>
            <!-- 用户姓名 -->
            <div>
              <div class="displayalign">
                <div class="noneIconTitle mr11">
                  用户账号
                  <span style="color:red;">*</span>:
                </div>
                <div class="mr20">
                  <searchBox :searchCenter="searchMobile"></searchBox>
                </div>
              </div>
            </div>
            <!-- 联系电话 -->
          </div>
          <div class="cityBoxCenter">
            <div class="mr20">
              <div class="displayalign">
                <div class="noneIconTitle mr11">
                  用户账号
                  <span style="visibility: hidden;">*</span>:
                </div>
                <div>
                  <dropDowbox :dropDowBox="dropDowProvince"></dropDowbox>
                </div>
              </div>
            </div>
            <!-- 省 -->
            <div class="mr20">
              <dropDowbox :dropDowBox="dropDowCity"></dropDowbox>
            </div>
            <!-- 市 -->
            <div>
              <dropDowbox :dropDowBox="dropDowDistrictCount"></dropDowbox>
            </div>
            <!-- 区/县 -->
          </div>
          <div class="textAreaBox">
            <textarea placeholder="请输入详细地址" maxlength="200"></textarea>
          </div>
          <!-- 居住地址 -->
        </div>
      </div>
      <!-- 个人信息 -->
      <div class="pd20">
        <div class="setTitle">账号信息</div>
        <div class="displayalign mb20">
          <div class="displayalign">
            <div class="noneIconTitle mr11">
              用户账号
              <span style="color:red;">*</span>:
            </div>
            <div class="mr20">
              <searchBox :searchCenter="searchzhanhao"></searchBox>
            </div>
          </div>
          <!-- 用户账号 -->
          <div class="displayalign">
            <div class="noneIconTitle mr11">
              <span style="visibility: hidden;">你好</span>密码
              <span style="color:red;">*</span>:
            </div>
            <div>
              <searchBox :searchCenter="searchzhanhao"></searchBox>
            </div>
          </div>
          <!-- 密码 -->
        </div>
        <!-- 必须 -->
        <div class="displayalign mb20">
          <div class="displayalign">
            <div class="displayalign">
              <div class="noneIconTitle mr11">
                用户角色
                <span style="color:red;">*</span>:
              </div>
              <div class="mr20">
                <dropDowbox :dropDowBox="dropDowBox"></dropDowbox>
              </div>
            </div>
          </div>
          <!-- 用户角色 -->
          <div>
            <div class="displayalign">
              <div class="noneIconTitle mr11">
                用户角色
                <span style="color:red;">*</span>:
              </div>
              <div>
                <dropDowbox :dropDowBox="dropDowBox"></dropDowbox>
              </div>
            </div>
          </div>
          <!-- 邮箱地址 -->
        </div>
        <!-- 账号信息 -->
        <div>
          <div class="dispalyFlex mb20">
            <div class="noneIconTitle mr11 fosi0">
              <span class="fosi14" style="visibility: hidden;">你好</span>
              <span class="fosi14">备注</span>
              <span class="fosi14" style="visibility: hidden;">好</span>
              <span class="fosi14">:</span>
            </div>
            <div class="bzTetxArea">
              <textarea placeholder="请输入备注" maxlength="200"></textarea>
            </div>
          </div>
        </div>
        <!-- 备注 -->
      </div>
      <!-- 账号信息 -->
      <div class="displayCenter mb20">
        <div class="quxiaoBox mr20" @click="$router.go(-1)">取消</div>
        <div class="tijiaoBox">提交</div>
      </div>
      <!-- btn -->
    </div>
  </div>
</template>

<script>
import searchBox from "../../components/commin/searchBox"; //搜索框
import dropDowbox from "../../components/commin/dropDownBox"; //下拉框
export default {
  components: {
    dropDowbox,
    searchBox,
  },
  data() {
    return {
      dropDowProvince: {
        //下拉框需要的json
        dropDownBoxData: [], //下拉需要的data
        placeholder: "省",
      },
      dropDowCity: {
        placeholder: "市",
      },
      dropDowDistrictCount: {
        placeholder: "区/县",
      },

      searchName: {
        //搜索框需要的json
        searchWrite: "",
        placeholder: "请输入用户姓名",
      },
      dropDowBox: {
        //下拉框需要的json
        dropDownBoxData: [
          "超级管理员",
          "客服",
          "运营",
          "兼职拣货人员",
          "兼职复核人员",
        ], //下拉需要的data
        placeholder: "请选择用户角色",
        disabled: false,
      },
      searchMobile: {
        //搜索框需要的json
        searchWrite: "",
        placeholder: "请输入联系电话",
      },
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "创建时间",
        placeholder: "请选择开始时间",
      },
      searchzhanhao: {
        placeholder: "请输入您的账号",
      },
    };
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";

.setUserIngBox {
  background: rgb(232, 233, 236);
  padding: 0 10px;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  .headerBox {
    height: 50px;
    border-radius: 3px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(236, 241, 247);
    border-bottom: 1px solid #d1d6e2;
  }

  .setUserIngBoxCenter {
    position: absolute;
    left: 50%;
    top: 144px;
    transform: translateX(-50%);
    background: #fff;
    width: 1000px;
    .centerBox {
      padding: 30px 20px;
    }
    .setTitle {
      margin-bottom: 18px;
    }
    .gerxinxiBox {
      display: flex;
      flex-direction: column;
      > div {
        margin-bottom: 18px;
      }
      .xinxiBitian {
        display: flex;
        align-items: center;
        > div {
          margin-right: 20px;
        }
      }
    }

    .cityBoxCenter {
      display: flex;
      align-items: center;
    }
  }
  .textAreaBox {
    font-size: 14px;
    width: 72%;
    height: 40px;
    margin-left: 80px;
    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
    }
    margin-bottom: 30px;
  }
  .bzTetxArea {
    font-size: 14px;
    width: 72%;
    height: 80px;
    > textarea {
      color: #606266;
      text-indent: 16px;
      line-height: 30px;
      overflow: hidden;
    }
  }
  .quxiaoBox {
    @include BtnFunction("error");
  }
  .tijiaoBox {
    @include BtnFunction("success");
  }
}
</style>