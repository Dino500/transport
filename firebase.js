import * as firebase from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  /* Your firebase config */
};

const app = firebase.initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, app, db };
