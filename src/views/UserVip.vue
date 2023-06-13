<template>
    <!-- 返回 -->
    <div class="toBack">
        <span  @click="getGoBack()">
            <n-icon :component="ArrowBack" size="25" color="#000" :depth="1" />
        </span>
    </div>
    <div class="userVipMain">
        <div>
            <n-card>
                <div class="userInfo">
                        <n-avatar
                        round
                        :size="40"
                        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                        style="margin-right: 10px;"
                        /> 
                        <span style="margin-right: 10px;font-size: 16px;color: #717171;">{{ userInfo.nickname }}</span>
                        <br/>
                        <div class="vipTime">
                            <span>{{vipMsg}}</span>
                        </div>
                        
                    </div>
            </n-card>
        </div>
        <div style="width: 80%;margin-top: 30px;margin-left: 10%;">
            <n-button @click="activate('bottom')" type="warning" style="width: 100%;">
               续费
            </n-button>
        </div>
    </div>
    <n-drawer v-model:show="active" :default-width="502" :placement="placement" :default-height="350">
    <n-drawer-content closable >
      <div style="position: relative;
            display: flex;
            justify-content: center;
            align-items: center; margin-left: calc(50% - 50px);width: 100px;">
        <span style="font-size: 28px;">支付</span>
      </div>
        <div style="position: relative;
            display: flex;
            justify-content: center;
            align-items: center;font-size: 30px;font-weight: bold;color: #ffcd28;margin-top: 50px; margin-left: calc(50% - 100px);width: 200px;">
            <span>500金币</span>
        </div>
        
        <div style="width: 80%;margin-left: 10%;margin-top: 60px;">
            <n-button @click="rechargeVip()"  style="width: 100%;border-radius: 45px;height: 50px;font-size: 20px;" type="warning">
                确认支付
            </n-button>
        </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import { ArrowBack } from '@vicons/ionicons5'
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';

import { UserStore } from '../stores/UserStore';

const route = useRoute()
const userStore = UserStore();

const axios = inject("axios")
const message = inject("message")

const dialog = inject("dialog")

const router = useRouter()



const active = ref(false);
const placement =ref("right")
const activate = (place) => {
    active.value = true;
    placement.value = place;
}

const vipMsg = ref()


onMounted(() => {
    getVipStatus(),
    getUserInfo()
})

const getVipStatus = async () => {
    let res = await axios.get("/ccread-order/order/getVipStatus")
    console.log(res)
    vipMsg.value = res.data.data
}

const rechargeVip = async () => {
    let res = await axios.post("/ccread-order/order/rechargeVip")
    location.reload();
} 

const userInfo = ref({})

const getUserInfo = async () => {
    let result = await axios.get(`ccread-admin/api/v1/users/getUserInfo`)
    console.log(result)
    userInfo.value = result.data.data
    console.log(userInfo.value)
     
}


const getGoBack = () => {
    router.back(1)
}
</script>
<style scoped>
.toBack{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: rgb(255, 255, 255);
    height: 50px;
    width: 100%;
    display: flex;
    padding-left: 10px;
    align-items: center;
}
.userVipMain{
    padding-top: 80px;
    padding-left: 5%;
    padding-right: 5%;
}
.userVipMain .n-card{
    height: 150px;
    border-radius: 10px;
}
.userInfo{
    position: relative; 
    display: flex; 
    align-items: center;
    
}

.vipTime{
    font-size: 18px;
  position: absolute;
  top: 200%; 
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>