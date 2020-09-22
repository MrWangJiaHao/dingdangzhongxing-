<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info"></div>
        <div class="login-main">
<<<<<<< HEAD
          <h3 class="login-title">登录</h3>
=======
          <h3 class="login-title">管理员登录</h3>
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
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
<<<<<<< HEAD
              <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()" @keyup.enter="dataFormSubmit()">登录</el-button>
=======
              <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getUUID } from "@/utils";
<<<<<<< HEAD
import {login} from '@/api/api.js';
=======
// import {login} from '@/api/api.js';
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
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
<<<<<<< HEAD
  
=======
    // this.getCaptcha();
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  },
  methods: {
    // 提交表单
    dataFormSubmit() {
<<<<<<< HEAD
    // let that = this;
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          //点击登录时，将用户名和密码存储到cookies中
          this.$cookie.set("userName", this.dataForm.userName);
          this.$cookie.set("password", this.dataForm.password);
          //四个小时后清除用户名和密码
          setTimeout(() => {
            this.$cookie.delete("userName");
            this.$cookie.delete("password");
          }, 14400000);

          login().then((ok)=>{
            console.log(ok)
          })

=======
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
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
          this.$router.push("/indexs");
        }
      });
    },
<<<<<<< HEAD
=======
    // 获取验证码
    // getCaptcha() {
    //   this.dataForm.uuid = getUUID();
    //   this.captchaPath = this.$http.adornUrl(
    //     `/captcha.jpg?uuid=${this.dataForm.uuid}`
    //   );
    // },
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
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
<<<<<<< HEAD
  // background-color: rgba(38, 50, 56, 0.6);
=======
  background-color: rgba(38, 50, 56, 0.6);
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  overflow: hidden;
  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
<<<<<<< HEAD
    // background-image: url(~@/assets/img/bg@2x.png);
    // background-size: cover;
=======
    background-image: url(~@/assets/img/bg@2x.png);
    background-size: cover;
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
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
<<<<<<< HEAD
    box-shadow: 0px 10px 25px 0px rgba(96, 204, 253, 0.3);
    border-radius: 8px;
  }
  .brand-info {
    width: 580px;
=======
  }
  .brand-info {
    width: 550px;
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
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
<<<<<<< HEAD
    height: 56px;
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 38px;
    text-align: center;
    background: linear-gradient(
      25deg,
      rgba(30, 209, 216, 1),
      rgba(32, 229, 184, 1)
    );
    border-radius: 3px;
    border: 0;
=======
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  }
}
</style>
