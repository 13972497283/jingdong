import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
    // { shopId: {shopName:'', productList:{ productId: {} }}}
    cartList: {}
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }// 如果购物车中没有这家店，那么这家店设为空对象
      let product = shopInfo.productList[productId]
      if (!product) { // 如果购物车里这家店里没有该商品
        product = productInfo// 那么购物车里该商品信息等于从商品列表拿来的商品信息
        productInfo.count = 0
      }
      product.count = product.count + payload.num
      if (payload.num > 0) { product.check = true }// 购物车列表中商品数量>0时，check=true
      if (product.count < 0) { product.count = 0 }
      shopInfo.productList[productId] = product // 商品列表的商品信息同步到购物车中该店铺的该商品中
      state.cartList[shopId] = shopInfo// 店铺信息同步到购物车中的该店铺信息
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
