<template>
  <div id="PDAmanagement">
    <!-- 这是PDA管理页面 -->
    <div class="headerHtml">
      <div class="headerInput">
        <div class="el-inputBox">
          <div class="el-inputBox-text">设备名称：</div>
          <div class="el-inputBox-checkBox" style="width: 160px">
            <el-select
              v-model="facilityName"
              placeholder="请选择设备名称"
              @change="facilityNames"
              clearable
            >
              <el-option
                v-for="item in facilityNameData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">PDA型号：</div>
          <div class="el-inputBox-checkBox" style="width: 150px">
            <el-select
              v-model="PDAtype"
              placeholder="请选择PDA型号"
              @change="PDAtypes"
              clearable
            >
              <el-option
                v-for="item in PDAtypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">品牌：</div>
          <div class="el-inputBox-checkBox" style="width: 150px">
            <el-select
              v-model="PDAbrand"
              placeholder="请选择品牌"
              @change="PDAbrands"
              clearable
            >
              <el-option
                v-for="item in PDAbrandData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">使用状态：</div>
          <div class="el-inputBox-checkBox">
            <el-select
              v-model="useState"
              placeholder="请选择使用状态"
              @change="useStates"
              clearable
            >
              <el-option
                v-for="item in useStateData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="timeChoose el-inputBox">
          <div class="el-inputBox-text titleBox">采购日期：</div>
          <div class="timeBox">
            <div>
              <dateTime
                :dateTimeData="datetimeDate"
                @getDateTime="getStartTime"
                ref="startTime"
              />
            </div>
            <!-- 开始时间 -->
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="datetimeDate1"
                @getDateTime="getEndTime"
                ref="endTime"
              />
            </div>
            <!-- 结束时间 -->
          </div>
        </div>
      </div>
      <div class="header-botton">
        <div class="queryBtn" @click="clickQuery">查询</div>
        <div class="clearBtn" @click="clearInput">清空</div>
      </div>
    </div>
    <div class="childWarehouseForm">
      <div class="formHeader">
        <div class="icon-title">
          <div class="icon-title-icon">
            <img src="../../assets/img/systemTitlemesa.png" />
          </div>
          <div class="icon-title-title">查询结果</div>
        </div>
        <div class="someBtn">
          <div class="successBtn" @click="create">创建</div>
          <div class="successBtn" @click="edit">编辑</div>
          <div class="errorBtn" @click="del">删除</div>
        </div>
      </div>
      <div class="resultForm">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :stripe="true"
          tooltip-effect="dark"
        >
          <el-table-column
            type="selection"
            width="82"
            align="center"
            fixed="left"
          >
          </el-table-column>
          <el-table-column label="序号" align="center" type="index" width="71">
          </el-table-column>
          <el-table-column
            prop="pdaName"
            label="设备名称"
            show-overflow-tooltip
            align="center"
            width="140"
          >
            <template slot-scope="scope">
              <div class="lookDeatil" @click="lookDetailEvent(scope.row)">
                {{ scope.row.pdaName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="pdaCode"
            label="PDA型号"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="braName"
            label="品牌"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="productionDate" label="出厂日期" width="180">
          </el-table-column>
          <el-table-column prop="purchaseDate" label="采购日期" width="180">
          </el-table-column>
          <el-table-column prop="cdKey" label="序列号" width="160">
          </el-table-column>
          <el-table-column
            prop="qualityDate"
            label="质保周期(月)"
            align="center"
            width="110"
          >
          </el-table-column>
          <el-table-column prop="image" label="图片">
            <template slot-scope="scope">
              <div class="lookDeatil" @click="lookDetailEvent(scope.row)">
                {{ scope.row.image }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createUser" label="创建人" align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="enableStatus"
            label="是否使用"
            align="center"
          ></el-table-column>
        </el-table>
        <div class="pageComponent">
          <pagecomponent
            :pageComponentsData="pageComponentsData"
            @getPageNum="getPageNum"
            @sureSuccssBtn="sureSuccssBtn"
          ></pagecomponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { queryPDApage, delPDA, queryPDAcon } from "../../api/api";
import { clearTimeInput } from "../../utils/validate";
import dateTime from "../../components/commin/dateTime.vue"; //时间
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      facilityName: "",
      PDAtype: "",
      PDAbrand: "",
      useState: "",
      tableData: [],
      PDAtypeData: [],
      facilityNameData: [],
      PDAbrandData: [],
      multipleSelection: [],
      useStateData: [
        {
          value: "0",
          label: "未使用",
        },
        {
          value: "1",
          label: "已使用",
        },
      ],
      datetimeDate: {
        placeholder: "请选择开始日期",
      },
      datetimeDate1: {
        placeholder: "请选择结束日期",
      },
      pageComponentsData: {
        pageNums: 0,
      },
      queryData: {
        orderBy: "createTime",
        pageNumber: "1",
        pageSize: "10",
        paras: {
          pdaName: "",
          cdKey: "",
          supName: "",
          purchaseDate: "",
          enableStatus: "",
        },
      },
    };
  },
  //   beforeRouteEnter(to, from, next) {

  //   },
  mounted() {
    queryPDAcon({
      pdaName: "",
      cdKey: "",
      supName: "",
      purchaseDate: "",
      enableStatus: "",
    }).then((ok) => {
      if (ok.data.code === "10000") {
        ok.data.result.forEach((v) => {
          this.facilityNameData.push({
            value: v.id,
            label: v.pdaName,
          });
          this.PDAtypeData.push({
            value: v.pdaCode,
            label: v.pdaCode,
          });
          this.PDAbrandData.push({
            value: v.braName,
            label: v.braName,
          });
        });
      }
    });
    this.queryFun();
  },
  methods: {
    queryFun() {
      queryPDApage(this.queryData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.tableData.forEach((v) => {
            v.enableStatus = this.useStateFun(v.enableStatus);
          });
          this.changeData(ok.data.result);
        }
      });
    },
    useStateFun(data) {
      let states = "";
      switch (data) {
        case 0:
          states = "未使用";
          break;
        case 1:
          states = "已使用";
          break;
        default:
          break;
      }
      return states;
    },
    clickQuery() {
      //点击查询
      this.queryFun();
    },
    clearInput() {
      //点击清空
      clearTimeInput();
      Object.keys(this.queryData.paras).forEach((v) => {
        this.queryData.paras[v] = "";
      });
      this.queryFun();
    },
    create() {
      this.$router.push({
        path: "/facilityManagement/createPDA",
        query: { type: "create" },
      });
    },
    edit() {
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要编辑的PDA设备",
          type: "warning",
        });
      if (this.multipleSelection.length > 1)
        return this.$messageSelf.message({
          message: "只能选择一个PDA设备进行编辑",
          type: "warning",
        });
      if (this.multipleSelection[0].enableStatus === "已使用") {
        return this.$messageSelf.message({
          message: "该设备已使用无法编辑",
          type: "warning",
        });
      }
      this.$router.push({
        path: "/facilityManagement/createPDA",
        query: { type: "edit", data: this.multipleSelection[0] },
      });
    },
    del() {
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (item.enableStatus === "未使用") {
          if (!arr.includes(item.id)) {
            arr.push(item.id);
          }
        } else {
          return this.$messageSelf.message({
            message: `${v.pdaName}设备已使用无法删除`,
            type: "warning",
          });
        }
      });
      if (!arr.length)
        return this.$messageSelf.message({
          message: "请选择要删除的PDA设备",
          type: "warning",
        });
      this.$messageSelf
        .confirms("确定要删除该PDA设备？", "删除提示", {
          type: "info",
        })
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {});
    },
    delRequest(data) {
      delPDA(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({ message: "删除成功", type: "success" });
          this.queryFun();
        } else {
          this.$messageSelf.message({ message: "删除失败", type: "error" });
        }
      });
    },
    lookDetailEvent(data) {
      this.$router.push({
        path: "/facilityManagement/createPDA",
        query: { type: "look", data },
      });
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    facilityNames(val) {
      this.queryData.paras.orgId = val;
    },
    PDAtypes(val) {
      this.queryData.paras.stockCycle = +val;
    },
    PDAbrands(val) {
      this.queryData.paras.stockType = val;
    },
    useStates(val) {
      this.queryData.paras.orderSource = val;
    },
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
      this.queryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getStartTime(e) {
      this.queryData.paras.createStartTime = e;
    },
    getEndTime(e) {
      this.queryData.paras.createEndTime = e;
    },
  },
};
</script>

<style lang="scss" scpoed>
@import "../../assets/scss/btn.scss";

#PDAmanagement {
  background: #eef1f8;
  padding: 20px 10px;
  .headerHtml {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 0 20px;
    transition: 0.3s;
    .headerInput {
      display: flex;
      flex-wrap: wrap;
      .el-inputBox {
        display: flex;
        align-items: center;
        margin: 0 20px 16px 0;
        .el-inputBox-text {
          white-space: nowrap;
        }
      }
    }
    .header-botton {
      margin-bottom: 16px;
      display: flex;
      align-items: flex-end;
      .queryBtn {
        @include BtnFunction("success");
      }
      .clearBtn {
        @include BtnFunction();
        background: #fff;
        margin: 0 0 0 10px;
      }
    }
    .timeChoose {
      display: flex;
      justify-content: space-between;
      margin-right: 20px;
      .timeBox {
        height: 34px;
        display: flex;
        align-items: center;
        .line {
          width: 10px;
          height: 2px;
          background: #d1d6e2;
          margin: 0 10px;
        }
      }
    }
  }
  .childWarehouseForm {
    margin: 4px 0 0 0;
    background: white;
    .formHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #d1d6e2;
      .icon-title {
        display: flex;
        .icon-title-icon {
          width: 14px;
          height: 14px;
          margin: 0 0 0 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .icon-title-title {
          margin: 0 0 0 8px;
        }
      }
      .someBtn {
        display: flex;
        margin: 16px 20px 16px 0;
        .successBtn {
          @include BtnFunction("success");
          margin-left: 10px;
        }
        .errorBtn {
          @include BtnFunction("error");
          margin-left: 10px;
        }
      }
    }
    .resultForm {
      padding: 16px 20px;
    }
  }
}
</style>
<style lang="scss">
.facilityName {
  .el-select {
    width: 100%;
  }
}
</style>
