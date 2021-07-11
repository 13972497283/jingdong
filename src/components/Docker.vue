<template>
 <div class='docker'>
   <!-- :class="{'docker__item':true}"  表示为true时就展示这个class，为false就不展示这个class -->
    <div v-for="(item,index) in dockerList"
     :class="{'docker__item':true,'docker__item--active':index===currentIndex}"
    :key="item.icon">
    <!-- v-html:不需要转义，直接用item.icon作为展示内容 -->
  <router-link :to="item.to">
      <div class="iconfont" v-html="item.icon"/>
     <div class="docker__title">{{item.text }}</div>
</router-link>
 </div>
   </div>
</template>
<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      {
        icon: '&#xe6f9;',
        text: '首页',
        to: { name: 'Home' }
      },
      {
        icon: '&#xe60a;',
        text: '购物车',
        to: { name: 'CartList' }
      },
      {
        icon: '&#xe63e;',
        text: '订单',
        to: { name: 'OrderList' }
      },
      {
        icon: '&#xe660;',
        text: '我的',
        to: { name: 'Home' }
      }
    ]
    return { dockerList }
  }
}
</script>
<style lang="scss" scoped>//scope限制css的作用范围，组件里写的样式只能作用于组件里的dom
@import '../style/viriables.scss';
@import '../style/mixins.scss';
.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 .18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: .01rem solid $content-bgcolor;
  color: $content-fontcolor;

  &__item {//等价于.docker__item &表示外层修饰符
    flex: 1;
    text-align: center;
     a{
    text-decoration: none;
    color: $content-fontcolor;
  }
    .iconfont {
      margin: .07rem 0 .02rem 0;//上右下左
      font-size: .18rem;
    }
    &--active {
      a{color: #1FA4FC;}
    }
  }
  &__title {
    font-size: 20px; //页面最小能展示的像素是12px，如果想展示10px，那么就先设置为20px
  transform: scale(0.5,0.5);//然后长宽各缩50%
  transform-origin: center top;//先以center为中心再以顶部为中心缩放
  }
}

</style>
