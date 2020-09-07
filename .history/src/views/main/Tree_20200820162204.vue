<template>
  <div>
  </div>
</template>

<script>
  const arr = [
    {parentId: null, title: 1, cdid: 1},
    {parentId: null, title: 2, cdid: 2},
    {parentId: null, title: 3, cdid: 3},
    {parentId: null, title: 4, cdid: 4},
    {parentId: null, title: 5, cdid: 5},
    {parentId: null, title: 6, cdid: 6},
    {parentId: 6, title: 1, cdid: 7},
    {parentId: 6, title: 1, cdid: 8},
    {parentId: 5, title: 1, cdid: 9},
    {parentId: 5, title: 1, cdid: 10},
    {parentId: 4, title: 1, cdid: 11},
    {parentId: 4, title: 1, cdid: 12},
    {parentId: 3, title: 1, cdid: 13},
    {parentId: 2, title: 1, cdid: 14},

    {parentId: 8, title: 1, cdid: 15},
    {parentId: 9, title: 1, cdid: 16},
    {parentId: 11, title: 1, cdid: 17},
    {parentId: 13, title: 1, cdid: 18},
  ]
  export default {
    name: "Tree",
    data(){
      return {
      }
    },
    created () {
      let arr1 = []
      for (let i = 0; i < arr.length; i++) {
        
      }
    },
    methods: {

      request(){
      }
    },

    //监听
    watch:{
    }
  }
</script>

<style scoped>

</style>