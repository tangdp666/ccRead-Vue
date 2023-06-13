<template>
    
     <div class="container">
        <div class="logoImg" @click="logout">
            <img src="../assets/img/logoFont.png" style="width: 100%;height: 100%;">
        </div>
    <n-card class="login-form">
        <div class="loginType">
                    <n-gradient-text type="info" style="position: absolute;left: calc(50% - 28px);font-size: 25px;">登  录</n-gradient-text>
                </div>
                <div class="loginFrom">
                    <n-form :rules="rules" :model="admin">
                        <n-input v-model:value="admin.account" placeholder="请输入账号" />
                    <n-form-item>
                        <n-input v-model:value="admin.password" type="password" placeholder="请输入密码" />
                    </n-form-item>
                </n-form>
                <n-checkbox v-model:checked="admin.rember" label="记住密码" />
                <n-button @click="toRegister()" style="float: right;" text>还没账号？</n-button>
                <br/>
                <n-button type="info" @click="login" class="loginBut">
                    登录
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


    /**用户登录数据 */
const admin = reactive({
    account: localStorage.getItem("account"),
    password: localStorage.getItem("password"),
    rember: localStorage.getItem("rember") == 1 || false
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
};

const logout = () =>{
    localStorage.setItem("token","")
}


const login = async () => {
    let result = await axios.post("/ccread-auth/oauth/token",null, {
        headers: {
            authorization: "Basic YW1zOmFtcw=="
        },
        params: {
            grant_type:'password',
            username: admin.account,
            password: admin.password
        }
    }
    )
    console.log(result)
    if(result.data.code == '000000'){
        userStore.token = result.data.data.access_token;
        userStore.account = result.data.data.username
        userStore.id = result.data.data.userId
        
        localStorage.setItem("token",result.data.data.access_token)
        localStorage.setItem("tokenStartTime",new Date().getTime() )
        message.success("登录成功！")
        if(admin.rember == true){
            localStorage.setItem("account",admin.account)
            localStorage.setItem("password",admin.password)
            localStorage.setItem("rember",admin.rember?1:0)
        }else{
            localStorage.setItem("account","")
            localStorage.setItem("password","")
            localStorage.setItem("rember",0)
        }
        router.push("/")
    }else{
        message.error("失败！")
    }
   



}


const toRegister = () => {
    router.push("/register")
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
    
