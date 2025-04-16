import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaMobile, FaReact, FaNodeJs, FaPython, FaGithub } from 'react-icons/fa';

const AboutContainer = styled.section`
  padding: 6rem 2rem;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutText = styled.div`
  h2 {
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 1.5rem;
    position: relative;

    @media (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
`;

const AboutImage = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const SkillItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    font-size: 1.5rem;
    color: #5133ff;
  }

  span {
    color: #fff;
    font-size: 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  color: #fff;
  margin-bottom: 1rem;
  font-family: 'Syncopate', sans-serif;
  text-align: center;

  span {
    color: #ff3333;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 4rem;
  text-align: center;
  font-family: 'Outfit', sans-serif;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
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
    background: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255, 51, 51, 0.1) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: #ff3333;

    &::before {
      opacity: 1;
    }
  }

  h3 {
    font-size: 1.5rem;
    color: #ff3333;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-family: 'Syncopate', sans-serif;

    svg {
      font-size: 1.8rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    font-family: 'Outfit', sans-serif;
    font-size: 1.1rem;
  }
`;

const TechStack = styled(motion.div)`
  margin-top: 4rem;
  text-align: center;
`;

const TechTitle = styled(motion.h3)`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 2rem;
  font-family: 'Syncopate', sans-serif;
`;

const TechGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const TechIcon = styled(motion.div)`
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    color: #ff3333;
    transform: translateY(-5px);
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Привет, я <span>Данил</span>
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Я Full-stack разработчик с более чем 3-летним опытом создания современных веб-приложений.
          Моя страсть - превращать сложные идеи в элегантные и интуитивно понятные решения.
        </Subtitle>
        <Grid>
          <SkillCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3><FaCode /> Frontend</h3>
            <p>
              Создаю отзывчивые и современные пользовательские интерфейсы с использованием React, 
              уделяя особое внимание производительности и пользовательскому опыту.
            </p>
          </SkillCard>
          <SkillCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3><FaServer /> Backend</h3>
            <p>
              Разрабатываю надежные и масштабируемые серверные решения на Node.js и Python,
              с опытом работы с различными базами данных и API.
            </p>
          </SkillCard>
          <SkillCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3><FaMobile /> Mobile</h3>
            <p>
              Создаю кроссплатформенные мобильные приложения с использованием React Native,
              обеспечивая нативный опыт на iOS и Android.
            </p>
          </SkillCard>
        </Grid>
        <TechStack
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <TechTitle>Мой технологический стек</TechTitle>
          <TechGrid>
            <TechIcon
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaReact />
            </TechIcon>
            <TechIcon
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaNodeJs />
            </TechIcon>
            <TechIcon
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPython />
            </TechIcon>
            <TechIcon
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
            </TechIcon>
          </TechGrid>
        </TechStack>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About; 