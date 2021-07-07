<template>
<div class="wrapper">
  <div class="search">
    <div class="search__back iconfont"
    @click="handleBackClick">&#xe600;</div>
    <div class="search__content">
      <span class="search__content__icon iconfont">&#xe677;</span>
      <input class="search__content__input" placeholder="请输入商品名称"/>
    </div>
  </div>
<ShopInfo
:item="item"
:hideBordered="true" v-show="item.imgUrl"/>
<Content/>
<Cart/>
</div>
</template>
<script>
import ShopInfo from '../../components/Shopinfo'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { reactive, toRefs } from 'vue'
import Content from './Content.vue'
import Cart from './Cart'
const useShopInfoEffect = () => {
  const route = useRoute()// 当前访问的路由路径的信息
  const data = reactive({
    item: {

    }
  })
  const getItemData = async () => {
    console.log(route.params.id)// 获取当前路由路径的id
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
    console.log(result)
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}
// 点击为退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()// 当前路由的信息
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }

}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
  padding: 0 .18rem
}
.search{
  height:.32rem;
  margin:.14rem 0 .04rem 0;
 display: flex;
 line-height: .32rem;
 &__back{
  font-size: .3rem;
  width:.3rem;
  color:#B6B5B6;
 }
 &__content{
   display: flex;
   flex: 1;
   line-height: .32rem;
   background: $search-bgcolor;
   border-radius: .16rem;
   &__icon{
     width:.44rem;
text-align: center;
color:$search-fontcolor;
   }
   &__input{
height:.32rem;
border:none;
outline: none;
background: none;
display:block;
width:100%;
padding-right:.2rem;
color:$content-fontcolor;
 font-size: .14rem;
&::placeholder{
  color:$content-fontcolor;

}
   }
 }

}
</style>
