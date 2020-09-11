<template>
  <div style="background: aliceblue">
    <!-- <h5>上一个页面提交的数据：</h5>
    <p>文字：{{text}} || {{getText}}</p>
    <p>时间：{{time}} || {{getTime}}</p>
    <p>--------------------------------</p> -->
    <div>
      <el-upload
        class="isBeforeUpload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-upload="beforeUploadFille"
        :on-success='successUploadFilleFille'
        :on-error='handleError'
        :before-remove='beforeRemoveFile'
        :on-change='changeFile'
        :file-list="fileList"
        :on-progress='handleProgress'
        ref='upload'>
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
        isfileMeetConditions: true,
        isBeforeUpload: false,
        arr: []
      }
    },
    created () {
      let children = [1, 2, 3, [4, [5, 6]], 7, 8, [9, 10], [11, [12, [13, 14]]]];
      this.redutionArray(children)
      console.log(this.arr)
      // 用递归降维
    },
    methods: {
      redutionArray (array) {
        for (let i = 0; i < array.length; i++) {
          this.singleIsArray(array[i])
        }
      },
      singleIsArray (e) {
        if (Array.isArray(e)) {
          for (let i = 0; i < e.length; i++) {
            this.singleIsArray(e[i])
          }
        } else {
          this.arr.push(e)
        }
        return this.arr
      },
      beforeUploadFille (file) {
        const fileType = file.name.match(/\.(\S*)/)[1] === 'docx' || file.name.match(/\.(\S*)/)[1] === 'doc'
        const fileNoMoreThan2m = file.size / 1024 / 1024 < 2
        if (!fileType) {
          this.$message.error('上传文件只能是docxdoc格式!');
          this.isfileMeetConditions = fileType && fileNoMoreThan2m
        }
        if (!fileNoMoreThan2m) {
          this.$message.error('上传文件大小不能超过2M');
          this.isfileMeetConditions = fileType && fileNoMoreThan2m
        }
        this.isBeforeUpload = true
        if (fileType && fileNoMoreThan2m) {
          // this.$refs.upload.uploadFiles = []
          // this.$refs.upload.uploadFiles.push(file)
        }
        return fileType && fileNoMoreThan2m
      },
      successUploadFilleFille (res, file) {
        if (this.isfileMeetConditions) {
          this.$refs.upload.uploadFiles = []
          this.$refs.upload.uploadFiles.push(file)
        }
        if (res.id === 101) {
          this.$message.success('上传文件成功')
        }
      },
      handleError () {
        this.$message.erroe('上传文件失败')
      },
      beforeRemoveFile () {
        if (this.isfileMeetConditions) {
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
        this.isfileMeetConditions = true
        this.isBeforeUpload = false
      },
      changeFile () {
        // if (this.isfileMeetConditions && this.isBeforeUpload) {
        //   // fileList = fileList.slice(-1)
        //   // this.isBeforeUpload = false
        //   // console.log(file)
        //   // this.$refs.upload.uploadFiles.push(file)
        // }
      },
      handleProgress () {
        // if (this.isfileMeetConditions) {
        //   this.$refs.upload.uploadFiles = []
        //   this.$refs.upload.uploadFiles.push(file)
        // }
      },
    }
  }
</script>

<style scoped>

</style>