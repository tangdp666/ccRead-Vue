<template>
    <!-- 返回 -->
    <div class="toBack">
        <span @click="getGoBack()">
            <n-icon :component="ArrowBack" size="30" color="#737373" :depth="1" />
        </span>
        <span style="font-size: 20px;margin-left: 15px;color: #4a4a4a;">{{ novelDto.novelName }}</span>
    </div>
    <!-- 内容 -->
    <div class="chapterMian">
        <!-- 标题 -->
        <div class="chapterTitle">
            <p>
                {{ chapterInfo.chapterName }}
            </p>
        </div>
        <div class="chaptercontent">
           <span>
              {{ chapterInfo.article }}
           </span>
        </div>
        <div class="liftBut"  v-show="showButton" @click="subChapter()">
            <n-button text >
               <n-icon :component="ChevronBackOutline" size="40" color="#000" :depth="1" />
            </n-button>
        </div>
        <div class="rigthBut" v-show="showButton" @click="addChapter()">
            <n-button text>
               <n-icon :component="ChevronForwardOutline" size="40" color="#000" :depth="1" />
            </n-button>
        </div>
    </div>
</template>
<script setup>
import { ArrowBack,ChevronBackOutline,ChevronForwardOutline } from '@vicons/ionicons5'
import { ref, reactive, inject, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import {UserStore} from "../stores/UserStore"

const router = useRouter()
const route = useRoute()



const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")

const userStore = UserStore();

const novelDto = {
    novelId:route.query.novelId,
    pageNub:route.query.pageNub,
    novelName:route.query.novelName
}

const showButton = ref(true)




const chapterInfo = ref({})

const scrollContainer = ref(null);

const handleScroll = () =>{
    if(window.scrollY != 0){
        showButton.value = true;
        setTimeout(() => {
            showButton.value = false;
        },10000);
    }else{
        showButton.value = false
    }
}

onMounted(() => {
   setTimeout(() => {
    showButton.value = false;
   },5000);
   window.addEventListener('scroll',handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener("scroll",handleScroll)
})

onMounted(() =>{
    getChapter()
})

const getChapter = async () => {
    let res = await axios.post("/ccread-book/book/chapter/getChapter",{
        novelId:novelDto.novelId,
        pageNub:novelDto.pageNub
    })
    chapterInfo.value = res.data.data[0]
}


const showFalg = () => {
   if(novelDto.pageNub <= 1){
    message.error("当前是第一页！")
   }
}

const subChapter = async () => {
    if(novelDto.pageNub > 1){
        novelDto.pageNub--
    }
    getChapter()
    showFalg()
    window.scrollTo({top: 0, behavior: 'smooth'})
}

const addChapter = async () => {
    novelDto.pageNub++
    getChapter()
    showFalg()
    window.scrollTo({top: 0, behavior: 'smooth'})
}


const getGoBack = () => {
    router.back(1)
}

</script>
<style scoped>
.toBack{
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
.chapterMian{
    /* margin-top: 50px; */
}
.chapterTitle{
    text-align: center; /* 水平居中 */
    overflow: auto;    /* 允许溢出时自动换行 */
    word-break: break-all; /* 换行规则，尽可能的分割单词 */
    font-size: 25px;
}
.chaptercontent{
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 20px;
    font-size: 20px;
    line-height: 1.8;
}
.liftBut{
    position: fixed;
    bottom: 10px;
    left: 5px;
    z-index: 9999;
}
.rigthBut{
    position: fixed;
    bottom: 10px;
    right: 5px;
    z-index: 9999;
}
</style>