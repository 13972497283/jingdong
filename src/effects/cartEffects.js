import { useStore } from 'vuex'
import { computed } from 'vue'
// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, num
    })
  }
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}// 如果购物车中没有该商铺的商品，那么就令该商品列表为空对象
    return productList
  })

  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
  return {
    cartList,
    changeCartItemInfo,
    productList,
    shopName
  }
}
