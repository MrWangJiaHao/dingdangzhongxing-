<template>
  <div class="createPDA">
    <div class="orderDetaiPage">
      <div class="orderDetailBox">
        <div class="orderDetail-title">基础信息</div>
        <div class="mainContent">
          <div class="leftinputs">
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">PDA名称：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="PDAname"
                  placeholder="请输入PDA名称"
                ></el-input>
              </div>
            </div>
            <div class="innerinput">
              <div class="inputName">
                <span class="">出厂日期：</span>
              </div>
              <div class="inputContent">
                <dateTime
                  :dateTimeData="datetimeDate"
                  @getDateTime="leaveTime"
                  ref="startTime"
                  :valueDataStart="productionDate"
                />
              </div>
            </div>
            <div class="innerinput">
              <div class="inputName">
                <span class="">质保周期(月)：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="expirationDate"
                  placeholder="请输入质保周期"
                ></el-input>
              </div>
            </div>
            <div class="innerinput">
              <div class="inputName">
                <span class="">供应商：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="supName"
                  placeholder="请输入供应商"
                ></el-input>
              </div>
            </div>
            <div class="innerinput">
              <div class="inputName">
                <span class="">联系人：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="contacts"
                  placeholder="请输入联系人"
                ></el-input>
              </div>
            </div>
            <div class="uploadImg">
              <div class="imgtitle">图片：</div>
              <div>
                <div class="fileBox">
                  <div class="imgFile">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <div class="imgPreview">
                    <div class="outViewDiv" @click="lookImg">
                      <img :src="exampleImg" alt="" v-if="exampleImg" />
                    </div>
                    <div class="sampleGraph">
                      <span>示例图 </span>
                      <span class="iconfont icon-fangdajing"></span>
                    </div>
                  </div>
                </div>
                <div class="tooltip">
                  只能上传jpg/png/jpeg文件，且不超过500kb
                </div>
              </div>
            </div>
          </div>
          <div class="rightinputs">
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">PDA型号：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="PDAmodel"
                  placeholder="请输入PDA型号"
                ></el-input>
              </div>
            </div>

            <div class="innerinput">
              <div class="inputName">
                <span class="">采购日期：</span>
              </div>
              <div class="inputContent">
                <dateTime
                  :dateTimeData="datetimeDate1"
                  @getDateTime="purchaseTime"
                  ref="startTime"
                  :valueDataStart="purchaseDate"
                />
              </div>
            </div>
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">序列号：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="seriesCode"
                  placeholder="请输入序列号"
                ></el-input>
              </div>
            </div>
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">品牌：</span>
              </div>
              <div class="inputContent">
                <el-input v-model="braName" placeholder="请输入品牌"></el-input>
              </div>
            </div>
            <div class="innerinput telphone">
              <div class="inputName">
                <span class="">联系电话：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="phoneCode"
                  placeholder="请输入联系电话"
                  @blur="testIsMobile"
                  @focus="focusEvent"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="remarkBox">
          <div>备注：</div>
          <div class="textareaBox">
            <el-input
              type="textarea"
              placeholder="请输入备注信息"
              v-model="remarkInfor"
              maxlength="200"
              show-word-limit
            >
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="footerBtn">
      <div class="backBtn" @click="back">返回</div>
      <div class="submitBtn" @click="submit" :style="isBlock">提交</div>
    </div>
    <el-dialog
      title="查看图片"
      :visible.sync="dialogFormVisible"
      custom-class="animate__animated animate__zoomIn"
    >
      <div class="dialogImgBox">
        <img :src="dialogImg" alt="" v-if="dialogImg" />
      </div>
      <div slot="footer" class="dialog-footer">
        <div @click="dialogFormVisible = false" class="quxiaoBox">关闭</div>
      </div>
    </el-dialog>
  </div>
</template>
<style>
</style>
<script>
import { savePDA, lookPDAdetail } from "../../api/api";
import dateTime from "../../components/commin/dateTime.vue"; //时间
import { getCookie, isMobile } from "../../utils/validate";

export default {
  components: {
    dateTime,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "/facilityManagement/PDAmanagement") {
      next((vm) => {
        if (vm.$route.query.type === "create") {
          vm.operation = "创建";
          vm.id = "";
        }
        if (vm.$route.query.type === "edit") {
          vm.operation = "编辑";
          vm.id = vm.$route.query.data.id;
          vm.quneryFun();
        }
        if (vm.$route.query.type === "look") {
          vm.isBlock = "display:none";
          vm.PDAname = vm.$route.query.data.pdaName;
          vm.PDAmodel = vm.$route.query.data.pdaCode;
          vm.expirationDate = vm.$route.query.data.qualityDate;
          vm.seriesCode = vm.$route.query.data.cdKey;
          vm.supName = vm.$route.query.data.supName;
          vm.braName = vm.$route.query.data.braName;
          vm.contacts = vm.$route.query.data.contact;
          vm.phoneCode = vm.$route.query.data.contactPhone;
          vm.exampleImg = vm.$route.query.data.image;
          vm.remarkInfor = vm.$route.query.data.remark;
          vm.productionDate = vm.$route.query.data.productionDate;
          vm.purchaseDate = vm.$route.query.data.purchaseDate;
        }
      });
    } else {
      next();
    }
  },
  data() {
    return {
      isBlock: "display:block",
      dialogFormVisible: false,
      imageUrl: "",
      exampleImg: "",
      dialogImg: "",
      uploadUrl:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehousePda/saveOrgImg",
      datetimeDate: {
        placeholder: "请选择出厂日期",
      },
      datetimeDate1: {
        placeholder: "请选择采购日期",
      },
      id: "",
      PDAname: "",
      PDAmodel: "",
      expirationDate: "",
      seriesCode: "",
      supName: "",
      braName: "",
      contacts: "",
      phoneCode: "",
      remarkInfor: "",
      isPhone: "",
      operation: "",
      imgInfor: {},
      productionDate: "",
      purchaseDate: "",
    };
  },
  mounted() {},
  methods: {
    quneryFun() {
      lookPDAdetail({ id: this.id }).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          let data = ok.data.result[0];
          this.exampleImg = data.image;
          this.PDAname = data.pdaName;
          this.PDAmodel = data.pdaCode;
          this.expirationDate = data.qualityDate;
          this.seriesCode = data.cdKey;
          this.supName = data.supName;
          this.braName = data.braName;
          this.contacts = data.contact;
          this.phoneCode = data.contactPhone;
          this.productionDate = data.productionDate;
          this.purchaseDate = data.purchaseDate;
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    submit() {
      if (this.PDAname === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入PDA名称",
        });
      }
      if (this.PDAmodel === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入PDA型号",
        });
      }
      if (this.seriesCode === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入序列号",
        });
      }
      if (this.braName === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入品牌",
        });
      }
      let data = {
        id: this.id,
        wareId: getCookie("X-Auth-wareId"),
        image: this.imgInfor,
        pdaCode: this.PDAmodel,
        pdaName: this.PDAname,
        productionDate: this.productionDate,
        purchaseDate: this.purchaseDate,
        qualityDate: this.expirationDate,
        supName: this.supName,
        braName: this.braName,
        cdKey: this.seriesCode,
        contact: this.contacts,
        contactPhone: this.phoneCode,
        remark: this.remarkInfor,
      };
      savePDA(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: `${this.operation}成功`,
          });
          this.$router.push({ path: "/facilityManagement/PDAmanagement" });
        } else {
          this.$messageSelf.message({
            type: "error",
            message: `${this.operation}失败`,
          });
        }
      });
    },
    leaveTime(t) {
      this.productionDate = t;
    },
    purchaseTime(t) {
      this.purchaseDate = t;
    },
    lookImg() {
      this.dialogImg = this.exampleImg;
      if (
        this.exampleImg !== "" &&
        /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(this.exampleImg)
      ) {
        this.dialogFormVisible = true;
        setTimeout(() => {
          document.querySelector(".dialogImgBox").style.width =
            document.querySelector(".dialogImgBox img").naturalWidth + "px";
          document.querySelector(".dialogImgBox").style.height =
            document.querySelector(".dialogImgBox img").naturalHeight + "px";
        }, 0);
      }
    },
    handleAvatarSuccess(res, file) {
      this.imgInfor = res;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 < 500;
      if (!isJPG) {
        this.$messageSelf.message({
          message: "上传头像图片只能是 JPG/png 格式!",
          type: "warning",
        });
      }
      if (!isLt2M) {
        this.$messageSelf.message({
          message: "上传头像图片大小不能超过 500KB!",
          type: "warning",
        });
      }
      return isJPG && isLt2M;
    },
    testIsMobile() {
      let phoneCode = this.phoneCode;
      let phoneInput = document.querySelector(".telphone .el-input__inner");
      if (phoneCode !== "") {
        if (!isMobile(phoneCode)) {
          this.isPhone = false;
          phoneInput.style.borderColor = "red";
          return this.$messageSelf.message({
            type: "warning",
            message: "请输入正确的手机号",
          });
        }
      }
      phoneInput.style.borderColor = "#DCDFE6";
      this.isPhone = true;
    },
    focusEvent() {
      document.querySelector(".telphone .el-input__inner").style.borderColor =
        "#409EFF";
    },
  },
};
</script>
<style lang="scss">
.createPDA {
  .el-input__inner,
  .ivu-input,
  .ivu-date-picker {
    width: 358px !important;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d1d6e2;
    border-radius: 10px;
    background: #f6f6f6;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader .el-upload::after {
    content: "上传图片";
    position: absolute;
    left: 50px;
    bottom: 20px;
  }
  .avatar-uploader-icon {
    width: 158px;
    height: 158px;
    position: relative;
  }
  .avatar-uploader-icon::before {
    content: "";
    width: 8px;
    height: 40px;
    background: #566579;
    position: absolute;
    top: 38px;
    left: 75px;
  }
  .avatar-uploader-icon::after {
    content: "";
    width: 40px;
    height: 8px;
    background: #566579;
    position: absolute;
    top: 54px;
    left: 59px;
  }
  .avatar {
    width: 158px;
    height: 158px;
    display: block;
  }
  .el-textarea__inner {
    width: 944px;
  }
  @import "../../assets/scss/btn.scss";
  .el-dialog {
    width: 900px;
    border-radius: 4px;
    .el-dialog__header {
      padding: 0 20px;
      font-weight: 600;
      height: 50px;
      width: 100%;
      line-height: 50px;
      background: #ecf1f7;
      .el-dialog__headerbtn {
        top: 0;
      }
    }
    .el-dialog__body {
      width: 100%;
      border-top: 1px solid #d1d6e2;
      border-bottom: 1px solid #d1d6e2;
      padding: 0;
      .dialogImgBox {
        max-width: 900px;
        max-height: 500px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .el-dialog__footer {
      width: 100%;
      height: 76px;
      padding: 0 20px;
      .dialog-footer {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .quxiaoBox {
          @include BtnFunction();
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
.createPDA {
  background: #eef1f8;
  padding: 10px;
  .el-input__inner {
    width: 358px;
  }
  .orderDetaiPage {
    background: #fff;
    padding: 20px;
    .orderDetailBox {
      .orderDetail-title {
        font-size: 16px;
        position: relative;
        margin: 0 0 20px 25px;
      }
      .orderDetail-title::before {
        content: "";
        width: 15px;
        height: 15px;
        background: url("../../assets/img/systemTitlemesa.png");
        position: absolute;
        left: -25px;
        top: 3px;
      }
      .mainContent {
        width: 1034px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .leftinputs,
        .rightinputs {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .innerinput {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            .inputContent {
              width: 358px;
            }
          }
          .uploadImg {
            display: flex;
            .tooltip {
              font-size: 12px;
            }
            .fileBox {
              display: flex;
              .imgFile {
                margin-right: 30px;
              }
              .imgPreview {
                margin-right: 10px;
                width: 158px;
                height: 158px;
                border: 1px dashed #d1d6e2;
                border-radius: 10px;
                padding: 9px;
                background: #f6f6f6;
                .outViewDiv {
                  width: 138px;
                  height: 98px;
                  background: #f6f6f6;
                  border: 1px solid #d1d6e2;
                  border-radius: 10px;
                  cursor: pointer;
                  img {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    display: block;
                  }
                }
                .outViewDiv:hover {
                  border-color: #409eff;
                }
                .sampleGraph {
                  margin-top: 15px;
                  text-align: center;
                }
              }
            }
          }
        }
      }
      .remarkBox {
        width: 1034px;
        margin: 30px auto 0;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>


