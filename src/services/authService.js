import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';

// تسجيل مستخدم جديد
export const registerUser = async (email, password, userName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // تحديث الملف الشخصي
    await updateProfile(user, {
      displayName: userName,
    });

    // حفظ بيانات المستخدم في Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: userName,
      bio: '',
      avatar: '',
      followers: [],
      following: [],
      createdAt: new Date(),
      posts: 0,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// تسجيل الدخول
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// تسجيل الخروج
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// إرسال رابط استعادة كلمة المرور
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

// الحصول على بيانات المستخدم من Firestore
export const getUserData = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// تحديث الملف الشخصي
export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, updates, { merge: true });
  } catch (error) {
    throw error;
  }
};
