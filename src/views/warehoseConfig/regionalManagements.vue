  /*eslint-disable*/
<template>
  <div class="userSettingBox">
    <div class="fuzzyQueryBox">
      <div class="biaogeBox">
        <div class="displayalign zujianBox">
          <div class="noneIconTitle mr11">子仓名称:</div>
          <div class="mr20">
            <el-select
              v-model="pagingQueryData.paras.childWareName"
              slot="prepend"
              placeholder="请选择子仓名称"
              @input="getwareHouseValue"
            >
              <el-option
                v-for="(item, idx) in nameOfSubwareHouseDataArr"
                :key="idx"
                :label="item.childWareName"
                :value="idx"
              ></el-option>
            </el-select>
          </div>
        </div>
        <!-- 子仓名称 -->
        <div class="zujianBox">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">区域类型:</div>
            <div class="mr20">
              <el-select
                v-model="wareAreaTypeJson.wareAreaName"
                placeholder="请选择区域类型"
                @input="getAreaValue"
              >
                <el-option
                  v-for="(item, idx) in wareAreaTypeJson"
                  :key="idx"
                  :label="item.wareAreaName"
                  :value="idx"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 区域类型 -->
        <div class="zujianBox">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">区域名称:</div>
            <div class="mr20">
              <el-select
                v-model="pagingQueryData.paras.wareAreaName"
                slot="prepend"
                placeholder="请选择区域名称"
                @change="getAreaNameValue"
                @focus="getQuYuData"
              >
                <el-option
                  v-for="(item, idx) in AreaName.AreaNameData"
                  :key="idx"
                  :label="item.wareAreaName"
                  :value="idx"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- 区域名称 -->
      </div>
      <div class="btns">
        <div class="queryBtn zujianBox" @click="clickQueryUser">查询</div>
        <div class="clearBtn" @click="clearInputAll">清空</div>
      </div>
    </div>
    <!-- 头部 -->
    <div class="btnArr">
      <div style="background-color: #fff">
        <div class="meiyiyetitle">区域管理</div>
        <div class="btnClick">
          <div class="goOn" @click="shelfSetting">货架设置</div>
          <div class="lodopFunClear" @click="areaPlan">区域平面图</div>
          <div class="lodopFunClear" @click="warehousePlan">库位平面图</div>
          <div class="setUser" @click="createSubWarehouse">创建</div>
          <div class="bianjiUser" @click="editBtn">编辑</div>
          <div class="remove" @click="clearWarehouseplan">删除</div>
        </div>
      </div>
    </div>
    <!-- but按钮 -->

    <div v-if="quyuLook" class="pofixCenter">
      <div class="pofixCenter displayCenter">
        <div class="quyupinmianBoxMsg">
          <div class="heiderBoxs p20">
            <div class="closeTitle">区域平面图</div>
            <div class="closeIcon" @click="quyuLook = !quyuLook"></div>
          </div>
          <div class="bkf p20 botD1">
            <div class="setTitle mb20">货架编号</div>
            <div class="displayalign flexBetWeen">
              <div class="displayalign">
                <div class="mr20">
                  <div class="displayalign">
                    <div class="noneIconTitle mr11">
                      子仓名称
                      <span style="visibility: hidden">*</span>:
                    </div>
                    <div>
                      <el-select
                        v-model="
                          quyuzicanNameOfSubWareHouse.nameOfSubWareHouseName
                        "
                        slot="prepend"
                        :placeholder="nameOfSubWareHouse.placeholder"
                        @input="getZicankuOfSunWareHouseWareId"
                      >
                        <el-option
                          v-for="(item,
                          idx) in quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData"
                          :key="idx"
                          :label="item.childWareName"
                          :value="idx"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="displayalign">
                  <div class="noneIconTitle mr11">区域类型:</div>
                  <div class="mr20">存储区</div>
                  <div>拣货区</div>
                </div>
              </div>
              <div class="bianjiUser" @click="dinjichaxunquyutu">查询</div>
            </div>
          </div>
          <div class="centers bkf p20 botD1">
            <div class="displayalign mb20">
              委托公司1/销售仓/拣货区区域平面图（
              <div class="juli">上北、下南、左西、右东</div>
              ）
            </div>
            <div class="zuti bkf p20">
              <quyuLooker :quyuDatas="quyuDatas"></quyuLooker>
            </div>
          </div>
          <div class="p20 bkf tr">
            <div class="bianjiUser tr disinb" @click="quyuLook = !quyuLook">
              关闭
            </div>
          </div>
        </div>
      </div>
      <!-- 关闭部分 -->
    </div>
    <!-- 区域平面图 -->
    <div v-if="kuwieLook" class="pofixCenter">
      <div class="pofixCenter displayCenter">
        <div class="quyupinmianBoxMsg">
          <div class="heiderBoxs p20">
            <div class="closeTitle">库位平面图</div>
            <div class="closeIcon" @click="kuwieLook = !kuwieLook"></div>
          </div>
          <div class="bkf p20 botD1">
            <div class="setTitle mb20">库位编号</div>
            <div>
              <kuwieLooker :kuwieLookerDataJson="kuwieDatas" />
            </div>
          </div>
          <div class="p20 bkf tc">
            <div class="bianjiUser tr disinb" @click="kuwieLook = !kuwieLook">
              关闭
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 库位平面图 -->
    <div class="tableBox">
      <div style="background-color: #fff; padding: 20px 20px 0 20px">
        <div class="center">
          <el-table
            ref="multipleTable"
            :data="tableData"
            :stripe="true"
            :border="true"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="82"></el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="71"
              show-overflow-tooltip
            />
            <el-table-column
              label="子仓名称"
              width="119"
              prop="childWareName"
              show-overflow-tooltip
            />
            <el-table-column
              label="区域类型"
              width="119"
              property="wareAreaType"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              width="119"
              label="区域名称"
              prop="wareAreaName"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              width="119"
              label="区域长(m)"
              prop="wareAreaLength"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="区域宽(m)"
              width="119"
              prop="wareAreaWidth"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="货架总排数"
              width="119"
              prop="rowNum"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="货架总数"
              width="119"
              prop="shelfNum"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="货架总库位数"
              width="119"
              prop="seatNum"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="已用库位"
              width="119"
              prop="useSeat"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="未使用库位"
              width="119"
              prop="noSeat"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="创建人"
              width="120"
              prop="createUser"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="创建时间" width="250">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 表格主体 -->
        <div class="pageComponent">
          <pagecomponent
            :pageComponentsData="pageComponentsData"
            @getPageNum="getPageNum"
            @sureSuccssBtn="sureSuccssBtn"
          />
        </div>
      </div>
    </div>
    <!-- table表格 -->
    <div class="lineBox">
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { Message } from "element-ui";
import { post, logins } from "../../api/api";
import { mapState } from "vuex";
import quyuLooker from "../../components/quyuLooker";
import kuwieLooker from "../../components/kuwieLooker";
import { ajaxPost, getCookie } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    quyuLooker,
    kuwieLooker,
  },
  computed: {
    ...mapState(["editUser", "warehouseConfig"]),
  },
  data() {
    return {
      quyuDatas: {
        warehouseAdmin: {
          wareAreaWidth: 0,
          wareAreaLength: 0,
        },
        regionalManage: [],
      }, //区域平面图 data
      kuwieDatas: {
        quyu: {
          wareAreaLength: 5,
          wareAreaWidth: 4,
        },
        kuwie: [],
      }, //库位平面图 data
      isJianhuio: true, //是不是拣货区
      quyuLook: false, //区域平面图 显示
      kuwieLook: false, //库位平面图 显示
      kuwieDataJson: {},
      tableData: [
        {
          childWareName: "子仓名称",
          childWareId: "子仓id",
          wareAreaType: "区域类型（1-存储区；2-拣货区）",
          wareAreaName: "区域名称",
          wareAreaLength: "区域长度",
          wareAreaWidth: "区域宽度",
          x: "区域x坐标(距西距离)",
          y: "区域y坐标(距北距离)",
          rowNum: "区域摆放的货架总排数",
          shelfNum: "区域内的总货架数",
          seatNum: 1100,
          useSeat: 100,
          noSeat: 0,
          createUser: "创建人",
          createTime: "",
        },
      ],
      wareAreaTypeJson: [
        {
          wareAreaName: "存储区",
          wareAreaCode: 1,
        },
        {
          wareAreaName: "拣货区",
          wareAreaCode: 2,
        },
      ],
      multipleSelection: [],
      dropDowBox: {
        //下拉框需要的json
        title: "用户角色",
        dropDownBoxData: [], //下拉需要的data
        placeholder: "请选择用户角色",
      },
      nameOfSubWareHouse: {
        placeholdes: "请选择子仓名称",
        nameOfSubwareHouseData: [],
      },
      nameOfSubwareHouseDataArr: [],

      quyuzicanNameOfSubWareHouse: {
        placeholdes: "请选择子仓名称",
        nameOfSubwareHouseData: [],
        nameOfSubWareHouseName: "",
      },
      areaType: {
        placeholdes: "请选择区域类型",
        areaTypeData: [],
      },
      AreaName: {
        placeholdes: "请选择区域名称",
        AreaNameData: [],
      },
      LODOP: null,
      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10条
      },
      pagingQueryData: {
        //分页查询
        pageNumber: 1,
        pageSize: 10,
        paras: {
          childWareId: "",
          wareAreaType: "",
          id: "",
          childWareName: "",
          wareAreaName: "",
        },
      },
      childrenJson: {
        wareId: "43C86919FC7E4360838AA522B361A242",
        id: "1998999DDA5F4260A5E8598603929477",
      },
      zicandaixao: [],
      zhichangdaxiao: {
        wareLength: 0,
        wareWidth: 0,
      },
      regionalManage: [],
      flag: true,
    };
  },
  async created() {
    this.fasonPagIngQueryData();
    setTimeout(() => {
      this.dropDowBox.dropDownBoxData = this.warehouseConfig;
    }, 0);
  },
  methods: {
    //获取子仓名称
    async getZicankuOfSunWareHouseWareId(e) {
      let json = {
        childWareId: this.quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData[e]
          .childWareId,
      };
      let warehouseAdmin = await this._getChildWidth({
        wareId: getCookie("X-Auth-wareId"),
        id: this.quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData[e]
          .childWareId,
      });
      this.regionalManage = await this._getQuYuData(json);
    },
    dinjichaxunquyutu() {
      this.quyuDatas.warehouseAdmin.wareAreaWidth = this.wareLength;
      this.quyuDatas.warehouseAdmin.wareAreaLength = this.wareWidth;
      this.quyuDatas.regionalManage = this.regionalManage;
    },
    //获取区域名称
    getQuYuData() {
      let json = {
        childWareId: this.pagingQueryData.paras.childWareId,
      };
      this._getQuYuData(json);
    },
    async _getQuYuData(data) {
      let datas = await post({
        url: "/wbs-warehouse-manage/v1/pWarehouseArea/findRecord",
        data,
      });
      this.AreaName.AreaNameData = datas.result;
      return datas.result;
    },
    //点击查看区域平面图
    areaPlan() {
      this.quyuLook = !this.quyuLook;
    },
    //点击查看库位平面图
    warehousePlan() {
      if (!this.multipleSelection.length)
        return Message("请选择看那个库位的平面图");
      if (this.multipleSelection.length !== 1)
        return Message("只能选择一个库位查看库位图");

      this.kuwieDatas.quyu.wareAreaLength = this.multipleSelection[0].wareAreaLength;
      this.kuwieDatas.quyu.wareAreaWidth = this.multipleSelection[0].wareAreaWidth;
      this._quyuAsync({
        wareAreaId: this.multipleSelection[0].id,
      });
      this.kuwieLook = !this.kuwieLook;
    },
    //点击发送区域平面图js
    async _quyuAsync(data) {
      let datas = await post({
        url: "/wbs-warehouse-manage/v1/pWarehouseSeat/findWareSeatRecord",
        data,
      });
      this.kuwieDatas.kuwie = datas.result;
      return datas;
    },
    //点击货架设置
    shelfSetting() {
      this.$router.push({
        path: "/warehoseconfig/shelfSetting",
      });
    },
    //点击删除子仓
    clearWarehouseplan() {
      let arr = this._getIDArr();
      if (!arr.length) return Message("请选择要删除的用户");
      this.$confirm("确定要删除区域管理？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this._clearAjax({ ids: arr });
        })
        .catch((err) => {
          Message("已取消删除");
        });
    },
    //发送删除的ajax
    async _clearAjax(data) {
      let res = await post({
        url: "/wbs-warehouse-manage/v1/pWarehouseArea/delRecord",
        data,
      });
      if (res.code === "10000") {
        Message({
          type: "success",
          message: res.msg,
          duration: 1000,
          onClose() {
            window.location.reload();
          },
        });
      } else {
        Message(res.msg);
      }
    },
    //获取要删除的区域管理
    _getIDArr() {
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      return arr;
    },
    //获取子仓的长度
    async _getChildWidth(data) {
      let datas = await post({
        url: "/wbs-warehouse-manage/v1/pWarehouseChild/findRecord",
        data,
      });
      this.zicandaixao = datas.result;
      this.wareLength = this.zicandaixao[0].wareLength;
      this.wareWidth = this.zicandaixao[0].wareWidth;
      return this.zicandaixao;
    },
    //点击创建按钮
    createSubWarehouse() {
      if (this.multipleSelection.length == 0)
        return Message("请选择在那个子仓下创建区域");
      if (this.multipleSelection.length > 1)
        return Message("每次只能在一个子仓下创建区域");
      this._getChildWidth({
        wareId: getCookie("X-Auth-wareId"),
        id: this.multipleSelection[0].childWareId,
      });

      this.createWarehouseAjax(
        {
          childWareId: this.multipleSelection[0].childWareId,
        },
        "/warehoseconfig/createWarehouseConfig"
      );
    },
    //发送创建区域的ajax
    async createWarehouseAjax(data, path) {
      let datas = await post({
        url: "/wbs-warehouse-manage/v1/pWarehouseArea/findRecord",
        data,
      });
      if (this.zicandaixao.length == 0) return Message("网络较慢，请稍后重试");
      console.log(this.zicandaixao, "his.zicandaixao");
      if (datas.code === "10000") {
        localStorage.setItem(
          "warseHouseData",
          JSON.stringify({
            childDatas: datas.result,
            wareAreaLength: this.zicandaixao[0].wareLength,
            wareAreaWidth: this.zicandaixao[0].wareWidth,
            wareName: this.zicandaixao[0].childWareName,
            childWareId: this.multipleSelection[0].childWareId,
          })
        );
        return this.$router.push({
          path,
        });
      } else {
        Message(datas.result);
      }
    },
    //点击编辑按钮
    async editBtn() {
      if (this.multipleSelection.length == 0)
        return Message("请选择在哪一个区域下编辑");
      if (this.multipleSelection.length > 1)
        return Message("每次只能编辑一个区域，请重新选择");

      let datas = await this._getChildWidth({
        wareId: getCookie("X-Auth-wareId"),
        id: this.multipleSelection[0].childWareId,
      });
      sessionStorage.setItem(
        "createWareHuseDataS",
        JSON.stringify({
          childWareId: this.multipleSelection[0].childWareId,
          id: this.multipleSelection[0].id,
          wareAreaLength: this.wareAreaLength,
          wareAreaWidth: this.wareAreaWidth,
        })
      );
      this.createWarehouseAjax(
        { childWareId: this.multipleSelection[0].childWareId },
        "/warehoseconfig/editWarehouseConfig"
      );
    },
    //发送编辑数据ajax
    async fasonEdit(data, path) {
      let datas = await post({
        url: "/wbs-warehouse-manage/v1/pWarehouseArea/saveRecord",
        data,
      });
      if (datas.code === "10000") {
        this.$store.dispatch("editUser", datas.result[0]);
        this.$router.push({
          path,
        });
      } else {
        Message(datas.msg);
      }
    },
    //发送获取列表的消息
    async fasonPagIngQueryData() {
      let datas = await post({
        url: "/wbs-warehouse-manage/v1/pWarehouseArea/findRecordPage",
        data: { ...this.pagingQueryData, userType: 4 },
      });
      if (datas.code === "10000") {
        this.changeData(datas.result);
      } else {
        Message(datas.msg);
      }
    },
    changeData(data) {
      if (this.flag) {
        this.nameOfSubwareHouseDataArr = data.list;
        this.flag = false;
      }
      this.nameOfSubWareHouse.nameOfSubwareHouseData = data.list;
      this.quyuzicanNameOfSubWareHouse.nameOfSubwareHouseData = data.list;
      this.changeTableData(data); //用来改变表格
      this.changePageData(data); //用来改变分页器的条数
    },
    //用来改变表格
    changeTableData(data) {
      let { list } = data;
      // console.log(list, "表格的数据");
      this.tableData = list;
      list.forEach((item, idx) => {
        this.tableData[idx].wareAreaType =
          item.wareAreaType == 1 ? "存储区" : "拣货区";
        this.tableData[idx].address =
          item.provinceName + item.cityName + item.areaName + item.userAddr;
        this.tableData[idx].noSeat = item.seatNum - item.useSeat;
      });
    },
    //用来改变分页器的条数
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    //点击分页器的
    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
      this.fasonPagIngQueryData();
    },
    //点击分页器的确定
    sureSuccssBtn(e) {
      this.pagingQueryData.pageNumber = e;
      this.fasonPagIngQueryData();
    },
    //搜索框改变后的数据
    toggleSelection(rows) {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //点击查询按钮
    clickQueryUser() {
      this.fasonPagIngQueryData();
      // console.log(this.pagingQueryData, "点击查询");
    },
    //点击清空按钮
    clearInputAll() {
      this.clearTimeInput();
      this.pagingQueryData.paras.childWareName = "";
      this.pagingQueryData.paras.wareAreaName = "";
      this.pagingQueryData.paras.id = "";
      this.pagingQueryData.paras.wareAreaType = "";
      this.pagingQueryData.paras.childWareId = "";
      console.log(this.pagingQueryData, "点击清空");
      this.fasonPagIngQueryData();
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
    getStartTime(e) {
      this.pagingQueryData.paras.createStartTime = e;
      this.pagingQueryData.paras.userType = null;
    },
    getEndTime(e) {
      this.pagingQueryData.paras.createEndTime = e;
      this.pagingQueryData.paras.userType = null;
    },
    //子仓名称下拉框
    getwareHouseValue(e) {
      this.pagingQueryData.paras.childWareId = this.nameOfSubwareHouseDataArr[
        e
      ].childWareId;
      this.pagingQueryData.paras.childWareName = this.nameOfSubwareHouseDataArr[
        e
      ].childWareName;
    },
    //区域类型下拉框
    getAreaValue(e) {
      this.pagingQueryData.paras.wareAreaType = this.wareAreaTypeJson[
        e
      ].wareAreaCode;
    },
    //区域名称下拉框
    getAreaNameValue(e) {
      this.pagingQueryData.paras.id = this.AreaName.AreaNameData[e].id;
      this.pagingQueryData.paras.wareAreaName = this.AreaName.AreaNameData[
        e
      ].wareAreaName;
    },
  },
};
</script>
<style >
.cell {
  text-align: center;
}
</style>
<style lang='scss' scoped>
@import "../../assets/scss/btn.scss";
.userSettingBox {
  border-top: 1px solid #d1d6e2;
  background-color: rgb(232, 233, 236);
  .fuzzyQueryBox {
    padding: 17px 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .biaogeBox {
      align-items: center;
      display: flex;
    }
    .timeBox {
      display: flex;
      align-items: center;
    }
    .line {
      width: 20px;
      height: 2px;
      background: #fff;
      margin-right: 10px;
    }
    .btns {
      display: flex;
      .queryBtn {
        @include BtnFunction("success");
      }
      .clearBtn {
        @include BtnFunction();
        background: #fff;
      }
    }
  }
  .btnArr {
    padding: 0 10px;
    > div {
      border-bottom: 1px solid #d1d6e2;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: inline-block;
      }
    }
    .meiyiyetitle {
      display: flex;
      align-items: center;
    }
  }
  .tableBox {
    padding: 0 10px 0px 10px;
    .pageComponent {
      margin: 180px 10px 0 0;
      text-align: right;
      height: 36px;
      background: #ffffff;
      border: 1px solid #d1d6e2;
    }
  }
  .center {
    border: 1px solid #d1d6e2;
  }
  .lineBox {
    height: 25px;
    padding: 0 10px;
    > div {
      height: 100%;
      background: #fff;
    }
  }
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
  .lodopFunClear {
    margin-right: 10px;
    @include BtnFunction("success");
  }
}
</style>