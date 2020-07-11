import firebaseService from 'services/firebase'

export default ({ router, store, Vue }) => {
  const config = process.env.environments.FIREBASE_CONFIG
  firebaseService.fBInit(config)

  firebaseService.auth().onAuthStateChanged(user => {
    firebaseService.handleOnAuthStateChanged(store, user)
  }, error => {
    console.error(error)
  })

  firebaseService.routerBeforeEach(router, store)

  Vue.prototype.$fb = firebaseService
  store.$fb = firebaseService

  console.log('Started firebase', firebaseService)
}
