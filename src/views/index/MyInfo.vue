<template>
    <div class="userInfo">
        <!-- 头像 -->
        <div class="avatar">
            <n-avatar
                round
                :size="60"
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
            <span>{{ userInfo.nickname }}</span>
        </div >
        <!-- 资产 -->
        <div class="balanceCard">
            <n-card>
                <div style="font-size: 16px;">我的资产</div>
                <br/>
                <div class="container">
                    <div class="balance">
                        <span style="font-size: 17px;font-weight: bold;">{{ userInfo.account }}</span>
                        <br/>
                        
                        <span>金币余额（币）</span>
                    </div>
                    <div class="recharge" @click="toRecharge()">
                        <n-button type="warning">充值</n-button>
                    </div>
                </div>
            </n-card>
        </div>
        <!-- 我的服务 -->
        <div class="serverCard">
            <n-card>
                <div style="font-size: 16px;">我的服务</div>
                <br/>
                <n-list hoverable clickable>
                    <n-list-item @click="toUserInfo()">
                        我的信息
                        <span>></span>
                    </n-list-item>
                    <!-- <n-list-item @click="toUserShopping()">
                        我的消息
                        <span>></span>
                    </n-list-item> -->
                    <n-list-item @click="toUserComment()">
                        我的互动
                        <span>></span>
                    </n-list-item>
                    <n-list-item @click="toUserVip()"> 
                        我的VIP
                        <span>></span>
                    </n-list-item>
                    <n-list-item @click="toRechargeAdd()">
                        充值记录
                        <span>></span>
                    </n-list-item>
                    <n-list-item @click="toRechargeSub()">
                        消费记录
                        <span>></span>
                    </n-list-item>
                    
                    
                </n-list>
            </n-card>
        </div>
    </div>
</template>
<script setup>
import { SadOutline } from '@vicons/ionicons5';
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { UserStore } from '../../stores/UserStore';



const router = useRouter()
const route = useRoute()
const userStore = UserStore();

const axios = inject("axios")
const message = inject("message")

const userInfo = ref({})

onMounted(() => {
    getUserInfo()
})

const getUserInfo = async () => {
    let result = await axios.get(`ccread-admin/api/v1/users/getUserInfo`)
    console.log(result)
    userInfo.value = result.data.data
}


const toRechargeAdd = () =>{
    router.push("/rechargeAdd")
}

const toRechargeSub = () =>{
    router.push("/rechargeSub")
}

const toUserInfo = () =>{
    router.push("/userInfo")
}

// const toUserShopping = () =>{
//     router.push("/userShopping")
// }

const toUserComment = () =>{
    router.push("/userComment")
}

const toUserVip = () =>{
    router.push("/userVip")
}

const toRecharge = () => {
    router.push("/recharge")
}
</script>
<style scoped>
.userInfo{
    width: 90%;
    margin-left: 5%;
}
.avatar{
    margin-top: 30px;
    display: flex;
    align-items: center;
    font-size: 20px;
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
}
.avatar span{
    font-size: 20px;
    color: #444444;
    /* margin-left: 10px; */
    margin-top: 10px;
    text-align: center;
    
}
.balanceCard{
    margin-top: 30px;
}
.balanceCard .n-card{
    border-radius: 10px;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance,
.recharge {
  flex-basis: calc(50% - 1px);
  text-align: center;
  /* padding: 20px; */
}

.balance {
  border-right: 1px solid #ccc;
}

.recharge button {
  color: rgb(255, 255, 255);
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.container::before {
  content: "";
  display: block;
  height: 2px;
  background-color: #ccc;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  z-index: -1;
}

.container > div {
  position: relative;
}

.serverCard{
    margin-top: 30px;
}
.serverCard .n-card{
    border-radius: 10px;
}
.n-list-item span{
    float: right;
    color: #ccc;
}
</style>