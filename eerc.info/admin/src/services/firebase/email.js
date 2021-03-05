import firebase from 'firebase/app'
import 'firebase/auth'
import { functions } from './base'
export const createUserWithEmail = async (email, password) => {
  return functions().httpsCallable('createUserWithEmailAndPassword')({ email: email, password: password })
}

export const logoutUser = () => {
  console.log('sign out')
  return firebase.auth().signOut()
}

export const loginWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}
