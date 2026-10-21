import { Student, AttendanceRecord } from '../types';

const STUDENTS_KEY = 'sojel_students';
const ATTENDANCE_KEY = 'sojel_attendance';

export const storage = {
  // Students
  getStudents: (): Student[] => {
    const data = localStorage.getItem(STUDENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  addStudent: (student: Student): void => {
    const students = storage.getStudents();
    const exists = students.some(s => s.id === student.id);
    if (!exists) {
      students.push(student);
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
    }
  },

  updateStudent: (student: Student): void => {
    const students = storage.getStudents();
    const index = students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      students[index] = student;
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
    }
  },

  deleteStudent: (id: string): void => {
    let students = storage.getStudents();
    students = students.filter(s => s.id !== id);
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  },

  // Attendance
  getAttendanceRecords: (): AttendanceRecord[] => {
    const data = localStorage.getItem(ATTENDANCE_KEY);
    return data ? JSON.parse(data) : [];
  },

  addAttendanceRecord: (record: AttendanceRecord): void => {
    const records = storage.getAttendanceRecords();
    records.push(record);
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
  },

  updateAttendanceRecord: (record: AttendanceRecord): void => {
    const records = storage.getAttendanceRecords();
    const index = records.findIndex(r => r.id === record.id);
    if (index !== -1) {
      records[index] = record;
      localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
    }
  },

  getAttendanceForDate: (date: string): AttendanceRecord[] => {
    return storage.getAttendanceRecords().filter(r => r.date === date);
  },

  getStudentAttendanceForDate: (studentId: string, date: string): AttendanceRecord | undefined => {
    return storage.getAttendanceRecords().find(r => r.studentId === studentId && r.date === date);
  },

  deleteAttendanceRecord: (id: string): void => {
    let records = storage.getAttendanceRecords();
    records = records.filter(r => r.id !== id);
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
  },

  // Backup and Restore
  exportData: (): string => {
    const data = {
      students: storage.getStudents(),
      attendance: storage.getAttendanceRecords(),
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  importData: (jsonString: string): { success: boolean; message: string } => {
    try {
      const data = JSON.parse(jsonString);
      if (!Array.isArray(data.students) || !Array.isArray(data.attendance)) {
        return { success: false, message: 'صيغة البيانات غير صحيحة' };
      }
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(data.students));
      localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(data.attendance));
      return { success: true, message: 'تم استيراد البيانات بنجاح' };
    } catch (error) {
      return { success: false, message: 'خطأ في قراءة البيانات' };
    }
  },

  clearAllData: (): void => {
    localStorage.removeItem(STUDENTS_KEY);
    localStorage.removeItem(ATTENDANCE_KEY);
  },
};
