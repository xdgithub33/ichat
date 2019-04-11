<template>
  <div class="ichat-home">
    <div class="ichat-home-header">
      <IChatHeader :title="title"></IChatHeader>
    </div>
    <div class="ichat-home-content">
      <router-view></router-view>
    </div>
    <div class="ichat-home-foot">
      <van-tabbar v-model="active">
        <van-tabbar-item info="3" icon="comment-o" @click="onRouterJump('message')">消息</van-tabbar-item>
        <van-tabbar-item icon="friends-o" @click="onRouterJump('addressBooks')">通讯录</van-tabbar-item>
        <van-tabbar-item icon="shop-collect-o" @click="onRouterJump('shoppingMall')">商城</van-tabbar-item>
        <van-tabbar-item icon="setting-o">我</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
let homeAttr = {}
import CONST from '../store/const.js'

export default {
  name: 'home',
  data() {
    return {
      active: 0,
      title: 'iChat',
    }
  },
  beforeRouteEnter(to, from, next) {
    const routePath = to.path
    if (routePath === '/home/message') {
      homeAttr.title = 'iChat'
      homeAttr.active = 0
    } else if (routePath === '/home/addressBooks') {
      homeAttr.title = '通讯录'
      homeAttr.active = 1
    } else if (routePath === '/home/shoppingMall') {
      homeAttr.title = '商城'
      homeAttr.active = 2
    }
    next()
  },
  created() {
    this.active = homeAttr.active
    this.title = homeAttr.title
  },
  methods: {
    onRouterJump(to) {
      this.$router.push({
        path: '/home/' + to,
      })
      if (to === 'message') {
        this.title = 'iChat'
        this.active = 0
      } else if (to === 'addressBooks') {
        this.title = '通讯录'
        this.active = 1
      } else if (to === 'shoppingMall') {
        this.title = '商城'
        this.active = 2
      }
    },
  },
  components: {},
}
</script>

<style  lang="less" scoped>
.@{ichat-css-prefix}home {
  height: 100%;
  &-header {
    height: 0.46rem;
  }
  &-content {
    height: calc(100% - 0.96rem);
    overflow: auto;
  }
  &-foot {
    height: 0.5rem;
  }
}
</style>