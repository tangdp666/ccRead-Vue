<template>
  <!-- 返回 -->
  <div class="toBack">
    <span @click="getGoBack()">
      <n-icon :component="ArrowBack" size="25" color="#000" :depth="1" />
    </span>
  </div>
  <div class="shoppingMain">
    <span style="font-size: 20px;margin-left: 5%;">购物车</span>
    <n-list>
      <n-list-item>
        <n-card>
          <div class="detileTitle">
            <div class="detileImg">
              <img src="..\\assets\\img\\book5.png" />
            </div>
            <div class="detileInfo">
              <span style="font-size: 20px;">暗格里的秘密</span>
              <span style="font-size: 14px; margin-top: 5px">耳东兔子</span>
              <span style="font-size: 17px;margin-top: 15px;font-weight: bold;">30 币</span>
              
            </div>
          </div>
        </n-card>
      </n-list-item>
      <n-list-item>
        <n-card>
          <div class="detileTitle">
            <div class="detileImg">
              <img src="..\\assets\\img\\book5.png" />
            </div>
            <div class="detileInfo">
              <span style="font-size: 20px;">暗格里的秘密</span>
              <span style="font-size: 14px; margin-top: 5px">耳东兔子</span>
              <span style="font-size: 17px;margin-top: 15px;font-weight: bold;">30 币</span>
              
            </div>
          </div>
        </n-card>
      </n-list-item>
      <n-list-item>
        <n-card>
          <div class="detileTitle">
            <div class="detileImg">
              <img src="..\\assets\\img\\book5.png" />
            </div>
            <div class="detileInfo">
              <span style="font-size: 20px;">暗格里的秘密</span>
              <span style="font-size: 14px; margin-top: 5px">耳东兔子</span>
              <span style="font-size: 17px;margin-top: 15px;font-weight: bold;">30 币</span>
              
            </div>
          </div>
        </n-card>
      </n-list-item>
    </n-list>
  </div>
</template>
<script setup>
import { ArrowBack } from "@vicons/ionicons5";


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
.shoppingMain{
    background-color: rgb(255, 255, 255);
}
.detileTitle{
    height: 140px;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 30px;
    margin-top: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    position: relative; 
    z-index: 2;
}
.detileImg{
    width: 25%;
    height: 110px;
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
}
.detileInfo span {
  display: block;
  width: 100%;
}
.shoppingMain{
    padding-top: 80px;
}
</style>
