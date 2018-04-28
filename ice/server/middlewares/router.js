import Router from 'koa-router'
import config from '../config'
import { resolve } from 'path'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'

export const router = app => {
  const router = new Router()
  router.all('/wechat-hear', wechatMiddle(config.wechat, reply))

  // router.get('/upload', async (ctx, next) => {
  //   let mp = require('../wechat')
  //   let client = mp.getWechat()
  //
  //   const data = await client.handle('uploadMaterial', 'image', resolve(__dirname, '../../ice.png'))
  //
  //   console.log(data)
  // })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
