import { useFetcher } from 'hooks/useFetcher';
import { Box, Text } from 'rebass';
import { Props } from 'types';

type AboutData = {
  description: string;
};

const About = (props: Props<AboutData>) => {
  const {
    id,
    label,
    data: { description },
  } = props;

  return (
    <Box id={id} p={4} backgroundColor="#2c3340" textAlign="center">
      <Box my={4} width={[1, null, 2 / 3]} mx="auto">
        <Text as="h2" my={4} color="white">
          {label}
        </Text>
        <Text as="p" color="white">
          {description}
        </Text>
      </Box>
    </Box>
  );
};

export function fetchData() {
  return useFetcher<AboutData>('/about');
}

export default About;
