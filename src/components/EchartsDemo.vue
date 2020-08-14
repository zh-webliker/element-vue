<template>
  <div
          ref="chart"
          :style="{width:width, height:height}">

  </div>
</template>

<script>
  import Echarts from "echarts"

  export default {
    name: "EchartsDemo",
    props: {
      width: String,
      height: String,
      option: Object,
    },
    data(){
      return {
        chart: null
      }
    },
    mounted(){
      if(this.option && this.option.series){
        this.initChart();
      }
    },
    watch:{
      option(){
        if(this.chart){
          this.chart.clear();
          this.chart.setOption(this.option);
        }else{
          this.initChart();
        }
      },
      width(){
        this.chart.resize();
      },
      height(){
        this.chart.resize();
      }
    },
    methods:{
      initChart(){
        //echarts可以用ref的方式初始化，highcharts只能用id
        this.chart = Echarts.init(this.$refs.chart);
        this.chart.setOption(this.option);
      }
    }
  }
</script>

<style scoped>
  div{
    min-height: 100px;
    min-width: 100px;
  }
</style>