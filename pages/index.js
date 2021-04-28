import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Navbar from '../components/layout/Navbar';
import { Box, Text } from 'rebass';

const importSection = section => dynamic(() => import(`../components/sections/${section}.js`));

export default function App() {

  const sections = [
    { label: 'about me', id: 'about', component: importSection('About') },
    { label: 'skills', id: 'skills', component: importSection('Skills') },
    { label: 'experience', id: 'experience', component: importSection('Experience') },
    { label: 'education', id: 'education', component: importSection('Education') },
    { label: 'contact me', id: 'contacts', component: importSection('Contacts') }
  ];

  return (
    <Box>
      <Head>
        <title>Rui Silva &bull; Resume Website</title>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </Head>
      <Navbar />

      <Box>
        {sections.map((section, index) => (
          section.component && <Box key={index} mt={0}>
            {React.createElement(section.component, { label: section.label, id: section.id })}
          </Box>
        ))}
      </Box>
    </Box>
  );
}