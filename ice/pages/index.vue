<!--<template lang="pug">-->
<!--.container-->
<!--.house(ref="houses")-->
<!--.items(v-for='(item,index) in houses' v-on:key="index" v-bind:click='showHouse(item)')-->
<!--.desc-->
<!--.words {{item.word}}-->
<!--.cname {{item.cname}}-->
<!--.name {{item.name}}-->
<!--.characters-->
<!--.title 主要人物-->
<!--.section-->
<!--.items(v-for='(item,index) in characters' v-on:key='index' v-bind:click='showCharacter(item)')-->
<!--.desc-->
<!--.cname {{item.cname}}-->
<!--.name {{item.name}}-->
<!--.playedBy {{item.playedBy}}-->
<!--.city-->
<!--.title 维斯特洛-->
<!--.title-intro 维斯特洛是《冰与火之歌》世界的四个已知大陆中最西面的一个，面积与现实世界的南美洲大致相等，形状大致相当于将大不列颠岛横向镜面翻转，然后在东侧接上倒转的爱尔兰岛。整个大陆形状狭长，从南端多恩半岛一直伸展到北端永冬之地的距离至少 3000 英里（以绝境长城的长度对比计算），东西走向最宽处约900英里。维斯特洛东临颤抖海（Shivering Sea）和狭海（Narrow Sea），西临日落之海（Sunset Sea），南临夏日之海（Summer Sea）。因为极端严寒的气候、充满敌意的原住民和危险的奇异物种（比如异鬼），极北地区仍有大片土地未经勘测，北端海岸的所在仍属未知之谜。-->
<!--.city-items(v-for="(item,index) in cities" v-on:key='index')-->
<!--.title {{cities.title}}}-->
<!--.body {{cities.body}}}-->
<!--</template>-->

<!--<script>-->
<!--// import { mapState } from 'vuex'-->

<!--export default {-->
<!--head() {-->
<!--return {-->
<!--title: '冰火脸谱'-->
<!--}-->
<!--},-->
<!--computed: {-->
<!--// ...mapState([-->
<!--//   'houses',-->
<!--//   'characters',-->
<!--//   'cities'-->
<!--// ])-->
<!--}-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--.title-->
<!--{-->
<!--margin: 50px 0;-->
<!--}-->
<!--</style>-->
<template>
  <section class="container">
    <img src="../static/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      This page is loaded from the {{ name }}
    </h1>
    <h2 class="info" v-if="name === 'client'">
      Please refresh the page
    </h2>
    <nuxt-link class="button" to="/">
      About page
    </nuxt-link>
  </section>
</template>
<script>
  export default {
    asyncData({ req }) {
      return {
        name: req ? 'server' : 'client'
      }
    },
    head() {
      return {
        title: `About Page (${this.name}-side)`
      }
    }
  }
</script>

<style scoped>
  .title
  {
    margin-top: 50px;
  }
  .info
  {
    font-weight: 300;
    color: #9aabb1;
    margin: 0;
    margin-top: 10px;
  }
  .button
  {
    margin-top: 50px;
  }
</style>
