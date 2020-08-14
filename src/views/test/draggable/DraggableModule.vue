<template>
  <div>
    <div>
      <button @click="update()">更新data</button>
    </div>
    <!--外层大框-->
    <div class="draggable-module">

      <!--列-->
      <div class="column"
           v-for="(column, colNumber) in modules"
           :key="colNumber"
           :id="'column'+colNumber">


        <component v-for="(module, index) in column"
                   :key="index"
                   :is="module"
                   :index="module"
                   :id="module"></component>

      </div>

    </div>
  </div>

</template>

<script>
  /*模拟不同组件*/
  import mod_A from './DraggedBlock';
  import mod_B from './DraggedBlock';
  import mod_C from './DraggedBlock';
  import mod_D from './DraggedBlock';
  import mod_E from './DraggedBlock';
  import mod_F from './DraggedBlock';
  import mod_G from './DraggedBlock';
  import mod_H from './DraggedBlock';

  /*拖拽插件*/
  import dragula from 'dragula';
  import 'dragula/dist/dragula.min.css';

  export default {
    name: "DraggableModule",
    data(){
      return {
        modules: [],
        drake: null
      }
    },
    components:{
      mod_A,mod_B,mod_C,mod_D,mod_E,mod_F,mod_G,mod_H
    },
    created(){
      /*加载本地保存的模块顺序 或者初始顺序*/
      this.modules = JSON.parse(localStorage.getItem("modules")) || [
        ["mod_A", "mod_B", "mod_C"],
        ["mod_D", "mod_E"],
        ["mod_F", "mod_G"],
        ["mod_H"]
      ];
    },
    mounted(){
      /*初始化拖拽组件 好像只能用这种方式*/
      this.drake = dragula([
          document.querySelector("#column0"),
          document.querySelector("#column1"),
          document.querySelector("#column2"),
          document.querySelector("#column3")
        ]);
    },
    methods: {
      /*更新组件顺序*/
      update(){
        let newModules = [];

        /*遍历column*/
        this.modules.forEach((module, index)=>{
          let column = document.getElementById("column"+index);
          let children = column.children; //HTMLCollection 类型
          let columnArray = [];
          /*遍历column下的组件，获得ID，保存为新的数组*/
          for(let child of children){
            columnArray.push(child.getAttribute("id"));
          }
          newModules.push(columnArray);
        });
        // this.modules = newModules;   //这里不能更新data，会出现错误，只能直接把模块数组保存起来
        localStorage.setItem("modules", JSON.stringify(newModules));
      }
    }
  }
</script>

<style scoped>
  .draggable-module { position: relative; width: 100%; display: flex; background: #f6dfe6; flex-direction: row}
  .column { height: calc(100% - 10px); margin: 10px; background: white; width: 100%; min-height: 100px; }
</style>