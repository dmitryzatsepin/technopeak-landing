// src/data/portfolioData.ts
import case1ImageUrl from '../assets/img/case1.png';
import case2ImageUrl from '../assets/img/case2.png';
import case3ImageUrl from '../assets/img/case3.png';

export interface CaseItem {
  image: string;
  title: string;
  category: string;
  description: string;
  link: string;
}

// Массив данных для кейсов
export const casesData: CaseItem[] = [
  {
    image: case1ImageUrl,
    title: 'CRM Overhaul for Retail Giant',
    category: 'Retail',
    description: 'Complete CRM system implementation resulting in a 30% increase in sales efficiency.',
    link: '/cases/retail-crm',
  },
  {
    image: case2ImageUrl,
    title: 'Cloud Migration for Finance Corp',
    category: 'Finance',
    description: 'Migrated legacy systems to a secure cloud infrastructure, improving performance and scalability.',
    link: '/cases/finance-cloud',
  },
  {
    image: case3ImageUrl,
    title: 'Data Analytics Platform for Logistics Company with Extremely Long Name',
    category: 'Logistics',
    description: 'Developed a custom data analytics platform providing real-time insights into operations. This involved complex data warehousing and BI tool integration.',
    link: '/cases/logistics-data',
  },
  // Добавьте больше кейсов по необходимости
];