import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Flex, Text, Box } from 'rebass';
import styled from 'styled-components';

import BannerIntroduction from '../layout/BannerIntroduction';
import NavbarItems from '../layout/NavbarItems';

const BannerBox = styled(Box)`
    height: 18rem;
    width: 100%;
    background-image: url(https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1920);
    background-size: cover;
    background-position: center center;
    position: absolute;
    top: 0;

    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(44, 51, 64, 0.7);
    }
`;

const Nav = styled(Flex)`
  padding: 32px;
  color: white;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 9999;
  transition: 0.2s linear;
  ${props => props.scrolled && `
    background-color: rgb(44, 51, 64);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    padding: 16px 32px;
  `}
`;

export default function Navbar({ data: infos }) {

  const [activeItem, setActiveItem] = useState(null);
  const [colorChange, setColorChange] = useState(false);
  const sections = useSelector(state => state.sections);

  const navbarItems = [
    { label: 'home', goTo: '#home' },
    ...sections.filter(section => section.showInNavbar).map(section => ({ label: section.label, goTo: `#${section.section_id}` }))
  ];

  useEffect(() => {
    const scrollEvent = e => {
      // CHECK IF USER IS SCROLLING TO CHANGE NAVBAR COLOR
      if(window.scrollY >= 82) {
        setColorChange(true);
      } else {
        setColorChange(false);
      }

      // GET ACTIVE ITEM FROM VIEWPORT
      let itemInViewport = null;
      // if it's in the beginning of the scroll select the first section
      if(window.scrollY === 0) {
        return setActiveItem({ id: navbarItems[0].goTo, distance: 0 });
      }
      // if it's in the end of the scroll select the last section
      if((window.scrollY + window.innerHeight) >= document.body.offsetHeight) {
        return setActiveItem({ id: navbarItems[navbarItems.length - 1].goTo, distance: 0 });
      }

      navbarItems.map(item => {
        const element = document.querySelector(item.goTo);
        if(!element) return;
        
        const boundingClientRect = element.getBoundingClientRect();
        if(boundingClientRect.top < 0 && boundingClientRect.height + Math.ceil(boundingClientRect.top) <= 1) return;
        
        if(!itemInViewport || itemInViewport.distance > boundingClientRect.top) {
          itemInViewport = { id: item.goTo, distance: boundingClientRect.top };
        }
      });

      // if it's the first time it scrolls and different than the previous active item
      if(itemInViewport && (!activeItem || itemInViewport.id !== activeItem.id)) {
        // should do this once, when you enter a new section
        setActiveItem(itemInViewport);
      }
    };

    document.addEventListener('scroll', scrollEvent);

    return () => {
      document.removeEventListener('scroll', scrollEvent);
    };
  }, [activeItem]);

  return (
    <Box id="home" sx={{ position: 'relative' }} pb={1} pt="100px" backgroundColor="#2c3340">
      <BannerBox />
      <Nav scrolled={colorChange}>
        <Text flexGrow={1} fontWeight='bold'>rui silva</Text>
        <NavbarItems scrolled={colorChange} navbarItems={navbarItems} activeItem={activeItem}/>
      </Nav>
      <BannerIntroduction infos={infos} />
    </Box>
  );
}

export async function fetchData() {
  const infos = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/infos`)
    .then(res => res.json())
    .then(res => res);
  
  let name = "";
  let role = "";

  const informations = [];

  infos.map(info => {
    switch(info.label.toLowerCase()) {
      case 'name': name = info.value;
      case 'role': role = info.value;
    }

    if(info.list) {
      informations.push(info);
    }
  })

  return {
    informations: informations,
    name: name,
    role: role
  }
}