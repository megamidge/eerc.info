import firebase from 'firebase/app'
import 'firebase/firestore'

export const firestore = () => firebase.firestore()
export const fsInit = (app) => firebase.firestore(app)

// gets reference to collection of documents that match 'field' == 'value'
export const collectionRefWithFieldCheck = (collectionName, field, value) => {
  return firestore()
    .collection(collectionName)
    .where(field, '==', value)
}
