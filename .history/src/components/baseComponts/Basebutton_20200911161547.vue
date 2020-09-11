<template>
  <div>
    <el-button :type="tpye">确认</el-button>
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