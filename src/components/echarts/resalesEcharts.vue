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
      let data = [4000, 5000, 3000, 2000, 1000, 4000, 6666];
      // let data = [];
      let data2 = [3000, 5000, 4444, 5555, 6666, 2222, 3333];
      // let data2 = [];
      let myEcharts = this.$echarts.init(
        document.getElementById("resalesEcharts")
      );
      let option = {
        legend: {
          top: 18,
          right: 18,
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
        tooltip: {
          show: true,
          triggerOn: "mousemove",
          trigger:"axis",
          axisPointer:{
            type:"none",
          },
          padding: 0,
          extraCssText: "box-shadow:0px 0px 6px 1px rgba(0, 0, 0, 0.24)",
          backgroundColor: "#fff",
          formatter: function (param) {
            //自定义tooltip内容
            var text = "";
            text +=
              '<div style="display:flex;align-items:center;justity-content:center;border-radius: 8px;background:white;width:206px;height:132px;color:black;padding:30px 36px">' +
              "<div style='margin-right:48px;width:42px'>" +
              "<div style='width:10px;height:10px;background:#599af3;border-radius:50%;margin:0 auto'>" +
              "</div>" +
              "<div style='font-size:14px;font-weight:bolder;text-align:center;line-height:48px'>" +
              param[0].value+
              "</div>" +
              "<div style='color:#9b9b9b;font-size:14px'>" +
              "已退数" +
              "</div>" +
              "</div>" +
              "<div>" +
              "<div style='width:10px;height:10px;background:#f76f23;border-radius:50%;margin:0 auto'>" +
              "</div>" +
              "<div style='font-size:14px;font-weight:bolder;;text-align:center;line-height:48px'>" +
              param[1].value +
              "</div style='width:42px'>" +
              "<div style='color:#9b9b9b;font-size:14px'>" +
              "待退数" +
              "</div>" +
              "</div>" +
              "</div>";
            return text;
          },
        },
        dataset: {},
        grid:{
          left:"9%",
          right:"1%",
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
            // alignWidthLabel:false
          },
          axisLabel: {
            textStyle: {
              color: "#999",
            },
          },
          boundaryGap: true,
        },
        yAxis: {
          name: "单位：件", //坐标轴名称
          nameLocation: "end", //坐标轴名称显示位置。
          nameTextStyle: {
            color: "#999999",
            fontSize: 14,
            align: "right",
            verticalAlign: "bottom",
            padding: [0, -23, 0, 0],
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
          nameGap: 24, //坐标轴名称与轴线之间的距离。
          axisLabel: {
            inside: false,
            textStyle: {
              color: "#999",
            },
            margin: 0,
          },
        },
        series: [
          {
            name: "已退数",
            type: "bar",
            barWidth: 20,
            barGap: "20%",
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
}
</style>