<template>
<div class="wrapper">
  <img class="wrapper__img" src="../../assets/编组.png">
<div class="wrapper__input">
  <input class="wrapper__input__content" placeholder="请输入手机号" v-model="username"/>
  </div>
  <div class="wrapper__input">
  <input
  class="wrapper__input__content" placeholder="请输入密码"
  type="password" v-model="password"/>
  </div>
    <div class="wrapper__input">
  <input
  class="wrapper__input__content" placeholder="确认密码" type="password" v-model="ensurement"/>
  </div>
  <div class="wrapper__register-button" @click="handleRegister">
    注册
  </div>
  <div class="wrapper__register-link" @click="handleLoginClick">
    已有账号去登录
  </div>
  <Toast v-if="show" :message="toastMessage"/>
  </div>

</template>
<script>
import { useRouter } from 'vue-router'// 注册useRouter
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 点击跳转到登录页面
const useLoginEffect = () => {
  const router = useRouter()// 路由 用于页面跳转
  const handleLoginClick = () => {
    router.push({ name: 'Login' })// 跳转到name=Login的组件
  }
  return { handleLoginClick }
}
// 注册相关逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter()// 路由 用于页面跳转
  const data = reactive({ // 中的数据已经与 input框的输入内容完成了双向绑定，输入内容改变，data里面的数据也相应改变，所以要用reactive 实现数据改变时的动态响应
    username: '',
    password: '',
    ensurement: ''
  })

  // 注册点击
  const handleRegister = async () => {
    const { username, password, ensurement } = data
    if (username === '' || password === '' || ensurement === '') {
      return showToast('用户名和密码不能为空')
    } else if (password !== ensurement) {
      return showToast('两次密码需相同')
    }
    try { // 如果接口地址写错那么就会直接弹出去，不会政治性else登录失败语句，所以用try catch捕获错误
      const result = await post('/api/user/register', { // post函数定义在utils/request.js中，封装了发送post请求的功能
        username: data.username,
        password: data.password
      })
      console.log(result)
      if (result?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch {
      showToast('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}

export default {
  components: { Toast: Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()// 解构赋值
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()
    return { handleLoginClick, handleRegister, username, password, ensurement, show, toastMessage }
  },
  name: 'Register'
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
  position: absolute;
  top:50%;
  left:0;
  right:0;
  transform: translateY(-50%);
  &__img{
    width:.66rem;
    height: .66rem;
    display: block;
    margin:0 auto .4rem auto;
  }
  &__input{
    background: #F9F9F9;
    border:1px solid rgba(0,0,0,0.10);
    border-radius: 6px;
    height:.48rem;
    margin:0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    &__content{
      border:none;
      outline: none;
      line-height: .48rem;
      width: 100%;
      background: none;
      font-size: .16rem;
       color: $content-notice-fontcolor;
      &::placeholder{
        color: $content-notice-fontcolor;
      }
    }
  }
  &__register-button{
   background: $btn-bgcolor;
   box-shadow: 0 4px 8px 0 rgba(0,   145,255,0.32);
    border-radius: 4px;
    line-height:.48rem;
    width: 2.95rem;
    color:$bgcolor;
    text-align: center;
    font-size: .16rem;
    margin: .32rem .4rem 0 .4rem;
  }
  &__register-link{
    text-align: center;
    font-size: .14rem;
    margin:.16rem;
    color:$content-notice-fontcolor;

  }
}
</style>
