<template>
  <div>

    <h4>
      ECharts:
      <button @click="echartsToggleValue = !echartsToggleValue">更换option</button>
    </h4>

    <echarts-demo
            :width="width"
            :height="height"
            :option="echartsOption"/>

    <h4>HighCharts：
      <button @click="highchartsToggleValue = !highchartsToggleValue">更换option</button>
    </h4>

    <highcharts-demo
            id="hc_1"
            :width="width"
            :height="height"
            :option="highchartsOption"/>
  </div>
</template>

<script>
  import echarts from "echarts" //这里引入只是为了取得渐变option

  /**
   * 封装的chart组件，也可以直接写到这个页面，只是这样比较简洁，方便理解
   * */
  import EchartsDemo from "../../components/EchartsDemo"
  import HighchartsDemo from "../../components/HighchartsDemo"


  /**
   * echarts options*/
  let dataShadow = [];
  let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
  let yMax = 500;
  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }
  const echartsOption1 = {
    angleAxis: {
    },
    radiusAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四'],
      z: 10
    },
    polar: {
    },
    series: [{
      type: 'bar',
      data: [1, 2, 3, 4],
      coordinateSystem: 'polar',
      name: 'A',
      stack: 'a'
    }, {
      type: 'bar',
      data: [2, 4, 6, 8],
      coordinateSystem: 'polar',
      name: 'B',
      stack: 'a'
    }, {
      type: 'bar',
      data: [1, 2, 3, 4],
      coordinateSystem: 'polar',
      name: 'C',
      stack: 'a'
    }],
    legend: {
      show: true,
      data: ['A', 'B', 'C']
    }
  };
  const echartsOption2 = {
    title: {
      text: '特性示例：渐变色 阴影 点击缩放',
      subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    xAxis: {
      data: ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'],
      axisLabel: {
        inside: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      { // For shadow
        type: 'bar',
        itemStyle: {
          normal: {color: 'rgba(0,0,0,0.05)'}
        },
        barGap:'-100%',
        barCategoryGap:'40%',
        data: dataShadow,
        animation: false
      },
      {
        type: 'bar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#188df0'}
              ]
            )
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#2378f7'},
                {offset: 0.7, color: '#2378f7'},
                {offset: 1, color: '#83bff6'}
              ]
            )
          }
        },
        data: data
      }
    ]
  };

  /**
   * highcharts options*/
  const highchartsOption1 = {
    title: {
      text: '浏览器<br>占比',
      align: 'center',
      verticalAlign: 'middle',
      y: 50
    },
    tooltip: {
      headerFormat: '{series.name}<br>',
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0px 1px 2px black'
          }
        },
        startAngle: -90, // 圆环的开始角度
        endAngle: 90,    // 圆环的结束角度
        center: ['50%', '75%']
      }
    },
    series: [{
      type: 'pie',
      name: '浏览器占比',
      innerSize: '50%',
      data: [
        ['Firefox',   45.0],
        ['IE',       26.8],
        ['Chrome', 12.8],
        ['Safari',    8.5],
        ['Opera',     6.2],
        {
          name: '其他',
          y: 0.7,
          dataLabels: {
            // 数据比较少，没有空间显示数据标签，所以将其关闭
            enabled: false
          }
        }
      ]
    }]
  };
  const highchartsOption2 = {
    chart: {
      type: 'area'
    },
    title: {
      text: '美苏核武器库存量'
    },
    subtitle: {
      text: '数据来源: <a href="https://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
      'thebulletin.metapress.com</a>'
    },
    xAxis: {
      allowDecimals: false
    },
    yAxis: {
      title: {
        text: '核武库国家'
      },
      labels: {
        formatter: function () {
          return this.value / 1000 + 'k';
        }
      }
    },
    tooltip: {
      pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
    },
    plotOptions: {
      area: {
        pointStart: 1940,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    },
    series: [{
      name: '美国',
      data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
        1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
        27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
        26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
        24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
        22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
        10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
    }, {
      name: '苏联/俄罗斯',
      data: [null, null, null, null, null, null, null, null, null, null,
        5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
        4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
        15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
        33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
        35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
        21000, 20000, 19000, 18000, 18000, 17000, 16000]
    }]
  };

  export default {
    name: "Charts",
    components: {
      EchartsDemo,
      HighchartsDemo
    },
    data(){
      return {
        width: "500px",
        height: "300px",
        echartsToggleValue: true,
        highchartsToggleValue: true,
      }
    },
    computed: {
      echartsOption(){
        return this.echartsToggleValue?echartsOption1:echartsOption2;
      },
      highchartsOption(){
        return this.highchartsToggleValue?highchartsOption1:highchartsOption2;
      }
    }
  }
</script>

<style scoped>

</style>