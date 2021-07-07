<template>
<div class="mask" v-if="showChart" />
  <div class="cart" >
    <div class="product"  v-if="showChart">
        <div class="product__header">
        <div class="product__header__all"
         @click="() => setCartItemsChecked(shopId)"
      >
          <div class="product__header__icon iconfont"
          v-html="allChecked?'&#xe7f8;': '&#xe6f7;'"></div>
         <div class="product__header__allText"> 全选</div>
        </div>
        <div class="product__header__clear"
          @click="() => cleanCartProducts(shopId)">清除购物车</div>
      </div>
      <template
        v-for="item in productList"
        :key="item._id">
        <div class="product__item" v-if="item.count > 0 "  >
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? '&#xe7f8;': '&#xe6f7;'"
            @click="() => changeCartItemChecked(shopId, item._id)"
          />
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{item.price}}
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus"
              @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }"
            >-</span>
              {{item.count || 0}}
            <span
              class="product__number__plus"
              @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }"
            >+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check" @click="handleCartShowChange">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
        />
        <div class="check__icon__tag">{{total}}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{price}}</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from './commonCartEffect'
// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const { changeCartItemInfo } = useCommonCartEffect()
  const store = useStore()
  const cartList = store.state.cartList

  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })

  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.check) {
          count += (product.count * product.price)
        }
      }
    }
    return count.toFixed(2)
  })
  const allChecked = computed(() => {
    const productList = cartList[shopId]
    let result = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.count > 0 && !product.check) { // 只要有一个商品的状态不是check=true那么全部的check状态就为false
          result = false
        }
      }
    }
    return result
  })

  const productList = computed(() => {
    const productList = cartList[shopId] || []
    return productList
  })

  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }
  return {
    total,
    price,
    productList,
    changeCartItemInfo,
    changeCartItemChecked,
    allChecked,
    cleanCartProducts,
    setCartItemsChecked
  }
}
// 控制购物车上方列表是否展示
const hanldeClickCartEffect = () => {
  const showChart = ref(false)

  const handleCartShowChange = () => {
    showChart.value = !showChart.value
    console.log(showChart.value)
  }
  return { showChart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const {
      total,
      price,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,
      allChecked,
      cleanCartProducts,
      setCartItemsChecked
    } = useCartEffect(shopId)
    const { showChart, handleCartShowChange } = hanldeClickCartEffect()
    return {
      total,
      price,
      shopId,
      productList,
      changeCartItemInfo,
      showChart,
      handleCartShowChange,
      changeCartItemChecked,
      allChecked,
      cleanCartProducts,
      setCartItemsChecked
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.mask{
  position: fixed;
  top:0;
  bottom: 0;
  left:0;
  right:0;
  background: rgba(0, 0, 0, .5);
  z-index:1;
}
.cart {
  z-index:2;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FFF;
}
.product {
  overflow-y: scroll;
  flex: 1;
  background: #FFF;
  &__header{
    display: flex;
    height:.52rem;
    border-bottom: 1px solid #F1F1F1;
    font-size:.14rem;
    color:#333;
    line-height:.52rem;
    &__all{
      margin-left:.16rem;
      width:.64rem;
      flex:1;
      line-height: .52rem;
      display: flex;
    }
    &__allText{
       line-height: .52rem;
      margin-left:.084rem;
       text-align: center;
       bottom: .18rem;

    }
    &__icon{
      display: inline-block;
      color:#0091FF;
      font-size:.2rem;
      line-height:.52rem;
    }
    &__clear{
      flex:1;
      margin-right:.16rem;
      text-align: right;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgcolor;
     &__checked {
      line-height: .5rem;
      margin-right: .2rem;
      color: #0091FF;
      font-size: .2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontcolor;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontcolor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: .12rem;
      &__minus, &__plus
       {
        display: inline-block;
        width: .2rem;
        height: .2rem;
        line-height: .16rem;;
        border-radius: 50%;
        font-size: .2rem;
        text-align: center;
      }
      &__minus {
        border: .01rem solid $medium-fontcolor;
        color: $medium-fontcolor;
        margin-right: .05rem;
      }
      &__plus {
        background: $btn-bgcolor;
        color: $bgcolor;
        margin-left: .05rem;
      }
    }
  }
}
.check {
  display: flex;
  height: .49rem;
  border-top: .01rem solid $content-bgcolor;
  line-height: .49rem;
  &__icon {
    position: relative;
    width: .84rem;
    &__img {
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }
    &__tag {
      position: absolute;
      left: .46rem;
      top: .04rem;
      padding: 0 .04rem;
      min-width: .2rem;
      height: .2rem;
      line-height: .2rem;
      background-color: $hightlight-fontcolor;
      border-radius: .1rem;
      font-size: .12rem;
      text-align: center;
      color: #fff;
      transform: scale(.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: .12rem;
    &__price {
      line-height: .49rem;
      color: $hightlight-fontcolor;
      font-size: .18rem;
    }
  }
  &__btn {
    width: .98rem;
    background-color: #4FB0F9;
    text-align: center;
    color: #FFF;
    font-size: .14rem;
  }
}
</style>
