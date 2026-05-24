import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { db, realtimeDb } from '../config/firebase';
import { ref, onValue, push, set, update } from 'firebase/database';

// بدء محادثة جديدة
export const startConversation = async (currentUserId, otherUserId, currentUserName, otherUserName) => {
  try {
    // إنشاء معرف فريد للمحادثة
    const conversationId = [currentUserId, otherUserId].sort().join('_');

    // التحقق من وجود المحادثة
    const conversationRef = doc(db, 'conversations', conversationId);
    const conversationSnap = await getDoc(conversationRef);

    if (!conversationSnap.exists()) {
      await setDoc(conversationRef, {
        participants: [currentUserId, otherUserId],
        participantNames: {
          [currentUserId]: currentUserName,
          [otherUserId]: otherUserName,
        },
        createdAt: new Date(),
        lastMessage: '',
        lastMessageTime: new Date(),
      });
    }

    return conversationId;
  } catch (error) {
    throw error;
  }
};

// إرسال رسالة
export const sendMessage = async (conversationId, senderId, senderName, message) => {
  try {
    // حفظ الرسالة في Firestore
    const messagesRef = collection(db, `conversations/${conversationId}/messages`);
    await addDoc(messagesRef, {
      senderId: senderId,
      senderName: senderName,
      text: message,
      createdAt: new Date(),
      read: false,
    });

    // تحديث آخر ��سالة في المحادثة
    const conversationRef = doc(db, 'conversations', conversationId);
    await updateDoc(conversationRef, {
      lastMessage: message,
      lastMessageTime: new Date(),
    });
  } catch (error) {
    throw error;
  }
};

// الاستماع للرسائل في الوقت الفعلي
export const listenToMessages = (conversationId, callback) => {
  try {
    const messagesRef = collection(db, `conversations/${conversationId}/messages`);
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(messages);
    });

    return unsubscribe;
  } catch (error) {
    throw error;
  }
};

// الحصول على المحادثات
export const getConversations = async (userId) => {
  try {
    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', userId),
      orderBy('lastMessageTime', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const conversations = [];
    querySnapshot.forEach((doc) => {
      conversations.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return conversations;
  } catch (error) {
    throw error;
  }
};

// الاستماع للمحادثات في الوقت الفعلي
export const listenToConversations = (userId, callback) => {
  try {
    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', userId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const conversations = [];
      querySnapshot.forEach((doc) => {
        conversations.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(conversations);
    });

    return unsubscribe;
  } catch (error) {
    throw error;
  }
};

// وضع علامة قراءة على الرسالة
export const markMessageAsRead = async (conversationId, messageId) => {
  try {
    const messageRef = doc(db, `conversations/${conversationId}/messages`, messageId);
    await updateDoc(messageRef, {
      read: true,
    });
  } catch (error) {
    throw error;
  }
};
