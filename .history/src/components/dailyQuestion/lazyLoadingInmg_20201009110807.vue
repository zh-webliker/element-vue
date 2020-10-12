<template>
  <div class="lazyLoadingInmgPage">
    <!-- <template v-for="i in imgArray">
      <img :src="i.url" :key="i.url">
    </template> -->
    <div>
      <img src="../../assets/photos/3.jpg">
    </div>
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
  img {

  }
}
</style>