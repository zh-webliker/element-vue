<template>
  <div>
    <form>
      <div>
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
  import {queryTrzk} from "./api";

  export default {
    name: "Component1",
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

      /**
       *  async|await 函数参考 http://es6.ruanyifeng.com/#docs/async
       *  使用async还是promise的.then().catch() 各有优劣
       * */
      async queryData (){
        let res = await queryTrzk({ ...this.queryParams });
        this.tableData = res.data.jsonObject.data;
        this.PAGINATION.total = res.data.jsonObject.totalCount;
      }
    }
  }
</script>

<style scoped>

</style>