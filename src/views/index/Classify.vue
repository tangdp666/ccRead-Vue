<template>
    <!-- 头部 -->
    <div>
        <!-- 导航 -->
        <div class="navContainer">
        <div class="classifyNav">
            <div class="navItem" v-for="(item, index) in classifyName"  @click="getNovelList(item.id)">
                {{ item.categoryName }}
            </div>
        </div>
        </div>
        
    </div>
   <!-- 小说 -->
   <div class="classifyBook">
    <div style="margin-top: 20px;">
            <div class="bookList">
                <div v-for="(item, index) in novelListInfo" :key="index" class="bookItem" @click="toDetileBook(item)">
                    <div class="bookImg">
                        <img :src="item.cover" alt="book cover" style="width: 100%;height: 100%;">
                    </div>
                    <p class="bookTitle">{{ item.novelName }}</p>
                </div>
            </div>
        </div>
   </div>
</template>
<script setup>
import { ref, reactive, inject, onMounted } from 'vue'

import { useRouter, useRoute } from 'vue-router';


const router = useRouter()
const route = useRoute()

const axios = inject("axios")
const message = inject("message")

const novelListInfo = ref([])


const classifyName = ref([])

onMounted(() => {
    getClassifyname()
    getNovelList(1)
})


const getClassifyname = async () => {
    let result = await axios.get("/ccread-book/book/home/getCategoryList")
    console.log(result)
    classifyName.value = result.data.data
}


const getNovelList = async (categoryNub) => {
  let result = await axios.post("/ccread-book/book/home/getNovelListByHome",{
    categoryId:categoryNub
  })
  novelListInfo.value = result.data.data
  console.log(novelListInfo.value)
}

const toDetileBook = (novel) =>{
  router.push({
    path:"/detilePage",
    query:{
      id:novel.id
    }
  })
}


</script>
<style scoped>
.navContainer {
  position: fixed;
  top: 0;
  width: 100%;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 10px rgba(0,0,0,.2);
}

.classifyNav {
  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer */
  scroll-behavior: smooth; /* 添加滚动速度 */
  scroll-padding: 100px; /* 控制内容框在滚动时从两端往内留出一定的间隙 */
}

.navItem {
  display: inline-block;
  width: 13%;
  padding: 10px;
  font-size: 16px;
}

.classifyNav::-webkit-scrollbar {
  display: none;
}

.sortbar {
  display: flex; /* 设置为弹性布局 */
  justify-content: flex-end; /* 子元素水平靠右 */
  align-items: center; /* 子元素垂直居中 */
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 15px;
  margin-right: 10px;
}
.sortbar div{
    margin-left: 10px;
}
.classifyBook{
    margin-bottom: 40px;
    margin-top: 60px;
}

.bookList {
  display: flex;
  flex-wrap: wrap;
}

.bookItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  margin-bottom: 20px;
  border-radius: 5px;
}

.bookImg {
  width: 100%;
  height: 180px;
  overflow: hidden;
  /* border-top-left-radius: 5px;
  border-top-right-radius: 5px; */
  border-radius: 5px;
}

.bookImg img {
  width: 80%;
  margin-left: 10%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.bookTitle {
  /* padding: 10px; */
  text-align: center;
}
</style>