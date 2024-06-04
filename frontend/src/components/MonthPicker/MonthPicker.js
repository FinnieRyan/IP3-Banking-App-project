import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

const Months = styled.ul`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Month = styled.li`
  flex: 0 0 auto;
  padding: 0 16px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : '400')};
  font-size: ${(props) => (props.active ? '20px' : '16px')};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.textBlack};
  opacity: ${(props) => props.opacity};
  transition: opacity 0.3s;
  scroll-snap-align: center;
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

  const debouncedOnScroll = useMemo(
    () =>
      debounce(() => {
        const monthsContainer = monthsRef.current;
        const center =
          monthsContainer.scrollLeft + monthsContainer.offsetWidth / 2;
        const index = monthList.findIndex((month, i) => {
          const monthElement = monthsContainer.children[i + 1];
          const left = monthElement.offsetLeft;
          const right = left + monthElement.offsetWidth;
          return left <= center && center <= right;
        });
        setActiveIndex(index);
      }, 20),
    []
  );

  useEffect(() => {
    centerActiveMonth(activeIndex);
    onMonthChange(monthList[activeIndex]);
  }, [activeIndex]);

  return (
    <Months ref={monthsRef} onScroll={debouncedOnScroll}>
      <Spacer />
      {monthList.map((month, index) => (
        <Month
          key={`${month.name}-${month.year}`}
          active={index === activeIndex}
          onClick={() => setActiveIndex(index)}
        >
          {month.name}
        </Month>
      ))}
      <Spacer />
    </Months>
  );
};
