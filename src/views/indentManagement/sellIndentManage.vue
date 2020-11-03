<template>
  <div id="mianPage">
    <!-- 这是销售订单管理页面 -->
    <div class="roleName">
      <div class="headerHtml">
        <div class="headerInput">
          <div class="headerInput-one inputs">
            <div class="el-inputBox">
              <div class="el-inputBox-text">委托公司：</div>
              <div class="el-inputBox-checkBox">
                <el-select
                  v-model="mateTypeValue"
                  placeholder="请选择委托公司"
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
            <div class="el-inputBox">
              <div class="el-inputBox-text">渠道：</div>
              <div class="el-inputBox-checkBox">
                <el-select
                  v-model="mateNameValue"
                  placeholder="请选择渠道"
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
            <div class="el-inputBox">
              <div class="el-inputBox-text">订单来源：</div>
              <div class="el-inputBox-checkBox">
                <el-select
                  v-model="supNameValue"
                  placeholder="请选择订单来源"
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
            <div class="el-inputBox">
              <div class="el-inputBox-text">订单号：</div>
              <div class="el-inputBox-checkBox">
                <el-select
                  v-model="brandNameValue"
                  placeholder="请选择订单号"
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
          </div>
          <div class="headerInput-one headerInput-two">
            <div class="el-inputBox childrenIndent">
              <div class="el-inputBox-text">子单号：</div>
              <div class="el-inputBox-checkBox">
                <el-select
                  v-model="anyTypeValue"
                  placeholder="请选择子单号"
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
            <div class="el-inputBox childrenIndentState">
              <div class="el-inputBox-text">子单状态：</div>
              <div class="el-inputBox-checkBox">
                <el-select
                  v-model="anyTypeValue"
                  placeholder="请选择子单状态"
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
            <div class="el-inputBox stateChoose">
              <div class="el-inputBox-checkBox">
                <el-select
                  v-model="anyTypeValue"
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
            <div class="timeChoose">
              <div class="timeBox zujianBox">
                <div style="margin-right: 10px">
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
            </div>
            <div class="el-inputBox consignee">
              <div class="el-inputBox-text">收货人：</div>
              <div class="el-inputBox-checkBox">
                <el-input v-model="anyTypeValue" placeholder="请输入收货人">
                </el-input>
              </div>
            </div>
            <div class="el-inputBox block_hidden telphone">
              <div class="el-inputBox-text">联系电话：</div>
              <div class="el-inputBox-checkBox">
                <el-input v-model="anyTypeValue" placeholder="请输入联系电话">
                </el-input>
              </div>
            </div>
            <div class="el-inputBox block_hidden address">
              <div class="el-inputBox-text">收货地址：</div>
              <div class="el-inputBox-checkBox">
                <el-input v-model="anyTypeValue" placeholder="请输入收货地址">
                </el-input>
              </div>
            </div>
            <div class="header-botton">
              <div class="showBtn" @click="clickShow">
                <span>{{ stateChoose }}</span
                ><span class="el-icon-caret-bottom caret"></span>
              </div>
              <div class="queryBtn" @click="clickQuery">查询</div>
              <div class="clearBtn" @click="clearInput">清空</div>
            </div>
          </div>
        </div>
      </div>
      <div class="childWarehouseForm">
        <div class="formHeader">
          <div class="icon-title">
            <div class="icon-title-icon">
              <img src="../../assets/img/systemTitlemesa.png" />
            </div>
            <div class="icon-title-title">销售订单查询结果</div>
          </div>
          <div class="someBtn">
            <div class="setUser" @click="educe">导出</div>
          </div>
        </div>
        <div class="resultForm">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :stripe="true"
            empty-text="加载中请稍等"
            tooltip-effect="dark"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="60"
            >
            </el-table-column>
            <el-table-column prop="orgName" label="委托公司" align="center">
            </el-table-column>
            <el-table-column prop="materielName" label="渠道" align="center">
            </el-table-column>
            <el-table-column
              prop="materielCode"
              label="订单来源"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="specName" label="订单号" align="center">
            </el-table-column>
            <el-table-column
              prop="materielType"
              label="子订单号"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="braName" label="子订单状态" align="center">
            </el-table-column>
            <el-table-column prop="supName" label="体积(m³)" align="center">
            </el-table-column>
            <el-table-column prop="type" label="重量(KG)" align="center">
            </el-table-column>
            <el-table-column prop="num" label="推荐用箱" align="center">
            </el-table-column>
            <el-table-column
              prop="actualInventory"
              label="物流公司"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="" label="物流单号" align="center">
            </el-table-column>
            <el-table-column
              prop="createUser"
              label="仓库运费模板编号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="仓库运费模板名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="委托公司运费模板编号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="委托公司运费模板名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="预估运费（元）"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="下发时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="集计开始时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="集计完成时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="打印时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="打印人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="拣货开始时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="拣货完成时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="拣货人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="复核开始时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="复核完成时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="复核人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="复核照片"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="复核结果"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div class="pageComponent" v-if="this.tableData.length >= 10">
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
import { Message } from "element-ui";
import dateTime from "../../components/commin/dateTime.vue"; //时间
import {
  createMateRecord,
  delMateRecord,
  queryMateRecord,
  queryMateAdmin,
  querySupplier,
  queryBrand,
  querySpec,
  getFindWareOrg,
} from "../../api/api";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      index: 0,
      stateChoose: "展开",
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
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
      tableData1: [],
      multipleSelection: [],
      pagingQueryData: {
        //分页查询
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
        pageNums: 0, //一共多少条 //默认一页10条
      },

      dialogFormVisible: false,

      mateId: "",

      allBrandData: [],
      allSupData: [],
      allSpecData: [],

      allBrandId: "",
      allSupId: "",
      allSpecId: "",

      queryData: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          unReach: "",
          materielType: "",
          id: "",
          specId: "",
          supId: "",
          braId: "",
        },
      },
      mateNameData: [], //用来存储查询物料名称等相关信息
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
      queryComRes: [],
      orgId: "",
    };
  },
  mounted() {
    //查村委托公司
    // let queryComData = {
    //   wareId: "2A8B48391F4F4EB5BDEDF9EBA0B6BAE7",
    // };
    getFindWareOrg().then((ok) => {
      // console.log(ok);
      if (ok.code === "10000") {
        this.queryComRes = ok.result;
        this.queryComRes.forEach((v) => {
          this.dialogBelongCompanyData.push({
            value: v.orgName,
            label: v.orgName,
          });
        });
      }
    });

    //查询物料名称的请求
    let queryData = this.queryData;
    queryMateAdmin(queryData).then((ok) => {
      if (ok.data.code === "10000") {
        this.mateNameData = ok.data.result.list;
        let res = ok.data.result.list;
        res.forEach((v) => {
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

    let OtherQueryData = {
      orderBy: "createTime",
      pageNumber: 1,
      pageSize: 10,
      paras: {
        id: "",
      },
    };
    //查询供应商
    querySupplier(OtherQueryData).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        this.allSupData = ok.data.result.list;
        this.allSupData.forEach((v) => {
          this.supNameValueData.push({
            value: v.supName,
            label: v.supName,
          });
        });
      } else {
        Message({
          message: "查询供应商失败",
          type: "error",
        });
      }
    });
    //查询品牌
    queryBrand(OtherQueryData).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        this.allBrandData = ok.data.result.list;
        this.allBrandData.forEach((v) => {
          this.brandNameValueData.push({
            value: v.braFullName,
            label: v.braFullName,
          });
        });
      } else {
        Message({
          message: "查询品牌失败",
          type: "error",
        });
      }
    });
    //查询规格
    querySpec(OtherQueryData).then((ok) => {
      // console.log(ok);
      if (ok.data.code === "10000") {
        this.allSpecData = ok.data.result.list;
      } else {
        Message({
          message: "查询规格失败",
          type: "error",
        });
      }
    });
    this.pageQueryFun = () => {
      let pagingQueryData = this.pagingQueryData;
      queryMateRecord(pagingQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
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
  },
  watch: {},
  methods: {
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    mateNameValues(val) {
      this.mateNameValue = val;
      // this.mateNameData.forEach((v) => {
      //   if (val === v.materielName) {
      //     this.allQueryInfor.id = v.id;
      //   }
      // });
      this.pagingQueryData.paras.materielName = val;
    },
    mateNumValues(val) {
      this.mateNameValue = val;
    },
    mateTypeValues(val) {
      this.mateTypeValue = val;
      this.pagingQueryData.paras.materielType = val;
    },
    supNameValues(val) {
      this.supNameValue = val;
      this.allSupData.forEach((v) => {
        if (val === v.supName) {
          this.allQueryInfor.supId = v.id;
          this.pagingQueryData.paras.supId = v.id;
        }
      });
    },
    brandNameValues(val) {
      this.brandNameValue = val;
      this.allBrandData.forEach((v) => {
        if (val === v.barName) {
          this.allQueryInfor.braId = v.id;
          this.pagingQueryData.paras.braId = v.id;
        }
      });
    },

    dialogBelongCompanys(val) {
      this.dialogBelongCompany = val;
      this.queryComRes.forEach((v) => {
        if (val === v.orgName) {
          this.orgId = v.id;
          console.log(this.orgId);
        }
      });
    },
    dialogMateNames(val) {
      this.dialogMateName = val;
      this.mateNameData.forEach((v) => {
        if (val === v.materielName) {
          this.queryData.paras.id = v.id;
        }
      });
      //选择物料名称后自动将相关信息填入到对应框内
      this.tableData = [];
      let queryData = this.queryData;
      queryMateAdmin(queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          // this.tableData = ok.data.result.list;
          let res = ok.data.result.list[0];
          this.dialogMateCode = res.materielCode;
          this.dialogSpecValue = res.specName;
          this.dialogBrandValue = res.braName;
          this.dialogSupValue = res.supName;
          this.allSupData.forEach((v) => {
            if (this.dialogSupValue === v.supName) {
              this.allSupId = v.id;
            }
          });
          this.allBrandData.forEach((v) => {
            if (this.dialogBrandValue === v.braFullName) {
              this.allBrandId = v.id;
            }
          });
          this.allSpecData.forEach((v) => {
            if (this.dialogSpecValue === v.specValue) {
              this.allSpecId = v.id;
            }
          });
        }
      });
    },
    dialogTypeValues(val) {
      this.dialogTypeValue = val;
    },
    anyTypeValues(val) {
      this.anyTypeValue = val;
      this.allQueryInfor.type = val;
      this.pagingQueryData.paras.type = val;
    },
    okBtn() {
      this.dialogFormVisible = false;

      let createData = {
        wareId: "3B31612A55EE4EB09363A6E3805A3F6D", //仓库ID
        wareName: "", //仓库名称
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
        materielId: this.queryData.paras.id, //物料id
        orgId: this.orgId, //委托公司id
        orgName: this.dialogBelongCompany, //委托公司
      };
      // console.log(createData);
      createMateRecord(createData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          Message({
            message: "创建成功",
            type: "success",
          });
          this.pageQueryFun();
          this.dialogBelongCompany = "";
          this.dialogMateName = "";
          this.dialogMateCode = "";
          this.dialogSupValue = "";
          this.dialogSpecValue = "";
          this.dialogBrandValue = "";
          this.dialogQuantity = "";
          this.dialogTypeValue = "";
        } else {
          Message({
            message: ok.data.msg,
            type: "error",
          });
        }
      });
      this.title = "";
    },
    clickQuery() {
      //点击查询
      this.tableData = [];
      this.pageQueryFun();
    },
    clearInput() {
      //点击清空输入框
      this.mateTypeValue = "";
      this.mateNameValue = "";
      this.supNameValue = "";
      this.brandNameValue = "";
      this.anyTypeValue = "";
      this.clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      this.tableData = [];
      this.pagingQueryData.paras.materielName = "";
      this.pagingQueryData.paras.materielType = "";
      this.pagingQueryData.paras.supId = "";
      this.pagingQueryData.paras.braId = "";
      this.pagingQueryData.paras.type = "";
      this.pagingQueryData.paras.startTime = "";
      this.pagingQueryData.paras.endTime = "";
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
        return Message({
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
    editChildWarehouse() {
      //编辑
      this.title = "编辑物料记录";
      if (!this.multipleSelection.length) return Message("请选择要查看的账号");
      if (this.multipleSelection.length !== 1)
        return Message({
          message: "每次只能编辑一个物料记录信息，请重新选择",
          type: "warning",
        });
      this.dialogFormVisible = true;

      // let res = this.multipleSelection[0];
    },

    delChildWarehouse() {
      //删除
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length) return Message("请选择要删除的物料信息");
      this.$confirm("确定要删除该物料信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {
          Message("已取消删除");
        });
    },
    //删除的请求
    delRequest(data) {
      delMateRecord(data).then((ok) => {
        if (ok.data.code === "10000") {
          Message({
            type: "success",
            message: "删除成功",
          });
          this.pageQueryFun();
        } else {
          Message({
            type: "error",
            message: ok.data.msg ? ok.data.msg : "删除失败",
          });
        }
      });
    },
    clickShow() {
      this.index++;
      let showDiv = document.querySelectorAll(".block_hidden");
      let caret = document.querySelector(".caret");

      if (this.index % 2 !== 0) {
        this.stateChoose = "收起";
        showDiv.forEach((v) => {
          v.style.display = "flex";
        });
        caret.style.transform = "rotateZ(180deg)";
      } else {
        this.stateChoose = "展开";
        showDiv.forEach((v) => {
          v.style.display = "none";
        });
        caret.style.transform = "rotateZ(0)";
      }
    },

    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.pagingQueryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data); //用来改变分页器的条数
    },
    //用来改变分页器的条数
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getStartTime(e) {
      this.allQueryInfor.startTime = e;
      this.pagingQueryData.paras.startTime = e;
    },
    getEndTime(e) {
      this.allQueryInfor.endTime = e;
      this.pagingQueryData.paras.endTime = e;
    },
    clearTimeInput() {
      let input = document.getElementsByClassName("ivu-input");
      for (let i = 0; i < input.length; i++) {
        input[i].value = "";
      }
      let elInput = document.querySelectorAll(
        ".el-input--suffix .el-input__inner"
      );
      for (let i = 0; i < elInput.length; i++) {
        elInput[i].value = "";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/btn.scss";
#mianPage {
  background: #e6e7ea;
  padding: 16px;
}
.headerHtml {
  .headerInput {
    .headerInput-one {
      width: 100%;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      .el-inputBox {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-right: 20px;
        .el-inputBox-text {
          white-space: nowrap;
        }
      }
      .address {
      transition: 0.3s;

        margin-top: 16px;
        width: 25.7%;
        .el-inputBox-checkBox {
          width: 100%;
        }
      }
      .telphone {
      transition: 0.3s;

        width: 12.6%;
        .el-inputBox-checkBox {
          width: 100%;
        }
      }
      .block_hidden {
        display: none;
      }
      .childrenIndent {
        width: 21.8%;
        .el-inputBox-checkBox {
          width: 100%;
        }
      }
      .childrenIndentState {
        width: 18.2%;
        .el-inputBox-checkBox {
          width: 100%;
        }
      }
      .stateChoose {
        width: 6.5%;
      }
      .consignee {
        width: 11.3%;
        .el-inputBox-checkBox {
          width: 100%;
        }
      }
    }
    .headerInput-two {
      flex-wrap: wrap;
    }
    .inputs {
      .el-inputBox {
        width: 24%;
      }
      .el-inputBox-checkBox {
        width: 100%;
      }
    }
  }

  .header-botton {
    width: 12%;
    .caret {
      transition: 0.3s;
    }
    .showBtn {
      width: 50px;
      display: flex;
      white-space: nowrap;
      color: #888;
      position: relative;
      cursor: pointer;
      .caret {
        font-size: 16px;
        position: absolute;
        left: 25px;
      }
    }
    display: flex;
    align-items: center;
    .queryBtn {
      @include BtnFunction("success");
    }
    .clearBtn {
      @include BtnFunction();
      background: #fff;
      margin: 0 14px 0 10px;
    }
  }
  .timeChoose {
    width: 23.4%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .titleBox {
      font-size: 16px;
    }
    .timeBox {
      display: flex;
      align-items: center;
      .line {
        width: 20px;
        height: 2px;
        background: #000;
        margin-right: 10px;
      }
    }
  }
}
.childWarehouseForm {
  margin: 16px 0 0 0;
  background: white;
  .formHeader {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d1d6e2;
    .icon-title {
      display: flex;
      margin: 24px 0 0 0;
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
        font-size: 16px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 20px 16px 0;
      .setUser {
        margin-right: 10px;
        @include BtnFunction("success");
      }
      .bianjiUser {
        margin-right: 10px;
        @include BtnFunction("success");
      }
      .remove {
        @include BtnFunction("error");
      }
      .goOn {
        margin-right: 10px;
        @include BtnFunction("success");
      }
    }
  }
  .resultForm {
    padding: 20px;
  }
  .pageComponent {
    margin: 20px 10px 0 0;
    text-align: right;
    height: 36px;
    background: #ffffff;
  }
}
</style>
<style lang="scss">
.headerInput {
  .el-select {
    width: 100%;
  }
  .childrenIndent {
    .el-select {
      width: 100%;
    }
  }
  .childrenIndentState {
    .el-select {
      width: 100%;
    }
  }
  .consignee {
    .el-select {
      width: 100%;
    }
  }
  .address {
    .el-select {
      width: 100%;
    }
  }
  .telphone {
    .el-select {
      width: 100%;
    }
  }
}
</style>

