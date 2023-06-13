<template>
    <div>
        <div class="navbar">
            <div>
                <span @click="getNovelList()">收藏</span>
            </div>
            <!-- <div>
                <span>我的浏览</span>
            </div> -->
            <div>
                <span @click="getNovelListB()">我的购买</span>
            </div>

        </div>
    </div>
    <div class="bookeackBook" v-show="showFlag">
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

    <n-result style="margin-top: 100px;margin-bottom: 300px;" v-show="!showFlag" status="418" title="当前暂无图书">
      </n-result>

</template>
<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';


const router = useRouter()
const route = useRoute()

const axios = inject("axios")
const message = inject("message")

const novelListInfo = ref([])

onMounted(() => {
    getNovelList()
})

const showFlag = ref(false)

const getNovelList = async () => {
    let res = await axios.get("/ccread-bookeack/bookeack/getCollectionList")
    console.log(res)
    if(res.data.data != 0){
    showFlag.value = true
  }
    novelListInfo.value = res.data.data

}

const getNovelListB = async () => {
  let res = await axios.get("/ccread-bookeack/bookeack/getPurchaseList")
    console.log(res)
    if(res.data.data != 0){
    showFlag.value = true
  }
    novelListInfo.value = res.data.data
}

const toDetileBook = (novel) =>{
  router.push({
    path:"/detilePage",
    query:{
      id:novel.novelId
    }
  })
}
</script>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  /* color: #fff; */
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
  padding-bottom: 10px;
  box-sizing: border-box;
}

.navbar div {
  text-decoration: none;
  font-size: 20px;
  /* color: #fff; */
}
.bookeackBook{
    margin-top: 80px;
    padding-bottom: 50px;
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