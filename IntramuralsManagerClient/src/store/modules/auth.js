import { BASE_URL, toFormData, POST_HEADERS } from './config'
import * as types from '../mutation-types'

// initial state
const state = {
  user: {
    isAuthenticated: false
  }
}

// mutations
const mutations = {
  [types.LOGIN] () {
    state.user.isAuthenticated = true
  }
}

const actions = {
  login (context, user) {
    context.$http.post(BASE_URL + '/api/auth/login', toFormData(user), POST_HEADERS)
    .then((response) => {
      localStorage.setItem('token', response.access_token)
      context.$store.commit(types.LOGIN)
    }, (response) => {
      console.log(response)
    })
  }
}

export {
  state,
  mutations,
  actions
}

// login (username, password) {
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
