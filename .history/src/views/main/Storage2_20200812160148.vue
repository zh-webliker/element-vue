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
        :before-upload="beforefileUpload"
        :on-success='successUpload'
        :before-remove='beforeremoveFile'
        :on-change='progressfile'
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
        ],
        fileTpeStatus: true,
        upload: false
      }
    },
    methods: {
      beforefileUpload (file) {
        const fileType = file.name.match(/\.(\S*)/)[1] === 'docx' || file.name.match(/\.(\S*)/)[1] === 'doc'
        const fileLimit = file.size / 1024 / 1024 < 2
        if (!fileType) {
          this.$message.error('上传文件只能是docx/doc格式!');
        }
        if (!fileLimit) {
          this.$message.error('上传文件大小不能超过2M');
        }
        this.fileTpeStatus = fileType && fileLimit
        this.upload = true
        console.log('beforeUpload')
        return fileType && fileLimit
      },
      successUpload (res) {
        if (res.id === 101) {
          this.$message.success('上传文件成功')
        }
      },
      beforeremoveFile () {
        if (this.fileTpeStatus) {
          return new Promise((resolve, reject) => {
            this.$confirm('是否移除该文件?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '移除成功!'
              });
              resolve()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消移除'
              });
              reject()       
            })
          })
        }
      },

      progressfile (file, fileList) {
        // console.log(file, fileList)
        if (this.fileTpeStatus && this.upload) {
          console.log('change')
          this.fileList = fileList.slice(-1)
        }
      }
    }
  }
</script>

<style scoped>

</style>