<template>
  <div class="login">
    <van-cell-group class="login-form-con">
      <van-field v-model="username" required clearable label="用户名" placeholder="请输入用户名"/>
      <van-field
        v-model="password"
        clearable
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>

    <van-row type="flex" justify="center">
      <van-button type="primary" class="login-btn" @click="login()">登录</van-button>
    </van-row>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import localStorage from '@/utils/localStorage.js'
export default {
  name: '',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  created: () => {
    console.log(localStorage)
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        return
      }
      this.$store
        .dispatch('login', {
          username: this.username,
          password: md5(this.password),
        })
        .then(res => {
          const data = res.data
          if (data.status === 1) {
            this.$router.push({
              name: 'message',
              path: '/home/message',
            })
            const account = data.result
            this.$cookies.set('login-token', account.token, 60 * 60 * 24 * 7)
            localStorage.set('account', Object.assign({}, { accoutId: account.accountId, username: account.userName }))
          } else if (data.status === 0) {
            this.$notify({
              message: data.msg,
              duration: 1000,
              background: 'red',
            })
          }
        })
    },
  },
  components: {},
}
</script>

<style  lang="scss" scoped>
.login {
  padding-top: 0.5rem;

  &-btn {
    margin-top: 0.2rem;
    width: 1rem;
    border-radius: 0.05rem;
  }
}
</style>