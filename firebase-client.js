import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import {
  getAuth,
  initializeAuth,
  signInAnonymously,
  getReactNativePersistence,
} from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

const auth = getAuth(app)
const database = getDatabase(app)

const authenticate = async () => {
  try {
    await signInAnonymously(auth)
  } catch (error) {
    console.error(error)
  }
}

export { authenticate, database, auth }
