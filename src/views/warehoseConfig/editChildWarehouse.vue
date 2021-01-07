<template>
  <div class="childWarehousePage">
    <!-- 这里编辑子仓的页面 -->
    <div class="setChildWarehouse">
      <div class="pageTitle">
        <div class="titleImg">
          <img src="@/assets/img/systemTitlemesa.png" />
        </div>
        <div class="titleText">子仓区域</div>
        <div class="titleDistance">
          （<span>长：200m 宽：100m 上北、下南、左西、右东</span>）
        </div>
      </div>
      <div class="setArea">
        <div class="temporarily_no">
          <!-- 这里展示子仓平面图 -->
        </div>
      </div>
      <div class="newChildWarehouse">
        <div class="newChildWarehouseImg">
          <img src="@/assets/img/systemTitlemesa.png" />
        </div>
        <div class="newChildWarehouseText">编辑子仓</div>
      </div>
      <div class="someInput">
        <div class="setInput">
          <span class="addStar">子仓名称：</span>
          <el-input
            v-model="input1"
            placeholder="请输入子仓名称"
            :disabled="isDisabled"
          ></el-input>
        </div>
        <div class="setInput">
          <span class="addStar">子仓编号：</span>
          <div style="width: 80px">
            <el-select v-model="value1" filterable :disabled="isDisabled">
              <el-option
                v-for="item in childWarehouseSerial"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="setInput setTransition">
          <span class="addStar">
            <el-checkbox v-model="checked" @change="clickNumber"
              >数字：</el-checkbox
            >
          </span>

          <div style="width: 70px">
            <el-select v-model="value3" filterable :disabled="isDisabled">
              <el-option
                v-for="item in childWarehouseNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="setInput">
          <span class="addStar">子仓长：</span>
          <div style="width: 110px; margin-right: 10px">
            <el-input
              v-model="input2"
              placeholder="请输入长度"
              type="number"
              :disabled="isDisabled"
            ></el-input>
          </div>
          <span>m</span>
        </div>
        <div class="setInput">
          <span class="addStar">子仓宽：</span>
          <div style="width: 110px; margin-right: 10px">
            <el-input
              v-model="input3"
              placeholder="请输入宽度"
              type="number"
              :disabled="isDisabled"
            ></el-input>
          </div>
          <span>m</span>
        </div>
        <div class="setInput">
          <span class="addStar">子仓类型：</span>
          <div style="width: 150px">
            <el-select
              v-model="value2"
              filterable
              placeholder="请选择子仓类型"
              @change="value2Event"
              :disabled="isDisabled"
            >
              <el-option
                v-for="item in childWarehouseType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="setInput">
          <span class="addStar">距北距离：</span>
          <div style="width: 110px; margin-right: 10px">
            <el-input
              v-model="input4"
              placeholder="请输入长度"
              type="number"
              :disabled="isDisabled"
            ></el-input>
          </div>

          <span>m</span>
        </div>
        <div class="setInput">
          <span class="addStar">距西距离：</span>
          <div style="width: 110px; margin-right: 10px">
            <el-input
              v-model="input5"
              placeholder="请输入长度"
              type="number"
              :disabled="isDisabled"
            ></el-input>
          </div>

          <span>m</span>
        </div>
      </div>
      <div class="setRemark">
        <span>备注：</span>
        <el-input
          type="textarea"
          placeholder="请输入备注信息"
          v-model="textarea"
          maxlength="100"
          show-word-limit
          :disabled="isDisabled"
        >
        </el-input>
      </div>
    </div>
    <div class="footerBtn" :style="isBlock">
      <div class="backBtn" @click="back">返回</div>
      <div class="submitBtn" @click="submit">提交</div>
    </div>
  </div>
</template>
<script>
import { add_edit_WH_Request } from "../../api/api";
export default {
  beforeRouteEnter(to, from, next) {
    if (from.name === "/warehoseconfig/childWarehouseAdmin") {
      next((vm) => {
        vm.isDisabled = false;
        if (vm.$route.query.type === "preview") {
          // console.log("点击了预览按钮");
          vm.isDisabled = true;
          vm.isBlock = "display:none";
          vm.input1 = vm.$route.query.data.childWareName; //子仓名称
          vm.input4 = vm.$route.query.data.northDistance; //距北距离
          vm.input5 = vm.$route.query.data.westDistance; //距西距离
          vm.input2 = vm.$route.query.data.wareLength; //子仓长度
          vm.input3 = vm.$route.query.data.wareWidth; //子仓宽度
          vm.value2 = vm.$route.query.data.wareType; //仓库类型
          vm.textarea = vm.$route.query.data.remark; //备注
          vm.value1 = vm.$route.query.data.childWareCode.substring(0, 1); //子仓编号字母
          vm.value3 = vm.$route.query.data.childWareCode.substring(1); //子仓编号数字
        }
      });
    }
  },
  data() {
    return {
      isDisabled: false,
      isBlock: "display:block",
      textarea: "",
      checked: true,
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      childWarehouseSerial: [],
      value1: "A",

      childWarehouseType: [
        {
          value: "1",
          label: "销售",
        },
        {
          value: "2",
          label: "售后",
        },
        {
          value: "3",
          label: "残次品",
        },
      ],
      value2: "",
      childWarehouseNumber: [],
      value3: "1",
      dataArr: [],
      pagingQueryData: {
        //分页查询
        pageNumber: 1,
        pageSize: 10,
        paras: {
          wareType: "",
          id: "",
        },
      },
      childWarehouseList: "",
      editId: "",
      divChecked: false,
    };
  },
  created() {},
  mounted() {
    let letterArr = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    let numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < letterArr.length; i++) {
      this.childWarehouseSerial.push({
        value: letterArr[i],
        label: letterArr[i],
      });
    }
    for (let i = 0; i < numberArr.length; i++) {
      this.childWarehouseNumber.push({
        value: numberArr[i],
        label: numberArr[i],
      });
    }

    this.changeSize();

    window.addEventListener(
      "resize",
      () => {
        this.changeSize();
        this.saveDiv();
      },
      false
    );

    this.saveDiv();
  },
  methods: {
    changeSize() {
      let setArea = document.querySelector(".setArea");
      setArea.style.width = "100%";
      setArea.style.height = setArea.offsetWidth / 2 + "px";
    },
    back() {
      this.$router.replace("/warehoseconfig/childWarehouseAdmin");
    },
    saveDiv() {
      let oDiv = document.querySelector(".temporarily_no");
      let editchildViewDiv = document.querySelectorAll(".childViewDiv");
      editchildViewDiv.forEach((v) => {
        if (v !== null) {
          oDiv.removeChild(v);
        }
      });
      this.childWarehouseList = this.$store.state.CWAdminRequest.queryData.list;
      let childWarehouseList = this.childWarehouseList;
      for (let i = 0; i < childWarehouseList.length; i++) {
        let childDiv = document.createElement("div");
        childDiv.style.width =
          (childWarehouseList[i].wareLength * oDiv.offsetWidth) / 200 + "px";
        childDiv.style.height =
          (childWarehouseList[i].wareWidth * oDiv.offsetWidth) / 200 + "px";
        childDiv.style.background = "white";
        childDiv.style.position = "absolute";
        childDiv.style.left =
          (childWarehouseList[i].westDistance * oDiv.offsetWidth) / 200 + "px";
        childDiv.style.top =
          (childWarehouseList[i].northDistance * oDiv.offsetWidth) / 200 + "px";
        childDiv.style.cursor = "pointer";
        childDiv.style.textAlign = "center";
        childDiv.style.border = "1px solid #ddd";
        childDiv.style.borderRadius =
          childWarehouseList[i].wareLength * 0.2 + "px";
        childDiv.style.lineHeight =
          (childWarehouseList[i].wareWidth * oDiv.offsetWidth) / 200 + "px";
        childDiv.style.fontSize = "10px";
        childDiv.innerHTML = childWarehouseList[i].childWareName;
        childDiv.className = "childViewDiv";
        oDiv.append(childDiv);
      }
      let childViewDiv = document.querySelectorAll(".childViewDiv");
      childViewDiv.forEach((v, i) => {
        v.onclick = () => {
          this.input1 = childWarehouseList[i].childWareName; //子仓名称
          this.input4 = childWarehouseList[i].northDistance; //距北距离
          this.input5 = childWarehouseList[i].westDistance; //距西距离
          this.input2 = childWarehouseList[i].wareLength; //子仓长度
          this.input3 = childWarehouseList[i].wareWidth; //子仓宽度
          this.value2 = childWarehouseList[i].wareType; //仓库类型
          this.textarea = childWarehouseList[i].remark; //备注
          this.value1 = childWarehouseList[i].childWareCode.substring(0, 1); //子仓编号字母
          this.value3 = childWarehouseList[i].childWareCode.substring(1); //子仓编号数字
          this.editId = childWarehouseList[i].id; //选中子仓的id
          this.divChecked = true;
          // v.style.background = "#409EFF";
          // v.style.border = "1px solid #0555c2";
          // v.style.color = "white";
        };
      });
      // $(".childViewDiv").each((v, i) => {
      //   $(i).click(() => {
      //     this.input1 = childWarehouseList[v].childWareName; //子仓名称
      //     this.input4 = childWarehouseList[v].northDistance; //距北距离
      //     this.input5 = childWarehouseList[v].westDistance; //距西距离
      //     this.input2 = childWarehouseList[v].wareLength; //子仓长度
      //     this.input3 = childWarehouseList[v].wareWidth; //子仓宽度
      //     this.value2 = childWarehouseList[v].wareType; //仓库类型
      //     this.textarea = childWarehouseList[v].remark; //备注
      //     this.value1 = childWarehouseList[v].childWareCode.substring(0, 1); //子仓编号字母
      //     this.value3 = childWarehouseList[v].childWareCode.substring(1); //子仓编号数字
      //     this.editId = childWarehouseList[v].id; //选中子仓的id
      //     this.divChecked = true;
      //     $(i)
      //       .css({
      //         background: "#367fff",
      //         border: "1px solid #0555c2",
      //         color: "white",
      //       })
      //       .siblings()
      //       .css({
      //         background: "white",
      //         border: "1px solid #ddd",
      //         color: "black",
      //       });
      //   });
      // });
    },
    submit() {
      if (this.divChecked === false) {
        this.$messageSelf.message({
          type: "warning",
          message: "请先选中一个子仓",
        });
      } else if (this.input2 < 1 || this.input3 < 1) {
        return this.$messageSelf.message({
          type: "error",
          message: "子仓长宽不能小于0",
        });
      } else if (this.input4 < 1 || this.input5 < 1) {
        return this.$messageSelf.message({
          type: "error",
          message: "子仓距北距西距离不能小于0",
        });
      } else {
        let data = {
          childWareCode: this.value1 + this.value3, //子仓编号
          childWareName: this.input1, //子仓名称
          northDistance: this.input4, //距北距离
          westDistance: this.input5, //距西距离
          wareId: this.$store.state.loginRequest.loginData.user.wareId, //父仓库ID
          wareLength: this.input2, //子仓长度
          wareWidth: this.input3, //子仓宽度
          remark: this.textarea, //备注
          wareType: 1, //仓库类型
          id: this.editId, //仓库id
        };
        add_edit_WH_Request(data).then((ok) => {
          // console.log(ok);
          if (ok.data.code === "10000") {
            this.$messageSelf.message({
              type: "success",
              message: "修改成功",
            });
            this.$router.push("/warehoseconfig/childWarehouseAdmin");
          } else {
            this.$messageSelf.message({
              type: "error",
              message: ok.data.msg,
            });
          }
        });
      }
    },
    value2Event(val) {
      this.value2 = val;
    },
    clickNumber(v) {
      let input8 = document.querySelector(".setTransition");
      let input8_input = document.querySelector(".setTransition .el-input");
      if (v) {
        input8.style.width = "142px";
        input8_input.style.display = "block";
      } else {
        input8.style.width = "70px";
        input8_input.style.display = "none";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";

.childWarehousePage {
  width: 100%;
  background: #eef1f8;
  padding: 10px;
  .setChildWarehouse {
    background: white;
    padding: 20px;
    .pageTitle {
      height: 32px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .titleText {
        font-size: 16px;
        margin: 0 10px;
      }
      .titleDistance {
        span {
          color: #599af4;
        }
      }
    }
    .setArea {
      // width: 100%;
      // height: 930px;
      background: #eef1f8;
      border: 1px #d8dce7 dotted;
      border-radius: 10px;
      .temporarily_no {
        // height: 930px;
        font-size: 22px;
        position: relative;
      }
    }
    .newChildWarehouse {
      display: flex;
      align-items: center;
      height: 50px;
      .newChildWarehouseText {
        font-size: 16px;
        margin: 0 0 0 10px;
      }
    }
    .someInput {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .setInput {
        display: flex;
        align-items: center;
        margin: 0 28px 16px 0;
      }
      .setTransition {
        transition: 0.3s;
      }
    }
    .setRemark {
      display: flex;
      align-items: center;
    }
  }
  .childViewDiv.active {
    background: "#367fff";
    border: "1px solid #0555c2";
    color: "white";
  }
  span {
    white-space: nowrap;
  }
  .addStar::before {
    top: 0 !important;
  }
}
</style>
<style lang="scss">
.setTransition {
  .el-checkbox__inner {
    border-radius: 50%;
  }
}
.setRemark {
  .el-textarea {
    width: 1110px;
    height: 54px;
  }
}
</style>