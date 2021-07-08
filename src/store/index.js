import Vuex from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)// 将cartList对象转为字符串，以便存储到localStorage
  localStorage.cartList = cartListString
  // console.log(cartListString)cartListString为字符串
}

const getLocaCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  if (localStorage.cartList) {
    return JSON.parse(localStorage.cartList)// 对应setLocalCartList（）中的const cartListString = JSON.stringify(cartList)将字符串localStorage.cartList转换成对象
  } else {
    return {}
  }
}

export default Vuex.createStore({
  state: {
    // { shopId: {shopName:'', productList:{ productId: {} }}}
    cartList: getLocaCartList()
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
      setLocalCartList(state)// 将购物车state保存到本地永久持存
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)// 保存名字的时候也要将新店名保存到本地
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
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
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
