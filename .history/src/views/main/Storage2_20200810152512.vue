<template>
  <div style="background: aliceblue">
    <h5>上一个页面提交的数据：</h5>
    <p>文字：{{text}} || {{getText}}</p>
    <p>时间：{{time}} || {{getTime}}</p>
    <p>--------------------------------</p>
    <div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
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
    },
    data () {
      return {
        fileList:[]
      }
    }
  }
</script>

<style scoped>

</style>