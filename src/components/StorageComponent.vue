<template>
  <div style="background: aliceblue">
    <h5>这里是组件：</h5>
    <p>文字：{{text}}</p>
    <p>时间：{{time}}</p>
    <p>{{displayText}}</p>
  </div>
</template>

<script>
  export default {
    name: "StorageComponent",
    data(){
      return {
        displayText: "",
        changeTimes: 0,
      }
    },
    computed: {
      text(){
        //这是module在空间的写法
        return this.$store.getters['storage/getText'];
      },
      time(){
        // return this.$store.getters.getTime;
        return this.$store.getters['storage/getTime'];
      }
    },
    watch: {
      //store中的值可以用watch监听变化
      text() {
        this.changeTimes ++;
        if(this.changeTimes>0){
          this.displayText = "已改变文字次数：" + this.changeTimes;
        }else{
          this.displayText = ""
        }
      }
    }
  }
</script>

<style scoped>

</style>