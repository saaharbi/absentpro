# ⚡ بدء سريع - سجل الغياب

## 🎯 ما تحتاج إليه

✅ Node.js مثبت  
✅ المشروع في المجلد الحالي  
✅ 2 دقيقة من وقتك

---

## 🚀 شغّل التطبيق الآن

**افتح PowerShell في مجلد المشروع واكتب:**

```bash
npm install
npm run dev
```

**سيفتح التطبيق تلقائيًا على:** `http://localhost:3000`

---

## 📖 الملفات المهمة

| الملف | الهدف |
|------|-------|
| **README.md** | كيفية تشغيل التطبيق |
| **.claude.md** | معايير التطوير والكود |
| **DEPLOYMENT.md** | خطوات النشر على Netlify |
| **PUBLISH_GUIDE.md** | دليل نشر شامل (GitHub + Netlify) |
| **netlify.toml** | إعدادات النشر |

---

## 🏗️ البناء والنشر

### بناء للإنتاج
```bash
npm run build
```

### فحص TypeScript
```bash
npm run lint
```

### معاينة البناء
```bash
npm run preview
```

---

## 🌐 النشر على Netlify (خطوات)

### الخطوة 1: GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/sojel-gheyab.git
git push -u origin main
```

### الخطوة 2: Netlify
1. اذهب: https://app.netlify.com
2. اختر: Import from Git
3. اختر: `sojel-gheyab`
4. Deploy! ✅

**الرابط:** `https://sojel-gheyab.netlify.app`

---

## 📋 قائمة الاختبار السريعة

- [ ] التطبيق يفتح بدون أخطاء
- [ ] تحميل البيانات التجريبية يعمل
- [ ] البحث يعمل
- [ ] الإضافة والحفظ يعمل
- [ ] التصدير إلى CSV يعمل
- [ ] يعمل على الموبايل

---

## 🐛 مشاكل سريعة

| المشكلة | الحل |
|--------|------|
| Port 3000 مشغول | `npm run dev -- --port 3001` |
| npm غير موجود | شغّل Node.js Installer |
| خطأ في البناء | `npm run lint` ثم صحح الأخطاء |

---

## 📚 تعلم أكثر

- **تطوير:** اقرأ `.claude.md`
- **النشر:** اقرأ `DEPLOYMENT.md`
- **الاستخدام:** اقرأ `README.md`

---

**هذا كل ما تحتاج! استمتع بالتطبيق! 🎉**
