import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PortfolioSection = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 80px 20px;
  background: #0a0a0f;
  scroll-snap-align: start;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #5133ff, #8066ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(81, 51, 255, 0.3));
`;

const PortfolioGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  perspective: 1000px;
`;

const PortfolioCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(81, 51, 255, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(81, 51, 255, 0.3);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(81, 51, 255, 0.2);

    &::before {
      transform: translateX(100%);
    }
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: rgba(81, 51, 255, 0.1);
  color: #5133ff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(81, 51, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(81, 51, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const portfolioData = [
  {
    title: "Игровой сервер Minecraft",
    description: "Разработка и поддержка многопользовательского сервера с уникальными механиками и плагинами",
    image: "/images/minecraft-server.jpg",
    tech: ["Java", "Spigot API", "MySQL", "Redis"]
  },
  {
    title: "Веб-приложение для управления",
    description: "Создание административной панели для управления игровым сервером и пользователями",
    image: "/images/admin-panel.jpg",
    tech: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    title: "Мобильное приложение",
    description: "Разработка мобильного приложения для взаимодействия с игровым сервером",
    image: "/images/mobile-app.jpg",
    tech: ["React Native", "Firebase", "Redux"]
  }
];

const PortfolioBlock = () => {
  return (
    <PortfolioSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ContentWrapper>
        <Title>Мои проекты</Title>
        <PortfolioGrid>
          {portfolioData.map((project, index) => (
            <PortfolioCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <CardImage>
                <img src={project.image} alt={project.title} />
              </CardImage>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
              <TechStack>
                {project.tech.map((tech, techIndex) => (
                  <TechTag key={techIndex}>{tech}</TechTag>
                ))}
              </TechStack>
            </PortfolioCard>
          ))}
        </PortfolioGrid>
      </ContentWrapper>
    </PortfolioSection>
  );
};

export default PortfolioBlock; 