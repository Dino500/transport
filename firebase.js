import * as firebase from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPlbmonMVoxTy5zujgV-FoH1HdJzIsles",
  authDomain: "transport-806c6.firebaseapp.com",
  projectId: "transport-806c6",
  storageBucket: "transport-806c6.appspot.com",
  messagingSenderId: "856271773667",
  appId: "1:856271773667:web:bbd889fe66dfa349308ad6",
  measurementId: "G-5KYZTLEXM8",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, app, db };
