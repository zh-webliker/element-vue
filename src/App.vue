<template>
  <div id="app">

    <!--header标签和下面的nav标签，是H5新增的标签，相当于有语义的div-->
    <header class="header">

      <h1>{{appName}}</h1>

      <nav>

        <!--router-link是vue自带组件，用于项目内跳转，会编译成a标签-->
        <router-link to="/Main">
          <i class="material-icons">home</i>
          <span>首页</span>
        </router-link>
        <router-link to="/Element">
          <i class="material-icons">extension</i>
          <span>Element</span>
        </router-link>

        <router-link to="/Test">
          <i class="material-icons">videogame_asset</i>
          <span>Test</span>
        </router-link>
        <!--<router-link to="/">
          <i class="material-icons">logout</i>
          <span>退出</span>
        </router-link>-->
      </nav>
    </header>

    <router-view/>

  </div>
</template>

<script>
  const appName = "Demo";

  export default ({
    name: "App",
    data(){
      return {
        appName
      }
    }
  })

</script>

<style lang="scss">

</style>
