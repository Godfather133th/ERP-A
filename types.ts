import React from 'react';

export type Language = 'ar' | 'en';

export interface Translation {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export enum MinistryId {
  HEALTH = 'health',
  EDUCATION = 'education',
  INTERIOR = 'interior',
  OIL = 'oil',
  FINANCE = 'finance'
}

export interface Ministry {
  id: MinistryId;
  name: { ar: string; en: string };
  budget: number;
  employees: number;
  activeProjects: number;
  color: string;
}

export interface ChartData {
  name: string;
  value: number;
  fullMark?: number;
}

export interface NavItem {
  id: string;
  icon: React.ComponentType<any>;
  label: { ar: string; en: string };
  path?: string;
  children?: NavItem[];
}

// --- HR Specific Types ---

export interface Employee {
  id: string;
  code: string;
  firstName: string;
  middleName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
  image: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'late' | 'absent';
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  active: boolean;
}
