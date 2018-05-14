import axios from 'axios'

const baseUrl = ''

class Servives {
  getWechatSignature(url) {
    return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
  }

  getUserByOAuth(url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
  }

  fetchHouses() {
    return axios.get(`${baseUrl}/wiki/houses`)
  }

  fetchCities() {
    // return axios.get(`${baseUrl}/wiki/cities`)
    return {data: {data: []}, success: true}
  }

  fetchCharacters() {
    // return axios.get(`${baseUrl}/wiki/characters`)
    return {data: {data: []}, success: true}
  }

  fetchHouse(id) {
    return axios.get(`${baseUrl}/wiki/houses/${id}`)
  }

  fetchCharacter(id) {
    return axios.get(`${baseUrl}/wiki/characters/${id}`)
  }

  fetchProducts() {
    return axios.get(`${baseUrl}/wiki/products`)
  }

  fetchProduct(id) {
    return axios.get(`${baseUrl}/wiki/products/${id}`)
  }

  fetchUserAndOrders(id) {
    return axios.get(`${baseUrl}/wiki/user`)
  }
}

export default new Servives()
