// src/Router.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
// Страницы услуг
import { GovernmentServicePage } from './pages/services/GovernmentServicePage';
import { RealEstateDeveloperServicePage } from './pages/services/RealEstateDeveloperServicePage';
import { RealEstateBrokerageServicePage } from './pages/services/RealEstateBrokerageServicePage';
// Страницы кейсов
import { RetailCrmCasePage } from './pages/cases/RetailCrmCasePage';
import { DataAnalyticsCasePage } from './pages/cases/DataAnalyticsCasePage'; // Убедитесь, что этот файл создан и экспортирует компонент
import { CloudMigrationCasePage } from './pages/cases/CloudMigrationCasePage'; // Убедитесь, что этот файл создан и экспортирует компонент

export function Router() { // <--- ВАЖНО: export function Router
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* Маршруты для страниц услуг */}
      <Route path="/solutions/government" element={<GovernmentServicePage />} />
      <Route path="/solutions/real-estate-developer" element={<RealEstateDeveloperServicePage />} />
      <Route path="/solutions/real-estate-brokerage" element={<RealEstateBrokerageServicePage />} />

      {/* Маршруты для страниц кейсов (соответствующие portfolioData.ts и созданным файлам) */}
      <Route path="/cases/retail-crm" element={<RetailCrmCasePage />} />
      <Route path="/cases/logistics-data" element={<DataAnalyticsCasePage />} /> 
      <Route path="/cases/finance-cloud" element={<CloudMigrationCasePage />} /> 
      
      {/* Редирект для неизвестных путей или страница 404 */}
      <Route path="*" element={<Navigate to="/" replace />} /> 
    </Routes>
  );
}