import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  doc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// تحميل فيديو جديد
export const uploadReel = async (userId, videoUri, description, thumbnail) => {
  try {
    const timestamp = new Date().getTime();
    const videoFileName = `reels/${userId}/${timestamp}.mp4`;
    const thumbnailFileName = `thumbnails/${userId}/${timestamp}.jpg`;

    // تحميل الفيديو
    const videoRef = ref(storage, videoFileName);
    const videoResponse = await fetch(videoUri);
    const videoBlob = await videoResponse.blob();
    await uploadBytes(videoRef, videoBlob);
    const videoUrl = await getDownloadURL(videoRef);

    // تحميل الصورة المصغرة
    let thumbnailUrl = '';
    if (thumbnail) {
      const thumbnailRef = ref(storage, thumbnailFileName);
      const thumbnailResponse = await fetch(thumbnail);
      const thumbnailBlob = await thumbnailResponse.blob();
      await uploadBytes(thumbnailRef, thumbnailBlob);
      thumbnailUrl = await getDownloadURL(thumbnailRef);
    }

    // حفظ البيانات في Firestore
    const reelData = {
      userId: userId,
      videoUrl: videoUrl,
      thumbnailUrl: thumbnailUrl,
      description: description,
      likes: [],
      comments: [],
      shares: 0,
      views: 0,
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, 'reels'), reelData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// الحصول على الريلز
export const getReels = async (limit = 10) => {
  try {
    const q = query(
      collection(db, 'reels'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const reels = [];
    querySnapshot.forEach((doc) => {
      reels.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return reels.slice(0, limit);
  } catch (error) {
    throw error;
  }
};

// إضافة إعجاب
export const likeReel = async (reelId, userId) => {
  try {
    const reelRef = doc(db, 'reels', reelId);
    await updateDoc(reelRef, {
      likes: arrayUnion(userId),
    });
  } catch (error) {
    throw error;
  }
};

// إزالة إعجاب
export const unlikeReel = async (reelId, userId) => {
  try {
    const reelRef = doc(db, 'reels', reelId);
    await updateDoc(reelRef, {
      likes: arrayRemove(userId),
    });
  } catch (error) {
    throw error;
  }
};

// إضافة تعليق
export const addComment = async (reelId, userId, text, userAvatar, userName) => {
  try {
    const reelRef = doc(db, 'reels', reelId);
    const comment = {
      userId: userId,
      text: text,
      userAvatar: userAvatar,
      userName: userName,
      createdAt: new Date(),
    };
    await updateDoc(reelRef, {
      comments: arrayUnion(comment),
    });
  } catch (error) {
    throw error;
  }
};

// زيادة عدد المشاهدات
export const incrementViews = async (reelId) => {
  try {
    const reelRef = doc(db, 'reels', reelId);
    await updateDoc(reelRef, {
      views: increment(1),
    });
  } catch (error) {
    throw error;
  }
};
