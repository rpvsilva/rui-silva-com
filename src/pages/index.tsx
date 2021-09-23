import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Box } from 'rebass';
import { GetStaticProps } from 'next';
import { useFetcher } from 'hooks/useFetcher';


type SectionData = {
  id: number;
  label: string;
  section_id: string;
  component: string;
  order: string;
  showInNavbar: boolean,
  published_at: string;
  created_at: string;
  updated_at: string;
}

type Section = { section: string; data: any };


const importSection = (section) =>
  dynamic(() => import(`components/sections/${section}.tsx`));

const App = ({ sectionsProps, ...props }) => {
  const sectionsWithComponents = props.sections.map((section) => ({
    ...section,
    componentName: section.component,
    component: importSection(section.component),
  }));

  return (
    <Box>
      <Head>
        <title>Rui Silva &bull; Resume Website</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script src="https://www.google.com/recaptcha/api.js" async defer />
      </Head>

      <Box>
        {sectionsWithComponents.map(
          (section) =>
            section.component && (
              <Box key={section.id} mt={0}>
                {React.createElement(section.component, {
                  label: section.label,
                  id: section.section_id,
                  data: sectionsProps[section.componentName],
                })}
              </Box>
            )
        )}
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const sections = await useFetcher<SectionData[]>('/sections');

  // sort the section by the order number in CMS
  sections.sort((a, b) => (a.order < b.order ? -1 : 1));


  // import each section file
  const sectionsData: Section[] = [];

  for await (const { component } of sections) {
    const { fetchData }: { fetchData?: () => Promise<any> } = await import(`components/sections/${component}.tsx`);
      
    if(fetchData)  sectionsData.push({ section: component, data: await fetchData() });
  }

  const props = sectionsData.reduce((acc, { section, data }) => {

    if(!section || !data) return acc;

    acc.sectionsProps[section] = data;

    return acc;
  }, { sections, sectionsProps: {} })


  // console.log(props);

  return { props };
};

export default App;
