<template>
    
    <div class="container">
       <div class="logoImg" @click="logout">
           <img src="../assets/img/logoFont.png" style="width: 100%;height: 100%;">
       </div>
   <n-card class="login-form">
       <div class="loginType">
                   <n-gradient-text type="info" style="position: absolute;left: calc(50% - 28px);font-size: 25px;">注  册</n-gradient-text>
               </div>
               <div class="loginFrom">
                   <n-form :rules="rules" :model="admin">
                       <n-input v-model:value="admin1.account" placeholder="请输入账号" />
                   <n-form-item>
                       <n-input v-model:value="admin1.password" type="password" placeholder="请输入密码" />
                   </n-form-item>
                       <n-input v-model:value="admin1.repassword" type="password" placeholder="请输入确认密码" />
                   <n-form-item>
                       <n-input v-model:value="admin1.email" placeholder="请输入邮箱" />
                   </n-form-item>
               </n-form>
               <!-- <n-checkbox v-model:checked="admin.rember" label="保持登录" /> -->
               <n-button @click="toLogin()" style="float: right;" text>已有账号？前往登录</n-button>
               <br/>
               <n-button type="info" @click="register" class="loginBut">
                   注册
               </n-button>
           </div>
   </n-card>
 </div>
</template>
<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { UserStore } from '../stores/UserStore';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()

const axios = inject("axios")
const message = inject("message")

const userStore = UserStore();

const dialog = inject("dialog")


   /**用户注册数据 */
const admin1 = reactive({
   account: "",
   password: "",
   repassword:"",
   email:""
})


/**验证表单规则 */
let rules = {
   account: [
       { required: true, message: "请输入账号", trigger: "blur" },
       { min: 1, max: 12, message: "账号长度在 3 到 12 个字符", trigger: "blur" },
   ],
   password: [
       { required: true, message: "请输入密码", trigger: "blur" },
       { min: 2, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" },
   ],
   repassword: [
       { required: true, message: "请确认密码", trigger: "blur" },
       { min: 2, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" },
   ],
   email: [
       { required: true, message: "请输入邮箱", trigger: "blur" },
       { min: 2, max: 18, message: "邮箱长度在 6 到 18 个字符", trigger: "blur" },
   ],
};

const logout = () =>{
   localStorage.setItem("token","")
}


const register = async () => {
   let result = await axios.post("/ccread-admin/api/v1/users/register", {
           username: admin1.account,
           password: admin1.password,
           email:admin1.email
       })
   console.log(result)
   if(result.data.code == '000000'){
    localStorage.setItem("account",admin1.account)
    localStorage.setItem("password",admin1.password)
       message.success("注册成功！")
       router.push("/login")
   }else{
       message.error("失败！")
   }
  



}


const toLogin = () => {
   router.push("/login")
}




</script>
<style scoped>
.container {
 display: flex;
 justify-content: center;
 align-items: center;
 height: 80vh;
 background-color: #fafafa;
 flex-direction: column;
}

.login-form {
 margin-top: 30px;
 width: 96%;
 max-width: 600px;
}
.loginFrom{
   margin-top: 50px;
}
.loginBut{
   width: 80%;
   margin-left: 10%;
   margin-top: 35px;
}
.logoImg{
   width: 40%;

}



</style>
   
