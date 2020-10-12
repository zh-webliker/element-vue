<template>
  <div class="lazyLoadingInmgPage">
    <el-scrollbar style="height: 100%;">
      <div v-for="(i, index) in imgArray" :key="index" class="imgbox">
        <img :src="i.url">
      </div>
    </el-scrollbar>
    <!-- <div class="imgbox">
      <img src="../../assets/photos/3.jpg">
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'lazyLoadingInmg',
  data () {
    return {
      imgArray: [
        {url: '../../assets/photos/1.jpeg'},
        {url: '../../assets/photos/2.jpg'},
        {url: '../../assets/photos/3.jpg'},
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.lazyLoadingInmgPage {
  height: 100%;
  .imgbox {
    width: 500px;
    height: 400px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>