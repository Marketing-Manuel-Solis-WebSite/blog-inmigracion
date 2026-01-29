import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDyibjhcbf_yjJx4Q-94FTgYCO0ot2nmVo",
  authDomain: "blog-inmigracion.firebaseapp.com",
  projectId: "blog-inmigracion",
  storageBucket: "blog-inmigracion.firebasestorage.app",
  messagingSenderId: "869528731571",
  appId: "1:869528731571:web:ee4754ba79524ca47395c6",
  measurementId: "G-HV30QS9LVW"
};

// Inicialización Singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// ID de la App para organizar la base de datos
export const APP_ID = 'manuel-solis-blog';

export { app, auth, db, googleProvider };