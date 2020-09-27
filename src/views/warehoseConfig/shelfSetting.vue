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
              placeholder="areaType.placeholder"
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
                placeholder="areaType.placeholder"
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
          <span class="noneIconTitle">储存区</span>
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
    <div class="shelfSettingBottom">
      <div class="meiyiyetitle">一排货架</div>
      <div class="displayalign huoZhujianS">
        <div class="displayalign mr20">
          <div class="noneIconTitle mr11">货架组数:</div>
          <div class="mr11">
            <el-input></el-input>
          </div>
          <div class="noneIconTitle">个</div>
        </div>
        <!-- 货架组数 -->
        <div class="displayalign">
          <div class="noneIconTitle mr11">一/二组货架间距:</div>
          <div class="displayalign mr11">
            <el-input></el-input>
          </div>
          <div class="noneIconTitle">米</div>
        </div>
        <!-- 一/二组货架间距： -->
      </div>
      <div class="virtualDOMBox">
        <div class="Onehuojia displayalign" v-for="item in 2" :key="item">
          <div class="createDom mr20">第(1)组货架：</div>
          <div class="displayalign">
            <div class="displayalign">
              <div class="noneIconTitle mr11">货架名称:</div>
              <div class="mr20">
                <el-select
                  v-model="wareAreaTypeJson.wareAreaName"
                  placeholder="areaType.placeholder"
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
            <!-- 货架名称 -->
            <div class="displayalign">
              <div class="noneIconTitle mr11">货架类型:</div>
              <div class="mr20">
                <el-select
                  v-model="wareAreaTypeJson.wareAreaName"
                  placeholder="areaType.placeholder"
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
            <!-- 货架类型 -->
            <div class="displayalign">
              <div class="noneIconTitle mr11">可用数量:</div>
              <div class="mr20">
                <el-select
                  v-model="wareAreaTypeJson.wareAreaName"
                  placeholder="areaType.placeholder"
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
            <!-- 可用数量 -->
            <div class="displayalign">
              <div class="noneIconTitle mr11">货架数量:</div>
              <div class="mr20">
                <el-select
                  v-model="wareAreaTypeJson.wareAreaName"
                  placeholder="areaType.placeholder"
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
            <!-- 货架数量 -->
            <div class="displayalign">
              <div class="addSetting mr11" @click="addHuoJia(item)">
                添加货架
              </div>
              <div class="removeSetting">删除</div>
            </div>
            <!-- btn添加货架--删除 -->
          </div>
        </div>
      </div>
      <!-- 创建子仓内容 -->

      <div class="tr">
        <div class="disinb shanchu mr11">复制一组</div>
        <div class="disinb addSetting">保存</div>
      </div>
      <!-- btn -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNum: true,
      wareAreaTypeJson: {
        wareAreaName: "",
      },
      sendOutData: {
        childWareId: "",
        rowData: [
          {
            distance: 0, //货架排间距 (指与前一排的间距,如果是第一排,此数据无效)
            groupData: {
              //货架摆放组信息
              distance: 0, //货架组过道间距(指与前一组货架的间距,如果是第一组,此数据无效)
              groupNum: 0, //当前组数(第X组)
              shelfData: {
                //货架信息
                shelfType: "", //拜访货架类型
                shelfNum: "", //摆放货架数量
              },
            },
            rowNum: 0,
            wareId: "仓库id",
            wareAreaId: "仓库区域id",
          },
        ],
      },
    };
  },
  methods: {
    changeISNum() {
      //获取电点击的是哪一个
      this.isNum = !this.isNum;
    },
    addHuoJia() {
      //点击了添加货架
    },
    //获取子仓名称
    getchildValue() {},
    //区域名称input
    getAreaValue() {},
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