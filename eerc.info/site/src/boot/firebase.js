import firebaseService from 'services/firebase'

export default ({ router, store, Vue }) => {
  const config = process.env.FIREBASE_CONFIG
  var app = firebaseService.fBInit(config)
  firebaseService.fsInit(app)

  Vue.prototype.$firebase = firebaseService
  store.$firebase = firebaseService

  intialFetches(store)
}

// perform any fetches that need doing right off the bat.
const intialFetches = (store) => {
  store.dispatch('data/getLeagues')
}
