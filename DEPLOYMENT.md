# 🚀 نشر المشروع على Netlify

## ✅ المتطلبات

- حساب GitHub (مجاني)
- حساب Netlify (مجاني)
- المشروع على GitHub

---

## 📋 الخطوات (5 دقائق)

### الخطوة 1️⃣: رفع المشروع على GitHub

```bash
# إذا لم تكن قد حملت git
git init
git add .
git commit -m "Initial commit: سجل الغياب"
git branch -M main

# أضف مستودع GitHub
git remote add origin https://github.com/username/sojel-gheyab.git
git push -u origin main
```

### الخطوة 2️⃣: الدخول إلى Netlify

1. اذهب إلى: **https://app.netlify.com**
2. اضغط **Sign up** (إنشاء حساب جديد)
3. اختر **Sign up with GitHub**
4. وافق على الصلاحيات

### الخطوة 3️⃣: ربط المشروع

1. بعد تسجيل الدخول، اضغط **Add new site**
2. اختر **Import an existing project**
3. اختر **GitHub**
4. اختر المستودع `sojel-gheyab`

### الخطوة 4️⃣: تكوين البناء

Netlify سيكتشف `netlify.toml` تلقائيًا. تحقق من:
- **Build command:** `npm run build` ✅
- **Publish directory:** `dist` ✅
- **Node version:** 18 ✅

اضغط **Deploy site**

### الخطوة 5️⃣: انتظر النشر ✅

Netlify سينشر المشروع في 1-2 دقيقة.

---

## 🎉 النتيجة

ستحصل على رابط مثل:
```
https://سجل-الغياب.netlify.app
```

---

## 📊 خيارات إضافية

### تغيير اسم الموقع

1. اذهب إلى **Site settings**
2. اختر **Change site name**
3. أدخل اسمًا مثل: `sojel-gheyab`
4. سيصبح الرابط: `https://sojel-gheyab.netlify.app`

### إضافة نطاق مخصص

1. في **Site settings** → **Domain management**
2. اضغط **Add custom domain**
3. أدخل نطاقك (مثل: `sojel-gheyab.com`)
4. اتبع التعليمات للتحقق

### استخدام نطاق مجاني

يمكنك الحصول على نطاق مجاني من:
- **Freenom:** (نطاقات `.ml`, `.ga`, `.cf`)
- **eu.org:** (نطاقات `.eu.org` مجانية)

---

## 🔄 نشر التحديثات

عندما تعدل الكود وترفعه على GitHub:

```bash
git add .
git commit -m "إضافة ميزة جديدة"
git push origin main
```

**Netlify سينشر التحديثات تلقائيًا!** ✨

---

## 🐛 حل المشاكل

### مشكلة: البناء يفشل

**الحل:**
```bash
# تحقق من البناء محليًا
npm run build

# اعرض رسالة الخطأ في Netlify:
# Site settings → Build & deploy → Builds
```

### مشكلة: الصفحة تعرض 404

**الحل:** ملف `netlify.toml` يعيد جميع الطلبات إلى `index.html` ✅

### مشكلة: البيانات تختفي بعد التحديث

**الحل:** البيانات في `localStorage` محلية - هذا طبيعي
- استخدم **تصدير النسخة الاحتياطية** قبل تحديث المتصفح

---

## 📈 الميزات المجانية في Netlify

✅ نطاق مجاني: `*.netlify.app`  
✅ HTTPS تلقائي  
✅ نشر تلقائي من GitHub  
✅ معاينة مسبقة للـ PRs  
✅ 300 دقيقة بناء شهريًا  
✅ دعم التشغيل العكسي (Redirects)  

---

## 🎯 الخطوة التالية

بعد النشر:
1. اختبر الموقع على الرابط
2. اختبر جميع الميزات (إضافة، تعديل، حذف)
3. اختبر على موبايل
4. شارك الرابط مع المدرسة

---

**تم! المشروع الآن على الإنترنت! 🚀**

---

الدعم: https://docs.netlify.com  
الرابط: https://app.netlify.com
