export type Gender = 'بنين' | 'بنات';
export type StudentStatus = 'نشط' | 'غير نشط';
export type AttendanceStatus = 'حاضر' | 'غائب' | 'متأخر';

export interface Student {
  id: string;
  fullName: string;
  gender: Gender;
  stage: string; // e.g., "الابتدائي", "المتوسط", "الثانوي"
  grade: string; // e.g., "الأول", "الثاني", etc.
  section: string; // e.g., "أ", "ب", "ج"
  status: StudentStatus;
  enrollmentDate: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  note?: string;
  lastModified: string;
}

export interface DailyReport {
  date: string;
  present: number;
  absent: number;
  late: number;
  notRecorded: number;
  bySection: Record<string, { present: number; absent: number; late: number }>;
}
