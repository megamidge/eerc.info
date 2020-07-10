import firebase from '../firebase'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ router, store, Vue }) => {
  console.log('Booting up firebase...')
  const cancelUserSync = () => { }
  firebase.auth.onAuthStateChanged(user => {
    store.commit('auth/authReady', true)
    console.log('Auth state changed')
    if (!user) {
      // sign out
      router.push('/login')
      cancelUserSync()
      return
    }
    const userData = {
      id: user.uid,
      email: user.email
    }
    store.commit('auth/signIn', userData)
    // listen for user data changes
    // cancelUserSync = firebase.firestore
    //   .collection('users')
    //   .doc(user.uid)
    //   .onSnapshot(doc => {
    //     const userData = {
    //       id: user.uid,
    //       email: user.email,
    //       ...doc.data()
    //     }
    //   })
  })
  console.log('Booted up firebase')
}
