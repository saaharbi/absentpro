# 📱 دليل النشر الكامل - سجل الغياب

## 🎯 الهدف

نشر تطبيق سجل الغياب على الإنترنت ليكون متاحًا للمدرسة من أي جهاز.

---

## ⚡ الطريقة السريعة (10 دقائق)

### 1. أنشئ حساب GitHub (مجاني)
- اذهب: https://github.com/signup
- أكمل التسجيل بسهولة

### 2. رفع المشروع على GitHub

**افتح PowerShell في مجلد المشروع واكتب:**

```bash
cd C:\Users\msi_m\Documents\MYFIRSTPROJECT\absentpro

# تهيئة Git
git config --global user.name "اسمك"
git config --global user.email "بريدك@gmail.com"

# إنشاء مستودع محلي
git init
git add .
git commit -m "سجل الغياب - النسخة الأولى"
git branch -M main
```

**أضف المستودع على GitHub:**

```bash
# اذهب: https://github.com/new
# أنشئ مستودع باسم: sojel-gheyab

# ثم اكتب (غيّر USERNAME بـ اسم حسابك):
git remote add origin https://github.com/USERNAME/sojel-gheyab.git
git push -u origin main
```

### 3. نشر على Netlify

1. اذهب: https://app.netlify.com/signup
2. اختر **GitHub** للتسجيل
3. اختر المستودع `sojel-gheyab`
4. Netlify سينشر تلقائيًا! ✅

**سيحصل على رابط مثل:**
```
https://sojel-gheyab.netlify.app
```

---

## 📋 التفاصيل الكاملة

### المتطلبات

| الشيء | الحالة | الملاحظة |
|------|--------|---------|
| حساب GitHub | مجاني | ضروري |
| حساب Netlify | مجاني | ضروري |
| Git مثبت | ✅ موجود | يأتي مع Windows |
| المشروع | ✅ جاهز | في المجلد |

---

## 🔧 الخطوات التفصيلية

### خطوة 1: إعداد Git

**شغّل PowerShell كمسؤول:**

```bash
# قم بتعيين معلوماتك (مرة واحدة فقط)
git config --global user.name "سنا الحربي"
git config --global user.email "sanaalharbi123@gmail.com"

# تحقق من التثبيت
git --version
```

### خطوة 2: إنشاء GitHub Account

1. اذهب: **https://github.com/signup**
2. أدخل:
   - البريد الإلكتروني: `sanaalharbi123@gmail.com`
   - كلمة المرور: قوية (مثل: `Sojel@2026Yanbu`)
   - اسم المستخدم: `sanaalharbi` أو أي اسم تفضله
3. أكمل التحقق

### خطوة 3: إنشاء مستودع على GitHub

1. بعد تسجيل الدخول على GitHub
2. اضغط زر **+** (أعلى اليمين)
3. اختر **New repository**
4. أملء البيانات:
   - **Repository name:** `sojel-gheyab`
   - **Description:** `تطبيق تسجيل غياب الطلاب`
   - **Public:** ✅ (ليكون الجميع يراه)
5. اضغط **Create repository**

### خطوة 4: رفع المشروع على GitHub

**في PowerShell (في مجلد المشروع):**

```bash
# انتقل إلى المجلد
cd C:\Users\msi_m\Documents\MYFIRSTPROJECT\absentpro

# تهيئة Git
git init

# أضف جميع الملفات
git add .

# حفظ التغييرات
git commit -m "سجل الغياب - النسخة الأولى"

# أعد تسمية الفرع
git branch -M main

# أضف رابط المستودع (غيّر USERNAME)
git remote add origin https://github.com/USERNAME/sojel-gheyab.git

# رفع على GitHub
git push -u origin main
```

**بعد الرفع ستجد المشروع على:**
```
https://github.com/USERNAME/sojel-gheyab
```

### خطوة 5: نشر على Netlify

1. اذهب: **https://app.netlify.com/signup**
2. اختر **Sign up with GitHub**
3. اعطِ Netlify الصلاحيات
4. اختر **Add new site**
5. اختر **Import an existing project**
6. اختر **GitHub**
7. ابحث عن `sojel-gheyab`
8. اختره
9. Netlify سيكتشف الإعدادات تلقائيًا ✅
10. اضغط **Deploy site**

**انتظر 1-2 دقيقة وستحصل على رابط:**
```
https://sojel-gheyab.netlify.app
```

---

## ✅ الاختبار بعد النشر

**اختبر على الرابط:**

- [ ] الصفحة الرئيسية تفتح
- [ ] جميع الروابط تعمل
- [ ] البحث يعمل
- [ ] الإضافة والحفظ يعمل
- [ ] التصدير يعمل
- [ ] يعمل على الموبايل

---

## 🔄 نشر التحديثات

عندما تعدل المشروع محليًا:

```bash
# تحديث الملفات
git add .
git commit -m "وصف التحديث"
git push origin main
```

**Netlify سينشر التحديثات تلقائيًا في 1-2 دقيقة!**

---

## 🎨 تخصيص اسم الموقع

### اسم مخصص من Netlify

1. اذهب إلى: https://app.netlify.com/sites
2. اختر الموقع
3. اذهب: **Site settings** → **Change site name**
4. غيّر من `quirky-name` إلى: `sojel-gheyab`
5. الرابط الجديد: `https://sojel-gheyab.netlify.app`

### نطاق مخصص (مثل: sojel.com)

**الخيار 1: شراء نطاق**
- من: GoDaddy, Namecheap, أو Domains.com
- السعر: ~$10-15 سنويًا

**الخيار 2: نطاق مجاني**
- من: **Freenom.com**
- النطاقات المجانية: `.ml`, `.ga`, `.cf`

**بعد الحصول على النطاق:**
1. في Netlify: **Site settings** → **Domain management**
2. اضغط **Add custom domain**
3. أدخل النطاق
4. اتبع التعليمات

---

## 🐛 الأخطاء الشائعة

### ❌ خطأ: "fatal: not a git repository"

**الحل:**
```bash
git init  # شغّل هذا أولاً
```

### ❌ خطأ: "Permission denied"

**الحل:**
```bash
# استخدم Personal Access Token بدلاً من كلمة المرور
# من: https://github.com/settings/tokens
```

### ❌ خطأ: البناء يفشل على Netlify

**الحل:**
1. تحقق من `npm run build` محليًا
2. تأكد من `netlify.toml` موجود
3. تحقق من Node.js version في Netlify

---

## 📞 الدعم

| المشكلة | الحل |
|--------|------|
| مشاكل Git | https://git-scm.com/doc |
| مشاكل GitHub | https://docs.github.com |
| مشاكل Netlify | https://docs.netlify.com |

---

## 🎉 النتيجة النهائية

بعد اتباع الخطوات:

✅ المشروع على GitHub (نسخة احتياطية)  
✅ المشروع على الإنترنت (Netlify)  
✅ رابط يمكن مشاركته مع المدرسة  
✅ نشر تلقائي للتحديثات  

**المشروع الآن متاح للاستخدام الفوري! 🚀**

---

## 📊 الخطوات سريعة المرجع

```bash
# 1. الإعداد (مرة واحدة)
git config --global user.name "اسمك"
git config --global user.email "بريدك@gmail.com"

# 2. الرفع الأول
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/sojel-gheyab.git
git push -u origin main

# 3. التحديثات (في المرات القادمة)
git add .
git commit -m "وصف التحديث"
git push origin main
```

---

**إذا واجهت أي مشكلة في الخطوات، لا تتردد في طلب المساعدة!** 💪
