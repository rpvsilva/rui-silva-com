import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Box } from 'rebass';
import { useDispatch } from 'react-redux';
import { setSections } from '../store/actions';

const importSection = (section) => dynamic(() => import(`../components/sections/${section}.js`));

export default function App({ sectionsProps, ...props }) {
  const dispatch = useDispatch();

  dispatch(setSections(props.sections));

  const sections = props.sections.map((section) => ({
    ...section,
    componentName: section.component,
    component: importSection(section.component),
  }));

  return (
    <Box>
      <Head>
        <title>Rui Silva &bull; Resume Website</title>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <script src="https://www.google.com/recaptcha/api.js" async defer />
      </Head>

      <Box>
        {sections.map((section) => (
          section.component && (
            <Box key={section.id} mt={0}>
              {React.createElement(section.component, { label: section.label, id: section.section_id, data: sectionsProps[section.componentName] })}
            </Box>
          )
        ))}
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  const sections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sections`)
    .then((res) => res.json())
    .then((res) => res);

  // sort the section by the order number in CMS
  sections.sort((a, b) => (a.order < b.order ? -1 : 1));

  const promises = [];

  // import each section file
  sections.map((section) => {
    if (section.component) {
      // get the fetchData function to get each request to enrich their content
      const promise = new Promise(async (resolve) => {
        const { fetchData } = await import(`../components/sections/${section.component}.js`);
        if (fetchData) {
          return resolve({ section: section.component, data: await fetchData() });
        }
        return resolve({});
      });
      promises.push(promise);
    }
  });

  const props = { sections, sectionsProps: {} };
  await Promise.all(promises).then((response) => {
    response.map(({ section, data }) => {
      if (!section || !data) return null;
      props.sectionsProps[section] = data;
      return { section, data };
    });
  });

  return {
    props,
  };
}
