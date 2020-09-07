<template>
  <div>
    <h1>
      <a name="hello-world" href="/Main/Icon">
        Hello world!
      </a>
    </h1>
    <applyJsx :level='level'></applyJsx>
  </div>
</template>

<script>
  import applyJsx from '../../components/applyJsx' 
  export default {
    name: "Deliver",
    components: {
      applyJsx
    },
    data(){
      return {
        level: 1
      }
    },
    methods: {
    },
  }
</script>

<style scoped>

</style>