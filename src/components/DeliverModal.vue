<template>
  <div class="modal" v-if="show">
    <div class="modal-block">
      <header>{{title || "提示框"}}</header>
      <div class="content">
        <slot></slot>
      </div>
      <footer>
        <button @click="hideModal">关闭</button>
        <button @click="onBtnClick">刷新父级数据</button>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DeliverModal",

    //组件接收参数，props可以有多种写法，参考官网
    props: {
      title: String,
    },
    data() {
      return{
        show: false
      }
    },
    computed: {

    },
    methods: {
      showModal(){
        this.show = true;
      },
      hideModal(){
        this.show = false;
      },
      onBtnClick(){
        //使用this.$parent调用父组件的method
        this.$parent.dataRefresh();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal{
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    z-index: 500;
    background: rgba(0,0,0,0.2);

    .modal-block{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 480px;
      height: 360px;
      margin-top: -240px;
      margin-left: -180px;
      background: white;
      box-shadow: #1F6B75 0 0 2px 2px;
      display: flex;
      flex-direction: column;


      header {
        font-weight: bold;
        background: #1F6B75;
        color: white;
      }
      footer {

        button {
          float: right;;
        }

      }
      .content {
        height: 100%;
      }
    }
  }
</style>