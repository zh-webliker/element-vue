<template>
  <div>
    <h1>五种设计模式</h1>
  </div>
</template>

<script>
  

  export default {
    name: "Storage",
    components:{
    },
    data(){
      return {
      }
    },
    created () {
      // 观察者模式
      // 老师发送消息, 所有家长接收到 -> 建个数组,把所有要接受消息的家长放入数组里
      this.sendMessage(['小明妈妈', '小红爸爸', '小王爷爷', '小一奶奶'], '明天来学校开家长会')
      class Group {
        constructor () {
          this.message = '暂无消息'
          this.parents = []
        }
        setMesssage (message) {
          this.message = message
          this.notifyAllObservers()
        }
        getMessage () {
          return this.message
        }
        notifyAllObservers (parents) {
          this.parents.forEach((parent) => {
            parent.upload()
          })
        }
        attach (parent) {
          this.parents.push(parent)
        }
      }
      class Parent {
        constructor (name, group) {
          this.name = name
          this.group = group
          this.group.attach(this)
        }
        upload () {
          console.log(`${this.name}: ${this.group.getMessage()}`)
        }
      }
      let group = new Group()
      let s1 = new Parent('张三妈妈', group)
      group.setMesssage('来学校开家长会')
    },
    mounted(){
    },
    methods:{
      sendMessage (arr, message) {
        arr.forEach((parent) => {
          console.log(parent + ':' + message)
        })
      }
    },
  }
</script>

<style scoped>

</style>