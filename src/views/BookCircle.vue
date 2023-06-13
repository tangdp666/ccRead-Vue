<template>
  <!-- 返回 -->
  <div class="toBack">
    <span @click="getGoBack()">
      <n-icon :component="ArrowBack" size="25" color="#000" :depth="1" />
    </span>
  </div>
  <div class="bookCircleMian" :style="{ backgroundImage: `url(${novelInfo.cover})`}">
    <div style="width: 100%;backdrop-filter: blur(5px);padding-top: 60px;">
<!-- 书籍信息 -->
<div class="detileTitle" >
      <div class="detileImg">
        <img :src="novelInfo.cover" />
      </div>
      <div class="detileInfo">
        <span style="font-size: 20px; font-weight: bold">{{ novelInfo.novelName }}</span>
        <span style="font-size: 14px; margin-top: 10px">{{ novelInfo.auther }}</span>
        <span style="font-size: 14px; margin-top: 15px; color: #939393"
          >发言 {{ novelInfo.commentCount }}</span
        >
      </div>
    </div>
    <!-- 书评 -->
    <div class="bookCircleList">
      <span style="font-size: 20px">书评</span>
      <n-list v-show="showFlag">
        <n-list-item v-for="(item, index) in commentInfoList" :key="index">
          <!-- 信息 -->
          <div class="userInfo">
            <n-avatar
              round
              :size="40"
              src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              style="margin-right: 10px"
            />
            <span style="margin-right: 10px; font-size: 16px; color: #717171"
              >{{ item.nickname }}</span
            >
          </div>
          <!-- 书评 -->
          <div class="bookCircleInfo">
            <div>
              <n-rate size="small" allow-half readonly :default-value="item.score" />
            </div>
          </div>
          <div style="margin-top: 5px">
            <span style="font-size: 15px; line-height: 1.5">
              {{ item.comment }}
            </span>
            <br />
            <span
              style="
                margin-top: 5px;
                font-size: 13px;
                color: #8a8a8a;
                float: right;
                margin-right: 5px;
              "
              >{{item.createTime}}</span
            >
          </div>
        </n-list-item>
      </n-list>
      <n-result style="margin-top: 50px;margin-bottom: 300px;" v-show="!showFlag" status="418" title="当前暂无书评" description="请前往发表书评">
      </n-result>
    </div>
    
    </div>
    <div  style="position: fixed; bottom: 20px; right: 20px;z-index: 9999;">
      <n-button @click="toComment(novelInfo.id)" type="warning"  style="border-radius: 90px;width:60px ;height: 60px;">
        <n-icon :component="Brush" size="25" color="#fff" :depth="1" />
      </n-button>
    </div>
  </div>
</template>
<script setup>
import { ArrowBack,Brush } from "@vicons/ionicons5";
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import {UserStore} from "../stores/UserStore"

const router = useRouter()
const route = useRoute()



const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")

const userStore = UserStore();

const novelInfo = ref({
    id:route.query.id,
    cover:route.query.cover,
    novelName:route.query.novelName,
    auther:route.query.auther,
    commentCount:route.query.commentCount,
})

onMounted(() => {
  getCommentList()
})
const commentInfoList = ref([])

const showFlag = ref(false)

const getCommentList = async () =>{
  let res = await axios.get(`/ccread-comment/comment/book/getCommentList/${route.query.id}`)
  console.log(res)
  if(res.data.data != 0){
    showFlag.value = true
  }

  let bolg_res = res.data.data;
    // 处理获取的文章列表数据
    for (let row of bolg_res) {
        row.content += "..."
        // 把时间戳转换为年月日
        let d = new Date(row.createTime)
        row.createTime = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
    commentInfoList.value = bolg_res;
}




const toComment = (novelId) => {
    router.push({
      path:"/comment",
      query:{
        id:novelId
      }
    })
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
  width: calc(100% - 20px);
  display: flex;
  padding-left: 20px;
  align-items: center;
}
.bookCircleMian {
  /* margin-top: 80px; */
  /* margin-top: 50px; */

  display: flex;
  flex-direction: column;
  position: relative;
}
.detileTitle {
  height: 170px;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 30px;
  margin-top: 20px;
  margin-left: 5%;
  margin-right: 5%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
}
.detileImg {
  width: 32%;
  height: 150px;
  float: left;
}
.detileImg img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.detileInfo {
  float: left;
  margin-left: 10px;
  padding-top: 15px;
}
.detileInfo span {
  display: block;
  width: 100%;
}
.bookCircleList {
  padding-left: 5%;
  padding-right: 5%;
  background-color: rgb(255, 255, 255);
  padding-top: 90px;
  padding-bottom: 30px;
  margin-top: -80px;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgb(212, 212, 212);
}
.userInfo {
  position: relative;
  display: flex;
  align-items: center;
}
.bookCircleInfo {
  margin-top: 10px;
}
</style>
