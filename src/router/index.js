/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-02 19:07:34
 * @LastEditTime: 2022-08-13 09:44:37
 * @FilePath: \haigou-vue-app\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Kind from '../views/kind/index.vue'
import Cart from '../views/cart/index.vue'
import User from '../views/user/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
        
    ]
  },
  {
    path:'/city',
    name:'City',
    component:()=>import(/* webpackChunkName: "City" */ '../views/city/index.vue'),
    meta:{
        hidden:true
    },
},
{
    path:'/setting',
    name:'Setting',
    component:()=>import(/* webpackChunkName: "setting" */ '../views/setting/index.vue'),
    meta:{
        hidden:true
    },
},
{
    path:'/address',
    name:'Address',
    redirect:'/address/step1',
    component:()=>import(/* webpackChunkName: "Address" */ '../views/address/index.vue'),
    meta:{
        hidden:true
    },
    children:[
        {
            path:'step1',
            component:()=>import(/* webpackChunkName: "Address" */ '../views/address/step1.vue'),
            meta:{
                hidden:true
            },
        },
        {
            path:'step2',
            component:()=>import(/* webpackChunkName: "Address" */ '../views/address/step2.vue'),
            meta:{
                hidden:true
            },
        },
        {
            path:'step3/:address',
            component:()=>import(/* webpackChunkName: "Address" */ '../views/address/step3.vue'),
            meta:{
                hidden:true
            },
        }
    ]
},
{
    path:'/changeAddress',
    name:'ChangeAddress',
    redirect:'/changeAddress/step1',
    component:()=>import(/* webpackChunkName: "Address" */ '../views/changeAddress/index.vue'),
    meta:{
        hidden:true
    },
    children:[
        {
            path:'step1',
            component:()=>import(/* webpackChunkName: "Address" */ '../views/changeAddress/step1.vue'),
            meta:{
                hidden:true
            },
        },
        {
            path:'step2',
            component:()=>import(/* webpackChunkName: "Address" */ '../views/changeAddress/step2.vue'),
            meta:{
                hidden:true
            },
        },
        {
            path:'step3/:address',
            component:()=>import(/* webpackChunkName: "Address" */ '../views/changeAddress/step3.vue'),
            meta:{
                hidden:true
            },
        }
    ]
},
  {
    path: '/kind',
    name: 'Kind',
    redirect:'/kind/step1',
    component: Kind,
    children: [
        {
            path:'step1',
            component:()=>import(/* webpackChunkName: "kind" */ '../views/kind/step1.vue'),
            meta:{
                hidden:true
            },
        },
        {
            path:'step2',
            component:()=>import(/* webpackChunkName: "kind" */ '../views/kind/step2.vue'),
            meta:{
                hidden:true
            },
        },
        {
            path:'step3',
            component:()=>import(/* webpackChunkName: "kind" */ '../views/kind/step3.vue'),
            meta:{
                hidden:true
            },
        }
    ]
  },
  {
    path: '/payment',
    name: 'Payment',
    redirect:'/payment/step1',
    component: ()=>import(/* webpackChunkName: "Payment" */ '../views/payment/index.vue'),
    children: [
        {
            path:'step1',
            component:()=>import(/* webpackChunkName: "Payment" */ '../views/payment/step1.vue'),
            meta:{
                hidden:true
            },
        },
        {
            path:'step2',
            component:()=>import(/* webpackChunkName: "Payment" */ '../views/payment/step2.vue'),
            meta:{
                hidden:true
            },
        },
        {
            path:'step3',
            component:()=>import(/* webpackChunkName: "Payment" */ '../views/payment/step3.vue'),
            meta:{
                hidden:true
            },
        },
        {
            path:'step4',
            component:()=>import(/* webpackChunkName: "Payment" */ '../views/payment/step4.vue'),
            meta:{
                hidden:true
            },
        },
        {
            path:'step5',
            component:()=>import(/* webpackChunkName: "Payment" */ '../views/payment/step5.vue'),
            meta:{
                hidden:true
            },
        }
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/order',
    name: 'Order',
    component:()=>import(/* webpackChunkName: "Order" */ '../views/order/index.vue'),
    meta:{
        hidden:true
    },
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path:'/register',
    name: 'Register',
    redirect:'/register/step1',
    meta:{
        hidden:true
    },
     //要使用路由懒加载的方式
  component:()=>import(/* webpackChunkName: "register" */ '../views/register/index.vue')
  ,children:[
   { 
       path:'step1',
        component:()=>import(/* webpackChunkName: "register" */ '../views/register/step1.vue'),
        meta:{
            hidden:true
        },
    },
    {
        path:'step2',
        component:()=>import(/* webpackChunkName: "register" */ '../views/register/step2.vue'),
        meta:{
            hidden:true
        }
    },
    {
        path:'step3',
        component:()=>import(/* webpackChunkName: "register" */ '../views/register/step3.vue'),
        meta:{
            hidden:true
        }
    }
]
},
{
    path:'/login',
    name:'Login',
    redirect:'/login/step1',
    meta:{
        hidden:true
    },
     //要使用路由懒加载的方式
  component:()=>import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
  children:[
    { 
        path:'step1',
        component:()=>import(/* webpackChunkName: "login" */ '../views/login/step1.vue'),
        meta:{
          hidden:true
      },
    },
    { 
        path:'step2',
        component:()=>import(/* webpackChunkName: "login" */ '../views/login/step2.vue'),
        meta:{
          hidden:true
      },
    }
]
},
  {
    path:'/detail/:proid',
    name: 'detail',
    meta:{
        hidden:true
    },
     //要使用路由懒加载的方式
  component:()=>import(/* webpackChunkName: "detail" */ '../views/detail/index.vue')
 
},
{
    path:'*',
       // 对于 404 页面我们 要使用路由懒加载的方式
    // component: Error
    meta:{
        hidden:true
    },
    component:()=>import(/* webpackChunkName: "error404" */ '../views/error/index.vue')
  }
]

const router = new VueRouter({
    // history
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
    // console.log(to,from);
    next();
})

export default router
