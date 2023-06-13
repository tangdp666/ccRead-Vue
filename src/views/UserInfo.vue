<template>
    <!-- 返回 -->
    <div class="toBack">
        <span @click="getGoBack()">
            <n-icon :component="ArrowBack" size="25" color="#000" :depth="1" />
        </span>
    </div>
    <div class="userInfoMian">
        <n-card>
                <div style="display: flex; justify-content: center;">
                    <n-avatar
                round
                :size="60"
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
                </div>
            <n-list>
                <!-- 昵称 -->
                <n-list-item>
                    <n-form-item label="昵称" path="userInfo.nikename">
                        <n-input v-model:value="userInfo.nickname" placeholder="输入昵称" />
                    </n-form-item>
                </n-list-item>
                <!-- 性别 -->
                <!-- <n-list-item>
                    <n-form-item label="性别" path="userInfo.gender">
                        <n-input v-model:value="userInfo.gender" placeholder="userInfo.gender" />
                    </n-form-item>
                </n-list-item> -->
                <!-- <n-list-item>
                    <span>性别：</span>
                    <n-space vertical>
                        <n-select  v-model:value="selectedSex" :options="SexOptions"  />
                    </n-space>
                </n-list-item> -->
            </n-list>
        </n-card>

        <div style="display: flex; justify-content: center;margin-top: 30px;">
            <n-button type="warning" style="width: 80%;" @click="updateInfo()">修改信息</n-button>
        </div>
    </div>
</template>
<script setup>
import { ArrowBack } from '@vicons/ionicons5'
import { SadOutline } from '@vicons/ionicons5';
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { UserStore } from '../stores/UserStore';



const router = useRouter()
const route = useRoute()
const userStore = UserStore();

const axios = inject("axios")
const message = inject("message")

const dialog = inject("dialog")

const userInfo = reactive({
    nickname:""
})

const SexOptions = reactive([
    {
        label:"男",
        value:"0"
    },{
        label:"女",
        value:"1"
    }
])

const selectedSex = ref()

onMounted(() => {
    getUserInfo()
})

const getUserInfo = async () => {
    let result = await axios.get(`ccread-admin/api/v1/users/getUserInfo`)
    console.log(result)
    let indo_res = result.data.data
    userInfo.nickname = result.data.data.nickname
    selectedSex.value = indo_res.gender
     
}

const updateInfo = async () => {
    dialog.warning({
        title: '提示',
        content: '是否确认修改',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            let res = await axios.put("/ccread-admin/api/v1/users/updateUserInfo",{
                nickname:userInfo.nickname,
                gender:selectedSex.value
            })
            if(res.data.code == 200){
                message.success("修改成功！"
                )
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
.userInfoMian{
    margin-top: 70px;
    margin-left: 5%;
    margin-right: 5%;
    
}
.userInfoMian .n-card{
    border-radius: 10px;
}
</style>