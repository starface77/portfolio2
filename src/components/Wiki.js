import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBook, FaHistory, FaRandom, FaArrowLeft, FaArrowRight, FaCode, FaGamepad, FaYoutube, FaGlobe, FaUser, FaCog, FaTimes } from 'react-icons/fa';

const WikiContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #0a0a0f;
  color: #fff;
  padding: 100px 20px 50px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, rgba(81, 51, 255, 0.03) 1px, transparent 1px),
      linear-gradient(0deg, rgba(81, 51, 255, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    transform: perspective(500px) rotateX(60deg);
    transform-origin: top;
    animation: gridMove 20s linear infinite;
    z-index: 0;
  }
  
  @keyframes gridMove {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 30px;
    }
  }
`;

const WikiContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const WikiHeader = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(81, 51, 255, 0.3);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  .logo-text {
    display: flex;
    flex-direction: column;
    
    h1 {
      font-size: 2.5rem;
      font-weight: 900;
      margin: 0;
      line-height: 1.3;
      background: linear-gradient(45deg, #5133ff, #8066ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 10px rgba(81, 51, 255, 0.5);
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #5133ff, transparent);
      }
    }
    
    .tagline {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 0.5rem;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(81, 51, 255, 0.1);
  border: 1px solid rgba(81, 51, 255, 0.3);
  border-radius: 8px;
  padding: 0.5rem;
  width: 300px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px rgba(81, 51, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover, &:focus-within {
    box-shadow: 0 0 20px rgba(81, 51, 255, 0.4);
    border-color: rgba(81, 51, 255, 0.5);
  }
  
  input {
    border: none;
    background: transparent;
    font-size: 1rem;
    width: 100%;
    padding: 0.5rem;
    outline: none;
    color: #fff;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  
  button {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    padding: 0.5rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: #5133ff;
      transform: scale(1.1);
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const WikiMain = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 250px;
  flex-shrink: 0;
  
  @media (max-width: 968px) {
    width: 100%;
  }
`;

const NavMenu = styled.nav`
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(81, 51, 255, 0.3);
  border-radius: 8px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(81, 51, 255, 0.1);
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateY(-5deg);
  transition: all 0.3s ease;
  
  &:hover {
    transform: perspective(1000px) rotateY(0deg);
    box-shadow: 0 0 30px rgba(81, 51, 255, 0.2);
  }
  
  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-bottom: 1px solid rgba(81, 51, 255, 0.3);
    color: #5133ff;
    text-shadow: 0 0 5px rgba(81, 51, 255, 0.5);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 70%;
      background: #5133ff;
      border-radius: 3px;
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: 0.5rem;
    margin-bottom: 0.3rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(81, 51, 255, 0.1);
    }
    
    a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      
      &:hover {
        color: #5133ff;
        transform: translateX(5px);
      }
      
      svg {
        transition: all 0.3s ease;
      }
      
      &:hover svg {
        transform: scale(1.2);
        color: #5133ff;
      }
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  background: rgba(10, 10, 15, 0.7);
  border: 1px solid rgba(81, 51, 255, 0.3);
  border-radius: 8px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(81, 51, 255, 0.1);
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateY(5deg);
  transition: all 0.3s ease;
  
  &:hover {
    transform: perspective(1000px) rotateY(0deg);
    box-shadow: 0 0 40px rgba(81, 51, 255, 0.2);
  }
`;

const ArticleHeader = styled.div`
  border-bottom: 1px solid rgba(81, 51, 255, 0.3);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, #5133ff, transparent);
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(45deg, #5133ff, #8066ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 10px rgba(81, 51, 255, 0.3);
  }
  
  .article-info {
    display: flex;
    gap: 1rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    
    span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }
`;

const ArticleContent = styled.article`
  line-height: 1.6;
  
  p {
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    border-bottom: 1px solid rgba(81, 51, 255, 0.3);
    margin: 2rem 0 1rem 0;
    padding-bottom: 0.3rem;
    color: #5133ff;
    text-shadow: 0 0 5px rgba(81, 51, 255, 0.3);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 70%;
      background: #5133ff;
      border-radius: 4px;
    }
  }
  
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 1.5rem 0 0.8rem 0;
    color: #8066ff;
    text-shadow: 0 0 5px rgba(128, 102, 255, 0.3);
  }
  
  ul, ol {
    margin: 0.5rem 0;
    padding-left: 2rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  li {
    margin-bottom: 0.5rem;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: -15px;
      top: 8px;
      width: 6px;
      height: 6px;
      background: #5133ff;
      border-radius: 50%;
      box-shadow: 0 0 5px rgba(81, 51, 255, 0.5);
    }
  }
  
  a {
    color: #5133ff;
    text-decoration: none;
    border-bottom: 1px dashed rgba(81, 51, 255, 0.5);
    transition: all 0.3s ease;
    
    &:hover {
      color: #8066ff;
      border-bottom: 1px solid #8066ff;
      text-shadow: 0 0 5px rgba(81, 51, 255, 0.5);
    }
  }
  
  .infobox {
    float: right;
    width: 300px;
    background: rgba(81, 51, 255, 0.1);
    border: 1px solid rgba(81, 51, 255, 0.3);
    border-radius: 8px;
    margin: 0 0 1.5rem 1.5rem;
    padding: 1rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 20px rgba(81, 51, 255, 0.1);
    transform-style: preserve-3d;
    transform: perspective(1000px) rotateY(-5deg);
    transition: all 0.3s ease;
    
    &:hover {
      transform: perspective(1000px) rotateY(0deg);
      box-shadow: 0 0 30px rgba(81, 51, 255, 0.2);
    }
    
    h3 {
      text-align: center;
      margin-top: 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(81, 51, 255, 0.3);
      color: #5133ff;
      text-shadow: 0 0 5px rgba(81, 51, 255, 0.3);
    }
    
    .infobox-image {
      text-align: center;
      margin-bottom: 1rem;
      
      img {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(81, 51, 255, 0.3);
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(81, 51, 255, 0.5);
        }
      }
    }
    
    .infobox-data {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 0.5rem;
      
      .label {
        font-weight: bold;
        color: rgba(255, 255, 255, 0.7);
      }
      
      div {
        color: rgba(255, 255, 255, 0.8);
      }
    }
    
    @media (max-width: 768px) {
      float: none;
      width: 100%;
      margin: 0 0 1.5rem 0;
    }
  }
`;

const ArticleFooter = styled.footer`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(81, 51, 255, 0.3);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  
  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    a {
      color: #5133ff;
      text-decoration: none;
      background: rgba(81, 51, 255, 0.1);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      transition: all 0.3s ease;
      border: none;
      
      &:hover {
        background: rgba(81, 51, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 0 10px rgba(81, 51, 255, 0.3);
      }
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(81, 51, 255, 0.3);
  
  a {
    color: #5133ff;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    border: none;
    
    &:hover {
      color: #8066ff;
      transform: translateX(5px);
      text-shadow: 0 0 5px rgba(81, 51, 255, 0.5);
    }
    
    &:last-child:hover {
      transform: translateX(-5px);
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
  z-index: 0;
`;

const NeonLine = styled(motion.div)`
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, #5133ff, transparent);
  box-shadow: 0 0 10px rgba(81, 51, 255, 0.5);
  z-index: 0;
`;

const NeonLine1 = styled(NeonLine)`
  top: 20%;
  left: 0;
  width: 100%;
  transform: rotate(-5deg);
`;

const NeonLine2 = styled(NeonLine)`
  bottom: 20%;
  left: 0;
  width: 100%;
  transform: rotate(5deg);
`;

const NeonCircle = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid rgba(81, 51, 255, 0.3);
  box-shadow: 0 0 20px rgba(81, 51, 255, 0.2);
  z-index: 0;
`;

const NeonCircle1 = styled(NeonCircle)`
  top: 10%;
  right: 10%;
`;

const NeonCircle2 = styled(NeonCircle)`
  bottom: 10%;
  left: 10%;
`;

const Notification = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(81, 51, 255, 0.9);
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(81, 51, 255, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  .close-btn {
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }
`;

const Wiki = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [recentPages, setRecentPages] = useState([
    { id: 1, title: 'React (JavaScript)', date: '12 июня 2023' },
    { id: 2, title: 'Vue.js', date: '10 июня 2023' },
    { id: 3, title: 'Angular', date: '8 июня 2023' }
  ]);
  
  const categories = [
    { id: 'dev', name: 'Разработка', icon: <FaCode />, articles: ['React', 'Vue.js', 'Angular'] },
    { id: 'game', name: 'Геймдизайн', icon: <FaGamepad />, articles: ['Unity', 'Unreal Engine', 'Godot'] },
    { id: 'content', name: 'Контент', icon: <FaYoutube />, articles: ['YouTube', 'Twitch', 'TikTok'] },
    { id: 'web', name: 'Веб-технологии', icon: <FaGlobe />, articles: ['HTML', 'CSS', 'JavaScript'] }
  ];
  
  const showDevNotification = (message) => {
    setNotificationMessage(message || 'Эта функция находится в разработке');
    setShowNotification(true);
    
    // Автоматически скрыть уведомление через 3 секунды
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    showDevNotification('Функция поиска находится в разработке');
  };
  
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId);
  };
  
  const handleRandomPage = () => {
    showDevNotification('Функция случайной страницы находится в разработке');
  };
  
  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };
  
  const handleProfileClick = () => {
    showDevNotification('Функция профиля находится в разработке');
  };
  
  const handleRelatedEdits = () => {
    showDevNotification('Функция просмотра связанных правок находится в разработке');
  };
  
  const handleLinksHere = () => {
    showDevNotification('Функция просмотра ссылок находится в разработке');
  };
  
  const handleArticleClick = (article) => {
    showDevNotification(`Переход к статье "${article}" находится в разработке`);
  };
  
  const handleNavigation = (direction) => {
    showDevNotification(`Переход к ${direction} статье находится в разработке`);
  };
  
  const handleCategoryLinkClick = (categoryId) => {
    handleCategoryClick(categoryId);
    showDevNotification(`Переход к категории находится в разработке`);
  };

  return (
    <WikiContainer>
      <AnimatePresence>
        {showNotification && (
          <Notification
            initial={{ opacity: 0, y: -50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -50, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            {notificationMessage}
            <FaTimes 
              className="close-btn" 
              onClick={() => setShowNotification(false)} 
            />
          </Notification>
        )}
      </AnimatePresence>
      
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
      
      <NeonLine1
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <NeonLine2
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5
        }}
      />
      
      <NeonCircle1
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <NeonCircle2
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />
      
      <WikiContent>
        <WikiHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo>
            <div className="logo-text">
              <h1>WIKI</h1>
              <div className="tagline">База знаний проекта</div>
            </div>
          </Logo>
          <SearchBar>
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Поиск в базе знаний..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>
          </SearchBar>
        </WikiHeader>

        <WikiMain>
          <Sidebar>
            <NavMenu>
              <h3>Навигация</h3>
              <ul>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); showDevNotification('Переход на главную страницу находится в разработке'); }}>
                    <FaBook /> Главная страница
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); showDevNotification('Просмотр последних изменений находится в разработке'); }}>
                    <FaHistory /> Последние изменения
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleRandomPage(); }}>
                    <FaRandom /> Случайная страница
                  </a>
                </li>
              </ul>
              
              <h3>Категории</h3>
              <ul>
                {categories.map(category => (
                  <li key={category.id}>
                    <a 
                      href="#" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        handleCategoryClick(category.id);
                      }}
                      style={{ 
                        color: activeCategory === category.id ? '#5133ff' : 'rgba(255, 255, 255, 0.8)',
                        fontWeight: activeCategory === category.id ? 'bold' : 'normal'
                      }}
                    >
                      {category.icon} {category.name}
                    </a>
                    {activeCategory === category.id && (
                      <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                        {category.articles.map(article => (
                          <li key={article}>
                            <a 
                              href="#" 
                              onClick={(e) => { 
                                e.preventDefault(); 
                                handleArticleClick(article);
                              }}
                            >
                              {article}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              
              <h3>Инструменты</h3>
              <ul>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleProfileClick(); }}>
                    <FaUser /> Профиль
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleLinksHere(); }}>
                    Ссылки сюда
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleRelatedEdits(); }}>
                    Связанные правки
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleSettingsClick(); }}>
                    <FaCog /> Настройки
                  </a>
                </li>
              </ul>
              
              {showSettings && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '1rem', 
                  background: 'rgba(81, 51, 255, 0.1)', 
                  borderRadius: '8px',
                  border: '1px solid rgba(81, 51, 255, 0.3)'
                }}>
                  <h4 style={{ marginTop: 0, color: '#5133ff' }}>Настройки</h4>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.3rem' }}>
                      <input type="checkbox" onChange={() => showDevNotification('Изменение темы находится в разработке')} /> Темная тема
                    </label>
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.3rem' }}>
                      <input type="checkbox" onChange={() => showDevNotification('Изменение анимаций находится в разработке')} /> Анимации
                    </label>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.3rem' }}>
                      Размер шрифта
                      <select 
                        style={{ 
                          width: '100%', 
                          marginTop: '0.3rem',
                          background: 'rgba(10, 10, 15, 0.8)',
                          color: '#fff',
                          border: '1px solid rgba(81, 51, 255, 0.3)',
                          borderRadius: '4px',
                          padding: '0.3rem'
                        }}
                        onChange={() => showDevNotification('Изменение размера шрифта находится в разработке')}
                      >
                        <option>Маленький</option>
                        <option selected>Средний</option>
                        <option>Большой</option>
                      </select>
                    </label>
                  </div>
                </div>
              )}
              
              <h3 style={{ marginTop: '1.5rem' }}>Последние просмотренные</h3>
              <ul>
                {recentPages.map(page => (
                  <li key={page.id}>
                    <a href="#" onClick={(e) => { 
                      e.preventDefault(); 
                      handleArticleClick(page.title);
                    }}>
                      {page.title}
                      <span style={{ 
                        display: 'block', 
                        fontSize: '0.8rem', 
                        color: 'rgba(255, 255, 255, 0.5)' 
                      }}>
                        {page.date}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </NavMenu>
          </Sidebar>
          
          <MainContent>
            <ArticleHeader>
              <h1>React (JavaScript)</h1>
              <div className="article-info">
                <span>Материал из базы знаний</span>
                <span>Последнее изменение: 12 июня 2023</span>
              </div>
            </ArticleHeader>
            
            <ArticleContent>
              <div className="infobox">
                <h3>React</h3>
                <div className="infobox-image">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React Logo" />
                </div>
                <div className="infobox-data">
                  <div className="label">Разработчик</div>
                  <div>Meta Platforms</div>
                  <div className="label">Написана на</div>
                  <div>JavaScript</div>
                  <div className="label">Первый выпуск</div>
                  <div>29 мая 2013</div>
                  <div className="label">Стабильная версия</div>
                  <div>18.2.0 (8 июня 2022)</div>
                  <div className="label">Лицензия</div>
                  <div>MIT</div>
                </div>
              </div>
              
              <p>
                <strong>React</strong> (иногда <strong>React.js</strong> или <strong>ReactJS</strong>) — JavaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов. React разрабатывается и поддерживается Meta Platforms (ранее Facebook) вместе с сообществом отдельных разработчиков и компаний. React может использоваться для разработки одностраничных и мобильных приложений. Его цель в первую очередь — обеспечить высокую скорость, простоту и масштабируемость. В качестве библиотеки для разработки пользовательских интерфейсов React часто используется с другими библиотеками, такими как Redux или MobX.
              </p>
              
              <h2>История</h2>
              <p>
                React был создан Джорданом Уолком, разработчиком из Facebook. React был впервые использован в новостной ленте Facebook в 2011 году и позже в Instagram в 2012 году. React был выпущен как проект с открытым исходным кодом в мае 2013 года на конференции JSConf US.
              </p>
              
              <h2>Особенности</h2>
              <p>
                React использует декларативный подход к созданию пользовательских интерфейсов, что делает код более предсказуемым и легким для отладки. React также поощряет создание переиспользуемых компонентов пользовательского интерфейса, которые представляют данные, которые могут меняться со временем.
              </p>
              
              <h3>Виртуальный DOM</h3>
              <p>
                React создает кэш структуры данных в памяти, вычисляет разницу и затем обновляет отображаемый DOM браузера. Это позволяет программисту писать код так, как будто вся страница обновляется при каждом изменении, в то время как библиотека React обновляет только те компоненты, которые действительно изменяются.
              </p>
              
              <h3>Однонаправленный поток данных</h3>
              <p>
                React следует принципу однонаправленного потока данных. Это означает, что данные в React всегда текут в одном направлении, от родительского компонента к дочернему. Это делает поток данных более предсказуемым и легким для отладки.
              </p>
              
              <h2>Применение</h2>
              <p>
                React используется для создания пользовательских интерфейсов в веб-приложениях. Он особенно полезен для создания одностраничных приложений, где пользовательский интерфейс должен обновляться без перезагрузки страницы.
              </p>
              
              <h2>См. также</h2>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleArticleClick('Vue.js'); }}>Vue.js</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleArticleClick('Angular'); }}>Angular</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleArticleClick('JavaScript'); }}>JavaScript</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleArticleClick('Single-page application'); }}>Single-page application</a></li>
              </ul>
            </ArticleContent>
            
            <ArticleFooter>
              <div className="categories">
                <span>Категории: </span>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategoryLinkClick('dev'); }}>JavaScript-библиотеки</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategoryLinkClick('dev'); }}>Фреймворки JavaScript</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategoryLinkClick('web'); }}>Разработка веб-приложений</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleCategoryLinkClick('dev'); }}>Программное обеспечение с открытым исходным кодом</a>
              </div>
            </ArticleFooter>
            
            <Pagination>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('предыдущей'); }}>
                <FaArrowLeft /> Предыдущая статья
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('следующей'); }}>
                Следующая статья <FaArrowRight />
              </a>
            </Pagination>
          </MainContent>
        </WikiMain>
      </WikiContent>
    </WikiContainer>
  );
};

export default Wiki; 