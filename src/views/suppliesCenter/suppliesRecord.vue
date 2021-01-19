<template>
  <div id="mateAdmin">
    <!-- 这是物料记录页面 -->
    <div class="roleName">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="nameBox">
            <div class="roleName-text">物料类型：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="mateTypeValue"
                placeholder="请选择物料类型"
                @change="mateTypeValues"
                clearable
              >
                <el-option
                  v-for="item in mateTypeValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">物料名称：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="mateNameValue"
                placeholder="请选择物料名称"
                @change="mateNameValues"
                clearable
              >
                <el-option
                  v-for="item in mateNameValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">供应商：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="supNameValue"
                placeholder="请选择供应商"
                @change="supNameValues"
                clearable
              >
                <el-option
                  v-for="item in supNameValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">品牌：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="brandNameValue"
                placeholder="请选择品牌"
                @change="brandNameValues"
                clearable
              >
                <el-option
                  v-for="item in brandNameValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">类型：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="anyTypeValue"
                placeholder="请选择类型"
                @change="anyTypeValues"
                clearable
              >
                <el-option
                  v-for="item in anyTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="timeChoose nameBox">
          <div class="timeBox zujianBox">
            <div class="roleName-text">创建时间：</div>
            <div>
              <dateTime
                :dateTimeData="datetimeDates"
                @getDateTime="getStartTime"
                ref="startTime"
              />
            </div>
            <!-- 开始时间 -->
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="datetimeDate"
                @getDateTime="getEndTime"
                ref="endTime"
              />
            </div>
            <!-- 结束时间 -->
          </div>
          <!-- 创建时间 -->
          <div class="roleName-botton">
            <div class="queryBtn" @click="clickQuery">查询</div>
            <div class="clearBtn" @click="clearInput">清空</div>
          </div>
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
            <div class="successBtn" @click="createChildWarehouse">创建</div>
            <!-- <div class="bianjiUser" @click="editChildWarehouse">编辑</div> -->
            <div class="successBtn" @click="educe">导出</div>
            <!-- <div class="errorBtn" @click="delChildWarehouse">删除</div> -->
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
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="71"
            >
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="所属公司"
              align="center"
              width="170"
              min-width="170"
            >
            </el-table-column>
            <el-table-column
              prop="materielName"
              label="物料名称"
              align="left"
              width="150"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="materielCode"
              label="物料编号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="specName"
              label="规格"
              align="center"
              width="180"
              min-width="180"
            >
            </el-table-column>
            <el-table-column
              prop="materielType"
              label="物料类型"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="braName" label="品牌" align="center">
            </el-table-column>
            <el-table-column
              prop="supName"
              label="供应商"
              align="center"
              width="160"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="type" label="类型" align="center" width="80">
            </el-table-column>
            <el-table-column prop="num" label="数量" align="center" width="80">
            </el-table-column>
            <el-table-column
              prop="actualInventory"
              label="实际库存"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="" label="领取人" align="center">
            </el-table-column>
            <el-table-column
              prop="createUser"
              label="创建人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="180"
              min-width="180"
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

    <!-- 弹框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      custom-class="animate__animated animate__zoomIn"
    >
      <div class="dialogBox">
        <div class="boxTitle">
          <span>物料记录信息</span>
        </div>
        <div class="boxContent">
          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">所属公司</span>
              </div>
              <el-select
                v-model="dialogBelongCompany"
                clearable
                placeholder="请选择所属公司"
                @change="dialogBelongCompanys"
              >
                <el-option
                  v-for="item in dialogBelongCompanyData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">物料名称</span>
              </div>
              <el-select
                v-model="dialogMateName"
                clearable
                placeholder="请选择物料名称"
                @change="dialogMateNames"
              >
                <el-option
                  v-for="item in dialogMateNameData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">物料编号</span>
              </div>
              <el-input v-model="dialogMateCode" :disabled="true"></el-input>
            </div>
          </div>
          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">供应商</span>
              </div>
              <el-input v-model="dialogSupValue" :disabled="true"></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">规格</span>
              </div>
              <el-input v-model="dialogSpecValue" :disabled="true"></el-input>
            </div>

            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">品牌</span>
              </div>
              <el-input v-model="dialogBrandValue" :disabled="true"></el-input>
            </div>
          </div>
          <div class="content_one">
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">数量</span>
              </div>
              <el-input
                v-model="dialogQuantity"
                placeholder="请输入数量"
              ></el-input>
            </div>
            <div class="name_con">
              <div class="name_con_title">
                <span class="addStar">类型</span>
              </div>
              <el-select
                v-model="dialogTypeValue"
                clearable
                placeholder="请选择类型"
                @change="dialogTypeValues"
              >
                <el-option
                  v-for="item in dialogTypeValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div @click="dialogFormVisible = false" class="quxiaoBox">取 消</div>
        <div @click="okBtn" class="sureBtn">提 交</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import dateTime from "../../components/commin/dateTime.vue"; //时间
import {
  createMateRecord,
  queryMateRecord,
  queryMateAdmintj,
  querySupplierCon,
  queryBrandCon,
  delMateRecord,
} from "../../api/api";
import { clearTimeInput, getCookie, reduceFun } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        placeholder: "请选择开始时间",
      },
      title: "",
      anyTypeValue: "",
      mateNameValue: "",
      mateNumValue: "",
      mateTypeValue: "",
      supNameValue: "",
      brandNameValue: "",
      mateNameValueData: [],
      mateNumValueData: [],
      mateTypeValueData: [
        {
          value: "1",
          label: "纸箱",
        },
        {
          value: "2",
          label: "胶带",
        },
        {
          value: "3",
          label: "打印纸",
        },
      ],
      supNameValueData: [],
      brandNameValueData: [],
      anyTypeData: [
        {
          value: "1",
          label: "入库",
        },
        {
          value: "2",
          label: "出库",
        },
        {
          value: "3",
          label: "残次品",
        },
      ],

      //----------弹窗里面的select选择框和输入框开始---------------
      dialogBelongCompanyData: [],
      dialogBelongCompany: "",
      dialogMateName: "",
      dialogMateCode: "",
      dialogQuantity: "",
      dialogSupValue: "",
      dialogSupData: [],
      dialogSpecData: [],
      dialogMateNameData: [],
      dialogTypeValueData: [
        {
          value: "1",
          label: "入库",
        },
        {
          value: "2",
          label: "出库",
        },
        {
          value: "3",
          label: "残次品",
        },
      ],
      dialogTypeValue: "",
      dialogSpecValue: "",
      dialogBrandValue: "",
      //----------弹窗里面的select选择框和输入框结束---------------
      tableData: [],
      multipleSelection: [],
      queryData: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          materielName: "",
          materielType: "",
          supId: "",
          braId: "",
          type: "",
          startTime: "",
          endTime: "",
        },
      },
      pageComponentsData: {
        pageNums: 0,
      },

      dialogFormVisible: false,
      mateId: "",
      allBrandData: [],
      allSupData: [],
      allSpecData: [],
      allBrandId: "",
      allSupId: "",
      allSpecId: "",
      mateNameData: [],
      allQueryInfor: {
        id: "",
        supId: "",
        braId: "",
        type: "",
        startTime: "",
        endTime: "",
      },
      // 导出文件名称
      filename: "物料记录信息",
      // 导出表格宽度是否auto
      autoWidth: true,
      // 导出文件格式
      bookType: "xlsx",
      pageQueryFun: "",
      orgId: "",
      materielId: "",
    };
  },
  mounted() {
    //查询物料名称的请求
    queryMateAdmintj({ wareId: "", id: "" }).then((ok) => {
      // console.log(ok)
      if (ok.data.code === "10000") {
        ok.data.result.forEach((v) => {
          this.dialogMateNameData.push({
            value: v.materielName,
            label: v.materielName,
          });
          this.mateNameValueData.push({
            value: v.materielName,
            label: v.materielName,
          });
        });
      }
    });

    //查询供应商
    querySupplierCon({ wareId: "", id: "" }).then((ok) => {
      if (ok.data.code === "10000") {
        ok.data.result.forEach((v) => {
          this.supNameValueData.push({
            value: v.id,
            label: v.supFullName,
          });
        });
        this.supNameValueData = reduceFun(this.supNameValueData);
      }
    });
    //查询品牌
    queryBrandCon({ wareId: "", id: "" }).then((ok) => {
      if (ok.data.code === "10000") {
        ok.data.result.forEach((v) => {
          this.brandNameValueData.push({
            value: v.id,
            label: v.braFullName,
          });
          this.brandNameValueData = reduceFun(this.brandNameValueData);
        });
      }
    });
    this.pageQueryFun = () => {
      queryMateRecord(this.queryData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.changeData(ok.data.result);
          this.tableData = ok.data.result.list;
          this.tableData.forEach((v) => {
            this.anyTypeData.forEach((vv) => {
              if (v.type === +vv.value) {
                v.type = vv.label;
              }
            });
            this.mateTypeValueData.forEach((vvv) => {
              if (v.materielType === vvv.value) {
                v.materielType = vvv.label;
              }
            });
          });
        }
      });
    };
    this.pageQueryFun();
    this.dialogBelongCompanyData = this.$store.state.orgInfor.orgInforData;
  },
  methods: {
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    mateNameValues(val) {
      this.queryData.paras.materielName = val;
    },
    mateTypeValues(val) {
      this.queryData.paras.materielType = val;
    },
    supNameValues(val) {
      this.queryData.paras.supId = val;
    },
    brandNameValues(val) {
      this.queryData.paras.braId = val;
    },
    dialogBelongCompanys(val) {
      this.orgId = val;
    },
    dialogMateNames(val) {
      this.dialogMateName = val;
      //选择物料名称后自动将相关信息填入到对应框内
      queryMateAdmintj({ wareId: "", id: "", materielName: val }).then((ok) => {
        if (ok.data.code === "10000") {
          let res = ok.data.result[0];
          this.dialogMateCode = res.materielCode;
          this.dialogSpecValue = res.specName;
          this.dialogBrandValue = res.braName;
          this.dialogSupValue = res.supName;
          this.allSupId = res.supId;
          this.allBrandId = res.braId;
          this.allSpecId = res.specId;
          this.materielId = res.id;
        }
      });
    },
    dialogTypeValues(val) {
      this.dialogTypeValue = val;
    },
    anyTypeValues(val) {
      this.queryData.paras.type = val;
    },
    okBtn() {
      if (this.dialogBelongCompany === "") {
        return this.$messageSelf.message({
          message: "请选择所属公司",
          type: "warning",
        });
      }
      if (this.dialogMateName === "") {
        return this.$messageSelf.message({
          message: "请选择物料名称",
          type: "warning",
        });
      }
      if (this.dialogQuantity === "") {
        return this.$messageSelf.message({
          message: "请输入数量",
          type: "warning",
        });
      }
      if (this.dialogTypeValue === "") {
        return this.$messageSelf.message({
          message: "请选择类型",
          type: "warning",
        });
      }
      let createData = {
        wareId: getCookie("X-Auth-wareId"), //仓库ID
        wareName: getCookie("X-Auth-wareName"), //仓库名称X-Auth-wareName
        materielCode: this.dialogMateCode, //物料编码
        supId: this.allSupId, //供应商Id
        supName: this.dialogSupValue, //供应商名称
        braId: this.allBrandId, //品牌Id
        braName: this.dialogBrandValue, //品牌名称
        specId: this.allSpecId, //规格Id
        specName: this.dialogSpecValue, //规格名称(eg.10ml/瓶)
        type: +this.dialogTypeValue, //materielRecordType 物料入库类型（1-入库；2-出库；3-残废）
        num: this.dialogQuantity, //物料数量
        id: "", //修改时id为必须自动
        materielName: this.dialogMateName, //物料名称
        materielId: this.materielId, //物料id
        orgId: this.orgId, //委托公司id
        orgName: this.dialogBelongCompany, //委托公司
      };
      createMateRecord(createData).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            message: "创建成功",
            type: "success",
          });
          this.title = "";
          this.dialogBelongCompany = "";
          this.dialogMateName = "";
          this.dialogMateCode = "";
          this.dialogSupValue = "";
          this.dialogSpecValue = "";
          this.dialogBrandValue = "";
          this.dialogQuantity = "";
          this.dialogTypeValue = "";
          this.dialogFormVisible = false;
          this.pageQueryFun();
        } else {
          this.$messageSelf.message({
            message: ok.data.msg,
            type: "error",
          });
        }
      });
    },
    clickQuery() {
      //点击查询
      this.pageQueryFun();
    },
    clearInput() {
      //点击清空输入框
      clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      Object.keys(this.queryData.paras).forEach((v) => {
        this.queryData.paras[v] = "";
      });
      this.pageQueryFun();
    },
    createChildWarehouse() {
      //创建
      this.title = "添加物料记录";
      this.dialogFormVisible = true;
    },
    educe() {
      //导出表格
      if (this.tableData.length === 0) {
        return this.$messageSelf.message({
          message: "表格为空不能导出",
          type: "error",
        });
      }
      import("../../js-xlsx/Export2Excel").then((excel) => {
        // 设置导出表格的头部
        const tHeader = [
          "所属公司",
          "物料名称",
          "物料编号",
          "规格",
          "物料类型",
          "品牌",
          "供应商",
          "类型",
          "数量",
          "实际库存",
          "领取人",
          "创建人",
          "创建时间",
        ];
        // 设置要导出的属性
        const filterVal = [
          "orgName",
          "materielName",
          "materielCode",
          "specName",
          "materielType",
          "braName",
          "supName",
          "type",
          "num",
          "actualInventory",
          "",
          "createUser",
          "createTime",
        ];
        // 获取当前展示的表格数据
        const list = this.tableData;
        // 将要导出的数据进行一个过滤
        const data = this.formatJson(filterVal, list);
        // 调用我们封装好的方法进行导出Excel
        excel.export_json_to_excel({
          // 导出的头部
          header: tHeader,
          // 导出的内容
          data,
          // 导出的文件名称
          filename: this.filename,
          // 导出的表格宽度是否自动
          autoWidth: this.autoWidth,
          // 导出文件的后缀类型
          bookType: this.bookType,
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
    // editChildWarehouse() {
    //   //编辑
    //   this.title = "编辑物料记录";
    //   if (!this.multipleSelection.length)
    //     return this.$messageSelf.message({
    //       message: "请选择要编辑的物料记录",
    //       type: "warning",
    //     });
    //   if (this.multipleSelection.length !== 1)
    //     return this.$messageSelf.message({
    //       message: "每次只能编辑一个物料记录信息",
    //       type: "warning",
    //     });
    //   this.dialogFormVisible = true;
    // },

    delChildWarehouse() {
      //删除
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length)
        return this.$messageSelf.message({
          message: "请选择要删除的物料记录",
          type: "warning",
        });
      this.$messageSelf
        .confirms(
          `确定要删除这${this.multipleSelection.length}条物料记录？`,
          "删除确认",
          {
            type: "info",
          }
        )
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {});
    },
    //删除的请求
    delRequest(data) {
      delMateRecord(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "删除成功",
          });
          this.pageQueryFun();
        } else {
          this.$messageSelf.message({
            type: "error",
            message: ok.data.msg ? ok.data.msg : "删除失败",
          });
        }
      });
    },

    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
      this.pageQueryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getStartTime(e) {
      this.queryData.paras.startTime = e;
    },
    getEndTime(e) {
      this.queryData.paras.endTime = e;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";
#mateAdmin {
  background: #eef1f8;
  padding: 20px 10px;
}
.roleName-choose {
  .name_type {
    display: flex;
    padding: 0 0 0 16px;
    .nameBox {
      display: flex;
      align-items: center;
      margin: 0 16px 0 0;
      .roleName-text {
        font-size: 14px;
        white-space: nowrap;
      }
      .roleName {
        height: 76px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #d1d6e2;
        .roleName-choose {
          width: 360px;
          display: flex;
          align-items: center;
          .roleName-text {
            margin: 0 10px 0 30px;
            font-size: 16px;
          }
        }
      }
    }
  }

  .roleName-botton {
    display: flex;
    align-items: center;
    .queryBtn {
      @include BtnFunction("success");
    }
    .clearBtn {
      @include BtnFunction();
      background: #fff;
      margin: 0 20px 0 10px;
    }
  }
  .timeChoose {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 0 16px;
    .titleBox {
      font-size: 14px;
    }
    .timeBox {
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
  margin: 20px 0 0 0;
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
        margin-left: 10px;
        @include BtnFunction("success");
      }
      .errorBtn {
        margin-left: 10px;
        @include BtnFunction("error");
      }
    }
  }
  .resultForm {
    padding: 16px 20px;
  }
}
</style>

<style lang="scss">
@import "../../assets/scss/btn.scss";

#mateAdmin {
  .titleBox {
    font-size: 14px;
  }

  .el-dialog__wrapper {
    // background: #eef1f8;
  }
  .el-dialog {
    width: 900px;
    height: 466px;
    // box-shadow: 0 0 5px 3px #e1e2e5;
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
      height: 336px;
      border-top: 1px solid #d1d6e2;
      border-bottom: 1px solid #d1d6e2;
      padding: 0 20px;
      .dialogBox {
        .boxTitle span {
          line-height: 56px;
          font-size: 16px;
          color: #5bb2fe;
          font-weight: 600;
          margin-left: 10px;
          position: relative;
        }
        .boxTitle span::before {
          content: "";
          width: 3px;
          height: 100%;
          background: #5bb2fe;
          position: absolute;
          left: -10px;
          top: 0px;
        }
        .boxContent {
          .content_one {
            display: flex;
            .name_con {
              display: flex;
              margin: 0 20px 16px 0;
              border: 1px solid #d1d6e2;
              border-radius: 3px;
              .name_con_title {
                width: 104px;
                background: #ecf1f7;
                border-right: 1px solid #d1d6e2;
                line-height: 34px;
                color: #000;
                padding: 0 16px;
                text-align: right;
                white-space: nowrap;
              }
              .el-select {
                width: 167px;
              }
              .el-input {
                width: 167px;
                .el-input__inner {
                  border: none;
                  color: #666;
                }
              }
            }
          }
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
        .sureBtn {
          @include BtnFunction("success");
          margin-left: 10px;
        }
      }
    }
  }
}
</style>