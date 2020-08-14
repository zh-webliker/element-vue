<template>
  <div>

    <p>Tab位置：</p>
    <el-radio-group v-model="tabPosition" style="margin-bottom: 15px;">
      <el-radio-button label="top">top</el-radio-button>
      <el-radio-button label="right">right</el-radio-button>
      <el-radio-button label="bottom">bottom</el-radio-button>
      <el-radio-button label="left">left</el-radio-button>
    </el-radio-group>

    <!--默认tab标签-->
    <el-tabs :tab-position="tabPosition" style="margin-bottom: 15px;">

      <el-tab-pane label="普通carousel">
        <!--里面是carousel，其实放什么都可以-->
        <div class="block">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-tab-pane>

      <el-tab-pane label="卡片carousel">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>

      <el-tab-pane label="图片carousel">
        <div class="block">
          <el-carousel height="300px">
            <el-carousel-item v-for="photo in photos" :key="photo">
              <img :src="photo" @click="showPhoto(photo)" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-tab-pane>

      <el-tab-pane label="卡片+图片carousel">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="photo in photos" :key="photo">
            <img :src="photo" @click="showPhoto(photo)" />
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
    </el-tabs>

    <!--另一种样式的tabs-->
    <el-tabs :tab-position="tabPosition" type="border-card" style="height: 250px;">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>

    <!--图片显示的dialog，设置为全屏，最大100%宽度-->
    <el-dialog
            title="图片"
            :fullscreen="true"
            :visible.sync="showPhotoDialog">
      <img :src="dialogPhoto" style="max-width: 100%;" />
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "Tab",
    data() {
      return {
        tabPosition: 'top',
        //加载的幻灯片图片
        photos: [
          require("../../assets/photos/1.jpeg"),
          require("../../assets/photos/2.jpg"),
          require("../../assets/photos/3.jpg"),
        ],
        //控制dialog显隐
        showPhotoDialog: false,
        dialogPhoto: null
      };
    },
    methods: {
      showPhoto(photo){
        this.showPhotoDialog = true;
        this.dialogPhoto = photo;
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 20px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-carousel__item{
    overflow: hidden;
  }
  .el-carousel__item img {
    width: 100%;
  }
</style>