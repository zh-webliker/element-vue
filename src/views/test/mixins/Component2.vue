<template>
  <div>
    <form>
      <div>
        <!--<input type="text" v-model="name" placeholder="QX" />-->
        <label>region: </label>
        <select v-model="name">
          <option>碧江区</option>
          <option>万山区</option>
          <option>松桃县</option>
          <option>大龙经济技术开发区</option>
        </select>

        <br>
        <label>page size: </label>
        <select v-model="PAGINATION.pageSize">
          <option>5</option>
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
      </div>
    </form>
    <button @click="check">query</button>
    <button @click="handleCurrentChange(PAGINATION.currentPage - 1)">prev</button>
    <button @click="handleCurrentChange(PAGINATION.currentPage + 1)">next</button>

    <div>
      <p>page:{{PAGINATION.currentPage}}</p>
      <p>count:{{PAGINATION.total}}</p>
      <ul>
        <li v-for="(item, index) in tableData"
            :key="index">
          {{item.OBJECTID}}-{{item.ZKMC}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import pager from './pager'
  import {queryTrzkQX} from "./api";

  export default {
    name: "Component2",
    mixins: [pager],
    data(){
      return {
        name: "碧江区",
        method: 'queryData',
        tableData: []
      }
    },
    methods: {
      getParams() {
        return {
          searchField: {
            "QX": this.name,
          },
          limit: this.PAGINATION.pageSize,
          page: this.PAGINATION.currentPage
        }
      },
      async queryData (){
        let res = await queryTrzkQX({ ...this.queryParams });
        this.tableData = res.data.jsonObject.data;
        this.PAGINATION.total = res.data.jsonObject.totalCount;
      }
    }
  }
</script>

<style scoped>

</style>