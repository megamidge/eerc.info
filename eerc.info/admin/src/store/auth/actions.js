// import firebase from '../../firebase'
export async function register ({ commit }, payload) {
  const $firebase = this.$firebase
  const { email, password } = payload
  return $firebase.createUserWithEmail(email, password)
}
export async function signIn ({ commit }, payload) {
  const $firebase = this.$firebase
  const { email, password } = payload
  return $firebase.loginWithEmail(email, password)
}

export async function logoutUser ({ commit, payload }) {
  const $firebase = this.$firebase
  await $firebase.logoutUser()
}

export function routeUserToAuth () {
  this.$router.push('/login')
}

import { firestoreAction } from 'vuexfire'
import { userRef } from 'services/firebase/firestore'
export const getCurrentUser = firestoreAction(({ bindFirestoreRef }, id) => {
  return bindFirestoreRef('currentUser', userRef(id))
})
export const loseCurrentUser = firestoreAction(({ unbindFirestoreRef }) => {
  return unbindFirestoreRef('currentUser')
})
