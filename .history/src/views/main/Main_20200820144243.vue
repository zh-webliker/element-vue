<template>
  <div class="page">

    <nav class="left-nav">
      <router-link to="Map">
        <i class="material-icons">map</i>
        <span>地图</span>
      </router-link>
      <router-link to="Icon">
        <i class="material-icons">insert_emoticon</i>
        <span>图标</span>
      </router-link>
      <router-link to="Storage2">
        <i class="material-icons">compare_arrows</i>
        <span>组件使用</span>
      </router-link>
      <router-link to="Requesting">
        <i class="material-icons">wifi_tethering</i>
        <span>树</span>
      </router-link>
      <router-link to="Storage">
        <i class="material-icons">compare_arrows</i>
        <span>状态管理</span>
      </router-link>
      <router-link to="Deliver">
        <i class="material-icons">view_quilt</i>
        <span>组件传值</span>
      </router-link>
      <router-link to="Charts">
        <i class="material-icons">pie_chart</i>
        <span>图表</span>
      </router-link>
    </nav>

    <div class="page-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Main"
  }
</script>

<style scoped>

</style>