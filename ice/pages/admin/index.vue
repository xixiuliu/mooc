<template lang="pug">
  .content
    h3 登录成功
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    middleware: 'auth',
    layout: 'admin',

    head() {
      return {
        title: '后台管理页面'
      }
    },
    computed: mapState([
      'user'
    ])

  }
</script>

<style lang='sass', src='~static/sass/admin.sass', scoped/>
