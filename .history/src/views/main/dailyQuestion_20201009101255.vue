<template>
  <div>
    <el-menu default-active="1">
      <el-menu-item v-for='(i, index) in menu' :key='i.id'></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'dailyQuestion',
  data () {
    return {
      menu: [
        {title: '怎么懒加载图片', id: 1},
        {title: '防抖和节流应用在哪些场景', id: 2}
      ]
    }
  }

}
</script>

<style lang='scss' scoped>

</style>