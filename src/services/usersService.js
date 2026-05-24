import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// البحث عن المستخدمين
export const searchUsers = async (searchTerm) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('displayName', '>=', searchTerm),
      where('displayName', '<=', searchTerm + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return users;
  } catch (error) {
    throw error;
  }
};

// متابعة مستخدم
export const followUser = async (currentUserId, userIdToFollow) => {
  try {
    // إضافة المستخدم إلى قائمة المتابعة
    const currentUserRef = doc(db, 'users', currentUserId);
    await updateDoc(currentUserRef, {
      following: arrayUnion(userIdToFollow),
    });

    // إضافة المتابع إلى قائمة المتابعين
    const userToFollowRef = doc(db, 'users', userIdToFollow);
    await updateDoc(userToFollowRef, {
      followers: arrayUnion(currentUserId),
    });
  } catch (error) {
    throw error;
  }
};

// إلغاء المتابعة
export const unfollowUser = async (currentUserId, userIdToUnfollow) => {
  try {
    // إزالة المستخدم من قائمة المتابعة
    const currentUserRef = doc(db, 'users', currentUserId);
    await updateDoc(currentUserRef, {
      following: arrayRemove(userIdToUnfollow),
    });

    // إزالة المتابع من قائمة المتابعين
    const userToUnfollowRef = doc(db, 'users', userIdToUnfollow);
    await updateDoc(userToUnfollowRef, {
      followers: arrayRemove(currentUserId),
    });
  } catch (error) {
    throw error;
  }
};

// الحصول على المتابعين
export const getFollowers = async (userId) => {
  try {
    const followersRef = collection(db, 'users');
    const q = query(followersRef, where('following', 'array-contains', userId));
    const querySnapshot = await getDocs(q);
    const followers = [];
    querySnapshot.forEach((doc) => {
      followers.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return followers;
  } catch (error) {
    throw error;
  }
};
