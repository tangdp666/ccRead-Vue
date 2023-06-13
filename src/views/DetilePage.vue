<template>
    <!-- 返回 -->
    <div class="toBack">
        <span @click="getGoBack()">
            <n-icon :component="ArrowBack" size="25" color="#000" :depth="1" />
        </span>
    </div>
    <div class="detilePage">
        <!-- 书籍头部 -->
        <div class="detileTitle" :style="{ backgroundImage: `url(${novelInfo.cover})`}">
            <div style="width: 100%;height: 170px;backdrop-filter:  blur(5px);padding-top: 30px;">
                <div class="detileImg">
                <img  :src="novelInfo.cover">
            </div>
            <div class="detileInfo">
                <span style="font-size: 20px;font-weight: bold;">{{ novelInfo.novelName }}</span>
                <span style="font-size: 14px;margin-top: 10px;">{{ novelInfo.author }}</span>
                <span style="font-size: 14px;margin-top: 5px;color: #939393;">2022-01-01</span>
                <span style="font-size: 14px;margin-top: 15px;" v-if="novelInfo.price != null" >{{ novelInfo.price }} 金币</span>
                <span style="font-size: 14px;margin-top: 15px;" v-else >免费</span>
            </div>
            </div>
            
        </div>
        <!-- 书籍下部 -->
        <div>
            <!-- 评分 -->
            <div class="container">
                <div class="starNumber">
                    <span >
                        <n-icon :component="Star" size="20" color="#ffbb00" :depth="1" />
                    </span>
                    <span style="font-size: 18px;" v-if="novelInfo.score > 0">{{ novelInfo.score }} 分</span>
                    <span style="font-size: 18px;" v-else>暂无评分</span>
                </div>
                <div class="viewNumber">
                    <span >
                        <n-icon :component="EyeOutline" size="20" color="#848484" :depth="1" />
                    </span>
                    <span style="font-size: 18px;">{{ novelInfo.viewCount }} 次观看</span>
                </div>
            </div>
            <!-- 简介 -->
            <div class="introMian">
                <span style="font-size: 18px;">简介</span>
                <p style="font-size: 15px;color: #b5b5b5;">{{ novelInfo.intro }}</p>
            </div>
            <!-- 目录 -->
            <div class="catalog" @click="toCatalog(novelInfo)">
                <span style="font-size: 18px;">目录</span>
                <span style="float: right;font-size: 20px;color: #b5b5b5;">></span>
                <br/>
                <span style="font-size: 14px;color: #b5b5b5;">共 {{ novelInfo.catalogCount }} 章</span>
                
            </div>
            <!-- 书圈 -->
            <div class="bookCircle">
                <span style="font-size: 18px;">书圈 &middot;</span>
                <span style="font-size: 14px;color: #b5b5b5;" v-if="novelInfo.commentCount > 0">{{ novelInfo.commentCount }} 条发言</span>
                <span @click="toBookCircle(novelInfo)" style="float: right;font-size: 16px;color: #ffbb00;margin-top: 5px;">前往书圈</span>
            </div>
        </div>
    </div>
    <!-- 底部 -->
    <div class="bookBuyNav">
        <div style="width: 100%;line-height: 1;">
            <div >
                <n-button v-if="novelInfo.price > 0 && !pirchaseFalg" type="error" round style="margin-left: 25px;font-size: 20px;width: 80%;height: 50px;" @click="activate('bottom')" >购买</n-button>
                <n-button v-else @click="toChapter(novelInfo,1)" type="warning" round style="margin-left: 25px;font-size: 20px;width: 80%;height: 50px;" >立即阅读</n-button>
                <!-- <n-button text style="float: right;margin-top: 10px;"><n-icon :component="BagAddOutline" size="30" color="#000" :depth="1" /></n-button> -->
                <div v-if="componentVal" style="display: flex; flex-direction: column;float: right;margin-top: 10px;">
                    <n-icon :component="Star" size="30" color="#ffbb00" :depth="1" @click="changeComponentA()" />
                    <span style="font-size: 13px;">取消</span>
                </div>
                <div v-else style="display: flex; flex-direction: column;float: right;margin-top: 10px;">
                    <n-icon :component="StarOutline" size="30" color="#ffbb00" :depth="1" @click="changeComponentB()" />
                    <span style="font-size: 13px;">收藏</span>
                </div>
            </div>
            
        </div>
    </div>
    <n-drawer v-model:show="active" :default-width="502" :placement="placement" :default-height="500">
    <n-drawer-content closable>
        <div style="position: relative;
            display: flex;
            justify-content: center;
            align-items: center; margin-left: calc(50% - 50px);width: 100px;">
        <span style="font-size: 28px;">购买</span>
      </div>
      <div class="detileTitle2">
            <div class="detileImg2">
                <img :src="novelInfo.cover" >
            </div>
            <div class="detileInfo2">
                <span style="font-size: 17px;">{{ novelInfo.novelName }}</span>
                <span style="font-size: 10px;margin-top: 10px;color: #adadad;">{{ novelInfo.author }}</span>
            </div>
        </div>
        <div style="position: relative;
            display: flex;
            justify-content: center;
            align-items: center;font-size: 25px;font-weight: bold;color: #ffcd28;margin-top: 50px; margin-left: calc(50% - 50px);width: 100px;">
            <span> {{ novelInfo.price }}金币</span>
        </div>
        
        <div style="width: 80%;margin-left: 10%;margin-top: 90px;">
            <n-button @click="buyNovel(novelInfo)" style="width: 100%;border-radius: 45px;height: 50px;font-size: 20px;" type="warning">
                确认支付
            </n-button>
        </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import { ArrowBack,EyeOutline,Star,BagAddOutline,StarOutline } from '@vicons/ionicons5'
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import {UserStore} from "../stores/UserStore"

const router = useRouter()
const route = useRoute()



const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")

const userStore = UserStore();

const novelInfo = ref({})
const pirchaseFalg = ref()

onMounted(() => {
    getDetileInfo(),
    getPirchaseFalg(),
    getComponentFalg()
})

const getDetileInfo = async () => {
    let result = await axios.get(`/ccread-book/book/home/getDetileNovel/${route.query.id}`)
    novelInfo.value = result.data.data
}





const active = ref(false);
const placement =ref("right")
const activate = (place) => {
    active.value = true;
    placement.value = place;
}


const toChapter = async (novel,pageNub) => {
    let res = await axios.put(`/ccread-book/book/home/updataViewCount/${novel.id}`)
    router.push({
        path:"/chapter",
        query:{
            novelId:novel.id,
            novelName:novel.novelName,
            pageNub:pageNub
        }
    })
}
const toCatalog = (novel) =>{
    console.log(pirchaseFalg.value)
    console.log()
    if(pirchaseFalg.value == false && novelInfo.value.price > 0){
        message.error("未购买书籍")
    }else{
        router.push({
        path:"/catalog",
        query:{
            id:novel.id,
            novelName:novel.novelName
        }
    })
    }
    
}
const toBookCircle = (novelInfo) =>{
    router.push({
        path:"/bookCircle",
        query:{
            id:novelInfo.id,
            novelName:novelInfo.novelName,
            cover:novelInfo.cover,
            auther:novelInfo.author,
            commentCount:novelInfo.commentCount
        }
    })
}

const getPirchaseFalg = async () => {
    let res = await axios.get(`/ccread-bookeack/bookeack/getPirchaseFalg/${route.query.id}`)
    let res2 = await axios.get("/ccread-order/order/getVipStatusByRead")
    if(res.data.data == false && res2.data.data == false){
        pirchaseFalg.value = false
        // console.log("都错误")
    }else{
        pirchaseFalg.value = true
    }
    


    console.log("1)"+res.data.data)
    console.log("2)"+res2.data.data)
    console.log("3)"+pirchaseFalg.value)
     
}

const buyNovel = async (novel) => {
    let res = await axios.post("/ccread-order/order/createOrder",null,{
        params:{
        novelId:route.query.id
    }
    })
    console.log(res)
    if(res.data.code == "000000"){
        location.reload();
        message.success("购买成功！")
    }else{
        console.log(res.data.msg)
        message.error(res.data.msg)
    }
}



const componentVal = ref()


const getComponentFalg = async () =>{
    let res = await axios.get(`/ccread-bookeack/bookeack/getCollectionFalg/${route.query.id}`)
    console.log(res.data.data)
    componentVal.value = res.data.data
}


const changeComponentA = async () => {
    let res = await axios.put(`/ccread-bookeack/bookeack/upCollection/${route.query.id}`)
    if(res.data.code == "000000"){
        componentVal.value = false;
    }else{
        message.error("取消失败")
    }
    
}

const changeComponentB = async () => {
    let res = await axios.post(`/ccread-bookeack/bookeack/addCollection/${route.query.id}`)
    if(res.data.code == "000000"){
        componentVal.value = true;
    }else{
        message.error("收藏失败")
    }
}



const getVipStatusByRead = async() => {
    

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
    width: 100%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
}
.toBack span{
    margin-left: 15px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
}
.detileTitle{
    height: 200px;
    padding-left: 5%;
    padding-right: 5%;
    /* margin-top: 50px; */
    background-size: cover;
    background-position: center;

}
.detileImg{
    width: 30%;
    height: 150px;
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
    padding-top: 15px;
}
.detileInfo span {
  display: block;
  width: 100%;
}
.container{
  padding-top: 20px;
  display: flex;
  align-items: center;
  
}
.starNumber{
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.viewNumber{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}
.viewNumber span:first-child, .starNumber span:first-child {
  margin-right: 10px;
}
.introMian{
    width: 90%;
    margin-left: 5%;
    margin-top: 14px;
}
.catalog{
    width: 90%;
    margin-left: 5%;
    margin-top: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
}
.bookCircle{
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
}
.bookBuyNav{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 15px;
    padding-top: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,.2);
    background-color: rgb(255, 255, 255);
}


.detileTitle2{
    background-color: rgb(255, 255, 255);
    height: 110px;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 阴影样式 */
    border-radius: 10px;
}   
.detileImg2{
    width: 20%;
    height: 100px;
    float: left;
}
.detileImg2 img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
.detileInfo2{
    float: left;
    margin-left: 10px;
    padding-top: 15px;
}
.detileInfo2 span {
  display: block;
  width: 100%;
}

</style>