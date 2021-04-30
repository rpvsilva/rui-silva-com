import { useState } from 'react';
import { Box, Link as RebassLink } from 'rebass';
import styled from 'styled-components';


const Hamburguer = styled(Box)`
  position: absolute;
  right: 32px;
  cursor: pointer;
  z-index: 99999;

  span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: white;
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                opacity 0.55s ease;
  }
  
  span:nth-last-child(1) {
    transform-origin: 0% 100%;
  }
  ${props => props.open && `
    span:nth-last-child(3) {
      transform: rotate(45deg) translate(-2px, -1px);
    }

    span:nth-last-child(2) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }

    span:nth-last-child(1) {
      transform: rotate(-45deg) translate(0, -1px);
    }
  `}
`;

const SideBar = styled(Box)`
    position: fixed;
    background-color: #2c3340;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    right: 0;
    top: 0;
    height: 100%;
    width: 0;
    transition: width 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
    padding-top: 82px;
    z-index: 9999;

    ${props => props.open && `
      width: 250px;
    `}
`;

const Link = styled(RebassLink)`
  ${props => props.active && `
    border-bottom: 2px solid white;
    margin-bottom: -2px;
  `}
`;

export default function NavbarItems({ navbarItems, activeItem, scrolled }) {

  const [sideBar, setSideBar] = useState(false)

  const isItemActive = goTo => {
    return activeItem && activeItem.id === goTo;
  };

  return (
    <Box>
      <Box
        sx={{
          '@media(max-width: 52em)': {
            display: 'none'
          }
        }}
      >
        {navbarItems.map((item, index) => (
          <Link mx={2} key={index} variant='nav' href={item.goTo} active={isItemActive(item.goTo)}>
            {item.label}
          </Link>
        ))}
      </Box>
      <Hamburguer
        onClick={() => setSideBar(!sideBar)}
        open={sideBar}
        sx={{
          top: scrolled ? '16px' : '32px',
          '@media(min-width: 52em)': {
            display: 'none'
          }
        }}
      >
        <Box as="span"></Box>
        <Box as="span"></Box>
        <Box as="span"></Box>
      </Hamburguer>
      <SideBar 
        open={sideBar}
        textAlign="right"
      >
        {navbarItems.map((item, index) => (
          <Link
            display="block"
            p={2}
            key={index}
            href={item.goTo}
            active={isItemActive(item.goTo)}
          >
            {item.label}
          </Link>
        ))}
      </SideBar>
      <Box
        onClick={() => setSideBar(false)}
        display={!sideBar && 'none'}
        sx={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }}
      ></Box>
    </Box>
  );
}