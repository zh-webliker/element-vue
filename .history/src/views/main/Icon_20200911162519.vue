<template>
  <div>
    <Basebutton></Basebutton>
    <Basebutton :type='info'></Basebutton>
    <Basebutton type='success'></Basebutton>
    <Basebutton type='warning'></Basebutton>
    <Basebutton type='danger'></Basebutton>
  </div>
</template>

<script>
  export default {
    name: "Icon",
    data () {
      return {
        info: 'info'
      }
    }
  }
</script>

<style scoped>
</style>