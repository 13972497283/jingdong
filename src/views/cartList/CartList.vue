<template>
<div class="wrapper">
  <div class="top">
  <div class="title">我的全部购物车</div>
  </div>
  <div class="cart">
    <template
    v-for="(item,index) in shopList"
      :key="index" >
      <div class="cart__shop" v-if="item.showShop"
    >
        <div class="cart__shop__name">{{item.shopName}}</div>
        <template v-for="item in item.productList" :key="item._id">
          <div class="cart__shop__product"  v-if="item.count>0">

            <img  class="product__img" :src="item.imgUrl"/>

            <span class="product__detail">
              <div class="product__detail__name">{{item.name}}</div>
              <div class="product__detail__prices">
                <span class="product__detail__prices__singleprice">￥{{item.price}} × {{item.count}}</span>
                <span class="product__detail__prices__totalprice">￥{{item.price*item.count}}</span>
              </div>
            </span>
          </div>
        </template>
      </div>
      </template>
  </div>
</div>
  <Docker :currentIndex="1"/>
</template>

<script>
import Docker from '../../components/Docker.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
// 深克隆函数
function deepClone (o) {
  let a
  if (Array.isArray(o)) {
    a = []
    for (let i = 0; i < o.length; i++) {
      a.push(deepClone(o[i]))
    }
  } else if (typeof o === 'object') {
    a = {}
    for (var k in o) {
      a[k] = deepClone(o[k])
    }
  } else {
    a = o
  }
  return a
}
// 克隆购物车添加是否展示该店铺属性showShop
const cloneCartListToShopList = () => {
  const store = useStore()
  const cartList = store.state.cartList
  var shopList = deepClone(cartList)// 克隆vuex中的cartList
  for (const shop in shopList) {
    const TOF = ref(false)
    console.log(shopList[shop].showShop)
    for (const product in shopList[shop].productList) {
      if (shopList[shop].productList[product].count > 0) {
        TOF.value = true
      }
    }
    shopList[shop].showShop = TOF.value// 为该店添加是否展示的属性
  }
  return { shopList }
}

export default {
  components: { Docker },
  name: 'CartList',
  setup () {
    const { shopList } = cloneCartListToShopList()
    return { shopList }
  }

}
</script>

<style lang="scss" scoped>

.wrapper{
  left:0;
  right:0;
  top:0;
  bottom: .5rem;
  position: absolute;
  background: rgb(248, 248,248);
}
.top{
  height: .64rem;
  background: #FFF;
  color: #333333;
  .title{
    padding-top:.2rem ;
    line-height: .44rem;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 16px;
  }
}
.cart{
  position:absolute;
  background: #F5F5F5;
  overflow-y:scroll;
  top:.64rem;
  bottom:0;
  left:0;
  right:0;
&__shop{
margin:.16rem .18rem;
background: #FFF;
padding:.16rem;
border-radius: .04rem;
&__name{
font-family: PingFangSC-Medium;
font-size: 16px;
color: #333333;
}
&__product{
margin-top:.16rem;
display: flex;
}
}
}
.product{
  &__img{
    width:.46rem;
    height:.46rem;
  }
  &__detail{
    flex:1;
    margin-left:.16rem;
    &__name{
      font-family: PingFangSC-Medium;
      font-size: .14rem;
      color: #333333;
      margin-bottom: .06rem;
      line-height: .2rem;
    }
    &__prices{
      font-family: PingFangSC-Regular;
      font-size:.14rem;
      line-height: .14rem;
      display: flex;
      &__singleprice{
        flex:1;
        color: #E93B3B;
       text-align: left;
      }
      &__totalprice{
        flex:1;
      text-align: right;
      }
    }
  }
}
</style>
