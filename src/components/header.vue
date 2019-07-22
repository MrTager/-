<template>
    <div class="headers" :style="{background:'url(' + sellerdata.avatar+ ')'}">
    <!---->
        <div class="headersModal">
        <img :src="sellerdata.avatar" alt="">
            <span class="bigname">{{sellerdata.name}}</span>
            <span class="sendType"><span>{{sellerdata.description}}</span>/<span>{{sellerdata.deliveryTime}}</span>分钟到达</span>
            <span class="specialOffer">在线支付满28减5</span>
            <span class="howmany">5个></span>
            <span class="foodinfoTxt"><span>{{sellerdata.bulletin}}</span></span>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'headers',
        components: {

        },
        methods:{

        },
        props:['responsedata','sellerdata'],
    }
</script>

<style>
    .headers{
        width: 100%;
        height: 130px;
        background-color:gray;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        background-size: 100% 130px;
    }
    .headersModal{
        width: 100%;
        height: 130px;
        background-color: rgba(0,0,0,0.7);
    }
    .headers img{
        width: 80px;
        height: 80px;
        position: absolute;
        left: 30px;
        top: 20px;
        background-color: white;
    }
    .bigname{
        width: 200px;
        height: 20px;
        font-size: 17px;
        font-weight: bold;
        color: white;
        position: absolute;
        left: 125px;
        top: 20px;
    }
    .sendType{
        width: 150px;
        height: 20px;
        font-size: 14px;
        color: white;
        position: absolute;
        left: 125px;
        top: 40px;
    }
    .specialOffer{
        width: 150px;
        height: 20px;
        font-size: 14px;
        color: white;
        position: absolute;
        left: 125px;
        top: 60px;
    }
    .howmany{
        width: 40px;
        height: 20px;
        font-size: 12px;
        color: white;
        position: absolute;
        background-color: rgba(0,0,0,0.7);
        border: 0.5px solid rgba(0,0,0,0.7);
        border-radius: 10px;
        text-align: center;
        line-height: 20px;
        right: 10px;
        bottom: 30px;
    }
    .foodinfoTxt{
        width: 100%;
        height: 20px;
        font-size: 12px;
        color: white;
        position: absolute;
        background-color: rgba(0,0,0,0.7);
        line-height: 20px;
        bottom: 0;
        overflow: hidden;

    }
   /* .foodinfoTxt span{
        width: 300px;
        height: 20px;
        overflow: hidden;
    }*/

</style>