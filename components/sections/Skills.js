import { Box, Flex, Text } from 'rebass';

export default function Skills({ label, id }) {

    const skills = [
        { label: 'VueJS', value: 90 },
        { label: 'ReactJS', value: 70 },
        { label: 'NodeJS', value: 80 },
        { label: 'Graphql', value: 80 },
        { label: 'AMP (Accelerated Mobile Pages)', value: 90 },
        { label: 'HTML & CSS', value: 70 },
        { label: 'Laravel', value: 70 },
        { label: 'Java', value: 50 }
    ]

    return (
        <Box width={[1, null, 2 / 3]} id={id} px={4} pt={1} pb={4} mb={4} mx="auto">
            <Text textAlign="center" as="h2" my={4}>{label}</Text>
            <Flex flexWrap="wrap">
                {skills.map((skill, index) => (
                    <Box width={[1, null, 1 / 2]} key={index} mb={3} px="4">
                        <Flex flexWrap="wrap">
                            <Text sx={{ flexGrow: 1 }} as="p" my={1}>{skill.label}</Text>
                            <Text as="p" my={1}>{skill.value} %</Text>
                        </Flex>
                        <Box sx={{ position: 'relative' }} backgroundColor="rgba(44, 51, 64, 0.2)" height={6} width={1}>
                            <Box 
                                sx={{ position: 'absolute', top: 0, left: 0 }} 
                                height="100%" 
                                backgroundColor="#2c3340"
                                width={`${skill.value}%`}
                            ></Box>
                        </Box>
                    </Box>
                ))}
            </Flex>
        </Box>
    )
}