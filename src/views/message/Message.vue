<template>
  <div class="ichat-message">
    <div class="ichat-meassage-chatter" v-for="item in list">{{item.name}}</div>
  </div>
</template>

<script>
import IO from 'socket.io-client'

export default {
  name: '',
  data() {
    return {
      list: [],
      offset: 10,
      loading: false,
      finished: false,
    }
  },
  created: function() {
    this.socket()
  },
  methods: {
    socket() {
      let socket = IO('http://localhost:3000')
      socket.emit('message', 'hey,how you doing!')
      socket.on('backMessage', data => {
        console.log(data)
        let message = [{ name: data }]
        this.list = [...message]
      })
    },
  },
}
</script>

<style  lang="less" scoped>
.@{ichat-css-prefix}message {
  height: 100%;
  &-list {
    height: 100%;
  }
}
</style>