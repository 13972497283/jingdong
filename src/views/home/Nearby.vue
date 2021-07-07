<template>
  <div class="nearby">
  <h3 class="nearby__title">附近店铺</h3>
  <!-- router-link 会自动包一个a标签以跳转 -->
<router-link
 v-for="item in nearbyList"
 :to="`/shop/${item._id}`"
 :key="item._id">
<ShopInfo
:item="item"
:hideBordered="false"/>
</router-link>
<!-- 父组件传item给子组件，子组件用props接收 -->
</div>
</template>
<script>

import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/Shopinfo'

const useNearbyListEffect = () => {
  const nearbyList = ref([
  ])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    console.log(result)
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}
export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()// 解构赋值
    getNearbyList()
    return { nearbyList }
  }

}
</script>
<style lang="scss" scoped>//scope限制css的作用范围，组件里写的样式只能作用于组件里的dom
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.nearby{
  &__title{
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
       color: $content-fontcolor;
       font-weight: normal;
  }
  a{
    text-decoration: none;
  }

}
</style>
