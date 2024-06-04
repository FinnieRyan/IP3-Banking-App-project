import React, { useState, useEffect, useRef, useMemo } from 'react';
import { debounce } from 'lodash';
import { generateMonthList } from './generateMonthList';
import {
  Fader,
  Month,
  MonthPickerContainer,
  Months,
  Spacer,
} from './MonthPicker.style';

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
