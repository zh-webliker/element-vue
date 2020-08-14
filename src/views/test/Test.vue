<template>
  <div class="page">

    <nav class="left-nav">
      <router-link to="/Test/Mixin">
        <i class="material-icons">map</i>
        <span>Mixin</span>
      </router-link>
      <router-link to="/Test/DraggableModule">
        <i class="material-icons">view_module</i>
        <span>可拖动模块</span>
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