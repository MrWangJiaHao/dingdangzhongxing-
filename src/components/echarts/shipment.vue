<template>
  <div class="shipment">
    <div id="shipments">
      <div class="noData"></div>
    </div>
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
    let oDiv = document.querySelector('#shipments')
    let firstDiv = oDiv.firstChild
    firstDiv.setAttribute("class", "canvasDiv");
  },
  methods: {
    shipmentsEcharts() {
      //初始化echarts实例
      let myEcharts = this.$echarts.init(document.getElementById("shipments"));

      // var data = [2000, 3000, 2000, 3000, 2000, 3000, 2000];
      // var data2 = [3000, 2000, 3000, 2000, 3000, 2000, 3000];
      var data = [];
      var data2 = [];

      let option = {
        animation: true,
        legend: {
          top: "top",
          right: 0,
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
            color: "#999999", //字体颜色
          },
        },
        tooltip: {
          triggerOn: "mousemove",
          position: function (pt) {
            return [pt[0], 130];
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
          //   show:false,
          //   boundaryGap: ["50%","50%"], //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
          axisLine: {
            //坐标轴轴线相关设置。
            show: false, //是否显示坐标轴轴线。
          },
          axisPointer: {
            snap: true, //坐标轴指示器是否自动吸附到点上。默认自动判断
            label: {
              show: true, //是否显示文本标签。如果 tooltip.axisPointer.type 设置为 'cross' 则默认显示标签，否则默认不显示。

              formatter: function (params) {
                //文本标签文字的格式化器。
                return echarts.format.formatTime("yyyy-MM-dd", params.value);
              },

              backgroundColor: "#004E52", //文本标签的背景颜色
            },
            handle: {
              show: false, //当 show 设为 true 时开启，这时显示手柄，并且 axisPointer 会一直显示。
              color: "#004E52",
            },
          },
          splitLine: {
            show: false, //是否显示分隔线。默认数值轴显示，类目轴不显示。
          },
          axisTick: {
            inside: false, //坐标轴刻度是否朝内，默认朝外。
            show: false, //是否显示坐标轴刻度。
          },
          //   scale:true,
        },
        yAxis: {
          //Y坐标轴刻度相关设置。

          name: "单位：单", //坐标轴名称
          nameLocation: "end", //坐标轴名称显示位置。
          nameTextStyle: {
            color: "#999999",
            fontSize: 14,
            align: "center",
            verticalAlign: "bottom",
          },

          min: 0,
          max: 7000,
          nameGap: 20, //坐标轴名称与轴线之间的距离。
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
            formatter: "{value}", //刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
            textStyle: {
              color: "#999",
            },
          },
          z: 10, //Y 轴组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
          //   scale:true,//按比例显示
        },
        dataZoom: [
          {
            type: "inside",
            throttle: 100, //设置触发视图刷新的频率。单位为毫秒（ms）。
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
              color: "#9bb2e0",
            },
            stack: "a", //数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加。
            areaStyle: {
              //区域填充样式。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#9bb2e0",
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
              color: "#fbb897",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#fbb897",
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
  /* width: 936px; */
  height: 486px;
  padding: 18px 18px 28px 28px;
}
.noData{
  position: absolute;
  width: 200px;
  height: 200px;
  background: red;
}
</style>