<template>
  <div class="lazyLoadingInmgPage">
    <el-scrollbar style="height: 100%;" ref="scrollbar">
      <div class="father" ref="father">
        <div v-for="(i, index) in imgArray" :key="index" class="imgbox">
          <img :src="i.url">
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'lazyLoadingInmg',
  data () {
    return {
      imgArray: [
        {url: require('../../assets/photos/1.jpeg')},
        {url: require('../../assets/photos/2.jpg')},
        {url: require('../../assets/photos/3.jpg')},
        {url: require('../../assets/photos/1.jpeg')},
        {url: require('../../assets/photos/2.jpg')},
        {url: require('../../assets/photos/3.jpg')},
        // 加require 因为在动态加载图片时，webpack会把图片当成模块处理，所以url-loader无法解析图片地址
        // npm run serve / build 后导致图片路径没有进行处理
      ]
    }
  },
  mounted () {
    const imgbox = this.$refs.scrollbar.wrap
    imgbox.addEventListener('scroll', _.throttle(this.updatePosition, 100))
    imgbox.addEventListener('scroll', this.updatePosition1)
    
  },
  methods: {
    updatePosition () {
      console.log('aaa')
      console.log(imgbox.getBoundingClientRect().top < document.documentElement.clientHeight)
    },
    updatePosition1 () {
      console.log('bbb')
    }
  }
}
</script>

<style lang='scss' scoped>
.lazyLoadingInmgPage {
  height: 100%;
  .el-scrollbar__wrap{
    overflow-y: scroll;
    overflow-x: hidden !important;
  }
  .father {
    height: 2400px;
  }
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