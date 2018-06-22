import qiniu from 'qiniu'
import config from '../config'
import { exec } from 'shelljs'

qiniu.conf.ACCESS_KEY = config.qiniu.AK
qiniu.conf.SECRET_KEY = config.qiniu.SK

const bucket = 'gotmini'

export const uptoken = (key) => {
  console.log(key)
  // return new qiniu.rs.PutPolicy({scope: bucket + ':' + key}).uploadToken()
  return new qiniu.rs.PutPolicy(`${bucket}:${key}`).token()
}

export const fetchImage = async (url, key) => {
  return new Promise((resolve, reject) => {
    const bash = `qshell fetch ${url} ${bucket} '${key}'`
    const child = exec(bash, {async: true})
    child.stdout.on('data', data => {
      console.log(data)
      resolve(data)
    })
  })
}

// export default {
//   fetchImage
// }
