import React, { createContext, useState } from 'react';

const translations = {
  ar: {
    // Common
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    done: 'تم',
    error: 'خطأ',
    success: 'نجاح',
    loading: 'جاري التحميل...',
    
    // Login
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    login: 'دخول',
    signup: 'إنشاء حساب',
    forgot_password: 'هل نسيت كلمة المرور؟',
    no_account: 'ليس لديك حساب؟',
    fill_all_fields: 'ملء جميع الحقول',
    
    // Upload Reel
    upload_reel: 'رفع ريل',
    select_video: 'اختر الفيديو',
    video_selected: 'تم اختيار الفيديو',
    max_size: 'الحد الأقصى 100MB',
    change: 'تغيير',
    thumbnail: 'الصورة المبقرة',
    choose_thumbnail: 'اختر صورة',
    thumbnail_selected: 'تم اختيار الصورة',
    filters: 'المرشحات',
    no_filter: 'بدون مرشح',
    vintage: 'عتيق',
    sepia: 'بني',
    grayscale: 'رمادي',
    blur: 'ضبابي',
    description: 'الوصف',
    write_description: 'اكتب وصفا لريلك...',
    uploading: 'جاري الرفع...',
    upload_now: 'ارفع الآن',
    reel_uploaded_successfully: 'تم رفع الريل بنجاح',
    
    // Image Filters
    image_filters: 'مرشحات الصور',
    select_image_to_filter: 'اختر صورة لتطبيق مرشح',
    original: 'الأصلي',
    brightness: 'الإضاءة',
    contrast: 'التباين',
    saturation: 'التشبع',
    intensity: 'العملاقة',
    available_filters: 'المرشحات المتاحة',
    increase_light: 'زيادة الإضاءة',
    adjust_contrast: 'تعديل التباين',
    adjust_colors: 'تعديل الألوان',
    classic_look: 'مظهر كلاسيكي',
    warm_tone: 'ربطة دافئة',
    black_white: 'بأبيض وأسود',
    soft_focus: 'ركوز ناعم',
    increase_clarity: 'زيادة الوضوح',
    blue_tone: 'ربطة زرقاء',
    orange_tone: 'ربطة برتقالية',
    negative_effect: 'تأثير سالب',
    apply_filter: 'تطبيق المرشح',
    sharpen: 'تحديد',
    cool: 'بارد',
    warm: 'دافئ',
    invert: 'عكس',
    no_changes: 'بدون تغييرات',
    
    // Notifications
    notifications: 'الإشعارات',
    all: 'الكل',
    likes: 'الإعجابات',
    follows: 'المتابعات',
    comments: 'التعليقات',
    liked_your_post: 'أعجب بمنشورك',
    started_following_you: 'بدأ متابعتك',
    commented_on_your_post: 'علق على منشورك',
    shared_your_post: 'شارك منشورك',
    mentioned_you: 'أشار إليك',
    new_notification: 'إشعار جديد',
    no_notifications: 'لا توجد إشعارات',
    grouped: 'مجمعة',
    all_list: 'الكل',
    other: 'آخرى',
    
    // Settings
    settings: 'الإعدادات',
    language: 'اللغة',
    theme: 'المظهر',
    dark_mode: 'الوضع المظلم',
    light_mode: 'الوضع الفاتح',
    account: 'الحساب',
    privacy: 'الخصوصية',
    logout: 'تسجيل الخروج',
  },
  en: {
    // Common
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    done: 'Done',
    error: 'Error',
    success: 'Success',
    loading: 'Loading...',
    
    // Login
    email: 'Email',
    password: 'Password',
    login: 'Login',
    signup: 'Sign Up',
    forgot_password: 'Forgot Password?',
    no_account: "Don't have an account?",
    fill_all_fields: 'Please fill all fields',
    
    // Upload Reel
    upload_reel: 'Upload Reel',
    select_video: 'Select Video',
    video_selected: 'Video Selected',
    max_size: 'Max size 100MB',
    change: 'Change',
    thumbnail: 'Thumbnail',
    choose_thumbnail: 'Choose a thumbnail',
    thumbnail_selected: 'Thumbnail Selected',
    filters: 'Filters',
    no_filter: 'No Filter',
    vintage: 'Vintage',
    sepia: 'Sepia',
    grayscale: 'Grayscale',
    blur: 'Blur',
    description: 'Description',
    write_description: 'Write description for your reel...',
    uploading: 'Uploading...',
    upload_now: 'Upload Now',
    reel_uploaded_successfully: 'Reel uploaded successfully',
    
    // Image Filters
    image_filters: 'Image Filters',
    select_image_to_filter: 'Select an image to apply filters',
    original: 'Original',
    brightness: 'Brightness',
    contrast: 'Contrast',
    saturation: 'Saturation',
    intensity: 'Intensity',
    available_filters: 'Available Filters',
    increase_light: 'Increase light',
    adjust_contrast: 'Adjust contrast',
    adjust_colors: 'Adjust colors',
    classic_look: 'Classic look',
    warm_tone: 'Warm tone',
    black_white: 'Black & White',
    soft_focus: 'Soft focus',
    increase_clarity: 'Increase clarity',
    blue_tone: 'Blue tone',
    orange_tone: 'Orange tone',
    negative_effect: 'Negative effect',
    apply_filter: 'Apply Filter',
    sharpen: 'Sharpen',
    cool: 'Cool',
    warm: 'Warm',
    invert: 'Invert',
    no_changes: 'No changes',
    
    // Notifications
    notifications: 'Notifications',
    all: 'All',
    likes: 'Likes',
    follows: 'Follows',
    comments: 'Comments',
    liked_your_post: 'Liked your post',
    started_following_you: 'Started following you',
    commented_on_your_post: 'Commented on your post',
    shared_your_post: 'Shared your post',
    mentioned_you: 'Mentioned you',
    new_notification: 'New notification',
    no_notifications: 'No notifications',
    grouped: 'Grouped',
    all_list: 'All',
    other: 'Other',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    dark_mode: 'Dark Mode',
    light_mode: 'Light Mode',
    account: 'Account',
    privacy: 'Privacy',
    logout: 'Logout',
  },
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
