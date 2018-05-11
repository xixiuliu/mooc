import cheerio from 'cheerio'
import rp from 'request-promise'
import R from 'ramda'
import _ from 'lodash'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { fetchImage } from '../libs/qiniu'
import randomToken from 'random-token'

const sleep = time => new Promise(resolve => setTimeout(resolve, time))
// const fetchImage = qiniu.fetchImage

const normalizedContent = connect => _.reduce(connect, (acc, item) => {
  if (item.text) acc.push(item.text)

  if (item.elements && item.elements.length) {
    let _acc = normalizedContent(item.elements)

    acc = R.concat(acc, _acc)
  }

  return acc
}, [])

const normalizedSections = R.compose(
  R.nth(1),
  R.splitAt(1),
  R.map(i => ({
    level: i.level,
    title: i.title,
    content: normalizedContent(i.content)
  }))
)

const getWikiId = async data => {
  let query = data.cname || data.name
  const url = `http://zh.asoiaf.wikia.com/api/v1/Search/List?query=${encodeURI(query)}`

  try {
    var res = await rp(url)
  } catch (e) {
    console.log('error:', e)
  }

  res = JSON.parse(res)
  res = res.items[0]

  console.log(query, ':', res.id)
  return R.merge(data, res)
}

const getWikiDetail = async data => {
  const { id } = data
  // let query = data.name || data.cname
  const url = `http://zh.asoiaf.wikia.com/api/v1/Articles/AsSimpleJson?id=${id}`
  let res
  try {
    res = await rp(url)
  } catch (e) {
    console.log(e)
  }
  res = JSON.parse(res)

  const getCNameAndIntro = R.compose(
    i => ({
      cname: i.title,
      intro: R.map(R.prop(['text']))(i.content)
    }),
    R.pick(['title', 'content']),
    R.nth(0),
    R.filter(R.propEq('level', 1)),
    R.prop('sections')
  )

  const getLevel = R.compose(
    R.project(['title', 'content', 'level']),
    R.reject(R.propEq('title', '扩展阅读')),
    R.reject(R.propEq('title', '引用与注释')),
    R.filter(i => i.content.length),
    R.prop('sections')
  )

  // let cnameAndIntro = getCNameAndIntro(res)
  let sections = getLevel(res)
  let body = R.merge(data, getCNameAndIntro(res))

  sections = normalizedSections(sections)

  body.sections = sections
  body.wikiId = id
  return R.pick(['name', 'cname', 'playedBy', 'profile', 'images', 'nmId', 'chId', 'sections', 'intro', 'wikiId', 'words'], body)
}

/**
 * 根据 IMDb.json 这份数据，爬 wiki 上的人物数据，并且整合
 */
export const getWikiCharacters = async() => {
  let data = require(resolve(__dirname, '../../fullCharacters.json'))
  // data = [
  //   data[0],
  //   data[1]
  // ]
  console.log(data.length)
  data = R.map(getWikiId, data)
  data = await Promise.all(data)
  console.log('获取 id')
  // console.log(data[0])
  data = R.map(getWikiDetail, data)
  data = await Promise.all(data)
  console.log('获取 详细资料')
  // console.log(data[0])

  writeFileSync('./finalCharacters.json', JSON.stringify(data, null, 2), 'utf8')
}

export const fetchImageFromIMDb = async () => {
  let IMDbCharacters = require(resolve(__dirname, '../../finalCharacters.json'))
  IMDbCharacters = R.map(async item => {
    let key = `${item.nmId}/${randomToken(32)}`

    await fetchImage(item.profile, key)

    item.profile = key

    for (let i = 0; i < item.images.length; i++) {
      let _key = `${item.nmId}/${randomToken(32)}`
      try {
        await fetchImage(item.images[i], _key)
        console.log(item.images[i])
      } catch (e) {
        console.log(e)
      }
      await sleep(100)

      item.images[i] = _key
    }

    return item
  })(IMDbCharacters)

  IMDbCharacters = await Promise.all(IMDbCharacters)
  console.log('fetchImagesFromA2Q done')
  writeFileSync('./completeCharacters.json', JSON.stringify(IMDbCharacters, null, 4), 'utf8')
}

// fetchImageFromIMDb()

const HOUSES = [
  {
    name: 'House Stark of Winterfell',
    cname: '史塔克家族',
    words: 'Winter is Coming'
  },
  {
    name: 'House Targaryen',
    cname: '坦格利安家族',
    words: 'Fire and Blood'
  },
  {
    name: 'House Lannister of Casterly Rock',
    cname: '兰尼斯特家族',
    words: 'Hear Me Roar!'
  },
  {
    name: 'House Arryn of the Eyrie',
    cname: '艾林家族',
    words: 'As High as Honor'
  },
  {
    name: 'House Tully of the Riverrun',
    cname: '徒利家族',
    words: 'Family, Duty, Honor'
  },
  {
    name: 'House Greyjoy of Pyke',
    cname: '葛雷乔伊家族',
    words: 'We Do Not Sow'
  },
  {
    name: "House Baratheon of Storm's End",
    cname: '风息堡的拜拉席恩家族',
    words: 'Ours is the Fury'
  },
  {
    name: 'House Tyrell of Highgarden',
    cname: '提利尔家族',
    words: 'Growing Strong'
  },
  {
    name: 'House Nymeros Martell of Sunspear',
    cname: '马泰尔家族',
    words: 'Unbowed, Unbent, Unbroken'
  }
]

export const getHouses = async() => {
  let data = R.map(getWikiId, HOUSES)

  data = await Promise.all(data)

  data = R.map(getWikiDetail, data)

  data = await Promise.all(data)

  writeFileSync('./wikiHouses.json', JSON.stringify(data, null, 2), 'utf8')
}

export const getSwornMembers = async () => {
  let houses = require(resolve(__dirname, '../../wikiHouses.json'))
  let characters = require(resolve(__dirname, '../../completeCharacters.json'))

  const findSwornMembers = R.map(R.compose(
    i => _.reduce(i, (acc, item) => {
      acc = acc.concat(item)

      return acc
    }, []),
    R.map(i => {
      let item = R.find(R.propEq('cname', i[0]))(characters)
      return {character: item.nmId, text: i[1]}
    }),
    R.filter(item => R.find(R.propEq('cname', item[0]))(characters)),
    R.map(i => {
      let item = i.split('，')
      let name = item.shift()

      return [name.replace(/(【|】|爵士|一世女王|三世国王|公爵|国王|王后|夫人|公主|王子)/g, ''), item.join('，')]
    }),
    R.nth(1),
    R.splitAt(1),
    R.prop('content'),
    R.nth(0),
    R.filter(i => R.test(/伊耿历三世纪末的/, i.title)),
    R.prop('sections')
  ))

  let swornMembers = findSwornMembers(houses)

  houses = _.map(houses, (item, index) => {
    item.swornMembers = swornMembers[index]
    return item
  })
  // console.log(houses)
  writeFileSync('./completeHouses.json', JSON.stringify(houses, null, 2), 'utf8')
}
getSwornMembers()
