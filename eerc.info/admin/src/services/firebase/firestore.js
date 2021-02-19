import firebase from 'firebase/app'
import 'firebase/firestore'

export const firestore = () => firebase.firestore()
export const fsInit = (app) => firebase.firestore(app)

// Logs an action. Can be part of a transaction if a transaction is passed.
const logAction = (action, transaction) => {
  const doc = firestore().collection('logs').doc()
  const data = {
    dateTime: firebase.firestore.Timestamp.now(),
    userEmail: firebase.auth().currentUser.email,
    userId: firebase.auth().currentUser.uid,
    action: action
  }
  if (transaction)
    return transaction.set(doc, data)
  else
    return firestore().collection('logs').doc().set(data)
}

export const collectionRef = (collectionName) => {
  return firestore()
    .collection(collectionName)
}
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

export const publishLeagueChanges = (leagueId, data) => {
  return firestore().runTransaction(transaction => {
    const docRef = leagueDocRef(leagueId)
    transaction.update(docRef, data)

    const action = {
      name: 'publishLeagueChanges',
      data: data
    }
    logAction(action, transaction)

    return Promise.resolve()
  })
}
