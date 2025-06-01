// src/Router.tsx (или где у вас настроен роутинг)
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/Home.page'; // Ваша главная страница
// Импорты для новых страниц услуг (мы их создадим позже)
import { GovernmentServicePage } from './pages/services/GovernmentServicePage';
import { RealEstateDeveloperServicePage } from './pages/services/RealEstateDeveloperServicePage';
import { RealEstateBrokerageServicePage } from './pages/services/RealEstateBrokerageServicePage';
import { RetailCrmCasePage } from './pages/cases/RetailCrmCasePage';
import { DataAnalyticsCasePage } from './pages/cases/DataAnalyticsCasePage';
import { CloudMigrationCasePage } from './pages/cases/CloudMigrationCasePage';

export function Router() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Маршруты для страниц услуг */}
        <Route path="/solutions/government" element={<GovernmentServicePage />} />
        <Route path="/solutions/real-estate-developer" element={<RealEstateDeveloperServicePage />} />
        <Route path="/solutions/real-estate-brokerage" element={<RealEstateBrokerageServicePage />} />

        {/* Маршруты для страниц кейсов */}
        <Route path="/cases/retail-crm" element={<RetailCrmCasePage />} />
        <Route path="/cases/logistics-data" element={<DataAnalyticsCasePage />} />
        <Route path="/cases/finance-cloud" element={<CloudMigrationCasePage />} />
        
        {/* Редирект для неизвестных путей или страница 404 */}
        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
  );
}