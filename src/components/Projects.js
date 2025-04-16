import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProjectsContainer = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #0a0a1f 0%, #1a1a3a 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
  padding-top: 80px;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    padding-top: 70px;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #fff;
  margin-bottom: 2rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.1;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    transform: none;
    bottom: -10px;
    width: 60px;
    height: 4px;
    background: #ff3333;
    box-shadow: 0 0 10px rgba(255, 51, 51, 0.5);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    margin: 0 auto;
    max-width: 100%;
    width: 100%;
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const ProjectTag = styled.span`
  background: rgba(81, 51, 255, 0.2);
  color: #5133ff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ProjectLink = styled.a`
  flex: 1;
  text-align: center;
  padding: 0.8rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #5133ff, #8066ff);
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(81, 51, 255, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
  }
`;

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Современная платформа электронной коммерции с поддержкой множества платежных систем и интеграцией с CRM.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      title: "AI Chat Application",
      description: "Чат-приложение с интеграцией искусственного интеллекта для автоматизации ответов и анализа данных.",
      tech: ["Python", "TensorFlow", "React", "WebSocket"]
    },
    {
      title: "Portfolio Website",
      description: "Персональный сайт-портфолио с современным дизайном и интерактивными элементами.",
      tech: ["React", "Styled Components", "Framer Motion"]
    }
  ];

  return (
    <ProjectsContainer>
      <SectionTitle>Проекты</SectionTitle>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <ProjectImage>
              {/* Placeholder for project image */}
            </ProjectImage>
            <ProjectInfo>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTags>
                {project.tech.map((tech, techIndex) => (
                  <ProjectTag key={techIndex}>{tech}</ProjectTag>
                ))}
              </ProjectTags>
              <ProjectLinks>
                <ProjectLink href="#">Подробнее</ProjectLink>
                <ProjectLink href="#">Ссылка на проект</ProjectLink>
              </ProjectLinks>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

export default Projects; 