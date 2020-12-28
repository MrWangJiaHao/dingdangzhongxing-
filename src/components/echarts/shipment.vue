<template>
  <div class="shipment">
    <div id="shipments"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {};
  },
  mounted() {
    this.shipmentsEcharts();
    window.addEventListener("resize", () => {
      this.shipmentsEcharts();
    });
  },
  methods: {
    shipmentsEcharts() {
      //初始化echarts实例
      let myEcharts = this.$echarts.init(document.getElementById("shipments"));

      var data = [1000, 5000, 1000, 7000, 3000, 6000, 500];
      var data2 = [4000, 1000, 6000, 2000, 3500, 2000, 6000];
      // var data = [0, 0, 0, 0, 0, 0, 0];
      // var data2 = [0, 0, 0, 0, 0, 0, 0];

      let option = {
        animation: true,
        legend: {
          top: 20,
          right: 18,
          data: [
            {
              name: "应发货数",
              icon: "pin",
            },
            {
              name: "待发货数",
              icon: "pin",
            },
          ],
          textStyle: {
            fontSize: 16, //字体大小
            color: "#999", //字体颜色
          },
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          triggerOn: "mousemove",
          padding: 0,
          extraCssText: "box-shadow:0px 0px 6px 1px rgba(0, 0, 0, 0.24)",
          backgroundColor: "#fff",
          formatter: function (param) {
            //自定义tooltip内容
            var text = "";
            text +=
              '<div style="display:flex;align-items:center;justity-content:center;border-radius: 8px;background:white;width:206px;height:132px;color:black;padding:30px">' +
              "<div style='margin-right:30px;width:56px'>" +
              "<div style='width:10px;height:10px;background:#599af3;border-radius:50%;margin:0 auto'>" +
              "</div>" +
              "<div style='font-size:14px;font-weight:bolder;text-align:center;line-height:48px'>" +
              param[0].value +
              "</div>" +
              "<div style='color:#9b9b9b;font-size:14px'>" +
              "应发货数" +
              "</div>" +
              "</div>" +
              "<div>" +
              "<div style='width:10px;height:10px;background:#f76f23;border-radius:50%;margin:0 auto'>" +
              "</div>" +
              "<div style='font-size:14px;font-weight:bolder;;text-align:center;line-height:48px'>" +
              param[1].value +
              "</div style='width:56px'>" +
              "<div style='color:#9b9b9b;font-size:14px'>" +
              "待发货数" +
              "</div>" +
              "</div>" +
              "</div>";
            return text;
          },
        },
        xAxis: {
          //X坐标轴刻度相关设置。
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
                color: "#999",
                fontSize: 14,
              },
            },
            {
              value: "委托方3",
              textStyle: {
                color: "#999",
                fontSize: 14,
              },
            },
            {
              value: "委托方4",
              textStyle: {
                color: "#999",
                fontSize: 14,
              },
            },
            {
              value: "委托方5",
              textStyle: {
                color: "#999",
                fontSize: 14,
              },
            },
            {
              value: "委托方6",
              textStyle: {
                color: "#999",
                fontSize: 14,
              },
            },
            {
              value: "委托方7",
              textStyle: {
                color: "#999",
                fontSize: 14,
              },
            },
          ],
          type: "category",
          show: true,
          boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。

          axisPointer: {
            show: true,
            snap: true, //坐标轴指示器是否自动吸附到点上。默认自动判断
            type: "none",
            label: {
              show: false, //是否显示文本标签。如果 tooltip.axisPointer.type 设置为 'cross' 则默认显示标签，否则默认不显示。
            },
            handle: {
              show: false, //当 show 设为 true 时开启，这时显示手柄，并且 axisPointer 会一直显示。
            },
          },
          splitLine: {
            show: false, //是否显示分隔线。默认数值轴显示，类目轴不显示。
          },
          axisLine: {
            //坐标轴轴线相关设置。
            show: false, //是否显示坐标轴轴线。
          },
          axisTick: {
            inside: false, //坐标轴刻度是否朝内，默认朝外。
            show: false, //是否显示坐标轴刻度。
            alignWithLabel: true, // 刻度与文案居中对齐
          },
          axisLabel: {
            interval: 0, //X轴内容过多造成内容缺失时加上这个内容就会显示出来
            align: "left",
            rich: {},
          },
        },
        yAxis: {
          //Y坐标轴刻度相关设置。
          // data:[
          //   {
          //     value:"0",
          //     textStyle:{
          //       fontSize:14,color:"#999"
          //     }
          //   },
          //   {
          //     value:"1000",
          //     textStyle:{
          //       fontSize:14,color:"#999"
          //     }
          //   },
          //   {
          //     value:"2000",
          //     textStyle:{
          //       fontSize:14,color:"#999"
          //     }
          //   },
          //   {
          //     value:"3000",
          //     textStyle:{
          //       fontSize:14,color:"#999"
          //     }
          //   },
          //   {
          //     value:"4000",
          //     textStyle:{
          //       fontSize:14,color:"#999"
          //     }
          //   },
          //   {
          //     value:"5000",
          //     textStyle:{
          //       fontSize:14,color:"#999"
          //     }
          //   },
          //   {
          //     value:"6000",
          //     textStyle:{
          //       fontSize:14,color:"#999"
          //     }
          //   },
          //   {
          //     value:"7000",
          //     textStyle:{
          //       fontSize:14,color:"#999"
          //     }
          //   },
          // ],
          name: "单位 : 单", //坐标轴名称
          nameLocation: "end", //坐标轴名称显示位置。
          nameTextStyle: {
            color: "#999999",
            fontSize: 14,
            align: "right",
            verticalAlign: "bottom",
          },
          boundaryGap: false,
          min: 0,
          max: 7000,
          nameGap: 24, //坐标轴名称与轴线之间的距离。
          // show:false,//是否显示Y轴
          axisLine: {
            //坐标轴轴线相关设置。
            show: false, //是否显示坐标轴轴线。
          },
          type: "value", //坐标轴类型。

          axisTick: {
            inside: false, //坐标轴刻度是否朝内，默认朝外。
            show: false, //是否显示坐标轴刻度。
          },
          splitLine: {
            show: false, //是否显示分隔线。默认数值轴显示，类目轴不显示。
          },
          axisLabel: {
            inside: false,
            textStyle: {
              color: "#999",
            },
            margin: 20,
          },
          z: 0, //Y 轴组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
          // scale:true,//按比例显示
        },
        dataZoom: [
          {
            type: "inside",
            throttle: 100, //设置触发视图刷新的频率。单位为毫秒（ms）。
            disabled: true, //禁用区域内放大缩小
          },
        ],
        series: [
          {
            name: "应发货数",
            type: "line",
            smooth: true, //是否平滑曲线显示。
            symbol: "none", //标记的图形。
            symbolSize: 5, //标记的大小，
            sampling: "average", //取过滤点的平均值
            itemStyle: {
              //折线拐点标志的样式。
              color: "#599AF3",
            },
            // stack: "a", //数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加。
            areaStyle: {
              //区域填充样式。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#599AF3",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ]),
              origin: "start",
            },
            lineStyle: {
              width: 0, //图形描边线条宽度
            },
            data: data, //https://echarts.apache.org/zh/option.html#series-line.data
          },
          {
            name: "待发货数",
            type: "line",
            smooth: true,
            stack: "a", //数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加。
            symbol: "none",
            symbolSize: 5,
            sampling: "average",
            itemStyle: {
              color: "#F88852",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#F88852",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ]),
            },
            lineStyle: {
              width: 0,
            },
            data: data2,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myEcharts.setOption(option);
    },
  },
};
</script>

<style scoped>
#shipments {
  height: 486px;
}
</style>