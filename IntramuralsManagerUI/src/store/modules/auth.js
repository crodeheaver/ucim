import * as types from '../mutation-types'

// initial state
const state = {
  user: {
    isAuthenticated: false
  }
}

// mutations
const mutations = {
  [types.LOGIN] (state, { products }) {
    state.all = products
  },

  [types.REGISTER] (state, { id }) {
    state.all.find(p => p.id === id).inventory--
  }
}

const actions = {

}

export default {
  actions,
  state,
  mutations
}


//login (username, password) {
//    fetch(baseURL + '/auth/login',
//      {
//        method: 'POST',
//        body: toFormData({username, password})
//      })
//    .then(function (response) {
//      localStorage.setItem('token', response.access_token)

//      state.authenticated = true
//      router.push('players')
//    })
//    .catch(function (error) {
//      console.log(error)
//    })
//  }