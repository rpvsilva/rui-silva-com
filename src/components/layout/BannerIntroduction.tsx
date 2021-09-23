import { Information } from 'components/sections/Navbar';
import { IMAGE_URL } from 'constants/index';
import React from 'react';
import { Box, Flex, Image, Text } from 'rebass';

type Props = {
  information: Information
}

const BannerIntroduction = ({ information }: Props) => {
  const { name, role, informations } = information;

  return (
    <Box
      backgroundColor="white"
      mx="auto"
      width={['95%', null, '70%']}
      p={4}
      sx={{
        position: 'relative',
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.4)',
        overflowY: 'auto',
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
          />
        </Box>
        <Box width={[1, null, 4 / 5]} px={4}>
          <Text as="h1" fontWeight={400} color="black">
            Hi, I'm {name}
          </Text>
          <Text as="p">{role}</Text>

          <Box as="hr" my={3} sx={{ bg: 'gray', border: 0, height: 1 }} />

          {informations.map((info) => (
            <Flex flexWrap="wrap" key={info.id} mb={3}>
              <Box width={[1, null, 1 / 3]}>
                <Text as="p">{info.label}</Text>
              </Box>
              <Box width={[1, null, 2 / 3]}>
                <Text color="grey" as="p">
                  {info.value}
                </Text>
              </Box>
            </Flex>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default BannerIntroduction;
