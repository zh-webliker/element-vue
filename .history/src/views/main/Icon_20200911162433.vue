<template>
  <div>
    <Basebutton :type='info'></Basebutton>
    <Basebutton :type='success'></Basebutton>
    <Basebutton :type='info'></Basebutton>
    <Basebutton :type='info'></Basebutton>
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