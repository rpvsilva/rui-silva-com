import { Box, Flex, Text } from 'rebass';

export default function Experience({ label, id }) {

  const experience = [
    { company: 'xgeeks', role: 'Software Engineer', content: [], start: 2021, end: null },
    { company: 'WebTales', role: 'Web Developer', content: ['VueJS', 'AMP', 'Graphql', 'NodeJS', 'AWS', 'GCP'], start: 2019, end: 2021 }
  ]

  const Badge = (props) => {
    return (
      <Box
        {...props}
        sx={{
          display: 'inline-block',
          color: 'white',
          bg: 'primary',
          px: 2,
          py: 1,
          borderRadius: 9999,
        }}
      ></Box>
    )
  }

  return (
    <Box id={id} p={4} backgroundColor="#2c3340">
      <Box my={4} width={[1, null, 2 / 3]} mx="auto">
        <Text textAlign="center" as="h2" my={4} color="white">{label}</Text>

        <Flex flexWrap="wrap" py={4}>
          {experience.map((exp, index) => (
            <Box key={index} p={2} width={[1, 1 / 2, 1 / 3]}>
              <Box height="100%" p={3} backgroundColor="white">
                <Text as="h3">{exp.company}</Text>
                <Text as="p" fontSize={14} color="grey">{exp.role}</Text>
                <Text as="p" fontSize={12} color="grey">{exp.start} - {exp.end || 'present'}</Text>

                {exp.content && <Box mt={1}>
                  {exp.content.map((content, index) => <Badge mr={2} mt={2} key={index} backgroundColor="#2c3340">{content}</Badge>)}
                </Box>}
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}