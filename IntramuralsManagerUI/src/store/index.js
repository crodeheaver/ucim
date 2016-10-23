import Auth from './modules/auth'
import _ from 'lodash'

export default {
  debug: process.env.NODE_ENV !== 'production',
  state: {
    players: [],
    teams: []
  },
  actions: _.merge({}, Auth.actions)
}
