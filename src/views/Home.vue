<template>
  <div class="home">


    <div class="list" ref="left">
      <ul class="itemList">
        <li v-for="(items,indexss) in responsedata.goods" @click="listClick(indexss)" :key="indexss" :class="{'backgroundWhite':indexss==searchCount}"><span>{{items.name}}</span></li>
      </ul>
    </div>



    <div class="fooditem" ref="right" v-if="responsedata" v-for="(item,index) in responsedata.goods">
      <span class="topTxt">{{item.name}}</span>
      <ul class="foodBox">
        <li class="foodlist" ref="rightitem"  v-for="(imgitem,indexs) in item.foods" :key="indexs" >
          <img :src="imgitem.image" alt="">
          <span class="foodsName">{{imgitem.name}}</span>
          <span class="foodinfo">{{imgitem.description}}</span>
          <span class="monthcell">月售<span>{{imgitem.sellCount}}</span>份</span>
          <span class="favorable">好评率<span>{{imgitem.rating}}</span>%</span>
          <span class="newPrice">￥<span>{{imgitem.price}}</span></span>
          <span class="oldPrice"><del>￥<span>{{imgitem.oldPrice}}</span></del></span>

          <span class="subtractnum" v-show="thedata[index][indexs].num!=0" @click="subtract(index,indexs)">-</span>
          <span class="numvalue"  v-show="thedata[index][indexs].num!=0" >{{thedata[index][indexs].num}}</span>
          <span class="addnum" @click="addfunc(index,indexs,imgitem)">+</span>

        </li>
      </ul>
    </div>
    <div >
      <span class="topTxt"></span>
      <img src="" alt="">
    </div>


      <div class="listView" v-show="false">
          <ul v-for="(payitem,patindex) in thebuyCarList">
              <li class="listViewLi" >
                  <span class="payitemName">{{payitem.name}}</span>
                  <span class="payitemPrice">￥{{payitem.price}}</span>
                  <span class="payitemNum">{{payitem.number}}</span>
              </li>
          </ul>

      </div>

      <div class="footers">
          <div class="buyCar"><span class="num" v-show="allnumer!=0">{{allnumer}}</span></div>
          <div class="sumMoney">￥<span>{{allprice}}</span>元</div>
          <span class="heightline"></span>
          <div class="bringMoney">另需配送费<span>0</span>元</div>
          <div class="buyTxt">还差<span>{{startSendPrice}}</span>元起送</div>
          <div class="submit" v-if="startSendPrice==0">去支付</div>
      </div>

  </div>
</template>

<script>

    export default {
  name: 'home',
    data(){
      return{
          subtractStute:false,
          foodNumber:0,
          searchBarFixed:false,
          searchCount:0,//滚动时对应的list的index
          scrollY:0,//获取实时滚动的位置
          heightList:[],//获取每个里的高度
          thedata:[],//订单的二维数组
          theFoodAddArry:[],
          foodNumArr:[],
          allnumer:0,
          allprice:0,
          startSendPrice:50,
          thebuyCarList:[],


      }
    },
        props:['responsedata'],
        mounted () {
            window.addEventListener('scroll', this.handleScroll);

        },
        beforeDestroy() {
            window.removeEventListener("scroll",this.handleScroll)

        },
        created(){

            for(var i = 0;i < this.responsedata.goods.length; i++){
                var arr=[];//9
                for(var j=0;j<this.responsedata.goods[i].foods.length;j++){
                    arr.push({num:0,price:0,name:''})
                }
                this.thedata.push(arr)
            }



        },
        computed:{

        },
    methods:{

        allnumCount(){
            this.allnumer=0;
            this.allprice=0;
            for(var i=0;i<this.thedata.length;i++){
                for(var j=0;j<this.thedata[i].length;j++){
                    if(this.thedata[i][j].num>0){
                        this.allprice+=this.thedata[i][j].num*this.thedata[i][j].price;
                        this.allnumer+=this.thedata[i][j].num
                    }
                }
            }
            this.startSendPrice=50-this.allprice;
            if(this.startSendPrice<=0){
                this.startSendPrice=0
            }

        },
        addfunc(index,indexs,imgitem){
            this.thedata[index][indexs].num+=1;
            this.thedata[index][indexs].price=imgitem.price;
            this.thedata[index][indexs].name=imgitem.name;
            this.allnumCount();
            var sumprice= this.thedata[index][indexs].price*this.thedata[index][indexs].num
            var newobj={name:imgitem.name,price:sumprice,number:this.thedata[index][indexs].num}


            var count=0;
            for(var i=0;i<this.thebuyCarList.length;i++){
                if(this.thebuyCarList[i].name==newobj.name){
                    count=1;
                    this.thebuyCarList[i]=newobj
                }
            }
            if(count==0){
                this.thebuyCarList.push(newobj)
            }
            console.log(this.thebuyCarList)

        },
        subtract(index,indexs){

            if(this.thedata[index][indexs].num==0){
                this.thedata[index][indexs].num==1;
            }else {
                this.thedata[index][indexs].num-=1;
            }
            this.allnumCount()
          /*  var sumprice= this.thedata[index][indexs].price*this.thedata[index][indexs].num
            var newobj={name:imgitem.name,price:sumprice,number:this.thedata[index][indexs].num}


            var count=0;
            for(var i=0;i<this.thebuyCarList.length;i++){
                if(this.thebuyCarList[i].name==newobj.name){
                    count=1;
                    this.thebuyCarList[i]=newobj
                }
            }
            if(count==0){
                this.thebuyCarList.push(newobj)
            }*/
        },
         handleScroll () {
             this.scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
             this.topushHeight();
             this.toCompare();
         },

        topushHeight(){
            this.heightList=[];
            for(var i=0;i<this.responsedata.goods.length;i++){
                this.heightList.push(this.$refs.right[i].offsetTop)
            }

        },
        toCompare(){
            var arr=[];
             for(var j=0;j<this.heightList.length;j++){
                 if(this.heightList[j]<=this.scrollY){
                    arr.push(j)
                 }
             }

            var maxindex=arr.indexOf(Math.max.apply(Math, arr));
            this.searchCount=maxindex;
        },
        listClick(e){
            var a=e;
            this.heightList=[];
            for(var i=0;i<this.responsedata.goods.length;i++){
                this.heightList.push(this.$refs.right[i].offsetTop)
            }
            document.documentElement.scrollTop=this.heightList[a];
            this.searchCount=e;
        },


    },


    components: {


    },


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
  /*.itemList li:hover{
    background-color: white;
  }*/
  .backgroundWhite{
    background-color: white;
  }
  .backgroundnone{

  }
  .itemList{
    width: 90px;
    height: 550px;
    background-color: #e8e8e8;
    /*position:fixed;*/
    z-index: 1;
    top: 170px;
    left: 0px;
    overflow: hidden;
  }


  .list{
    width: 90px;
    height: 550px;
    position:fixed;
  }



  .fooditem{
    float: left;
    margin-left: 90px;
  }
  li{
    list-style: none;
  }
  .home{
    width: auto;
    height: auto;
    position: absolute;
    left: 0px;
    top: 170px;
    z-index: 1;
  }



  .fooditem{
    width: 18.8em;
    height: auto;
    margin-bottom: 20px;
    float: left;
    overflow: hidden;
  }
  .fooditem img{
    width: 70px;
    height: 70px;
    /*float: left;*/
    margin-top: 10px;
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .foodBox{
    width: 18.8em;
    height: auto;

  }
  .foodlist{
    border-top: 1px solid #d2d2d2;
  }
  .topTxt{
    width: 18.8em;
    height: 20px;
    background-color: #f5f6f8;
    margin-top: 0px;
    float: left;
    font-size: 15px;
    margin-left: 20px;
  }
  .foodsName{
    width: 170px;
    position:absolute;
    left: 190px;
    margin-top: 10px;
    font-size: 13px;
  }
  .foodinfo{
    position: absolute;
    width: 200px;
    height: 14px;
    font-size: 12px;
    color: gray;
    left: 190px;
    margin-top: 25px;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .monthcell{
    position: absolute;
    width: 60px;
    font-size: 12px;
    color: gray;
    left: 190px;
    margin-top: 40px;
  }
  .favorable{
    position: absolute;
    width: 80px;
    font-size: 12px;
    color: gray;
    left: 260px;
    margin-top: 40px;
  }
  .addnum{
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid #0791d9;
    text-align: center;
    line-height: 17.5px;
    border-radius: 13px;
    color: white;
    font-weight: bold;
    background-color: #0791d9;
    left: 360px;
    margin-top: 68px;
    font-size: 20px;
  }
  .subtractnum{
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid #0791d9;
    text-align: center;
    line-height: 17.5px;
    border-radius: 13px;
    color:  #0791d9;
    font-weight: bold;
    background-color: white;
    left: 310px;
    margin-top: 68px;
    font-size: 20px;
  }
  .numvalue{
    position: absolute;
    width: 30px;
    height: 18px;
    text-align: center;
    line-height: 20px;
    margin-top: 69px;
    left: 330px;
  }
  .newPrice{
    position: absolute;
    width: 60px;
    color: red;
    font-size: 14px;
    left: 190px;
    margin-top: 60px;
  }
  .oldPrice{
    position: absolute;
    width: 60px;
    color: gray;
    font-size: 12px;
    left: 255px;
    margin-top: 62px;
  }


  .listView{
      width: 100%;
      height: auto;
      background-color: wheat;
      bottom: 50px;
      position: fixed;
      z-index: 10;
  }


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
      background-image: url("../assets/buycar.png");
      background-size: 45px 45px;
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
    .submit{
        height: 50px;
        width: 6em;
        position: absolute;
        background-color: limegreen;
        color: white;
        right: 0;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        line-height: 50px;
    }

    .listViewLi{
        height: 40px;
    }
    .payitemPrice{
        width: 100px;
        height: 20px;
        margin-left: 100px;
        margin-top:10px;

    }
    .payitemName{
        width: 200px;
        height: 20px;
        margin-left: 30px;


    }
    .payitemNum{
        width: 100px;
        height: 20px;
        margin-left: 60px;


    }
</style>