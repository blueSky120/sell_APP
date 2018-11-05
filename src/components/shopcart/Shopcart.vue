<template>
  <div>
    <div class="shopcart">
      <div class="content"
           @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo"
                 :class="{'highLight':totalCount>0}">
              <span class="icon-shopping_cart"
                    :class="{'highLight':totalCount>0}"></span>
            </div>
            <div class="num"
                 v-show="totalCount>0">
              {{totalCount}}
            </div>
          </div>
          <div class="price"
               :class="{'highLight':totalPrice>0}">
            {{totalPrice}}元
          </div>
          <div class="desc">
            另需配送费￥{{deliveryPrice}}元
          </div>
        </div>
        <div class="content-right"
             @click="pay">
          <div class="pay"
               :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list"
             v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty"
                  @click="empty">清空</span>
          </div>
          <div class="list-content"
               ref="listContent">
            <ul>
              <li class="food"
                  v-for="(food,index) in selectFoods"
                  :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name=fade>
      <div class="list-mask"
           v-show="listShow"
           @click="toggleList">
      </div>
    </transition>
  </div>
</template>
<script>

import BScroll from 'better-scroll'
import Cartcontrol from './../cartcontrol/Cartcontrol'

export default {
  data () {
    return {
      fold: true
    }
  },
  components: {
    Cartcontrol
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default () {
        return [{ price: 10, count: 2 }]
      }
    }
  },
  computed: {
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          })
        } else {
          console.log('this.scroll', this.scroll)
          this.scroll.refresh()
        }
      }
      return show
    },
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  methods: {
    pay () {
      if (this.totalPrice < this.minPrice) {
        return false
      }
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'

.shopcart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  background #f60
  .content
    display flex
    background #141d27
    .content-left
      flex 1
      font-size 0
      .logo-wrapper
        display inline-block
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        vertical-align top
        border-radius 50%
        background #141d27
        .logo
          height 100%
          width 100%
          border-radius 50%
          background #2b343c
          text-align center
          &.highLight
            background rgb(0, 160, 220)
          .icon-shopping_cart
            font-size 24px
            color #80858a
            line-height 44px
            &.highLight
              color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #fff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display inline-block
        vertical-align top
        line-height 24px
        box-sizing border-box
        padding-right 12px
        border-right 1px solid rgba(255, 255, 255, 0.1)
        font-size 16px
        font-weight 700
        color rgba(255, 255, 255, 0.4)
        margin-top 12px
        &.highLight
          color #fff
      .desc
        display inline-block
        vertical-align top
        line-height 24px
        margin 12px 0 0 12px
        color rgba(255, 255, 255, 0.4)
        font-size 10px
    .content-right
      width 105px
      flex 0 0 105px
      .pay
        height 48px
        line-height 48px
        text-align center
        color rgba(255, 255, 255, 0.4)
        font-size 12px
        font-weight 700
        background #2b333b
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
  .shopcart-list
    position absolute
    top 0
    left 0
    z-index -1
    width 100%
    transform translate3d(0, -100%, 0)
    &.fold-enter-active, &.fold-leave-active
      transition all 0.5s
      transform translate3d(0, 0, 0)
    &.fold-enter-to
      transform translate3d(0, -100%, 0)
    .list-header
      height 40px
      line-height 40px
      padding 0 18px
      background #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)
    .list-content
      padding 0 18px
      max-height 217px
      overflow hidden
      background #ffffff
      .food
        position relative
        padding 12px 0
        box-sizing border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 99px
          bottom 12px
          line-height 24px
          font-weight 700
          color rgb(240, 20, 20)
          font-size 14px
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 6px
.list-mask
  position fixed
  width 100%
  height 100%
  top 0
  left 0
  z-index 40
  background rgba(7, 17, 27, 0.6)
  &.fade-enter-active, &.fade-leave-active
    transition opacity 0.5s
  &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity 0
</style>
