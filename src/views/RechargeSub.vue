<template>
    <!-- 返回 -->
    <div class="toBack">
        <span @click="getGoBack()">
            <n-icon :component="ArrowBack" size="25" color="#000" :depth="1" />
        </span>
    </div>
    <div class="rechargeAddMain">
        <span style="font-size: 20px;margin-left: 5%;">我的消费</span>
        <div>
            <n-list style="padding-left: 5%;padding-right: 5%;padding-top: 10px;">
                <n-list-item v-for="(item, index) in rechargeInfo" :key="index">
                    <span style="font-size: 19px;">{{ item.rechargeMsg }}</span>
                    <br/>
                    <span style="font-size: 12px;color: #7d7d7d;">{{ item.createTime }}</span>
                    <span style="float: right;font-size: 17px;font-weight: bold;margin-top: -15px;">-{{ item.money }}</span>
                </n-list-item>
            </n-list>
        </div>
    </div>
</template>
<script setup>
import { ArrowBack } from '@vicons/ionicons5'
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import {UserStore} from "../stores/UserStore"

const router = useRouter()
const route = useRoute()



const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")

const userStore = UserStore();

onMounted(() =>{
    getRechargInfo()
})

const rechargeInfo = ref([])

const getRechargInfo = async () =>{
    let res = await axios.get("/ccread-order/order/getRechargeList/0")
    console.log(res)
    let bolg_res = res.data.data;
    // 处理获取的文章列表数据
    for (let row of bolg_res) {
        row.content += "..."
        // 把时间戳转换为年月日
        let d = new Date(row.createTime)
        row.createTime = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
    rechargeInfo.value = bolg_res
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
.rechargeAddMain{
    padding-top: 80px;
    background-color: rgb(255, 255, 255);
}
</style>