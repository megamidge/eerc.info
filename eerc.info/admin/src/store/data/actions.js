import { firestoreAction } from 'vuexfire'
import {
  collectionRef
} from 'services/firebase/firestore.js'

export const getLeagues = firestoreAction(({ bindFirestoreRef }) => {
  return bindFirestoreRef('leagues', collectionRef('leagues'))
})

import leagueModule from '../league'
export function registerLeagueModule (context, leagueId) {
  if (!this.hasModule(leagueId)) {
    // only register the module if it doesn't already exist
    this.registerModule(leagueId, leagueModule)
  }
  if (!this.hasModule(`edit_${leagueId}`)) {
    this.registerModule(`edit_${leagueId}`, leagueModule)
  }
}
