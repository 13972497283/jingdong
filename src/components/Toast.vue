<template>
<div class="toast">{{message}}</div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: ''
  })
  const showToast = (message) => { // 因为请求失败与登录失败的弹窗逻辑一样，所以封装弹窗函数
    toastData.toastMessage = message
    toastData.show = true
    setTimeout(() => {
      toastData.show = false
      toastData.toastMessage = ''
    }, 2000)
  }
  const { show, toastMessage } = toRefs(toastData)// 解构赋值
  return { show, toastMessage, showToast }
}
export default {
  props: ['message']// 用props接收父组件传过来的数据
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.toast{
  position:fixed;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);//设置垂直水平居中
  padding: .1rem;
  background: rgba(0,0,0,.35);
  border-radius: .05rem;
  color:bgcolor;
}
</style>
