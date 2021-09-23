import { useFetcher } from 'hooks/useFetcher';
import { Box, Flex, Text } from 'rebass';
import { Props } from 'types';

type ExperienceData = {
  id: number;
  company: string;
  role: string;
  start: number;
  end: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  contents: Content[];
}

type Content = {
  id: number;
  name: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

const Badge = (props) => (
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
  />
);

export default function Experience({ label, id, data }: Props<ExperienceData[]>) {
  console.log({ data });
  return (
    <Box id={id} p={4} backgroundColor="#2c3340">
      <Box my={4} width={[1, null, 2 / 3]} mx="auto">
        <Text textAlign="center" as="h2" my={4} color="white">
          {label}
        </Text>

        <Flex flexWrap="wrap" py={4}>
          {data.map(({ id, company, role, end, start, contents }) => (
            <Box key={id} p={2} width={[1, 1 / 2, 1 / 3]}>
              <Box height="100%" p={3} backgroundColor="white">
                <Text as="h3">{company}</Text>
                <Text as="p" fontSize={14} color="grey">
                  {role}
                </Text>
                <Text as="p" fontSize={12} color="grey">
                  {start} - {end || 'present'}
                </Text>

                {contents && (
                  <Box mt={1}>
                    {contents.map((content) => (
                      <Badge
                        mr={2}
                        mt={2}
                        key={content.id}
                        backgroundColor="#2c3340"
                      >
                        {content.name}
                      </Badge>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

export function fetchData() {
  return useFetcher<ExperienceData[]>('/experiences');
}
