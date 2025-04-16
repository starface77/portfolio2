import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  z-index: 1000;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.3);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  padding: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    transform: rotate(90deg);
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #5133ff, #8066ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(81, 51, 255, 0.3));
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #5133ff;
    box-shadow: 0 0 0 2px rgba(81, 51, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 1rem;
  background: linear-gradient(45deg, #5133ff, #8066ff);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(81, 51, 255, 0.4);

    &::before {
      left: 100%;
    }
  }
`;

const Notification = styled(motion.div)`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 59, 48, 0.9);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 500;
  box-shadow: 0 5px 15px rgba(255, 59, 48, 0.3);
  z-index: 1001;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProfileSidebar = ({ isOpen, onClose }) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <SidebarContainer
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <CloseButton onClick={onClose}>×</CloseButton>
            <Title>Личный кабинет</Title>
            <LoginForm onSubmit={handleLogin}>
              <InputGroup>
                <Input type="email" placeholder="Email" required />
              </InputGroup>
              <InputGroup>
                <Input type="password" placeholder="Пароль" required />
              </InputGroup>
              <Button type="submit">Войти</Button>
            </LoginForm>
          </SidebarContainer>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotification && (
          <Notification
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            Функция временно недоступна
          </Notification>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileSidebar; 