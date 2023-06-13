import { createRouter,createWebHashHistory } from "vue-router";
import { ref, reactive, inject, onMounted } from 'vue'
const message = inject("message")

let routes = [
    {
        path:"/index",
        component: () => import("../views/Index.vue"),
        children: [
            {
                path:"/index/home",
                component: () => import("../views/index/Home.vue")
            },
            {
                path:"/",
                component: () => import("../views/index/Home.vue")
            },
            {
                path:"/index/classify",
                component: () => import("../views/index/Classify.vue")
            },
            {
                path:"/index/bookrack",
                component: () => import("../views/index/Bookrack.vue")
            },
            {
                path:"/index/myInfo",
                component: () => import("../views/index/MyInfo.vue")
            },
            {
                path:"/",
                component: () => import("../views/index/Home.vue")
            },
        ]
    },
    {
        path:"/login",
        component: () => import("../views/Login.vue"),
        
    },
    {
        path:"/detilePage",
        component: () => import("../views/DetilePage.vue"),
        
    },
    {
        path:"/chapter",
        component: () => import("../views/Chapter.vue"),
        
    },
    {
        path:"/catalog",
        component: () => import("../views/Catalog.vue"),
        
    },
    {
        path:"/bookCircle",
        component: () => import("../views/BookCircle.vue"),
        
    },
    // 充值记录
    {
        path:"/rechargeAdd",
        component: () => import("../views/RechargeAdd.vue"),
        
    },
    // 消费记录
    {
        path:"/rechargeSub",
        component: () => import("../views/RechargeSub.vue"),
        
    },
    // 我的互动
    {
        path:"/userComment",
        component: () => import("../views/UserComment.vue"),
        
    },
    // 我的信息
    {
        path:"/userInfo",
        component: () => import("../views/UserInfo.vue"),
        
    },
    // 购物车
    {
        path:"/userShopping",
        component: () => import("../views/UserShopping.vue"),
        
    },
    // VIP
    {
        path:"/userVip",
        component: () => import("../views/UserVip.vue"),
        
    },
    // 写评论
    {
        path:"/comment",
        component: () => import("../views/Comment.vue"),   
    },
    // 充值
    {
        path:"/recharge",
        component: () => import("../views/Recharge.vue"),
    },
    //排序详情页面
    {
        path:"/orderBook",
        component: () => import("../views/OrderBook.vue"),
    },
    //搜索页面
    {
        path:"/inputNovel",
        component: () => import("../views/InputNovel.vue"),
    },
    //注册页面
    {
        path:"/register",
        component: () => import("../views/Register.vue"),
    },
    
   
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to,from,next) => {
    //获取存储的token
    let token = localStorage.getItem("token")
    console.log("router:"+token)
    //获取存储的token的开始时间
    const tokenStartTime = localStorage.getItem("tokenStartTime")
    //自定义过期时间
    const OverTime = 3 * 24 * 3600 * 1000
    //获取当前时间
    let date = new Date().getTime()
    console.log(date)
    console.log(tokenStartTime)
    console.log(date - tokenStartTime)
    console.log(OverTime)
    //判断
    //时间大于则过期
    if(date - tokenStartTime > OverTime) {
          token = null
    }
    //token过期
    console.log("router2::::"+token)
    if(!token){
        if(to.path == "/login" || to.path == "/" || to.path == "/index/home" || to.path == "/index/classify" || to.path == "/register") return next()
        // message.error("请前往登录！")
        // message.error("请前往登录！")
        return next("/login")
    }else if (to.path == "/login") {
        //如果token没有过期，又选择了登录页面就直接重定向到首页，不需要重新输入账号密码
        return next("/")
    }
    next()
})

export {router, routes}