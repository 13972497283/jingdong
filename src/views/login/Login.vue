<template>
<div class="wrapper">
  <img class="wrapper__img" src="../../assets/编组.png">
<div class="wrapper__input">
  <!-- 使用v-model实现数据的双向绑定，data.username就等于此时输入这个input框的值 -->
  <input class="wrapper__input__content" placeholder="请输入手机号" v-model="username"/>
  </div>
  <div class="wrapper__input">
    <!-- 使用v-model实现数据的双向绑定，data.password就等于此时输入这个input框的值 -->
  <input
  class="wrapper__input__content" placeholder="请输入密码" type="password" v-model="password"/>
  </div>
  <div class="wrapper__login-button" @click="handleLogin">
    登录
  </div>
  <div class="wrapper__login-link" @click="handleRegisterClick">
    立即注册
  </div>
  <Toast v-if="show" :message="toastMessage"/>
  </div>

</template>
<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

const userLoginEffect = (showToast) => {
  const router = useRouter()// 路由 用于页面跳转
  const data = reactive({ // 中的数据已经与 input框的输入内容完成了双向绑定，输入内容改变，data里面的数据也相应改变，所以要用reactive 实现数据改变时的动态响应
    username: '',
    password: ''
  })

  // 登录点击
  const handleLogin = async () => {
    try {
      const { username, password } = data
      if (username === '' || password === '') {
        return showToast('用户名和密码不能为空')
      }
      // 如果接口地址写错那么就会直接弹出去，不会政治性else登录失败语句，所以用try catch捕获错误
      const result = await post('/api/user/login', { // post函数定义在utils/request.js中，封装了发送post请求的功能
        username: data.username,
        password: data.password
      })
      console.log(result)
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch {
      showToast('请求失败')
    }

    // .then(() => {
    //   localStorage.isLogin = true// 只要点击登录就给  localStorage.isLogin = true，跳转需要使用这个localStorage.isLogin
    //   router.push({ name: 'Home' })// 跳转到Home页面
    // }).catch(() => {
    //   alert('失败')
    // })
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

const userRegisterEffect = () => {
  const router = useRouter()// 路由 用于页面跳转
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })// 跳转到Register页面
  }
  return { handleRegisterClick }
}

export default {
  components: { Toast },
  name: 'Login',
  setup () { // 代码执行流程
    const { show, toastMessage, showToast } = useToastEffect()// 解构赋值
    const { username, password, handleLogin } = userLoginEffect(showToast)
    const { handleRegisterClick } = userRegisterEffect()

    return {
      handleLogin,
      handleRegisterClick,
      username,
      password,
      show,
      toastMessage
    }
  }
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
  &__login-button{
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
  &__login-link{
    text-align: center;
    font-size: .14rem;
    margin:.16rem;
    color:$content-notice-fontcolor;

  }
}
</style>
