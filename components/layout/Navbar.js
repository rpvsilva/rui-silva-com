import { useEffect } from 'react';
import { Flex, Text, Box, Link } from 'rebass';
import styled from 'styled-components';

import BannerIntroduction from './BannerIntroduction';

const BannerBox = styled(Box)`
    height: 350px;
    background-image: url(https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1920);
    background-size: cover;
    background-position: center center;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(44, 51, 64, 0.7);
    }
`;

export default function Navbar() {
  const navbarItems = [
    { label: 'home', goTo: '#home' },
    { label: 'about', goTo: '#about' },
    { label: 'experience', goTo: '#experience' },
    { label: 'education', goTo: '#education' },
    { label: 'skills', goTo: '#skills' },
    { label: 'contacts', goTo: '#contacts' }
  ];

  const scrollEvent = e => {
    navbarItems.map(item => {
      const element = document.querySelector(item.goTo);
      if(element) {
        console.log(item.goTo, element.getBoundingClientRect());
      }
    });
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollEvent);

    return () => {
      document.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  return (
    <BannerBox id="home">
      <Flex
        p={4}
        color='white'
        alignItems='center'
        sx={{ position: 'relative' }}
        mb="4rem"
      >
        <Text fontWeight='bold'>rui silva</Text>
        <Box mx='auto' />
        {navbarItems.map((item, index) => (
          <Link mx={2} key={index} variant='nav' href={item.goTo}>
            {item.label}
          </Link>
        ))}
      </Flex>
      <BannerIntroduction />
    </BannerBox>
  );
}