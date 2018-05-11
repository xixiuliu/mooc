import cheerio from 'cheerio'
import rp from 'request-promise'
import R from 'ramda'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
// import Agent from 'socks5-http-client/lib/Agent'

const sleep = time => new Promise(resolve => setTimeout(resolve, time))
export const getIMDBCharacters = async () => {
  const options = {
    uri: 'https://www.imdb.com/title/tt0944947/fullcredits?ref_=tt_cl_sm#cast',
    // agentClass: Agent,
    // agentOptions: {
    //   socksHost: 'localhost',
    //   sockPort: '1080'
    // },
    transform: body => cheerio.load(body)
  }

  const $ = await rp(options)
  let photos = []
  $('table.cast_list tr.odd, tr.even').each(function () {
    const nmIdDom = $(this).find('td.itemprop a')

    const nmId = nmIdDom.attr('href')

    const characterDom = $(this).find('td.character a:first-child')
    const name = characterDom.text()
    const chId = characterDom.attr('href')

    const playedByDom = $(this).find('td.itemprop span.itemprop')
    const playedBy = playedByDom.text()

    photos.push({
      nmId,
      name,
      chId,
      playedBy
    })
  })

  console.log('共拿到' + photos.length + '条数据')
  const fn = R.compose(
    R.map((photo) => {
      const reg1 = /\/name\/(.*?)\/\?ref/
      // const reg2 = /\/title\/(.*?)\/characters/
      const match1 = photo.nmId.match(reg1)
      // const match2 = photo.chId.match(reg2)

      photo.nmId = match1[1]
      photo.chId = photo.chId.split('/')[2]

      return photo
    }),
    R.filter(photo => photo.playedBy && photo.chId && photo.name && photo.nmId)
  )

  photos = fn(photos)

  console.log('清洗后，剩余' + photos.length + '条数据')
  writeFileSync('./imdb.json', JSON.stringify(photos, null, 2), 'utf8')
}

const fetchIMDbProfile = async (url) => {
  const options = {
    uri: url,
    // agentClass: Agent,
    // agentOptions: {
    //   socksHost: 'localhost',
    //   sockPort: '1080'
    // },
    transform: body => cheerio.load(body)
  }

  const $ = await rp(options)
  const img = $('.media_index_thumb_list a:first-child').find('img')
  let src = img.attr('src')

  if (src) {
    src = src.split('_V1').shift()
    src += '_V1.jpg'
  }

  return src
}
const fetchIMDbImage = async (url) => {
  const options = {
    uri: url,
    transform: body => cheerio.load(body)
  }
  const $ = await rp(options)

  let images = []
  $('.media_index_thumb_list a img').each(function () {
    let src = $(this).attr('src')
    if (src) {
      src = src.split('_V1').shift()
      src += '_V1.jpg'
      images.push(src)
    }
  })
  return images
}

export const getIMDBProfile = async () => {
  const characters = require(resolve(__dirname, '../../wikiCharacters.json'))
  console.log(characters.length)
  for (let i = 0; i < characters.length; i++) {
    if (!characters[i].profile) {
      const url = `https://www.imdb.com/title/${characters[i].chId}/characters/${characters[i].nmId}`
      console.log('正在爬取' + characters[i].name)
      const src = await fetchIMDbProfile(url)
      console.log('已经爬到' + src)
      characters[i].profile = src
      writeFileSync('./imdbcharacters.json', JSON.stringify(characters, null, 2), 'utf8')
      await sleep(500)
    }
  }
}

export const checkIMDBProfile = async () => {
  const characters = require(resolve(__dirname, '../../imdbCharacters.json'))
  const newCharacters = []
  characters.forEach((item) => {
    if (item.profile) {
      newCharacters.push(item.name)
    }
  })
  writeFileSync('./validcharacters.json', JSON.stringify(characters, null, 2), 'utf8')
}

export const getIMDBImages = async () => {
  const characters = require(resolve(__dirname, '../../validCharacters.json'))
  console.log(characters.length)
  for (let i = 0; i < characters.length; i++) {
    if (!characters[i].images) {
      const url = `https://www.imdb.com/title/${characters[i].chId}/characters/${characters[i].nmId}`
      console.log('正在爬取' + characters[i].name)
      const images = await fetchIMDbImage(url)
      console.log('已经爬到' + images.length)
      characters[i].images = images
      writeFileSync('./fullcharacters.json', JSON.stringify(characters, null, 2), 'utf8')
      await sleep(500)
    }
  }
}

getIMDBImages()
// getIMDBProfile()
// getIMDBCharacters()