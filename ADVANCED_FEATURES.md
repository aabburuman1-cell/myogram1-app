# محدثات MyoGram v2.0

## ما الجديد

### 1. 🎥 واجهة تحميل الفيديوهات المتقدمة

**UploadReelScreen.js**
- اختيار الفيديو بسهولة
- تحميل اللقطات المبقرة (Thumbnail)
- 5 مرشحات للفيديو
- توصيف مع عداد الأحرف
- عرض نسبة الرفع
- زر رفع مع تأنيب تحميل

### 2. 📸 نظام الصور والمرشحات

**ImageFiltersScreen.js**
- 12 مرشح مختلفة:
  - المتوسط (Original)
  - الإضاءة (Brightness)
  - التباين (Contrast)
  - التشبع (Saturation)
  - عتيق (Vintage)
  - بني (Sepia)
  - رمادي (Grayscale)
  - ضبابي (Blur)
  - تحديد (Sharpen)
  - بارد (Cool)
  - دافئ (Warm)
  - عكس (Invert)
- التحكم بعملاقة المرشح (0-100%)
- عرض مباشر لللقطة الفيديو

### 3. 🔔 نظام إشعارات متقدم

**AdvancedNotificationsScreen.js**
- تصنيف الإشعارات حسب النوع:
  - الإعجابات
  - المتابعات
  - التعليقات
  - إشعارات أخرى
- علامات مرئية للرسالة غير المقروءة
- بحث للإشعارات
- خيارات إعدادات
- عرض مجمع أو قائمة

### 4. 🌛 الوضع المظلم (Dark Mode)

**ThemeContext.js**
- سياق مركزي لإدارة الموضوع
- تبديل سريع بين الوضع العاعل والمظلم
- ألوان منسقة لكل وضع
- Hook بسيط `useTheme()`

### 5. 🌐 دعم لغات متعددة

**LanguageContext.js**
- دعم العربية والإنجليزية
- أكثر من 100 برنامج مرجي
- تبديل فوري لللغة
- Hook `useLanguage()` لسهولة الاسخدام

### 6. ⚙️ شاشة الإعدادات

**SettingsScreen.js**
- تبديل الوضع (مظلم/عادي)
- اختيار اللغة
- إعدادات الحساب
- خيارات الخصوصية
- زر تسجيل الخروج

## 👀 معاير التعاريف للربط مع المحافظ

```javascript
// App.js - إضافة مزودي السياق
<ThemeProvider>
  <LanguageProvider>
    <AuthProvider>
      <MessageProvider>
        {/* App Navigation */}
      </MessageProvider>
    </AuthProvider>
  </LanguageProvider>
</ThemeProvider>
```

## مثال على الاستخدام في المكونات

```javascript
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { isDark, toggleTheme } = useTheme();
  const { t, language, changeLanguage } = useLanguage();

  return (
    <View style={{ backgroundColor: isDark ? '#000' : '#fff' }}>
      <Text>{t('welcome')}</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text>{isDark ? 'Light' : 'Dark'}</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## هام جدا

- جميع المرافق موضع مظلم ببالفطرة 
- جميع النصوص مترجمة بالكامل
- مرنة عالية لالإضافات المستقبلية
