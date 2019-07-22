<template>
    <div class="footers">
        <div class="buyCar"><span class="num">1</span></div>
        <div class="sumMoney">￥<span>9</span>元</div>
        <span class="heightline"></span>
        <div class="bringMoney">另需配送费<span>4</span>元</div>
        <div class="buyTxt">还差<span>11</span>元起送</div>
    </div>
</template>

<script>



    export default {
        name: 'footers',
        components: {

        }
    }
</script>

<style>
    .footers{
        width: 100%;
        height: 50px;
        background-color: #141d26;
        bottom: 0;
        position: fixed;
        z-index: 10;
    }
    .buyCar{
        background-color: dodgerblue;
        width: 50px;
        height: 50px;
        position: absolute;
        left: 15px;
        top: -15px;
        border: 6px solid #141d26;
        border-radius: 30px;
    }
    .num{
        width: 20px;
        height: 15px;
        background-color: red;
        position: absolute;
        left: 34px;
        top: 3px;
        border: 1px solid red;
        border-radius: 10px;
        color: white;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
    }
    .sumMoney{
        width: 70px;
        height: 50px;
        position: absolute;
        left: 70px;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
    .bringMoney{
        width: 9em;
        height: 50px;
        position: absolute;
        background-color: #141d26;
        font-size: 10px;
        font-weight: bold;
        color: dimgray;
        left: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .heightline{
        height: 30px;
        width: 0px;
        border: 0.5px solid #858c92;
        position: absolute;
        left: 150px;
        top: 10px;
    }
    .buyTxt{
        height: 50px;
        width: 9em;
        position: absolute;
        background-color: #2c353e;
        color: #858c92;
        right: 0;
        font-size: 10px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
    }


</style>