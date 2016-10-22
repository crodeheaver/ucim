import router from '../../routes'
import axios from 'axios'

const state = {
  user: {
    authenticated: false
  }
}

const actions = {
  login (email, password) {
    axios.post('/auth/login', {
      email: email,
      password: password
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
