<template lang="pug">
  .container
    .focusCharacters-header
      img.focusCharacters-header-bg(v-if='character.images', :src="imageCDN + '%27' + character.images[0] + '%27'")
      .focusCharacters-media
        img(v-if='character.profile', :src="imageCDN + '%27' + character.profile + '%27'")
        .focusCharacters-text
          .names
            p.cname {{ character.cname }}
            p.name {{ character.name }}
          //- .allegiances
          //-   p 史塔克家族
          //-   p 无面者
          <!--span.born {{ character.nmId }}-->

    .focusCharacters-body
      .focusCharacters-intro
        p {{ character.intro }}}
      .focusCharacter-stills
        img(v-for='item in character.images', :src="imageCDN + '%27' + item + '%27' + '?imageView2/1/w/750/h/460/format/jpg/q/90|imageslim'")

      .focusCharacter-item(v-for='item in character.sections')
        .focusCharacter-item-title {{ item.title }}
        .focusCharacter-item-body(v-for='des in item.content') {{ des }}
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
        title: '家族成员详情'
      }
    },
    computed: {
      ...mapState({
        imageCDN: 'imageCDN',
        character: 'currentCharacter'
      })
    },
    beforeCreate() {
      let id = this.$route.query.id
      console.log(id)
      this.$store.dispatch('showCharacter', id)
    }
  }
</script>

<style scoped lang="sass" src='~static/sass/character.sass'></style>
