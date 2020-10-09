<template>
  <div>
    <!-- 这里库位映射的页面 -->
    <div id="storageLocalMap">
      <div class="roleName-choose">
        <div class="name_type">
          <div class="delegaCompany">
            <div class="roleName-text">委托公司：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="delegaCompanyValue"
                placeholder="请选择委托公司"
                @change="delegaCompanyValue"
              >
                <el-option
                  v-for="item in delegaCompanyData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="productName">
            <div class="roleName-text">产品名称：</div>
            <div class="roleName-checkBox">
              <el-input placeholder="模糊搜索" v-model="productName" clearable>
              </el-input>
            </div>
          </div>
          <div class="productCode">
            <div class="roleName-text">产品编码：</div>
            <div class="roleName-checkBox">
              <el-input placeholder="模糊搜索" v-model="productCode" clearable>
              </el-input>
            </div>
          </div>
          <div class="nameBox">
            <div class="roleName-text">子仓名称：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="nameValue"
                placeholder="请选择子仓名称"
                @change="nameValue"
              >
                <el-option
                  v-for="item in childWarehouseName"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="areaName">
            <div class="roleName-text">存放区域：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="placeAreaValue"
                placeholder="请选择存放区域"
                @change="placeAreaValue"
              >
                <el-option
                  v-for="item in placeAreaData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="areaType">
            <div class="roleName-text">存放货架：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="placeShelfValue"
                placeholder="请选择区域类型"
                @change="placeShelfValue"
              >
                <el-option
                  v-for="item in placeShelfData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="shelfName">
            <div class="roleName-text">存放层：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="placeTierValue"
                placeholder="请选择货架名称"
                @change="placeTierValue"
              >
                <el-option
                  v-for="item in placeTierData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="tierChoose">
            <div class="roleName-text">拣货区域：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="pickAreaValue"
                placeholder="请选择层数"
                @change="pickAreaValue"
              >
                <el-option
                  v-for="item in pickAreaData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="storageLocalChoose">
            <div class="roleName-text">拣货货架：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="pickShelfValue"
                placeholder="请选择库位"
                @change="pickShelfValue"
              >
                <el-option
                  v-for="item in pickShelfData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="storageLocalChoose">
            <div class="roleName-text">拣货层：</div>
            <div class="roleName-checkBox">
              <el-select
                v-model="pickTierValue"
                placeholder="请选择库位"
                @change="pickTierValue"
              >
                <el-option
                  v-for="item in pickTierfData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="pickSL">
            <div class="roleName-text">拣货库位：</div>
            <div class="roleName-checkBox">
              <el-input placeholder="模糊搜索" v-model="pickSL" clearable>
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="queryBtns">
        <div class="roleName-botton">
          <div class="queryBtn" @click="clickQuery">查询</div>
          <div class="clearBtn" @click="clearInput">清空</div>
        </div>
      </div>
      <!-- --------------------------------------------------------------------------------------------------------------------------------------- -->
      <div class="childWarehouseForm">
        <div class="formHeader">
          <div class="icon-title">
            <div class="icon-title-icon">
              <img src="../../assets/img/home_page-icon-default@2x.png" />
            </div>
            <div class="icon-title-title">库位管理</div>
          </div>
          <div class="someBtn">
            <div class="setUser" @click="printSLCode">打印库位号</div>
            <div class="bianjiUser" @click="SLmap">库位映射</div>
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
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="55"
            >
            </el-table-column>
            <el-table-column
              prop="delegaCompany"
              label="委托公司"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="productName" label="产品名称" align="center">
            </el-table-column>
            <el-table-column
              prop="productNumber"
              label="产品编号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="producTspecifica"
              label="产品规格"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="brand" label="品牌" align="center">
            </el-table-column>
            <el-table-column prop="CHName" label="子仓名称" align="center">
            </el-table-column>
            <el-table-column
              prop="storageArea"
              label="存储区"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="storageShelf"
              label="存储货架"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="storageTier"
              label="存储层"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="storageUnit"
              label="存储库位"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createName"
              label="创建人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
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
export default {};
</script>

<style scoped>
</style>