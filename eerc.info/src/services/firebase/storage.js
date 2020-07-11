import firebase from 'firebase/app'
import 'firebase/firestore'

export const fsInit = (app) => {
  return firebase.firestore(app)
}

export var unsubscribeLeagues = () => { }
export const listenLeagues = async (store) => {
  return new Promise((resolve, reject) => {
    unsubscribeLeagues = firebase.firestore().collection('leagues')
      .onSnapshot(collection => {
        const dataCollection = []
        collection.docs.map(doc => {
          // console.log('doc', doc.id, doc, doc.data(), doc.getCollections())
          dataCollection.push({
            id: doc.id,
            name: doc.name,
            description: doc.description,
            description_short: doc.description_short,
            ...doc.data()
          })
        })
        store.commit('data/setLeagues', dataCollection)
        resolve()
      }, (error) => {
        if (!firebase.auth().currentUser) { // Error has happened because the user has logged out - we can unsubscribe now :)
          unsubscribeLeagues()
          resolve()
        } else {
          console.error('ERRRRR', error)
          reject(new Error('Something went wrong listening to Leagues collection.'))
        }
      })
  })
}
