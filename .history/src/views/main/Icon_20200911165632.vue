<template>
  <div>
    <Basebutton></Basebutton>
    <Basebutton :type='info'></Basebutton>
    <Basebutton type='success'></Basebutton>
    <Basebutton type='warning'></Basebutton>
    <Basebutton type='danger'></Basebutton>
    <Basetitle>
      <slot><h1>我是标题</h1></slot>
    </Basetitle>
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