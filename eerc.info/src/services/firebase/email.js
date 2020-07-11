import firebase from 'firebase/app'
import 'firebase/auth'

export const createUserWithEmail = async (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export const logoutUser = () => {
  console.log('sign out')
  return firebase.auth().signOut()
}

export const loginWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}
