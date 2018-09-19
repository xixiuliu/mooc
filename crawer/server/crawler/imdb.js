import cheerio from 'cheerio'
import rp from 'request-promise'
import R from 'ramda'
import { writeFileSync, readFileSync } from 'fs'

let fs = require('fs')

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export const getArticle = async(page = 1) => {
  const options = {
    uri: `http://www.ireader.com/index.php?ca=booksort.index&pid=92&cid=142&order=download&status=0&page=${page}`,
    transform: body => cheerio.load(body)
  }

  let books = []

  const $ = await rp(options)
  console.log($('ul.newShow li').length)

  $('ul.newShow li').each(function () {
    const bidDom = $(this).find('a:first-child')
    const link = bidDom.attr('href')
    const bid = bidDom.attr('href')
    const coverDom = $(this).find('a:first-child img')
    const cover = coverDom.attr('src')
    const titleDom = $(this).find('.bookMation h3 a')
    const title = titleDom.text()
    const authorDom = $(this).find('.bookMation .tryread')
    const author = authorDom.text()
    const descriptionDom = $(this).find('.bookMation .introduce')
    const description = descriptionDom.text()

    books.push({
      link,
      bid,
      cover,
      title,
      author,
      description
    })
  })
  console.log('正在爬第' + page + '页数据')
  console.log('共拿到' + books.length + '条数据')
  const fn = R.compose(
    R.map((book) => {
      book.bid = book.bid.split('&')[2].split('=')[1]
      book.author = book.author.split('试读')[0]
      return book
    }),
    R.filter(book => book.bid && book.cover && book.title && book.author && book.description)
  )
  books = fn(books)
  console.log('最后剩下' + books.length + '条数据')
  if (page > 50) {
    console.log('么有了')
    return
  }

  console.log(fs.existsSync('./books.json'))
  if (fs.existsSync('./books.json')) {
    const booksResult = JSON.parse(readFileSync('./books.json'))
    if (!booksResult) {
      writeFileSync('./books.json', JSON.stringify(books, null, 2), 'utf-8')
      await sleep(1000)
      page++
      getArticle(page)
    }
    booksResult.push(books)
    writeFileSync('./books.json', JSON.stringify(booksResult, null, 2), 'utf-8')
    await sleep(1000)
    page++
    getArticle(page)
  } else {
    writeFileSync('./books.json', JSON.stringify(books, null, 2), 'utf-8')
    await sleep(1000)
    page++
    getArticle(page)
  }
}

getArticle()
