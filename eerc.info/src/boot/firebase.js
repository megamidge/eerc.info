import firebase from '../firebase'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ store }) => {
  console.log('Booting up firebase...')
  const cancelUserSync = () => { }
  firebase.auth.onAuthStateChanged(user => {
    console.log('Auth state changed')
    if (!user) {
      // sign out
      cancelUserSync()
      return
    }
    const userData = {
      id: user.uid,
      email: user.email
    }
    store.commit('user/signIn', userData)
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
