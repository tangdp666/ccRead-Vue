<template>
  <!-- 返回 -->
  <div class="toBack">
    <span @click="getGoBack()">
      <n-icon :component="ArrowBack" size="25" color="#000" :depth="1" />
    </span>
  </div>
  <div style="background-color: rgb(255, 255, 255);">
    <div class="commentMain">
      <span style="font-size: 20px">我的书评</span>
      <n-list>
        <n-list-item v-for="(item, index) in userCommentList" :key="index">
          <!-- 评分 -->
          <div>
            <n-rate size="small" allow-half readonly :default-value="item.score" />
          </div>
          <!-- 书评 -->
          <div>
            <span style="font-size: 15px">
              {{ item.comment }}
            </span>
          </div>
          <!-- 书信息 -->
          <div class="detileTitle">
            <div class="detileImg">
              <img :src="item.cover" />
            </div>
            <div class="detileInfo">
              <span style="font-size: 16px; font-weight: bold"
                >{{ item.novelName }}</span
              >
              <span style="font-size: 13px; margin-top: 10px">{{ item.author }}</span>
            </div>
          </div>
          <div style="margin-top: 10px">
            <span style="font-size: 13px; color: rgb(175, 175, 175)"
              >{{ item.createTime  }}</span
            >
          </div>
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>
<script setup>
import { ArrowBack } from "@vicons/ionicons5";

import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { UserStore } from '../stores/UserStore';



const router = useRouter()
const route = useRoute()
const userStore = UserStore();

const axios = inject("axios")
const message = inject("message")

const dialog = inject("dialog")

const userCommentList = ref([])

onMounted(() => {
  getUserComment()
})

const getUserComment = async () => {
    let res = await axios.get("/ccread-comment/comment/getUserComment")
    console.log(res)
    let bolg_res = res.data.data;
    // 处理获取的文章列表数据
    for (let row of bolg_res) {
        row.content += "..."
        // 把时间戳转换为年月日
        let d = new Date(row.createTime)
        row.createTime = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
    userCommentList.value = bolg_res
}

const getGoBack = () => {
    router.back(1)
}

</script>
<style scoped>
.toBack {
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
.commentMain {
  /* margin-top: 80px; */
  padding-top: 80px;
  width: 90%;
  margin-left: 5%;
padding-bottom: 30px;
}
.detileTitle {
  height: 110px;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 10px;
  margin-top: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
}
.detileImg {
  width: 20%;
  height: 100px;
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
</style>
