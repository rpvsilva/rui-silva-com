import { Box, Text } from 'rebass';
import { differenceInYears } from 'date-fns';

export default function About({ label, id }) {
    const AGE = differenceInYears(Date.now(), new Date(1998, 3, 3));

    return (
        <Box id={id} px={4} pt={1} pb={4} backgroundColor="#2c3340" textAlign="center">
            <Box my={4} width={[1, null, 2 / 3]} mx="auto">
                <Text as="h2" my={4} color="white">{label}</Text>
                <Text as="p" color="white">
                    Hello! My name is Rui Silva, I'm {AGE} years old. I am Web Developer specializing in full stack development.
                    I start on web development world with 15yo and since that I always wanted to know more, learn new technologies, new programming languages and learn how big things work.
                </Text>
            </Box>
        </Box>
    )
}