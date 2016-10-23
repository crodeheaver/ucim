import router from '../../routes'
import { baseURL, toFormData } from './fetch-config'
import 'whatwg-fetch'

const state = {
  user: {
    authenticated: false
  }
}

const actions = {
  login (username, password) {
    fetch(baseURL + '/auth/login',
      {
        method: 'POST',
        body: toFormData({username, password})
      })
    .then(function (response) {
      localStorage.setItem('token', response.data.token)

      state.authenticated = true
      router.go('players')
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}

export default {
  actions
}
