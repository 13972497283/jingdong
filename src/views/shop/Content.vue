<template>
<div class="content">
<div class="category">
  <!-- 当选中项与商品列表某一项tab相同时，该项拥有--active的class -->
 <div :class="{'category__item':true, 'category__item--active':item.tab===currentTab}"
  v-for="item in categories"
  :key="item.name"
  @click="()=>{handleTabClick(item.tab)}"
 >{{item.name}}</div>
</div>

<div class="product">
 <div class="product__item" v-for="item in list"
 :key="item._id"
 >
   <img class="product__item__img"
   :src="item.imgUrl"
   />
   <div class="product__item__detail">
     <h4 class="product__item__title">
      {{item.name}}
     </h4>
     <p class="product__item__sales">月售{{item.sales}}件</p>
     <p class="product__item__price">
       <span class="product__item__yen">&yen;</span>{{item.price}}
       <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
     </p>
   </div>
   <div class="product__number">
     <span class="product__number__minus"  @click="() => { changeCartItem(shopId, item._id, item, -1,shopName)}">-</span>
    {{cartList?.[shopId]?.productList?.[item._id]?.count || 0}}
      <span class="product__number__plus"  @click="() => { changeCartItem(shopId, item._id, item, 1,shopName)}">+</span>
   </div>
 </div>
</div>
</div>
</template>
<script>
import { get } from '../../utils/request'
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from './commonCartEffect'
const categories = [{
  name: '全部商品',
  tab: 'all'
},
{
  name: '秒杀',
  tab: 'seckill'
},
{
  name: '新鲜水果',
  tab: 'fruit'
}]

// tab切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    console.log(tab)
    currentTab.value = tab
  }
  return {
    currentTab, handleTabClick
  }
}
// 列表内容相关逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({
    list: []
  })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value })
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
    console.log(result.data)
  }
  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)
  return { list }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const store = useStore()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItemInfo } = useCommonCartEffect()
    const changeShopName = (shopId, shopName) => {
      store.commit('changeShopName', { shopId, shopName })
    }
    const changeCartItem = (shopId, productId, item, num, shopName) => {
      changeCartItemInfo(shopId, productId, item, num)
      changeShopName(shopId, shopName)
    }
    return {
      list, currentTab, handleTabClick, categories, cartList, changeCartItem, shopId
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.content{
  position:absolute;
  display: flex;
  left:0;
  right:0;
  top:1.5rem;
  bottom: .5rem;
}
.category{
  width: .76rem;
  background: $search-bgcolor;
  height:100%;
  overflow-y: scroll;//超出区域向下滚动
  &__item{
    line-height: .4rem;
    text-align: center;
    font-size:14px;
    color:$content-fontcolor;
    &--active{
      background: $bgcolor;
    }
  }
}
.product{
  flex: 1;
  overflow-y:scroll ;//超出区域向下滚动
  &__item{
    position: relative;
    display: flex;
    padding:.12rem 0;
    margin:0 .16rem;
    border-bottom:.01rem solid $content-bgcolor;
    &__detail{
      overflow: hidden;//超出部分的隐藏
    }
&__img{
  width: .68rem;
  height: .68rem;
  margin-right:.16rem
}
&__title{
  line-height: .2rem;
  font-size: .14rem;
  color: $content-fontcolor;
  margin: 0;
  @include ellipsis;//定义在mixins里的不换行超出省略隐藏样式
}
&__sales{
  margin:.06rem 0;
  line-height: .2rem;
  font-size: .12rem;
  color: $content-fontcolor;
  margin:.06rem 0;
}
&__price{
  margin: 0;
  line-height: .2rem;
  font-size: .14rem;
  color:$hightlight-fontcolor;
}
&__yen{
  font-size: .12rem;
}
&__origin{
  margin-left: .06rem;
  line-height: .2rem;
  font-size: .12rem;
  color: $light-fontcolor;
  text-decoration: line-through;//一个横线穿过文字
}
.product__number{
  position: absolute;
  right:0;
  bottom: .12rem;
  &__minus,&__plus{
    width:.2rem;
    height:.2rem;
    display:inline-block;
    border-radius: 50%;
    font-size: .2rem;
    text-align: center;
    line-height: .15rem;
  }
  &__minus{
   border:.01rem solid $medium-fontcolor;
   color:$medium-fontcolor;
   margin-right: .05rem;
  }
&__plus{
  background:$btn-bgcolor ;
  color:white;
  margin-left: .05rem;
}
}
  }
}
</style>
