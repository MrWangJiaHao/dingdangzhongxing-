<template>
  <div>
    <div v-if="pickPeopleNum > 0 || reCheckPeopleNum > 0">
      <div id="staffEcharts"></div>
      <div class="echarts-buttom">
        <div class="buttom-left">
          <div></div>
          <div>{{ pickPeopleNum }}</div>
          <div>拣货</div>
        </div>
        <div class="buttom-right">
          <div></div>
          <div>{{ reCheckPeopleNum }}</div>
          <div>复核</div>
        </div>
      </div>
    </div>

    <div class="isNoData" v-else>
      <div class="dataImg">
        <img src="../../assets/img/nopeople.png" alt="" />
      </div>
      <div class="dataText">暂无统计人员</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickPeopleNum: 90, //拣货人数
      reCheckPeopleNum: 30, //复核人数
    };
  },
  mounted() {
    this.staffEcharts();
  },
  methods: {
    staffEcharts() {
      let myEcharts = this.$echarts.init(
        document.getElementById("staffEcharts")
      );

      let bgColor = "#fff";
      let title = "总人数";
      let color = ["#599af3", "#b9d5fa"];
      let echartData = [
        {
          value: this.pickPeopleNum,
        },
        {
          value: this.reCheckPeopleNum,
        },
      ];

      let formatNumber = function (num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ",");
      };
      let total = echartData.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);

      let option = {
        backgroundColor: bgColor,
        color: color,
        title: [
          {
            text: "{val|" + formatNumber(total) + "}\n{name|" + title + "}",
            top: "center",
            left: "center",
            textStyle: {
              rich: {
                name: {
                  fontSize: 14,
                  fontWeight: "normal",
                  color: "#666666",
                  padding: [10, 0],
                },
                val: {
                  fontSize: 32,
                  color: "#333333",
                },
              },
            },
          },
        ],
        // legend: {
        //     orient: 'vertical',
        //     icon: 'rect',
        //     x: '80%',
        //     y: 'center',
        //     itemWidth: 12,
        //     itemHeight: 12,
        //     align: 'left',
        //     textStyle: {
        //         rich: {
        //             name: {
        //                 fontSize: 12
        //             },
        //             value: {
        //                 fontSize: 16,
        //                 padding: [0, 5, 0, 15]
        //             },
        //             unit: {
        //                 fontSize: 12
        //             }
        //         }
        //     },
        //     formatter: function(name) {
        //         let res = echartData.filter(v => v.name === name);
        //         res = res[0] || {};
        //         let unit = res.unit || '';
        //         return '{name|' + name + '}  {value|' + res.value + '}{unit|' + unit + '}'
        //     }
        //     // data: legendName
        // },
        series: [
          {
            type: "pie",
            radius: ["70%", "67%"],
            center: ["50%", "50%"],
            data: echartData,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderColor: bgColor,
                borderWidth: 0,
              },
            },
            labelLine: {
              show: false,
            },
            // label: {
            //   normal: {
            //     formatter: (params) => {
            //       return (
            //         "{icon|●}\n{value|" +
            //         formatNumber(params.value) +
            //         "}\n{name|" +
            //         params.name +
            //         "}"
            //       );
            //     },
            //     padding: [200,-50,100,-50],
            //     rich: {
            //       icon: {
            //         fontSize: 16,
            //       },
            //       name: {
            //         fontSize: 14,
            //         padding: [0, 10, 0, 4],
            //         color: "#666666",
            //       },
            //       value: {
            //         fontSize: 28,
            //         fontWeight: "bold",
            //         color: "#333333",
            //       },
            //     },
            //   },
            // },
          },
        ],
      };
      myEcharts.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
#staffEcharts {
  height: 234px;
}

.echarts-buttom {
  height: 170px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .buttom-left {
    div:nth-of-type(1) {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #599af3;
      margin: auto;
    }
    div:nth-of-type(2) {
      font-size: 28px;
      line-height: 56px;
      text-align: center;
    }
    div:nth-of-type(3) {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
  .buttom-right {
    div:nth-of-type(1) {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #b9d5fa;
      margin: auto;
    }
    div:nth-of-type(2) {
      font-size: 28px;
      line-height: 56px;
      text-align: center;
    }
    div:nth-of-type(3) {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
}
.isNoData {
  width: 100%;
  .dataImg {
    width: 173px;
    height: 173px;
    text-align: center;
    margin: 65px auto 30px;
  }
  .dataText {
    font-size: 18px;
    line-height: 60px;
    color: #304747;
    text-align: center;
  }
}
</style>