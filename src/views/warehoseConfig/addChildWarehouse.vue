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
          （<span>长：10m 宽：10m 上北、下南、左西、右东</span>）
        </div>
      </div>
      <div class="setArea">
        <div class="temporarily_no">暂未划分子仓</div>
      </div>
      <div class="newChildWarehouse">
        <div class="newChildWarehouseImg">
          <img src="@/assets/img/systemTitlemesa.png" />
        </div>
        <div class="newChildWarehouseText">新建子仓</div>
      </div>
      <div class="someInput">
        <div class="input1">
          <span>子仓名称：</span>
          <el-input v-model="input1" placeholder="请输入内容"></el-input>
        </div>
        <div class="input2">
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
        <div class="input8">
          <el-checkbox v-model="checked" @change="clickNumber"
            >数字</el-checkbox
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
        <div class="input3">
          <span>子仓长：</span>
          <el-input
            v-model="input2"
            placeholder="请输入长度"
            type="number"
          ></el-input>
          <span>m</span>
        </div>
        <div class="input4">
          <span>子仓宽：</span>
          <el-input
            v-model="input3"
            placeholder="请输入宽度"
            type="number"
          ></el-input>
          <span>m</span>
        </div>
        <div class="input5">
          <span>子仓类型：</span>
          <el-select v-model="value2" filterable placeholder="请选择子仓类型">
            <el-option
              v-for="item in childWarehouseType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="input6">
          <span>距北距离：</span>
          <el-input
            v-model="input4"
            placeholder="请输入长度"
            type="number"
          ></el-input>
          <span>m</span>
        </div>
        <div class="input7">
          <span>距西距离：</span>
          <el-input
            v-model="input5"
            placeholder="请输入长度"
            type="number"
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
    };
  },
  methods: {
    goBack() {
      this.$router.replace("/warehoseconfig/childWarehouseAdmin");
    },
    submitData() {
      let data = {
        childWareCode: this.value1 + this.value3, //子仓编号
        childWareName: this.input1, //子仓名称
        northDistance: this.input4, //距北距离
        westDistance: this.input5, //距西距离
        wareId: this.$store.state.loginRequest.loginData.user.wareId, //父仓库ID
        wareLength: this.input2, //子仓长度
        wareWidth: this.input3,
        wareType: this.value2, //仓库类型
      };
      // console.log(data);
      //新增修改子仓信息,当传参带有ID时为修改,不带ID时则为新增
      add_edit_WH_Request(data).then((ok) => {
        console.log(ok);
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
        input8.style.width = "150px";
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
      .titleImg {
      }
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
      height: 470px;
      background: #eef1f8;
      border: 1px #d8dce7 dotted;
      border-radius: 10px;
      .temporarily_no {
        text-align: center;
        line-height: 470px;
        font-size: 22px;
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
        width: 206px;
        span {
          flex-shrink: 0;
        }
      }
      .input2 {
        display: flex;
        align-items: center;
        width: 252px;
        span {
          flex-shrink: 0;
        }
      }
      .input3 {
        display: flex;
        align-items: center;
        width: 244px;
        span {
          flex-shrink: 0;
        }
        span:nth-of-type(2) {
          font-size: 16px;
        }
      }
      .input4 {
        display: flex;
        align-items: center;
        width: 244px;
        span {
          flex-shrink: 0;
        }
        span:nth-of-type(2) {
          font-size: 16px;
        }
      }
      .input5 {
        display: flex;
        align-items: center;
        width: 276px;
        span {
          flex-shrink: 0;
        }
      }
      .input6 {
        display: flex;
        align-items: center;
        width: 244px;
        margin-right: 20px;
        span {
          flex-shrink: 0;
        }
        span:nth-of-type(2) {
          font-size: 16px;
        }
      }
      .input7 {
        display: flex;
        align-items: center;
        width: 244px;
        span {
          flex-shrink: 0;
        }
        span:nth-of-type(2) {
          font-size: 16px;
        }
      }
      .input8 {
        display: flex;
        align-items: center;
        transition: 0.5s;
        width: 70px;
        span {
          flex-shrink: 0;
        }
      }
    }
    .setRemark {
      display: flex;
      align-items: center;
      span {
        flex-shrink: 0;
      }
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
}
</style>
<style lang="scss">
.input1 {
  .el-input__inner {
    width: 134px;
  }
}
.input2 {
  .el-input {
    width: 184px;
  }
  .el-checkbox__inner {
    border-radius: 50%;
    margin-left: 10px;
  }
}
.input3 {
  .el-input {
    width: 163px;
    margin-right: 10px;
  }
}
.input4 {
  .el-input {
    width: 163px;
    margin-right: 10px;
  }
}
.input5 {
  .el-input {
    width: 204px;
  }
}
.input6 {
  .el-input {
    margin-right: 10px;
    width: 164px;
  }
}
.input7 {
  .el-input {
    margin-right: 10px;
    width: 164px;
  }
}
.input8 {
  .el-input {
    margin-right: 10px;
    width: 80px;
    margin: 0 10px;
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