<template>
  <div class="order">
  <div  class="order__price">实付金额 <b>￥{{calculations.price}}</b></div>
  <div  class="order__btn"
  @click="()=>handleSubmitClick(true)">提交订单</div>
</div>
<div class="mask"
v-if="showConfirm"
  @click="()=>handleSubmitClick(false)"
>
<div class="mask__content" @click.stop>
  <!-- @click.stop点击无效 -->
  <h3 class="mask__content__title">确认离开收银台？</h3>
  <p class="mask__content__desc">
    请尽快完成支付,否则将被取消
  </p>
  <div class="mask__content__btns">
    <div class="mask__content__btn mask__content__btn--first"
    @click="()=>handleConfirmOrder(true)"
    >取消订单</div>
    <div
    class="mask__content__btn mask__content__btn--last"
    @click="()=>handleConfirmOrder(false)"
    >确认支付</div>
  </div>
</div>
</div>
<Toast v-if="show" :message="toastMessage"/>
</template>
<script>
import { useCommonCartEffect } from '../../effects/cartEffects'
import { useRouter, useRoute } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'

// 下单相关
const useMakeOrderEffect = (productList, showToast, shopName, shopId) => {
  const router = useRouter()
  const store = useStore()
  const handleConfirmOrder = async (isCanceled) => {
    console.log(productList)
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    console.log(products)
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value, // shopName本身是个ref类型的数据
        isCanceled,
        products
      })
      console.log(result)
      if (result?.errno === 0) {
        store.commit('cleanCartProducts', { shopId })// 下单成功后清空购物车
        router.push({ name: 'OrderList' })
      }
    } catch (e) {
      // 提示下单失败
      showToast('下单失败')
      console.log('失败')
    }
  }
  return {
    handleConfirmOrder
  }
}

// 蒙层展示相关
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleSubmitClick = (status) => {
    showConfirm.value = status
  }
  return {
    handleSubmitClick, showConfirm
  }
}

export default {
  name: 'Order',
  components: { Toast },
  setup () {
    const route = useRoute()

    const shopId = parseInt(route.params.id, 10)// 转成十进制数

    const { calculations, productList, shopName } = useCommonCartEffect(shopId)

    const { show, toastMessage, showToast } = useToastEffect()
    const { handleSubmitClick, showConfirm } = useShowMaskEffect()
    const { handleConfirmOrder } = useMakeOrderEffect(productList, showToast, shopName, shopId)
    return { calculations, handleConfirmOrder, show, toastMessage, showConfirm, handleSubmitClick }
  }
}

</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.order{
display: flex;
height: .49rem;
line-height: .49rem;
background: $bgcolor;
position: absolute;
left:0;
right:0;
bottom: 0;
  &__price{
flex:1;
text-indent: .24rem;
font-size: .14rem;
color:$content-fontcolor;
  }
  &__btn{
    width: .98rem;
    background: #4FB0F9;
    color: $bgcolor;
    text-align: center;
    font-size: .14rem;
  }
}

.mask{
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom: 0;
  z-index:1;
  background: rgba(0,0,0,0.50);
  &__content{
    width:3rem;
    height:1.56rem;
    background: #FFF;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);//以自身长宽为参考移动一半
    border-radius: .04rem;
    text-align: center;
    &__title{
      font-size: .18rem;
      color:#333;
      margin:.24rem 0 0 0;
      line-height: .26rem;
    }
    &__desc{
      margin-top:.08rem 0 0 0 ;
      font-size: .14rem;
    }
    &__btns{
      margin:.24rem .58rem 0 .58rem;
      display: flex;
    }
    &__btn{
      flex: 1;
      width:.8rem;
      line-height: .32rem;
      border:.01rem solid #4FB0F9;
      border-radius: .16rem;
      font-size: .14rem;
      &--first{
        margin-right: .12rem;
        color:#4FB0F9;
      }
      &--last{
        margin-left: .12rem;
        background:#4FB0F9;
        color:#FFF;
      }
    }
  }
}
</style>
