import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillsContainer = styled.section`
  padding: 100px 5%;
  background: #000;
  color: white;
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 50px;
  color: #ff3333;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: #ff3333;
  }
`;

const SkillName = styled.h3`
  color: #ff3333;
  margin: 0 0 15px 0;
  font-size: 1.5rem;
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: #ff3333;
  border-radius: 4px;
`;

const SkillDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.6;
  font-size: 1rem;
`;

const SkillDetails = styled(motion.div)`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const skillsData = [
  {
    name: "Frontend Development",
    level: 90,
    description: "React, Vue.js, TypeScript, HTML5, CSS3, SASS",
    details: "Создание современных пользовательских интерфейсов, работа с состоянием приложения, оптимизация производительности"
  },
  {
    name: "Backend Development",
    level: 85,
    description: "Node.js, Express, Python, Django, PostgreSQL, MongoDB",
    details: "Разработка RESTful API, работа с базами данных, микросервисная архитектура"
  },
  {
    name: "DevOps",
    level: 80,
    description: "Docker, Kubernetes, AWS, CI/CD, Git",
    details: "Автоматизация развертывания, управление инфраструктурой, мониторинг"
  },
  {
    name: "UI/UX Design",
    level: 75,
    description: "Figma, Adobe XD, Photoshop, Illustrator",
    details: "Создание пользовательских интерфейсов, прототипирование, дизайн-системы"
  }
];

const SkillsMap = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedSkill, setSelectedSkill] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <SkillsContainer>
      <Title>Навыки</Title>
      <SkillsGrid
        ref={ref}
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {skillsData.map((skill, index) => (
          <SkillCard
            key={index}
            variants={cardVariants}
            onClick={() => setSelectedSkill(selectedSkill === index ? null : index)}
          >
            <SkillName>{skill.name}</SkillName>
            <SkillLevel>
              <SkillProgress
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </SkillLevel>
            <SkillDescription>{skill.description}</SkillDescription>
            {selectedSkill === index && (
              <SkillDetails
                variants={detailsVariants}
                initial="hidden"
                animate="visible"
              >
                {skill.details}
              </SkillDetails>
            )}
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsContainer>
  );
};

export default SkillsMap; 