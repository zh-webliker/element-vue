<template>
  <div class="dragged-item">
      {{index}}
  </div>
</template>

<script>
  export default {
    name: "DraggedModule",
    props: [ 'index' ],

  }
</script>

<style scoped>
  .dragged-item { width: 100%; height: 180px; background: #A13462;
    margin-bottom: 20px;
    color: white; font-size: 24px; text-align: center; line-height: 180px;}
</style>