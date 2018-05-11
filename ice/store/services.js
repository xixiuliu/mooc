import axios from 'axios'

const baseUrl = ''
const apiUrl = 'http://rap2api.taobao.org/app/mock/8388'

class Servives {
  getWechatSignature(url) {
    return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
  }

  getUserByOAuth(url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
  }

  fetchHouses() {
    return axios.get(`${apiUrl}/wiki/houses`)
  }

  fetchCities() {
    return axios.get(`${apiUrl}/wiki/cities`)
  }

  fetchCharacters() {
    return axios.get(`${apiUrl}/wiki/characters`)
  }

  fetchHouse(id) {
    return axios.get(`${apiUrl}/wiki/houses/${id}`)
  }

  fetchCharacter(id) {
    return axios.get(`${apiUrl}/wiki/characters/${id}`)
  }

  fetchProducts() {
    return axios.get(`${apiUrl}/wiki/products`)
  }

  fetchProduct(id) {
    return axios.get(`${apiUrl}/wiki/products/${id}`)
  }

  fetchUserAndOrders(id) {
    return axios.get(`${apiUrl}/wiki/user`)
  }
}

export default new Servives()
