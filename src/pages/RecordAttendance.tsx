import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { helpers } from '../utils/helpers';
import { Student, AttendanceRecord, AttendanceStatus } from '../types';
import SearchFilter from '../components/SearchFilter';
import '../styles/RecordAttendance.css';

interface AttendanceData {
  [studentId: string]: {
    status: AttendanceStatus | '';
    note: string;
  };
}

function RecordAttendance() {
  const [date, setDate] = useState(helpers.getTodayDate());
  const [gender, setGender] = useState('بنين');
  const [stage, setStage] = useState('');
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceData>({});
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({ present: 0, absent: 0, late: 0, notRecorded: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const grades = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'];
  const stages = ['الابتدائي', 'المتوسط', 'الثانوي'];
  const sections = ['أ', 'ب', 'ج', 'د'];

  useEffect(() => {
    loadStudentsForFilters();
  }, [gender, stage, grade, section]);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [students, searchQuery, filterSection, filterStatus]);

  useEffect(() => {
    updateStats();
  }, [attendance]);

  const applyFiltersAndSearch = () => {
    let filtered = students;

    if (searchQuery) {
      filtered = filtered.filter(student =>
        student.fullName.includes(searchQuery) ||
        student.id.includes(searchQuery)
      );
    }

    if (filterSection) {
      filtered = filtered.filter(student => student.section === filterSection);
    }

    if (filterStatus) {
      filtered = filtered.filter(student => {
        const att = attendance[student.id];
        return att?.status === filterStatus;
      });
    }

    setFilteredStudents(filtered);
  };

  const loadStudentsForFilters = () => {
    const filtered = helpers.getStudentsByFilter(gender, stage, grade, section);
    setStudents(filtered);

    const existingAttendance: AttendanceData = {};
    filtered.forEach(student => {
      const record = storage.getStudentAttendanceForDate(student.id, date);
      existingAttendance[student.id] = {
        status: record?.status || '',
        note: record?.note || '',
      };
    });
    setAttendance(existingAttendance);
  };

  const updateStats = () => {
    let present = 0, absent = 0, late = 0, notRecorded = 0;

    Object.values(attendance).forEach(att => {
      if (att.status === 'حاضر') present++;
      else if (att.status === 'غائب') absent++;
      else if (att.status === 'متأخر') late++;
      else notRecorded++;
    });

    setStats({ present, absent, late, notRecorded });
  };

  const handleAttendanceChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], status },
    }));
  };

  const handleNoteChange = (studentId: string, note: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], note },
    }));
  };

  const handleSave = () => {
    const total = students.length;
    if (stats.notRecorded > 0) {
      if (!window.confirm(`لم يتم تسجيل ${stats.notRecorded} من ${total} طالب. هل تريد المتابعة؟`)) {
        return;
      }
    }

    students.forEach(student => {
      const att = attendance[student.id];
      if (att.status) {
        const existing = storage.getStudentAttendanceForDate(student.id, date);
        const record: AttendanceRecord = {
          id: existing?.id || helpers.generateId(),
          studentId: student.id,
          date,
          status: att.status,
          note: att.note || undefined,
          lastModified: new Date().toISOString(),
        };

        if (existing) {
          storage.updateAttendanceRecord(record);
        } else {
          storage.addAttendanceRecord(record);
        }
      }
    });

    setMessage('تم حفظ السجل بنجاح');
    setTimeout(() => setMessage(''), 3000);
  };

  const allRecorded = stats.notRecorded === 0 && students.length > 0;

  const dynamicSections = [...new Set(students.map(s => s.section))].sort();

  return (
    <div className="record-attendance">
      <h2>تسجيل الغياب اليومي</h2>

      {message && <div className="message success">{message}</div>}

      <SearchFilter
        onSearchChange={setSearchQuery}
        onSectionChange={setFilterSection}
        onStatusChange={(status) => {
          setFilterStatus(status);
        }}
        onDateChange={() => {}}
        sections={dynamicSections}
        showDateFilter={false}
      />

      <div className="filters-section">
        <div className="filter-group">
          <label>التاريخ</label>
          <input
            type="date"
            value={date}
            onChange={e => {
              setDate(e.target.value);
              loadStudentsForFilters();
            }}
          />
        </div>

        <div className="filter-group">
          <label>القسم</label>
          <select value={gender} onChange={e => setGender(e.target.value)}>
            <option value="بنين">بنين</option>
            <option value="بنات">بنات</option>
          </select>
        </div>

        <div className="filter-group">
          <label>المرحلة</label>
          <select value={stage} onChange={e => setStage(e.target.value)}>
            <option value="">جميع المراحل</option>
            {stages.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>الصف</label>
          <select value={grade} onChange={e => setGrade(e.target.value)}>
            <option value="">جميع الصفوف</option>
            {grades.map(g => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>الفصل</label>
          <select value={section} onChange={e => setSection(e.target.value)}>
            <option value="">جميع الفصول</option>
            {sections.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <span className="label">حاضر:</span>
          <span className="value present">{stats.present}</span>
        </div>
        <div className="stat">
          <span className="label">غائب:</span>
          <span className="value absent">{stats.absent}</span>
        </div>
        <div className="stat">
          <span className="label">متأخر:</span>
          <span className="value late">{stats.late}</span>
        </div>
        <div className="stat">
          <span className="label">لم يتم تسجيله:</span>
          <span className="value not-recorded">{stats.notRecorded}</span>
        </div>
      </div>

      {!allRecorded && stats.notRecorded > 0 && (
        <div className="warning">
          ⚠️ لم يتم تسجيل حالة {stats.notRecorded} من الطلاب. يرجى تسجيل الجميع قبل الحفظ.
        </div>
      )}

      {students.length === 0 ? (
        <div className="empty-state">
          <p>لا توجد طلاب في الفصل المختار</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="empty-state">
          <p>لا توجد نتائج مطابقة للبحث والفلاترة</p>
        </div>
      ) : (
        <>
          <div className="students-attendance">
            {filteredStudents.map(student => (
              <div key={student.id} className="attendance-card">
                <h4>{student.fullName}</h4>
                <div className="attendance-buttons">
                  <button
                    className={`btn-status ${attendance[student.id]?.status === 'حاضر' ? 'active' : ''}`}
                    style={{
                      backgroundColor: attendance[student.id]?.status === 'حاضر' ? '#10b981' : '#e5e7eb',
                      color: attendance[student.id]?.status === 'حاضر' ? 'white' : '#333',
                    }}
                    onClick={() => handleAttendanceChange(student.id, 'حاضر')}
                  >
                    حاضر
                  </button>
                  <button
                    className={`btn-status ${attendance[student.id]?.status === 'غائب' ? 'active' : ''}`}
                    style={{
                      backgroundColor: attendance[student.id]?.status === 'غائب' ? '#ef4444' : '#e5e7eb',
                      color: attendance[student.id]?.status === 'غائب' ? 'white' : '#333',
                    }}
                    onClick={() => handleAttendanceChange(student.id, 'غائب')}
                  >
                    غائب
                  </button>
                  <button
                    className={`btn-status ${attendance[student.id]?.status === 'متأخر' ? 'active' : ''}`}
                    style={{
                      backgroundColor: attendance[student.id]?.status === 'متأخر' ? '#f59e0b' : '#e5e7eb',
                      color: attendance[student.id]?.status === 'متأخر' ? 'white' : '#333',
                    }}
                    onClick={() => handleAttendanceChange(student.id, 'متأخر')}
                  >
                    متأخر
                  </button>
                </div>
                {(attendance[student.id]?.status === 'غائب' || attendance[student.id]?.status === 'متأخر') && (
                  <input
                    type="text"
                    placeholder="ملاحظة اختيارية (العذر)"
                    value={attendance[student.id]?.note || ''}
                    onChange={e => handleNoteChange(student.id, e.target.value)}
                    className="note-input"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="actions">
            <button className="btn btn-success" onClick={handleSave}>
              💾 حفظ السجل
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecordAttendance;
