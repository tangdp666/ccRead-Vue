<template>
    <!-- 返回 -->
    <div class="toBack">
        <span @click="getGoBack()">
            <n-icon :component="ArrowBack" size="25" color="#000" :depth="1" />
        </span>
    </div>
    <div style="margin-top: 50px;">
        <n-list style="padding-top: 10px;">
           <n-list-item v-for="(item, index) in novelListInfo" :key="index">
            <div class="detileTitle">
                <div class="detileImg">
                    <img :src="item.cover" >
                </div>
                <div class="detileInfo">
                    <span style="font-size: 18px;font-weight: bold;">{{item.novelName}}</span>
                    <span style="font-size: 14px;">{{item.author}}</span>
                    <span style="font-size: 14px;margin-top: 5px;color: #939393;">{{ item.intro }}</span>
                    <span style="font-size: 14px;">vip免费读</span>
                </div>
            </div>
           </n-list-item>
        </n-list>        
    </div>

    
</template>
<script setup>
import { ArrowBack } from '@vicons/ionicons5'
import { ref, reactive, inject, onMounted } from 'vue'

import {UserStore} from "../stores/UserStore"
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()



const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")

const userStore = UserStore();
const novelListInfo = ref([])

onMounted(() => {
  getNovelList()
})

const getNovelList = async () => {
    let result = await axios.post("/ccread-book/book/home/getNovelListByHome",
    {
        orderType:route.query.type
    })
    novelListInfo.value =result.data.data
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

.detileTitle{
    padding-left: 5%;
    padding-right: 5%;
}
.detileImg{
    width: 30%;
    height: 120px;
    float: left;
}
.detileImg img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
.detileInfo{
    float: left;
    margin-left: 10px;
}
.detileInfo span {
  display: block;
  width: 100%;
}

</style>