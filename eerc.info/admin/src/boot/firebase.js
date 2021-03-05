import firebaseService from 'services/firebase'

export default ({ router, store, Vue }) => {
  const config = process.env.environments.FIREBASE_CONFIG
  var app = firebaseService.fBInit(config)
  firebaseService.fsInit(app)
  firebaseService.functionsInit(app)

  firebaseService.auth().onAuthStateChanged(user => {
    firebaseService.handleOnAuthStateChanged(store, user)
  }, error => {
    console.error(error)
  })

  firebaseService.routerBeforeEach(router, store)

  Vue.prototype.$firebase = firebaseService
  store.$firebase = firebaseService

  intialFetches(store)
}

// perform any fetches that need doing right off the bat.
const intialFetches = (store) => {
  store.dispatch('data/getLeagues')
}
