<template lang="pug">
  .container
    .focus-goods-body
      .focus-goods-swiper(v-swiper:mySwiper="swiperConfig")
        .swiper-wrapper
          .swiper-slide(v-for='item in product.images')
            img(:src="imageCDN  + item + \'?imageView2/1/format/jpg/q/75|imageslim\'")

        .swiper-pagination.swiper-pagination-bullets

      .focus-goods-content
        .focus-goods-price(v-if='product.price')
          <!--span.focus-goods-price_main {{ product.price.toFixed(2) - product.price.toFixed(2).substr(-3) }}-->
          span.focus-goods-price_main {{ product.price}}

        .focus-goods-name {{ product.title }}

        .focus-goods-intro {{ product.intro }}

        .focus-goods-info
          cell(v-for='(item, index) in product.parameters' :key='index' :title='item.key' :content='item.value')

        .focus-goods-attentions
          .title 购买提示
          ol
            li(v-for='item in attentions') {{ item }}

    .focus-goods-footer
      span(@click='buyProduct') 购买
</template>

<script>
  import cell from '~components/cell.vue'
  import { mapState } from 'vuex'

  export default {
    // middleware: 'wechat-auth',
    // transition: {
    //   name: 'slide-left'
    // },
    head() {
      return {
        title: '购买页面'
      }
    },
    data() {
      return {
        swiperConfig: {
          autoplay: 4000,
          direction: 'horizontal',
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          }
        },
        attentions: [
          '商品和服务的差异',
          '清关服务',
          '物流服务',
          '需要更多帮助，请联系管理员'
        ]
      }
    },
    computed: {
      ...mapState({
        'imageCDN': 'imageCDN',
        'product': 'currentProduct'
      })
    },
    methods: {
      buyProduct(item) {
        console.log(item)
      }
    },
    beforeCreate() {
      const id = this.$route.query.id
      this.$store.dispatch('showProduct', id)
    },
    components: {
      cell
    }
  }
</script>

<style lang="sass" src='~static/sass/deal.sass'></style>
