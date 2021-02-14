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

export const leagueDocRef = (leagueId) => {
  return firestore().collection('leagues').doc(leagueId)
}

export const leagueCollectionRef = (leagueId, collectionName) => {
  return leagueDocRef(leagueId)
    .collection(collectionName)
}

export const leagueSeasonRef = (leagueId, seasonId) => {
  return leagueDocRef(leagueId).collection('seasons').doc(seasonId)
}
export const leagueSeasonEventsRef = (leagueId, seasonId) => {
  return leagueSeasonRef(leagueId, seasonId).collection('events')
}

export const leagueSeasonEventRef = (leagueId, seasonId, eventId) => {
  return leagueSeasonRef(leagueId, seasonId).collection('events').doc(eventId)
}

export const leagueSeasonEventSessionsRef = (leagueId, seasonId, eventId, collection) => {
  return leagueSeasonEventRef(leagueId, seasonId, eventId).collection(collection)
}

export const leagueSeasonEventSessionResultsRef = (leagueId, seasonId, eventId, sessionId, sessionsCollectionName) => {
  return leagueSeasonEventSessionsRef(leagueId, seasonId, eventId, sessionsCollectionName).doc(sessionId).collection('results')
}
