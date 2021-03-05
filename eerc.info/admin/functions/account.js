const functions = require('firebase-functions')
const { globals } = require('./globals')

exports.createUserWithEmailAndPassword = functions.region('europe-west2').https.onCall(async (data, context) => {
  return globals.firestore.runTransaction(async (transaction) => {
    if (!data.email) throw new Error('Missing email')
    if (!data.password) throw new Error('Missing password')
    const uEmail = data.email // email for new account
    const uPassword = data.password // password for new account
    // data for new account:
    const userData = {
      staff: false
    }
    await globals.firebase.auth().createUser({ email: uEmail, password: uPassword }).then(async (user) => {
      const uDoc = globals.firestore.collection('users').doc(user.uid)
      transaction.set(uDoc, userData)
      return Promise.resolve()
    }).catch(error => {
      throw new Error(error.message)
    })
  })
    .then(() => {
      return { success: true, message: 'New account created successfully.' }
    }).catch(error => {
      return {
        success: false, message: error.message
      }
    })
})
