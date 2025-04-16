import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TimelineContainer = styled.section`
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

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 50px;
  color: #ff3333;
`;

const TimelineWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #5133ff, transparent);

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: ${props => props.align === 'right' ? 'flex-end' : 'flex-start'};
  margin-bottom: 3rem;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-left: 40px;
    margin-bottom: 2rem;
  }
`;

const TimelineContent = styled.div`
  width: 45%;
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 16px;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(81, 51, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(81, 51, 255, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    ${props => props.align === 'right' ? 'right: -10px' : 'left: -10px'};
    width: 20px;
    height: 20px;
    background: #5133ff;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(81, 51, 255, 0.5);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;

    &::before {
      left: -30px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const TimelineDate = styled.div`
  font-size: 1.2rem;
  color: #5133ff;
  margin-bottom: 1rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const TimelineDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const timelineData = [
  {
    date: "2023 - Настоящее время",
    role: "Senior Full Stack Developer",
    description: "Разработка высоконагруженных веб-приложений, микросервисная архитектура, DevOps"
  },
  {
    date: "2021 - 2023",
    role: "Full Stack Developer",
    description: "Создание полнофункциональных веб-приложений, работа с React и Node.js"
  },
  {
    date: "2019 - 2021",
    role: "Frontend Developer",
    description: "Разработка пользовательских интерфейсов, работа с современными фреймворками"
  },
  {
    date: "2017 - 2019",
    role: "Junior Developer",
    description: "Изучение основ веб-разработки, первые проекты"
  }
];

const Timeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <TimelineContainer>
      <Title>Опыт работы</Title>
      <TimelineWrapper
        ref={ref}
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {timelineData.map((item, index) => (
          <TimelineItem key={index} variants={itemVariants}>
            <TimelineContent align={index % 2 === 0 ? 'right' : 'left'}>
              <TimelineDate>{item.date}</TimelineDate>
              <TimelineTitle>{item.role}</TimelineTitle>
              <TimelineDescription>{item.description}</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
};

export default Timeline; 