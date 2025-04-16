import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Portfolio3D from './components/Portfolio3D';
import Testimonials from './components/Testimonials';
import Timeline from './components/Timeline';
import SkillsMap from './components/SkillsMap';
import Wiki from './components/Wiki';
import Shop from './components/Shop';
import styled from 'styled-components';

const AppContainer = styled.div`
  background: #000;
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  overflow-x: hidden;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Navigation />
          <MainContent>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Portfolio3D />
                  <SkillsMap />
                  <Timeline />
                  <Testimonials />
                </>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wiki" element={<Wiki />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App; 