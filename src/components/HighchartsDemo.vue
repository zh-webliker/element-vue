<template>
  <div
          ref="chart"
          :style="{width:width, height:height}"
          :id="id">

  </div>
</template>

<script>
  import HighCharts from "highcharts"

  export default {
    name: "HighchartsDemo",
    props: {
      width: String,
      height: String,
      option: Object,
      id: String,
    },
    data(){
      return {
        chart: null,
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
          this.chart.destroy();
          this.initChart();
        }else{
          this.initChart();
        }
      },
      width(){
        this.chart.reflow();
      },
      height(){
        this.chart.reflow();
      }
    },
    methods:{
      initChart(){
        this.chart = HighCharts.chart(this.id, this.option);
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