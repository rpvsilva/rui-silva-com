import { useState } from 'react';
import { Box, Flex, Text } from 'rebass';

export default function Skills({ label, id, data: skills }) {
  if (!skills || !skills.length) return <Box />;

  return (
    <Box width={[1, null, 2 / 3]} id={id} p={4} mb={4} mx="auto">
      <Text color="#2c3340" textAlign="center" as="h2" my={4}>{label}</Text>
      <Flex flexWrap="wrap">
        {skills.map((skill) => (
          <Box width={[1, null, 1 / 2]} key={skill.id} mb={3} px={4}>
            <Flex flexWrap="wrap">
              <Text sx={{ flexGrow: 1 }} as="p" my={1}>{skill.technology.name}</Text>
              <Text as="p" my={1}>
                {skill.value}
                {' '}
                %
              </Text>
            </Flex>
            <Box sx={{ position: 'relative' }} backgroundColor="rgba(44, 51, 64, 0.2)" height={6} width={1}>
              <Box
                sx={{ position: 'absolute', top: 0, left: 0 }}
                height="100%"
                backgroundColor="#2c3340"
                width={`${skill.value}%`}
              />
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export async function fetchData() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills`)
    .then((res) => res.json())
    .then((res) => res);
}
