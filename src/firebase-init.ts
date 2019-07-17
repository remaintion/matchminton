import * as firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyB-ErPSz1y07inzAUdXuUcADpT2dKwZwdE',
  authDomain: 'matchminton.firebaseapp.com',
  databaseURL: 'https://matchminton.firebaseio.com',
  projectId: 'matchminton',
  storageBucket: 'matchminton.appspot.com',
  messagingSenderId: '643404324263',
  appId: '1:643404324263:web:25e2846d168e2167',
}
firebase.initializeApp(config)

export default firebase
