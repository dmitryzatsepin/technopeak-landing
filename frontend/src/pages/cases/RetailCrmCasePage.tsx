// src/pages/cases/RetailCrmCasePage.tsx
import { Text, Title, List, ListItem, ThemeIcon, Stack } from '@mantine/core';
import { IconTargetArrow, IconSettings, IconGraph, IconCircleCheck } from '@tabler/icons-react';
import { CaseStudyPageLayout } from '../../layouts/cases/CaseStudyPageLayout'; // Проверьте путь
import case1ImageUrl from '../../assets/img/case1.png'; // Изображение для этого кейса

export function RetailCrmCasePage() {
  const caseData = {
    title: "CRM Overhaul for Retail Giant",
    category: "Retail",
    heroImage: case1ImageUrl,
    problem: "Our client, a leading retail chain, faced challenges with an outdated CRM system leading to inefficient sales processes, poor customer data management, and missed sales opportunities.",
    solution: [
      "Conducted a thorough analysis of existing processes and C_R_M capabilities.",
      "Designed and implemented a new, customized S_a_l_e_s_f_o_r_c_e Sales Cloud solution.",
      "Migrated data from the legacy system with a focus on data cleansing and integrity.",
      "Integrated the new C_R_M with e-commerce, M_S_S, and inventory management systems.",
      "Provided comprehensive training for sales and marketing teams."
    ],
    results: [
      "30% increase in sales team efficiency within the first 6 months.",
      "Improved customer data accuracy by 95%.",
      "20% growth in customer retention rates.",
      "Enhanced visibility into sales pipeline and forecasting accuracy.",
      "Streamlined marketing campaign management and lead nurturing."
    ]
  };

  return (
    <CaseStudyPageLayout
      caseTitle={caseData.title}
      category={caseData.category}
      heroImage={caseData.heroImage}
      breadcrumbLabel="Retail CRM Overhaul" // Краткое название для хлебных крошек
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
        {/* Можно добавить еще секции: Technologies Used, Client Testimonial, etc. */}
      </Stack>
    </CaseStudyPageLayout>
  );
}