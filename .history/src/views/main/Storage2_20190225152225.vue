<template>
  <div style="background: aliceblue">
    <h5>上一个页面提交的数据：</h5>
    <p>文字：{{text}} || {{getText}}</p>
    <p>时间：{{time}} || {{getTime}}</p>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';

  export default {
    name: "Storage2",
    computed: {

      //可以理解为批量获取。第一个参数是命名空间的名称，如果没有命名空间可以省略
      //两种方式，mapState映射state，mapSGetters映射getters
      ...mapState('storage',{
        text: state=> state.storageText,
        time: state=> state.storageTime
      }),

      ...mapGetters('storage', [
        'getText',
        'getTime'
      ])
    }
  }
</script>

<style scoped>

</style>