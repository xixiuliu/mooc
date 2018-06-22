<template lang="pug">
  .container
    .shopping
      .shopping-title 权游周边
      .shopping-list
        .shopping-item(v-for='item in products' @click='showProduct(item)')
          img(:src="imageCDN  + item.images[0] + \'?imageView2/1/format/jpg/q/75|imageslim\'")
          .shopping-item-body
            .title {{item.price}}
            .content {{item.intro}}
            //- .footer
            //-   .material-icon mood
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    // middleware: 'wechat-auth',
    // transition: {
    //   name: 'slide-left'
    // },
    head() {
      return {
        title: '手办商城'
      }
    },
    computed: {
      ...mapState([
        'imageCDN',
        'products'
      ])
    },
    methods: {
      showProduct(item) {
        this.$router.push({
          path: '/deal',
          query: {
            id: item._id
          }
        })
      }
    },
    beforeCreate() {
      this.$store.dispatch('fetchProducts')
    }
  }
</script>

<style lang="sass" src='~static/sass/shopping.sass'></style>
