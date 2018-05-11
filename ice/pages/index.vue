<template lang="pug">
.container
  .house(ref='house')
    .house-content(v-for='(item, index) in houses' :key='index' @click='focusHouse(item)')
      .house-text
        .words {{ item.words }}
        .cname {{ item.name }}
        .name {{ item.cname }}
  .povCharacters
    .title 主要人物
    .povCharacter-wrapper
      .povCharacter-content(v-for='(item, index) in characters' :key='index' @click='focusCharacters(item)')
        img(:src="item.profile")
        .povCharacter-text
          .cname {{ item.cname }}
          .name {{ item.name }}
          .playedBy {{ item.playedBy }}

  .city
    .city-title 维斯特洛
    .city-intro 坐落于已知世界的最西端，狭长的维斯特洛大陆由北部的极地冰盖起向南延绵约3,000英里。绝境长城是一座巍峨挺立的不可逾越之物，横跨300英里，将最北的塞外地区与七大王国相互分离。一个统一的政治实体领导着南方的广阔土地，并形成九块相互联系又相互割据的区域。
    .city-item(v-for='(item, index) in cities' v-on=key='index')
      .city-item-title {{ item.title }}
      .city-item-body {{ item.body }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: '冰火脸谱'
    }
  },
  computed: {
    ...mapState([
      'houses',
      'characters',
      'cities'
    ])
  },
  methods: {
    focusHouse(item) {
      // 路由跳转到house，附带查询参数id
      this.$router.push({ path: '/house', query: { id: item._id } })
    },
    focusCharacters(item) {
      // 路由跳转到character，附带查询参数id
      this.$router.push({ path: '/character', query: { id: item._id } })
    }
  },
  beforeCreate() {
    // 请求所有家族和主要人物
    this.$store.dispatch('fetchHouses')
    this.$store.dispatch('fetchCharacters')
  }
}

</script>
<style scoped lang="sass" src="~static/sass/index.sass">

</style>
