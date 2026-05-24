# إعداد Firebase

## خطوات إعداد Firebase للمشروع

### 1. إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. انقر على "Create Project"
3. أدخل اسم المشروع: `myogram-app`
4. اتبع الخطوات حتى الانتهاء

### 2. تفعيل Authentication (المصادقة)

1. في الشريط الجانبي، اذهب إلى "Authentication"
2. انقر على "Get Started"
3. فعّل "Email/Password"
4. فعّل "Google" (اختياري)

### 3. إنشاء Firestore Database

1. اذهب إلى "Firestore Database"
2. انقر على "Create Database"
3. اختر "Start in production mode"
4. اختر منطقة قريبة منك
5. انقر "Create"

### 4. إنشاء Realtime Database

1. اذهب إلى "Realtime Database"
2. انقر على "Create Database"
3. اختر موقع المنطقة
4. اختر "Start in locked mode"

### 5. تفعيل Storage

1. اذهب إلى "Storage"
2. انقر على "Get Started"
3. ابدأ بقواعد الأمان المقفلة
4. انقر "Done"

### 6. نسخ بيانات الاتصال

1. اذهب إلى إعدادات المشروع (⚙️)
2. اختر "Project Settings"
3. في قسم "Your apps"، انقر على تطبيق الويب (</> )
4. انسخ كود الإعدادات

### 7. تحديث ملف firebase.js

استبدل البيانات في `src/config/firebase.js` ببيانات مشروعك:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL",
};
```

### 8. تعديل قواعس الأمان للـ Firestore

اذهب إلى Firestore → Rules وأضف:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح للمستخدمين بقراءة وكتابة بيانات أنفسهم
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // السماح بقراءة الريلز من الجميع
    match /reels/{document=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // السماح بقراءة المحادثات
    match /conversations/{document=**} {
      allow read: if true;
      allow create, write: if request.auth != null;
    }
    
    // السماح بقراءة الإشعارات
    match /notifications/{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

### 9. تعديل قواعس الأمان للـ Storage

اذهب إلى Storage → Rules وأضف:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /reels/{userId}/{allPaths=**} {
      allow read: if true;
      allow create, delete: if request.auth.uid == userId;
    }
    
    match /thumbnails/{userId}/{allPaths=**} {
      allow read: if true;
      allow create, delete: if request.auth.uid == userId;
    }
  }
}
```

### 10. تثبيت المتطلبات

```bash
npm install
```

## ✅ تم الإعداد!

الآن أنت جاهز لاستخدام Firebase في تطبيقك!
