// import firebase from '../../firebase'
export async function register ({ commit }, payload) {
  // const email = payload.email
  // const password = payload.password
  // const passwordConfirm = payload.passwordConfirm
  // if (!email.includes('@'))
  //   throw new Error('Email must be a valid email address')
  // if (password.length < 8)
  //   throw new Error('Password must be at least 8 characters.')
  // if (password !== passwordConfirm)
  //   throw new Error('Password and Confirm password must match.')

  // await firebase.auth.createUserWithEmailAndPassword(email, password).catch(error => {
  //   throw new Error(`${error.code}: ${error.message}`)
  // })

  const $firebase = this.$firebase
  const { email, password } = payload
  return $firebase.createUserWithEmail(email, password)
}
export async function signIn ({ commit }, payload) {
  // console.log('Here we are', payload)
  // const email = payload.email
  // const password = payload.password
  // await firebase.auth.signInWithEmailAndPassword(email, password).then(() => {
  // }).catch(error => {
  //   console.log('fug')
  //   throw new Error(`${error.code}: ${error.message}`)
  // })

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
