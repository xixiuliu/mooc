import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentHouse: {},
      currentCharacter: {},
      houses: [],
      products: [],
      currentProduct: [],
      cities: [],
      user: null,
      characters: []
    },
    getters,
    actions,
    mutations
  })
}

export default createStore
