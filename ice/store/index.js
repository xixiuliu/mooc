import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      imageCDN: 'http://p8i0gic8b.bkt.clouddn.com/',
      currentHouse: {},
      currentCharacter: {},
      houses: [],
      products: [],
      currentProduct: [],
      user: null,
      characters: []
    },
    getters,
    actions,
    mutations
  })
}

export default createStore
