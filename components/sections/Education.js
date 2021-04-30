import { Box, Flex, Text   } from 'rebass';
import Icon from '../layout/Icon'
import styled from 'styled-components';

const List = styled.ul`
  font-size: 14px;
  color: grey;

  li {
    margin-top: 1rem;
  }
`;

export default function Education({ label, id, data: educations }) {

  return (
    <Box id={id} p={4} backgroundColor="#2c3340">
      <Box my={4} width={[1, null, 2 / 3]} mx="auto">
        <Text as="h2" color="white"  my={4} textAlign="center">{label}</Text>
        <Flex flexWrap="wrap">
          {educations && educations.map(edu => (
            <Box key={edu.id} width={[1, null, 1 / 2]} p={2}>
              <Box height="100%" width={1} p={3} backgroundColor="white">
                <Icon 
                  mb={4} 
                  fontSize="100px" 
                  textAlign="center" 
                  height="100px" 
                  icon={edu.icon}
                  color="#2c3340"
                />
                <Text as="h3">{edu.school}</Text>
                <Text as="p" fontSize={14} color="grey">{edu.degree}</Text>
                <Text as="p" fontSize={12} color="grey">{edu.start_year} - {edu.end_year}</Text>
                <Box mt={3} dangerouslySetInnerHTML={{ __html: edu.description }}></Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

export async function fetchData() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/educations`)
    .then(res => res.json())
    .then(res => res);
}