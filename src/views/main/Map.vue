<template>

  <!--mapview组件 在components中定义的 会在html中转为小写带横杠的标签-->
  <map-view/>

</template>

<script>
  /***
   * OpenLayers官方示例：https://openlayers.org/en/latest/examples
   * OpenLayers文档：https://openlayers.org/en/latest/apidoc/
   *
   * 没有中文 基本用法可以参考 MapView 中的方法
   * 遇到问题尽量看官方文档，国内用的、百度的，很多都是3的版本，实现思路差不多但是写法有很大不同
   *
   * 基本层级：
   * Map --> Layer --> Source --> Feature
   * 除了多了一层Source层，其余思路和Arcgis for JavaScript类似
   */

  //引入组件
  import MapView from '../../components/MapView'

  export default {
    name: "Map",
    //使用组件
    components:{
      MapView
    },
    methods:{
      a(){

      },
      b(){
        this.a();
      }
    }
  }
</script>

<style scoped>

</style>