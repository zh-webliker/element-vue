<template>
  <div class="dailyQuestionPage">
    <nav class="leftNav">
      <el-menu :default-active="isActive" router>
        <el-menu-item v-for='i in menu' :key='i.id' :index="i.url">{{i.title}}</el-menu-item>
      </el-menu>
    </nav>
    <div class="rightContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dailyQuestion',
  data () {
    return {
      menu: [
        {title: '怎么懒加载图片', url: '/lazyLoadingInmg' , id: '1'},
        {title: '防抖和节流应用在哪些场景', url: '/debounce', id: '2'}
      ],
      // isActive: '1'
    }
  },
  computed: {
    isActive () {
      console.log(this.$route.name)
      // return this.$route.path
      if (this.$route.name === 'dailyQuestion') {
        return '/lazyLoadingInmg'
      } else {
        return this.$route.path
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.dailyQuestionPage {
  display: flex;
  height: 100%;
  .leftNav {
    width: 250px;
    height: 100%;
    // background: rgb(252, 253, 201);
    margin-right: 10px;
    .el-menu-item {
      height: 30px;
      line-height: 30px;
    }
  }
  .rightContent {
    flex: 1 1 auto;
    // min-width: 300px;
    border: 1px solid rgb(231, 209, 252);
  }
}
</style>