import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { helpers } from '../utils/helpers';
import '../styles/Dashboard.css';

interface DailyStat {
  total: number;
  present: number;
  absent: number;
  late: number;
  notRecorded: number;
}

function Dashboard() {
  const [stats, setStats] = useState<DailyStat>({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    notRecorded: 0,
  });

  const [sectionStats, setSectionStats] = useState<Record<string, any>>({});
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const today = helpers.getTodayDate();
    setTodayDate(today);
    updateStats();
  }, []);

  const updateStats = () => {
    const students = storage.getStudents().filter(s => s.status === 'نشط');
    const today = helpers.getTodayDate();

    const total = students.length;
    let present = 0;
    let absent = 0;
    let late = 0;
    let notRecorded = total;

    const bySection: Record<string, any> = {};

    students.forEach(student => {
      const record = storage.getStudentAttendanceForDate(student.id, today);

      if (!bySection[student.section]) {
        bySection[student.section] = { total: 0, present: 0, absent: 0, late: 0 };
      }
      bySection[student.section].total++;

      if (record) {
        notRecorded--;
        if (record.status === 'حاضر') {
          present++;
          bySection[student.section].present++;
        } else if (record.status === 'غائب') {
          absent++;
          bySection[student.section].absent++;
        } else if (record.status === 'متأخر') {
          late++;
          bySection[student.section].late++;
        }
      }
    });

    setStats({ total, present, absent, late, notRecorded });
    setSectionStats(bySection);
  };

  return (
    <div className="dashboard">
      <h2>لوحة التحكم</h2>
      <p className="date-info">التاريخ: {helpers.formatDate(todayDate)}</p>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">إجمالي الطلاب</div>
        </div>

        <div className="stat-card present">
          <div className="stat-number">{stats.present}</div>
          <div className="stat-label">حاضرون</div>
        </div>

        <div className="stat-card absent">
          <div className="stat-number">{stats.absent}</div>
          <div className="stat-label">غائبون</div>
        </div>

        <div className="stat-card late">
          <div className="stat-number">{stats.late}</div>
          <div className="stat-label">متأخرون</div>
        </div>

        <div className="stat-card not-recorded">
          <div className="stat-number">{stats.notRecorded}</div>
          <div className="stat-label">لم يتم تسجيلهم</div>
        </div>
      </div>

      <div className="section-summary">
        <h3>ملخص حسب القسم</h3>
        <div className="section-cards">
          {Object.entries(sectionStats)
            .sort((a, b) => a[0].localeCompare(b[0], 'ar'))
            .map(([section, data]) => (
              <div key={section} className="section-card">
                <h4>{section}</h4>
                <div className="section-stats">
                  <div className="section-stat">
                    <span className="label">الإجمالي:</span>
                    <span className="value">{data.total}</span>
                  </div>
                  <div className="section-stat present">
                    <span className="label">حاضر:</span>
                    <span className="value">{data.present}</span>
                  </div>
                  <div className="section-stat absent">
                    <span className="label">غائب:</span>
                    <span className="value">{data.absent}</span>
                  </div>
                  <div className="section-stat late">
                    <span className="label">متأخر:</span>
                    <span className="value">{data.late}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={() => window.location.hash = '#attendance'}>
          تسجيل الغياب الآن
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
