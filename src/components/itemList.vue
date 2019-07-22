<template>
    <ul class="itemList">
        <li v-for="(item,index) in responsedata.goods"><span>{{item.name}}</span></li>
    </ul>
</template>

<script>
    export default {
        name: 'itemList',
        components: {

        },
        props:['responsedata'],
    }
</script>

<style>
    .itemList li{
        list-style: none;
        width: auto;
        height: 55px;
    }
    .itemList li span{
        width: 70px;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        margin-left: auto;
        margin-right: auto;
        border-top: 1px solid #d2d2d2;
    }
    .itemList li:hover{
        background-color: white;
    }
    .itemList{
        width: 90px;
        height: 550px;
        background-color: #f5f6f8;
        position: fixed;
        z-index: 1;
        top: 170px;


    }
</style>