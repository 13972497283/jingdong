<template>
 <div class="products">
  <div class="products__title">{{shopName}}</div>
 <div class="products__wrapper">
  <div class="products__list">

 <div class="products__item"
v-for="item in productList"
 :key="item._id"
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
         <span class="product__item__yen">&yen;</span>
         {{(item.price*item.count).toFixed(2)}}
         <!-- 保留小数点后两位 -->
       </span>

     </p>
   </div>
 </div>

  </div>
  </div>
</div>
</template>

<script>
import { useCommonCartEffect } from '../../effects/cartEffects'
import { useRoute } from 'vue-router'
export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)

    return { productList, shopName }
  }

}
</script>
<style scoped lang="scss">
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.products{
  margin:.16rem .18rem .1rem .18rem;
  background:$bgcolor;
  &__title{
  font-size: .16rem;
  padding: .16rem .16rem .16rem .16rem;
  color:$content-fontcolor;
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
  background: $bgcolor;
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
color:$dark-fontcolor;
}
&__yen{
  font-size: .12rem;
}

  }
  }
</style>
