// src/data/animatedNumbersData.ts
import React from 'react'; // Нужен для JSX в типе иконки
import { FaProjectDiagram, FaSmile, FaCalendarAlt, FaUsers, FaAward } from 'react-icons/fa';

export interface DigitItem {
  id: string;
  number: number;
  label: string;
  icon: React.ReactElement;
}

export const digitsData: DigitItem[] = [
  { id: 'projects', number: 100, label: 'Projects Completed', icon: <FaProjectDiagram /> },
  { id: 'clients', number: 50, label: 'Happy Clients', icon: <FaSmile /> },
  { id: 'experience', number: 10, label: 'Years of Experience', icon: <FaCalendarAlt /> },
  { id: 'employees', number: 200, label: 'Employees', icon: <FaUsers /> },
  { id: 'awards', number: 5, label: 'Awards Received', icon: <FaAward /> },
];