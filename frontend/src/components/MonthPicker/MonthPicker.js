// React and Lodash
import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

// Helper Functions
import { generateMonthList } from './generateMonthList';

// Styles
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

  // Generate a list of months between the start date and the current date
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

  // Debounce the scroll event to prevent the active month from changing too frequently
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
      }, 200),
    [monthList]
  );

  // Center the active month when the activeIndex changes
  useEffect(() => {
    centerActiveMonth(activeIndex);
  }, [activeIndex]);

  // Call onMonthChange when the activeIndex changes
  useEffect(() => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const { name, year } = monthList[activeIndex];
    const month = months.indexOf(name);
    onMonthChange({ name, month, year });
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

MonthPicker.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  onMonthChange: PropTypes.func.isRequired,
};
