import { useState } from 'react';
import { storage } from '../utils/storage';
import '../styles/Settings.css';

function Settings() {
  const [message, setMessage] = useState('');
  const [showSampleData, setShowSampleData] = useState(false);

  const handleExportBackup = () => {
    const backup = storage.exportData();
    const blob = new Blob([backup], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `backup-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMessage('تم تحميل النسخة الاحتياطية');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImportBackup = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = event => {
          const content = event.target?.result as string;
          const result = storage.importData(content);
          setMessage(result.message);
          setTimeout(() => setMessage(''), 3000);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleLoadSampleData = () => {
    storage.clearAllData();

    const sampleStudents = [
      { id: 's1', fullName: 'محمد أحمد علي', gender: 'بنين' as const, stage: 'الابتدائي', grade: 'الأول', section: 'أ', status: 'نشط' as const, enrollmentDate: new Date().toISOString() },
      { id: 's2', fullName: 'فاطمة علي محمود', gender: 'بنات' as const, stage: 'الابتدائي', grade: 'الأول', section: 'أ', status: 'نشط' as const, enrollmentDate: new Date().toISOString() },
      { id: 's3', fullName: 'سارة محمد حسن', gender: 'بنات' as const, stage: 'الابتدائي', grade: 'الأول', section: 'ب', status: 'نشط' as const, enrollmentDate: new Date().toISOString() },
      { id: 's4', fullName: 'عمر خالد إبراهيم', gender: 'بنين' as const, stage: 'الابتدائي', grade: 'الأول', section: 'ب', status: 'نشط' as const, enrollmentDate: new Date().toISOString() },
      { id: 's5', fullName: 'ليلى أحمد سالم', gender: 'بنات' as const, stage: 'المتوسط', grade: 'الثاني', section: 'أ', status: 'نشط' as const, enrollmentDate: new Date().toISOString() },
      { id: 's6', fullName: 'يوسف علي محمد', gender: 'بنين' as const, stage: 'المتوسط', grade: 'الثاني', section: 'أ', status: 'نشط' as const, enrollmentDate: new Date().toISOString() },
      { id: 's7', fullName: 'نور محمود خالد', gender: 'بنات' as const, stage: 'المتوسط', grade: 'الثاني', section: 'ب', status: 'نشط' as const, enrollmentDate: new Date().toISOString() },
      { id: 's8', fullName: 'خالد محمد أحمد', gender: 'بنين' as const, stage: 'المتوسط', grade: 'الثاني', section: 'ب', status: 'نشط' as const, enrollmentDate: new Date().toISOString() },
      { id: 's9', fullName: 'مريم سالم علي', gender: 'بنات' as const, stage: 'الثانوي', grade: 'الثالث', section: 'أ', status: 'نشط' as const, enrollmentDate: new Date().toISOString() },
      { id: 's10', fullName: 'حسن إبراهيم محمد', gender: 'بنين' as const, stage: 'الثانوي', grade: 'الثالث', section: 'أ', status: 'نشط' as const, enrollmentDate: new Date().toISOString() },
    ];

    sampleStudents.forEach(student => storage.addStudent(student));

    const today = new Date().toISOString().split('T')[0];
    const sampleRecords = [
      { id: 'a1', studentId: 's1', date: today, status: 'حاضر', lastModified: new Date().toISOString() },
      { id: 'a2', studentId: 's2', date: today, status: 'حاضر', lastModified: new Date().toISOString() },
      { id: 'a3', studentId: 's3', date: today, status: 'غائب', note: 'مريض', lastModified: new Date().toISOString() },
      { id: 'a4', studentId: 's4', date: today, status: 'متأخر', note: 'ازدحام مروري', lastModified: new Date().toISOString() },
      { id: 'a5', studentId: 's5', date: today, status: 'حاضر', lastModified: new Date().toISOString() },
      { id: 'a6', studentId: 's6', date: today, status: 'حاضر', lastModified: new Date().toISOString() },
      { id: 'a7', studentId: 's7', date: today, status: 'غائب', note: 'عذر طبي', lastModified: new Date().toISOString() },
      { id: 'a8', studentId: 's8', date: today, status: 'حاضر', lastModified: new Date().toISOString() },
      { id: 'a9', studentId: 's9', date: today, status: 'حاضر', lastModified: new Date().toISOString() },
      { id: 'a10', studentId: 's10', date: today, status: 'متأخر', lastModified: new Date().toISOString() },
    ];

    sampleRecords.forEach(record => storage.addAttendanceRecord(record as any));

    setShowSampleData(false);
    setMessage('تم تحميل بيانات تجريبية');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleClearAllData = () => {
    if (window.confirm('هل أنت متأكد من حذف جميع البيانات؟ هذا الإجراء لا يمكن التراجع عنه.')) {
      storage.clearAllData();
      setMessage('تم حذف جميع البيانات');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="settings">
      <h2>الإعدادات</h2>

      {message && <div className="message success">{message}</div>}

      <div className="settings-section">
        <h3>النسخ الاحتياطية</h3>
        <p>قم بتصدير أو استيراد نسخة احتياطية من البيانات بصيغة JSON</p>

        <div className="button-group">
          <button className="btn btn-primary" onClick={handleExportBackup}>
            📥 تصدير نسخة احتياطية
          </button>
          <button className="btn btn-primary" onClick={handleImportBackup}>
            📤 استيراد نسخة احتياطية
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>البيانات التجريبية</h3>
        <p>قم بتحميل بيانات تجريبية لاختبار التطبيق. سيتم حذف البيانات الحالية.</p>

        <div className="button-group">
          <button className="btn btn-success" onClick={() => setShowSampleData(true)}>
            📊 تحميل بيانات تجريبية
          </button>
        </div>

        {showSampleData && (
          <div className="confirmation-dialog">
            <p>هل أنت متأكد من تحميل البيانات التجريبية؟ سيتم حذف البيانات الحالية.</p>
            <div className="button-group">
              <button className="btn btn-danger" onClick={handleLoadSampleData}>
                تأكيد
              </button>
              <button className="btn btn-secondary" onClick={() => setShowSampleData(false)}>
                إلغاء
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="settings-section danger">
        <h3>منطقة الخطر</h3>
        <p>حذف جميع البيانات بشكل دائم</p>

        <div className="button-group">
          <button className="btn btn-danger" onClick={handleClearAllData}>
            🗑️ حذف جميع البيانات
          </button>
        </div>
      </div>

      <div className="info-box">
        <h3>معلومات التطبيق</h3>
        <ul>
          <li>
            <strong>الإصدار:</strong> 1.0.0
          </li>
          <li>
            <strong>التطبيق:</strong> سجل الغياب - مدارس أجيال ينبع الأهلية
          </li>
          <li>
            <strong>التخزين:</strong> localStorage
          </li>
          <li>
            <strong>آخر تحديث:</strong> {new Date().toLocaleDateString('ar-SA')}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Settings;
