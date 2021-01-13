<template>
  <div class="childWarehousePage">
    <!-- 这里创建子仓的页面 -->
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
        <div class="tooltipBox"></div>
        <div class="temporarily_no">
          <!-- 这里展示子仓平面图 -->
        </div>
      </div>
      <div class="newChildWarehouse">
        <div class="newChildWarehouseImg">
          <img src="@/assets/img/systemTitlemesa.png" />
        </div>
        <div class="newChildWarehouseText">新建子仓</div>
      </div>
      <div class="someInput">
        <div class="setInput">
          <span class="addStar">子仓名称：</span>
          <el-input v-model="input1" placeholder="请输入子仓名称"></el-input>
        </div>
        <div class="setInput">
          <span class="addStar">子仓编号：</span>
          <div style="width: 80px">
            <el-select v-model="value1" filterable>
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
          <span class="addStar"
            ><el-checkbox v-model="checked" @change="clickNumber"
              >数字：</el-checkbox
            ></span
          >
          <div style="width: 70px">
            <el-select v-model="value3" filterable>
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
              @blur="childWarehouseViewEvent"
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
              @blur="childWarehouseViewEvent"
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
              @blur="childWarehouseViewEvent"
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
              @blur="childWarehouseViewEvent"
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
        >
        </el-input>
      </div>
    </div>
    <div class="footerBtn">
      <div class="backBtn" @click="back">返回</div>
      <div class="submitBtn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import { add_edit_WH_Request } from "../../api/api";

export default {
  data() {
    return {
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
      childWarehouseList: "",
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
    this.mouseoutEvent();
  },
  methods: {
    mouseoutEvent() {
      let tooltipBox = document.querySelector(".tooltipBox");
      document.querySelectorAll(".childViewDiv").forEach((v) => {
        v.onmouseover = (e) => {
          tooltipBox.style.left = e.pageX + "px";
          tooltipBox.style.top = e.pageY - 50 + "px";
          tooltipBox.style.display = "block";
          tooltipBox.innerHTML = v.innerHTML;
        };
        v.onmouseout = () => {
          tooltipBox.style.display = "none";
        };
      });
    },
    changeSize() {
      let setArea = document.querySelector(".setArea");
      setArea.style.width = "100%";
      setArea.style.height = setArea.offsetWidth / 2 + "px";
    },
    saveDiv() {
      let oDiv = document.querySelector(".temporarily_no");
      let childViewDiv = document.querySelectorAll(".childViewDiv");
      childViewDiv.forEach((v) => {
        // console.log(v);
        if (v !== null) {
          oDiv.removeChild(v);
        }
      });
      //获取平面图的div
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
        childDiv.style.overflow = "hidden";
        childDiv.style.textOverflow = "ellipsis";
        childDiv.style.whiteSpace = "nowrap";
        childDiv.style.fontSize = "10px";
        childDiv.innerHTML = childWarehouseList[i].childWareName;
        childDiv.className = "childViewDiv";
        oDiv.append(childDiv);
      }
    },
    back() {
      this.$router.replace("/warehoseconfig/childWarehouseAdmin");
    },
    submit() {
      if (this.input1 === "") {
        return this.$messageSelf.message({
          type: "error",
          message: "请输入子仓名称",
        });
      } else if (this.value1 === "" || this.value3 === "") {
        return this.$messageSelf.message({
          type: "error",
          message: "请选择子仓编号",
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
      }
      let data = {
        childWareCode: this.value1 + this.value3, //子仓编号
        childWareName: this.input1, //子仓名称
        northDistance: this.input4, //距北距离
        westDistance: this.input5, //距西距离
        wareId: this.$store.state.loginRequest.loginData.user.wareId, //父仓库ID
        wareLength: this.input2, //子仓长度
        wareWidth: this.input3, //子仓宽度
        wareType: this.value2, //仓库类型
        remark: this.textarea, //备注
        createUser: this.$store.state.loginRequest.loginData.user.loginName,
      };
      //新增修改子仓信息,当传参带有ID时为修改,不带ID时则为新增
      add_edit_WH_Request(data).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "创建成功",
          });
          this.$router.push("/warehoseconfig/childWarehouseAdmin");
        } else {
          this.$messageSelf.message({
            type: "error",
            message: ok.data.msg,
          });
        }
      });
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
    value2Event(val) {
      this.value2 = val;
    },
    childWarehouseViewEvent() {
      if (
        this.input4 !== "" &&
        this.input5 !== "" &&
        this.input2 !== "" &&
        this.input3 !== ""
      ) {
        if (this.input2 < 1 || this.input3 < 1) {
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
          // document.documentElement.scrollTop = 230;
          const ScrollTop = (number = 0, time) => {
            if (!time) {
              document.body.scrollTop = document.documentElement.scrollTop = number;
              return number;
            }
            const spacingTime = 5; // 设置循环的间隔时间  值越小消耗性能越高
            let spacingInex = time / spacingTime; // 计算循环的次数
            let nowTop =
              document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
            let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
            let scrollTimer = setInterval(() => {
              if (spacingInex > 0) {
                spacingInex--;
                ScrollTop((nowTop += everTop));
              } else {
                clearInterval(scrollTimer); // 清除计时器
              }
            }, spacingTime);
          };
          ScrollTop(230, 300);
          let oDiv = document.querySelector(".temporarily_no");
          let previewDiv = document.querySelector(".previewDiv");
          if (previewDiv !== null) {
            oDiv.removeChild(previewDiv);
          }
          let childDiv = document.createElement("div");
          childDiv.style.width = (this.input2 * oDiv.offsetWidth) / 200 + "px";
          childDiv.style.height = (this.input3 * oDiv.offsetWidth) / 200 + "px";
          childDiv.style.background = "#ddd";
          childDiv.style.position = "absolute";
          childDiv.style.left = (this.input5 * oDiv.offsetWidth) / 200 + "px";
          childDiv.style.top = (this.input4 * oDiv.offsetWidth) / 200 + "px";
          childDiv.style.textAlign = "center";
          childDiv.style.border = "1px solid #ddd";
          childDiv.style.borderRadius = this.input2 * 0.2 + "px";
          childDiv.style.lineHeight =
            (this.input3 * oDiv.offsetWidth) / 200 + "px";
          childDiv.style.fontSize = "10px";
          childDiv.innerHTML = this.input1;
          childDiv.className = "previewDiv";
          oDiv.append(childDiv);
        }
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
.tooltipBox {
  position: absolute;
  padding: 10px 20px;
  background: #303133;
  color: #fff;
  display: none;
  border-radius: 4px;
  z-index: 100;
}
</style>