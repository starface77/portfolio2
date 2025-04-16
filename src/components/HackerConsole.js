import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ConsoleContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  font-family: 'Courier New', monospace;
  color: #00ff00;
  padding: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ConsoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #00ff00;
  padding-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
    animation: glow 2s linear infinite;
  }
  
  @keyframes glow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
`;

const ConsoleTitle = styled.h2`
  color: #00ff00;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px #00ff00;
  position: relative;
  
  &::before {
    content: '[';
    position: absolute;
    left: -20px;
    color: #5133ff;
  }
  
  &::after {
    content: ']';
    position: absolute;
    right: -20px;
    color: #5133ff;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #00ff00;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    text-shadow: 0 0 10px #00ff00;
    transform: rotate(90deg);
  }
`;

const ConsoleContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: rgba(0, 20, 0, 0.3);
  border: 1px solid #00ff00;
  border-radius: 5px;
  position: relative;
  margin-bottom: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      transparent 0%,
      rgba(0, 255, 0, 0.05) 50%,
      transparent 100%
    );
    animation: scan 2s linear infinite;
  }

  @keyframes scan {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 20, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00ff00;
    border-radius: 5px;
  }
`;

const ConsoleLine = styled.div`
  margin: 0.5rem 0;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 0;
    width: 2px;
    height: 100%;
    background: ${props => props.success ? '#00ff00' : props.error ? '#ff0000' : 'transparent'};
    opacity: 0.5;
  }
`;

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 0.5rem;
  text-shadow: 0 0 5px #00ff00;
`;

const Command = styled.span`
  color: #fff;
  text-shadow: 0 0 5px #fff;
`;

const Output = styled.div`
  color: #00ff00;
  margin-left: 1rem;
  margin-top: 0.5rem;
  text-shadow: 0 0 5px #00ff00;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 20px;
  background: #00ff00;
  margin-left: 5px;
  animation: blink 1s step-end infinite;
  box-shadow: 0 0 10px #00ff00;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const ConsoleInput = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background: rgba(0, 20, 0, 0.3);
  border: 1px solid #00ff00;
  border-radius: 5px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
    animation: glow 2s linear infinite;
  }
`;

const InputField = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  padding: 0.5rem;
  outline: none;
  text-shadow: 0 0 5px #00ff00;

  &::placeholder {
    color: rgba(0, 255, 0, 0.5);
  }
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: rgba(0, 20, 0, 0.3);
  border: 1px solid #00ff00;
  border-radius: 5px;
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #00ff00;
  text-shadow: 0 0 5px #00ff00;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '●';
    color: ${props => props.active ? '#00ff00' : '#ff0000'};
    text-shadow: 0 0 5px ${props => props.active ? '#00ff00' : '#ff0000'};
  }
`;

const hackerTexts = [
  { command: '> Инициализация системы...', output: 'Система инициализирована успешно', success: true },
  { command: '> Подключение к серверам...', output: 'Подключено к основному серверу', success: true },
  { command: '> Проверка безопасности...', output: 'Обнаружены уязвимости: 3', success: true },
  { command: '> Взлом системы...', output: 'Прогресс: ██████████ 100%', success: true },
  { command: '> Получение доступа...', output: 'Доступ получен: ROOT', success: true },
  { command: '> Загрузка данных...', output: 'Загружено: 1.2 TB', success: true },
  { command: '> Активация протокола...', output: 'Протокол активирован: ELITE', success: true },
  { command: '> Проверка статуса...', output: 'Статус: АКТИВЕН', success: true },
  { command: '> Подключение к базе...', output: 'База данных: ELITE_DB', success: true },
  { command: '> Загрузка профилей...', output: 'Загружено профилей: 1337', success: true },
];

const customCommands = {
  help: 'Доступные команды: help, clear, status, hack, scan, exit, matrix, decrypt, encrypt, ping',
  clear: 'clear',
  status: 'Статус системы: АКТИВЕН\nУровень доступа: ROOT\nЗащита: ВЗЛОМАНА',
  hack: 'Начинаю взлом...\nПрогресс: ██████████ 100%\nДоступ получен!',
  scan: 'Сканирование системы...\nНайдено уязвимостей: 7\nРекомендуемые действия: взлом',
  matrix: 'Запуск Matrix-эффекта...\n01010101 10101010\nМатрица активирована',
  decrypt: 'Расшифровка данных...\nПрогресс: ██████████ 100%\nДанные расшифрованы',
  encrypt: 'Шифрование данных...\nПрогресс: ██████████ 100%\nДанные зашифрованы',
  ping: 'PING localhost\nВремя отклика: 0.001ms\nСоединение стабильно',
  exit: 'exit'
};

const HackerConsole = ({ isOpen, onClose }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandIndex, setCommandIndex] = useState(-1);
  const consoleRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < hackerTexts.length) {
          setVisibleLines(prev => [...prev, currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          inputRef.current?.focus();
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setVisibleLines([]);
      setCommandHistory([]);
      setCurrentCommand('');
      setCommandIndex(-1);
    }
  }, [isOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      const command = currentCommand.trim().toLowerCase();
      const output = customCommands[command] || `Команда не найдена: ${command}`;
      const success = customCommands[command] !== undefined;
      
      setCommandHistory(prev => [...prev, 
        { command: currentCommand, output: output === 'clear' ? null : output, success }
      ]);
      
      if (command === 'clear') {
        setCommandHistory([]);
      } else if (command === 'exit') {
        onClose();
      }
      
      setCurrentCommand('');
      setCommandIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandIndex < commandHistory.length - 1) {
        const newIndex = commandIndex + 1;
        setCommandIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex].command);
      } else {
        setCommandIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ConsoleContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ConsoleHeader>
            <ConsoleTitle>ELITE CONSOLE v1.0</ConsoleTitle>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ConsoleHeader>
          <ConsoleContent ref={consoleRef}>
            {hackerTexts.map((text, index) => (
              <ConsoleLine key={index} visible={visibleLines.includes(index)} success={text.success}>
                <Prompt>></Prompt>
                <Command>{text.command}</Command>
                {visibleLines.includes(index) && (
                  <Output>{text.output}</Output>
                )}
              </ConsoleLine>
            ))}
            {commandHistory.map((cmd, index) => (
              <ConsoleLine key={`cmd-${index}`} visible={true} success={cmd.success}>
                <Prompt>></Prompt>
                <Command>{cmd.command}</Command>
                {cmd.output && <Output>{cmd.output}</Output>}
              </ConsoleLine>
            ))}
          </ConsoleContent>
          <ConsoleInput>
            <Prompt>></Prompt>
            <InputField
              ref={inputRef}
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleCommand}
              placeholder="Введите команду..."
            />
            <Cursor />
          </ConsoleInput>
          <StatusBar>
            <StatusItem active={true}>СИСТЕМА</StatusItem>
            <StatusItem active={true}>СЕТЬ</StatusItem>
            <StatusItem active={true}>БЕЗОПАСНОСТЬ</StatusItem>
            <StatusItem active={true}>ДОСТУП: ROOT</StatusItem>
          </StatusBar>
        </ConsoleContainer>
      )}
    </AnimatePresence>
  );
};

export default HackerConsole; 