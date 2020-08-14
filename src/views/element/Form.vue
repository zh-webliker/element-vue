<template>
  <div>


    <el-form
            :inline="inline"
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px">

      <el-form-item label="输入框" prop="name">
        <el-input v-model="form.name" placeholder="请输入内容" size="medium"></el-input>
      </el-form-item>

      <el-form-item label="选择器">
        <el-select v-model="form.select" placeholder="请选择">
          <el-option
                  v-for="item in selectOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="form.multiSelect" multiple placeholder="请选择">
          <el-option
                  v-for="item in selectOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="form.combox" filterable  placeholder="请选择">
          <el-option
                  v-for="item in selectOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日期">
        <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期">
        </el-date-picker>
        <el-date-picker
                v-model="form.date1"
                type="date"
                align="right"
                :picker-options="dateOption"
                placeholder="选择日期">
        </el-date-picker>
        <el-date-picker
                v-model="form.dateRange"
                type="daterange"
                range-separator="至"
                :picker-options="dateRangeOption"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="时间日期">
        <el-date-picker
                v-model="form.datetime"
                type="datetime"
                placeholder="选择日期">
        </el-date-picker>
        <el-date-picker
                v-model="form.datetime1"
                type="datetime"
                align="right"
                :picker-options="dateOption"
                placeholder="选择日期">
        </el-date-picker>
        <el-date-picker
                v-model="form.datetimeRange"
                type="datetimerange"
                range-separator="至"
                :picker-options="dateRangeOption"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <el-form :inline="true" >
      <el-form-item label="行内表单">
        <el-switch
                v-model="inline"
                active-color="#13ce66"
                inactive-color="#ff4949">
        </el-switch>
      </el-form-item>

      <el-button type="primary" @click="submitForm('form')">提交表单</el-button>
    </el-form>

  </div>
</template>

<script>
  const selectOption = [
    {
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }
  ];
  const dateOption = {
    disabledDate(time) {
      return time.getTime() > Date.now();
    },
    shortcuts: [{
      text: '今天',
      onClick(picker) {
        picker.$emit('pick', new Date());
      }
    }, {
      text: '昨天',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        picker.$emit('pick', date);
      }
    }, {
      text: '一周前',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', date);
      }
    }]
  };
  const dateRangeOption = {
    shortcuts: [{
      text: '最近一周',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    }]
  };

  export default {
    name: "Form",
    data(){
      return{
        inline: false,
        selectOption,
        dateOption,
        dateRangeOption,

        //表单数据，默认值直接填里面
        form: {
          type: [],
          datetime: "2019-01-01 00:00:00",
          resource: "线下场地免费"
        },

        //Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
        rules: {
          //这里的意思是form.name需要满足以下两个条件：不为空/3-5字符
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          type:[
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ]
        }
      }
    },
    methods:{

      /***
       * 提交表单
       * @param formName 表单名称 ref
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //校验rules通过，执行提交操作
            alert('submit!');
          } else {
            //不通过
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>
  .el-input, .el-select { width: 180px;  margin-right: 20px; }
</style>