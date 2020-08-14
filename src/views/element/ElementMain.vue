<template>
  <div class="page">
    <el-container>

      <!--侧边栏-->
      <el-aside>
        <!--目录菜单-->
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                :router="true"
                @open="handleOpen"
                @close="handleClose">
          <el-submenu index="1">

            <template slot="title">
              <i class="el-icon-location"></i>
              <span>常用组件</span>
            </template>

            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="/Element/Table">Table+Paginatin</el-menu-item>
              <el-menu-item index="/Element/Tab">Tabs+Carousel</el-menu-item>
              <!--<el-menu-item index="/Element/Form">Form</el-menu-item>-->
              <!--<el-menu-item index="/Element/Tree">Tree</el-menu-item>-->
            </el-menu-item-group>

          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>常用组件二</span>
            </template>

            <el-menu-item-group>
              <el-menu-item index="/Element/Form">
                <i class="el-icon-document"></i>
                <span slot="title">Form</span>
              </el-menu-item>
              <el-menu-item index="/Element/Tree">
                <i class="el-icon-view"></i>
                <span slot="title">Tree</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>

          <el-menu-item index="4" disabled>
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>

        </el-menu>
      </el-aside>

      <!--内容区-->
      <el-main>

        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!--循环路由，获取面包屑-->
          <el-breadcrumb-item
                  v-for="item in $route.matched"
                  v-bind:key="item.path"
                  :to="{path: item.path}">
            {{item.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>

        <!--内容区-->
        <router-view/>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "ElementMain",
    data(){
      return{
        breadCrumbData: []
      }
    },
    methods: {
      //菜单展开/关闭时执行的方法
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-container { height: 100% }
  .el-main>div { background: white; }
  .el-breadcrumb { padding: 16px; }
</style>