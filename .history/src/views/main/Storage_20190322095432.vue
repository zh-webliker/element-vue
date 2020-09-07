<template>
  <div>
    <h3>状态管理</h3>

    <p>类似于全局变量</p>

    <p>简单来说，就是在这个页面/组件 中的一些值，可以以更简单的方式在另一个页面/组件 中取到，而不用通过传值、设置真正的全局变量等方式。</p>
    <p>store 的配置在 store/StorageStore.js 中</p>

    <form>
      <textarea title="storageText" v-model="storageText"></textarea>
    </form>
    <p>当前页面已打开 {{storageTime}} 秒</p>
    <p><button @click="commitStorage">提交状态</button></p>

    <storage-component/>
  </div>
</template>

<script>
  import StorageComponent from '../../components/StorageComponent';

  export default {
    name: "Storage",
    components:{
      StorageComponent
    },
    data(){
      return {
        storageText: "",
        storageTime: 0,
        interval: null
      }
    },
    mounted(){
      //计时
      this.interval = setInterval(()=>{
        this.storageTime += 1;
      }, 1000);
    },
    methods:{
      /***
       * 提交状态
       * 两种方式都可以，直接使用commit或者调用dispatch action
       * 不能直接使用 store.state.a = a;
       */
      commitStorage(){
        // this.$store.commit('storage/setText', this.storageText);
        // this.$store.commit('storage/setTime', this.storageTime);
        this.$store.dispatch('storage/setStorage', {text: this.storageText, time: this.storageTime})
          .then(()=> {
            // alert(`状态提交成功: ${this.storageText}, ${this.storageTime}`)
          });
      }
    },
    destroyed(){
      // this.interval = null;
    }
  }
</script>

<style scoped>

</style>