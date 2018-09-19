import rp from 'request-promise'
import _ from 'lodash'
import { writeFileSync } from 'fs'

let characters = []

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export const getAPICharacters = async (page = 1) => {
  const url = `http://www.ireader.com/index.php?ca=booksort.index&pid=92&cid=142&order=download&status=0&page=${page}`
  console.log('正在爬' + page + '页数据')

  let body = await rp(url)
  body = JSON.parse(body)

  console.log('爬到' + body.length + '条数据')
  characters = _.union(characters, body)
  console.log('现有' + characters.length + '条数据')
  if (body.length < 50) {
    console.log('爬完了')
    return
  } else {
    writeFileSync('./newBooks.json', JSON.stringify(characters, null, 2), 'utf8')
    await sleep(1000)
    page++
    getAPICharacters(page)
  }
}
getAPICharacters()
