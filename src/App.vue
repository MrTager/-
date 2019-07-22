<template>
  <div id="app">
    <headers :responsedata="responseData" :sellerdata="sellerData"></headers>
    <ul id="nav">
      <li @click="jump('1')">商品</li>
      <li @click="jump('2')">评论</li>
      <li @click="jump('3')">商家</li>
    </ul>
    <div id="center">
    <router-view :responsedata="responseData"></router-view>
    </div>
  </div>
</template>

<script>
  import headers from './components/header'
  import footers from './components/footer'
  import {getTest} from '.././service/testApi'
  export default {
      name: 'app',
      components: {
          headers,
      },
      data(){
          return{
              responseData:'',
              sellerData:{

                  supports:[
                      {description:''}
                  ],
                  avatar:''
              }

          }

      },
      methods:{
          jump(val){
              switch (val){
                  case '1':
                      this.$router.push({path:'/Home'});
                      break;
                  case '2':
                      this.$router.push({path:'/About'});
                      break;
                  case '3':
                      this.$router.push({path:'/shop'});
                      break;
              }
          },


      },
      created(){
          var _this=this;
          getTest('/').then(function (response) {
           _this.responseData=response.data
              _this.sellerData=response.data.seller

       })
      },




  }
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

  #nav{
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: fixed;
    z-index: 10;
    top: 130px;
    width: 100%;
    background-color: white;
  }
  #nav li{
    width: 33%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    list-style: none;
    font-size: 18px;

  }
  #nav li:hover{
    background-color: dodgerblue;
    color: white;
    font-size: 18px;
    font-weight: bold;
  }

  #center{
    width: auto;
    height: auto;
  }
</style>

