<template>
  <div id="monitoringAidsManagement">
    <!-- 这是监控设备管理页面 -->
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
          <div class="el-inputBox-text">设备编号：</div>
          <div class="el-inputBox-checkBox" style="width: 150px">
            <el-select
              v-model="facilityCode"
              placeholder="请选择设备编号"
              @change="facilityCodes"
              clearable
            >
              <el-option
                v-for="item in facilityCodeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="timeChoose el-inputBox">
          <div class="el-inputBox-text titleBox">创建日期：</div>
          <div class="timeBox">
            <div>
              <dateTime
                :dateTimeData="datetimeDate"
                @getDateTime="getStartTime"
                ref="startTime"
              />
            </div>
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="datetimeDate1"
                @getDateTime="getEndTime"
                ref="endTime"
              />
            </div>
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
            prop="monitorName"
            label="设备名称"
            show-overflow-tooltip
            align="center"
            width="140"
          >
            <template slot-scope="scope">
              <div class="lookDeatil" @click="lookDetailEvent(scope.row)">
                {{ scope.row.monitorName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="monitorCode"
            label="设备编码"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="cdKey"
            label="序列号"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="ipAddress" label="IP地址" width="180">
          </el-table-column>
          <el-table-column prop="pointName" label="测点名称" width="180">
          </el-table-column>
          <el-table-column
            prop="childWareName"
            label="所属子仓"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="wareAreaName"
            label="所属区域"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column prop="createUser" label="创建人" align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180"
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
import {
  queryMonitoringAids,
  queryMonitoringAidsCon,
  delMonitoringAids,
} from "../../api/api";
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
      facilityCode: "",
      tableData: [],
      facilityCodeData: [],
      facilityNameData: [],
      multipleSelection: [],
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
          monitorName: "",
          monitorCode: "",
        },
      },
    };
  },
  mounted() {
    queryMonitoringAidsCon({
      monitorName: "",
      monitorCode: "",
    }).then((ok) => {
      if (ok.data.code === "10000") {
        ok.data.result.forEach((v) => {
          this.facilityNameData.push({
            value: v.id,
            label: v.pdaName,
          });
          this.facilityCodeData.push({
            value: v.pdaCode,
            label: v.pdaCode,
          });
        });
      }
    });
    this.queryFun();
  },
  methods: {
    queryFun() {
      queryMonitoringAids(this.queryData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
        }
      });
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
      this.facilityName = "";
      this.facilityCode = "";
      this.queryFun();
    },
    create() {
      this.$router.push({
        path: "/facilityManagement/createMonitoringAids",
        query: { type: "create" },
      });
    },
    edit() {
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要编辑的监控设备",
          type: "warning",
        });
      if (this.multipleSelection.length > 1)
        return this.$messageSelf.message({
          message: "只能选择一个监控设备进行编辑",
          type: "warning",
        });
      this.$router.push({
        path: "/facilityManagement/createMonitoringAids",
        query: { type: "edit", data: this.multipleSelection[0] },
      });
    },
    del() {
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length)
        return this.$messageSelf.message({
          message: "请选择要删除的监控设备",
          type: "warning",
        });
      this.$messageSelf
        .confirms("确定要删除该监控设备？", "删除提示", {
          type: "info",
        })
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {});
    },
    delRequest(data) {
      delMonitoringAids(data).then((ok) => {
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
        path: "/facilityManagement/createMonitoringAids",
        query: { type: "look", data },
      });
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    facilityNames(val) {
      this.queryData.paras.id = val;
    },
    facilityCodes(val) {
      this.queryData.paras.pdaCode = val;
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

#monitoringAidsManagement {
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

