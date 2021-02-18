import { firestoreAction } from 'vuexfire'
import {
  collectionRef
} from 'services/firebase/firestore.js'

export const getLeagues = firestoreAction(({ bindFirestoreRef }) => {
  return bindFirestoreRef('leagues', collectionRef('leagues'))
})

import leagueModule from '../league'
export function registerLeagueModule (context, league) {
  if (!this.hasModule(league.id)) {
    // only register the module if it doesn't already exist
    this.registerModule(league.id, leagueModule)
  }
}
