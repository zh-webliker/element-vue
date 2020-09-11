<template>
  <div>
    <el-button :type="type">确认</el-button>
  </div>
</template>

<script>
export default {
  name: 'Basebutton',
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style>

</style>