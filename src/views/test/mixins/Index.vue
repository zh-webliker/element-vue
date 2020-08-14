<template>
  <section>

    <h3>https://www.jianshu.com/p/c619fae17ccb</h3>

    <div class="part">
      <h4>component 1:</h4>
      <Component1></Component1>
    </div>

    <div class="part">
      <h4>component 2:</h4>
      <Component2></Component2>
    </div>

  </section>
</template>

<script>
  import Component1 from './Component1';
  import Component2 from './Component2';

  export default {
    name: "Index",
    components: {
      Component1,
      Component2,
    }
  }
</script>

<style scoped>
  .part {
    width: 400px;
    float: left;
    margin: 20px;
    padding: 20px;
    background: #dbfff3;
  }
</style>