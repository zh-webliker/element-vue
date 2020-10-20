<template>
  <div>
    <!-- 1.未防抖节流时 -->
    <div class="content1" @mouseover="changeCount1">{{count1}}</div>
    <!-- 防抖 -->
    <div class="content1" ref="debounceDom">{{count2}}</div>
    <!-- <div class="content1" @mouseover="changeCount2">{{count2}}</div> -->
    <!-- 节流 -->
    <div class="content1" ref="throttleDom">{{count3}}</div>
    <!-- <div class="content1" @mouseover="changeCount3">{{count3}}</div> -->
  </div>
</template>

<script>
let previous = 0
import { clearTimeout } from 'highcharts'
export default {
  name: 'debounce',
  data () {
    return {
      count1: 0,
      count2: 0,
      count3: 0
    }
  },
  methods: {
    changeCount1 () {
      this.count1++
    },

    // 防抖 在事件触发结束后n秒内函数执行一次，如果在n秒内又触发了函数，则在事件结束后n秒内执行函数
    changeCount2 () {
      this.debounce(this.debounceCount2, 2000)()
      // 不能直接@mouseover='changeCount2', 因为每触发一次就会创建一个新的changeCount2， 此时会创造很多个timer
    },
    debounceCount2 () {
      this.count2++
    },
    debounce (func, wait, isImmediate) {
      let timer
      return function(e) {
        // console.log(arguments[0]) func参数
        let context = this
        let args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        if (isImmediate) { // 立即执行
          let callNow = !timer
          timer = setTimeout(() => {
            timer = null
          }, wait)
          if (callNow) {
            func.apply(context, args)
          }
        } 
        else { // 非立即执行
          timer = setTimeout(() => {
            func.apply(context, args)
          }, wait)
        }
      }
    },

    // 节流 连续触发事件 但是n秒内只执行一次
    changeCount3 () {
      this.throttle(this.throttleCount, 2000, 'time')
    },
    throttleCount () {
      this.count3++
    },
    throttle (func, wait, type) { // 每过n秒执行一次
      let timer
      if (type === 'time') {
        let date = Date.now()
        if (date - previous > wait) {
          func()
          previous = date
        }
      } else {
        if (!timer) {
          timer = setTimeout(() => {
            timer = null
            func()
          }, wait)
        }
      }
    }
  },
  created () {
  },
  mounted () {
    let debounceFunc = this.debounce(this.debounceCount2, 2000)
    this.$refs.debounceDom.addEventListener('mouseover', debounceFunc) // 不能再created里获取
    let throttleFunc = this.throttle(this.throttleCount, 2000, 'time')
    this.$refs.throttleDom.addEventListener('mouseover', throttleFunc)
  }
}
</script>

<style lang='scss' scoped>
.content1, .content2, .content3 {
  margin-top: 30px;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: rgb(253, 251, 145);
  text-align: center;
  font-size: 20px;
}
</style>