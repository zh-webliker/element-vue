<template>
  <div class="lazyLoadingInmgPage">
    <el-scrollbar style="height: 100%;" ref="scrollbar">
      <div class="father" ref="father">
        <div v-for="(i, index) in imgArray" :key="index" class="imgbox">
          <img src="" :data-src='i.url' class="lazy-image">
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
    if ('IntersectionObserver' in window) {
      // 方法二： ie不支持
      const IntersectionObserver = window.IntersectionObserver  // 为什么直接取IntersectionObserver取不到？
      let Observer = new IntersectionObserver((entries) => {
        // IntersectionObserver第一个参数是一个回调函数，回调函数的第一个参数是一个数组，当有几个观察对象可见性发生变化的时候，数组长度则为几
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            const target = entry.target // target 指向元素; intersectionRatio 目标元素的可见比例
            target.src = target.dataset.src
            Observer.unobserve(target) // 加载出图片后移除观察  
          }
        })
      })
      const imgbox = Array.from(document.getElementsByClassName('lazy-image')) // 直接获取class得到的是伪数组
      imgbox.forEach((img) => {
        Observer.observe(img)
      })
    }
    else {
      this.bindScroll()
      const scrollbar = this.$refs.scrollbar.wrap
      scrollbar.addEventListener('scroll', _.throttle(this.bindScroll, 100))
    }
  },
  methods: {
    bindScroll () {
      // 方法一： 需要绑定scroll， scroll事件会有大量计算，造成资源浪费； 但是适用于任何浏览器
      const imgbox = Array.from(document.getElementsByClassName('lazy-image'))
      let len = imgbox.length
      for (let i = 0; i < len; i++) {
        console.log(i)
        if (imgbox[i].getBoundingClientRect().top < document.documentElement.clientHeight) {
          imgbox[i].src = imgbox[i].dataset.src
          imgbox.splice(i, 1)
          i--
          len--
          // console.log(imgbox)
        }
      }
    },
  }
  // 方法三 给img标签加 loading='lazy' 兼容性不好
}


// 1.实现图片懒加载的三种方法
// 2.伪数组转化成数组的方法
  // es6 Array.from
  // Array.prototype.slice.call(伪数组) ？
  // 直接循环遍历
// 3.如果父盒子的大小 大于/小于 窗口的大小怎么处理
// 4.消抖和节流
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
    .lazy-image {
      background: url('../../assets/photos/th.jpg') no-repeat;
      background-size: 100%;
    }
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