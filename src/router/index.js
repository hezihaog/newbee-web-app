import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
    //空路径，重定向到首页
    {
        path: '/',
        name: 'home',
        redirect: 'home'
    },
    //首页
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            //添加 meta 属性，约定 1 为第一级
            index: 1
        }
    },
    //分类
    {
        path: '/category',
        name: 'category',
        component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue'),
        meta: {
            index: 1
        }
    },
    //购物车
    {
        path: '/cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
        meta: {
            index: 1
        }
    },
    //我的
    {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "about" */ '../views/User.vue'),
        meta: {
            index: 1
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
        meta: {
            index: 2
        }
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue'),
        meta: {
            index: 2
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            //添加 meta 属性，约定 2 为第二级
            index: 2
        }
    }
];

const router = new VueRouter({
    routes
});

export default router
