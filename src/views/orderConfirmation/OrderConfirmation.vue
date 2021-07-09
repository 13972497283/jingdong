<template>
<div class="wrapper">
 <div class="top">
     <div class="top__header">
       <div
       class="iconfont top__header__back"
       @click="handleBackClick">&#xe600;</div>
       确认订单
     </div>
     <div class="top__receiver">
       <div class="top__receiver__title">收货地址</div>
       <div class="top__receiver__address">三峡大学欣苑1栋</div>
     <div class="top__receiver__info">
       <span class="top__receiver__info__name">罗慧（女士）</span>
       <span class="top__receiver__info__">12345678901</span>
     </div>
     <div class="iconfont top__receiver__icon">&#xe600;</div>
</div>
 </div>

 <div class="products">
  <div class="products__title">{{shopName}}</div>
 <div class="products__wrapper">
  <div class="products__list">
  <template v-for="item in productList"
 :key="item._id" >
 <div class="products__item"

 v-if="item.count>0"
 >
   <img class="products__item__img"
   :src="item.imgUrl"
   />
   <div class="products__item__detail">
     <h4 class="products__item__title">
    {{item.name}}
     </h4>
     <p class="products__item__price">
       <span><span class="product__item__yen">&yen;</span>
       {{item.price}} × {{item.count}}
       </span>
       <span class="products__item__total">
         <span class="product__item__yen">&yen;</span>{{item.price*item.count}}
       </span>

     </p>
   </div>
 </div>
    </template>
  </div>
  </div>
</div>

<div class="order">
  <div  class="order__price">实付金额 <b>￥{{calculations.price}}</b></div>
  <div  class="order__btn">提交订单</div>
</div>
 </div>
</template>
<script>
import { useCommonCartEffect } from '../../effects/cartEffects'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'OrderConfirmation',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const shopId = route.params.id
    const handleBackClick = () => {
      router.back()
    }
    const { productList, shopName, calculations } = useCommonCartEffect(shopId)
    return { productList, shopName, calculations, handleBackClick }
  }

}
</script>
<style scoped lang="scss">
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.wrapper{
  background: #eee;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y:scroll;//超出滚动
}
.top{
  position:relative;
  height: 1.96rem;
  background-size:100% 1.59rem ;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-repeat:no-repeat ;
  &__header{
    position: relative;
    padding-top:.26rem;
    line-height: .24rem;
    color:#FFF;
    text-align: center;
     font-size:.16rem ;
    &__back{
      position:absolute;

      left: .18rem;
    }
  }
  &__receiver{
    position:absolute;
    left:.18rem;
    right:.18rem;
    bottom:0;
    height:1.11rem;
    background: #FFF;
    border-radius: .04rem;
    &__title{
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: #333;
      line-height: .22rem;
    }
    &__address{
      padding: 0 .4rem 0 .16rem;
      color:#333;
      font-size: .14rem;
      line-height:.2rem;
    }
    &__info{
     padding: .06rem 0 0 .16rem;
     &__name{
       color:#666;
       font-size: .12rem;
       line-height: .18rem;
       margin-right: .06rem;
     }
    }

  &__icon{
    position:absolute;
    right:.16rem;
    top:.5rem;
    color:#666;
    font-size: .2rem;
    transform: rotate(180deg);
  }
  }
}
.products{
  margin:.16rem .18rem .1rem .18rem;
  background: #FFF;
  &__title{
  font-size: .16rem;
  padding: .16rem .16rem .16rem .16rem;
  color:#333;
  }
&__wrapper{
  overflow-y:scroll;
  margin:0 .18rem;
  left:0;
  right:0;
  bottom:.6rem;
  top:2.6rem;
  position:absolute;
}
&__list{
  background: #FFF;
}
  &__item{
    position: relative;
    display: flex;
    padding:0 .16rem .16rem .16rem;
&__img{
  width: .46rem;
  height: .46rem;
  margin-right:.16rem
}
  &__detail{
      flex:1;
}
&__title{
  line-height: .2rem;
  font-size: .14rem;
  color: $content-fontcolor;
  margin: 0;
  @include ellipsis;//定义在mixins里的不换行超出省略隐藏样式
    }

&__price{
  margin: .06rem 0 0 0;
  line-height: .2rem;
  font-size: .14rem;
  color:$hightlight-fontcolor;
  display: flex;
}

&__total{
flex:1;
text-align: right;
color:#000;
}
&__yen{
  font-size: .12rem;
}

  }
  }

.order{
display: flex;
height: .49rem;
line-height: .49rem;
background: #FFF;
position: absolute;
left:0;
right:0;
bottom: 0;
  &__price{
flex:1;
text-indent: .24rem;
font-size: .14rem;
color:#333;
  }
  &__btn{
    width: .98rem;
    background: #4FB0F9;
    color:#FFF;
    text-align: center;
    font-size: .14rem;
  }
}
</style>
