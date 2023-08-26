import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCPlbmonMVoxTy5zujgV-FoH1HdJzIsles',
  authDomain: 'transport-806c6.firebaseapp.com',
  projectId: 'transport-806c6',
  storageBucket: 'transport-806c6.appspot.com',
  messagingSenderId: '856271773667',
  appId: '1:856271773667:web:bbd889fe66dfa349308ad6',
  measurementId: 'G-5KYZTLEXM8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export default db;
