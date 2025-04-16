import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TestimonialsContainer = styled.section`
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

const TestimonialsGrid = styled.div`
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

const TestimonialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(81, 51, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(81, 51, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const TestimonialContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #5133ff;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const AuthorInfo = styled.div`
  h4 {
    font-size: 1.1rem;
    color: #fff;
    margin-bottom: 0.2rem;
  }

  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 768px) {
    h4 {
      font-size: 1rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;

const Rating = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-top: 1rem;

  svg {
    color: #ffd700;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    svg {
      font-size: 1rem;
    }
  }
`;

const testimonials = [
  {
    quote: "Превосходный разработчик! Превратил наши идеи в реальность, превзойдя все ожидания.",
    author: "Александр Петров",
    position: "CEO, TechStart",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    quote: "Работать с таким профессионалом - одно удовольствие. Всегда на связи и готов помочь.",
    author: "Мария Иванова",
    position: "CTO, Digital Solutions",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    quote: "Высокое качество работы и внимание к деталям. Рекомендую!",
    author: "Дмитрий Сидоров",
    position: "Founder, WebCraft",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  }
];

const Testimonials = () => {
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

  return (
    <TestimonialsContainer>
      <Title>Отзывы клиентов</Title>
      <TestimonialsGrid
        ref={ref}
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} variants={cardVariants}>
            <TestimonialContent>"{testimonial.quote}"</TestimonialContent>
            <TestimonialAuthor>
              <AuthorImage>
                <img src={testimonial.image} alt={testimonial.author} />
              </AuthorImage>
              <AuthorInfo>
                <h4>{testimonial.author}</h4>
                <p>{testimonial.position}</p>
              </AuthorInfo>
            </TestimonialAuthor>
            <Rating>
              {/* Add rating component here */}
            </Rating>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </TestimonialsContainer>
  );
};

export default Testimonials; 