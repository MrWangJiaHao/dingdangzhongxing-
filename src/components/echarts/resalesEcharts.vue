<template>
  <div id="resalesEcharts"></div>
</template>

<script>
//推货订单量统计echarts
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.resalesEcharts();
  },
  methods: {
    resalesEcharts() {
      // let data = [4000, 5000, 3000, 2000, 1000, 4000, 6666];
      let data = [];
      // let data2 = [3000, 5000, 4444, 5555, 6666, 2222, 3333];
      let data2 = [];
      let myEcharts = this.$echarts.init(
        document.getElementById("resalesEcharts")
      );
      let option = {
        legend: {
          top: "top",
          right: 0,
          data: [
            {
              name: "已退数",
              icon: "pin",
            },
            {
              name: "待退数",
              icon: "pin",
            },
          ],
          textStyle: {
            fontSize: 16, //字体大小
            color: "#999999", //字体颜色
          },
        },
        tooltip: {},
        dataset: {
          //   source: [
          //     ["product", "已退数", "待退数"],
          //     ["委托方1", 5813, 6174],
          //     ["委托方2", 5813, 6174],
          //     ["委托方3", 5831, 6734],
          //     ["委托方4", 5831, 6374],
          //     ["委托方5", 5831, 6734],
          //     ["委托方6", 5831, 6734],
          //     ["委托方7", 5831, 6734],
          //   ],
        },
        xAxis: {
          data: [
            {
              value: "委托方1",
              textStyle: {
                color: "#999999",
                fontSize: 14,
              },
            },
            {
              value: "委托方2",
              textStyle: {
                color: "#999999",
                fontSize: 14,
              },
            },
            {
              value: "委托方3",
              textStyle: {
                color: "#999999",
                fontSize: 14,
              },
            },
            {
              value: "委托方4",
              textStyle: {
                color: "#999999",
                fontSize: 14,
              },
            },
            {
              value: "委托方5",
              textStyle: {
                color: "#999999",
                fontSize: 14,
              },
            },
            {
              value: "委托方6",
              textStyle: {
                color: "#999999",
                fontSize: 14,
              },
            },
            {
              value: "委托方7",
              textStyle: {
                color: "#999999",
                fontSize: 14,
              },
            },
          ],
          type: "category",
          axisLine: {
            //坐标轴轴线相关设置。
            show: false, //是否显示坐标轴轴线。
          },
          splitLine: {
            show: false, //是否显示分隔线。默认数值轴显示，类目轴不显示。
          },
          axisTick: {
            inside: false, //坐标轴刻度是否朝内，默认朝外。
            show: false, //是否显示坐标轴刻度。
          },
          axisLabel: {
            textStyle: {
              color: "#999",
            },
          },
        },
        yAxis: {
          name: "单位：件", //坐标轴名称
          nameTextStyle: {
            color: "#999999",
            fontSize: 14,
            align: "center",
            verticalAlign: "bottom",
          },
          axisLine: {
            //坐标轴轴线相关设置。
            show: false, //是否显示坐标轴轴线。
          },
          splitLine: {
            show: false, //是否显示分隔线。默认数值轴显示，类目轴不显示。
          },
          axisTick: {
            inside: false, //坐标轴刻度是否朝内，默认朝外。
            show: false, //是否显示坐标轴刻度。
          },
          min: 0,
          max: 7000,
          nameGap: 20, //坐标轴名称与轴线之间的距离。
          axisLabel: {
            textStyle: {
              color: "#999",
            },
          },
        },
        series: [
          {
            name: "已退数",
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#6fcdff",
                  },
                  {
                    offset: 1,
                    color: "#55aafb",
                  },
                ]),
              },
            },
            lineStyle: {
              width: 0, //图形描边线条宽度
            },
            data: data, //https://echarts.apache.org/zh/option.html#series-line.data
          },
          {
            name: "待退数",
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#ffb18b",
                  },
                  {
                    offset: 1,
                    color: "#f76b1c",
                  },
                ]),
              },
            },
            data: data2, //https://echarts.apache.org/zh/option.html#series-line.data
          },
        ],
      };
      myEcharts.setOption(option);
    },
  },
};
</script>

<style scoped>
#resalesEcharts {
  /* width: 936px; */
  height: 484px;
  padding: 18px 18px 28px 28px;
}
</style>