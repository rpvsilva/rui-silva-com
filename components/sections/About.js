import { Box, Text } from 'rebass';

export default function About({ label, id, data: { about } }) {

  return (
    <Box id={id} p={4} backgroundColor="#2c3340" textAlign="center">
      <Box my={4} width={[1, null, 2 / 3]} mx="auto">
        <Text as="h2" my={4} color="white">{label}</Text>
        <Text as="p" color="white">
          {about.description}
        </Text>
      </Box>
    </Box>
  )
}

export async function fetchData() {
  const about = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`)
    .then(res => res.json())
    .then(res => res);

    return { about }
}