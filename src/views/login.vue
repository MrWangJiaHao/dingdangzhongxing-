<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info"></div>
        <div class="login-main">
          <h3 class="login-title">管理员登录</h3>
          <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            @keyup.enter.native="dataFormSubmit()"
            status-icon
          >
            <el-form-item prop="userName">
              <div class="zhanhao_parent parent">
                <div class="img_box">
                  <img src="~@/assets/img/home_page-icon-person@2x.png" alt />
                </div>
                <el-input v-model="dataForm.userName" placeholder="请输入用户名称"></el-input>
              </div>
            </el-form-item>

            <el-form-item prop="password">
              <div class="mima_box parent">
                <div class="img_box">
                  <img src="~@/assets/img/home_page-icon-safe@2x.png" alt />
                </div>
                <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
              </div>
            </el-form-item>

            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getUUID } from "@/utils";
// import {login} from '@/api/api.js';
// import axios from 'axios'
export default {
  data() {
    return {
      dataForm: {
        userName: "",
        password: "",
        uuid: "",
        captcha: "",
      },
      dataRule: {
        userName: [
          { required: true, message: "帐号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
      captchaPath: "",
    };
  },
  created() {
    // this.getCaptcha();
  },
  methods: {
    // 提交表单
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          // this.$http({
          //   url: this.$http.adornUrl("/sys/login"),
          //   method: "post",
          //   data: this.$http.adornData({
          //     username: this.dataForm.userName,
          //     password: this.dataForm.password,
          //     uuid: this.dataForm.uuid,
          //     captcha: this.dataForm.captcha,
          //   }),
          // }).then(({ data }) => {
          //   if (data && data.code === 0) {
          //     this.$cookie.set("token", data.token);
          //     this.$router.replace({ name: "home" });
          //   } else {
          //     this.getCaptcha();
          //     this.$message.error(data.msg);
          //   }
          // });
          // axios({
          //   url:"http://127.0.0.1:8801/am/v1/pUser/login",
          //   method:"get"
          // }).then((ok)=>{
          //   console.log(ok)
          // })
          this.$router.push("/indexs");
        }
      });
    },
    // 获取验证码
    // getCaptcha() {
    //   this.dataForm.uuid = getUUID();
    //   this.captchaPath = this.$http.adornUrl(
    //     `/captcha.jpg?uuid=${this.dataForm.uuid}`
    //   );
    // },
  },
};
</script>
<style lang="scss" scoped>
.parent {
  display: flex;
  width: 360px;
  height: 48px;
  line-height: 48px;
  border-radius: 4px;
  border: 1px solid #e1e8eb;
  .img_box {
    width: 56px;
    height: 20px;
    text-align: center;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 2px;
      background: #e1e8eb;
      right: 0;
      top: 50%;
      transform: translateY(20%);
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
<style lang="scss">
.el-input__inner {
  border: none;
}
.el-button--primary {
  background: #3255e9;
  border-radius: 4px;
}
.el-button--primary:hover {
  background: #3255e9;
  color: #fff;
  border: none;
}
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, 0.6);
  overflow: hidden;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url(~@/assets/img/bg@2x.png);
    background-size: cover;
  }
  .site-content__wrapper {
    position: absolute;
    padding-top: 0;
    margin-left: 0;
    min-height: 0;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .site-content {
    width: 1084px;
    height: 710px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .brand-info {
    width: 550px;
    height: 100%;
    color: #fff;
    background: url(~@/assets/img/sginIn.png) center center;
    background-size: cover;
  }
  .brand-info__text {
    font-size: 48px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: 0.6;
  }
  .login-main {
    width: 504px;
    padding: 156px 72px 0 72px;
    height: 100%;
    display: inline-block;
    background: #fff;
  }
  .login-title {
    margin: 0 0 20px 0;
    width: 150px;
    height: 42px;
    font-size: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
  }
  .login-captcha {
    overflow: hidden;
    > img {
      width: 100%;
      cursor: pointer;
    }
  }
  .login-btn-submit {
    width: 100%;
    margin-top: 38px;
  }
}
</style>
