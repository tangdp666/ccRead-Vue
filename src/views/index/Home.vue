<template>
    <div class="homeComment">
     <!-- 搜索 -->
         <div style="margin-top: 20px;display: flex;">
          <img src="../../assets/img/logo.png" style="width: 10%;" @click="logout()">
            <n-space vertical style="width: 85%;margin-left: 10px;">
              <n-input-group>
                <n-input v-model:value="inputVal" :style="{ width: '100%' }" placeholder="输入内容"  />
                <n-button type="primary" ghost @click="toInputNovel()">
                    搜索
                </n-button>
              </n-input-group>
            </n-space>
        </div>
        <!-- 轮播图 -->
        <div style="margin-top: 30px;">
          <n-carousel draggable autoplay>
            <img
              class="carousel-img"
              src="../../assets/img/1.jpg"
            >
            <img
              class="carousel-img"
              src="../../assets/img/2.jpg"
            >
            <img
              class="carousel-img"
              src="../../assets/img/3.jpg"
            >
            <!-- <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
            > -->
          </n-carousel>
        </div>
        <!-- 排行 -->
        <div class="ranking-but">
           <div>
             <n-button @click="toOrderBook(0)" type="warning"><n-icon :component="ApertureOutline" size="25" color="#ffffff" :depth="1" /></n-button>
             <br/>
             <span>最新</span>
           </div>
           <div>
            <n-button @click="toOrderBook(1)" type="error"><n-icon :component="BonfireOutline" size="25" color="#ffffff" :depth="1" /></n-button>
            <br/>
            <span>热门</span>
           </div>
           <!-- <div>
            <n-button @click="toOrderBook(2)" type="info"><n-icon :component="HeartOutline" size="25" color="#ffffff" :depth="1" /></n-button>
            <br/>
            <span>热销</span>
           </div> -->
        </div>
            <div style="margin-top: 20px;">
              <span style="font-size: 18px;">新书速递</span>
                   <br/>
                    <div class="bookList">
                        <div v-for="(item, index) in novelListInfo" :key="index" class="bookItem" @click="toDetileBook(item)">
                            <div class="bookImg">
                                <img :src="item.cover" alt="book cover" style="width: 100%;height: 100%;">
                            </div>
                            <p class="bookTitle">{{ item.novelName }}</p>
                        </div>
                    </div>
                </div>

                <!-- 热门 -->
                <span style="font-size: 18px;">热门阅读</span>
                   <br/>
                    <div class="bookList">
                        <div v-for="(item, index) in novelListInfo2" :key="index" class="bookItem" @click="toDetileBook(item)">
                            <div class="bookImg">
                                <img :src="item.cover" alt="book cover" style="width: 100%;height: 100%;">
                            </div>
                            <p class="bookTitle">{{ item.novelName }}</p>
                        </div>
                    </div>
          </div>
        <!-- </div> -->
</template>
<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { BonfireOutline, HeartOutline,ApertureOutline } from '@vicons/ionicons5'
import { useRouter, useRoute } from 'vue-router';


const router = useRouter()
const route = useRoute()

const axios = inject("axios")
const message = inject("message")

const blogListInfo = ref([])

const novelListInfo = ref([])
const novelListInfo2 = ref([])

//搜索值
const inputVal = ref('')

const listOrdTime = reactive({
  limitNub : true,
  orderType:1
})

onMounted(() => {
  getNovelListOrdTime(),
  getNovelListOrdHot()
})

const logout = () =>{
    localStorage.setItem("token","")
}

const getNovelListOrdTime = async () => {
  let result = await axios.post("/ccread-book/book/home/getNovelListByHome",
  {
    limitNub:listOrdTime.limitNub
  })
  novelListInfo.value = result.data.data
  console.log(novelListInfo.value)
}

const getNovelListOrdHot = async () => {
  let result = await axios.post("/ccread-book/book/home/getNovelListByHome",
  {
    limitNub:listOrdTime.limitNub,
    orderType:listOrdTime.orderType
  })
  novelListInfo2.value = result.data.data
  console.log(novelListInfo2.value)
}


const toDetileBook = (novel) =>{
  router.push({
    path:"/detilePage",
    query:{
      id:novel.id
    }
  })
}

const toOrderBook = (typeNub) => {
  router.push({
    path:"/orderBook",
    query:{
      type:typeNub
    }
  })
}

const toInputNovel = () => {
  router.push({
    path:"/inputNovel",
    query:{
      val:inputVal.value
    }
  })
}

// router.beforeEach((to,from,next) => {
//      console.log("1)"+to.path)
// })

</script>
<style scoped>
.homeComment{
  width: 90%;
  margin-left: 5%;
  padding-bottom: 40px;
}
.carousel-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 10px;
}
.ranking-but{
  margin-top: 30px;
  left: 0;
  right: 0;
  padding-left: 70px;
  padding-right: 70px;
  display: flex;
  justify-content: space-between;
}
.ranking-but .n-button{
    width: 50px;
    height: 50px;
    border-radius: 30px;
}
.ranking-but .n-icon{
    margin-left: -1px;
    margin-top: 3px;
}
.ranking-but span{
    /* margin-top: 10px; */
    margin-left: 8px;
    font-size: 15px;
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