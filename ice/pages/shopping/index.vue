<template lang="pug">
  .container
    .shopping
      .shopping-title 权游周边
      .shopping-list
        .shopping-item(v-for='(item, index) in products' :key='index' @click='showProduct(item)')
          img(:src="item.images")
          .shopping-item-body
            .title {{ item.title }}
            .content {{ item.intro }}
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
