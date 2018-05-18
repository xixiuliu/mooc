// import mongoose from 'mongoose'
const mongoose = require('mongoose')
// mongoose.Promise = Promise
// 开启debug
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/test2')

mongoose.connection.on('error', console.error.bind(console, 'connection error'))

mongoose.connection.on('open', () => {
  console.log('mongodb opened')
})

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    default: 0
  }
})

userSchema.pre('save', function (next) {
    this.age++

    next()
})

userSchema.static = {
  async findUser(name) {
      const token = await this.findOne({
          name: name
      }).exec()

      return token
  }
}


mongoose.model('Token2', userSchema)

const Token2 = mongoose.model('Token2')

;(async () => {
    console.log(await Token2.findUser('my'))
})()
