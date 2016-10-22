import Auth from './modules/auth'
import axios from 'axios'
import _ from 'lodash'
axios.defaults.baseURL = '//localhost:3000/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default {
  debug: process.env.NODE_ENV !== 'production',
  state: {
    players: [],
    teams: []
  },
  actions: _.merge({}, Auth.actions)
}
