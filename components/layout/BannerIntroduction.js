import { Box, Text, Flex, Image } from 'rebass';
import { differenceInYears } from 'date-fns';

export default function BannerIntroduction() {
  const IMAGE_URL = 'https://avatars.githubusercontent.com/u/25325644?v=4';

  const profileInformation = [
    { label: 'Age', value: differenceInYears(Date.now(), new Date(1998, 3, 3)) },
    { label: 'Nationality', value: 'Portuguese' },
    { label: 'Current job', value: 'xgeeks - Software Engineer' },
  ];

  return (
    <Box
      backgroundColor="white"
      mx="auto"
      width={['95%', null, '70%']}
      p={4}
      sx={{
        position: 'relative',
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.4)',
        overflowY: 'auto'
      }}
    >
      <Flex mx={-2} flexWrap="wrap">
        <Box width={[1, null, 1 / 5]} px={2}>
          <Image
            src={IMAGE_URL}
            alt={IMAGE_URL}
            width={['50%', null, '100%']}
            mx="auto"
            display="block"
            mb={4}
          ></Image>
        </Box>
        <Box width={[1, null, 4 / 5]} px={4}>
          <Text as="h1" fontWeight={400} color="black">
            Hi, I'm Rui Silva
          </Text>
          <Text as="p">
            Web Developer - Fullstack developer
          </Text>
          
          <Box as='hr' my={3} sx={{ bg: 'gray', border: 0, height: 1 }} />

          {profileInformation.map((info, index) => (
            <Flex flexWrap="wrap" key={index} mb={3}>
              <Box width={[1, null, 1 / 3]}>
                <Text as="p">{info.label}</Text>
              </Box>
              <Box width={[1, null, 2 / 3]}>
                <Text color="grey" as="p">{info.value}</Text>
              </Box>
            </Flex>
          ))}
        </Box>
      </Flex>
    </Box>
  );
}