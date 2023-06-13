<template>
    <!-- 返回 -->
    <div class="toBack">
        <span @click="getGoBack()">
            <n-icon :component="ArrowBack" size="25" color="#000" :depth="1" />
        </span>
    </div>
    <div class="commentMain">
        <div  style="width: 50%;margin-left: 30%;">
            <n-rate  v-model:value="commentInfo.score" @click="getScore()"/>
            <!-- 非常差，很差，一般，很好，非常好 -->
            <br/>
            <span style="margin-left: 25%;color: #838383;">{{commentInfo.scoreInfo}}</span>
        </div>
        <div style="margin-top: 15px;">
            <n-input
            v-model:value="commentInfo.comment"
            type="textarea"
            placeholder="基本的 Textarea"
            style="height: 300px;"
            />
        </div>
        <div style="margin-top: 15%;">
            <n-button type="warning" style="color: #ffffff;width: 80%;margin-left: 10%;" @click="createComment()">
                发布
            </n-button>
        </div>
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

const commentInfo = reactive({
    comment:"",
    score:5,
    scoreInfo:"非常好"
})

const getScore = () => {
    if(commentInfo.score == 1){
        commentInfo.scoreInfo = "非常差"
    }else if(commentInfo.score == 2){
        commentInfo.scoreInfo = "很差"
    }else if(commentInfo.score == 3){
        commentInfo.scoreInfo = "一般"
    }else if(commentInfo.score == 4){
        commentInfo.scoreInfo = "很好"
    }else{
        commentInfo.scoreInfo = "非常好"
    }
}

const createComment = async () => {
    dialog.warning({
        title: '提示',
        content: '是否确认发布',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            let res = await axios.post("/ccread-comment/comment/userAddComment",{
                comment:commentInfo.comment,
                score:commentInfo.score,
                novelId:route.query.id
            })
            if(res.data.code == "000000"){
                message.success("评论成功！")
                router.back(1)
            }else{
                message.error(res.data.msg)
            }
        },
        onNegativeClick: () => { }
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
    padding-left: 10px;
    align-items: center;
}
.commentMain{
    padding-top: 80px;
    padding-left: 5%;
    padding-right: 5%;

}
</style>