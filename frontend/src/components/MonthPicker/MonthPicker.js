import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { generateMonthList } from './generateMonthList';

const MonthPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: -30px;
`;

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
  font-weight: ${(props) => (props.$active ? 'bold' : '400')};
  font-size: ${(props) => (props.$active ? '24px' : '18px')};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textBlack};
  transition: opacity 0.3s;
  scroll-snap-align: center;
`;

const Spacer = styled.div`
  flex: 0 0 auto;
  width: 50%;
`;

const Fader = styled.div`
  position: relative;
  top: -30px;
  width: 100%;
  height: 30px;
  background: linear-gradient(
    90deg,
    rgba(239, 243, 248, 1) 0%,
    rgba(239, 243, 248, 0) 35%,
    rgba(239, 243, 248, 0) 75%,
    rgba(239, 243, 248, 1) 100%
  );
  pointer-events: none;
`;

export const MonthPicker = ({ startDate, onMonthChange }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const start = new Date(startDate);
  const startYear = start.getFullYear();
  const startMonth = start.getMonth();

  const monthList = useMemo(
    () => generateMonthList(startYear, startMonth, currentYear, currentMonth),
    [startYear, startMonth, currentYear, currentMonth]
  );

  const [activeIndex, setActiveIndex] = useState(monthList.length - 1);
  const monthsRef = useRef(null);

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
      }, 100),
    [monthList]
  );

  useEffect(() => {
    centerActiveMonth(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    onMonthChange(monthList[activeIndex]);
  }, [activeIndex, monthList, onMonthChange]);

  return (
    <MonthPickerContainer>
      <Months ref={monthsRef} onScroll={debouncedOnScroll}>
        <Spacer />
        {monthList.map((month, index) => (
          <Month
            key={`${month.name}-${month.year}`}
            data-index={index}
            $active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {month.name.substring(0, 3)}{' '}
            {index === activeIndex ? month.year : ''}
          </Month>
        ))}
        <Spacer />
      </Months>
      <Fader />
    </MonthPickerContainer>
  );
};
