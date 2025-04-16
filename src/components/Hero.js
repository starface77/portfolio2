import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaTelegram, FaDiscord, FaArrowDown, FaCode, FaGamepad, FaYoutube, FaBolt, FaShieldAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Section = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 80px 20px;
  scroll-snap-align: start;
`;

const HeroContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  position: relative;
  background: #0a0a0f;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(81, 51, 255, 0.5);
    border-radius: 4px;
    
    &:hover {
      background: rgba(81, 51, 255, 0.8);
    }
  }
`;

const CyberGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(90deg, rgba(51, 51, 255, 0.03) 1px, transparent 1px),
    linear-gradient(0deg, rgba(51, 51, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: top;
  animation: gridMove 20s linear infinite;

  @keyframes gridMove {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 30px;
    }
  }
`;

const GlowingOrb = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle at center, 
    rgba(81, 51, 255, 0.4) 0%,
    rgba(81, 51, 255, 0.1) 40%,
    transparent 70%
  );
  filter: blur(60px);
  z-index: 1;
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

const MainTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  color: #fff;
  text-align: center;
  line-height: 0.9;
  margin: 0;
  position: relative;
  text-transform: uppercase;

  .outline {
    display: block;
    color: transparent;
    -webkit-text-stroke: 2px #5133ff;
    font-size: 120%;
    filter: drop-shadow(0 0 20px rgba(81, 51, 255, 0.5));
  }

  .accent {
    display: block;
    color: #5133ff;
    font-size: 150%;
    text-shadow: 0 0 20px rgba(81, 51, 255, 0.5);
    margin-top: -0.2em;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  max-width: 800px;
  line-height: 1.6;
  margin: 0;
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CTAButton = styled(motion(Link))`
  background: linear-gradient(45deg, #5133ff, #8066ff);
  color: white;
  padding: 1.5rem 3.5rem;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      transparent 25%, 
      rgba(255, 255, 255, 0.2) 50%, 
      transparent 75%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(81, 51, 255, 0.4);

    &::before {
      transform: translateX(100%);
    }
  }
`;

const SecondaryButton = styled(CTAButton)`
  background: transparent;
  border: 2px solid #5133ff;
  
  &:hover {
    background: rgba(81, 51, 255, 0.1);
  }
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StatBox = styled(motion.div)`
  background: rgba(81, 51, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(81, 51, 255, 0.2);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
    background: linear-gradient(45deg,
      transparent,
      rgba(81, 51, 255, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: #5133ff;
    background: rgba(81, 51, 255, 0.1);

    &::before {
      transform: translateX(100%);
    }
  }

  h3 {
    font-size: 4rem;
    color: #5133ff;
    margin: 0;
    font-weight: 800;
  }

  p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 1rem 0 0;
  }
`;

const ScrollPrompt = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  svg {
    font-size: 2rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const ScrollProgress = styled(motion.div)`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1000;
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    right: 10px;
  }
`;

const ScrollDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#5133ff' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: ${props => props.active ? 'rgba(81, 51, 255, 0.3)' : 'transparent'};
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.2);
    background: ${props => props.active ? '#5133ff' : 'rgba(255, 255, 255, 0.5)'};
    
    &::before {
      background: ${props => props.active ? 'rgba(81, 51, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'};
      transform: scale(1.5);
    }
  }
`;

const SectionLabel = styled(motion.span)`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(81, 51, 255, 0.9);
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  color: white;
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(81, 51, 255, 0.3);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid rgba(81, 51, 255, 0.9);
  }
`;

const ScrollGuide = styled(motion.div)`
  position: fixed;
  left: 30px;
  bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  z-index: 1000;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ScrollLine = styled(motion.div)`
  width: 60px;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
  width: 100%;
    height: 100%;
    background: #5133ff;
    animation: scrollLine 2s ease-in-out infinite;
  }

  @keyframes scrollLine {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0); }
    100% { transform: translateX(100%); }
  }
`;

const AboutSection = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: -50px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(108, 92, 231, 0.3), transparent 70%);
    border-radius: 50%;
    z-index: -1;
    animation: pulse 8s infinite alternate;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(165, 94, 234, 0.3), transparent 70%);
    border-radius: 50%;
    z-index: -1;
    animation: pulse 8s infinite alternate-reverse;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.2);
      opacity: 0.8;
    }
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
`;

const HackerCard = styled(motion.div)`
  width: 400px;
  height: 400px;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  background: #0a0a0f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px solid rgba(108, 92, 231, 0.5);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(90deg, rgba(108, 92, 231, 0.1) 1px, transparent 1px) 0 0 / 20px 20px,
      linear-gradient(0deg, rgba(108, 92, 231, 0.1) 1px, transparent 1px) 0 0 / 20px 20px;
    z-index: 1;
    opacity: 0.5;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(108, 92, 231, 0.2), transparent 70%);
    z-index: 2;
    animation: pulse 4s infinite alternate;
  }

  @keyframes pulse {
    0% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.7;
    }
  }
  
  .error-code {
    font-size: 8rem;
    font-weight: 900;
    color: #6c5ce7;
    text-shadow: 0 0 20px rgba(108, 92, 231, 0.7);
    margin: 0;
    line-height: 1;
    position: relative;
    z-index: 3;
    font-family: 'Courier New', monospace;
    letter-spacing: -5px;
  }
  
  .error-text {
    font-size: 2rem;
    color: #fff;
    margin: 1rem 0;
    position: relative;
    z-index: 3;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  
  .error-details {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    position: relative;
    z-index: 3;
    font-family: 'Courier New', monospace;
    max-width: 80%;
  }
  
  .terminal-line {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    color: #00ff00;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    z-index: 3;
    display: flex;
    align-items: center;
    
    &::before {
      content: '>';
      margin-right: 0.5rem;
      color: #6c5ce7;
    }
    
    .cursor {
      display: inline-block;
      width: 8px;
      height: 16px;
      background: #00ff00;
      margin-left: 0.5rem;
      animation: blink 1s infinite;
    }
    
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  }
  
  &:hover {
    border-color: rgba(108, 92, 231, 0.8);
    box-shadow: 0 20px 40px rgba(108, 92, 231, 0.3);
    
    .error-code {
      text-shadow: 0 0 30px rgba(108, 92, 231, 0.9);
    }
  }

  @media (max-width: 480px) {
    width: 300px;
    height: 300px;
    
    .error-code {
      font-size: 6rem;
    }
    
    .error-text {
      font-size: 1.5rem;
    }
  }
`;

const AboutContent = styled(motion.div)`
  color: #fff;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    width: 50px;
    height: 4px;
    background: linear-gradient(90deg, #6c5ce7, #a55eea);
    border-radius: 2px;
  }

  h2 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #6c5ce7, #a55eea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #6c5ce7, #a55eea);
      border-radius: 1px;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
    position: relative;
    padding-left: 20px;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(to bottom, #6c5ce7, #a55eea);
      border-radius: 2px;
    }
  }
  
  @media (max-width: 968px) {
    &::before {
      left: 50%;
      transform: translateX(-50%);
    }
    
    h2::after {
      left: 0;
      width: 100%;
    }
    
    p {
      padding-left: 0;
      
      &::before {
        display: none;
      }
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  perspective: 1000px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(108, 92, 231, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(108, 92, 231, 0.3);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(108, 92, 231, 0.2);

    &::before {
      transform: translateX(100%);
    }

    .icon {
      transform: scale(1.1) rotate(5deg);
      filter: drop-shadow(0 0 15px rgba(108, 92, 231, 0.5));
    }

    .skill-progress {
      width: 100%;
      background: linear-gradient(90deg, #6c5ce7, #a55eea);
    }
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    transition: all 0.4s ease;
    display: inline-block;
  }

  h3 {
    font-size: 1.8rem;
    color: #fff;
    margin-bottom: 1rem;
    font-weight: 600;
    background: linear-gradient(45deg, #fff, rgba(255, 255, 255, 0.8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2rem;
    line-height: 1.6;
    font-size: 1.1rem;
  }

  .skill-level {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
  }

  .skill-progress {
    height: 100%;
    background: linear-gradient(90deg, #6c5ce7, #a55eea);
    border-radius: 3px;
    transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    width: 0;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      animation: shimmer 2s infinite;
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const skillsData = [
  {
    icon: "💻",
    title: "Разработка",
    description: "Создание современных веб-приложений и игровых серверов с использованием передовых технологий",
    level: 90
  },
  {
    icon: "🎮",
    title: "Геймдизайн",
    description: "Проектирование увлекательных игровых механик и балансировка игрового процесса",
    level: 85
  },
  {
    icon: "📝",
    title: "Контент",
    description: "Создание и управление качественным игровым контентом и специальными событиями",
    level: 80
  },
  {
    icon: "⚡",
    title: "Оптимизация",
    description: "Улучшение производительности и оптимизация кода для максимальной эффективности",
    level: 88
  },
  {
    icon: "🛡️",
    title: "Безопасность",
    description: "Защита серверов и данных от внешних угроз с использованием современных методов",
    level: 82
  },
  {
    icon: "✨",
    title: "UI/UX",
    description: "Создание интуитивно понятных и визуально привлекательных пользовательских интерфейсов",
    level: 75
  }
];

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  justify-content: ${props => props.center ? 'center' : 'flex-start'};

  a {
    color: #fff;
    font-size: 1.8rem;
    transition: all 0.3s ease;
    position: relative;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(45deg, rgba(108, 92, 231, 0.5), rgba(165, 94, 234, 0.5));
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }
    
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(45deg, 
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transform: translateX(-100%);
      transition: transform 0.6s ease;
    }

    svg {
      position: relative;
      z-index: 2;
      transition: all 0.3s ease;
    }

    &:hover {
      transform: translateY(-5px);
      border-color: rgba(108, 92, 231, 0.5);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      
      &::before {
        opacity: 1;
      }
      
      &::after {
        transform: translateX(100%);
      }
      
      svg {
        transform: scale(1.2);
        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
      }
    }
  }

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(45deg, #5133ff, #8066ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(81, 51, 255, 0.3));
`;

const SectionBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: ${props => props.gradient || 'transparent'};
  opacity: 0.1;
`;

const FloatingParticles = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '2px'};
  height: ${props => props.size || '2px'};
  background: ${props => props.color || '#5133ff'};
  border-radius: 50%;
  filter: blur(1px);
`;

const CyberLines = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  opacity: 0.1;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: linear-gradient(
      transparent 0%,
      #5133ff 45%,
      #5133ff 55%,
      transparent 100%
    );
    animation: rotateLines 20s linear infinite;
    opacity: 0.1;
  }

  &::after {
    animation-delay: -5s;
    animation-duration: 15s;
  }

  @keyframes rotateLines {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  perspective: 1000px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(255, 51, 51, 0.1), transparent);
    filter: blur(100px);
    z-index: -1;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(23, 25, 35, 0.8);
  border: 1px solid rgba(255, 51, 51, 0.2);
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      transparent,
      rgba(255, 51, 51, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }
  
  h3 {
    color: #ff3333;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 3px;
      background: #ff3333;
      border-radius: 2px;
    }
  }
  
  p {
    color: #e0e0e0;
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
  
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
    
    span {
      background: rgba(255, 51, 51, 0.1);
      color: #ff3333;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      border: 1px solid rgba(255, 51, 51, 0.2);
      transition: all 0.3s ease;

  &:hover {
        background: rgba(255, 51, 51, 0.2);
    transform: translateY(-2px);
      }
    }
  }
  
  &:hover {
    border-color: rgba(255, 51, 51, 0.4);
    box-shadow: 0 12px 48px rgba(255, 51, 51, 0.2);
    transform: translateY(-5px);
  }
`;

const TechTag = styled(motion.span)`
  background: rgba(81, 51, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #fff;
  white-space: nowrap;
`;

const AchievementList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  margin-top: 4rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(108, 92, 231, 0.3), transparent);
    z-index: 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Achievement = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      transparent,
      rgba(108, 92, 231, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #6c5ce7, #a55eea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 10px rgba(108, 92, 231, 0.5));
  }

  .content {
    text-align: center;
    
    h4 {
      font-size: 1.4rem;
      color: #fff;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 1rem;
      line-height: 1.6;
    }
  }
  
  &:hover {
    border-color: rgba(108, 92, 231, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
    
    .icon {
      filter: drop-shadow(0 0 15px rgba(108, 92, 231, 0.7));
    }
  }
`;

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -15,
    scale: 0.9
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: i * 0.1,
      duration: 0.8
    }
  }),
  hover: {
    y: -10,
    scale: 1.02,
    rotateX: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const achievementVariants = {
  hidden: { 
    opacity: 0,
    x: -50,
    scale: 0.8
  },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: i * 0.15,
      duration: 0.6
    }
  }),
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const ProjectsSection = styled(motion.div)`
  width: 100%;
  position: relative;
  padding: 4rem 0;
  overflow: hidden;
`;

const ConnectionLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  
  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  path {
    stroke: rgba(255, 51, 51, 0.3);
    stroke-width: 2;
    fill: none;
    stroke-dasharray: 5, 5;
    animation: dash 20s linear infinite;
  }
  
  @keyframes dash {
    to {
      stroke-dashoffset: -1000;
    }
  }
`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  position: relative;
  z-index: 1;
`;

const ProjectNode = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 3rem;
  position: relative;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    
    &:nth-child(even) {
      flex-direction: column;
    }
  }
`;

const ProjectContent = styled.div`
  flex: 1;
  background: rgba(23, 25, 35, 0.8);
  border: 1px solid rgba(255, 51, 51, 0.2);
  border-radius: 16px;
    padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      transparent,
      rgba(255, 51, 51, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
      transform: translateX(100%);
    }

  h3 {
    color: #ff3333;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 3px;
      background: #ff3333;
      border-radius: 2px;
    }
  }
  
  p {
    color: #e0e0e0;
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
  
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
    
    span {
      background: rgba(255, 51, 51, 0.1);
      color: #ff3333;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      border: 1px solid rgba(255, 51, 51, 0.2);
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 51, 51, 0.2);
        transform: translateY(-2px);
      }
    }
  }
`;

const ProjectImage = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 51, 51, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(255, 51, 51, 0.2), transparent);
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const NodeConnector = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 51, 51, 0.2);
  border: 2px solid rgba(255, 51, 51, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(255, 51, 51, 0.4), transparent 70%);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.4;
    }
    100% {
      transform: scale(1);
      opacity: 0.8;
    }
  }
  
  svg {
      font-size: 1.5rem;
    color: #ff3333;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin: 1rem 0;
  }
`;

const AchievementsSection = styled(motion.div)`
  width: 100%;
  position: relative;
  padding: 4rem 0;
  overflow: hidden;
`;

const AchievementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  position: relative;
  z-index: 1;
`;

const AchievementNode = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    
    &:nth-child(even) {
      flex-direction: column;
    }
  }
`;

const AchievementContent = styled.div`
  flex: 1;
  background: rgba(23, 25, 35, 0.8);
  border: 1px solid rgba(255, 51, 51, 0.2);
  border-radius: 16px;
    padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
  position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      transparent,
      rgba(255, 51, 51, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }

  .icon {
    font-size: 2.5rem;
    color: #ff3333;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.4rem;
    color: #fff;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const AchievementIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 51, 51, 0.1);
  border: 2px solid rgba(255, 51, 51, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  &::before {
    content: '';
  position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(255, 51, 51, 0.3), transparent 70%);
    animation: pulse 2s infinite;
  }
  
  svg {
    font-size: 2.5rem;
    color: #ff3333;
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    
    svg {
      font-size: 2rem;
    }
  }
`;

const Hero = () => {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);

  const sections = [
    { 
      id: 'home', 
      label: 'Главная',
      gradient: 'radial-gradient(circle at top right, #5133ff, transparent 70%)'
    },
    { 
      id: 'about', 
      label: 'Обо мне',
      gradient: 'radial-gradient(circle at bottom left, #5133ff, transparent 70%)'
    },
    { 
      id: 'skills', 
      label: 'Навыки',
      gradient: 'radial-gradient(circle at center, #5133ff, transparent 70%)'
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    let lastScrollTop = 0;
    let isScrolling = false;

    const handleWheel = (e) => {
      if (isScrolling) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const currentIndex = sections.findIndex(s => s.id === activeSection);
      const nextIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
      
      if (currentIndex !== nextIndex) {
        isScrolling = true;
        const nextSection = document.getElementById(sections[nextIndex].id);
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sections[nextIndex].id);
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    };

    const handleScroll = () => {
      if (!isScrolling) {
        const scrollPosition = container.scrollTop;
        const windowHeight = window.innerHeight;
        
        sections.forEach(({ id }) => {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (Math.abs(rect.top) < windowHeight / 2) {
              setActiveSection(id);
            }
          }
        });

        setIsVisible(scrollPosition < windowHeight / 2);
        lastScrollTop = scrollPosition;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
  };

  const projects = [
    {
      title: "Project 1",
      description: "A cutting-edge web application showcasing modern design principles and advanced functionality.",
      techStack: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Project 2",
      description: "An innovative solution for real-time data processing and visualization.",
      techStack: ["Python", "TensorFlow", "AWS"]
    },
    {
      title: "Project 3",
      description: "A secure and scalable backend infrastructure supporting millions of users.",
      techStack: ["Go", "PostgreSQL", "Docker"]
    }
  ];

  return (
    <HeroContainer ref={containerRef}>
      <ScrollProgress>
        {sections.map(({ id, label }) => (
          <motion.div
            key={id}
            style={{ position: 'relative' }}
            onHoverStart={() => document.getElementById(`label-${id}`).style.opacity = 1}
            onHoverEnd={() => document.getElementById(`label-${id}`).style.opacity = 0}
          >
            <ScrollDot
              active={activeSection === id}
              onClick={() => scrollToSection(id)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <SectionLabel id={`label-${id}`}>
              {label}
            </SectionLabel>
          </motion.div>
        ))}
      </ScrollProgress>

      <Section id="home">
        <CyberLines />
        <FloatingParticles>
          {generateParticles(50).map(particle => (
            <Particle
              key={particle.id}
              size={`${particle.size}px`}
              initial={{ x: `${particle.x}%`, y: "100%", opacity: 0 }}
            animate={{
                y: "-100%",
                opacity: [0, 1, 0],
                x: [`${particle.x}%`, `${particle.x + (Math.random() * 10 - 5)}%`]
            }}
            transition={{
                duration: particle.duration,
                delay: particle.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            />
          ))}
        </FloatingParticles>
        <SectionBackground 
          gradient={sections[0].gradient}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <CyberGrid />
        <GlowingOrb
          animate={{
            x: ["-10%", "110%"],
            y: ["0%", "100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      <ContentWrapper>
          <MainTitle>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Данил
            </motion.span>
            <motion.span
              className="outline"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Разработчик
            </motion.span>
            <motion.span
              className="accent"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              и геймер
            </motion.span>
        </MainTitle>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
            Разработчик с опытом в создании игровых проектов.
            Объединяю страсть к программированию с любовью к играм.
        </Subtitle>
        </ContentWrapper>
      </Section>

      <Section id="about">
        <CyberLines />
        <FloatingParticles>
          {generateParticles(30).map(particle => (
            <Particle
              key={particle.id}
              size={`${particle.size}px`}
              color="#8066ff"
              initial={{ x: `${particle.x}%`, y: "100%", opacity: 0 }}
              animate={{
                y: "-100%",
                opacity: [0, 1, 0],
                x: [`${particle.x}%`, `${particle.x + (Math.random() * 10 - 5)}%`]
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </FloatingParticles>
        <SectionBackground gradient={sections[1].gradient} />
        <ContentWrapper>
          <SectionTitle>Обо мне</SectionTitle>
          <AboutSection>
            <HackerCard
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="error-code">404</h2>
              <p className="error-text">NOT FOUND</p>
              <p className="error-details">User profile data corrupted or missing. Attempting to recover...</p>
              <div className="terminal-line">
                <span>system.recover_profile()</span>
                <span className="cursor"></span>
              </div>
            </HackerCard>
            <AboutContent
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Привет, я Данил</h2>
              <p>
                Я разработчик и создатель Vitax - уникального игрового сообщества. 
                Моя цель - создавать качественные проекты, которые объединяют людей 
                и дарят им незабываемые впечатления.
              </p>
              <p>
                Помимо разработки, я увлекаюсь игрой в Minecraft и другие игры, 
                а также активно развиваю свой YouTube канал.
              </p>
              <SocialLinks>
                <motion.a 
                  href="https://github.com/yourgithub" 
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub />
                </motion.a>
                <motion.a 
                  href="https://t.me/yourtelegram" 
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTelegram />
                </motion.a>
                <motion.a 
                  href="https://youtube.com/yourchannel" 
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaYoutube />
                </motion.a>
              </SocialLinks>
            </AboutContent>
          </AboutSection>
          <AchievementList
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Achievement 
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="icon">🏆</div>
              <div className="content">
                <h4>Опытный разработчик</h4>
                <p>Более 5 лет опыта в создании игровых проектов</p>
              </div>
            </Achievement>
            <Achievement 
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="icon">💡</div>
              <div className="content">
                <h4>Инновационные решения</h4>
                <p>Создание уникальных игровых механик</p>
              </div>
            </Achievement>
            <Achievement 
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="icon">👥</div>
              <div className="content">
                <h4>Сильное сообщество</h4>
                <p>Построение активного и дружного комьюнити</p>
              </div>
            </Achievement>
          </AchievementList>
        </ContentWrapper>
      </Section>

      <Section id="skills">
        <CyberLines />
        <FloatingParticles>
          {generateParticles(40).map(particle => (
            <Particle
              key={particle.id}
              size={`${particle.size}px`}
              color="#6c5ce7"
              initial={{ x: `${particle.x}%`, y: "100%", opacity: 0 }}
              animate={{
                y: "-100%",
                opacity: [0, 1, 0],
                x: [`${particle.x}%`, `${particle.x + (Math.random() * 10 - 5)}%`]
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </FloatingParticles>
        <SectionBackground gradient={sections[2].gradient} />
        <ContentWrapper>
          <SectionTitle>Мои навыки</SectionTitle>
          <SkillsGrid>
            {skillsData.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <SkillCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="icon">{skill.icon}</div>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <div className="skill-level">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 1 + index * 0.2,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                    />
                  </div>
                </SkillCard>
              </motion.div>
            ))}
          </SkillsGrid>
        </ContentWrapper>
      </Section>

      <AnimatePresence>
        {isVisible && (
          <ScrollPrompt
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scrollToSection('about')}
          >
            <span>Прокрутите вниз</span>
            <FaArrowDown />
          </ScrollPrompt>
        )}
      </AnimatePresence>
    </HeroContainer>
  );
};

export default Hero; 