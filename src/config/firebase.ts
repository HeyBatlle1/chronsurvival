import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  persistentLocalCache,
  persistentMultipleTabManager
} from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAuqmOGQyMnqV4juURtwOMKoSDAFMr4Fvw",
  authDomain: "copper-verbena-460319-e5.firebaseapp.com",
  projectId: "copper-verbena-460319-e5",
  storageBucket: "copper-verbena-460319-e5.appspot.com",
  messagingSenderId: "293513311055",
  appId: "1:293513311055:web:81d852be74dd292fedcb3a",
  measurementId: "G-FJ0B2CW6SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported
let analytics = null;
isSupported().then(yes => yes && (analytics = getAnalytics(app)));

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore with persistence settings
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  })
});

// Export analytics
export { analytics };