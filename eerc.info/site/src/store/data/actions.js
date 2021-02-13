import { firestoreAction } from 'vuexfire'
import {
  collectionRefWithFieldCheck
} from 'services/firebase/firestore.js'

export const getLeagues = firestoreAction(({ bindFirestoreRef }) => {
  return bindFirestoreRef('leagues', collectionRefWithFieldCheck('leagues', 'active', true))
})

import leagueModule from '../league'
export function registerLeagueModule (context, league) {
  if (!this.hasModule(league.id)) {
    // only register the module if it doesn't already exist
    this.registerModule(league.id, leagueModule)
  }
}
