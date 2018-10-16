<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <div class="tab border-1px">
      <router-link class="tab-item"
                   to="/goods">商品1</router-link>
      <router-link class="tab-item"
                   to="/ratings">评论1</router-link>
      <router-link class="tab-item"
                   to="/seller">商家1</router-link>
      <!-- <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div> -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import Header from './components/header/Header'

const ERR_OK = 0

export default {
  data () {
    return {
      seller: {

      }
    }
  },
  created () {
    this.$http.get('/api/seller').then((response) => {
      console.log(response.body.data)
      if (response.body.errno === ERR_OK) {
        this.seller = response.body.data
      }
    })
  },
  components: {
    Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'
#app
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, 0.1))
    & > a
      display block
      color rgb(77, 85, 93)
      font-size 14px
      &.active
        color rgb(240, 20, 20)
    .tab-item
      flex 1
      text-align center
</style>
