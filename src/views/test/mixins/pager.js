/***
 * mixin 里面是一个不完整的vue 组件的 script部分
 * 在其他组件中引入并设置mixins后，这里的内容会直接解构到各个使用了pager的组件
 * 该组件用来模拟分页操作
 */

export default {
  components: {},
  data(){
    return {
      queryParams: {},
      PAGINATION: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      }
    }
  },
  methods:{
    //查询
    check(){
      this.PAGINATION = {
        ...this.PAGINATION,
        currentPage: 1
      };
      this.queryParams = this.getParams();
      this.useMethod();
    },
    //分页长度改变
    handleSizeChange(pageSize){
      this.PAGINATION = {
        ...this.PAGINATION,
        pageSize
      };
      this.queryParams = {
        ...this.queryParams,
        limit: this.PAGINATION.pageSize
      };
      this.useMethod();
    },
    //页码改变
    handleCurrentChange(currentPage){
      this.PAGINATION = {
        ...this.PAGINATION,
        currentPage
      };
      this.queryParams = {
        ...this.queryParams,
        page: this.PAGINATION.currentPage
      };
      this.useMethod();
    },
    //调用接口
    useMethod() {
      this[this.method]()
    }
  },
  created() {
    this.check()
  },
}