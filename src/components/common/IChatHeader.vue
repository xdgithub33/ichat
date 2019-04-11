<template>
  <div class="ichat-header">
    <van-nav-bar class="ichat-header-nav-bar" :title="title" fixed/>
  </div>
</template>

<script>
export default {
  name: 'iChatHeader',
  props: ['title'],
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {},
  },
  components: {},
}
</script>

<style  lang="less" scoped>
.ichat-header {
  height: 46px;
  &-nav {
    &-bar {
      background-color: #3d3b41;
      div,
      span,
      i {
        color: #fff !important;
      }
    }
  }
}
</style>