import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { helpers } from '../utils/helpers';
import '../styles/Reports.css';

interface StudentAbsenceRecord {
  studentId: string;
  studentName: string;
  absenceCount: number;
  lateCount: number;
  presentCount: number;
  lastAbsence?: string;
}

function Reports() {
  const [reportType, setReportType] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(helpers.getTodayDate());
  const [startDate, setStartDate] = useState(helpers.getTodayDate());
  const [endDate, setEndDate] = useState(helpers.getTodayDate());
  const [filterGender, setFilterGender] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [reportData, setReportData] = useState<StudentAbsenceRecord[]>([]);

  const grades = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'];
  const stages = ['الابتدائي', 'المتوسط', 'الثانوي'];
  const sections = ['أ', 'ب', 'ج', 'د'];

  const generateReport = () => {
    const allStudents = helpers.getStudentsByFilter(filterGender, filterStage, filterGrade, filterSection);
    const allRecords = storage.getAttendanceRecords();

    const absenceMap: Record<string, StudentAbsenceRecord> = {};

    allStudents.forEach(student => {
      absenceMap[student.id] = {
        studentId: student.id,
        studentName: student.fullName,
        absenceCount: 0,
        lateCount: 0,
        presentCount: 0,
      };
    });

    const fromDate = new Date(reportType === 'period' ? startDate : selectedDate);
    const toDate = new Date(reportType === 'period' ? endDate : selectedDate);

    allRecords.forEach(record => {
      const recordDate = new Date(record.date);
      if (recordDate >= fromDate && recordDate <= toDate && absenceMap[record.studentId]) {
        if (record.status === 'غائب') {
          absenceMap[record.studentId].absenceCount++;
          absenceMap[record.studentId].lastAbsence = record.date;
        } else if (record.status === 'متأخر') {
          absenceMap[record.studentId].lateCount++;
        } else if (record.status === 'حاضر') {
          absenceMap[record.studentId].presentCount++;
        }
      }
    });

    const report = Object.values(absenceMap)
      .sort((a, b) => b.absenceCount - a.absenceCount)
      .filter(r => r.absenceCount > 0 || r.lateCount > 0);

    setReportData(report);
  };

  useEffect(() => {
    generateReport();
  }, [reportType, selectedDate, startDate, endDate, filterGender, filterStage, filterGrade, filterSection]);

  const handleExportCSV = () => {
    const data = reportData.map(record => ({
      'اسم الطالب': record.studentName,
      'عدد الغيابات': record.absenceCount,
      'عدد التأخرات': record.lateCount,
      'عدد الحضور': record.presentCount,
      'آخر غياب': record.lastAbsence ? helpers.formatDate(record.lastAbsence) : '-',
    }));

    helpers.exportToCSV(data, 'تقرير-الغياب.csv');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports">
      <h2>التقارير</h2>

      <div className="report-controls">
        <div className="control-group">
          <label>نوع التقرير</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="daily"
                checked={reportType === 'daily'}
                onChange={e => setReportType(e.target.value)}
              />
              تقرير يومي
            </label>
            <label>
              <input
                type="radio"
                value="period"
                checked={reportType === 'period'}
                onChange={e => setReportType(e.target.value)}
              />
              تقرير فترة زمنية
            </label>
          </div>
        </div>

        {reportType === 'daily' ? (
          <div className="control-group">
            <label>التاريخ</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>
        ) : (
          <>
            <div className="control-group">
              <label>من</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div className="control-group">
              <label>إلى</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="control-group">
          <label>القسم</label>
          <select value={filterGender} onChange={e => setFilterGender(e.target.value)}>
            <option value="">الكل</option>
            <option value="بنين">بنين</option>
            <option value="بنات">بنات</option>
          </select>
        </div>

        <div className="control-group">
          <label>المرحلة</label>
          <select value={filterStage} onChange={e => setFilterStage(e.target.value)}>
            <option value="">الكل</option>
            {stages.map(stage => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>الصف</label>
          <select value={filterGrade} onChange={e => setFilterGrade(e.target.value)}>
            <option value="">الكل</option>
            {grades.map(grade => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>الفصل</label>
          <select value={filterSection} onChange={e => setFilterSection(e.target.value)}>
            <option value="">الكل</option>
            {sections.map(section => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={handlePrint}>
          🖨️ طباعة
        </button>
        <button className="btn btn-success" onClick={handleExportCSV}>
          📥 تصدير CSV
        </button>
      </div>

      <div className="report-container">
        {reportData.length === 0 ? (
          <div className="empty-state">
            <p>لا توجد سجلات غياب في هذه الفترة</p>
          </div>
        ) : (
          <>
            <div className="report-summary">
              <p>عدد الطلاب الذين لديهم غيابات أو تأخرات: {reportData.length}</p>
            </div>

            <table className="report-table">
              <thead>
                <tr>
                  <th>اسم الطالب</th>
                  <th>عدد الغيابات</th>
                  <th>عدد التأخرات</th>
                  <th>عدد الحضور</th>
                  <th>آخر غياب</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((record, idx) => (
                  <tr key={record.studentId} className={idx % 2 === 0 ? 'even' : 'odd'}>
                    <td>{record.studentName}</td>
                    <td>
                      <span className="badge absent">{record.absenceCount}</span>
                    </td>
                    <td>
                      <span className="badge late">{record.lateCount}</span>
                    </td>
                    <td>
                      <span className="badge present">{record.presentCount}</span>
                    </td>
                    <td>{record.lastAbsence ? helpers.formatDate(record.lastAbsence) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Reports;
