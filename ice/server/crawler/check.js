import { resolve } from 'path'
import R from 'ramda'
import { find } from 'lodash'
import { writeFileSync } from 'fs'

let characters = require(resolve(__dirname, '../../characters.json'))
let IMDbData = require(resolve(__dirname, '../../imdb.json'))

const findNameInfoAPI = (item) => {
  return find(characters, {
    name: item.name
  })
}

const findPlayedByInAPI = (item) => {
  return find(characters, i => {
    return i.playedBy.includes(item.playedBy)
  })
}

let validData = R.filter(
  i => findNameInfoAPI(i) && findPlayedByInAPI(i)
)

const IMDb = validData(IMDbData)
writeFileSync('./wikiCharacters.json', JSON.stringify(IMDb, null, 2), 'utf8')
