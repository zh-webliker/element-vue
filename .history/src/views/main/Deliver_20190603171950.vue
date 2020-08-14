<template>
  <div>
    <h3>组件传值</h3>

    <p><input type="text" v-model="text" title="text" /></p>


    <!--
      :title为传值，与组件中props中对应
      ref 为引用，引号内是自定义别名
      {{text}}对应组件中的<slot>标签
     -->
    <deliver-modal
            :title="title"
            ref="deliverModal">
      {{text}}
    </deliver-modal>

    <!--可以使用$refs.alias 调用定义了ref的子组件中的method 和 data-->
    <p>
      <button @click="$refs.deliverModal.showModal()">打开子组件</button>
    </p>

  </div>
</template>

<script>
  import DeliverModal from "../../components/DeliverModal";

  export default {
    name: "Deliver",
    components: {
      DeliverModal
    },
    data(){
      return {
        text: "",
        title: "弹窗标题"
      }
    },
    methods: {
      dataRefresh(){
        this.text = "";
        alert("data refreshed");
      }
    },
  }
</script>

<style scoped>

</style>