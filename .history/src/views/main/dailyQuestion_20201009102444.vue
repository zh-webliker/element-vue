<template>
  <div class="dailyQuestionPage">
    <nav class="leftNav">
      <el-menu default-active="1" router>
        <el-menu-item v-for='i in menu' :key='i.id' :index="i.url"></el-menu-item>
      </el-menu>
    </nav>
    <div class="rightContent">

    </div>
  </div>
</template>

<script>
export default {
  name: 'dailyQuestion',
  data () {
    return {
      menu: [
        {title: '怎么懒加载图片', url: 'lazyLoadingInmg' , id: '1'},
        {title: '防抖和节流应用在哪些场景', url: 'lazyLoadingInmg', id: '2'}
      ]
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
    background: rgb(252, 253, 201);
    margin-right: 10px;
  }
  .rightContent {
    flex: 1 1 auto;
    min-width: 300px;
    background: rgb(231, 209, 252);
  }
}
</style>