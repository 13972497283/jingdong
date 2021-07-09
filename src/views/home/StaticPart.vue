<template>
<div class="position">
  <span class="iconfont position__icon">&#xe64f;</span>
  三峡大学欣苑1栋
  <span class="iconfont position__notice">&#xe6bb;</span>
</div>
<div class='search'>
  <span class="iconfont">&#xe677;</span>
  <span class="search__text">山姆会员商店优惠商品</span>
</div>
<div class="banner">
<img
  class="banner__img"
  src="../../assets/banner.jpg" alt="图片"
/>
</div>

<div class='icons'>
  <div class="icons__item" v-for="(item,index) in iconsList" :key=index>
    <!-- 这里还可以写成src=`../../assets/${imgName}.png`  然后imgName里存放图片名，因为地址都一样所以可以这么写-->
    <img class='icons__item__img' :src="item.imgUrl">
    <p class="icons__item__desc">{{item.desc}}</p>
  </div>

</div>
<div class="gap"></div>
</template>
<script>
export default {
  setup (props) {
    const iconsList = [
      {
        imgUrl: require('../../assets/超市.png'),
        desc: '超市'
      },
      {
        imgUrl: require('../../assets/菜市场.png'),
        desc: '菜市场'
      },
      {
        imgUrl: require('../../assets/水果店.png'),
        desc: '水果店'
      },
      {
        imgUrl: require('../../assets/鲜花.png'),
        desc: '鲜花'
      },
      {
        imgUrl: require('../../assets/医药健康.png'),
        desc: '医药健康'
      },
      {
        imgUrl: require('../../assets/家居.png'),
        desc: '家居'
      },
      {
        imgUrl: require('../../assets/蛋糕.png'),
        desc: '蛋糕'
      },
      {
        imgUrl: require('../../assets/签到.png'),
        desc: '签到'
      },
      {
        imgUrl: require('../../assets/大牌免运.png'),
        desc: '大牌免运'
      },
      {
        imgUrl: require('../../assets/红包.png'),
        desc: '红包'
      }
    ]
    return { iconsList }
  },

  name: 'StaticPart'
}
</script>

<style lang="scss" scoped>//scope限制css的作用范围，组件里写的样式只能作用于组件里的dom
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.search{
  margin-bottom: .12rem;
  line-height: 0.32rem;
  background:  $search-bgcolor;
  color:$search-fontcolor;
  border-radius: .16rem;
.iconfont{
  font-size: .2rem;
  display: inline-block;
  position:relative;
  top:.02rem;
  padding:0 .12rem 0 0.16rem;
}
&__text{
  display: inline-block;
 font-size: .14rem;
}
}
.position{
  color:$content-fontcolor;
  position:relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  .position__icon{
    top:0.01rem;
    font-size: 0.2rem;  position: relative;
  }
  .position__notice{
position: absolute;
right: 0;
top:0.17rem;
font-size: 0.2rem;

  }
}
.banner{
  height: 0;
  overflow: hidden;
  padding-bottom:25.4%;
  &__img{
    width: 100%;
  }
}
.icons{
  margin-top:.16rem;
  display: flex;
  flex-wrap: wrap;
  &__item{
   width:20%;
   &__img{
     display: block;
     width: .4rem;
     height: .4rem;
     margin: 0 auto;
   }
   &__desc{
     text-align: center;
   margin:.06rem 0 .16rem 0;
   color: $content-fontcolor;
   }
  }
}
.gap{
  height:.1rem;
  background: $content-bgcolor;
  margin:0 -.18rem;
}</style>
