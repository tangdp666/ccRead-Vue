<template>
    
    <!-- 返回 -->
    <div class="toBack">
        <span @click="getGoBack()">
            <n-icon :component="ArrowBack" size="25" color="#000" :depth="1" />
        </span>
    </div>
    <!-- 主体 -->
        <div class="chapterMian">
            <n-list>
                <template #header>
                    <span style="font-size: 20px;margin-left: 20px;">
                        共 {{ chapterList.length }} 章
                    </span>
                  
                </template>

                    <n-list-item v-for="(item, index) in chapterList" :key="index" @click="toChapter(index+1)" >
                        {{ item.chapterName }}
                    </n-list-item>
            </n-list>
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

const chapterList = ref([])

onMounted(() => {
    getCataloglist()
})

const getCataloglist = async () => {
    let result = await axios.get(`/ccread-book/book/home/getCatalogList/${route.query.id}`)
    console.log(result)
    chapterList.value = result.data.data
}

// const toChapter = () => {
//     router.push("/chapter")
// }

const toChapter = async (pageNub) => {
    let res = await axios.put(`/ccread-book/book/home/updataViewCount/${route.query.id}`)
    router.push({
        path:"/chapter",
        query:{
            novelId:route.query.id,
            novelName:route.query.novelName,
            pageNub:pageNub 
        }
    })
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
    align-items: center;
    padding-left: 20px;
}
.chapterMian{
    width: 100%;
    margin-top: 50px;
    height: 100%;
    
}
.chapterMian .n-list-item{
    margin-left: 20px;
}
</style>