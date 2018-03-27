import Router from 'koa-router'
import sha1 from 'sha1'
import config from '../config'

export const router = app => {
  const router = new Router()
  router.get('/wechat-hear', (ctx, next) => {
    require('../wechat')
    const token = config.wechat.token
    console.log(token)
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query
    const str = [token, timestamp, nonce].sort().join('')
    console.log(str)
    const sha = sha1(str)
    console.log(sha)
    console.log(sha === signature)
    if (sha === signature) {
      ctx.body = echostr
    } else {
      ctx.body = 'Failed'
    }
  })
  app.use(router.routes())
  app.use(router.allowedMethods())
}
