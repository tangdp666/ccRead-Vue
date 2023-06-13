<template>
    <router-view></router-view>
    <div class="navigation">
    <div @click="goHome(1)">
        <n-icon :component="HomeOutline" size="25" :depth="1" />
    </div>
    <div @click="goClassify(2)">
        <n-icon :component="ReorderFourOutline" size="25"  :depth="1" />
    </div>
    <div @click="goBookrack(3)">
        <n-icon :component="FileTrayStackedOutline" size="25"  :depth="1" />
    </div>
    <div @click="goMyInfo(4)">
        <n-icon :component="PersonOutline" size="25"  :depth="1" />
    </div>
  </div>
</template>
<script setup>
import { PersonOutline, FileTrayStackedOutline,HomeOutline,ReorderFourOutline } from '@vicons/ionicons5'
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';


const router = useRouter()
const selectedIndex = ref(1)

const goHome = (index) =>{
    selectedIndex.value = index
    router.push("/index/home")
}

const goClassify = (index) =>{
    selectedIndex.value = index
    router.push("/index/classify")
}

const goBookrack = (index) =>{
    selectedIndex.value = index
    router.push("/index/bookrack")
}

const goMyInfo = (index) =>{
    selectedIndex.value = index
    router.push("/index/myInfo")
}

// router.beforeEach((to,from,next) => {
//      console.log("1)"+to.path)
// })



</script>
<style scoped>
    .navigation {
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
</style>