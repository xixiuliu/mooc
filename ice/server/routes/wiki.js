import Router from 'koa-router'
import mongoose from 'mongoose'
import { controller, get, post } from '../decorator/router'

const WikiHouse = mongoose.model('WikiHouse')
@controller('/wiki')
export class WeChatController {
  @get('/houses')
  async getHouses(ctx, next) {
    const houses = await WikiHouse
      .find({})
      .populate({
        path: 'swornMembers.character',
        select: '_id name cname profile'
      })
      .exec()

    ctx.body = houses
  }

  @get('/houses/:_id')
  async getHouse(ctx, next) {
    const { params } = ctx
    const { _id } = params
    if (!_id) return (ctx.body = {success: false, err: '_id is required'})
    const house = await WikiHouse
      .findOne({
        _id: _id
      })
      .populate({
        path: 'swornMembers.character',
        select: 'name cname profile nmId'
      })
      .exec()

    // ctx.body = {
    //   data: house,
    //   success: true
    // }
    ctx.body = house
  }
}
