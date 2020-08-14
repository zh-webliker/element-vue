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
        :limit="2"
        :before-upload="beforefileUpload"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过2M</div>
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
        fileList:[
          {
            name: 'food.doc',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            status: 'finished'
          }
        ]
      }
    },
    methods: {
      beforefileUpload (file) {
        console.log(file)
        const fileType = file.name.match(/.(\S*)/)
        console.log(fileType)
        const fileLimit = file.size / 1024 / 1024 < 2
        if (!fileType) {
          this.$message.error('上传文件只能是docx/doc格式!');
        }
        if (!fileLimit) {
          this.$message.error('上传文件大小不能超过2M');
        }
      }
    }
  }
</script>

<style scoped>

</style>