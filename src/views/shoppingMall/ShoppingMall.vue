<template>
  <div>
    <ul>
      <li v-for="item in goodsList">
        <van-card
          :price="item.salePrice"
          desc="描述信息"
          :title="item.productName"
          :thumb="require('@/static/'+item.productImage)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'shoppingMall',
  data() {
    return {
      goodsList: [],
    }
  },
  components: {},
  created: function() {
    console.log('this', this)
    this.$store
      .dispatch('getGoodsList', {
        id: '123123',
      })
      .then(res => {
        console.log(res)
        const data = res.data
        this.goodsList = [...data.result.list]
      })
  },
}
</script>

<style  lang="less" scoped>
</style>