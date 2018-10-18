<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item"
            v-for="(item,index) in goods"
            :key="index">
          <span class="text border-1px">
            <span class="icon"
                  :class="classMap[item.type]"
                  v-show="item.type>0">
            </span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li class="food-list"
            v-for="(item,index1) in goods"
            :key="index1">
          <h1 class="title">
            {{item.name}}
          </h1>
          <ul>
            <li class="food-item border-1px"
                v-for="(food,index2) in item.foods"
                :key="index2">
              <div class="icon">
                <img :src="food.icon"
                     alt="">
              </div>
              <div>
                <h2 class="name">
                  {{food.name}}
                </h2>
                <p class="desc">
                  {{food.description}}
                </p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response) => {
      if (response.body.errno === ERR_OK) {
        this.goods = response.body.data
      }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'

.goods
  display flex
  position absolute
  top 174px
  bottom 46px
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      .icon
        display inline-block
        width 12px
        height 12px
        vertical-align top
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display table-cell
        width 56px
        vertical-align middle
        font-size 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      background #f3f5f7
      color rgb(147, 153, 159)
    .food-item
      display flex
      margin 18px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-1px(transparent)
</style>
