<template>
  <div>
    <h3>网络请求</h3>

    <p>
      参考：
      <a href="https://www.kancloud.cn/yunye/axios/234845" target="_blank">
        https://www.kancloud.cn/yunye/axios/234845
      </a>
    </p>

    <form>
      <ul>
        <li>
          <p>
            <span>用户名：</span>
            <input type="text" required v-model="username"/>
          </p>
        </li>
        <li>
          <p>
            <span>密码：</span>
            <input type="text" required v-model="password"/>
          </p>
        </li>
      </ul>
    </form>
    <button @click="request">提交</button>

    <p>数据的双向绑定示例：</p>
    <p>
      <!-- v-if为条件渲染，当满足条件时才会渲染这一段html -->
      <span v-if="username !== ''">用户名：{{username}}</span>

      <!-- v-show则无论如何都会渲染，但是只有满足条件时才会显示。不满足时可以看到样式中为 display:none -->
      <span v-show="username !== '' && password !== ''"> , </span>

      <span v-if="password !== ''">密码：{{password}}</span>
    </p>

    <p>请求结果：</p>
    <p>{{result}}</p>
  </div>
</template>

<script>
  export default {
    name: "Requesting",
    data(){
      return {
        username: "",
        password: "",
        result: ""
      }
    },

    methods: {

      request(){
        this.$axios.post('userLogin.action', {
          name: self.username,
          pwd: self.password
        }).then(response=>{
          this.result = response;
        }).catch(error=>{
          this.result = "请求错误";
          throw error;
        })
      }
    },

    //监听
    watch:{
      username(){
        this.result = "";
      },
      password(){
        this.result = "";
      }
    }
  }
</script>

<style scoped>

</style>