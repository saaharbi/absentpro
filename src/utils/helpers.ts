import { Student } from '../types';
import { storage } from './storage';

export const helpers = {
  generateId: (): string => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  },

  formatDate: (date: string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('ar-SA');
  },

  formatDateForInput: (date: Date | string): string => {
    if (typeof date === 'string') {
      return date;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  getTodayDate: (): string => {
    return helpers.formatDateForInput(new Date());
  },

  getActiveStudents: (): Student[] => {
    return storage.getStudents().filter(s => s.status === 'نشط');
  },

  getStudentsByFilter: (
    gender?: string,
    stage?: string,
    grade?: string,
    section?: string
  ): Student[] => {
    let students = storage.getStudents();

    if (gender) students = students.filter(s => s.gender === gender);
    if (stage) students = students.filter(s => s.stage === stage);
    if (grade) students = students.filter(s => s.grade === grade);
    if (section) students = students.filter(s => s.section === section);

    return students.sort((a, b) => a.fullName.localeCompare(b.fullName, 'ar'));
  },

  getUniqueSections: (students: Student[] = storage.getStudents()): string[] => {
    return Array.from(new Set(students.map(s => s.section))).sort();
  },

  getUniqueGrades: (students: Student[] = storage.getStudents()): string[] => {
    return Array.from(new Set(students.map(s => s.grade))).sort();
  },

  getUniqueStages: (students: Student[] = storage.getStudents()): string[] => {
    return Array.from(new Set(students.map(s => s.stage))).sort();
  },

  exportToCSV: (data: any[], filename: string): void => {
    const csv = convertToCSV(data);
    const bom = '﻿'; // UTF-8 BOM
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

function convertToCSV(data: any[]): string {
  if (data.length === 0) return '';

  const keys = Object.keys(data[0]);
  const headers = keys.map(escapeCSV).join(',');
  const rows = data.map(obj =>
    keys.map(key => escapeCSV(String(obj[key] || ''))).join(',')
  );

  return [headers, ...rows].join('\n');
}

function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
