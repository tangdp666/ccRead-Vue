<template>
  <!-- 返回 -->
  <div class="toBack">
    <span @click="getGoBack()">
      <n-icon :component="ArrowBack" size="25" color="#000" :depth="1" />
    </span>
  </div>
  <div class="rechargeMain">
    <div>
      <span style="font-size: 20px;"> 选择充值金额 </span>
      <br/>
      <span style="font-size: 10px;color: #898989;"> 说明：充值1元=10金币 </span>
    </div>
    <div class="valList">
        <n-card @click="getVla(60,6)">
            <span style="font-size: 20px;font-weight: bold">￥6</span>
            <span style="color: #818181;">60金币</span>
        </n-card>
        <n-card @click="getVla(120,12)">
            <span style="font-size: 20px;font-weight: bold">￥12</span>
            <span style="color: #818181;">120金币</span>
        </n-card>
        <n-card @click="getVla(300,30)">
            <span style="font-size: 20px;font-weight: bold">￥30</span>
            <span style="color: #818181;">300金币</span>
        </n-card>
        <n-card @click="getVla(600,60)">
            <span style="font-size: 20px;font-weight: bold">￥60</span>
            <span style="color: #818181;">600金币</span>
        </n-card>
        <n-card @click="getVla(1000,100)">
            <span style="font-size: 20px;font-weight: bold">￥100</span>
            <span style="color: #818181;">1000金币</span>
        </n-card >
        <n-card @click="getVla(1500,150)">
            <span style="font-size: 20px;font-weight: bold">￥150</span>
            <span style="color: #818181;">1500金币</span>
        </n-card>
    </div>
    <div style="width: 80%;margin-left: 10%;margin-top: 60px;">
        <n-button @click="activate('bottom')" type="warning" style="width: 100%;">
            立即充值
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
            align-items: center;font-size: 30px;font-weight: bold;color: #ffcd28;margin-top: 50px; margin-left: calc(50% - 50px);width: 100px;">
            <span>￥{{ rechargeInfo.valMoney }}</span>
        </div>
        
        <div style="width: 80%;margin-left: 10%;margin-top: 60px;">
            <n-button @click="addUserAccount()"  style="width: 100%;border-radius: 45px;height: 50px;font-size: 20px;" type="warning">
                确认支付
            </n-button>
        </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import { ArrowBack } from "@vicons/ionicons5";
// import axios from "axios";
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';


const router = useRouter()

const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")



const active = ref(false);
const placement =ref("right")
const activate = (place) => {
    active.value = true;
    placement.value = place;
}

const rechargeInfo = {
  valNum:1500,
  valMoney:150
}

const getVla = (val1, val2) =>{
  rechargeInfo.valNum = val1,
  rechargeInfo.valMoney = val2
  console.log(rechargeInfo.valNum, rechargeInfo.valMoney)
}

const addUserAccount = async () => {
  let res  = await axios.post("/ccread-order/order/addAccount",null,{
    params:{
      accountVal: rechargeInfo.valNum
    }
  })
  if(res.data.code == "000000"){
        message.success("充值成功！")
        router.back(1)
        
    }else{
        message.error(res.data.msg)
    }
  console.log(res)
}


const getGoBack = () => {
    router.back(1)
}
</script>
<style scoped>
.toBack {
  /* position: fixed;
  top: 0;
  left: 0;
  z-index: 9999; */
  background-color: rgb(255, 255, 255);
  height: 50px;
  width: calc(100% - 10px);
  display: flex;
  padding-left: 10px;
  align-items: center;
}
.rechargeMain {
  /* padding-top: 80px; */
  padding-left: 5%;
  padding-right: 5%;
}
.valList{
    display: flex;
    flex-wrap: wrap;
}
.valList .n-card{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(50% - 10px); /* 每两个并排排列 */
    margin: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 阴影样式 */
}
.valList span {
  display: flex;
  align-items: center; /* 垂直居中排列 */
}

.n-card:hover {
   border: 2px solid #f4ac39; 
   }
</style>
