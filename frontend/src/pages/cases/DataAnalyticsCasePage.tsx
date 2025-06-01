// src/pages/cases/DataAnalyticsCasePage.tsx
import { Text, Title, List, ListItem, ThemeIcon, Stack, Image } from '@mantine/core'; // Добавил Image
import { IconTargetArrow, IconSettings, IconGraph, IconCircleCheck } from '@tabler/icons-react';
import { CaseStudyPageLayout } from '../../layouts/cases/CaseStudyPageLayout'; // Проверьте путь
import case3ImageUrl from '../../assets/img/case3.png'; // Изображение для этого кейса (третий кейс)

export function DataAnalyticsCasePage() {
  const caseData = {
    title: "Data Analytics Platform for Logistics Company",
    category: "Logistics",
    heroImage: case3ImageUrl,
    problem: "A major logistics company struggled with disparate data sources, lacking a unified view of their operations. This inefficiency hindered real-time decision-making, route optimization, and predictive demand forecasting, impacting overall operational costs and customer satisfaction.",
    solution: [
      "Developed a custom, scalable data analytics platform integrating multiple data streams (GPS, TMS, WMS, customer data).",
      "Implemented a robust data warehouse solution for centralized data storage and efficient querying.",
      "Integrated advanced Business Intelligence (BI) tools (e.g., Tableau, Power BI) for dynamic visualizations and interactive dashboards.",
      "Designed custom reports tailored to specific KPIs for different departments (operations, finance, sales).",
      "Provided comprehensive training sessions for key personnel on data interpretation and platform utilization."
    ],
    results: [
      "Achieved real-time, 360-degree visibility into key operational metrics and fleet performance.",
      "Reduced decision-making time regarding route adjustments and resource allocation by an average of 40%.",
      "Improved route optimization algorithms, leading to a 15% reduction in fuel consumption and CO2 emissions.",
      "Enhanced predictive capabilities for demand forecasting, improving resource planning and reducing idle times.",
      "Empowered management with data-driven insights for strategic planning and continuous improvement."
    ]
  };

  return (
    <CaseStudyPageLayout
      caseTitle={caseData.title}
      category={caseData.category}
      heroImage={caseData.heroImage}
      breadcrumbLabel="Logistics Data Analytics" // Краткое название для хлебных крошек
    >
      <Stack gap="xl">
        <section>
          <Title order={3} mb="md"><IconTargetArrow size={24} style={{ marginRight: 8 }} /> The Challenge</Title>
          <Text>{caseData.problem}</Text>
        </section>

        <section>
          <Title order={3} mb="md"><IconSettings size={24} style={{ marginRight: 8 }} /> Our Solution</Title>
          <List
            spacing="xs"
            size="sm"
            icon={<ThemeIcon color="blue" size={20} radius="xl"><IconCircleCheck size={12} /></ThemeIcon>}
          >
            {caseData.solution.map((item, index) => <ListItem key={index}>{item}</ListItem>)}
          </List>
        </section>

        <section>
          <Title order={3} mb="md"><IconGraph size={24} style={{ marginRight: 8 }} /> The Results</Title>
          <List
            spacing="xs"
            size="sm"
            icon={<ThemeIcon color="teal" size={20} radius="xl"><IconCircleCheck size={12} /></ThemeIcon>}
          >
            {caseData.results.map((item, index) => <ListItem key={index}>{item}</ListItem>)}
          </List>
        </section>
      </Stack>
    </CaseStudyPageLayout>
  );
}