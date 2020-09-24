<template>
  <div>
    <div class="userControl">
      <div class="roleName">
        <div class="roleName-choose">
          <div class="roleName-text">角色名称：</div>
          <div class="roleName-checkBox">
            <el-select v-model="value" placeholder="请选择角色名称">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="roleName-botton">
          <div class="queryBtn" @click="clickQueryUser">查询</div>
          <div class="clearBtn" @click="clearInputAll">清空</div>
        </div>
      </div>
      <div class="main">
        <div class="queryResult">
          <div class="icon-title">
            <div class="icon-title-icon">
              <img src="../../assets/img/home_page-icon-default@2x.png" />
            </div>
            <div class="icon-title-title">角色管理</div>
          </div>
          <div class="queryResult-btn">
            <div class="setUser" @click="gotoRouterSetUserIng">创建</div>
            <div class="bianjiUser" @click="editBtn">编辑</div>
            <div class="goOn">查看</div>
            <div class="remove" @click="clearUser">删除</div>
          </div>
        </div>
        <div class="resultForm">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="serial"
              label="序号"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center">
            </el-table-column>
            <el-table-column prop="createName" label="创建人" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
            </el-table-column>
          </el-table>
        </div>
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
import { Message } from "element-ui";
import { post } from "../../api/api";
import pagecomponent from "../../components/commin/pageComponent"; //分页器
export default {
  components: {
    pagecomponent,
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "全部",
        },
        {
          value: "选项2",
          label: "仓库管理员",
        },
        {
          value: "选项3",
          label: "兼职拣货人员",
        },
        {
          value: "选项4",
          label: "兼职复核人员",
        },
        {
          value: "选项5",
          label: "拣货人员",
        },
        {
          value: "选项6",
          label: "复核人员",
        },
      ],
      value: "选项1",
      tableData: [
        {
          serial: 1,
          roleName: "王小虎",
          remark: "拣货人员",
          createName: "张三",
          createTime: "2020-9-24",
        },
      ],
      pagingQueryData: {
        //分页查询
        pageNumber: 1,
        pageSize: 10,
        paras: {
          orgId: "",
          id: "",
          userType: "",
          createStartTime: "",
          createEndTime: "",
          loginName: "",
          roleId: "",
          wareId: "",
        },
      },
      pageComponentsData: {
        //这是分页器需要的json
        pageNums: 0, //一共多少条 //默认一页10条
      },
    };
  },
  async created() {
    this.queryList();
  },
  methods: {
    async queryList() {
      let datas = await post({
        url: "http://139.196.176.227:8801/am/v1/pRole/findRecordPage",
        data: this.pagingQueryData,
      });
      if (datas.code === "10000") {
        this.changeData(datas.result);
      } else {
        Message(datas.msg);
      }
    },
    changeData(data) {
      this.changeTableData(data); //用来改变表格
      this.changePageData(data); //用来改变分页器的条数
    },
    //用来改变表格
    changeTableData(data) {
      let { list } = data;
      // console.log(list);
      this.tableData = list;
      list.forEach((item, idx) => {
        this.tableData[idx].address =
          item.provinceName + item.cityName + item.areaName + item.userAddr;
      });
    },
    //用来改变分页器的条数
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getPageNum(e) {
      this.pagingQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.pagingQueryData.pageNumber = e;
    },
    clickQueryUser() {
      this.queryList();
    },
    clearInputAll() {},
    gotoRouterSetUserIng() {},
    editBtn() {},
    goOn() {},
    clearUser() {},
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

.userControl {
  background: #eef1f8;
  width: 100%;
  .roleName {
    // width: 100%;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d1d6e2;
    // margin: 16px;
    .roleName-choose {
      width: 360px;
      display: flex;
      align-items: center;
      .roleName-text {
        margin: 0 10px 0 30px;
        font-size: 16px;
      }
    }
    .roleName-botton {
      display: flex;
      .queryBtn {
        @include BtnFunction("success");
      }
      .clearBtn {
        @include BtnFunction();
        background: #fff;
        margin: 0 30px 0 10px;
      }
    }
  }
  .main {
    margin: 10px;
    background: white;
  }
  .queryResult {
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
    .queryResult-btn {
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
    margin: 180px 10px 0 0;
    text-align: right;
    height: 36px;
    background: #ffffff;
    border: 1px solid #d1d6e2;
  }
}
</style>