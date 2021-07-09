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
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList

    const result = {
      total: 0,
      price: 0,
      allChecked: true
    }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false// 只要有一个商品的状态不是check=true那么全部的check状态就为false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  return {
    cartList,
    changeCartItemInfo,
    productList,
    shopName,
    calculations
  }
}
