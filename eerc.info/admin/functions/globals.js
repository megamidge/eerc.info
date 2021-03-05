const firebase = require('firebase-admin')

exports.globals = {
  firebase,
  firestore: firebase.firestore()
}
