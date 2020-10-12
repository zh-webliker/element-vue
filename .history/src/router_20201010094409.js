import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/Main"
    },
    {
      name: "Main",
      path: "/Main",
      component: ()=> import('./views/main/Main.vue'),
      children: [
        {
          path: "/",
          redirect: "/Main/Map"
        },
        {
          //在router-link跳转中，如果路由设置了name，也可以用name替代path
          name: "Map",
          path: "/Main/Map",
          component: ()=> import('./views/main/Map.vue')
        },
        {
          name: "Icon",
          path: "/Main/Icon",
          component: ()=> import('./views/main/Icon.vue')
        },
        {
          name: "Tree",
          path: "/Main/Tree",
          component: ()=> import('./views/main/Tree.vue')
        },
        {
          name: "Storage",
          path: "/Main/Storage",
          component: ()=> import('./views/main/Storage.vue')
        },
        {
          name: "Storage2",
          path: "/Main/Storage2",
          component: ()=> import('./views/main/Storage2.vue')
        },
        {
          name: "Deliver",
          path: "/Main/Deliver",
          component: ()=> import('./views/main/Deliver.vue')
        },
        {
          name: "Charts",
          path: "/Main/Charts",
          component: ()=> import('./views/main/Charts.vue')
        },
        {
          name: "dailyQuestion",
          path: "/Main/dailyQuestion",
          component: ()=> import('./views/main/dailyQuestion.vue'),
          children: [
            {
              name: "lazyLoadingInmg",
              path: "/lazyLoadingInmg",
              component: ()=> import('./components/dailyQuestion/lazyLoadingInmg.vue')
            },
            {
              name: "debounce",
              path: "/debounce",
              component: ()=> import('./components/dailyQuestion/debounce.vue')
            },
          ]
        }
      ]
    },
    {
      name: "Element",
      path: "/Element",
      component: ()=> import('./views/element/ElementMain.vue'),
      children: [
        {
          path: "/",
          redirect: "/Element/Table"
        },
        {
          name: "Table",
          path: "/Element/Table",
          component: ()=> import('./views/element/Table.vue'),
        },
        {
          name: "Tab",
          path: "/Element/Tab",
          component: ()=> import('./views/element/Tab.vue'),
        },
        {
          name: "Form",
          path: "/Element/Form",
          component: ()=> import('./views/element/Form.vue'),
        },
        {
          name: "Tree",
          path: "/Element/Tree",
          component: ()=> import('./views/element/Tree.vue'),
        }
      ]
    },

    {
      name: "Test",
      path: "/Test",
      component: ()=> import('./views/test/Test.vue'),
      redirect: "/Test/Mixin",

      children:[
        {
          name: "Mixin",
          path: "/Test/Mixin",
          component: ()=> import('./views/test/mixins/Index.vue')
        },
        {
          name: "DraggableModule",
          path: "/Test/DraggableModule",
          component: ()=> import('./views/test/draggable/DraggableModule.vue')
        }
      ]
    },

    //把404页面放到最后匹配剩下的全部页面
    {
      name: "404",
      path: "*",
      component: ()=> import('./views/404.vue'),
    }

  ]
})
