import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaDiscord, FaShoppingCart, FaUser } from 'react-icons/fa';
import ProfileSidebar from './ProfileSidebar';
import HackerConsole from './HackerConsole';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 30, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(81, 51, 255, 0.3);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  span {
    background: linear-gradient(45deg, #5133ff, #8066ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(10, 10, 30, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 1px solid rgba(81, 51, 255, 0.3);

    &.active {
      display: flex;
    }
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(81, 51, 255, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #5133ff;
    
    &::before {
      transform: translateX(0);
    }
  }

  &.active {
    background: rgba(81, 51, 255, 0.1);
    color: #5133ff;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.primary ? 'linear-gradient(45deg, #5133ff, #8066ff)' : 'transparent'};
  color: #fff;
  border: ${props => props.primary ? 'none' : '2px solid #5133ff'};
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-family: inherit;
  text-transform: ${props => props.console ? "uppercase" : "none"};
  letter-spacing: ${props => props.console ? "1px" : "normal"};
  text-shadow: ${props => props.console ? "0 0 10px rgba(81, 51, 255, 0.5)" : "none"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(81, 51, 255, 0.2);
    background: ${props => props.primary ? 'linear-gradient(45deg, #5133ff, #8066ff)' : 'rgba(81, 51, 255, 0.1)'};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-bottom: 1px solid rgba(81, 51, 255, 0.1);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleConsole = () => {
    setIsConsoleOpen(!isConsoleOpen);
  };

  return (
    <>
      <NavContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: isScrolled ? 'rgba(10, 10, 15, 0.9)' : 'transparent',
          boxShadow: isScrolled ? '0 5px 20px rgba(0, 0, 0, 0.1)' : 'none'
        }}
      >
        <Logo to="/">
          <span>ПОРТФОЛИО</span>
        </Logo>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>

        <NavLinks className={isMobileMenuOpen ? 'active' : ''}>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Главная
          </NavLink>
          <NavLink to="/wiki" className={location.pathname === '/wiki' ? 'active' : ''}>
            Вики
          </NavLink>
          <NavLink to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>
            Магазин
          </NavLink>
          <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Контакт
          </NavLink>
        </NavLinks>

        <ActionButtons>
          <ActionButton
            console
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleConsole}
          >
            <FaUser /> КОНСОЛЬ
          </ActionButton>
          <ActionButton
            primary
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleProfile}
          >
            <FaUser /> Личный кабинет
          </ActionButton>
        </ActionButtons>
      </NavContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <NavLinks style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <NavLink to="/">Главная</NavLink>
              <NavLink to="/wiki">Вики</NavLink>
              <NavLink to="/shop">Магазин</NavLink>
              <NavLink to="/contact">Контакт</NavLink>
            </NavLinks>
          </MobileMenu>
        )}
      </AnimatePresence>

      <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <HackerConsole isOpen={isConsoleOpen} onClose={() => setIsConsoleOpen(false)} />
    </>
  );
};

export default Navigation; 