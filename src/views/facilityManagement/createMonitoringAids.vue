<template>
  <div class="createMonitoringAids">
    <div class="orderDetaiPage">
      <div class="orderDetailBox">
        <div class="orderDetail-title">基础信息</div>
        <div class="mainContent">
          <div class="leftinputs">
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">名称：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="facilityName"
                  placeholder="请输入设备名称"
                ></el-input>
              </div>
            </div>
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">所属子仓：</span>
              </div>
              <div class="inputContent">
                <el-select
                  v-model="childWareName"
                  placeholder="请选择子仓"
                  @change="childWareNames"
                  clearable
                  @visible-change="chooseItem"
                >
                  <el-option
                    v-for="item in childWareNameData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
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
                <span class="addStar">网关标示：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="gateway"
                  placeholder="请输入网关标示"
                ></el-input>
              </div>
            </div>
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">解析协议：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="agreement"
                  placeholder="请输入解析协议"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="rightinputs">
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">设备编号：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="facilityCode"
                  placeholder="请输入设备编号"
                ></el-input>
              </div>
            </div>
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">所属区域：</span>
              </div>
              <div class="inputContent">
                <el-select
                  v-model="wareAreaName"
                  placeholder="请选择区域"
                  @change="wareAreaNames"
                  clearable
                >
                  <el-option
                    v-for="item in wareAreaNameData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="innerinput">
              <div class="inputName">
                <span>品牌：</span>
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
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">IP地址：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="ipAddr"
                  placeholder="请输入IP地址"
                ></el-input>
              </div>
            </div>
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">网关域：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="gatewayDomain"
                  placeholder="请输入网关域"
                ></el-input>
              </div>
            </div>
            <div class="innerinput">
              <div class="inputName">
                <span class="addStar">测点名称：</span>
              </div>
              <div class="inputContent">
                <el-input
                  v-model="testAreaName"
                  placeholder="请输入测点名称"
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
  </div>
</template>
<style>
</style>
<script>
import {
  TJquery_WH_Request,
  queryAreaOfWS,
  saveMonitoringAids,
} from "../../api/api";
import { getCookie, isMobile } from "../../utils/validate";

export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/facilityManagement/monitoringAidsManagement") {
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
          vm.facilityName = vm.$route.query.data.pdaName;
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
      id: "",
      facilityName: "",
      facilityCode: "",
      childWareName: "",
      wareAreaName: "",
      childWareNameData: [],
      wareAreaNameData: [],
      gateway: "",
      agreement: "",
      expirationDate: "",
      seriesCode: "",
      supName: "",
      braName: "",
      ipAddr: "",
      gatewayDomain: "",
      contacts: "",
      phoneCode: "",
      remarkInfor: "",
      testAreaName: "",
      isPhone: "",
      operation: "",
      CSandareaData: [],
    };
  },
  mounted() {
    TJquery_WH_Request({ wareId: getCookie("X-Auth-wareId"), id: "" }).then(
      (ok) => {
        if (ok.data.code === "10000") {
          ok.data.result.forEach((v) => {
            this.childWareNameData.push({
              value: v.id,
              label: v.childWareName,
            });
          });
        }
      }
    );
    queryAreaOfWS({ childWareId: "", id: "" }).then((ok) => {
      if (ok.data.code === "10000") {
        this.CSandareaData = ok.data.result;
      }
    });
  },
  methods: {
    quneryFun() {
      lookPDAdetail({ id: this.id }).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          let data = ok.data.result[0];
          this.exampleImg = data.image;
          this.facilityName = data.pdaName;
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
      if (this.facilityName === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入设备名称",
        });
      }
      if (this.facilityCode === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入设备编号",
        });
      }
      if (this.childWareName === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请选择子仓",
        });
      }
      if (this.wareAreaName === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请选择区域",
        });
      }
      if (this.seriesCode === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入序列号",
        });
      }
      if (this.ipAddr === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入ip地址",
        });
      }
      if (this.gateway === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入网关标示",
        });
      }
      if (this.gatewayDomain === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入网关域",
        });
      }
      if (this.agreement === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入解析协议",
        });
      }
      if (this.testAreaName === "") {
        return this.$messageSelf.message({
          type: "warning",
          message: "请输入测点名称",
        });
      }
      let data = {
        braName: this.braName,
        cdKey: this.seriesCode,
        childWareId: this.childWareName,
        contact: this.contacts,
        contactPhone: this.phoneCode,
        gateWay: this.gatewayDomain,
        gateWayMark: this.gateway,
        ipAddress: this.ipAddr,
        monitorCode: this.facilityCode,
        monitorName: this.facilityName,
        pointName: this.testAreaName,
        protocol: this.agreement,
        remark: this.remarkInfor,
        supName: this.supName,
        wareAreaId: this.wareAreaName,
        id: this.id,
      };
      saveMonitoringAids(data).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: `${this.operation}成功`,
          });
          this.$router.push({ path: "/facilityManagement/monitoringAidsManagement" });
        } else {
          this.$messageSelf.message({
            type: "error",
            message: `${this.operation}失败`,
          });
        }
      });
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
    childWareNames(val) {
      this.childWareName = val;
      this.CSandareaData.forEach((v) => {
        if (val === v.childWareId) {
          this.wareAreaNameData.push({
            value: v.id,
            label: v.wareAreaName,
          });
        }
      });
    },
    chooseItem(event) {
      if (event) {
        this.wareAreaNameData = [];
      }
    },
    wareAreaNames(val) {
      this.wareAreaName = val;
    },
  },
};
</script>
<style lang="scss">
.createMonitoringAids {
  .el-textarea__inner {
    width: 964px;
  }
  .el-input__inner {
    width: 358px !important;
  }
}
</style>
<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
.createMonitoringAids {
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
        }
      }
      .remarkBox {
        width: 1034px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>


