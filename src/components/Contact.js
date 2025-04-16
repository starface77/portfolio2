import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaTelegram, FaVk, FaPaperPlane, FaDiscord, FaLinkedin, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useInView } from 'react-intersection-observer';

const ContactContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 80px 20px;
  background: #0a0a0f;
  color: #fff;
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

const ContactContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(81, 51, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(81, 51, 255, 0.2);
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

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(81, 51, 255, 0.3);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #5133ff;
    box-shadow: 0 0 15px rgba(81, 51, 255, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(81, 51, 255, 0.3);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #5133ff;
    box-shadow: 0 0 15px rgba(81, 51, 255, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
    min-height: 120px;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #5133ff, #8066ff);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
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

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 1rem;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #5133ff, #8066ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2.2rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(81, 51, 255, 0.1);
  border: 1px solid rgba(81, 51, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  font-size: 1.3rem;
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
    background: linear-gradient(45deg,
      transparent,
      rgba(81, 51, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: #5133ff;
    background: rgba(81, 51, 255, 0.2);
    
    &::before {
      transform: translateX(100%);
    }
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
`;

const ContactInfoItem = styled(motion.div)`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(81, 51, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(81, 51, 255, 0.2);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #5133ff, transparent);
    animation: glow 2s linear infinite;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: #5133ff;
    background: rgba(81, 51, 255, 0.1);
  }

  h3 {
    font-size: 1.5rem;
    color: #5133ff;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

const SuccessMessage = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(45deg, #5133ff, #8066ff);
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorMessage = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(45deg, #ff3366, #ff6b6b);
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Здесь можно добавить реальную отправку формы через emailjs
    // Для демонстрации просто имитируем отправку
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Анимация для светящихся орбов
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ContactContainer>
      <CyberGrid />
      <GlowingOrb 
        animate={{ 
          x: mousePosition.x - 250, 
          y: mousePosition.y - 250 
        }}
        transition={{ 
          type: "spring", 
          damping: 30, 
          stiffness: 200 
        }}
      />
      <GlowingOrb 
        animate={{ 
          x: mousePosition.x - 250, 
          y: mousePosition.y - 250 
        }}
        transition={{ 
          type: "spring", 
          damping: 30, 
          stiffness: 200,
          delay: 0.1
        }}
        style={{ 
          background: "radial-gradient(circle at center, rgba(255, 51, 102, 0.4) 0%, rgba(255, 51, 102, 0.1) 40%, transparent 70%)",
          width: "400px",
          height: "400px"
        }}
      />
      
      <ContentWrapper>
        <MainTitle
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          <span className="outline">Свяжитесь</span>
          <span className="accent">со мной</span>
        </MainTitle>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Есть вопросы или предложения? Не стесняйтесь обращаться! Я всегда открыт для обсуждения новых проектов, творческих идей или возможностей для сотрудничества.
        </Subtitle>
        
        <ContactContent ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactInfo>
              <ContactInfoItem
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3><FaEnvelope /> Email</h3>
                <p>example@example.com</p>
              </ContactInfoItem>
              
              <ContactInfoItem
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3><FaPhone /> Телефон</h3>
                <p>+7 (999) 123-45-67</p>
              </ContactInfoItem>
              
              <ContactInfoItem
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3><FaMapMarkerAlt /> Локация</h3>
                <p>Москва, Россия</p>
              </ContactInfoItem>
              
              <SocialLinks>
                <SocialLink 
                  href="#" 
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub />
                </SocialLink>
                <SocialLink 
                  href="#" 
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTelegram />
                </SocialLink>
                <SocialLink 
                  href="#" 
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaVk />
                </SocialLink>
                <SocialLink 
                  href="#" 
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDiscord />
                </SocialLink>
                <SocialLink 
                  href="#" 
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin />
                </SocialLink>
                <SocialLink 
                  href="#" 
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInstagram />
                </SocialLink>
              </SocialLinks>
            </ContactInfo>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ContactForm ref={formRef} onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Имя</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ваше имя"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ваш email"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Сообщение</Label>
                <TextArea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ваше сообщение"
                />
              </FormGroup>
              
              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить сообщение'} 
                <FaPaperPlane />
              </SubmitButton>
            </ContactForm>
          </motion.div>
        </ContactContent>
      </ContentWrapper>
      
      <AnimatePresence>
        {showSuccess && (
          <SuccessMessage
            initial={{ opacity: 0, y: -50, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -50, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <FaPaperPlane /> Сообщение успешно отправлено!
          </SuccessMessage>
        )}
        
        {showError && (
          <ErrorMessage
            initial={{ opacity: 0, y: -50, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -50, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage || 'Произошла ошибка при отправке сообщения.'}
          </ErrorMessage>
        )}
      </AnimatePresence>
    </ContactContainer>
  );
};

export default Contact; 