const functions = require('firebase-functions')
const firebase = require('firebase-admin')

firebase.initializeApp(functions.config().firebase)

// Account functions:
const account = require('./account.js')
exports.createUserWithEmailAndPassword = account.createUserWithEmailAndPassword
