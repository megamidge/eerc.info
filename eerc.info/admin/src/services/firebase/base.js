import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import { Notify } from 'quasar'
export const auth = () => {
  return firebase.auth()
}

export const fBInit = (config) => {
  return firebase.initializeApp(config)
}

let app = null
export const functionsInit = (inApp) => {
  app = inApp
  return firebase.functions(inApp)
}

export const functions = () => {
  return app.functions('europe-west2')
}

export const ensureHaveCurrentUser = (store) => {
  if (!firebase.auth().currentUser) return false
  if (store.getters['auth/currentUser']) return true
  return new Promise((resolve, reject) => {
    const unsubscribe = store.subscribe((mutation, state) => {
      if (state.auth.currentUser) {
        resolve()
        unsubscribe()
      }
    }, () => {
      reject(new Error('An error occurred while subscribing to store changes.'))
    })
  })
}

export const ensureAuthIsInitialised = async (store) => {
  if (store.state.auth.isReady) return true
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      resolve()
      unsubscribe()
    }, () => {
      reject(new Error('Looks like there is a problem with the firebase service. Please try again later.'))
    })
  })
}

export const isAuthenticated = (store) => {
  return store.state.auth.isAuthenticated
}

export const logoutUser = () => {
  console.log('base')
  return auth().signOut()
}

export const handleOnAuthStateChanged = async (store, currentUser) => {
  const initialAuthState = isAuthenticated(store)
  store.commit('auth/setAuthState', {
    isAuthenticated: currentUser !== null,
    isReady: true
  })
  if (!currentUser && initialAuthState) {
    store.dispatch('auth/routeUserToAuth')
  }
}

export const routerBeforeEach = async (router, store) => {
  router.beforeEach(async (to, from, next) => {
    try {
      await ensureAuthIsInitialised(store)
      await ensureHaveCurrentUser(store)
      const user = store.getters['auth/currentUser']
      if (to.matched.some(record => record.meta.staffOnly)) {
        if (!user) {
          next('/')
        } else if (!user.staff) {
          next('/must-be-staff')
        }
      } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isAuthenticated(store)) {
          next()
        } else {
          next({ path: '/login', query: { source: to.path } })
        }
      } else if (to.path === '/login' && isAuthenticated(store)) {
        next('/')
      } else {
        next()
      }
    } catch (err) {
      console.log('Route error:', err)
      Notify.create({
        message: `${err}`,
        color: 'negative'
      })
    }
  })
}
