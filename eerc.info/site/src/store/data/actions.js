import { firestoreAction } from 'vuexfire'
import {
  collectionRefWithFieldCheck
} from 'services/firebase/firestore.js'

export const getLeagues = firestoreAction(({ bindFirestoreRef }) => {
  return bindFirestoreRef('leagues', collectionRefWithFieldCheck('leagues', 'active', true))
})
