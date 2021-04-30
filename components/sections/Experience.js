import { Box, Flex, Text } from 'rebass';

export default function Experience({ label, id, data: experience }) {

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
          {experience.map(exp => (
            <Box key={exp.id} p={2} width={[1, 1 / 2, 1 / 3]}>
              <Box height="100%" p={3} backgroundColor="white">
                <Text as="h3">{exp.company}</Text>
                <Text as="p" fontSize={14} color="grey">{exp.role}</Text>
                <Text as="p" fontSize={12} color="grey">{exp.start} - {exp.end || 'present'}</Text>

                {exp.contents && <Box mt={1}>
                  {exp.contents.map(content => <Badge mr={2} mt={2} key={content.id} backgroundColor="#2c3340">{content.name}</Badge>)}
                </Box>}
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export async function fetchData() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences`)
    .then(res => res.json())
    .then(res => res.reverse());
}