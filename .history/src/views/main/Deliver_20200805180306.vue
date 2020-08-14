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
    <p>
      <button @click="dialogVisible = true">打开子组件2</button>
    </p>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <deliverChild @submitForm='submitForm'></deliverChild>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import DeliverModal from "../../components/DeliverModal";
  import deliverChild from '../../components/deliverChild'
  export default {
    name: "Deliver",
    components: {
      DeliverModal,
      deliverChild
    },
    data(){
      return {
        text: "",
        title: "弹窗标题",
        dialogVisible: false,
        form: {
          a: ''
        }
      }
    },
    methods: {
      dataRefresh(){
        this.text = "";
        alert("data refreshed");
      },
      showModal2 () {

      },
      handleClose () {
        this.dialogVisible = false
      },
      submitForm (e) {
        console.log(e)
      }
    },
  }
</script>

<style scoped>

</style>