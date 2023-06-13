import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import { createPinia } from 'pinia'
import { router } from "./common/router"
import axios  from 'axios'
import {UserStore} from "./stores/UserStore"


axios.defaults.baseURL = "http://localhost:9999"
const { message, notifcation, dialog } = createDiscreteApi(["message", "notifcation", "dialog"])


createApp(App)
         .use(naive)
         .use(createPinia())
         .use(router)
         .provide("axios",axios)
         .provide("message",message)
         .provide("notifcation",notifcation)
         .provide("dialog",dialog)
         .mount('#app')
         


         const userStore = UserStore()
         // axios拦截器
         axios.interceptors.request.use((config) => {
             //每次请求都在headers中添加token
             let token = localStorage.getItem("token")
             console.log("token"+token)
             if (token) {
              console.log("有token")
               config.headers.authorization = "Bearer "+`${token}`
             }else{
              console.log("无token")
             }
             return config
         },err => {
           return Promise.reject(err);
         })
