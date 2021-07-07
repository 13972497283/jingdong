import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
    cartList: {
      // 第一层级是商铺的id
      // shopId: {
      // 第二层是商品id
      // 第二层内容是商品内容以及购物数量
      //   productId: {
      //     _id: '1',
      //     name: '番茄250g/份',
      //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
      //     sales: 10,
      //     price: 33.6,
      //     oldPrice: 39.6,
      //     count: 2
      //   },
      // },
    }
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = {} }// 如果购物车中没有这家店，那么这家店设为空对象
      let product = shopInfo[productId]
      if (!product) { // 如果购物车里这家店里没有该商品
        product = productInfo// 那么购物车里该商品信息等于从商品列表拿来的商品信息
        product.count = 0
      }
      product.count = product.count + payload.num
      if (payload.num > 0) { product.check = true }// 购物车列表中商品数量>0时，check=true
      if (product.count < 0) { product.count = 0 }
      shopInfo[productId] = product // 商品列表的商品信息同步到购物车中该店铺的该商品中
      state.cartList[shopId] = shopInfo// 店铺信息同步到购物车中的该店铺信息
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
    }
  },
  actions: {
  },
  modules: {
  }
})
