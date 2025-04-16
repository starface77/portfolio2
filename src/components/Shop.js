import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaShoppingCart, FaFilter, FaSearch, FaStar, FaTimes, FaChevronRight, FaTrash } from 'react-icons/fa';

const ShopContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a1f 0%, #1a1a3a 100%);
  color: #fff;
  padding: 2rem;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 80px;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    padding: 1rem;
    padding-top: 70px;
    padding-bottom: 80px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(81, 51, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255, 51, 153, 0.15) 0%, transparent 50%),
      linear-gradient(90deg, rgba(81, 51, 255, 0.03) 1px, transparent 1px),
      linear-gradient(0deg, rgba(81, 51, 255, 0.03) 1px, transparent 1px);
    background-size: 100% 100%, 100% 100%, 30px 30px, 30px 30px;
    transform: perspective(1000px) rotateX(60deg);
    transform-origin: top;
    animation: gridMove 30s linear infinite;
    pointer-events: none;
  }

  @keyframes gridMove {
    0% { background-position: 0 0, 0 0, 0 0, 0 0; }
    100% { background-position: 0 0, 0 0, 0 30px, 0 30px; }
  }
`;

const ShopHeader = styled.div`
  max-width: 1400px;
  margin: 0 auto 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  background: rgba(10, 10, 30, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(81, 51, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    margin-bottom: 2rem;
    position: sticky;
    top: 70px;
    margin-top: 0;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(81, 51, 255, 0.3);
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  width: 350px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(81, 51, 255, 0.8), transparent);
    animation: searchGlow 2s linear infinite;
  }

  @keyframes searchGlow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  &:focus-within {
    border-color: #5133ff;
    box-shadow: 0 0 20px rgba(81, 51, 255, 0.3);
    transform: translateY(-2px);
  }

  input {
    background: none;
    border: none;
    color: #fff;
    width: 100%;
    padding: 0.5rem;
    font-size: 1.1rem;
    letter-spacing: 0.5px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  svg {
    color: rgba(81, 51, 255, 0.8);
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const FilterButton = styled(motion.button)`
  background: rgba(81, 51, 255, 0.1);
  border: 1px solid rgba(81, 51, 255, 0.3);
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(81, 51, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    background: rgba(81, 51, 255, 0.2);
    border-color: #5133ff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(81, 51, 255, 0.3);

    &::before {
      transform: translateX(100%);
    }
  }

  svg {
    font-size: 1.2rem;
    color: rgba(81, 51, 255, 0.8);
  }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

const CartButton = styled(motion.button)`
  background: linear-gradient(135deg, #5133ff, #8066ff);
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  border: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #8066ff, #5133ff);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(81, 51, 255, 0.5);

    &::before {
      transform: translateX(100%);
    }
  }

  svg {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 20, 40, 0.5);
  border-bottom: 1px solid rgba(81, 51, 255, 0.3);

  .not-available {
    font-size: 1.5rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(81, 51, 255, 0.5);
    padding: 1rem;
    text-align: center;
    border: 1px dashed rgba(81, 51, 255, 0.5);
    border-radius: 8px;
    background: rgba(81, 51, 255, 0.1);
    backdrop-filter: blur(5px);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #5133ff, transparent);
    animation: cardGlow 2s linear infinite;
  }

  @keyframes cardGlow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0.5rem;
    margin-bottom: 2rem;
  }
`;

const ProductCard = styled(motion.div)`
  background: rgba(20, 20, 40, 0.7);
  border: 1px solid rgba(81, 51, 255, 0.3);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(81, 51, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: #5133ff;
    box-shadow: 0 20px 40px rgba(81, 51, 255, 0.3);

    &::before {
      opacity: 1;
    }

    ${ProductImage} img {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    margin: 0 auto;
    max-width: 100%;
    width: 100%;
  }
`;

const ProductInfo = styled.div`
  padding: 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ProductTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ProductDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1rem;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  font-size: 1.8rem;
  color: #5133ff;
  font-weight: bold;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    display: inline-block;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #5133ff, transparent);
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  svg {
    color: #ffd700;
    filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
  }
`;

const AddToCartButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #5133ff, #8066ff);
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #8066ff, #5133ff);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(81, 51, 255, 0.4);

    &::before {
      transform: translateX(100%);
    }
  }
`;

const FilterPanel = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100vh;
  background: rgba(10, 10, 30, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(81, 51, 255, 0.3);
  padding: 2.5rem;
  z-index: 100;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(81, 51, 255, 0.5);
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
    top: 70px;
    height: calc(100vh - 70px);
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(81, 51, 255, 0.3);
`;

const FilterTitle = styled.h3`
  font-size: 1.8rem;
  color: #5133ff;
  font-weight: 700;
  letter-spacing: 1px;
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2.5rem;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: linear-gradient(to bottom, #5133ff, transparent);
    border-radius: 3px;
  }
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const FilterInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(81, 51, 255, 0.3);
  border-radius: 12px;
  padding: 0.8rem;
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    border-color: #5133ff;
    outline: none;
    box-shadow: 0 0 10px rgba(81, 51, 255, 0.3);
  }

  &[type="range"] {
    -webkit-appearance: none;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    outline: none;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #5133ff;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(81, 51, 255, 0.5);
    }
  }
`;

const FilterCheckbox = styled.input`
  margin-right: 0.8rem;
  width: 18px;
  height: 18px;
  accent-color: #5133ff;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(81, 51, 255, 0.1);
  }
`;

const PriceDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const CategoryIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(81, 51, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
  color: #5133ff;
`;

const CategoryLabel = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
  backdrop-filter: blur(5px);
`;

const CartModal = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: rgba(10, 10, 30, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(81, 51, 255, 0.3);
  padding: 2rem;
  z-index: 100;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(81, 51, 255, 0.5);
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    width: 100%;
    top: 70px;
    height: calc(100vh - 70px);
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(81, 51, 255, 0.3);
`;

const CartTitle = styled.h3`
  font-size: 1.8rem;
  color: #5133ff;
  font-weight: 700;
  letter-spacing: 1px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin-bottom: 1rem;
  position: relative;
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1rem;
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const CartItemPrice = styled.div`
  color: #5133ff;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ff3366;
  }
`;

const CartTotal = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(81, 51, 255, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: #fff;
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #5133ff, #8066ff);
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #8066ff, #5133ff);
    transform: translateY(-2px);
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
`;

const CartBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff3366;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const Notification = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(81, 51, 255, 0.95);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(81, 51, 255, 0.3);
  z-index: 1000;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    top: 80px;
    right: 10px;
    left: 10px;
    padding: 1rem;
    font-size: 0.9rem;
  }
`;

const products = [
  {
    id: 1,
    name: "Разработка сайта с нуля",
    price: 50000,
    rating: 4.9,
    image: "/images/web-dev.jpg",
    category: "development",
    description: "Создание современного веб-сайта с уникальным дизайном и полным функционалом"
  },
  {
    id: 2,
    name: "Копия существующего сайта",
    price: 35000,
    rating: 4.8,
    image: "/images/site-copy.jpg",
    category: "development",
    description: "Точное воспроизведение дизайна и функционала любого сайта"
  },
  {
    id: 3,
    name: "Редизайн сайта",
    price: 40000,
    rating: 4.7,
    image: "/images/redesign.jpg",
    category: "design",
    description: "Обновление дизайна существующего сайта с сохранением функционала"
  },
  {
    id: 4,
    name: "UI/UX Дизайн",
    price: 30000,
    rating: 4.9,
    image: "/images/ui-design.jpg",
    category: "design",
    description: "Создание удобного и привлекательного интерфейса для вашего продукта"
  },
  {
    id: 5,
    name: "Исправление ошибок",
    price: 15000,
    rating: 4.8,
    image: "/images/bug-fix.jpg",
    category: "support",
    description: "Устранение технических проблем и оптимизация работы сайта"
  },
  {
    id: 6,
    name: "Техническая поддержка",
    price: 20000,
    rating: 4.7,
    image: "/images/support.jpg",
    category: "support",
    description: "Постоянная поддержка и обслуживание вашего сайта"
  }
];

const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isFilterOpen) {
      controls.start({ x: 0, opacity: 1 });
    } else {
      controls.start({ x: 100, opacity: 0 });
    }
  }, [isFilterOpen, controls]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesPrice && matchesCategory;
  });

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckout = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <ShopContainer>
      <ShopHeader>
        <SearchBar>
          <FaSearch />
          <input
            type="text"
            placeholder="Поиск услуг..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        <ActionButtons>
          <FilterButton
            onClick={toggleFilter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter />
            Фильтры
          </FilterButton>
          <CartButton
            onClick={toggleCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart />
            Заказать
            {cart.length > 0 && <CartBadge>{cart.length}</CartBadge>}
          </CartButton>
        </ActionButtons>
      </ShopHeader>

      <ProductsGrid>
        <AnimatePresence>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
              style={{ touchAction: 'pan-y' }}
            >
              <ProductImage>
                <div className="not-available">НЕ ДОСТУПНО</div>
              </ProductImage>
              <ProductInfo>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductPrice>{product.price} ₽</ProductPrice>
                <ProductRating>
                  <FaStar />
                  {product.rating}
                </ProductRating>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {product.description}
                </p>
                <AddToCartButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                >
                  Заказать
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </AnimatePresence>
      </ProductsGrid>

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleFilter}
            />
            <FilterPanel
              initial={{ x: 100, opacity: 0 }}
              animate={controls}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <FilterHeader>
                <FilterTitle>Фильтры</FilterTitle>
                <CloseButton
                  onClick={toggleFilter}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </CloseButton>
              </FilterHeader>
              
              <FilterSection>
                <FilterLabel>Цена</FilterLabel>
                <FilterInput
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
                <PriceDisplay>
                  <span>От {priceRange[0]} ₽</span>
                  <span>До {priceRange[1]} ₽</span>
                </PriceDisplay>
              </FilterSection>
              
              <FilterSection>
                <FilterLabel>Категории</FilterLabel>
                <FilterOption>
                  <CategoryIcon>
                    <FaChevronRight />
                  </CategoryIcon>
                  <FilterCheckbox
                    type="checkbox"
                    id="development"
                    checked={selectedCategories.includes('development')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([...selectedCategories, 'development']);
                      } else {
                        setSelectedCategories(selectedCategories.filter(cat => cat !== 'development'));
                      }
                    }}
                  />
                  <CategoryLabel htmlFor="development">Разработка</CategoryLabel>
                </FilterOption>
                <FilterOption>
                  <CategoryIcon>
                    <FaChevronRight />
                  </CategoryIcon>
                  <FilterCheckbox
                    type="checkbox"
                    id="design"
                    checked={selectedCategories.includes('design')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([...selectedCategories, 'design']);
                      } else {
                        setSelectedCategories(selectedCategories.filter(cat => cat !== 'design'));
                      }
                    }}
                  />
                  <CategoryLabel htmlFor="design">Дизайн</CategoryLabel>
                </FilterOption>
                <FilterOption>
                  <CategoryIcon>
                    <FaChevronRight />
                  </CategoryIcon>
                  <FilterCheckbox
                    type="checkbox"
                    id="support"
                    checked={selectedCategories.includes('support')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([...selectedCategories, 'support']);
                      } else {
                        setSelectedCategories(selectedCategories.filter(cat => cat !== 'support'));
                      }
                    }}
                  />
                  <CategoryLabel htmlFor="support">Поддержка</CategoryLabel>
                </FilterOption>
              </FilterSection>
            </FilterPanel>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
            />
            <CartModal
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <CartHeader>
                <CartTitle>Корзина</CartTitle>
                <CloseButton
                  onClick={toggleCart}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </CloseButton>
              </CartHeader>

              {cart.length === 0 ? (
                <EmptyCart>
                  <h3>Корзина пуста</h3>
                  <p>Добавьте услуги в корзину</p>
                </EmptyCart>
              ) : (
                <>
                  {cart.map(item => (
                    <CartItem key={item.id}>
                      <CartItemImage src={item.image} alt={item.name} />
                      <CartItemInfo>
                        <CartItemName>{item.name}</CartItemName>
                        <CartItemPrice>{item.price} ₽</CartItemPrice>
                      </CartItemInfo>
                      <RemoveButton onClick={() => removeFromCart(item.id)}>
                        <FaTrash />
                      </RemoveButton>
                    </CartItem>
                  ))}
                  <CartTotal>
                    <span>Итого:</span>
                    <span>{getCartTotal()} ₽</span>
                  </CartTotal>
                  <CheckoutButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCheckout}
                  >
                    Оформить заказ
                  </CheckoutButton>
                </>
              )}
            </CartModal>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotification && (
          <Notification
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <FaShoppingCart />
            Функция оформления заказа находится в разработке
          </Notification>
        )}
      </AnimatePresence>
    </ShopContainer>
  );
};

export default Shop; 