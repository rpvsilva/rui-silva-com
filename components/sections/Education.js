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

export default function Education({ label, id }) {

  return (
    <Box id={id} px={4} pt={1} pb={4} backgroundColor="#2c3340">
      <Box my={4} width={[1, null, 2 / 3]} mx="auto">
        <Text as="h2" color="white"  my={4} textAlign="center">{label}</Text>
        <Flex flexWrap="wrap">
          <Box width={[1, null, 1 / 2]} p={2}>
            <Box height="100%" width={1} p={3} backgroundColor="white">
              <Icon 
                mb={4} 
                fontSize="100px" 
                textAlign="center" 
                height="100px" 
                icon="icon-graduation"
                color="#2c3340"
              />
              <Text as="h3">Polytechnic Institute of Leiria</Text>
              <Text as="p" fontSize={14} color="grey">Bachelor's degree, Computer Science</Text>
              <Text as="p" fontSize={12} color="grey">2016 - 2019</Text>
              <Box mt={3}>
                <Text as="h4">Split – Final Project | 18</Text>
                <List>
                  <li>Multiplatform system to help manage shared houses. Expenses management, shopping list management, tasks and events management.</li>
                  <li>Development of a RESTful API and a chat with integration with the mobile application. Technologies used: ReactJS, ExpressJS, SocketIO, SequelizeJS, MySQL, Material-UI.</li>
                  <li>Web server administration, Linux and SSL certificate.</li>
                  <li>Project management based on agile methodologies, Scrum and Kanban, with Git and Trello.</li>
                </List>
              </Box>
            </Box>
          </Box>
          <Box width={[1, null, 1 / 2]} p={2}>
            <Box height="100%" width={1} p={3} backgroundColor="white">
            <Icon 
                mb={4} 
                fontSize="100px" 
                textAlign="center" 
                height="100px" 
                icon="icon-certificate"
                color="#2c3340" 
              />
              <Text as="h3">Colégio de São Miguel</Text>
              <Text as="p" fontSize={14} color="grey">High School Diploma, Programming Technician</Text>
              <Text as="p" fontSize={12} color="grey">2013 - 2016</Text>
              <List>
                <li>Starting with programming languages: C, Java, PHP</li>
                <li>Creating first websites with HTML, CSS and Javascript</li>
              </List>
              <Text as="h4">Bild Corp - Internship</Text>
              <List>
                <li>Websites implementation using Laravel, JQuery, HTML and CSS</li>
              </List>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
