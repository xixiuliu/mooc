<template lang="pug">
  .container
    .focusHouse-media
      <!--img(v-if='house.cname' :src="item.profile")-->
      .focusHouse-text
        .words {{ house.words }}
        .name {{ house.name }}

    .focusHouse-body
      .focusHouse-item-title {{ house.cname }}
      .focusHouse-item-body {{ house.intro }}

      .focusHouse-item-title 主要角色
      .focusHouse-item-body(v-for='(item, index) in house.swornMembers' :key='index')
        .swornMembers
          img(:src="imageCDN + '%27' + item.character.profile + '%27'")
          .swornMembers-body
            .name {{ item.character.cname }}
            .introduction {{ item.text }}

      .focusHouse-item-section(v-for='(item, index) in house.sections' :key='index')
        .focusHouse-item-title {{ item.title }}
        .focusHouse-item-body(v-for='des in item.content') {{ des }}
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    head() {
      return {
        title: '家族详情'
      }
    },
    computed: {
      ...mapState({
        imageCDN: 'imageCDN',
        house: 'currentHouse'
      })
    },
    beforeCreate() {
      let id = this.$route.query.id

      this.$store.dispatch('showHouse', id)
    }

  }
</script>

<style scoped lang="sass" src="~static/sass/house.sass">

</style>
