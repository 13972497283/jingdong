<template>
<div class="wrapper">
<StaticPart/>
<Nearby/>
</div>
<Docker :currentIndex="0" />
</template>

<script>
import StaticPart from './StaticPart'
import Nearby from './Nearby'
import Docker from '../../components/Docker'
export default {
  components: { StaticPart: StaticPart, Nearby: Nearby, Docker: Docker },
  name: 'Home'
}
</script>

<style lang="scss" scoped>//scope限制css的作用范围，组件里写的样式只能作用于组件里的dom
.wrapper{
overflow: auto;//溢出部分自动滚动
position:absolute;
left: 0;
top:0;
bottom:0.5rem ;
right: 0;
padding: 0 0.18rem .1rem .18rem;
}

</style>
