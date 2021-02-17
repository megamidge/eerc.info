import * as base from './base.js'
import * as email from './email.js'
import * as firestore from './firestore.js'
import * as storage from './storage.js'
export default Object.assign({}, base, email, firestore, storage)
