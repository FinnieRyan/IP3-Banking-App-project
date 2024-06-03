import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MonthsContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const Month = styled.div`
  flex: 0 0 auto;
  padding: 0 16px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : '400')};
  font-size: ${(props) => (props.active ? '20px' : '16px')};
  opacity: ${(props) => props.opacity};
  transition: opacity 0.3s;
  scroll-snap-align: start;
`;

const Spacer = styled.div`
  flex: 0 0 auto;
  width: 50%;
`;

export const MonthCarousel = ({ startDate }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthsRef = useRef(null);
  const startYear = new Date(startDate).getFullYear();
  const startMonth = new Date(startDate).getMonth();

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const generateMonthList = () => {
    const monthList = [];
    for (let year = startYear; year <= currentYear; year++) {
      const startMonthIndex = year === startYear ? startMonth : 0;
      const endMonthIndex = year === currentYear ? currentMonth : 11;
      for (let month = startMonthIndex; month <= endMonthIndex; month++) {
        monthList.push({ name: months[month], year });
      }
    }
    return monthList;
  };

  const monthList = generateMonthList();

  const [activeIndex, setActiveIndex] = useState(monthList.length - 1);

  const centerActiveMonth = (index) => {
    const monthsContainer = monthsRef.current;
    const activeMonthElement = monthsContainer.children[index + 1];

    const scrollLeft =
      activeMonthElement.offsetLeft -
      monthsContainer.offsetWidth / 2 +
      activeMonthElement.offsetWidth / 2;

    monthsContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    centerActiveMonth(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    centerActiveMonth(activeIndex);
  }, []);

  const calculateOpacity = useMemo(() => {
    return (index) => {
      const maxDistance = 3; // distance from the active index where the opacity will start to fade
      const distance = Math.abs(activeIndex - index);
      return distance >= maxDistance ? 0.2 : 1 - (distance / maxDistance) * 0.8;
    };
  }, [activeIndex]);

  return (
    <Container>
      <MonthsContainer ref={monthsRef} role="list">
        <Spacer />
        {monthList.map((month, index) => {
          const showYear =
            (index === 0 && monthList.length > 1) ||
            (index > 0 && month.year !== monthList[index - 1].year);
          return (
            <Month
              key={`${month.name}-${month.year}`}
              active={index === activeIndex}
              opacity={calculateOpacity(index)}
              onClick={() => setActiveIndex(index)}
              role="listitem"
            >
              {month.name} {showYear && month.year}
            </Month>
          );
        })}
        <Spacer />
      </MonthsContainer>
    </Container>
  );
};
