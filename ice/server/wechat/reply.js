const tip = 'hello world'
export default async (ctx, next) => {
  const message = ctx.weixin
  let mp = require('../wechat')
  let client = mp.getWechat()

  // console.log(message)
  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      ctx.body = tip
    } else if (message.Event === 'unsubscribe') {
      ctx.body = '取关'
    }
  } else if (message.MsgType === 'text') {
    if (message.Content === '1') {
      let userList = [
        {
          openid: 'olS79wCAja-ZzpFvLOOegWPr00PI',
          lang: 'zh_CN'
        }
      ]
      // const data = await client.handle('createTag', 'vue')
      // const data = await client.handle('fetchTags')
      const data = await client.handle('fetchTagUsers', 2)
      console.log(data)
    }
    ctx.body = message.Content
  } else if (message.MsgType === 'image') {
    ctx.body = {
      type: 'image',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'voice') {
    ctx.body = {
      type: 'voice',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'video') {
    ctx.body = {
      Title: message.ThumbMediaId,
      type: 'video',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'location') {
    ctx.body = message.Location_X + ':' + message.Location_Y + ':' + message.Label
  } else if (message.MsgType === 'link') {
    ctx.body = [{
      title: message.Title,
      description: message.Description,
      url: message.Url
    }]
  }
}
