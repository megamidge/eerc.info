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
export function generateID (path) {
  console.log('generateID', firestore().collection(path))
  return firestore().collection(path).doc().id
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
export const publishSeasonChanges = (changes) => {
  // changes is an array in the format { path, id, data }
  // the path indicates where the document is
  // the id is.. the document id
  // the data is the new data that should be in the document
  // if id is undefined, blank, null, we need to create a new document
  // if data blank, undefined, null, we need to DELETE the document
  // if both ID and DATA happen to be blank (shouldn't happen), ignore it honestly.
  return firestore().runTransaction(transaction => {
    changes.forEach(change => {
      var ref
      if (change.id) {
        ref = firestore().collection(change.path).doc(change.id)
      } else {
        ref = firestore().collection(change.path).doc()
      }
      if (change.data) {
        // set (might as well merge it)
        transaction.set(ref, change.data, { merge: true })
      } else {
        // delete
        transaction.delete(ref)
      }
    })

    const action = {
      name: 'publishSeasonChanges',
      data: changes.map(c => ({ ...c, id: c.id ? c.id : 'new' }))
    }
    logAction(action, transaction)
    return Promise.resolve()
  })
}
