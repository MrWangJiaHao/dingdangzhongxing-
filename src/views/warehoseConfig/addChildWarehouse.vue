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
        <div class="input1 addStar">
          <span>子仓名称：</span>
          <el-input v-model="input1" placeholder="请输入子仓名称"></el-input>
        </div>
        <div class="input2 addStar">
          <span>子仓编号：</span>
          <el-select v-model="value1" filterable placeholder="请选择子仓编号">
            <el-option
              v-for="item in childWarehouseSerial"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="input8 addStar">
          <el-checkbox v-model="checked" @change="clickNumber"
            >数字：</el-checkbox
          >
          <el-select v-model="value3" filterable placeholder="">
            <el-option
              v-for="item in childWarehouseNumber"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="input3 addStar">
          <span>子仓长：</span>
          <el-input
            v-model="input2"
            placeholder="请输入长度"
            type="number"
            @blur="childWarehouseViewEvent"
          ></el-input>
          <span>m</span>
        </div>
        <div class="input4 addStar">
          <span>子仓宽：</span>
          <el-input
            v-model="input3"
            placeholder="请输入宽度"
            type="number"
            @blur="childWarehouseViewEvent"
          ></el-input>
          <span>m</span>
        </div>
        <div class="input5 addStar">
          <span>子仓类型：</span>
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
        <div class="input6 addStar">
          <span>距北距离：</span>
          <el-input
            v-model="input4"
            placeholder="请输入长度"
            type="number"
            @blur="childWarehouseViewEvent"
          ></el-input>
          <span>m</span>
        </div>
        <div class="input7 addStar">
          <span>距西距离：</span>
          <el-input
            v-model="input5"
            placeholder="请输入长度"
            type="number"
            @blur="childWarehouseViewEvent"
          ></el-input>
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
    <div class="submitBtn">
      <div class="submitBtnBox">
        <el-button @click="goBack">取 消</el-button>
        <el-button type="primary" @click="submitData">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { add_edit_WH_Request } from "../../api/api";
import { Message } from "element-ui";

export default {
  data() {
    return {
      textarea: "",
      checked: false,
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      childWarehouseSerial: [
        {
          value: "A",
          label: "A",
        },
        {
          value: "B",
          label: "B",
        },
        {
          value: "C",
          label: "C",
        },
        {
          value: "D",
          label: "D",
        },
        {
          value: "E",
          label: "E",
        },
        {
          value: "F",
          label: "F",
        },
        {
          value: "G",
          label: "G",
        },
        {
          value: "H",
          label: "H",
        },
        {
          value: "I",
          label: "I",
        },
        {
          value: "J",
          label: "J",
        },
        {
          value: "K",
          label: "K",
        },
        {
          value: "L",
          label: "L",
        },
        {
          value: "M",
          label: "M",
        },
        {
          value: "N",
          label: "N",
        },
        {
          value: "O",
          label: "O",
        },
        {
          value: "P",
          label: "P",
        },
        {
          value: "Q",
          label: "Q",
        },
        {
          value: "R",
          label: "R",
        },
        {
          value: "S",
          label: "S",
        },
        {
          value: "T",
          label: "T",
        },
        {
          value: "U",
          label: "U",
        },
        {
          value: "V",
          label: "V",
        },
        {
          value: "W",
          label: "W",
        },
        {
          value: "X",
          label: "X",
        },
        {
          value: "Y",
          label: "Y",
        },
        {
          value: "Z",
          label: "Z",
        },
      ],
      value1: "",

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
      childWarehouseNumber: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "5",
          label: "5",
        },
        {
          value: "6",
          label: "6",
        },
        {
          value: "7",
          label: "7",
        },
        {
          value: "8",
          label: "8",
        },
        {
          value: "9",
          label: "9",
        },
      ],
      value3: "1",
      childWarehouseList: "",
    };
  },
  mounted() {
    //获取平面图的div
    let oDiv = document.querySelector(".temporarily_no");
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
  },
  methods: {
    goBack() {
      this.$router.replace("/warehoseconfig/childWarehouseAdmin");
    },
    submitData() {
      if (this.input1 === "") {
        return Message({
          type: "error",
          message: "请输入子仓名称",
        });
      } else if (this.value1 === "" || this.value3 === "") {
        return Message({
          type: "error",
          message: "请选择子仓编号",
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
          Message({
            type: "success",
            message: "创建成功",
          });
          this.$router.push("/warehoseconfig/childWarehouseAdmin");
        } else {
          Message({
            type: "error",
            message: ok.data.msg,
          });
        }
      });
    },
    clickNumber(v) {
      let input8 = document.querySelector(".input8");
      let input8_input = document.querySelector(".input8 .el-input");
      if (v) {
        input8.style.width = "8%";
        input8_input.style.display = "block";
      } else {
        input8.style.width = "4%";
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
        childDiv.className = "childViewDiv";
        oDiv.append(childDiv);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.childWarehousePage {
  width: 100%;
  background: #e8e9ec;
  padding: 10px;
  .setChildWarehouse {
    background: white;
    padding: 20px;
    border-bottom: 1px solid #d1d6e2;
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
      width: 100%;
      height: 930px;
      background: #eef1f8;
      border: 1px #d8dce7 dotted;
      border-radius: 10px;
      .temporarily_no {
        text-align: center;
        line-height: 930px;
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
      margin: 0 0 16px 0;
      height: 38px;
      .input1 {
        display: flex;
        align-items: center;
        width: 15%;
        margin-right: 16px;
      }
      .input2 {
        display: flex;
        align-items: center;
        width: 10%;
        margin-right: 16px;
      }
      .input3 {
        display: flex;
        align-items: center;
        width: 12.5%;
        margin-right: 16px;
      }
      .input4 {
        display: flex;
        align-items: center;
        width: 12.5%;
        margin-right: 16px;
      }
      .input5 {
        display: flex;
        align-items: center;
        width: 12.5%;
        margin-right: 16px;
      }
      .input6 {
        display: flex;
        align-items: center;
        width: 12.5%;
        margin-right: 16px;
      }
      .input7 {
        display: flex;
        align-items: center;
        width: 12.5%;
        margin-right: 16px;
      }
      .input8 {
        display: flex;
        align-items: center;
        transition: 0.5s;
        width: 4%;
        margin-right: 16px;
      }
    }
    .setRemark {
      display: flex;
      align-items: center;
    }
  }
  .submitBtn {
    width: 100%;
    height: 76px;
    background: white;
    display: flex;
    align-items: center;
    position: relative;
    .submitBtnBox {
      position: absolute;
      right: 30px;
      bottom: 20px;
    }
  }
  span {
    white-space: nowrap;
  }
  .addStar {
    position: relative;
  }
  .addStar::before {
    content: "*";
    font-size: 20px;
    color: red;
    position: absolute;
    left: -8px;
  }
}
</style>
<style lang="scss">
.input1 {
  .el-input__inner {
    width: 100%;
  }
}
.input2 {
  .el-input {
    width: 100%;
  }
  .el-checkbox__inner {
    border-radius: 50%;
  }
}
.input3 {
  .el-input {
    width: 100%;
  }
}
.input4 {
  .el-input {
    width: 100%;
  }
}
.input5 {
  .el-input {
    width: 100%;
  }
}
.input6 {
  .el-input {
    width: 100%;
  }
}
.input7 {
  .el-input {
    width: 100%;
  }
}
.input8 {
  .el-input {
    width: 100%;
    display: none;
  }
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