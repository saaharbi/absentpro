import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { helpers } from '../utils/helpers';
import { Student } from '../types';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import '../styles/ManageStudents.css';

function ManageStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'بنين' as 'بنين' | 'بنات',
    stage: '',
    grade: '',
    section: '',
    status: 'نشط' as 'نشط' | 'غير نشط',
  });

  const grades = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'];
  const stages = ['الابتدائي', 'المتوسط', 'الثانوي'];
  const sections = ['أ', 'ب', 'ج', 'د'];

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const allStudents = storage.getStudents();
    setStudents(
      allStudents.filter(s =>
        s.fullName.includes(searchTerm) &&
        (!filterGender || s.gender === filterGender) &&
        (!filterGrade || s.grade === filterGrade) &&
        (!filterSection || s.section === filterSection)
      )
    );
  };

  useEffect(() => {
    loadStudents();
  }, [searchTerm, filterGender, filterGrade, filterSection]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.stage || !formData.grade || !formData.section) {
      setMessage('يرجى ملء جميع الحقول المطلوبة');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (editingId) {
      const student: Student = {
        id: editingId,
        ...formData,
        enrollmentDate: storage.getStudents().find(s => s.id === editingId)?.enrollmentDate || new Date().toISOString(),
      };
      storage.updateStudent(student);
      setMessage('تم تحديث الطالب بنجاح');
      setEditingId(null);
    } else {
      const student: Student = {
        id: helpers.generateId(),
        ...formData,
        enrollmentDate: new Date().toISOString(),
      };
      storage.addStudent(student);
      setMessage('تم إضافة الطالب بنجاح');
    }

    resetForm();
    loadStudents();
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (student: Student) => {
    setFormData({
      fullName: student.fullName,
      gender: student.gender,
      stage: student.stage,
      grade: student.grade,
      section: student.section,
      status: student.status,
    });
    setEditingId(student.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
      storage.deleteStudent(id);
      setMessage('تم حذف الطالب بنجاح');
      loadStudents();
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      gender: 'بنين',
      stage: '',
      grade: '',
      section: '',
      status: 'نشط',
    });
  };

  return (
    <div className="manage-students">
      <h2>إدارة الطلاب</h2>

      {message && <div className={`message ${message.includes('خطأ') ? 'error' : 'success'}`}>{message}</div>}

      <button
        className="btn btn-primary"
        onClick={() => {
          setShowForm(!showForm);
          if (showForm) resetForm();
          setEditingId(null);
        }}
      >
        <Plus size={20} /> {showForm ? 'إلغاء' : 'إضافة طالب جديد'}
      </button>

      {showForm && (
        <form className="student-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>الاسم الكامل *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={e => handleInputChange('fullName', e.target.value)}
              placeholder="أدخل الاسم الكامل للطالب"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>القسم *</label>
              <select
                value={formData.gender}
                onChange={e => handleInputChange('gender', e.target.value)}
              >
                <option value="بنين">بنين</option>
                <option value="بنات">بنات</option>
              </select>
            </div>

            <div className="form-group">
              <label>المرحلة *</label>
              <select
                value={formData.stage}
                onChange={e => handleInputChange('stage', e.target.value)}
                required
              >
                <option value="">اختر المرحلة</option>
                {stages.map(stage => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>الصف *</label>
              <select
                value={formData.grade}
                onChange={e => handleInputChange('grade', e.target.value)}
                required
              >
                <option value="">اختر الصف</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>الفصل *</label>
              <select
                value={formData.section}
                onChange={e => handleInputChange('section', e.target.value)}
                required
              >
                <option value="">اختر الفصل</option>
                {sections.map(section => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>الحالة</label>
            <select
              value={formData.status}
              onChange={e => handleInputChange('status', e.target.value as any)}
            >
              <option value="نشط">نشط</option>
              <option value="غير نشط">غير نشط</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success">
            {editingId ? 'تحديث الطالب' : 'إضافة الطالب'}
          </button>
        </form>
      )}

      <div className="filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="ابحث عن طالب بالاسم..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <select value={filterGender} onChange={e => setFilterGender(e.target.value)}>
          <option value="">جميع الأقسام</option>
          <option value="بنين">بنين</option>
          <option value="بنات">بنات</option>
        </select>

        <select value={filterGrade} onChange={e => setFilterGrade(e.target.value)}>
          <option value="">جميع الصفوف</option>
          {grades.map(grade => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>

        <select value={filterSection} onChange={e => setFilterSection(e.target.value)}>
          <option value="">جميع الفصول</option>
          {sections.map(section => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
      </div>

      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>القسم</th>
              <th>المرحلة</th>
              <th>الصف</th>
              <th>الفصل</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty-state">
                  لا توجد طلاب
                </td>
              </tr>
            ) : (
              students.map(student => (
                <tr key={student.id}>
                  <td>{student.fullName}</td>
                  <td>{student.gender}</td>
                  <td>{student.stage}</td>
                  <td>{student.grade}</td>
                  <td>{student.section}</td>
                  <td>
                    <span className={`status ${student.status === 'نشط' ? 'active' : 'inactive'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn-icon edit"
                      onClick={() => handleEdit(student)}
                      title="تعديل"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="btn-icon delete"
                      onClick={() => handleDelete(student.id)}
                      title="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="students-count">عدد الطلاب: {students.length}</p>
    </div>
  );
}

export default ManageStudents;
