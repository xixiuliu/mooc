<template lang="pug">
  .container
    img(src="~static/images/logo.png")
    .title {{ error.statusCode }}
    .info {{ error.message }}
    nuxt-link.button(to="/" v-if="error.statusCode === 404") 首页
</template>
<script>
export default {
  props: ['error']
}
</script>

<style scoped lang="sass">
.title
  margin-top: 15px
  font-size: 5em
.info
  font-weight: 300
  color: #9aabb1
  margin: 0
.button
  margin-top: 50px
</style>
