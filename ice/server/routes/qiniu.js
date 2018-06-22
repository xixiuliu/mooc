import { controller, get } from '../decorator/router'
import * as qiniu from '../libs/qiniu'

@controller('/qiniu')
export class qiniuController {
  @get('token')
  async qiniuToken(ctx, next) {
    let key = ctx.query.key
    let token = qiniu.uptoken(key)

    ctx.body = {
      success: true,
      data: {
        key: key,
        token: token
      }
    }
  }
}
