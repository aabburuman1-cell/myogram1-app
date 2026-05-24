import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// إضافة إشعار
export const addNotification = async (userId, type, actionUserId, actionUserName, reelId = null) => {
  try {
    const notification = {
      userId: userId,
      type: type, // 'like', 'follow', 'comment'
      actionUserId: actionUserId,
      actionUserName: actionUserName,
      reelId: reelId,
      read: false,
      createdAt: new Date(),
    };

    await addDoc(collection(db, 'notifications'), notification);
  } catch (error) {
    throw error;
  }
};

// الحصول على الإشعارات
export const getNotifications = async (userId) => {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const notifications = [];
    querySnapshot.forEach((doc) => {
      notifications.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return notifications;
  } catch (error) {
    throw error;
  }
};

// الاستماع للإشعارات في الوقت الفعلي
export const listenToNotifications = (userId, callback) => {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notifications = [];
      querySnapshot.forEach((doc) => {
        notifications.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(notifications);
    });

    return unsubscribe;
  } catch (error) {
    throw error;
  }
};

// تحديد الإشعار كمقروء
export const markNotificationAsRead = async (notificationId) => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      read: true,
    });
  } catch (error) {
    throw error;
  }
};
