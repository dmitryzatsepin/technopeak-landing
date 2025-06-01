// src/pages/cases/CloudMigrationCasePage.tsx
import { Text, Title, List, ListItem, ThemeIcon, Stack, Image } from '@mantine/core'; // Добавил Image
import { IconTargetArrow, IconSettings, IconGraph, IconCircleCheck } from '@tabler/icons-react';
import { CaseStudyPageLayout } from '../../layouts/cases/CaseStudyPageLayout'; // Проверьте путь
import case2ImageUrl from '../../assets/img/case2.png'; // Изображение для этого кейса (второй кейс)

export function CloudMigrationCasePage() {
  const caseData = {
    title: "Secure Cloud Migration for Finance Corporation",
    category: "Finance",
    heroImage: case2ImageUrl,
    problem: "A prominent financial corporation was reliant on aging on-premise legacy systems, leading to high maintenance costs, scalability limitations, and increasing security vulnerabilities. They needed a robust, secure, and compliant cloud solution.",
    solution: [
      "Conducted a comprehensive audit of existing infrastructure and applications.",
      "Designed a phased cloud migration strategy to AWS, prioritizing critical systems and data security.",
      "Re-platformed and re-factored applications for cloud-native compatibility and performance.",
      "Implemented advanced security measures, including encryption, IAM, and WAF, to meet stringent financial regulations.",
      "Ensured business continuity with minimal downtime during migration phases and provided post-migration support."
    ],
    results: [
      "Reduced IT operational costs by 35% annually.",
      "Achieved 99.99% system uptime and significantly improved disaster recovery capabilities.",
      "Enhanced system scalability, allowing for rapid deployment of new financial products.",
      "Strengthened overall security posture and ensured full compliance with financial industry regulations (e.g., PCI DSS, GDPR).",
      "Improved agility and speed of innovation for new service development."
    ]
  };

  return (
    <CaseStudyPageLayout
      caseTitle={caseData.title}
      category={caseData.category}
      heroImage={caseData.heroImage}
      breadcrumbLabel="Finance Cloud Migration" // Краткое название для хлебных крошек
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
            icon={<ThemeIcon color="indigo" size={20} radius="xl"><IconCircleCheck size={12} /></ThemeIcon>}
          >
            {caseData.solution.map((item, index) => <ListItem key={index}>{item}</ListItem>)}
          </List>
        </section>

        <section>
          <Title order={3} mb="md"><IconGraph size={24} style={{ marginRight: 8 }} /> The Results</Title>
          <List
            spacing="xs"
            size="sm"
            icon={<ThemeIcon color="green" size={20} radius="xl"><IconCircleCheck size={12} /></ThemeIcon>}
          >
            {caseData.results.map((item, index) => <ListItem key={index}>{item}</ListItem>)}
          </List>
        </section>
      </Stack>
    </CaseStudyPageLayout>
  );
}