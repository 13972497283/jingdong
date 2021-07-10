<template>
 <div class="top">
     <div class="top__header">
       <div
       class="iconfont top__header__back"
       @click="handleBackClick">&#xe600;</div>
       确认订单
     </div>
     <div class="top__receiver">
       <div class="top__receiver__title">收货地址</div>
       <div class="top__receiver__address">三峡大学欣苑1栋</div>
     <div class="top__receiver__info">
       <span class="top__receiver__info__name">罗慧（女士）</span>
       <span class="top__receiver__info__">12345678901</span>
     </div>
     <div class="iconfont top__receiver__icon">&#xe600;</div>
</div>
 </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }

}
</script>
<style scoped lang="scss">
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.top{
  position:relative;
  height: 1.96rem;
  background-size:100% 1.59rem ;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-repeat:no-repeat ;
  &__header{
    position: relative;
    padding-top:.26rem;
    line-height: .24rem;
    color:$bgcolor;
    text-align: center;
     font-size:.16rem ;
    &__back{
      position:absolute;

      left: .18rem;
    }
  }
  &__receiver{
    position:absolute;
    left:.18rem;
    right:.18rem;
    bottom:0;
    height:1.11rem;
    background:$bgcolor;
    border-radius: .04rem;
    &__title{
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: $content-fontcolor;
      line-height: .22rem;
    }
    &__address{
      padding: 0 .4rem 0 .16rem;
      color:$content-fontcolor;
      font-size: .14rem;
      line-height:.2rem;
    }
    &__info{
     padding: .06rem 0 0 .16rem;
     &__name{
       color:$medium-fontcolor;
       font-size: .12rem;
       line-height: .18rem;
       margin-right: .06rem;
     }
    }

  &__icon{
    position:absolute;
    right:.16rem;
    top:.5rem;
    color:$medium-fontcolor;
    font-size: .2rem;
    transform: rotate(180deg);
  }
  }
}
</style>
