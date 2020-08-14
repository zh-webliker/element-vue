<template>
   <div>
     <el-input v-model="form.a"></el-input>
     <el-button @click="sumbit">提交</el-button>
   </div>
</template>

<script>
export default {
  name: 'deliverChild',
  data () {
    return {
      form: {
        a: ''
      }
    }
  },
  methods: {
    sumbit () {
      console.log(this.form)
      this.$emit('submitForm', this.form)
    }
  }
}
</script>

<style>

</style>