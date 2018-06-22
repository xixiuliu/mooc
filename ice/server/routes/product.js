import api from '../api'
import { controller, get, post, put, del } from '../decorator/router'
import xss from 'xss'
import R from 'ramda'

@controller('/api')
export class productController {
  @get('/products')
  async getProducts(ctx, next) {
    let { limit } = ctx.query
    const data = await api.product.getProducts(limit)
    ctx.body = {
      data: data,
      success: true
    }
  }

  @get('/products/:_id')
  async getProduct(ctx, next) {
    const { params } = ctx
    const { _id } = params
    if (!_id) return (ctx.body = {success: false, err: '_id is required'})
    const data = await api.product.getProduct(_id)

    ctx.body = {
      data: data,
      success: true
    }
  }

  @post('/products')
  async postProducts(ctx, next) {
    let product = ctx.request.body

    product = {
      price: xss(product.price),
      title: xss(product.title),
      intro: xss(product.intro),
      images: R.map(xss)(product.images),
      parameters: R.map(
        item => ({
          key: xss(item.key),
          value: xss(item.value)
        })
      )(product.parameters)
    }

    try {
      product = await api.product.save(product)
      ctx.body = {
        data: product,
        success: true
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }

  @put('/products')
  async putProducts(ctx, next) {
    let body = ctx.request.body
    const { _id } = body

    if (!_id) return (ctx.body = {success: false, err: '_id is required'})

    let product = await api.product.getProduct(_id)

    if (!product) {
      return (
        ctx.body = {
          success: false,
          err: 'product not exist'
        }
      )
    }
    product.title = xss(body.title)
    product.price = xss(body.price)
    product.intro = xss(body.intro)
    product.images = R.map(xss)(body.images)
    product.parameters = R.map(
      item => ({
        key: xss(item.key),
        value: xss(item.value)
      })
    )(body.parameters)

    try {
      product = await api.product.update(product)
      ctx.body = {
        success: true,
        data: product
      }
    } catch (e) {
      ctx.throw(501, e)
    }
  }

  @del('/products/:_id')
  async delProducts(ctx, next) {
    const params = ctx.params
    const { _id } = params

    if (!_id) return (ctx.body = {success: false, err: '_id is required'})
    let product = await api.product.getProduct(_id)
    if (!product) {
      return (ctx.body = {success: false, err: 'product not exsit'})
    }
    try {
      await api.product.del(product)
      ctx.body = {
        success: true
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }
}
