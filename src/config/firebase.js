import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getMessaging } from 'firebase/messaging';

// استبدل بيانات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: 'AIzaSyDfV3X4hZ8kL9mN2oP3qR4sT5uV6wX7yZ8',
  authDomain: 'myogram-app.firebaseapp.com',
  projectId: 'myogram-app',
  storageBucket: 'myogram-app.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef1234567890',
  databaseURL: 'https://myogram-app-default-rtdb.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDb = getDatabase(app);

// Set persistence for web
try {
  setPersistence(auth, browserLocalPersistence);
} catch (error) {
  console.log('Persistence error:', error);
}

export default app;
