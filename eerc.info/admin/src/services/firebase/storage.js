import firebase from 'firebase/app'
import 'firebase/storage'

export const storageRef = (storageLocation) => firebase.storage().ref(storageLocation)

export const leagueStorageRef = () => storageRef().child('leagues')
