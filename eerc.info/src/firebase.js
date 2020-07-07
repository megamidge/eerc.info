/* connects to the firebase project where the app is hosted */

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

import config from './firebaseConfig.js'

// initialize firebase
const app = firebase.initializeApp(config.firebase)

let firestore = app.firestore()
firestore.enablePersistence({ synchronizeTabs: true })

export default {
    api: firebase,
    app,
    auth: app.auth(),
    firestore,
    functions: app.functions('europe-west2')
}
