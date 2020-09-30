/* 货架设置 */
<template>
  <div class="shelfSettingBox">
    <div class="displayalign shelfSettingTopBox">
      <div class="zujianBox">
        <div class="displayalign zujianBox">
          <div class="noneIconTitle mr11">子仓名称:</div>
          <div class="mr20">
            <el-select
              v-model="wareAreaTypeJson.wareAreaName"
              placeholder="请选择子仓名称"
              @input="getchildValue"
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
      <!-- 子仓名称 -->
      <div>
        <div class="zujianBox">
          <div class="displayalign zujianBox">
            <div class="noneIconTitle mr11">区域名称:</div>
            <div class="mr20">
              <el-select
                v-model="wareAreaTypeJson.wareAreaName"
                placeholder="请选择区域名称"
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
      </div>
      <!-- 区域名称 -->
      <div class="displayalign">
        <div class="displayalign mr20">
          <div
            @click="changeISNum"
            class="anniu mr9 displayCenter"
            :class="isNum ? 'active' : ''"
          >
            <div :class="isNum ? 'active dian' : ''"></div>
          </div>
          <span class="noneIconTitle">存储区</span>
        </div>
        <!-- 存储区 -->
        <div class="displayalign mr20">
          <div
            @click="changeISNum"
            class="anniu mr9 displayCenter"
            :class="!isNum ? 'active' : ''"
          >
            <div :class="!isNum ? 'active dian' : ''"></div>
          </div>
          <span class="noneIconTitle">拣货区</span>
        </div>
        <!-- 拣货区 -->
      </div>
    </div>
    <!-- 上面部分 -->
    <div
      class="shelfSettingBottom"
      v-for="(parent, index) in sendOutData.rowData.length
        ? sendOutData.rowData
        : 1"
      :key="index"
    >
      <div class="meiyiyetitle">{{ isNums(parent.danqpaishu) }}排货架</div>
      <div class="displayalign huoZhujianS">
        <div class="displayalign mr20">
          <div class="noneIconTitle mr11">货架组数:</div>
          <div class="mr11">
            <el-input
              placeholder="请输入您要创建几组货架"
              v-model="parent.rowNum"
              clearable
              @blur="createDomZu(parent.rowNum, index)"
              @keyup.enter="createDomZu(parent.rowNum, index)"
            ></el-input>
          </div>
          <div class="noneIconTitle">个</div>
        </div>
        <!-- 货架组数 -->
        <div class="displayalign">
          <div class="noneIconTitle mr11">一/二组货架间距:</div>
          <div class="displayalign mr11">
            <el-input
              placeholder="请输入货架间距"
              v-model="parent.distance"
              clearable
            ></el-input>
          </div>
          <div class="noneIconTitle">米</div>
        </div>
        <!-- 一/二组货架间距： -->
      </div>
      <div class="virtualDOMBox" v-show="parent.groupData.length">
        <div
          class="Onehuojia clearfix"
          v-for="(item, idx) in parent.groupData"
          :key="idx"
        >
          <div class="createDom disinb line40 fl mr20">
            第{{ isNums(idx) }}组货架:
          </div>

          <div class="disinb">
            <div
              v-for="(items, idxs) in item.shelfData"
              :key="idxs"
              class="displayalign mb20"
            >
              <div class="displayalign">
                <div class="noneIconTitle mr11">货架名称:</div>
                <div class="mr20">
                  <el-select
                    v-model="item.shelfName"
                    placeholder="请选择货架名称"
                    @input="getAreaValue(index, idx, idxs)"
                    @focus="getHuoJiaName(index, idx, idxs)"
                  >
                    <el-option
                      v-for="(itemss, idxx) in item.resultmes"
                      :key="idxx"
                      :label="itemss.shelfName"
                      :value="idxx"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <!-- 货架名称 -->
              <div class="displayalign">
                <div class="noneIconTitle mr11">货架类型:</div>
                <div class="mr20">
                  <el-input v-model="items.shelfType"></el-input>
                </div>
              </div>
              <!-- 货架类型 -->
              <div class="displayalign">
                <div class="noneIconTitle mr11">可用数量:</div>
                <div class="mr20">
                  <el-input v-model="items.shelfNum"></el-input>
                </div>
              </div>
              <!-- 可用数量 -->
              <div class="displayalign">
                <div class="noneIconTitle mr11">货架数量:</div>
                <div class="mr20">
                  <el-input v-model="items.shelfNum"></el-input>
                </div>
              </div>
              <!-- 货架数量 -->
              <div class="displayalign">
                <div
                  class="addSetting mr11"
                  @click="addHuoJia(items, index, idx, idxs)"
                >
                  添加货架
                </div>
                <div
                  class="removeSetting"
                  @click="removeHuoJia(items, index, idx, idxs)"
                >
                  删除
                </div>
              </div>
              <!-- btn添加货架--删除 -->
            </div>
          </div>
        </div>
      </div>
      <!-- 创建子仓内容 -->
      <div class="tr btnBox" v-show="sendOutData.rowData[0].groupData.length">
        <div
          v-show="parent.isyichu"
          class="disinb shanchu mr11"
          @click="removeData(parent, index)"
        >
          移除
        </div>
        <div class="disinb shanchu mr11" @click="copyData(parent, index)">
          复制一组
        </div>
        <div class="disinb addSetting" @click="baoCunData(parent, index)">
          保存
        </div>
      </div>
      <!-- btn -->
    </div>

    <div
      v-show="sendOutData.rowData[0].groupData.length"
      class="displayCenter"
      style="background: #fff"
    >
      <div class="pt20">
        <div class="disinb removeSetting mr20" @click="gotoSanYiye">返回</div>
        <div class="disinb addSetting" @click="shelfSubmit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { getCookie } from "../../utils/validate";
import { post } from "../../api/api";
/*eslint-disable */
export default {
  data() {
    return {
      isNum: true,
      wareAreaTypeJson: {
        wareAreaName: "",
      },
      resme: 0,
      sendOutData: {
        childWareId: "子仓库id",
        wareId: getCookie("X-Auth-wareId"),
        wareAreaId: "仓库区域id",
        rowData: [
          {
            distance: null, //货架排间距 (指与前一排的间距,如果是第一排,此数据无效)
            rowNum: null, //当前排数(第X排)
            danqpaishu: 0,
            isyichu: false,
            groupData: [],
            resultmes: [],
          },
        ], //货架组数
      },
      isRemove: false,
      getHuojiaNameAndType: {
        wareAreaId: "",
        wareId: getCookie("X-Auth-wareId"),
        childWareId: "子仓库id",
      },
    };
  },
  created() {
    let session = JSON.parse(sessionStorage.getItem("shelfSettingData"));
    this.sendOutData.childWareId = session.childWareId; //
    this.sendOutData.wareAreaId = session.wareAreaId; //仓库区域id
    this.getHuojiaNameAndType.childWareId = session.childWareId; //
    this.getHuojiaNameAndType.wareAreaId = session.wareAreaId; //仓库区域id
  },
  beforeDestroy() {
    // sessionStorage.removeItem("shelfSettingData");
  },
  methods: {
    //返回上一页
    gotoSanYiye() {
      this.$confirm("确认返回上一页", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$router.go(-1);
        })
        .catch(() => {
          Message("已取消返回");
        });
    },
    //获取货架名称
    getHuoJiaName(index, idx, idxs) {
      this._mingc(this.getHuojiaNameAndType, index, idx, idxs);
      console.log(this.sendOutData.rowData[index].groupData[idx].resultmes);
    },
    //区域名称input
    getAreaValue(e, index, idxs, idx) {
      console.log(this.sendOutData.rowData[index].groupData[idxs], index);
      this.sendOutData.rowData[index].groupData[idx].shelfType[
        e
      ] = this.sendOutData.rowData[index].groupData[idx].resultmes[e];
    },
    //获取货架名称//ajax
    async _mingc(data, index, idx, idxs) {
      let datas = await post({
        url:
          "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseShelf/findRecord",
        data,
      });
      if (datas.code == "10000") {
        this.sendOutData.rowData[index].groupData[idx].resultmes = datas.result;
        return this.sendOutData.rowData[index].groupData[idx].resultmes;
      } else {
        Message(datas.msg);
      }
    },
    //点击了移除
    removeData(item, index) {
      this.$confirm("确定移除该排货架？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.sendOutData.rowData.splice(index, 1);
          this.isRemove = false;
          setTimeout(() => {
            Message("移除成功");
          }, 0);
        })
        .catch(() => {
          Message("已取消移除");
        });
    },
    //点击了复制一组
    copyData(item, index) {
      this.isRemove = true;
      let json = this._createDataJson(item, index);
      this.sendOutData.rowData = this.sendOutData.rowData.concat(json);
    },
    _createDataJson(item, index) {
      return {
        rowNum: null, // 货架组数
        distance: null, // 1/2 货架间距
        groupData: [],
        danqpaishu: index + 1,
        resultmes: [],
        isyichu: true,
      };
    },
    //点击了保存
    baoCunData(item, idx) {},
    //货架组数失去焦点事件
    createDomZu(parent, index) {
      let rowNum = +parent;
      if (+parent === NaN) return Message("请输入数字");
      let arr = this._createDom(rowNum, index);
      this.sendOutData.rowData[index].groupData = arr;
    },
    //获取组dom josn
    _createDom(Num, index) {
      let arr = [];
      for (let i = 0; i < Num; i++) {
        let json = {
          distance: this.sendOutData.rowData[index].groupData.distance, //货架组过道间距(指与前一组货架的间距,如果是第一组,此数据无效)
          groupNum: i, //当前组数(第X组)
          //货架信息
          shelfData: [
            {
              shelfType: "", //摆放货架类型
              shelfNum: "", //摆放货架数量
            },
          ],
        };
        arr.push(json);
      }
      return arr;
    },
    changeISNum() {
      //获取电点击的是哪一个
      this.isNum = !this.isNum;
    },
    // 点击了添加货架需要的json
    _addHuoJia() {
      return {
        shelfType: "", //摆放货架类型
        shelfNum: "", //摆放货架数量
      };
    },
    //点击了添加货架
    addHuoJia(item, index, idx, idxs) {
      let res = this._addHuoJia();
      this.sendOutData.rowData[index].groupData[idx].shelfData.push(res);
    },
    //删除的是那个下面的第几个
    removeHuoJia(item, index, idx, idxs) {
      if (this.sendOutData.rowData[index].groupData[idx].shelfData.length == 1)
        return Message("最少剩下一排货架");
      this.$confirm("确定删除该排货架？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.sendOutData.rowData[index].groupData[idx].shelfData.splice(
            idxs,
            1
          );
          setTimeout(() => {
            Message("删除成功");
          }, 0);
        })
        .catch(() => {
          Message("已取消删除");
        });
    },
    //获取子仓名称
    getchildValue() {},
    isNums(i) {
      switch (i) {
        case 0:
          return "一";
          break;
        case 1:
          return "二";
          break;
        case 2:
          return "三";
          break;
        case 3:
          return "四";
          break;
        case 4:
          return "五";
          break;
        case 5:
          return "六";
          break;
        case 6:
          return "七";
          break;
        case 7:
          return "八";
          break;
        case 8:
          return "九";
          break;
        case 9:
          return "十";
          break;
        case 10:
          return "十一";
          break;
        default:
          return i + 1;
          break;
      }
    },
    //点击了提交
    shelfSubmit() {
      this.submitDataJson(this.sendOutData);
    },
    async submitDataJson(data) {
      let datas = await post({
        url:
          "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pWarehouseSeat/saveRecord",
        data,
      });
      if (datas.code == "10000") {
        Message(datas.msg);
        this.$router.go(-1);
      } else {
        Message(datas.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

.shelfSettingBox {
  background-color: rgb(232, 233, 236);
  padding: 10px;
  .shelfSettingTopBox {
    background: #ffffff;
    border-bottom: 1px solid #d1d6e2;
    padding: 20px;
  }
  .shelfSettingBottom {
    background: #ffffff;
    padding: 20px;
    border-bottom: 1px solid #d1d6e2;
  }
  .meiyiyetitle {
    padding: 10px 0;
  }
  .huoZhujianS {
    padding: 20px 0;
  }
  .virtualDOMBox {
    padding: 10px 0;
  }
  .createDom {
    height: 14px;
    font-size: 14px;
    font-family: Hiragino Sans GB;
    color: #599af3;
  }
  .Onehuojia {
    padding: 10px;
    display: flex;
  }
  .btnBox {
  }
  .addSetting {
    @include BtnFunction("success");
  }
  .removeSetting {
    @include BtnFunction("error");
  }
  .shanchu {
    @include BtnFunction();
    border: 1px solid #d1d6e2;
  }
}
</style>