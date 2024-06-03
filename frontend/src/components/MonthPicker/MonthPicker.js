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

export const MonthPicker = ({ startDate, onMonthChange }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthsRef = useRef(null);

  const start = new Date(startDate);
  const startYear = start.getFullYear();
  const startMonth = start.getMonth();

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'long' })
  );
  const monthList = Array.from(
    { length: (currentYear - startYear + 1) * 12 },
    (_, i) => {
      const year = Math.floor(i / 12) + startYear;
      const month = i % 12;
      if (
        (year === startYear && month < startMonth) ||
        (year === currentYear && month > currentMonth)
      ) {
        return null;
      }
      return { name: months[month], year };
    }
  ).filter(Boolean);

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
              onClick={() => {
                setActiveIndex(index);
                onMonthChange(month);
              }}
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
