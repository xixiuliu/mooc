import mongoose from 'mongoose'
import { resolve } from 'path'
import config from '../config'
import fs from 'fs'
import R from 'ramda'

const models = resolve(__dirname, '../database/schema')

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*js$/))
  .forEach(file => require(resolve(models, file)))

const formaData = R.map(i => {
  i._id = i.nmId

  return i
})

let wikiCharacters = require(resolve(__dirname, '../../completeCharacters.json'))

let wikiHouses = require(resolve(__dirname, '../../completeHouses.json'))


wikiCharacters = formaData(wikiCharacters)
export const database = app => {
  mongoose.set('debug', true)
  mongoose.connect(config.db)
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db)
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })
  mongoose.connection.on('open', async() => {
    console.log('Connected to MongoDB', config.db)

    const WikiHouse = mongoose.model('WikiHouse')
    const WikiCharacter = mongoose.model('WikiCharacter')
    const User = mongoose.model('User')

    const exsitWikiHouses = await WikiHouse.find({}).exec()
    const exsitWikiCharacters = await WikiCharacter.find({}).exec()

    if (!exsitWikiHouses.length) WikiHouse.insertMany(wikiHouses)
    if (!exsitWikiCharacters.length) WikiCharacter.insertMany(wikiCharacters)

    let user = await User.findOne({
      email: 'liuxixiu@qq.com'
    }).exec()

    if (!user) {
      console.log('写入管理员')
      user = new User({
        email: 'liuxixiu@qq.com',
        password: 'xxx1174341971',
        role: 'admin'
      })
      console.log(user)
      await user.save()
    }
  })
}
